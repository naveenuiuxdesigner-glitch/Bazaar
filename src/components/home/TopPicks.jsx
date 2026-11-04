import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { catalog } from '../../services/catalog'
import { useAsync } from '../../hooks/useAsync'
import { ProductCard } from '../product/ProductCard'
import { ProductCardSkeleton } from '../ui/Skeleton'
import { SectionHeader } from '../ui/SectionHeader'
import { ErrorState } from '../ui/States'

const TABS = [
  { id: 'mobiles', label: 'Phones', cats: ['mobiles'] },
  { id: 'laptops', label: 'Laptops & tablets', cats: ['laptops'] },
  { id: 'audio', label: 'Audio & wearables', cats: ['electronics'] },
  { id: 'footwear', label: 'Sneakers & running', cats: ['footwear'] },
  { id: 'home', label: 'Home & kitchen', cats: ['kitchen', 'home', 'appliances'] },
  { id: 'beauty', label: 'Beauty', cats: ['beauty'] },
]

export function TopPicks() {
  const [tab, setTab] = useState(TABS[0].id)
  const id = useId()
  const current = TABS.find((t) => t.id === tab)
  const { data, loading, error, retry } = useAsync(async () => {
    const lists = await Promise.all(current.cats.map((c) => catalog.list({ category: c })))
    const merged = lists.flat()
    // interleave brands so the grid always reads as multi-brand
    const byBrand = {}
    merged.forEach((p) => (byBrand[p.brand] ??= []).push(p))
    const queues = Object.values(byBrand)
    const out = []
    while (out.length < 10 && queues.some((q) => q.length)) queues.forEach((q) => q.length && out.length < 10 && out.push(q.shift()))
    return out
  }, [tab])

  return (
    <section aria-labelledby={`${id}-title`}>
      <SectionHeader id={`${id}-title`} eyebrow="Every brand, one place" title="Top picks across brands" to={`/c/${current.cats[0]}`} action={`Shop ${current.label.toLowerCase()}`} />
      <div role="tablist" aria-label="Product groups" className="scrollbar-none -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        {TABS.map((t) => {
          const active = t.id === tab
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`${id}-panel`}
              onClick={() => setTab(t.id)}
              className={`relative h-10 shrink-0 rounded-full px-4 active:scale-[0.97] text-[13.5px] font-medium transition-colors ${active ? 'text-white' : 'bg-white text-ink-700 ring-1 ring-inset ring-ink-200 hover:text-ink-950 hover:ring-ink-300'}`}
            >
              {active && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-full bg-ink-950" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              <span className="relative">{t.label}</span>
            </button>
          )
        })}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-busy={loading}>
        {error ? (
          <ErrorState onRetry={retry} />
        ) : (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-10">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <li key={i} className={i >= 6 ? 'hidden lg:block' : i >= 4 ? 'hidden sm:block' : ''}>
                    <ProductCardSkeleton />
                  </li>
                ))
              : data.map((p, i) => (
                  <motion.li key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.035, ease: [0.2, 0.8, 0.2, 1] }} className={i >= 8 ? 'hidden lg:block' : i >= 6 ? 'hidden sm:block' : ''}>
                    <ProductCard product={p} />
                  </motion.li>
                ))}
          </ul>
        )}
      </div>
    </section>
  )
}
