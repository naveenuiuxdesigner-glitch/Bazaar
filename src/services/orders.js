import { productById } from '../data/products'
import { DAY, HOUR, MIN, atDay } from '../lib/dates'

/*
  Order model. Tracking is a list of timestamped events: events in the past are done, events in
  the future are the plan. The current status is simply the latest event that has happened, so
  orders move through their states on their own as time passes.

  Orders placed in this demo run on an accelerated clock (minutes instead of days) so you can watch
  one go from placed to delivered in a single session.
*/

export const STAGES = {
  placed: { label: 'Order placed', short: 'Placed', tone: 'ink' },
  packed: { label: 'Packed', short: 'Packed', tone: 'ink' },
  shipped: { label: 'Shipped', short: 'Shipped', tone: 'ink' },
  out: { label: 'Out for delivery', short: 'Out for delivery', tone: 'brand' },
  delivered: { label: 'Delivered', short: 'Delivered', tone: 'save' },
  cancelled: { label: 'Cancelled', short: 'Cancelled', tone: 'muted' },
  return_requested: { label: 'Return requested', short: 'Return requested', tone: 'brand' },
  pickup_scheduled: { label: 'Pickup scheduled', short: 'Pickup scheduled', tone: 'brand' },
  picked_up: { label: 'Picked up', short: 'Return picked up', tone: 'brand' },
  replacement_shipped: { label: 'Replacement shipped', short: 'Replacement shipped', tone: 'brand' },
  replacement_delivered: { label: 'Replacement delivered', short: 'Replaced', tone: 'save' },
  refund_initiated: { label: 'Refund initiated', short: 'Refund initiated', tone: 'brand' },
  refunded: { label: 'Refund completed', short: 'Refunded', tone: 'save' },
}

export const FORWARD = ['placed', 'packed', 'shipped', 'out', 'delivered']
const RETURN_CODES = new Set(['return_requested', 'pickup_scheduled', 'picked_up', 'replacement_shipped', 'replacement_delivered'])

export const pastEvents = (order, now = Date.now()) => order.events.filter((e) => e.at <= now)
export const currentEvent = (order, now = Date.now()) => pastEvents(order, now).at(-1) ?? order.events[0]
export const statusOf = (order, now) => currentEvent(order, now).code
export const eventAt = (order, code) => order.events.find((e) => e.code === code)?.at ?? null

export function bucketOf(order, now = Date.now()) {
  const codes = pastEvents(order, now).map((e) => e.code)
  if (codes.includes('cancelled')) return 'cancelled'
  if (codes.some((c) => RETURN_CODES.has(c))) return 'returns'
  if (codes.includes('delivered')) return 'delivered'
  return 'active'
}

/** Headline for the order card: "Arriving tomorrow", "Delivered on 3 Oct" and so on. */
export function headline(order, now = Date.now()) {
  const code = statusOf(order, now)
  const at = currentEvent(order, now).at
  const eta = eventAt(order, 'delivered')
  const fmt = (t) => new Date(t).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  switch (code) {
    case 'delivered':
      return `Delivered on ${fmt(at)}`
    case 'cancelled':
      return `Cancelled on ${fmt(at)}`
    case 'refunded':
      return `Refund completed on ${fmt(at)}`
    case 'replacement_delivered':
      return `Replacement delivered on ${fmt(at)}`
    case 'out':
      return 'Out for delivery, arriving today'
    default:
      if (RETURN_CODES.has(code) || code === 'refund_initiated') return STAGES[code].label
      return eta ? `Arriving ${relativeEta(eta, now)}` : STAGES[code].label
  }
}

function relativeEta(t, now) {
  const a = new Date(t).setHours(0, 0, 0, 0)
  const b = new Date(now).setHours(0, 0, 0, 0)
  const d = Math.round((a - b) / DAY)
  if (d <= 0) return 'today'
  if (d === 1) return 'tomorrow'
  return `by ${new Date(t).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`
}

export const canCancel = (order, now = Date.now()) => ['placed', 'packed'].includes(statusOf(order, now))

