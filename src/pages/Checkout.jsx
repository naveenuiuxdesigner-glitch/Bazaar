import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Lock, Pencil, Plus, ShoppingBag, Truck } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useAccount } from '../context/AccountContext'
import { AddressForm, AddressLines } from '../components/account/AddressForm'
import { PaymentMethods, checkPayment, initialPayment } from '../components/checkout/PaymentMethods'
import { PaymentModal } from '../components/checkout/PaymentModal'
import { RadioCard } from '../components/form/Field'
import { ProductArt } from '../components/art/ProductArt'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/States'
import { CouponBox } from '../components/cart/CartDrawer'
import { OrderSummary } from './Cart'
import { paymentOffer } from '../data/payments'
import { cardBank } from '../lib/validate'
import { atDay, formatDay } from '../lib/dates'
import { formatPrice } from '../lib/format'

const SLOTS = ['8 AM – 12 PM', '12 – 4 PM', '4 – 8 PM']

function deliveryOptions(items, subtotal, plus, now = Date.now()) {
  const maxDays = Math.max(...items.map((i) => i.product.delivery.days))
  const big = items.some((i) => i.product.delivery.installation)
  const grocery = items.every((i) => i.product.category === 'grocery')
  const baseFee = subtotal >= 499 ? 0 : 49
  const firstDay = Math.max(maxDays, 1)
  return [
    {
      id: 'standard',
      title: 'Standard delivery',
      fee: plus ? 0 : baseFee,
      eta: atDay(now, maxDays, 20),
      body: maxDays === 0 ? 'Today, 6 – 8 PM' : `By ${formatDay(atDay(now, maxDays, 20))}${big ? ', with free installation' : ''}`,
    },
    {
      id: 'express',
      title: 'Express delivery',
      fee: plus ? 0 : 99,
      eta: atDay(now, 1, 14),
      body: `Tomorrow by 2 PM${plus ? ', free with Bazaar Plus' : ''}`,
      unavailable: big ? 'Not available for large appliances and furniture' : maxDays <= 1 ? 'Your order already arrives by tomorrow' : null,
    },
    {
      id: 'scheduled',
      title: 'Pick a day and time',
      fee: big || plus ? 0 : 29,
      eta: atDay(now, firstDay + 1, 12),
      body: big ? 'Choose when someone will be home for installation' : 'Choose a slot that suits you',
      days: Array.from({ length: 5 }, (_, i) => atDay(now, firstDay + 1 + i, 12)),
      unavailable: grocery ? 'Grocery arrives in today’s slot' : null,
    },
  ]
}

