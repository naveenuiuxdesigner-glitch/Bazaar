import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Lock, MapPin, RotateCcw, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { useAccount } from '../context/AccountContext'
import { CartLine, CouponBox } from '../components/cart/CartDrawer'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { ProductArt } from '../components/art/ProductArt'
import { ProductRail } from '../components/product/ProductRail'
import { SectionHeader } from '../components/ui/SectionHeader'
import { productById } from '../data/products'
import { catalog } from '../services/catalog'
import { useAsync } from '../hooks/useAsync'
import { deliveryLabel, formatPrice } from '../lib/format'

export function OrderSummary({ totals, extra, children, title = 'Order summary' }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between text-ink-600"><dt>Price ({totals.count} {totals.count === 1 ? 'item' : 'items'})</dt><dd className="num">{formatPrice(totals.mrp)}</dd></div>
        {totals.savings > 0 && <div className="flex justify-between text-save-700"><dt>Discount on MRP</dt><dd className="num">−{formatPrice(totals.savings)}</dd></div>}
        {totals.exchangeCredit > 0 && <div className="flex justify-between text-save-700"><dt>Device exchange estimate</dt><dd className="num">−{formatPrice(totals.exchangeCredit)}</dd></div>}
        {totals.couponDiscount > 0 && <div className="flex justify-between text-save-700"><dt>Coupon</dt><dd className="num">−{formatPrice(totals.couponDiscount)}</dd></div>}
        {extra}
        <div className="flex justify-between text-ink-600"><dt>Delivery</dt><dd className="num">{totals.delivery ? formatPrice(totals.delivery) : <span className="font-medium text-save-700">Free</span>}</dd></div>
        {children}
      </dl>
    </div>
  )
}

function SavedForLater() {
  const { saved, moveToCart, removeSaved } = useStore()
  const items = saved.map((id) => productById[id]).filter(Boolean)
  if (!items.length) return null
  return (
    <section className="mt-12" aria-labelledby="saved-title">
      <h2 id="saved-title" className="font-display text-xl font-bold tracking-tight">Saved for later <span className="text-ink-400 num">({items.length})</span></h2>
      <ul className="mt-4 divide-y divide-ink-150 border-y border-ink-150">
        <AnimatePresence initial={false}>
          {items.map((p) => (
            <motion.li key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 30 }} className="flex gap-4 py-4">
              <Link to={`/p/${p.id}`} className="size-20 shrink-0 overflow-hidden rounded-md bg-studio">
                <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full p-1.5" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">{p.brand}</p>
                <Link to={`/p/${p.id}`} className="mt-0.5 line-clamp-2 text-sm text-ink-900 hover:underline">{p.title}</Link>
                <p className="mt-1 text-sm font-semibold num">{formatPrice(p.price)}</p>
                <div className="mt-2 flex gap-4 text-[13px] font-semibold">
                  <button type="button" onClick={() => moveToCart(p.id)} className="text-ink-950 underline underline-offset-2">Move to cart</button>
                  <button type="button" onClick={() => removeSaved(p.id)} className="text-ink-500 hover:text-ink-950">Remove</button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}

export default function Cart() {
  const { cartItems, totals, location, cart, wishlist } = useStore()
  const { user } = useAccount()
  const rec = useAsync(() => catalog.recommended([...cart.map((c) => c.id), ...wishlist].slice(0, 6), 12), [cart.length])

  useEffect(() => {
    document.title = 'Cart · BAZAAR'
  }, [])

  if (!cartItems.length)
    return (
      <div className="container-page">
        <EmptyState icon={ShoppingBag} title="Your cart is empty" body="Add products from any brand. Everything checks out together.">
          <Button to="/deals">Shop today’s deals</Button>
          <Button to="/wishlist" variant="secondary">Go to wishlist</Button>
        </EmptyState>
        <SavedForLater />
        <section className="mt-16">
          <SectionHeader title="Popular right now" />
          <ProductRail label="Popular products" loading={rec.loading} products={rec.data ?? []} />
        </section>
      </div>
    )

  const latest = Math.max(...cartItems.map((i) => i.product.delivery.days))
  const sellers = new Set(cartItems.map((i) => i.product.seller.id)).size

  return (
    <div className="container-page pb-28 pt-8 lg:pb-0">
      <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Cart <span className="text-ink-400 num">({totals.count})</span></h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
        <MapPin className="size-4" /> Delivering to {location.city} {location.pincode} · {sellers > 1 ? `${sellers} sellers, one checkout` : 'one seller'}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div>
          <ul className="divide-y divide-ink-150 border-y border-ink-150">
            <AnimatePresence initial={false}>
              {cartItems.map((i) => (
                <CartLine
                  key={`${i.id}:${i.size ?? ''}:${i.color ?? ''}:${i.exchange?.model ?? ''}`}
                  item={i}
                  compact={false}
                  note={
                    <span className="w-full text-ink-500">
                      {i.product.delivery.free || totals.subtotal >= 499 ? 'Free delivery' : 'Delivery'} <span className="font-medium text-ink-800">{deliveryLabel(i.product.delivery)}</span>
                    </span>
                  }
                />
              ))}
            </AnimatePresence>
          </ul>
          <SavedForLater />
        </div>
        <aside className="h-fit space-y-5 rounded-xl bg-ink-50 p-5 ring-1 ring-inset ring-ink-150 lg:sticky lg:top-36">
          <CouponBox />
          <OrderSummary totals={totals}>
            <div className="flex justify-between border-t border-ink-200 pt-3 text-lg font-semibold text-ink-950"><dt>Total</dt><dd className="num">{formatPrice(totals.total)}</dd></div>
          </OrderSummary>
          {totals.savings + totals.couponDiscount > 0 && (
            <p className="rounded-md bg-save-50 px-3 py-2 text-[13px] font-medium text-save-700">You save {formatPrice(totals.savings + totals.couponDiscount)} on this order</p>
          )}
          <Button to="/checkout" size="lg" className="w-full">
            <Lock className="size-4" /> {user ? 'Proceed to checkout' : 'Sign in to checkout'}
          </Button>
          <p className="text-center text-xs text-ink-500">Arrives in {latest <= 1 ? '1 day' : `${latest} days`} or less · UPI, cards, net banking, EMI and cash on delivery</p>
          <ul className="grid grid-cols-2 gap-2 border-t border-ink-200 pt-4 text-xs text-ink-600">
            <li className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-ink-500" /> Genuine products</li>
            <li className="flex items-center gap-1.5"><RotateCcw className="size-4 text-ink-500" /> Easy returns</li>
          </ul>
        </aside>
      </div>

      <section className="mt-16">
        <SectionHeader title="Add to your order" subtitle="Picked for what’s in your cart" />
        <ProductRail label="Recommended" loading={rec.loading} products={(rec.data ?? []).filter((p) => !cart.some((c) => c.id === p.id))} />
      </section>

      <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-ink-150 bg-white/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <div className="flex-1">
          <p className="text-[17px] font-semibold num">{formatPrice(totals.total)}</p>
          {totals.savings > 0 && <p className="text-[11px] font-semibold text-save-700">Saving {formatPrice(totals.savings + totals.couponDiscount)}</p>}
        </div>
        <Button to="/checkout" size="lg">Checkout</Button>
      </div>
    </div>
  )
}
