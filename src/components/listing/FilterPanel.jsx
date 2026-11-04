import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Search, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { categoryBySlug } from '../../data/categories'
import { Checkbox } from '../form/Field'
import { DISCOUNTS, PRICE_BUCKETS, RATINGS, applyFilters, countBy } from './filters'

function Section({ title, children, defaultOpen = true, count }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="border-b border-ink-150 py-4 last:border-b-0">
      <h3>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between gap-2 text-left text-sm font-semibold text-ink-950">
          <span>
            {title}
            {count > 0 && <span className="ml-1.5 rounded-full bg-ink-950 px-1.5 py-px text-[11px] text-white num">{count}</span>}
          </span>
          <ChevronDown className={`size-4 text-ink-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function CountedOption({ checked, onChange, label, count, disabled }) {
  const off = disabled && !checked
  return (
    <div className="flex items-start justify-between gap-2">
      <Checkbox checked={checked} onChange={onChange} disabled={off} className={`min-w-0 flex-1 ${off ? 'opacity-40' : ''}`} label={label} />
      <span className="pt-0.5 text-xs text-ink-400 num" aria-hidden>
        {count}
      </span>
    </div>
  )
}

function PriceInputs({ f, update }) {
  const [min, setMin] = useState(f.min ?? '')
  const [max, setMax] = useState(f.max ?? '')
  useEffect(() => {
    setMin(f.min ?? '')
    setMax(f.max ?? '')
  }, [f.min, f.max])
  const apply = (e) => {
    e.preventDefault()
    let a = min === '' ? null : Math.max(0, +min)
    let b = max === '' ? null : Math.max(0, +max)
    if (a != null && b != null && a > b) [a, b] = [b, a]
    update({ min: a, max: b })
  }
  return (
    <form onSubmit={apply} className="mt-3 flex items-center gap-2">
      <label className="sr-only" htmlFor="pmin">Minimum price</label>
      <input id="pmin" inputMode="numeric" placeholder="₹ Min" value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ''))} className="h-9 w-full min-w-0 rounded-md px-2.5 text-sm ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
      <span className="text-ink-400">–</span>
      <label className="sr-only" htmlFor="pmax">Maximum price</label>
      <input id="pmax" inputMode="numeric" placeholder="₹ Max" value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ''))} className="h-9 w-full min-w-0 rounded-md px-2.5 text-sm ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
      <button type="submit" className="h-9 shrink-0 rounded-md bg-ink-950 px-3 text-[13px] font-semibold text-white hover:bg-ink-800">Go</button>
    </form>
  )
}

/**
 * Faceted filter panel. Every count reflects the other active filters, so options that
 * would lead to zero results are visibly empty instead of being a dead end.
 */
export function FilterPanel({ base, f, update, mode, category }) {
  const [brandQuery, setBrandQuery] = useState('')
  const [allBrands, setAllBrands] = useState(false)

  const facets = useMemo(() => {
    const forCat = applyFilters(base, f, 'cat')
    const forSub = applyFilters(base, f, 'sub')
    const forBrand = applyFilters(base, f, 'brand')
    const forPrice = applyFilters(base, f, 'price')
    const forRating = applyFilters(base, f, 'rating')
    const forDisc = applyFilters(base, f, 'disc')
    return {
      cats: countBy(forCat, (p) => p.category),
      subs: Object.fromEntries([...new Set(base.map((p) => p.subcategory))].map((sub) => [sub, forSub.filter((p) => applyFilters([p], { ...f, sub: [sub] }).length > 0).length])),
      brands: countBy(forBrand, (p) => p.brand),
      allBrandNames: [...new Set(base.map((p) => p.brand))],
      price: PRICE_BUCKETS.map(([a, b]) => forPrice.filter((p) => p.price >= a && p.price <= b).length),
      rating: RATINGS.map((r) => forRating.filter((p) => p.rating >= r).length),
      disc: DISCOUNTS.map((d) => forDisc.filter((p) => p.discount >= d).length),
      fast: applyFilters(base, f, 'fast').filter((p) => p.delivery.days <= 1).length,
      free: applyFilters(base, f, 'free').filter((p) => p.delivery.free).length,
      verified: applyFilters(base, f, 'verified').filter((p) => p.assured).length,
      instock: applyFilters(base, f, 'instock').filter((p) => p.stock >= 10).length,
    }
  }, [base, f])

  const toggleIn = (key, val) => update({ [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] })

  const brandNames = facets.allBrandNames
    .filter((b) => b.toLowerCase().includes(brandQuery.toLowerCase()))
    .sort((a, b) => (facets.brands[b] ?? 0) - (facets.brands[a] ?? 0) || a.localeCompare(b))
  const shownBrands = allBrands || brandQuery ? brandNames : brandNames.slice(0, 8)
  const priceBucket = PRICE_BUCKETS.findIndex(([a, b]) => f.min === a && (b === Infinity ? f.max == null : f.max === b))
  const priceRangeValue = priceBucket >= 0 ? String(priceBucket) : f.min != null || f.max != null ? 'custom' : ''

  const catSlugs = Object.keys(countBy(base, (p) => p.category))
  const subs = category ? category.subs.filter((s) => base.some((p) => p.subcategory === s)) : []

  return (
    <div>
      {mode !== 'category' && catSlugs.length > 1 && (
        <Section title="Category" count={f.cat.length}>
          <div className="space-y-2.5">
            {catSlugs
              .sort((a, b) => (facets.cats[b] ?? 0) - (facets.cats[a] ?? 0))
              .map((slug) => (
                <CountedOption key={slug} checked={f.cat.includes(slug)} onChange={() => toggleIn('cat', slug)} label={categoryBySlug[slug]?.name} count={facets.cats[slug] ?? 0} disabled={!facets.cats[slug]} />
              ))}
          </div>
        </Section>
      )}

      {subs.length > 1 && (
        <Section title={category?.slug === 'fashion' ? 'Audience & style' : 'Type'} count={f.sub.length}>
          <div className="space-y-2.5">
            {subs.map((s) => (
              <CountedOption key={s} checked={f.sub.includes(s)} onChange={() => toggleIn('sub', s)} label={s} count={facets.subs[s] ?? 0} disabled={!facets.subs[s]} />
            ))}
          </div>
        </Section>
      )}

      {mode !== 'brand' && facets.allBrandNames.length > 1 && (
        <Section title="Brand" count={f.brand.length}>
          {facets.allBrandNames.length > 8 && (
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
              <input value={brandQuery} onChange={(e) => setBrandQuery(e.target.value)} placeholder="Search brands" aria-label="Search brands" className="h-9 w-full rounded-md pl-8 pr-2.5 text-sm ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          )}
          <div className="space-y-2.5">
            {shownBrands.map((b) => (
              <CountedOption key={b} checked={f.brand.includes(b)} onChange={() => toggleIn('brand', b)} label={b} count={facets.brands[b] ?? 0} disabled={!facets.brands[b]} />
            ))}
            {brandQuery && shownBrands.length === 0 && <p className="text-[13px] text-ink-500">No brand matches “{brandQuery}”.</p>}
          </div>
          {!brandQuery && brandNames.length > 8 && (
            <button type="button" onClick={() => setAllBrands((s) => !s)} className="mt-3 text-[13px] font-semibold text-ink-900 underline underline-offset-2">
              {allBrands ? 'Show fewer' : `Show all ${brandNames.length} brands`}
            </button>
          )}
        </Section>
      )}

      <Section title="Price" count={f.min != null || f.max != null ? 1 : 0}>
        <label className="block text-xs font-medium text-ink-600" htmlFor="price-range">Choose a price range</label>
        <select
          id="price-range"
          value={priceRangeValue}
          onChange={(e) => {
            if (e.target.value === '') return update({ min: null, max: null })
            const [a, b] = PRICE_BUCKETS[Number(e.target.value)]
            update({ min: a, max: b === Infinity ? null : b })
          }}
          className="mt-2 h-11 w-full rounded-lg bg-white px-3 text-sm text-ink-900 ring-1 ring-inset ring-ink-200 outline-none transition focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All prices</option>
          {priceRangeValue === 'custom' && <option value="custom" disabled>Custom price range</option>}
          {PRICE_BUCKETS.map(([a, , label], i) => <option key={a} value={i}>{label}{facets.price[i] ? ` (${facets.price[i]})` : ''}</option>)}
        </select>
        <PriceInputs f={f} update={update} />
      </Section>

      <Section title="Customer rating" count={f.rating ? 1 : 0}>
        <div className="space-y-2.5">
          {RATINGS.map((r, i) => (
            <CountedOption
              key={r}
              checked={f.rating === r}
              onChange={() => update({ rating: f.rating === r ? null : r })}
              disabled={!facets.rating[i]}
              count={facets.rating[i]}
              label={
                <span className="inline-flex items-center gap-1">
                  {r} <Star className="size-3.5 fill-star text-star" strokeWidth={0} /> & above
                </span>
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Discount" count={f.disc ? 1 : 0}>
        <div className="space-y-2.5">
          {DISCOUNTS.map((d, i) => (
            <CountedOption key={d} checked={f.disc === d} onChange={() => update({ disc: f.disc === d ? null : d })} label={`${d}% off or more`} count={facets.disc[i]} disabled={!facets.disc[i]} />
          ))}
        </div>
      </Section>

      <Section title="Delivery & availability" count={f.fast + f.free + f.verified + f.instock}>
        <div className="space-y-2.5">
          <CountedOption checked={f.fast} onChange={() => update({ fast: !f.fast })} label="Get it by tomorrow" count={facets.fast} disabled={!facets.fast} />
          <CountedOption checked={f.free} onChange={() => update({ free: !f.free })} label="Free delivery" count={facets.free} disabled={!facets.free} />
          <CountedOption checked={f.verified} onChange={() => update({ verified: !f.verified })} label="Bazaar Verified" count={facets.verified} disabled={!facets.verified} />
          <CountedOption checked={f.instock} onChange={() => update({ instock: !f.instock })} label="Hide low stock" count={facets.instock} disabled={!facets.instock} />
        </div>
      </Section>
    </div>
  )
}
