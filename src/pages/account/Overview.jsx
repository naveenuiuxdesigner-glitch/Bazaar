import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, LogOut, Sparkles, Wallet } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { bucketOf, headline } from '../../services/orders'
import { ItemThumb, ProgressTrack, StatusBadge } from '../../components/orders/OrderParts'
import { ProductRail } from '../../components/product/ProductRail'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { productById } from '../../data/products'
import { formatDate } from '../../lib/dates'
import { formatPrice } from '../../lib/format'
import { ACCOUNT_NAV } from './AccountLayout'

export default function Overview() {
  const { user, orders, now, addresses, payments, unread, signOut } = useAccount()
  const { wishlist, recent } = useStore()
  const active = orders.filter((o) => bucketOf(o, now) === 'active')
  const recentOrders = orders.filter((o) => bucketOf(o, now) !== 'active').slice(0, 3)
  const recentItems = recent.map((id) => productById[id]).filter(Boolean)
  const spent = orders.filter((o) => !['cancelled'].includes(bucketOf(o, now))).reduce((s, o) => s + o.totals.total, 0)
  const saved = orders.reduce((s, o) => s + (o.totals.mrp - o.totals.total), 0)

  useEffect(() => {
    document.title = 'Your account · BAZAAR'
  }, [])

  const hour = new Date(now).getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const details = {
    '/orders': `${orders.length} orders`,
    '/account/addresses': `${addresses.length} saved`,
    '/account/payments': `${payments.length} saved`,
    '/wishlist': `${wishlist.length} items`,
    '/notifications': unread ? `${unread} unread` : 'All read',
    '/plus': user.plus ? 'Active' : 'Join free for 30 days',
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-500">{greet},</p>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[34px]">{user.name}</h1>
          <p className="mt-0.5 text-[13px] text-ink-500">Member since {formatDate(user.createdAt)}</p>
        </div>
        {user.plus && (
          <Link to="/plus" className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1.5 text-[13px] font-semibold text-violet-700">
            <Sparkles className="size-4" /> Bazaar Plus{user.plus.trial ? ' trial' : ''} · until {formatDate(user.plus.until)}
          </Link>
        )}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink-150 ring-1 ring-ink-150 sm:grid-cols-4">
        {[
          ['Orders', orders.length],
          ['In progress', active.length],
          ['Saved with Bazaar', formatPrice(saved)],
          ['Bazaar balance', formatPrice(user.balance ?? 0)],
        ].map(([k, v]) => (
          <div key={k} className="bg-white p-4 sm:p-5">
            <dt className="text-xs text-ink-500">{k}</dt>
            <dd className="mt-1 font-display text-xl font-bold tracking-tight num">{v}</dd>
          </div>
        ))}
      </dl>

      {active.length > 0 && (
        <section className="mt-10" aria-labelledby="active-title">
          <SectionHeader id="active-title" title="On the way" to="/orders?tab=active" action="All active orders" />
          <ul className="grid gap-4 xl:grid-cols-2">
            {active.map((o) => (
              <li key={o.id}>
                <Link to={`/orders/${o.id}`} className="block rounded-xl p-5 ring-1 ring-inset ring-ink-150 transition-shadow hover:shadow-lift">
                  <div className="flex items-start gap-4">
                    <ItemThumb item={o.items[0]} className="size-16" />
                    <div className="min-w-0 flex-1">
                      <StatusBadge order={o} now={now} />
                      <p className="mt-1.5 font-semibold text-ink-950">{headline(o, now)}</p>
                      <p className="line-clamp-1 text-[13px] text-ink-500">
                        {o.items[0].title}
                        {o.items.length > 1 ? ` + ${o.items.length - 1} more` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <ProgressTrack order={o} now={now} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recentOrders.length > 0 && (
        <section className="mt-10" aria-labelledby="past-title">
          <SectionHeader id="past-title" title="Recent orders" to="/orders" action="All orders" />
          <ul className="divide-y divide-ink-150 rounded-xl ring-1 ring-inset ring-ink-150">
            {recentOrders.map((o) => (
              <li key={o.id}>
                <Link to={`/orders/${o.id}`} className="flex items-center gap-4 p-4 hover:bg-ink-50">
                  <ItemThumb item={o.items[0]} className="size-12" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink-950">{headline(o, now)}</span>
                    <span className="line-clamp-1 text-[13px] text-ink-500">{o.items[0].title}</span>
                  </span>
                  <span className="hidden text-sm font-semibold num sm:block">{formatPrice(o.totals.total)}</span>
                  <ChevronRight className="size-4 text-ink-400" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10" aria-labelledby="manage-title">
        <h2 id="manage-title" className="font-display text-[22px] font-bold tracking-[-0.02em]">Manage</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ACCOUNT_NAV.filter((n) => n.to !== '/account').map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link to={to} className="group flex items-center gap-3.5 rounded-xl p-4 ring-1 ring-inset ring-ink-150 transition-shadow hover:shadow-lift">
                <span className="grid size-10 place-items-center rounded-full bg-ink-100"><Icon className="size-[18px]" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink-950">{label}</span>
                  {details[to] && <span className="text-xs text-ink-500">{details[to]}</span>}
                </span>
                <ChevronRight className="size-4 text-ink-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
          <li className="lg:hidden">
            <button type="button" onClick={signOut} className="flex w-full items-center gap-3.5 rounded-xl p-4 text-left ring-1 ring-inset ring-ink-150">
              <span className="grid size-10 place-items-center rounded-full bg-ink-100"><LogOut className="size-[18px]" /></span>
              <span className="text-sm font-semibold">Sign out</span>
            </button>
          </li>
        </ul>
      </section>

      {!user.plus && (
        <section className="mt-10 flex flex-col gap-5 rounded-xl bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <Sparkles className="size-8 shrink-0 text-violet-400" />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold tracking-tight">Try Bazaar Plus free</h2>
            <p className="mt-1 text-white/75">Free express delivery, early sale access and 2% back. You’d have saved {formatPrice(Math.max(99, orders.length * 49))} on delivery so far.</p>
          </div>
          <Link to="/plus" className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-semibold text-ink-950 hover:bg-ink-100">See benefits</Link>
        </section>
      )}

      {recentItems.length > 0 && (
        <section className="mt-12">
          <SectionHeader title="Recently viewed" to="/recently-viewed" />
          <ProductRail label="Recently viewed" products={recentItems} itemClass="w-[46%] sm:w-[31%] md:w-[23.5%] xl:w-[23.5%]" />
        </section>
      )}
      <p className="mt-10 flex items-center gap-2 text-xs text-ink-400"><Wallet className="size-4" /> Total spent on Bazaar: {formatPrice(spent)}</p>
    </div>
  )
}
