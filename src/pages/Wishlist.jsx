import { useEffect } from 'react'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { productById } from '../data/products'
import { ProductCard } from '../components/product/ProductCard'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { formatPrice } from '../lib/format'

export default function Wishlist() {
  const { wishlist, addToCart, toggleWishlist, setCartOpen, inCart } = useStore()
  const items = wishlist.map((id) => productById[id]).filter(Boolean)
  const total = items.reduce((s, p) => s + p.price, 0)
  const dropped = items.filter((p) => p.discount >= 20).length

  useEffect(() => {
    document.title = 'Wishlist · BAZAAR'
  }, [])

  return (
    <div className="container-page pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Wishlist</h1>
          <p className="mt-1 text-sm text-ink-500">
            {items.length ? `${items.length} saved ${items.length === 1 ? 'item' : 'items'} · ${formatPrice(total)} in total${dropped ? ` · ${dropped} with 20%+ off right now` : ''}` : 'Save products to compare and buy later.'}
          </p>
        </div>
        {items.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                items.forEach((p) => toggleWishlist(p.id))
              }}
            >
              <Trash2 className="size-4" /> Clear
            </Button>
            <Button
              onClick={() => {
                items.filter((p) => !inCart(p.id)).forEach((p) => addToCart(p.id, 1, { silent: true }))
                setCartOpen(true)
              }}
            >
              <ShoppingBag className="size-4" /> Add all to cart
            </Button>
          </div>
        )}
      </div>
      {items.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty" body="Tap the heart on any product to save it here. We’ll keep it synced on this device.">
          <Button to="/deals">Explore today’s deals</Button>
        </EmptyState>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-4">
          {items.map((p) => <li key={p.id}><ProductCard product={p} compare /></li>)}
        </ul>
      )}
    </div>
  )
}
