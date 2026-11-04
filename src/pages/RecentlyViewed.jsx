import { useEffect } from 'react'
import { History } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { productById } from '../data/products'
import { ProductCard } from '../components/product/ProductCard'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { Recommended } from '../components/home/PersonalRails'

export default function RecentlyViewed() {
  const { recent, clearRecent } = useStore()
  const items = recent.map((id) => productById[id]).filter(Boolean)
  useEffect(() => {
    document.title = 'Recently viewed · BAZAAR'
  }, [])
  return (
    <div className="container-page pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Recently viewed</h1>
          <p className="mt-1 text-sm text-ink-500">The last {items.length || 16} products you looked at on this device.</p>
        </div>
        {items.length > 0 && (
          <Button variant="secondary" onClick={clearRecent}>
            Clear history
          </Button>
        )}
      </div>
      {items.length === 0 ? (
        <EmptyState icon={History} title="No browsing history yet" body="Products you open will show up here so you can find them again.">
          <Button to="/deals">See today’s deals</Button>
        </EmptyState>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-4">
          {items.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      )}
      <div className="mt-16">
        <Recommended />
      </div>
    </div>
  )
}
