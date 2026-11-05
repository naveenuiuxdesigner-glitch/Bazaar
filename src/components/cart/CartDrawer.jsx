import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck, X } from 'lucide-react'
import { Overlay } from '../overlay/Overlay'
import { COUPONS, useStore } from '../../context/StoreContext'
import { ProductArt } from '../art/ProductArt'
import { formatPrice } from '../../lib/format'
import { Button } from '../ui/Button'
import { productColorName } from '../../lib/productOptions'

const FREE_DELIVERY_AT = 499

export function CartLine({ item, compact = true, onNavigate, note }) {
  const { setQty, removeFromCart, saveForLater } = useStore()
  const p = item.product
  return (
    <motion.li layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }} className="flex gap-3.5 py-4">
      <Link to={`/p/${p.id}`} onClick={onNavigate} className="size-20 shrink-0 overflow-hidden rounded-md bg-studio">
        <ProductArt src={p.colorGalleries?.[item.color]?.[0] ?? p.image} kind={p.art.kind} color={item.color ?? p.art.color} brand={p.brand} label={p.title} className="size-full p-1.5" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">{p.brand}</p>
        <Link to={`/p/${p.id}`} onClick={onNavigate} className="mt-0.5 line-clamp-2 text-[13px] leading-[18px] text-ink-900 hover:underline">
          {p.title}
        </Link>
        {item.size && <p className="mt-1 text-xs text-ink-500">Size: {item.size}</p>}
        {item.color && <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500"><span className="size-3 rounded-full ring-1 ring-ink-300" style={{ backgroundColor: item.color }} />{productColorName(item.color)}</p>}
        {item.exchange && <p className="mt-1 text-xs font-medium text-save-700">Exchange estimate: −{formatPrice(item.exchange.estimatedCredit)} · {item.exchange.brand} {item.exchange.model}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="inline-flex h-8 items-center rounded-md ring-1 ring-inset ring-ink-200">
            <button type="button" onClick={() => (item.qty === 1 ? removeFromCart(p.id, item.size, item.color, true, item.exchange) : setQty(p.id, item.qty - 1, item.size, item.color, item.exchange))} aria-label={item.qty === 1 ? `Remove ${p.title}` : 'Decrease quantity'} className="grid h-8 w-8 place-items-center rounded-l-md text-ink-700 hover:bg-ink-100">
              {item.qty === 1 ? <Trash2 className="size-3.5" /> : <Minus className="size-3.5" />}
            </button>
            <span className="w-7 text-center text-[13px] font-semibold num" aria-live="polite" aria-label={`Quantity ${item.qty}`}>
              {item.qty}
            </span>
            <button type="button" onClick={() => setQty(p.id, item.qty + 1, item.size, item.color, item.exchange)} disabled={item.qty >= Math.min(10, p.stock)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center rounded-r-md text-ink-700 hover:bg-ink-100 disabled:opacity-35">
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-ink-950 num">{formatPrice(p.price * item.qty)}</p>
            {p.discount > 0 && <p className="text-[11px] text-ink-500 line-through num">{formatPrice(p.mrp * item.qty)}</p>}
          </div>
        </div>
        {!compact && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            {note}
            <span className="text-ink-500">Sold by {p.seller.name}</span>
            <button type="button" onClick={() => saveForLater(p.id)} className="font-semibold text-ink-800 underline-offset-2 hover:text-ink-950 hover:underline">
              Save for later
            </button>
          </div>
        )}
      </div>
      {!compact && (
        <button type="button" onClick={() => removeFromCart(p.id, item.size, item.color, true, item.exchange)} aria-label={`Remove ${p.title}`} className="grid size-8 place-items-center self-start rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900">
          <X className="size-4" />
        </button>
      )}
    </motion.li>
  )
}

