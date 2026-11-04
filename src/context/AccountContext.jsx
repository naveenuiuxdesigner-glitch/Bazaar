import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Bell, CircleCheck, PackageCheck, RotateCcw, Tag, TrendingDown, Truck, Wallet, XCircle } from 'lucide-react'
import { auth, ensureDemo, readUserData, writeUserData } from '../services/account'
import { STAGES, cancelEvents, demoForward, newOrderId, awb, returnEvents, snapshotItem, pastEvents } from '../services/orders'
import { productById } from '../data/products'
import { useStore } from './StoreContext'
import { uid } from '../lib/storage'
import { DAY } from '../lib/dates'

const AccountContext = createContext(null)

const EMPTY = { addresses: [], payments: [], orders: [], tickets: [] }
const loadAll = (user) =>
  user
    ? {
        addresses: readUserData(user.id, 'addresses', []),
        payments: readUserData(user.id, 'payments', []),
        orders: readUserData(user.id, 'orders', []),
        tickets: readUserData(user.id, 'tickets', []),
      }
    : EMPTY

const ORDER_NOTIFY = {
  placed: { icon: CircleCheck, title: (o) => `Order placed: ${o.items[0].brand} ${o.items.length > 1 ? `and ${o.items.length - 1} more` : ''}`.trim() },
  shipped: { icon: Truck, title: () => 'Your order has shipped' },
  out: { icon: Truck, title: () => 'Out for delivery today' },
  delivered: { icon: PackageCheck, title: () => 'Delivered' },
  cancelled: { icon: XCircle, title: () => 'Order cancelled' },
  return_requested: { icon: RotateCcw, title: () => 'Return request received' },
  picked_up: { icon: RotateCcw, title: () => 'Return picked up' },
  refunded: { icon: Wallet, title: () => 'Refund completed' },
  replacement_delivered: { icon: PackageCheck, title: () => 'Replacement delivered' },
}

// Offers and price alerts that sit alongside order updates in the notification centre.
const promoNotifications = (user) => [
  { id: 'promo-price-sony', kind: 'offers', icon: TrendingDown, title: 'Price drop on Sony WH-1000XM6', body: 'Now ₹29,990, down from ₹34,990 last week. Saved items get first dibs.', to: '/p/sony-wh-1000xm6-wireless-noise-cancelling-headphones', at: user.createdAt + 1 },
  { id: 'promo-bazaar5', kind: 'offers', icon: Tag, title: 'Your coupon BAZAAR5 is ready', body: 'Take 5% off your next order, up to ₹500. Apply it in your cart.', to: '/cart', at: Date.now() - 26 * 3600000 },
  { id: 'promo-festive', kind: 'offers', icon: Tag, title: 'Festive Sale: flat ₹750 off', body: 'Use FESTIVE750 on orders above ₹7,500, across every brand.', to: '/deals', at: Date.now() - 3 * DAY },
  { id: 'promo-grocery', kind: 'offers', icon: Bell, title: 'Free grocery delivery this weekend', body: 'No minimum order on Saturday and Sunday, with 2-hour slots.', to: '/c/grocery', at: Date.now() - 5 * DAY },
]

