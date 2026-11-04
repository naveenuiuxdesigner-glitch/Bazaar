import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { categories } from '../../data/categories'

const columns = [
  { title: 'Shop', links: categories.slice(0, 7).map((c) => [`/c/${c.slug}`, c.name]) },
  { title: 'More to explore', links: categories.slice(7, 14).map((c) => [`/c/${c.slug}`, c.name]) },
  {
    title: 'Your account',
    links: [
      ['/account', 'Account'],
      ['/orders', 'Orders & returns'],
      ['/wishlist', 'Wishlist'],
      ['/cart', 'Cart'],
      ['/notifications', 'Notifications'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['/help#delivery', 'Delivery & tracking'],
      ['/help#returns', 'Returns & refunds'],
      ['/help#payments', 'Payments & EMI'],
      ['/help#security', 'Buy safely'],
      ['/help#contact', 'Contact us'],
    ],
  },
]

const PAY = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking', 'EMI', 'Cash on Delivery']

export function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const valid = /^\S+@\S+\.\S+$/.test(email)
  return (
    <footer className="mt-20 bg-ink-950 text-white/70 lg:mt-28">
      <div className="container-page">
        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-16">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-sm text-sm leading-6">India’s multi-brand marketplace. Over 2,000 brands and 40,000 verified sellers, one cart, delivered to 19,000+ pincodes.</p>
            <form
              className="mt-6 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault()
                if (valid) setDone(true)
              }}
            >
              <label htmlFor="newsletter" className="text-sm font-semibold text-white">
                Get early access to sales
              </label>
              {done ? (
                <p className="mt-3 flex items-center gap-2 text-sm text-white">
                  <Check className="size-4 text-save-100" /> You’re on the list. Watch your inbox.
                </p>
              ) : (
                <div className="mt-3 flex h-11 rounded-md bg-white/10 ring-1 ring-inset ring-white/15 focus-within:ring-2 focus-within:ring-white">
                  <input id="newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent px-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none" />
                  <button type="submit" disabled={!valid} aria-label="Subscribe" className="m-1 grid w-10 place-items-center rounded bg-white text-ink-950 transition-opacity disabled:opacity-40">
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
          {/* Phones: collapsible groups keep the footer short */}
          <div className="divide-y divide-white/10 border-y border-white/10 sm:hidden">
            {columns.map((col) => (
              <details key={col.title} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {col.title}
                  <ChevronDown className="size-4 text-white/60 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pb-5">
                  {col.links.map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-sm hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <div className="hidden grid-cols-4 gap-8 sm:grid">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[13px] font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-sm transition-colors hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 py-8 text-xs lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
            {PAY.map((p) => (
              <span key={p} className="rounded border border-white/15 px-2 py-1 font-medium text-white/80">
                {p}
              </span>
            ))}
          </div>
          <p className="text-white/50">
            © 2026 Bazaar Marketplace Pvt. Ltd. · A portfolio concept. Brand names belong to their owners. ·{' '}
            <Link to="/credits" className="underline underline-offset-2 hover:text-white">
              Photo credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