function Step({ n, title, done, open, summary, onEdit, children }) {
  return (
    <section className={`rounded-xl ring-1 ring-inset ${open ? 'ring-ink-300' : 'ring-ink-150'}`} aria-labelledby={`step-${n}`}>
      <header className="flex items-start gap-3.5 p-5">
        <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-bold ${done && !open ? 'bg-save-700 text-white' : open ? 'bg-ink-950 text-white' : 'bg-ink-100 text-ink-500'}`}>
          {done && !open ? <Check className="size-4" strokeWidth={3} /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`step-${n}`} className={`font-display text-lg font-bold tracking-tight ${!open && !done ? 'text-ink-400' : 'text-ink-950'}`}>{title}</h2>
          {!open && done && <div className="mt-1.5">{summary}</div>}
        </div>
        {!open && done && (
          <button type="button" onClick={onEdit} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-semibold text-ink-800 hover:bg-ink-100">
            <Pencil className="size-3.5" /> Change
          </button>
        )}
      </header>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
            <div className="px-5 pb-5 sm:pl-[62px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function CheckoutProgress({ step, onStep }) {
  const labels = ['Address', 'Delivery', 'Payment']
  return (
    <nav aria-label="Checkout progress" className="mt-5 grid grid-cols-3 rounded-xl border border-ink-150 bg-white p-1.5">
      {labels.map((label, index) => {
        const n = index + 1
        const active = step === n
        const complete = step > n
        return (
          <button
            key={label}
            type="button"
            onClick={() => n < step && onStep(n)}
            disabled={n > step}
            aria-current={active ? 'step' : undefined}
            className={`flex min-w-0 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${active ? 'bg-ink-950 text-white' : complete ? 'text-save-700 hover:bg-save-50' : 'text-ink-400'}`}
          >
            <span className={`grid size-5 shrink-0 place-items-center rounded-full text-[11px] ${active ? 'bg-white/15 text-white' : complete ? 'bg-save-50 text-save-700' : 'bg-ink-100 text-ink-500'}`}>
              {complete ? <Check className="size-3.5" strokeWidth={3} /> : n}
            </span>
            <span className="truncate">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, totals, clearCart, location, coupon } = useStore()
  const { user, addresses, payments, saveAddress, savePayment, placeOrder } = useAccount()
  const [step, setStep] = useState(addresses.length ? 2 : 1)
  const [addrId, setAddrId] = useState(() => (addresses.find((a) => a.isDefault) ?? addresses[0])?.id ?? null)
  const [editing, setEditing] = useState(addresses.length ? null : 'new')
  const [deliveryId, setDeliveryId] = useState('standard')
  const [schedule, setSchedule] = useState({ day: 0, slot: SLOTS[0] })
  const [pay, setPay] = useState(() => initialPayment(payments))
  const [payErrors, setPayErrors] = useState({})
  const [paying, setPaying] = useState(null)
  const [summaryOpen, setSummaryOpen] = useState(false)

  useEffect(() => {
    document.title = 'Checkout · BAZAAR'
  }, [])

  const address = addresses.find((a) => a.id === addrId)
  const options = useMemo(() => (cartItems.length ? deliveryOptions(cartItems, totals.subtotal, !!user?.plus) : []), [cartItems, totals.subtotal, user?.plus])
  const delivery = options.find((o) => o.id === deliveryId && !o.unavailable) ?? options[0]

  const preOffer = totals.subtotal - totals.couponDiscount + (delivery?.fee ?? 0)
  const bankForOffer = pay.method === 'card' ? (pay.card.choice === 'new' ? cardBank(pay.card.number) : payments.find((p) => p.id === pay.card.choice)?.bank) : pay.method === 'emi' ? { hdfc: 'HDFC Bank', icici: 'ICICI Bank', sbi: 'SBI Card', axis: 'Axis Bank' }[pay.emi.bank] : null
  const offer = paymentOffer(pay.method, preOffer, bankForOffer)
  const total = preOffer - (offer?.amount ?? 0)

  if (!cartItems.length && !paying)
    return (
      <div className="container-page">
        <EmptyState icon={ShoppingBag} title="Your cart is empty" body="Add something to your cart to check out.">
          <Button to="/deals">Shop today’s deals</Button>
          <Button to="/orders" variant="secondary">View your orders</Button>
        </EmptyState>
      </div>
    )

  const startPayment = () => {
    const { errors, info } = checkPayment(pay, payments, total)
    setPayErrors(errors)
    if (Object.keys(errors).length) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setPaying({ info })
  }

  const finish = () => {
    const { info } = paying
    const order = placeOrder({
      items: cartItems.map((i) => ({ id: i.id, qty: i.qty, size: i.size, color: i.color })),
      address,
      delivery: {
        option: delivery.id,
        label: delivery.id === 'scheduled' ? `Scheduled: ${formatDay(delivery.days[schedule.day])}, ${schedule.slot}` : delivery.title,
        fee: delivery.fee,
        eta: delivery.id === 'scheduled' ? delivery.days[schedule.day] : delivery.eta,
      },
      payment: { method: pay.method, label: info.label, short: info.short, status: pay.method === 'cod' ? 'Pay at delivery' : 'Paid', txn: pay.method === 'cod' ? null : `TXN${Date.now().toString().slice(-10)}` },
      totals: { mrp: totals.mrp, subtotal: totals.subtotal, savings: totals.savings, coupon: totals.couponDiscount, couponCode: totals.couponDiscount ? coupon : null, offer: offer?.amount ?? 0, offerLabel: offer?.label ?? null, delivery: delivery.fee, total, count: totals.count },
    })
    if (pay.method === 'card' && pay.card.choice === 'new' && pay.card.save) savePayment({ type: 'card', network: info.network, bank: info.bank ?? 'Card', last4: info.last4, name: pay.card.name, expiry: pay.card.expiry })
    if (pay.method === 'upi' && pay.upi.choice === 'new') savePayment({ type: 'upi', vpa: info.vpa })
    clearCart()
    navigate(`/order-placed/${order.id}`, { replace: true })
  }

  const summary = (
    <div className="space-y-5">
      <ul className="space-y-3">
        {cartItems.map((i) => (
          <li key={`${i.id}:${i.size ?? ''}:${i.color ?? ''}`} className="flex gap-3">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-studio">
              <ProductArt src={i.product.colorGalleries?.[i.color]?.[0] ?? i.product.image} kind={i.product.art.kind} color={i.color ?? i.product.art.color} brand={i.product.brand} label={i.product.title} className="size-full p-1" />
              <span className="absolute -right-0 -top-0 grid size-5 place-items-center rounded-bl-md bg-ink-950 text-[11px] font-bold text-white num">{i.qty}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-[13px] leading-[18px] text-ink-800">{i.product.title}</span>
              {i.size && <span className="block text-xs text-ink-500">Size: {i.size}</span>}
              <span className="text-[13px] font-semibold num">{formatPrice(i.product.price * i.qty)}</span>
            </span>
          </li>
        ))}
      </ul>
      <CouponBox />
      <OrderSummary totals={{ ...totals, delivery: delivery?.fee ?? 0 }} title="Price details" extra={null}>
        {offer && <div className="flex justify-between text-save-700"><dt>{offer.label}</dt><dd className="num">−{formatPrice(offer.amount)}</dd></div>}
        <div className="flex justify-between border-t border-ink-200 pt-3 text-lg font-semibold text-ink-950"><dt>Total</dt><dd className="num">{formatPrice(total)}</dd></div>
      </OrderSummary>
      {totals.mrp - total > 0 && <p className="rounded-md bg-save-50 px-3 py-2 text-[13px] font-medium text-save-700">You save {formatPrice(totals.mrp - total)} on this order</p>}
    </div>
  )

  return (
    <div className="container-page pb-28 pt-6 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[34px]">Checkout</h1>
        <p className="inline-flex items-center gap-1.5 text-[13px] text-ink-500"><Lock className="size-4" /> Secure checkout</p>
      </div>
      <CheckoutProgress step={step} onStep={setStep} />

      {/* Phone: collapsible order summary */}
      <div className="mt-4 rounded-xl bg-ink-50 ring-1 ring-inset ring-ink-150 lg:hidden">
        <button type="button" onClick={() => setSummaryOpen((o) => !o)} aria-expanded={summaryOpen} className="flex w-full items-center justify-between px-4 py-3.5 text-sm">
          <span className="font-semibold">{summaryOpen ? 'Hide' : 'Show'} order summary · {totals.count} {totals.count === 1 ? 'item' : 'items'}</span>
          <span className="flex items-center gap-2 font-semibold num">{formatPrice(total)} <ChevronDown className={`size-4 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} /></span>
        </button>
        {summaryOpen && <div className="border-t border-ink-150 p-4">{summary}</div>}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div className="space-y-3">
          <Step
            n={1}
            title="Delivery address"
            open={step === 1}
            done={!!address}
            onEdit={() => setStep(1)}
            summary={address && <p className="text-sm text-ink-700"><span className="font-semibold text-ink-950">{address.name}</span>, {address.line1}, {address.line2}, {address.city} {address.pincode}</p>}
          >
            {editing ? (
              <AddressForm
                initial={editing === 'new' ? null : addresses.find((a) => a.id === editing)}
                defaults={editing === 'new' ? { name: user.name, phone: user.phone, pincode: location.pincode, city: location.city } : null}
                submitLabel={editing === 'new' ? 'Save and deliver here' : 'Save changes'}
                onCancel={addresses.length ? () => setEditing(null) : null}
                onSave={(a) => {
                  const saved = saveAddress(a)
                  setAddrId(saved.id)
                  setEditing(null)
                  setStep(2)
                }}
              />
            ) : (
              <div className="space-y-2.5">
                {addresses.map((a) => (
                  <RadioCard key={a.id} name="address" value={a.id} checked={addrId === a.id} onChange={() => setAddrId(a.id)}>
                    <div className="flex items-start justify-between gap-3">
                      <AddressLines a={a} />
                      <button type="button" onClick={(e) => { e.preventDefault(); setEditing(a.id) }} className="shrink-0 text-[13px] font-semibold text-ink-700 underline underline-offset-2 hover:text-ink-950">
                        Edit
                      </button>
                    </div>
                  </RadioCard>
                ))}
                <button type="button" onClick={() => setEditing('new')} className="flex w-full items-center gap-2 rounded-lg p-4 text-sm font-semibold text-ink-900 border border-dashed border-ink-300 hover:bg-ink-50">
                  <Plus className="size-4" /> Add a new address
                </button>
                <Button size="lg" className="mt-2 w-full sm:w-auto" disabled={!address} onClick={() => setStep(2)}>
                  Deliver to this address
                </Button>
              </div>
            )}
          </Step>

          <Step
            n={2}
            title="Delivery options"
            open={step === 2}
            done={step > 2}
            onEdit={() => setStep(2)}
            summary={delivery && <p className="text-sm text-ink-700"><span className="font-semibold text-ink-950">{delivery.title}</span> · {delivery.id === 'scheduled' ? `${formatDay(delivery.days[schedule.day])}, ${schedule.slot}` : delivery.body} · {delivery.fee ? formatPrice(delivery.fee) : 'Free'}</p>}
          >
            <div className="space-y-2.5">
              {options.map((o) => (
                <RadioCard key={o.id} name="delivery" value={o.id} checked={delivery.id === o.id} disabled={!!o.unavailable} onChange={() => setDeliveryId(o.id)}>
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-[15px] font-semibold text-ink-950">{o.title}</span>
                    <span className={`text-sm font-semibold num ${o.fee ? 'text-ink-950' : 'text-save-700'}`}>{o.fee ? formatPrice(o.fee) : 'Free'}</span>
                  </span>
                  <span className="mt-0.5 block text-[13px] text-ink-500">{o.unavailable ?? o.body}</span>
                  {o.id === 'scheduled' && delivery.id === 'scheduled' && (
                    <span className="mt-3 block space-y-3" onClick={(e) => e.preventDefault()}>
                      <span className="flex flex-wrap gap-2">
                        {o.days.map((d, i) => (
                          <button key={d} type="button" onClick={() => setSchedule((s) => ({ ...s, day: i }))} className={`rounded-md px-3 py-2 text-[13px] font-medium ring-1 ring-inset ${schedule.day === i ? 'bg-ink-950 text-white ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'}`}>
                            {formatDay(d)}
                          </button>
                        ))}
                      </span>
                      <span className="flex flex-wrap gap-2">
                        {SLOTS.map((s) => (
                          <button key={s} type="button" onClick={() => setSchedule((x) => ({ ...x, slot: s }))} className={`rounded-md px-3 py-2 text-[13px] font-medium ring-1 ring-inset ${schedule.slot === s ? 'bg-ink-950 text-white ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'}`}>
                            {s}
                          </button>
                        ))}
                      </span>
                    </span>
                  )}
                </RadioCard>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-ink-50 p-4">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-ink-800"><Truck className="size-4" /> {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} from {new Set(cartItems.map((i) => i.product.seller.id)).size} {new Set(cartItems.map((i) => i.product.seller.id)).size === 1 ? 'seller' : 'sellers'}, one delivery</p>
              <ul className="mt-3 flex gap-2 overflow-x-auto">
                {cartItems.map((i) => (
                  <li key={`${i.id}:${i.size ?? ''}:${i.color ?? ''}`} className="size-14 shrink-0 overflow-hidden rounded-md bg-studio" title={i.product.title}>
                    <ProductArt src={i.product.colorGalleries?.[i.color]?.[0] ?? i.product.image} kind={i.product.art.kind} color={i.color ?? i.product.art.color} brand={i.product.brand} label={i.product.title} className="size-full p-1" />
                  </li>
                ))}
              </ul>
            </div>
            <Button size="lg" className="mt-5 w-full sm:w-auto" onClick={() => setStep(3)}>
              Continue to payment
            </Button>
          </Step>

          <Step n={3} title="Payment" open={step === 3} done={false}>
            <PaymentMethods pay={pay} setPay={(fn) => { setPay(fn); setPayErrors({}) }} payments={payments} amount={total} errors={payErrors} />
            <Button size="lg" className="mt-5 hidden w-full lg:flex" onClick={startPayment}>
              <Lock className="size-4" /> {pay.method === 'cod' ? `Place order · ${formatPrice(total)}` : `Pay ${formatPrice(total)}`}
            </Button>
            <p className="mt-3 text-xs text-ink-500">
              By placing your order you agree to Bazaar’s <Link to="/help#terms" className="underline">terms</Link> and <Link to="/help#returns" className="underline">return policy</Link>.
            </p>
          </Step>
        </div>

        <aside className="hidden h-fit rounded-xl bg-ink-50 p-5 ring-1 ring-inset ring-ink-150 lg:sticky lg:top-36 lg:block">{summary}</aside>
      </div>

      {/* Phone action bar */}
      <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-ink-150 bg-white/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <div className="flex-1">
          <p className="text-[17px] font-semibold num">{formatPrice(total)}</p>
          <p className="text-[11px] text-ink-500">Step {step} of 3</p>
        </div>
        {step === 1 && !editing && <Button size="lg" disabled={!address} onClick={() => setStep(2)}>Deliver here</Button>}
        {step === 2 && <Button size="lg" onClick={() => setStep(3)}>Continue</Button>}
        {step === 3 && <Button size="lg" onClick={startPayment}><Lock className="size-4" /> {pay.method === 'cod' ? 'Place order' : 'Pay now'}</Button>}
      </div>

      <PaymentModal open={!!paying} method={pay.method} info={paying?.info ?? {}} amount={total} phone={address?.phone ?? user.phone} onPaid={finish} onClose={() => setPaying(null)} />
    </div>
  )
}
