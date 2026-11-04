import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarCheck, Check, CreditCard, MapPin } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/States'
import { ItemThumb } from '../components/orders/OrderParts'
import { Recommended } from '../components/home/PersonalRails'
import { formatDay } from '../lib/dates'
import { formatPrice } from '../lib/format'

export default function OrderPlaced() {
  const { id } = useParams()
  const { orders, user } = useAccount()
  const order = orders.find((o) => o.id === id)

  useEffect(() => {
    document.title = 'Order placed · BAZAAR'
  }, [])

  if (!order)
    return (
      <div className="container-page">
        <EmptyState title="We couldn’t find that order" body="It may belong to another account.">
          <Button to="/orders">Your orders</Button>
        </EmptyState>
      </div>
    )

  return (
    <div className="container-page pt-8 sm:pt-12">
      <div className="mx-auto max-w-[720px] text-center">
        <motion.span initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 15 }} className="mx-auto grid size-16 place-items-center rounded-full bg-save-700 text-white">
          <Check className="size-8" strokeWidth={3} />
        </motion.span>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h1 className="mt-6 font-display text-[30px] font-bold tracking-[-0.03em] sm:text-[38px]">Thank you, {user.name.split(' ')[0]}. Your order is placed.</h1>
          <p className="mt-2 text-ink-600">
            Order <span className="font-semibold text-ink-950 num">{order.id}</span> · We’ve sent the details to {user.email}
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mx-auto mt-10 max-w-[720px] rounded-xl ring-1 ring-inset ring-ink-150">
        <div className="grid gap-px overflow-hidden rounded-t-xl bg-ink-150 sm:grid-cols-3">
          <div className="bg-white p-5">
            <CalendarCheck className="size-5 text-ink-500" />
            <p className="mt-2 text-xs text-ink-500">Expected delivery</p>
            <p className="text-sm font-semibold">{order.delivery.eta ? formatDay(order.delivery.eta) : 'Soon'}</p>
            <p className="text-xs text-ink-500">{order.delivery.label}</p>
          </div>
          <div className="bg-white p-5">
            <MapPin className="size-5 text-ink-500" />
            <p className="mt-2 text-xs text-ink-500">Delivering to</p>
            <p className="text-sm font-semibold">{order.address.name}</p>
            <p className="line-clamp-2 text-xs text-ink-500">{order.address.line2}, {order.address.city} {order.address.pincode}</p>
          </div>
          <div className="bg-white p-5">
            <CreditCard className="size-5 text-ink-500" />
            <p className="mt-2 text-xs text-ink-500">{order.payment.status}</p>
            <p className="text-sm font-semibold num">{formatPrice(order.totals.total)}</p>
            <p className="line-clamp-2 text-xs text-ink-500">{order.payment.label}</p>
          </div>
        </div>
        <ul className="divide-y divide-ink-150 border-t border-ink-150 px-5">
          {order.items.map((i) => (
            <li key={`${i.id}:${i.size ?? ''}`} className="flex items-center gap-4 py-4">
              <ItemThumb item={i} className="size-14" />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 text-sm text-ink-900">{i.title}</span>
                <span className="text-xs text-ink-500">{i.brand}{i.size ? ` · Size ${i.size}` : ''} · Qty {i.qty}</span>
              </span>
              <span className="text-sm font-semibold num">{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        {order.totals.mrp - order.totals.total > 0 && (
          <p className="border-t border-ink-150 px-5 py-3 text-[13px] font-medium text-save-700">You saved {formatPrice(order.totals.mrp - order.totals.total)} on this order</p>
        )}
      </motion.div>

      <div className="mx-auto mt-6 flex max-w-[720px] flex-col gap-2.5 sm:flex-row">
        <Button to={`/orders/${order.id}`} size="lg" className="flex-1">Track this order</Button>
        <Button to="/" size="lg" variant="secondary" className="flex-1">Continue shopping</Button>
      </div>
      <p className="mx-auto mt-4 max-w-[720px] text-center text-xs text-ink-500">Demo orders move through packing, shipping and delivery within about ten minutes, so you can watch tracking update live.</p>

      <div className="mt-16">
        <Recommended />
      </div>
    </div>
  )
}
