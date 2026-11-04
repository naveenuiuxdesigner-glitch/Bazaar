import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, Copy, FileText, LifeBuoy, Loader2, RotateCcw, ShoppingBag, Star, Truck, X, XCircle } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { useStore } from '../context/StoreContext'
import { bucketOf, canCancel, eventAt, headline, isPrepaid, returnable, statusOf } from '../services/orders'
import { OrderItemRow, ProgressTrack, StatusBadge, TrackingLog } from '../components/orders/OrderParts'
import { AddressLines } from '../components/account/AddressForm'
import { Overlay } from '../components/overlay/Overlay'
import { RadioCard } from '../components/form/Field'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/States'
import { formatDate, formatDateTime } from '../lib/dates'
import { formatPrice } from '../lib/format'

const CANCEL_REASONS = ['Ordered by mistake', 'Found a better price elsewhere', 'Delivery date is too late', 'Want to change the address or payment', 'No longer needed']

function CancelDialog({ open, onClose, order, onConfirm }) {
  const [reason, setReason] = useState(CANCEL_REASONS[0])
  const [busy, setBusy] = useState(false)
  return (
    <Overlay open={open} onClose={onClose} label="Cancel order" className="md:!w-[480px]">
      <div className="max-h-[90dvh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <h2 className="font-display text-xl font-bold">Cancel this order?</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink-100">
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-1 text-sm text-ink-600">{isPrepaid(order) ? `${formatPrice(order.totals.total)} will be refunded to your ${order.payment.short}.` : 'Nothing has been charged for this cash on delivery order.'}</p>
        <fieldset className="mt-5 space-y-2">
          <legend className="mb-2 text-[13px] font-medium text-ink-800">Why are you cancelling?</legend>
          {CANCEL_REASONS.map((r) => (
            <RadioCard key={r} name="cancel-reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="py-3">
              <span className="text-sm">{r}</span>
            </RadioCard>
          ))}
        </fieldset>
        <div className="mt-6 flex gap-2.5">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Keep order</Button>
          <Button
            className="flex-1"
            disabled={busy}
            onClick={async () => {
              setBusy(true)
              await new Promise((r) => setTimeout(r, 700))
              setBusy(false)
              onConfirm(reason.toLowerCase())
            }}
          >
            {busy && <Loader2 className="size-4 animate-spin" />} Cancel order
          </Button>
        </div>
      </div>
    </Overlay>
  )
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders, now, cancelOrder } = useAccount()
  const { addToCart, setCartOpen, toast } = useStore()
  const [cancelOpen, setCancelOpen] = useState(false)
  const order = orders.find((o) => o.id === id)

  useEffect(() => {
    document.title = `Order ${id} · BAZAAR`
  }, [id])

  if (!order)
    return (
      <div className="container-page">
        <EmptyState title="We couldn’t find that order" body="Check the order ID, or find it in your order list.">
          <Button to="/orders">Your orders</Button>
        </EmptyState>
      </div>
    )

  const bucket = bucketOf(order, now)
  const code = statusOf(order, now)
  const canRet = returnable(order, now)
  const delivered = eventAt(order, 'delivered')
  const t = order.totals

  const buyAgain = () => {
    order.items.forEach((i) => addToCart(i.id, i.qty, { silent: true, size: i.size, color: i.color }))
    setCartOpen(true)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.courier.awb)
      toast({ title: 'Tracking number copied' })
    } catch {
      toast({ title: `Tracking number: ${order.courier.awb}` })
    }
  }

  return (
    <div className="container-page max-w-[1080px] pt-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-ink-500">
        <Link to="/account" className="hover:text-ink-950">Account</Link>
        <ChevronRight className="size-3.5" />
        <Link to="/orders" className="hover:text-ink-950">Orders</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-ink-800 num">{order.id}</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">Order <span className="num">{order.id}</span></h1>
          <p className="mt-1 text-sm text-ink-500">Placed {formatDateTime(order.placedAt)} · {order.items.reduce((s, i) => s + i.qty, 0)} items · {formatPrice(t.total)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button to={`/orders/${order.id}/invoice`} target="_blank" variant="secondary" size="sm"><FileText className="size-4" /> Invoice</Button>
          <Button to={`/help?order=${order.id}#contact`} variant="secondary" size="sm"><LifeBuoy className="size-4" /> Get help</Button>
        </div>
      </div>

      <section className="mt-6 rounded-xl p-5 ring-1 ring-inset ring-ink-150 sm:p-6" aria-label="Order status">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <StatusBadge order={order} now={now} />
            <p className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">{headline(order, now)}</p>
            {bucket === 'active' && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-600">
                <Truck className="size-4" /> {order.courier.name} · AWB <span className="num">{order.courier.awb}</span>
                <button type="button" onClick={copy} aria-label="Copy tracking number" className="grid size-7 place-items-center rounded hover:bg-ink-100"><Copy className="size-3.5" /></button>
              </p>
            )}
            {order.demo && bucket === 'active' && <p className="mt-1 text-xs text-ink-400">Demo order: tracking advances every few minutes.</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {canCancel(order, now) && (
              <Button variant="secondary" onClick={() => setCancelOpen(true)}><XCircle className="size-4" /> Cancel order</Button>
            )}
            {canRet.length > 0 && (
              <Button variant="secondary" onClick={() => navigate(`/orders/${order.id}/return`)}><RotateCcw className="size-4" /> Return or replace</Button>
            )}
            <Button onClick={buyAgain}><ShoppingBag className="size-4" /> Buy again</Button>
          </div>
        </div>
        <div className="mt-8">
          <ProgressTrack order={order} now={now} />
        </div>
        {bucket === 'delivered' && (
          <p className="mt-6 rounded-md bg-ink-50 px-3.5 py-2.5 text-[13px] text-ink-700">
            {canRet.length > 0 ? `Return window open until ${formatDate(Math.max(...canRet.map((i) => i.until)))}.` : order.items.some((i) => i.returnDays > 0) ? `Return window closed on ${formatDate(delivered + Math.max(...order.items.map((i) => i.returnDays)) * 86400000)}.` : 'These items aren’t returnable. Raise a request within 48 hours if anything arrived damaged.'}
          </p>
        )}
        {order.return && (
          <p className="mt-6 rounded-md bg-ink-50 px-3.5 py-2.5 text-[13px] text-ink-700">
            Return: {order.return.items.length} {order.return.items.length === 1 ? 'item' : 'items'} · {order.return.reason} · {order.return.resolution === 'replacement' ? 'Replacement' : `Refund of ${formatPrice(order.return.amount)} to ${order.return.resolution === 'balance' ? 'Bazaar balance' : order.payment.short}`}
          </p>
        )}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-xl p-5 ring-1 ring-inset ring-ink-150 sm:p-6" aria-labelledby="items-title">
            <h2 id="items-title" className="font-display text-lg font-bold">Items</h2>
            <ul className="mt-4 space-y-5">
              {order.items.map((i) => (
                <li key={`${i.id}:${i.size ?? ''}:${i.color ?? ''}`}>
                  <OrderItemRow
                    item={i}
                    actions={
                      <>
                        <button type="button" onClick={() => { addToCart(i.id, 1, { size: i.size, color: i.color }) }} className="text-ink-950 underline underline-offset-2">Buy again</button>
                        {['delivered', 'returns'].includes(bucket) && (
                          <Link to={`/p/${i.id}#reviews`} className="inline-flex items-center gap-1 text-ink-700 hover:text-ink-950"><Star className="size-3.5" /> Rate & review</Link>
                        )}
                        <span className="font-normal text-ink-500">{i.returnPolicy}</span>
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl p-5 ring-1 ring-inset ring-ink-150 sm:p-6" aria-labelledby="track-title">
            <h2 id="track-title" className="font-display text-lg font-bold">Tracking history</h2>
            <div className="mt-5">
              <TrackingLog order={order} now={now} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl p-5 ring-1 ring-inset ring-ink-150">
            <h2 className="text-sm font-semibold text-ink-950">Delivery address</h2>
            <AddressLines a={order.address} className="mt-2" />
            <p className="mt-3 border-t border-ink-150 pt-3 text-[13px] text-ink-600">{order.delivery.label}{order.delivery.fee ? ` · ${formatPrice(order.delivery.fee)}` : ' · Free'}</p>
          </section>
          <section className="rounded-xl p-5 ring-1 ring-inset ring-ink-150">
            <h2 className="text-sm font-semibold text-ink-950">Payment</h2>
            <p className="mt-2 text-sm text-ink-700">{order.payment.label}</p>
            <p className="text-[13px] text-ink-500">{code === 'cancelled' || code === 'refunded' ? (isPrepaid(order) ? 'Refunded' : 'Not charged') : order.payment.status}{order.payment.txn ? ` · ${order.payment.txn}` : ''}</p>
            <dl className="mt-4 space-y-2 border-t border-ink-150 pt-4 text-sm">
              <div className="flex justify-between text-ink-600"><dt>Items (MRP)</dt><dd className="num">{formatPrice(t.mrp)}</dd></div>
              {t.savings > 0 && <div className="flex justify-between text-save-700"><dt>Discount</dt><dd className="num">−{formatPrice(t.savings)}</dd></div>}
              {t.coupon > 0 && <div className="flex justify-between text-save-700"><dt>Coupon {t.couponCode}</dt><dd className="num">−{formatPrice(t.coupon)}</dd></div>}
              {t.offer > 0 && <div className="flex justify-between text-save-700"><dt>{t.offerLabel ?? 'Payment offer'}</dt><dd className="num">−{formatPrice(t.offer)}</dd></div>}
              <div className="flex justify-between text-ink-600"><dt>Delivery</dt><dd className="num">{t.delivery ? formatPrice(t.delivery) : 'Free'}</dd></div>
              <div className="flex justify-between border-t border-ink-150 pt-2.5 font-semibold text-ink-950"><dt>Order total</dt><dd className="num">{formatPrice(t.total)}</dd></div>
            </dl>
          </section>
        </aside>
      </div>

      <CancelDialog
        open={cancelOpen}
        order={order}
        onClose={() => setCancelOpen(false)}
        onConfirm={(reason) => {
          cancelOrder(order.id, reason)
          setCancelOpen(false)
          toast({ title: `Order ${order.id} cancelled` })
        }}
      />
    </div>
  )
}