export function CouponSheet({ open, onClose }) {
  const { applyCoupon, coupon, totals, cartItems } = useStore()
  return (
    <Overlay open={open} onClose={onClose} label="Available coupons" className="md:!w-[480px]">
      <div className="max-h-[88dvh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <h2 className="font-display text-xl font-bold">Coupons for you</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink-100">
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-4 space-y-3">
          {Object.values(COUPONS).map((c) => {
            const value = c.apply(totals.subtotal, cartItems)
            const eligible = totals.subtotal >= c.min && value > 0
            const applied = coupon === c.code
            return (
              <li key={c.code} className={`rounded-lg p-4 ring-1 ring-inset ${applied ? 'bg-save-50 ring-save-600/40' : 'ring-ink-200'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="inline-block rounded border border-dashed border-ink-400 px-2 py-0.5 font-mono text-[13px] font-semibold tracking-wider">{c.code}</p>
                    <p className="mt-2 text-sm font-medium text-ink-900">{c.label}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {eligible ? `You save ${formatPrice(value)} on this cart` : totals.subtotal < c.min ? `Add ${formatPrice(c.min - totals.subtotal)} more to use this` : 'Not valid for the items in your cart'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={applied ? 'soft' : 'secondary'}
                    disabled={!eligible || applied}
                    onClick={() => {
                      applyCoupon(c.code)
                      onClose()
                    }}
                  >
                    {applied ? 'Applied' : 'Apply'}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Overlay>
  )
}

export function CouponBox() {
  const { coupon, applyCoupon, removeCoupon, totals } = useStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [sheet, setSheet] = useState(false)
  if (coupon) {
    const c = COUPONS[coupon]
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg bg-save-50 px-3.5 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Tag className="size-4 shrink-0 text-save-700" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink-900">
              {c.code} {totals.couponValid ? 'applied' : 'saved'}
            </p>
            <p className="truncate text-xs text-ink-600">{totals.couponValid ? `You save ${formatPrice(totals.couponDiscount)}` : `Add ${formatPrice(c.min - totals.subtotal)} more to use it`}</p>
          </div>
        </div>
        <button type="button" onClick={removeCoupon} className="text-[13px] font-semibold text-ink-700 underline underline-offset-2 hover:text-ink-950">
          Remove
        </button>
      </div>
    )
  }
  return (
    <>
    <CouponSheet open={sheet} onClose={() => setSheet(false)} />
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const res = applyCoupon(code)
        setError(res.ok ? '' : res.error)
        if (res.ok) setCode('')
      }}
    >
      <label htmlFor="coupon" className="sr-only">
        Coupon code
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <input
            id="coupon"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase())
              setError('')
            }}
            placeholder="Coupon code"
            aria-invalid={!!error}
            aria-describedby={error ? 'coupon-error' : 'coupon-hint'}
            className="h-10 w-full rounded-md bg-white pl-9 pr-3 text-sm uppercase tracking-wide ring-1 ring-inset ring-ink-200 placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:ring-danger-600"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={!code.trim()}>
          Apply
        </Button>
      </div>
      {error ? (
        <p id="coupon-error" className="mt-1.5 text-xs text-danger-700">
          {error}
        </p>
      ) : (
        <p id="coupon-hint" className="mt-1.5 text-xs text-ink-500">
          Try <button type="button" className="font-semibold text-ink-800 underline underline-offset-2" onClick={() => setCode('BAZAAR5')}>BAZAAR5</button> for 5% off, or{' '}
          <button type="button" className="font-semibold text-ink-800 underline underline-offset-2" onClick={() => setSheet(true)}>
            see all coupons
          </button>
        </p>
      )}
    </form>
    </>
  )
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, totals } = useStore()
  const close = () => setCartOpen(false)
  const remaining = Math.max(0, FREE_DELIVERY_AT - totals.subtotal)
  const progress = Math.min(1, totals.subtotal / FREE_DELIVERY_AT)

  return (
    <Overlay open={cartOpen} onClose={close} label="Shopping cart" variant="drawer-right">
      <header className="flex items-center justify-between border-b border-ink-150 px-5 py-4">
        <h2 className="font-display text-lg font-bold tracking-tight">
          Your cart {totals.count > 0 && <span className="ml-1 text-ink-500 num">({totals.count})</span>}
        </h2>
        <button type="button" onClick={close} aria-label="Close cart" className="-mr-2 grid size-10 place-items-center rounded-full text-ink-600 hover:bg-ink-100 hover:text-ink-950">
          <X className="size-5" />
        </button>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-ink-100">
            <ShoppingBag className="size-7 text-ink-500" />
          </div>
          <h3 className="mt-5 font-display text-xl font-bold tracking-tight">Your cart is empty</h3>
          <p className="mt-1.5 max-w-[260px] text-sm text-ink-500">Browse today’s deals or pick up where you left off from your wishlist.</p>
          <div className="mt-6 flex gap-2.5">
            <Button to="/deals" onClick={close}>
              Shop today’s deals
            </Button>
            <Button to="/wishlist" variant="secondary" onClick={close}>
              Wishlist
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="border-b border-ink-150 px-5 py-3.5">
            <p className="flex items-center gap-2 text-[13px] text-ink-700">
              <Truck className="size-4 text-ink-500" />
              {remaining > 0 ? (
                <span>
                  Add <span className="font-semibold text-ink-950 num">{formatPrice(remaining)}</span> more for free delivery
                </span>
              ) : (
                <span className="font-medium text-save-700">You’ve unlocked free delivery</span>
              )}
            </p>
            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Progress to free delivery">
              <motion.div className={`h-full rounded-full ${remaining > 0 ? 'bg-ink-950' : 'bg-save-600'}`} initial={false} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }} />
            </div>
          </div>

          <ul className="flex-1 divide-y divide-ink-150 overflow-y-auto px-5">
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <CartLine key={`${item.id}:${item.size ?? ''}:${item.color ?? ''}:${item.exchange?.model ?? ''}`} item={item} onNavigate={close} />
              ))}
            </AnimatePresence>
          </ul>

          <footer className="space-y-4 border-t border-ink-150 bg-ink-50 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <CouponBox />
            <dl className="space-y-1.5 text-[13px]">
              <div className="flex justify-between text-ink-600">
                <dt>Subtotal</dt>
                <dd className="num">{formatPrice(totals.mrp)}</dd>
              </div>
              {totals.savings > 0 && (
                <div className="flex justify-between text-save-700">
                  <dt>Discount</dt>
                  <dd className="num">−{formatPrice(totals.savings)}</dd>
                </div>
              )}
              {totals.exchangeCredit > 0 && <div className="flex justify-between text-save-700"><dt>Device exchange estimate</dt><dd className="num">−{formatPrice(totals.exchangeCredit)}</dd></div>}
              {totals.couponDiscount > 0 && (
                <div className="flex justify-between text-save-700">
                  <dt>Coupon</dt>
                  <dd className="num">−{formatPrice(totals.couponDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-ink-600">
                <dt>Delivery</dt>
                <dd className="num">{totals.delivery ? formatPrice(totals.delivery) : 'Free'}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-200 pt-2.5 text-base font-semibold text-ink-950">
                <dt>Total</dt>
                <dd className="num">{formatPrice(totals.total)}</dd>
              </div>
            </dl>
            <div className="flex gap-2.5">
              <Button to="/cart" variant="secondary" size="lg" className="flex-1" onClick={close}>
                View cart
              </Button>
              <Button to="/checkout" size="lg" className="flex-[2]" onClick={close}>
                Checkout · {formatPrice(totals.total)}
              </Button>
            </div>
          </footer>
        </>
      )}
    </Overlay>
  )
}
