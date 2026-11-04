import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, Loader2 } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { useStore } from '../context/StoreContext'
import { isPrepaid, returnable } from '../services/orders'
import { ItemThumb } from '../components/orders/OrderParts'
import { AddressLines } from '../components/account/AddressForm'
import { RadioCard, SelectField, TextArea } from '../components/form/Field'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/States'
import { atDay, formatDate, formatDay } from '../lib/dates'
import { formatPrice } from '../lib/format'

const REASONS = ['Size too small', 'Size too large', 'Damaged or defective', 'Different from what I ordered', 'Quality not as expected', 'No longer needed']

export default function ReturnRequest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders, now, requestReturn } = useAccount()
  const { toast } = useStore()
  const order = orders.find((o) => o.id === id)
  const items = useMemo(() => (order ? returnable(order, now) : []), [order, now])
  const [sel, setSel] = useState(() => new Set(items.map((i) => i.id)))
  const [reason, setReason] = useState('')
  const [comments, setComments] = useState('')
  const [resolution, setResolution] = useState(order && isPrepaid(order) ? 'original' : 'balance')
  const [day, setDay] = useState(0)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.title = 'Return items · BAZAAR'
  }, [])

  if (!order || items.length === 0)
    return (
      <div className="container-page">
        <EmptyState title="Nothing to return on this order" body="The return window may have closed, or the items aren’t returnable.">
          <Button to={order ? `/orders/${order.id}` : '/orders'}>Back to order</Button>
          <Button to="/help#returns" variant="secondary">Return policy</Button>
        </EmptyState>
      </div>
    )

  const t = order.totals
  const chosen = items.filter((i) => sel.has(i.id))
  const chosenSub = chosen.reduce((s, i) => s + i.price * i.qty, 0)
  const amount = Math.round((chosenSub / t.subtotal) * (t.total - t.delivery))
  const pickupDays = [1, 2, 3].map((n) => atDay(now, n, 10))
  const sizeIssue = /^Size/.test(reason)

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!chosen.length) errs.items = 'Select at least one item'
    if (!reason) errs.reason = 'Choose a reason'
    if (reason === 'Damaged or defective' && comments.trim().length < 10) errs.comments = 'Describe the damage so we can help faster'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 800))
    requestReturn(order.id, { items: chosen.map((i) => i.id), reason: reason.toLowerCase(), comments: comments.trim(), resolution, amount, pickupAt: pickupDays[day] })
    toast({ title: resolution === 'replacement' ? 'Replacement requested' : 'Return requested' })
    navigate(`/orders/${order.id}`, { replace: true })
  }

  return (
    <div className="container-page max-w-[880px] pt-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-ink-500">
        <Link to="/orders" className="hover:text-ink-950">Orders</Link>
        <ChevronRight className="size-3.5" />
        <Link to={`/orders/${order.id}`} className="hover:text-ink-950 num">{order.id}</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-ink-800">Return</span>
      </nav>
      <h1 className="mt-3 font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[34px]">Return or replace items</h1>
      <p className="mt-1 text-sm text-ink-500">Free doorstep pickup. Keep items unused, with tags and original packaging.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-ink-950">1. Which items?</h2>
          <ul className="mt-3 space-y-2.5">
            {items.map((i) => {
              const on = sel.has(i.id)
              return (
                <li key={i.id}>
                  <label className={`flex cursor-pointer items-center gap-4 rounded-lg p-3 ring-1 ring-inset ${on ? 'ring-2 ring-ink-950' : 'ring-ink-200'}`}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() =>
                        setSel((s) => {
                          const n = new Set(s)
                          if (n.has(i.id)) n.delete(i.id)
                          else n.add(i.id)
                          return n
                        })
                      }
                      className="size-4 accent-brand-600"
                    />
                    <ItemThumb item={i} className="size-14" />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 text-sm text-ink-900">{i.title}</span>
                      <span className="text-xs text-ink-500">Qty {i.qty} · {formatPrice(i.price * i.qty)} · returnable until {formatDate(i.until)}</span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
          {errors.items && <p className="mt-2 text-xs text-danger-700">{errors.items}</p>}
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <h2 className="text-sm font-semibold text-ink-950 sm:col-span-2">2. What went wrong?</h2>
          <SelectField label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} error={errors.reason}>
            <option value="">Choose a reason</option>
            {REASONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </SelectField>
          <div className="hidden sm:block" />
          <TextArea className="sm:col-span-2" label="Comments" optional={reason !== 'Damaged or defective'} value={comments} onChange={(e) => setComments(e.target.value)} error={errors.comments} placeholder="Anything that helps us sort this out quickly" maxLength={500} />
        </section>

        <section>
          <h2 className="text-sm font-semibold text-ink-950">3. Refund or replacement</h2>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {isPrepaid(order) && (
              <RadioCard name="resolution" value="original" checked={resolution === 'original'} onChange={() => setResolution('original')}>
                <span className="text-sm font-semibold">Refund to {order.payment.short}</span>
                <span className="block text-xs text-ink-500">2–4 business days after pickup</span>
              </RadioCard>
            )}
            <RadioCard name="resolution" value="balance" checked={resolution === 'balance'} onChange={() => setResolution('balance')}>
              <span className="text-sm font-semibold">Bazaar balance</span>
              <span className="block text-xs text-ink-500">Instantly after pickup{!isPrepaid(order) ? '. Cash orders are refunded here' : ''}</span>
            </RadioCard>
            <RadioCard name="resolution" value="replacement" checked={resolution === 'replacement'} onChange={() => setResolution('replacement')}>
              <span className="text-sm font-semibold">{sizeIssue ? 'Exchange for another size' : 'Replacement'}</span>
              <span className="block text-xs text-ink-500">Same item, shipped after pickup</span>
            </RadioCard>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-ink-950">4. Pickup</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {pickupDays.map((d, i) => (
                <button key={d} type="button" onClick={() => setDay(i)} aria-pressed={day === i} className={`rounded-md px-3.5 py-2 text-[13px] font-medium ring-1 ring-inset ${day === i ? 'bg-ink-950 text-white ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'}`}>
                  {formatDay(d)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-500">Between 10 AM and 6 PM. The agent will call before arriving.</p>
          </div>
          <div className="rounded-lg bg-ink-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">Pickup from</p>
            <AddressLines a={order.address} className="mt-2" />
          </div>
        </section>

        <div className="flex flex-col gap-4 border-t border-ink-150 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-700">
            {resolution === 'replacement' ? (
              <>Replacement for {chosen.length} {chosen.length === 1 ? 'item' : 'items'}, no extra charge</>
            ) : (
              <>Refund amount <span className="text-lg font-semibold text-ink-950 num">{formatPrice(amount)}</span></>
            )}
          </p>
          <Button type="submit" size="lg" disabled={busy}>
            {busy && <Loader2 className="size-4 animate-spin" />} Confirm {resolution === 'replacement' ? 'replacement' : 'return'}
          </Button>
        </div>
      </form>
    </div>
  )
}