export function AccountProvider({ children }) {
  const { toast } = useStore()
  const [user, setUserState] = useState(() => {
    ensureDemo()
    return auth.current()
  })
  // Collections load synchronously with the user, so protected pages never flash an empty state.
  const [data, setData] = useState(() => loadAll(user))
  const [notif, setNotif] = useState(() => (user ? readUserData(user.id, 'notif', { read: [], dismissed: [] }) : { read: [], dismissed: [] }))
  const [now, setNow] = useState(() => Date.now())
  const lastTick = useRef(Date.now())
  const setUser = (u) => {
    setUserState(u)
    if (u?.id !== user?.id) {
      setData(loadAll(u))
      setNotif(u ? readUserData(u.id, 'notif', { read: [], dismissed: [] }) : { read: [], dismissed: [] })
    }
  }

  // A shared clock so order statuses advance everywhere at once.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000)
    return () => clearInterval(t)
  }, [])

  // Toast tracking milestones that happen while the app is open.
  useEffect(() => {
    const from = lastTick.current
    lastTick.current = now
    if (!user) return
    for (const o of data.orders) {
      for (const e of o.events) {
        if (e.at > from && e.at <= now && ['shipped', 'out', 'delivered', 'refunded', 'replacement_delivered'].includes(e.code)) {
          toast({ title: `${STAGES[e.code].label}: ${o.items[0].brand} ${o.items[0].title.split(',')[0]}`, productId: o.items[0].id, duration: 5000 })
        }
      }
    }
  }, [now]) // eslint-disable-line react-hooks/exhaustive-deps

  const persist = useCallback(
    (name, value) => {
      if (!user) return
      writeUserData(user.id, name, value)
      setData((d) => ({ ...d, [name]: value }))
    },
    [user],
  )

  const notifications = useMemo(() => {
    if (!user) return []
    const fromOrders = data.orders.flatMap((o) =>
      pastEvents(o, now)
        .filter((e) => ORDER_NOTIFY[e.code])
        .map((e) => ({
          id: `${o.id}:${e.code}`,
          kind: 'orders',
          icon: ORDER_NOTIFY[e.code].icon,
          title: ORDER_NOTIFY[e.code].title(o),
          body: `${e.note} Order ${o.id}.`,
          to: `/orders/${o.id}`,
          at: e.at,
          productId: o.items[0].id,
        })),
    )
    return [...fromOrders, ...promoNotifications(user)]
      .filter((n) => !notif.dismissed.includes(n.id))
      .filter((n) => n.at > now - 60 * DAY)
      .sort((a, b) => b.at - a.at)
  }, [user, data.orders, notif.dismissed, now])

  const unread = notifications.filter((n) => !notif.read.includes(n.id)).length

  const saveNotif = (next) => {
    setNotif(next)
    if (user) writeUserData(user.id, 'notif', next)
  }

  const api = useMemo(
    () => ({
      user,
      now,
      ...data,
      notifications,
      unread,
      isRead: (id) => notif.read.includes(id),

      /* auth */
      async signIn(email, password) {
        const res = await auth.signIn(email, password)
        if (res.ok) setUser(res.user)
        return res
      },
      async signUp(values) {
        const res = await auth.signUp(values)
        if (res.ok) setUser(res.user)
        return res
      },
      signOut() {
        auth.signOut()
        setUser(null)
        toast({ title: 'You’ve signed out' })
      },
      requestReset: auth.requestReset,
      resetPassword: auth.resetPassword,
      async updateProfile(patch) {
        const res = await auth.updateUser(user.id, patch)
        if (res.ok) setUser(res.user)
        return res
      },
      changePassword: (current, next) => auth.changePassword(user.id, current, next),
      async joinPlus() {
        const res = await auth.updateUser(user.id, { plus: { since: Date.now(), until: Date.now() + 30 * DAY, trial: true } })
        if (res.ok) setUser(res.user)
        return res
      },
      async cancelPlus() {
        const res = await auth.updateUser(user.id, { plus: null })
        if (res.ok) setUser(res.user)
        return res
      },

      /* addresses */
      saveAddress(addr) {
        let list = data.addresses
        const isNew = !addr.id
        const a = { ...addr, id: addr.id ?? uid('a_') }
        if (a.isDefault || list.length === 0) {
          a.isDefault = true
          list = list.map((x) => ({ ...x, isDefault: false }))
        }
        list = isNew ? [...list, a] : list.map((x) => (x.id === a.id ? a : x))
        persist('addresses', list)
        return a
      },
      removeAddress(id) {
        let list = data.addresses.filter((a) => a.id !== id)
        if (list.length && !list.some((a) => a.isDefault)) list = list.map((a, i) => ({ ...a, isDefault: i === 0 }))
        persist('addresses', list)
      },
      setDefaultAddress(id) {
        persist('addresses', data.addresses.map((a) => ({ ...a, isDefault: a.id === id })))
      },

      /* saved payment methods */
      savePayment(pm) {
        const exists = data.payments.find((p) => (pm.type === 'upi' ? p.vpa === pm.vpa : p.last4 === pm.last4 && p.network === pm.network))
        if (exists) return exists
        const item = { ...pm, id: uid('pm_') }
        persist('payments', [...data.payments, item])
        return item
      },
      removePayment(id) {
        persist('payments', data.payments.filter((p) => p.id !== id))
      },

      /* orders */
      placeOrder({ items, address, delivery, payment, totals }) {
        const placedAt = Date.now()
        const origin = productById[items[0].id].seller.city
        const order = {
          id: newOrderId(placedAt),
          userId: user.id,
          placedAt,
          demo: true,
          items: items.map((i) => snapshotItem(i.id, i.qty, undefined, i.size, i.color)),
          address,
          delivery,
          payment,
          totals,
          courier: { name: 'Bazaar Express', awb: awb() },
          events: demoForward({ placedAt, origin, dest: address.city, name: address.name }),
        }
        persist('orders', [order, ...data.orders])
        return order
      },
      cancelOrder(id, reason) {
        persist('orders', data.orders.map((o) => (o.id === id ? { ...o, events: cancelEvents(o, reason) } : o)))
      },
      requestReturn(id, req) {
        persist(
          'orders',
          data.orders.map((o) => (o.id === id ? { ...o, return: { ...req, requestedAt: Date.now() }, events: returnEvents(o, req) } : o)),
        )
        if (req.resolution === 'balance') {
          auth.updateUser(user.id, { balance: (user.balance ?? 0) + req.amount }).then((r) => r.ok && setUser(r.user))
        }
      },

      /* support */
      createTicket({ subject, category, orderId, message }) {
        const t = {
          id: `T-${Math.floor(10000 + Math.random() * 89999)}`,
          subject,
          category,
          orderId: orderId || null,
          createdAt: Date.now(),
          status: 'Open',
          messages: [
            { from: 'you', at: Date.now(), text: message },
            { from: 'agent', name: 'Bazaar Support', at: Date.now() + 1000, text: `Thanks${user ? `, ${user.name.split(' ')[0]}` : ''}. We’ve logged your request and a specialist will reply within 4 hours. Your reference is above.` },
          ],
        }
        persist('tickets', [t, ...data.tickets])
        return t
      },

      /* notifications */
      markRead(ids) {
        saveNotif({ ...notif, read: [...new Set([...notif.read, ...ids])] })
      },
      markAllRead() {
        saveNotif({ ...notif, read: [...new Set([...notif.read, ...notifications.map((n) => n.id)])] })
      },
      dismiss(id) {
        saveNotif({ ...notif, dismissed: [...notif.dismissed, id] })
      },
    }),
    [user, now, data, notifications, unread, notif, persist, toast], // eslint-disable-line react-hooks/exhaustive-deps
  )

  return <AccountContext.Provider value={api}>{children}</AccountContext.Provider>
}

export function useAccount() {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('useAccount must be used inside AccountProvider')
  return ctx
}

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
