import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Printer } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { Logo } from '../components/layout/Logo'
import { formatDate } from '../lib/dates'
import { formatPrice } from '../lib/format'

// GST is shown as included in the price, split out at 18% for the tax summary.
const GST = 0.18

export default function Invoice() {
  const { id } = useParams()
  const { orders, user } = useAccount()
  const order = orders.find((o) => o.id === id)
  useEffect(() => {
    document.title = `Invoice ${id} · BAZAAR`
  }, [id])
  if (!order) return <p className="p-10 text-center text-ink-600">Invoice not found for this account.</p>
  const t = order.totals
  const taxable = Math.round(t.total / (1 + GST))
  return (
    <div className="min-h-dvh bg-ink-100 py-8 print:bg-white print:py-0">
      <div className="mx-auto max-w-[820px] bg-white p-8 shadow-lift print:shadow-none sm:p-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Logo />
            <p className="mt-3 text-xs leading-5 text-ink-500">Bazaar Marketplace Pvt. Ltd.<br />Embassy Golf Links, Bengaluru 560071<br />GSTIN 29AABCB1234F1Z5</p>
          </div>
          <div className="text-right">
            <h1 className="font-display text-2xl font-bold">Tax invoice</h1>
            <p className="mt-1 text-sm text-ink-600 num">Invoice BZI-{order.id.replace('BZ', '')}</p>
            <p className="text-sm text-ink-600">Order {order.id}</p>
            <p className="text-sm text-ink-600">{formatDate(order.placedAt)}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 border-y border-ink-150 py-6 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">Billed to</p>
            <p className="mt-1.5 font-semibold">{user.name}</p>
            <p className="text-ink-600">{user.email}</p>
            <p className="text-ink-600 num">+91 {user.phone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">Shipped to</p>
            <p className="mt-1.5 font-semibold">{order.address.name}</p>
            <p className="text-ink-600">{order.address.line1}, {order.address.line2}</p>
            <p className="text-ink-600">{order.address.city}, {order.address.state} {order.address.pincode}</p>
          </div>
        </div>
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-xs text-ink-500">
              <th className="py-2 font-medium">Item</th>
              <th className="py-2 font-medium">Seller</th>
              <th className="py-2 text-right font-medium">Qty</th>
              <th className="py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-150">
            {order.items.map((i) => (
              <tr key={i.id}>
                <td className="py-3 pr-4">{i.brand} {i.title}</td>
                <td className="py-3 pr-4 text-ink-600">{i.seller}</td>
                <td className="py-3 text-right num">{i.qty}</td>
                <td className="py-3 text-right num">{formatPrice(i.price * i.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="ml-auto mt-6 max-w-[300px] space-y-1.5 text-sm">
          <div className="flex justify-between"><dt className="text-ink-600">Subtotal</dt><dd className="num">{formatPrice(t.subtotal)}</dd></div>
          {t.coupon > 0 && <div className="flex justify-between"><dt className="text-ink-600">Coupon {t.couponCode}</dt><dd className="num">−{formatPrice(t.coupon)}</dd></div>}
          {t.offer > 0 && <div className="flex justify-between"><dt className="text-ink-600">Payment offer</dt><dd className="num">−{formatPrice(t.offer)}</dd></div>}
          <div className="flex justify-between"><dt className="text-ink-600">Delivery</dt><dd className="num">{formatPrice(t.delivery)}</dd></div>
          <div className="flex justify-between text-ink-500"><dt>Taxable value</dt><dd className="num">{formatPrice(taxable)}</dd></div>
          <div className="flex justify-between text-ink-500"><dt>GST (18%, included)</dt><dd className="num">{formatPrice(t.total - taxable)}</dd></div>
          <div className="flex justify-between border-t border-ink-200 pt-2 text-base font-semibold"><dt>Total</dt><dd className="num">{formatPrice(t.total)}</dd></div>
        </dl>
        <p className="mt-8 text-xs text-ink-500">Paid by {order.payment.label}. This is a computer-generated invoice for a portfolio demo and is not a real tax document.</p>
        <button type="button" onClick={() => window.print()} className="mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white print:hidden">
          <Printer className="size-4" /> Print or save as PDF
        </button>
      </div>
    </div>
  )
}
