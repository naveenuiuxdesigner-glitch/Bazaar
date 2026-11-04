import { Link } from 'react-router-dom'
import { History, Sparkles } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { catalog } from '../../services/catalog'
import { useAsync } from '../../hooks/useAsync'
import { productById } from '../../data/products'
import { ProductRail } from '../product/ProductRail'
import { SectionHeader } from '../ui/SectionHeader'
import { ProductArt } from '../art/ProductArt'
import { formatPrice } from '../../lib/format'
import { ErrorState } from '../ui/States'

export function Recommended() {
  const { recent, wishlist, cart } = useStore()
  const seeds = [...cart.map((c) => c.id), ...wishlist, ...recent].slice(0, 8)
  const key = seeds.join(',')
  const { data, loading, error, retry } = useAsync(() => catalog.recommended(seeds, 12), [key])
  return (
    <section aria-labelledby="rec-title">
      <SectionHeader
        id="rec-title"
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5" /> For you
          </span>
        }
        tone="violet"
        title="Recommended for you"
        subtitle={seeds.length ? 'Based on what you’ve viewed, saved and added to cart.' : 'Popular with shoppers like you right now.'}
      />
      {error ? <ErrorState onRetry={retry} /> : <ProductRail label="Recommended products" loading={loading} products={data ?? []} />}
    </section>
  )
}

export function RecentlyViewed() {
  const { recent, clearRecent, openQuickView } = useStore()
  const items = recent.map((id) => productById[id]).filter(Boolean)
  return (
    <section aria-labelledby="recent-title">
      <SectionHeader id="recent-title" title="Recently viewed">
        {items.length > 0 && (
          <button type="button" onClick={clearRecent} className="text-sm font-medium text-ink-500 hover:text-ink-950">
            Clear history
          </button>
        )}
      </SectionHeader>
      {items.length === 0 ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl bg-ink-50 p-4 ring-1 ring-inset ring-ink-150 sm:flex-nowrap sm:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-inset ring-ink-150 sm:size-11">
            <History className="size-5 text-ink-500" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-ink-950">Nothing here yet</p>
            <p className="text-sm text-ink-500">Products you open will show up here, so you can pick up where you left off.</p>
          </div>
          <Link to="/deals" className="inline-flex h-10 w-full items-center justify-center rounded-md sm:w-auto bg-white px-4 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-ink-400">
            Browse today’s deals
          </Link>
        </div>
      ) : (
        <ul className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {items.map((p) => {
            return (
              <li key={p.id} className="w-[132px] shrink-0 sm:w-[148px]">
                <button type="button" onClick={() => openQuickView(p.id)} className="group block w-full text-left">
                  <span className="block aspect-square overflow-hidden rounded-lg bg-studio">
                    <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full p-[10%] transition-transform duration-500 ease-out-soft group-hover:scale-105" />
                  </span>
                  <span className="mt-2 line-clamp-1 block text-[13px] text-ink-800 group-hover:underline">{p.title}</span>
                  <span className="text-[13px] font-semibold text-ink-950 num">{formatPrice(p.price)}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