/** Items still inside their return window, with the date it closes. */
export function returnable(order, now = Date.now()) {
  if (bucketOf(order, now) !== 'delivered') return []
  const deliveredAt = eventAt(order, 'delivered')
  return order.items
    .map((i) => ({ ...i, until: deliveredAt + (i.returnDays ?? 0) * DAY }))
    .filter((i) => i.returnDays > 0 && now <= i.until)
}

export const isPrepaid = (order) => order.payment.method !== 'cod'

/* ── Building orders ────────────────────────────────────────────────────── */

const COURIERS = ['Bazaar Express', 'Delhivery', 'Blue Dart', 'Ekart Logistics']

export const newOrderId = (t = Date.now()) => {
  const d = new Date(t)
  return `BZ${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(100000 + Math.random() * 900000))}`
}

export const awb = () => `${Math.floor(1e11 + Math.random() * 9e11)}`

export function snapshotItem(id, qty, price, size, color) {
  const p = productById[id]
  return { id, qty, price: price ?? p.price, mrp: p.mrp, title: p.title, brand: p.brand, seller: p.seller.name, returnDays: p.returns.days, returnPolicy: p.returns.policy, ...(size ? { size } : {}), ...(color ? { color } : {}) }
}

/** Forward-journey events between placement and the planned delivery time. */
export function forwardEvents({ placedAt, deliverAt, origin, dest, name, packedAt, shippedAt, outAt }) {
  return [
    { code: 'placed', at: placedAt, note: 'We’ve received your order and sent it to the seller.' },
    { code: 'packed', at: packedAt, note: 'The seller has packed your order.', place: `${origin} fulfilment centre` },
    { code: 'shipped', at: shippedAt, note: 'Your order is on its way.', place: `In transit from ${origin}` },
    { code: 'out', at: outAt, note: 'Our delivery partner is on the way to you.', place: `${dest} delivery hub` },
    { code: 'delivered', at: deliverAt, note: `Delivered to ${name.split(' ')[0]}. Handed over in person.`, place: dest },
  ]
}

/** Accelerated plan for orders placed in the demo: the whole journey takes about ten minutes. */
export function demoForward({ placedAt, origin, dest, name }) {
  return forwardEvents({ placedAt, packedAt: placedAt + 1 * MIN, shippedAt: placedAt + 3 * MIN, outAt: placedAt + 6 * MIN, deliverAt: placedAt + 10 * MIN, origin, dest, name })
}

export function cancelEvents(order, reason, now = Date.now()) {
  const kept = order.events.filter((e) => e.at <= now)
  const ev = [...kept, { code: 'cancelled', at: now, note: reason ? `Cancelled by you: ${reason}.` : 'Cancelled by you.' }]
  if (isPrepaid(order)) {
    ev.push({ code: 'refund_initiated', at: now + 1 * MIN, note: `Refund of ₹${order.totals.total.toLocaleString('en-IN')} initiated to your ${order.payment.short}.` })
    ev.push({ code: 'refunded', at: now + 4 * MIN, note: `₹${order.totals.total.toLocaleString('en-IN')} credited to your ${order.payment.short}.` })
  }
  return ev
}

export function returnEvents(order, { amount, resolution, pickupAt, reason }, now = Date.now()) {
  const ev = [...order.events.filter((e) => e.at <= now)]
  ev.push({ code: 'return_requested', at: now, note: `Return requested: ${reason}.` })
  ev.push({ code: 'pickup_scheduled', at: now + 1 * MIN, note: `Pickup scheduled for ${new Date(pickupAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}. Keep the item in its original packaging.` })
  ev.push({ code: 'picked_up', at: now + 4 * MIN, note: 'Item picked up and passed quality check.' })
  if (resolution === 'replacement') {
    ev.push({ code: 'replacement_shipped', at: now + 5 * MIN, note: 'Your replacement is on its way.' })
    ev.push({ code: 'replacement_delivered', at: now + 9 * MIN, note: 'Replacement delivered.' })
  } else {
    const to = resolution === 'balance' ? 'Bazaar balance' : order.payment.short
    ev.push({ code: 'refund_initiated', at: now + 5 * MIN, note: `Refund of ₹${amount.toLocaleString('en-IN')} initiated to your ${to}.` })
    ev.push({ code: 'refunded', at: now + 8 * MIN, note: `₹${amount.toLocaleString('en-IN')} credited to your ${to}.` })
  }
  return ev
}

