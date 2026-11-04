import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowUpDown, Check, ChevronRight, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { catalog, trendingSearches } from '../services/catalog'
import { useAsync } from '../hooks/useAsync'
import { categoryBySlug } from '../data/categories'
import { ProductCard } from '../components/product/ProductCard'
import { ProductArt } from '../components/art/ProductArt'
import { ProductCardSkeleton } from '../components/ui/Skeleton'
import { EmptyState, ErrorState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { Overlay } from '../components/overlay/Overlay'
import { FilterPanel } from '../components/listing/FilterPanel'
import { PAGE_SIZE, PRICE_BUCKETS, SORTS, activeCount, applyFilters, readFilters, sorters } from '../components/listing/filters'
import { formatPrice } from '../lib/format'
import { PageBanner } from '../components/ui/PageBanner'
import { photo } from '../data/photos'
import { featuredBrands } from '../data/brands'

/** Shared results page for category, brand, search and deals routes. */
export default function Listing({ mode }) {
  const { slug, brand } = useParams()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? (mode === 'deals' ? 'discount' : 'relevance')
  const listingKey = `${mode}:${slug ?? ''}:${brand ?? ''}:${q}:${[...params.entries()].filter(([key]) => key !== 'page').map(([key, value]) => `${key}=${value}`).join('&')}`
  const [visibility, setVisibility] = useState(() => ({ key: listingKey, count: Math.max(1, +(params.get('page') ?? 1)) * PAGE_SIZE }))
  const visibleCount = visibility.key === listingKey ? visibility.count : PAGE_SIZE
  const cat = slug ? categoryBySlug[slug] : null
  const f = useMemo(() => readFilters(params), [params])
  const [sheet, setSheet] = useState(null) // 'filters' | 'sort'

  const { data: base, loading, error, retry } = useAsync(async () => {
    let list = await catalog.list({ category: cat?.slug, brand, q: mode === 'search' ? q : undefined })
    if (mode === 'deals') list = list.filter((p) => p.discount >= 15)
    return list
  }, [mode, slug, brand, q])

  const results = useMemo(() => {
    if (!base) return []
    const filtered = applyFilters(base, f)
    return sorters[sort] ? [...filtered].sort(sorters[sort]) : filtered
  }, [base, f, sort])

  const title = mode === 'search' ? `Results for “${q}”` : mode === 'brand' ? brand : mode === 'deals' ? 'Today’s deals' : cat?.name
  const subtitle = mode === 'deals' ? '15% off or more, across every category' : mode === 'brand' ? `Every ${brand} product on Bazaar, from authorised sellers` : null
  const brandsHere = useMemo(() => new Set(results.map((p) => p.brand)).size, [results])
  const bestOff = useMemo(() => results.reduce((m, p) => Math.max(m, p.discount), 0), [results])
  const brandImage = mode === 'brand' ? featuredBrands.find((b) => b.name === brand)?.image ?? base?.find((p) => p.image)?.image : null
  const brandArt = brandImage ? <img src={brandImage} alt="" className="absolute inset-[8%] size-[84%] object-contain drop-shadow-[0_24px_30px_rgb(0_0_0/0.45)]" /> : null
  const nActive = activeCount(f)

  useEffect(() => {
    document.title = `${mode === 'search' ? q : title} · BAZAAR`
  }, [title, q, mode])

  const update = (patch) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      const empty = v == null || v === false || v === '' || (Array.isArray(v) && v.length === 0)
      if (empty) next.delete(k)
      else next.set(k, Array.isArray(v) ? v.join(',') : v === true ? '1' : String(v))
    }
    next.delete('page')
    setParams(next, { replace: true })
  }
  const clearAll = () => {
    const next = new URLSearchParams()
    if (q) next.set('q', q)
    if (params.get('sort')) next.set('sort', params.get('sort'))
    setParams(next, { replace: true })
  }
  const setSort = (s) => {
    const next = new URLSearchParams(params)
    next.set('sort', s)
    next.delete('page')
    setParams(next, { replace: true })
  }

  const chips = useMemo(() => {
    const out = []
    f.cat.forEach((c) => out.push({ label: categoryBySlug[c]?.name, clear: { cat: f.cat.filter((x) => x !== c) } }))
    f.sub.forEach((s) => out.push({ label: s, clear: { sub: f.sub.filter((x) => x !== s) } }))
    f.brand.forEach((b) => out.push({ label: b, clear: { brand: f.brand.filter((x) => x !== b) } }))
    if (f.min != null || f.max != null) {
      const bucket = PRICE_BUCKETS.find(([a, b]) => a === f.min && (b === Infinity ? f.max == null : b === f.max))
      out.push({ label: bucket ? bucket[2] : `${f.min != null ? formatPrice(f.min) : '₹0'} – ${f.max != null ? formatPrice(f.max) : 'any'}`, clear: { min: null, max: null } })
    }
    if (f.rating) out.push({ label: `${f.rating}★ & above`, clear: { rating: null } })
    if (f.disc) out.push({ label: `${f.disc}%+ off`, clear: { disc: null } })
    if (f.fast) out.push({ label: 'By tomorrow', clear: { fast: false } })
    if (f.free) out.push({ label: 'Free delivery', clear: { free: false } })
    if (f.verified) out.push({ label: 'Bazaar Verified', clear: { verified: false } })
    if (f.instock) out.push({ label: 'Hide low stock', clear: { instock: false } })
    return out
  }, [f])

  if (mode === 'category' && !cat) {
    return (
      <div className="container-page">
        <EmptyState title="We couldn’t find that category" body="It may have moved. Try browsing all categories instead.">
          <Button to="/categories">All categories</Button>
        </EmptyState>
      </div>
    )
  }

  const shown = results.slice(0, visibleCount)
  const sortControl = (
    <label className="hidden items-center gap-2 text-sm text-ink-600 lg:flex">
      Sort by
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-lg bg-white pl-3 pr-8 text-sm font-medium text-ink-900 ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
        {SORTS.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  )
  const selectedPriceRange = PRICE_BUCKETS.findIndex(([min, max]) => f.min === min && (max === Infinity ? f.max == null : f.max === max))
  const priceControl = (
    <label className="flex items-center gap-2 text-sm text-ink-600">
      Price range
      <select
        aria-label="Filter by price range"
        value={selectedPriceRange >= 0 ? String(selectedPriceRange) : f.min != null || f.max != null ? 'custom' : ''}
        onChange={(e) => {
          if (!e.target.value) return update({ min: null, max: null })
          if (e.target.value === 'custom') return
          const [min, max] = PRICE_BUCKETS[Number(e.target.value)]
          update({ min, max: max === Infinity ? null : max })
        }}
        className="h-10 max-w-[190px] rounded-lg bg-white px-3 text-sm font-medium text-ink-900 ring-1 ring-inset ring-ink-200 outline-none focus:ring-2 focus:ring-brand-500"
      >
        <option value="">All prices</option>
        {selectedPriceRange === -1 && (f.min != null || f.max != null) && <option value="custom" disabled>Custom range</option>}
        {PRICE_BUCKETS.map(([min, , label], index) => <option key={min} value={index}>{label}</option>)}
      </select>
    </label>
  )
  const relatedCats = mode === 'search' && base ? [...new Set(base.map((p) => p.category))].slice(0, 6) : []
  const panel = base && <FilterPanel base={base} f={f} update={update} mode={mode} category={cat} />
  const dealPicks = mode === 'deals' ? results.slice(0, 3) : []
  const dealArt = dealPicks.length > 0 ? (
    <div className="absolute inset-0 flex items-center justify-end gap-3 px-5 py-4 lg:gap-4 lg:px-8">
      {dealPicks.map((p, index) => (
        <div key={p.id} className={`relative w-[29%] max-w-[154px] overflow-hidden rounded-2xl bg-white p-2 text-ink-950 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.55)] ring-1 ring-white/70 ${index === 1 ? 'translate-y-3' : '-translate-y-2'}`}>
          <span className="absolute left-3 top-3 z-10 rounded-md bg-deal-600 px-1.5 py-0.5 text-[10px] font-bold text-white">-{p.discount}%</span>
          <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="h-24 w-full rounded-xl bg-studio p-2" />
          <p className="mt-2 truncate text-[10px] font-semibold uppercase tracking-wide text-ink-500">{p.brand}</p>
          <p className="truncate text-sm font-bold num">{formatPrice(p.price)}</p>
        </div>
      ))}
    </div>
  ) : null

  return (
    <div className="container-page pt-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-ink-500">
        <Link to="/" className="hover:text-ink-950">Home</Link>
        <ChevronRight className="size-3.5" />
        {mode === 'brand' && (
          <>
            <span>Brands</span>
            <ChevronRight className="size-3.5" />
          </>
        )}
        <span className="text-ink-800" aria-current="page">{mode === 'search' ? 'Search' : title}</span>
      </nav>

      {mode === 'search' ? (
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-ink-150 pb-5">
          <div className="min-w-0">
            <h1 className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-ink-950 sm:text-[36px]">{title}</h1>
            <p className="mt-1 text-sm text-ink-500 num" aria-live="polite">
              {loading ? 'Loading products…' : `${results.length.toLocaleString('en-IN')} ${results.length === 1 ? 'product' : 'products'}${brandsHere > 1 ? ` from ${brandsHere} brands` : ''}`}
            </p>
          </div>
          {sortControl}
        </div>
      ) : (
        <>
          <div className="mt-4">
            <PageBanner
              eyebrow={mode === 'deals' ? 'Lightning deals · refreshed daily' : mode === 'brand' ? 'Official brand store' : `Shop ${cat?.subs.slice(0, 3).join(', ')}`}
              title={title}
              subtitle={subtitle ?? `Genuine products from authorised sellers, with free delivery over ₹499 and easy returns.`}
              photo={mode === 'category' ? photo(`cat-${slug}`)?.src : undefined}
              tone={mode === 'deals' ? 'deal' : mode === 'brand' ? 'brand' : 'dark'}
              art={mode === 'deals' ? dealArt : brandArt}
              stats={loading ? [] : [['products', results.length.toLocaleString('en-IN')], ...(brandsHere > 1 ? [['brands', brandsHere]] : []), ...(bestOff > 0 ? [['max off', `${bestOff}%`]] : [])]}
            >
              {mode === 'deals' && results.length > 0 && <a href="#deal-results" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-deal-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50">Shop the deals <ArrowDown className="size-4" /></a>}
            </PageBanner>
          </div>
          <p className="sr-only" aria-live="polite">
            {loading ? 'Loading products…' : `${results.length.toLocaleString('en-IN')} ${results.length === 1 ? 'product' : 'products'}${brandsHere > 1 ? ` from ${brandsHere} brands` : ''}`}
          </p>
          <div className="mt-5 hidden items-center justify-end gap-5 lg:flex">{priceControl}{sortControl}</div>
        </>
      )}

      {cat && (
        <div className="scrollbar-none -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {['', ...cat.subs.filter((s) => base?.some((p) => p.subcategory === s) ?? true)].map((s) => {
            const active = s ? f.sub.length === 1 && f.sub[0] === s : f.sub.length === 0
            return (
              <button key={s || 'all'} type="button" onClick={() => update({ sub: s ? [s] : [] })} aria-pressed={active} className={`h-10 shrink-0 rounded-full px-4 text-[13.5px] font-medium transition-[background-color,color,transform] active:scale-[0.97] ${active ? 'bg-ink-950 text-white' : 'bg-white text-ink-700 ring-1 ring-inset ring-ink-200 hover:text-ink-950 hover:ring-ink-300'}`}>
                {s || `All ${cat.name}`}
              </button>
            )
          })}
        </div>
      )}

      {relatedCats.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="text-ink-500">Related:</span>
          {relatedCats.map((c) => (
            <Link key={c} to={`/c/${c}`} className="rounded-full bg-ink-100 px-3 py-1.5 font-medium text-ink-700 hover:bg-ink-150">
              {categoryBySlug[c].name}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile filter + sort bar */}
      <div className="sticky top-[var(--header-h,152px)] z-20 transition-[top] duration-200 -mx-4 mt-4 flex gap-2 border-b border-ink-150 bg-white/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <button type="button" onClick={() => setSheet('filters')} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md text-sm font-semibold ring-1 ring-inset ring-ink-200">
          <SlidersHorizontal className="size-4" /> Filters {nActive > 0 && <span className="grid size-5 place-items-center rounded-full bg-ink-950 text-[11px] text-white num">{nActive}</span>}
        </button>
        <select
          aria-label="Filter by price range"
          value={selectedPriceRange >= 0 ? String(selectedPriceRange) : f.min != null || f.max != null ? 'custom' : ''}
          onChange={(e) => {
            if (!e.target.value) return update({ min: null, max: null })
            if (e.target.value === 'custom') return
            const [min, max] = PRICE_BUCKETS[Number(e.target.value)]
            update({ min, max: max === Infinity ? null : max })
          }}
          className="h-10 min-w-0 flex-1 rounded-md bg-white px-2 text-xs font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Price range</option>
          {selectedPriceRange === -1 && (f.min != null || f.max != null) && <option value="custom" disabled>Custom range</option>}
          {PRICE_BUCKETS.map(([min, , label], index) => <option key={min} value={index}>{label}</option>)}
        </select>
        <button type="button" onClick={() => setSheet('sort')} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md text-sm font-semibold ring-1 ring-inset ring-ink-200">
          <ArrowUpDown className="size-4" /> {SORTS.find(([v]) => v === sort)?.[1]}
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[248px_1fr] lg:gap-10">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-36 max-h-[calc(100dvh-10rem)] overflow-y-auto pb-6 pr-2">
            <div className="flex items-center justify-between pb-1">
              <h2 className="font-display text-base font-bold text-ink-950">Filters</h2>
              {nActive > 0 && (
                <button type="button" onClick={clearAll} className="text-[13px] font-semibold text-brand-700 hover:underline">
                  Clear all
                </button>
              )}
            </div>
            {loading ? (
              <div className="mt-4 space-y-3">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-5 rounded" />)}</div>
            ) : (
              panel
            )}
          </div>
        </aside>

        <div className="min-w-0">
          <AnimatePresence initial={false}>
            {chips.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-5 overflow-hidden">
                <ul className="flex flex-wrap gap-2" aria-label="Active filters">
                  {chips.map((c) => (
                    <li key={c.label}>
                      <button type="button" onClick={() => update(c.clear)} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink-950 pl-3 pr-2 text-[13px] font-medium text-white hover:bg-ink-800" aria-label={`Remove filter ${c.label}`}>
                        {c.label} <X className="size-3.5" />
                      </button>
                    </li>
                  ))}
                  <li>
                    <button type="button" onClick={clearAll} className="h-8 px-2 text-[13px] font-semibold text-ink-700 underline underline-offset-2 hover:text-ink-950">
                      Clear all
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {error ? (
            <ErrorState onRetry={retry} />
          ) : loading ? (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 lg:gap-x-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i}><ProductCardSkeleton /></li>
              ))}
            </ul>
          ) : results.length === 0 ? (
            base.length === 0 ? (
              <EmptyState icon={SearchX} title={mode === 'search' ? `No results for “${q}”` : 'Nothing here right now'} body="Check the spelling, try a broader term, or try one of these popular searches.">
                {trendingSearches.slice(0, 4).map((t) => (
                  <Button key={t} to={`/search?q=${encodeURIComponent(t)}`} variant="secondary" size="sm">{t}</Button>
                ))}
              </EmptyState>
            ) : (
              <EmptyState icon={SlidersHorizontal} title="No products match these filters" body="Remove a filter or widen the price range to see more.">
                <Button onClick={clearAll}>Clear all filters</Button>
              </EmptyState>
            )
          ) : (
            <>
              <ul id="deal-results" className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 lg:gap-x-4 lg:gap-y-10">
                {shown.map((p, i) => (
                  // new results ease in a few at a time (per page, so "load more" reveals the next batch the same way)
                  <motion.li key={p.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min((i % PAGE_SIZE) * 0.03, 0.3), ease: [0.2, 0.8, 0.2, 1] }}>
                    <ProductCard product={p} compare priority={i < 8} />
                  </motion.li>
                ))}
              </ul>
              <div className="mt-12 flex flex-col items-center gap-3">
                <p className="text-[13px] text-ink-500 num">
                  Showing {shown.length} of {results.length}
                </p>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-ink-100" aria-hidden>
                  <div className="h-full rounded-full bg-ink-950 transition-[width] duration-300" style={{ width: `${(shown.length / results.length) * 100}%` }} />
                </div>
                {shown.length < results.length && (
                  <Button variant="secondary" className="mt-2" onClick={() => setVisibility((state) => ({ key: listingKey, count: Math.min((state.key === listingKey ? state.count : PAGE_SIZE) + PAGE_SIZE, results.length) }))}>
                    Show {Math.min(PAGE_SIZE, results.length - shown.length)} more
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Overlay open={sheet === 'filters'} onClose={() => setSheet(null)} label="Filters" className="flex flex-col md:max-w-[520px]">
        <div className="flex items-center justify-between border-b border-ink-150 px-5 py-3.5">
          <h2 className="font-display text-lg font-bold">Filters</h2>
          <button type="button" onClick={() => setSheet(null)} aria-label="Close filters" className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink-100">
            <X className="size-5" />
          </button>
        </div>
        <div className="max-h-[64dvh] flex-1 overflow-y-auto px-5">{panel}</div>
        <div className="flex gap-2.5 border-t border-ink-150 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          <Button variant="secondary" size="lg" className="flex-1" onClick={clearAll} disabled={!nActive}>
            Clear all
          </Button>
          <Button size="lg" className="flex-[2]" onClick={() => setSheet(null)}>
            Show {results.length} {results.length === 1 ? 'product' : 'products'}
          </Button>
        </div>
      </Overlay>

      <Overlay open={sheet === 'sort'} onClose={() => setSheet(null)} label="Sort by" className="md:max-w-[420px]">
        <div className="px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          <h2 className="font-display text-lg font-bold">Sort by</h2>
          <ul className="mt-2">
            {SORTS.map(([v, l]) => (
              <li key={v}>
                <button
                  type="button"
                  onClick={() => {
                    setSort(v)
                    setSheet(null)
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-3.5 text-left text-[15px] ${sort === v ? 'font-semibold text-ink-950' : 'text-ink-700'}`}
                >
                  {l} {sort === v && <Check className="size-5" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Overlay>
    </div>
  )
}
