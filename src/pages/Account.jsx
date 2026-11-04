import { Link } from 'react-router-dom'
import { Bell, ChevronRight, CircleHelp, Heart, MapPin, Package, ShoppingBag, Sparkles } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/format'

export default function Account() {
  const { wishlist, totals, location, toast } = useStore()
  const tiles = [
    { to: '/orders', icon: Package, title: 'Orders & returns', body: 'Track, return or buy again' },
    { to: '/wishlist', icon: Heart, title: 'Wishlist', body: `${wishlist.length} saved items` },
    { to: '/cart', icon: ShoppingBag, title: 'Cart', body: totals.count ? `${totals.count} items · ${formatPrice(totals.total)}` : 'Empty' },
    { to: '/notifications', icon: Bell, title: 'Notifications', body: 'Deals, price drops and order updates' },
    { to: '/help', icon: CircleHelp, title: 'Help & support', body: 'FAQs, chat and call' },
  ]
  return (
    <div className="container-page pt-8">
      <div className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-ink-950 font-display text-lg font-bold text-white">AS</span>
        <div>
          <h1 className="font-display text-[26px] font-bold tracking-[-0.03em]">Aarav Sharma</h1>
          <p className="text-sm text-ink-500">aarav.sharma@example.com · +91 98XXX XX210</p>
        </div>
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ to, icon: Icon, title, body }) => (
          <li key={to}>
            <Link to={to} className="group flex items-center gap-4 rounded-xl p-5 ring-1 ring-inset ring-ink-150 transition-shadow hover:shadow-lift">
              <span className="grid size-11 place-items-center rounded-full bg-ink-100"><Icon className="size-5" /></span>
              <span className="flex-1">
                <span className="block font-semibold text-ink-950">{title}</span>
                <span className="text-sm text-ink-500">{body}</span>
              </span>
              <ChevronRight className="size-4 text-ink-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-4 rounded-xl p-5 ring-1 ring-inset ring-ink-150">
          <span className="grid size-11 place-items-center rounded-full bg-ink-100"><MapPin className="size-5" /></span>
          <span>
            <span className="block font-semibold text-ink-950">Default delivery location</span>
            <span className="text-sm text-ink-500">{location.area ? `${location.area}, ` : ''}{location.city} {location.pincode}</span>
          </span>
        </li>
      </ul>
      <section id="plus" className="mt-10 flex flex-col gap-5 rounded-xl bg-brand-grad p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <Sparkles className="size-8 shrink-0" />
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold tracking-tight">Bazaar Plus</h2>
          <p className="mt-1 text-white/90">Free same-day delivery in 40 cities, early access to sales and an extra 2% back on every order.</p>
        </div>
        <button type="button" onClick={() => toast({ title: 'Bazaar Plus trial started — 30 days free' })} className="h-11 rounded-md bg-ink-950 px-5 text-sm font-semibold hover:bg-ink-800">
          Start 30-day free trial
        </button>
      </section>
    </div>
  )
}
