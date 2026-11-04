import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpLeft, ArrowUpRight, Clock, Search, TrendingUp, X } from 'lucide-react'
import { suggest, trendingSearches } from '../../services/catalog'
import { load, save } from '../../lib/storage'
import { ProductArt } from '../art/ProductArt'
import { formatPrice } from '../../lib/format'
import { useClickOutside } from '../../hooks/useUi'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import { featuredBrands } from '../../data/brands'
import { photo } from '../../data/photos'
import { Photo } from '../ui/Photo'

// Shown when the box is focused but empty, so search doubles as a discovery surface.
const POPULAR_CATS = ['mobiles', 'electronics', 'fashion', 'footwear', 'beauty', 'home'].map((slug) => categories.find((c) => c.slug === slug))
const SUGGESTED = products
  .filter((p) => p.image)
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 4)
const BRANDS = featuredBrands.slice(0, 8).map((b) => b.name)

const PLACEHOLDERS = ['Search iPhone 17 Pro', 'Search running shoes', 'Search OLED TVs', 'Search air fryers', 'Search Atomic Habits']

function Highlight({ text, q }) {
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (!q || i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent font-semibold text-ink-950">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

export function SearchBar({ className = '', size = 'lg' }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [recent, setRecent] = useState(() => load('searches', []))
  const [ph, setPh] = useState(0)
  const wrap = useRef(null)
  const input = useRef(null)
  const listId = useId()

  useClickOutside(wrap, () => setOpen(false), open)

  // rotating placeholder hints (paused while typing)
  useEffect(() => {
    if (q) return
    const t = setInterval(() => setPh((n) => (n + 1) % PLACEHOLDERS.length), 3200)
    return () => clearInterval(t)
  }, [q])

  // '/' focuses search
  useEffect(() => {
    const on = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        input.current?.focus()
      }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  const s = useMemo(() => suggest(q), [q])

  const items = useMemo(() => {
    if (!q.trim()) {
      return [
        ...recent.slice(0, 4).map((t) => ({ type: 'recent', label: t, go: () => submit(t) })),
        ...trendingSearches.slice(0, 6).map((t) => ({ type: 'trending', label: t, go: () => submit(t) })),
        ...POPULAR_CATS.map((c) => ({ type: 'popcat', cat: c, label: c.name, go: () => goto(`/c/${c.slug}`) })),
        ...SUGGESTED.map((p) => ({ type: 'suggest', product: p, label: p.title, go: () => goto(`/p/${p.id}`) })),
        ...BRANDS.map((b) => ({ type: 'popbrand', label: b, go: () => goto(`/brand/${encodeURIComponent(b)}`) })),
      ]
    }
    return [
      ...s.queries.map((t) => ({ type: 'query', label: t, go: () => submit(t) })),
      ...s.brands.map((b) => ({ type: 'brand', label: b, go: () => goto(`/brand/${encodeURIComponent(b)}`, b) })),
      ...s.categories.map((c) => ({ type: 'category', label: c.name, go: () => goto(`/c/${c.slug}`, c.name) })),
      ...s.products.map((p) => ({ type: 'product', product: p, label: p.title, go: () => goto(`/p/${p.id}`, q) })),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, s, recent])

  function remember(term) {
    const next = [term, ...recent.filter((x) => x.toLowerCase() !== term.toLowerCase())].slice(0, 6)
    setRecent(next)
    save('searches', next)
  }
  function goto(path, term) {
    if (term) remember(term)
    setOpen(false)
    setQ('')
    input.current?.blur()
    navigate(path)
  }
  function submit(term) {
    const t = term.trim()
    if (!t) return
    remember(t)
    setOpen(false)
    setQ(t)
    input.current?.blur()
    navigate(`/search?q=${encodeURIComponent(t)}`)
  }
  function clearRecent() {
    setRecent([])
    save('searches', [])
  }

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) setOpen(true)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % items.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a <= 0 ? items.length - 1 : a - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (active >= 0 && items[active]) items[active].go()
      else submit(q)
    } else if (e.key === 'Escape') {
      e.preventDefault() // stop the native search input from clearing the query
      setOpen(false)
      input.current?.blur()
    }
  }

  const h = size === 'lg' ? 'h-12' : 'h-11'
  const showRecent = !q.trim() && recent.length > 0
  let idx = -1
  const optionProps = (item) => {
    idx += 1
    const i = idx
    return {
      id: `${listId}-${i}`,
      role: 'option',
      'aria-selected': active === i,
      onMouseEnter: () => setActive(i),
      onMouseDown: (e) => e.preventDefault(),
      onClick: item.go,
      'data-active': active === i || undefined,
    }
  }
  const rowCls = 'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-ink-700 transition-colors data-[active]:bg-brand-50 data-[active]:text-ink-950'

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          submit(q)
        }}
        className={`group relative flex ${h} items-center rounded-xl bg-ink-100 ring-1 ring-inset ring-transparent transition-[background-color,box-shadow] duration-200 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgb(52_97_255/0.14)] focus-within:ring-2 focus-within:ring-brand-500 hover:bg-ink-150 focus-within:hover:bg-white`}
      >
        <Search className="pointer-events-none absolute left-4 size-[18px] text-ink-500 transition-colors group-focus-within:text-brand-600" aria-hidden />
        <input
          ref={input}
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          aria-label="Search products, brands and categories"
          autoComplete="off"
          enterKeyHint="search"
          className="peer h-full w-full appearance-none bg-transparent pl-11 pr-12 text-[15px] text-ink-950 focus:outline-none sm:pr-28 [&::-webkit-search-cancel-button]:hidden"
        />
        {!q && (
          <span className="pointer-events-none absolute left-11 right-12 overflow-hidden text-[15px] text-ink-500 sm:right-28" aria-hidden>
            <span key={ph} className="block animate-[ph-in_280ms_cubic-bezier(0.2,0.8,0.2,1)] truncate">
              {PLACEHOLDERS[ph]}
            </span>
          </span>
        )}
        <div className="absolute right-1.5 flex items-center gap-1">
          {q ? (
            <button type="button" onClick={() => { setQ(''); input.current?.focus() }} aria-label="Clear search" className="grid size-8 place-items-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900">
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="mr-1 hidden h-6 items-center rounded border border-ink-200 bg-white px-1.5 font-sans text-[11px] font-medium text-ink-500 lg:inline-flex">/</kbd>
          )}
          <button type="submit" className={`hidden ${size === 'lg' ? 'h-9' : 'h-8'} items-center rounded-lg bg-ink-950 px-3.5 text-[13px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-600 active:scale-[0.97] sm:inline-flex`}>
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {open && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[min(72vh,600px)] overflow-y-auto overscroll-contain rounded-2xl bg-white p-2 shadow-pop ring-1 ring-ink-950/5"
          >
            <ul id={listId} role="listbox" aria-label="Search suggestions">
              {!q.trim() && (
                <>
                  {showRecent && (
                    <li role="presentation" className="flex items-center justify-between px-3 pb-1 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Recent</span>
                      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={clearRecent} className="text-xs font-medium text-ink-500 hover:text-ink-900">
                        Clear
                      </button>
                    </li>
                  )}
                  {items
                    .filter((i) => i.type === 'recent')
                    .map((item) => (
                      <li key={'r' + item.label} {...optionProps(item)} className={rowCls}>
                        <Clock className="size-4 text-ink-400" /> <span className="flex-1 truncate">{item.label}</span>
                        <ArrowUpLeft className="size-4 text-ink-300" />
                      </li>
                    ))}
                  <li role="presentation" className="px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                    Trending now
                  </li>
                  <li role="presentation" className="flex flex-wrap gap-2 px-3 pb-2">
                    {items
                      .filter((i) => i.type === 'trending')
                      .map((item) => {
                        const props = optionProps(item)
                        return (
                          <span key={'t' + item.label} {...props} className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-ink-100 px-3 text-[13px] text-ink-800 transition-colors hover:bg-ink-150 data-[active]:bg-ink-950 data-[active]:text-white">
                            <TrendingUp className="size-3.5 text-deal-600 opacity-80" />
                            {item.label}
                          </span>
                        )
                      })}
                  </li>
                  <li role="presentation" className="px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Popular categories</li>
                  <li role="presentation" className="grid grid-cols-3 gap-2 px-3 pb-2 sm:grid-cols-6">
                    {items
                      .filter((i) => i.type === 'popcat')
                      .map((item) => {
                        const pic = photo(`cat-${item.cat.slug}`)
                        return (
                          <span key={'c' + item.label} {...optionProps(item)} className="group/cat cursor-pointer rounded-xl p-1 text-center transition-colors data-[active]:bg-brand-50">
                            <span className="block aspect-square overflow-hidden rounded-lg" style={{ backgroundColor: item.cat.tint }}>
                              {pic && <Photo src={pic.src} className="size-full" imgClassName="group-hover/cat:scale-110" />}
                            </span>
                            <span className="mt-1 block truncate text-[12px] font-medium text-ink-800">{item.label}</span>
                          </span>
                        )
                      })}
                  </li>
                  <li role="presentation" className="px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Suggested for you</li>
                  <li role="presentation" className="grid grid-cols-1 gap-1 px-1 pb-1 sm:grid-cols-2">
                    {items
                      .filter((i) => i.type === 'suggest')
                      .map((item) => (
                        <span key={'s' + item.product.id} {...optionProps(item)} className={rowCls}>
                          <span className="size-11 shrink-0 overflow-hidden rounded-lg bg-studio">
                            <ProductArt src={item.product.image} kind={item.product.art.kind} color={item.product.art.color} brand={item.product.brand} label={item.product.title} className="size-full" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] text-ink-900">{item.product.title}</span>
                            <span className="text-xs font-semibold text-ink-950 num">{formatPrice(item.product.price)}</span>
                          </span>
                        </span>
                      ))}
                  </li>
                  <li role="presentation" className="px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Brands</li>
                  <li role="presentation" className="flex flex-wrap gap-2 px-3 pb-3">
                    {items
                      .filter((i) => i.type === 'popbrand')
                      .map((item) => (
                        <span key={'b' + item.label} {...optionProps(item)} className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-full px-3 text-[13px] font-medium text-ink-800 ring-1 ring-inset ring-ink-200 transition-colors hover:ring-ink-400 data-[active]:bg-ink-950 data-[active]:text-white data-[active]:ring-ink-950">
                          {item.label}
                          <ArrowUpRight className="size-3.5 opacity-50" />
                        </span>
                      ))}
                  </li>
                </>
              )}
              {q.trim() &&
                items.map((item) =>
                  item.type === 'product' ? (
                    <li key={item.product.id} {...optionProps(item)} className={rowCls}>
                      <span className="size-11 shrink-0 overflow-hidden rounded-md bg-studio">
                        <ProductArt src={item.product.image} kind={item.product.art.kind} color={item.product.art.color} brand={item.product.brand} label={item.product.title} className="size-full" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-ink-900">
                          <Highlight text={item.product.title} q={q.trim()} />
                        </span>
                        <span className="text-xs text-ink-500">
                          {item.product.brand} · <span className="num">{formatPrice(item.product.price)}</span>
                        </span>
                      </span>
                    </li>
                  ) : (
                    <li key={item.type + item.label} {...optionProps(item)} className={rowCls}>
                      <Search className="size-4 text-ink-400" />
                      <span className="flex-1 truncate">
                        <Highlight text={item.label} q={q.trim()} />
                        {item.type !== 'query' && <span className="ml-1.5 text-xs text-ink-500">in {item.type === 'brand' ? 'Brands' : 'Categories'}</span>}
                      </span>
                    </li>
                  ),
                )}
            </ul>
            {q.trim() && (
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => submit(q)} className="mt-1 flex w-full items-center justify-between rounded-md border-t border-ink-150 px-3 py-2.5 text-left text-sm font-semibold text-ink-900 hover:bg-ink-50">
                See all results for “{q.trim()}”
                <span className="text-xs font-normal text-ink-500">Enter ↵</span>
              </button>
            )}
          </motion.div>
        )}
        {open && q.trim() && items.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-0 top-[calc(100%+6px)] z-50 rounded-xl bg-white p-5 text-sm text-ink-600 shadow-pop ring-1 ring-ink-950/5">
            No matches for “<span className="font-semibold text-ink-900">{q.trim()}</span>”. Try a brand like Samsung, or a category like headphones.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