/* ── Demo history for Aarav ─────────────────────────────────────────────── */

function totalsFor(items, { deliveryFee = 0, coupon = 0, couponCode = null, offer = 0, offerLabel = null } = {}) {
  const mrp = items.reduce((s, i) => s + i.mrp * i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  return { mrp, subtotal, savings: mrp - subtotal, coupon, couponCode, offer, offerLabel, delivery: deliveryFee, total: subtotal - coupon - offer + deliveryFee }
}

export function seedOrders(user, address, t = Date.now()) {
  const dest = address.city
  const name = address.name
  const mk = ({ ago, items, payment, courier = 0, extras, build }) => {
    const placedAt = t - ago
    const its = items.map(([id, qty = 1]) => snapshotItem(id, qty))
    const totals = totalsFor(its, extras)
    const origin = productById[its[0].id].seller.city
    return {
      id: newOrderId(placedAt),
      userId: user.id,
      placedAt,
      items: its,
      address,
      delivery: { option: 'standard', label: 'Standard delivery', fee: totals.delivery },
      payment,
      totals,
      courier: { name: COURIERS[courier], awb: awb() },
      events: build({ placedAt, origin, dest, name, total: totals.total }),
    }
  }

  const upi = { method: 'upi', label: 'UPI · aarav.sharma@okhdfcbank', short: 'UPI account', status: 'Paid' }
  const card = { method: 'card', label: 'HDFC Bank Visa card ending 4242', short: 'HDFC Bank card', status: 'Paid' }
  const cod = { method: 'cod', label: 'Cash on delivery', short: 'cash on delivery', status: 'Paid at delivery' }
  const emi = { method: 'emi', label: 'No-cost EMI · HDFC Bank, 6 months of ₹6,665', short: 'HDFC Bank card', status: 'Paid' }
  const nb = { method: 'netbanking', label: 'Net banking · ICICI Bank', short: 'ICICI Bank account', status: 'Paid' }

  const orders = [
    // Out for delivery today
    mk({
      ago: 26 * HOUR,
      items: [['sony-wh-1000xm6-wireless-noise-cancelling-headphones']],
      payment: upi,
      extras: { offer: 100, offerLabel: 'UPI offer: flat ₹100 off' },
      build: (o) => forwardEvents({ ...o, packedAt: o.placedAt + 3 * HOUR, shippedAt: o.placedAt + 9 * HOUR, outAt: t - 70 * MIN, deliverAt: t + 4 * HOUR }),
    }),
    // Shipped, arriving in two days
    mk({
      ago: 2 * DAY + 3 * HOUR,
      items: [['samsung-galaxy-buds3-pro-silver'], ['anker-nano-65-w-3-port-gan-charger']],
      payment: card,
      courier: 1,
      extras: { coupon: 500, couponCode: 'BAZAAR5' },
      build: (o) => forwardEvents({ ...o, packedAt: o.placedAt + 5 * HOUR, shippedAt: o.placedAt + 20 * HOUR, outAt: atDay(t, 2, 8, 30), deliverAt: atDay(t, 2, 14, 10) }),
    }),
    // Grocery, placed this morning, slot delivery today
    mk({
      ago: 50 * MIN,
      items: [['nescafe-classic-instant-coffee-jar-200-g'], ['cadbury-dairy-milk-silk-chocolate-bar-pack-of-4', 2], ['tata-tea-gold-premium-assam-tea-1-kg']],
      payment: cod,
      courier: 0,
      extras: { deliveryFee: 0 },
      build: (o) => forwardEvents({ ...o, packedAt: o.placedAt + 25 * MIN, shippedAt: t + 2 * HOUR, outAt: t + 3 * HOUR, deliverAt: t + 4 * HOUR + 20 * MIN }),
    }),
    // Delivered 4 days ago, still inside the 15-day return window
    mk({
      ago: 8 * DAY,
      items: [['adidas-samba-og-shoes-cloud-white'], ['h-m-womens-oversized-cotton-t-shirt', 2]],
      payment: upi,
      courier: 1,
      build: (o) => forwardEvents({ ...o, packedAt: o.placedAt + 4 * HOUR, shippedAt: o.placedAt + DAY, outAt: atDay(t, -4, 9, 5), deliverAt: atDay(t, -4, 13, 42) }),
    }),
    // Delivered last month, EMI
    mk({
      ago: 34 * DAY,
      items: [['apple-iphone-17-pro-256-gb-cosmic-orange']],
      payment: { ...emi, label: 'No-cost EMI · HDFC Bank, 6 months of ₹22,484' },
      courier: 2,
      build: (o) => forwardEvents({ ...o, packedAt: o.placedAt + 2 * HOUR, shippedAt: o.placedAt + 8 * HOUR, outAt: atDay(o.placedAt, 1, 8, 15), deliverAt: atDay(o.placedAt, 1, 11, 30) }),
    }),
    // Returned and refunded
    mk({
      ago: 27 * DAY,
      items: [['puma-deviate-nitro-3-running-shoes']],
      payment: card,
      courier: 3,
      build: (o) => {
        const deliverAt = atDay(o.placedAt, 3, 12, 20)
        return [
          ...forwardEvents({ ...o, packedAt: o.placedAt + 6 * HOUR, shippedAt: o.placedAt + DAY, outAt: atDay(o.placedAt, 3, 8, 0), deliverAt }),
          { code: 'return_requested', at: deliverAt + 2 * DAY, note: 'Return requested: size too small.' },
          { code: 'pickup_scheduled', at: deliverAt + 2 * DAY + 10 * MIN, note: 'Pickup scheduled. Keep the item in its original box.' },
          { code: 'picked_up', at: atDay(deliverAt, 3, 11, 5), note: 'Item picked up and passed quality check.', place: o.dest },
          { code: 'refund_initiated', at: atDay(deliverAt, 3, 15, 0), note: `Refund of ₹${o.total.toLocaleString('en-IN')} initiated to your HDFC Bank card.` },
          { code: 'refunded', at: atDay(deliverAt, 5, 10, 30), note: `₹${o.total.toLocaleString('en-IN')} credited to your HDFC Bank card.` },
        ]
      },
    }),
    // Cancelled before shipping, refunded
    mk({
      ago: 19 * DAY,
      items: [['lg-oled-evo-c5-65-4k-smart-tv']],
      payment: nb,
      courier: 0,
      build: (o) => [
        { code: 'placed', at: o.placedAt, note: 'We’ve received your order and sent it to the seller.' },
        { code: 'cancelled', at: o.placedAt + 2 * HOUR, note: 'Cancelled by you: found a better price elsewhere.' },
        { code: 'refund_initiated', at: o.placedAt + 2 * HOUR + 5 * MIN, note: 'Refund initiated to your ICICI Bank account.' },
        { code: 'refunded', at: atDay(o.placedAt, 2, 11, 0), note: 'Refund credited to your ICICI Bank account.' },
      ],
    }),
    // Delivered two months ago
    mk({
      ago: 63 * DAY,
      items: [['philips-airfryer-3000-series-xl-6-2-l'], ['borosil-larah-opalware-dinner-set-35-pieces']],
      payment: upi,
      courier: 1,
      extras: { coupon: 1230, couponCode: 'NEWHOME' },
      build: (o) => forwardEvents({ ...o, packedAt: o.placedAt + 3 * HOUR, shippedAt: o.placedAt + 18 * HOUR, outAt: atDay(o.placedAt, 2, 8, 30), deliverAt: atDay(o.placedAt, 2, 16, 45) }),
    }),
  ]
  return orders.sort((a, b) => b.placedAt - a.placedAt)
}
