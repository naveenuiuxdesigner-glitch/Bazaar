import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GitCompareArrows, Plus, Star, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { productById, products } from '../data/products'
import { ProductArt } from '../components/art/ProductArt'
import { AddToCartButton } from '../components/product/AddToCartButton'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { Checkbox } from '../components/form/Field'
import { deliveryLabel, formatPrice } from '../lib/format'

export default function Compare() {
  const { compare, toggleCompare, clearCompare } = useStore()
  const [diffOnly, setDiffOnly] = useState(false)
  const items = compare.map((id) => productById[id]).filter(Boolean)

  useEffect(() => {
    document.title = 'Compare products · BAZAAR'
  }, [])

  const rows = useMemo(() => {
    const specKeys = [...new Set(items.flatMap((p) => Object.keys(p.specs)))]
    const best = (vals, dir) => {
      const nums = vals.map((v) => (typeof v === 'number' ? v : null))
      const target = dir === 'min' ? Math.min(...nums.filter((n) => n != null)) : Math.max(...nums.filter((n) => n != null))
      return nums.map((n) => n === target && items.length > 1)
    }
    const r = [
      { label: 'Price', vals: items.map((p) => p.price), render: (v) => <span className="font-semibold num">{formatPrice(v)}</span>, best: best(items.map((p) => p.price), 'min') },
      { label: 'Discount', vals: items.map((p) => p.discount), render: (v) => (v ? <span className="font-semibold text-save-700 num">{v}% off</span> : '—'), best: best(items.map((p) => p.discount), 'max') },
      { label: 'Rating', vals: items.map((p) => p.rating), render: (v, p) => <span className="inline-flex items-center gap-1 num"><Star className="size-3.5 fill-star text-star" strokeWidth={0} /> {v.toFixed(1)} <span className="text-ink-500">({p.reviewCount.toLocaleString('en-IN')})</span></span>, best: best(items.map((p) => p.rating), 'max') },
      { label: 'Brand', vals: items.map((p) => p.brand) },
      { label: 'Type', vals: items.map((p) => p.subcategory) },
      { label: 'Delivery', vals: items.map((p) => `${p.delivery.free ? 'Free' : '₹49'}, ${deliveryLabel(p.delivery)}`) },
      { label: 'Returns', vals: items.map((p) => p.returns.policy) },
      { label: 'Seller', vals: items.map((p) => `${p.seller.name} (${p.seller.rating}★)`) },
      ...specKeys.map((k) => ({ label: k, vals: items.map((p) => p.specs[k] ?? '—') })),
    ]
    return r.map((row) => ({ ...row, same: row.vals.every((v) => String(v) === String(row.vals[0])) }))
  }, [items])

  if (items.length === 0)
    return (
      <div className="container-page">
        <EmptyState icon={GitCompareArrows} title="Nothing to compare yet" body="Tick “Compare” on up to four products in the same category to see them side by side.">
          <Button to="/c/mobiles">Compare phones</Button>
          <Button to="/c/laptops" variant="secondary">Compare laptops</Button>
        </EmptyState>
      </div>
    )

  const cat = items[0].category
  const suggestions = products.filter((p) => p.category === cat && !compare.includes(p.id)).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4)
  const shown = diffOnly ? rows.filter((r) => !r.same) : rows
  const cols = `160px repeat(${items.length + (items.length < 4 ? 1 : 0)}, minmax(180px, 1fr))`

  return (
    <div className="container-page pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Compare {items[0].categoryName.toLowerCase()}</h1>
          <p className="mt-1 text-sm text-ink-500">{items.length} of 4 products. Best values are highlighted.</p>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox label="Show differences only" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} />
          <button type="button" onClick={clearCompare} className="text-sm font-semibold text-ink-700 underline underline-offset-2 hover:text-ink-950">
            Clear all
          </button>
        </div>
      </div>

      <div className="-mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="min-w-max sm:min-w-0">
          <div className="grid gap-4 border-b border-ink-150 pb-6" style={{ gridTemplateColumns: cols }}>
            <div />
            {items.map((p) => (
              <div key={p.id} className="relative">
                <button type="button" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.title}`} className="absolute right-2 top-2 z-10 grid size-8 place-items-center rounded-full bg-white text-ink-700 shadow-lift hover:text-ink-950">
                  <X className="size-4" />
                </button>
                <Link to={`/p/${p.id}`} className="block aspect-square overflow-hidden rounded-lg bg-studio">
                  <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full p-[10%]" />
                </Link>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">{p.brand}</p>
                <Link to={`/p/${p.id}`} className="mt-1 line-clamp-2 text-sm font-medium text-ink-900 hover:underline">{p.title}</Link>
                <AddToCartButton id={p.id} className="mt-3 w-full" />
              </div>
            ))}
            {items.length < 4 && (
              <div className="flex flex-col">
                <div className="grid aspect-square place-items-center rounded-lg border border-dashed border-ink-300 text-center">
                  <div className="px-4">
                    <Plus className="mx-auto size-6 text-ink-400" />
                    <p className="mt-2 text-[13px] text-ink-500">Add a product</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {suggestions.slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => toggleCompare(p.id)} className="flex w-full items-center gap-2 rounded-md p-1 text-left hover:bg-ink-50">
                        <span className="size-9 shrink-0 overflow-hidden rounded bg-studio">
                          <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full" />
                        </span>
                        <span className="line-clamp-2 text-xs text-ink-700">{p.brand} {p.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <dl>
            {shown.map((r) => (
              <div key={r.label} className="grid gap-4 border-b border-ink-150 py-3.5 text-sm" style={{ gridTemplateColumns: cols }}>
                <dt className="font-medium text-ink-500">{r.label}</dt>
                {r.vals.map((v, i) => (
                  <dd key={i} className={`rounded-md text-ink-900 ${r.best?.[i] ? '-mx-2 -my-1 bg-save-50 px-2 py-1' : ''}`}>
                    {r.render ? r.render(v, items[i]) : v}
                  </dd>
                ))}
                {items.length < 4 && <dd />}
              </div>
            ))}
            {diffOnly && shown.length === 0 && <p className="py-8 text-sm text-ink-500">These products match on every listed spec.</p>}
          </dl>
        </div>
      </div>
    </div>
  )
}
