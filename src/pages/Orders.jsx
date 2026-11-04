import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, Package, Search, X } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { bucketOf, headline } from '../services/orders'
import { ItemThumb, StatusBadge } from '../components/orders/OrderParts'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { formatDate } from '../lib/dates'
import { formatPrice } from '../lib/format'
import { DAY } from '../lib/dates'

const TABS = [
  ['all', 'All'],
  ['active', 'In progress'],
  ['delivered', 'Delivered'],
  ['returns', 'Returns'],
  ['cancelled', 'Cancelled'],
]
const RANGES = [
  ['any', 'Any time'],
  ['30', 'Last 30 days'],
  ['90', 'Last 3 months'],
  ['2026', '2026'],
]

export default function Orders() {
  const { orders, now } = useAccount()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') ?? 'all'
  const range = params.get('range') ?? 'any'
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = 'Your orders · BAZAAR'
  }, [])

  const counts = useMemo(() => orders.reduce((m, o) => ((m[bucketOf(o, now)] = (m[bucketOf(o, now)] ?? 0) + 1), m), {}), [orders, now])
  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return orders.filter((o) => {
      if (tab !== 'all' && bucketOf(o, now) !== tab) return false
      if (range === '30' && o.placedAt < now - 30 * DAY) return false
      if (range === '90' && o.placedAt < now - 90 * DAY) return false
      if (range === '2026' && new Date(o.placedAt).getFullYear() !== 2026) return false
      if (term && !(o.id.toLowerCase().includes(term) || o.items.some((i) => `${i.brand} ${i.title}`.toLowerCase().includes(term)))) return false
      return true
    })
  }, [orders, tab, range, q, now])

  const set = (k, v) => {
    const n = new URLSearchParams(params)
    if (v === 'all' || v === 'any') n.delete(k)
    else n.set(k, v)
    setParams(n, { replace: true })
  }

  return (
    <div className="container-page max-w-[960px] pt-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-ink-500">
        <Link to="/account" className="hover:text-ink-950">Account</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-ink-800">Orders</span>
      </nav>
      <h1 className="mt-3 font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Your orders</h1>

      {orders.length === 0 ? (
        <EmptyState icon={Package} title="No orders yet" body="When you place an order, you’ll be able to track it, return items and download invoices here.">
          <Button to="/">Start shopping</Button>
        </EmptyState>
      ) : (
        <>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by product, brand or order ID" aria-label="Search orders" className="h-10 w-full rounded-md pl-9 pr-9 text-sm ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              {q && (
                <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-1.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-ink-500 hover:bg-ink-100">
                  <X className="size-4" />
                </button>
              )}
            </div>
            <select value={range} onChange={(e) => set('range', e.target.value)} aria-label="Order date" className="h-10 rounded-md bg-white pl-3 pr-8 text-sm font-medium ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
              {RANGES.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
          <div className="scrollbar-none -mx-4 mt-4 flex gap-1 overflow-x-auto border-b border-ink-150 px-4 sm:mx-0 sm:px-0" role="tablist">
            {TABS.map(([v, l]) => (
              <button key={v} type="button" role="tab" aria-selected={tab === v} onClick={() => set('tab', v)} className={`relative h-11 shrink-0 px-3 text-sm font-medium ${tab === v ? 'text-ink-950' : 'text-ink-500 hover:text-ink-900'}`}>
                {l} <span className="text-ink-400 num">{v === 'all' ? orders.length : counts[v] ?? 0}</span>
                {tab === v && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-ink-950" />}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <EmptyState icon={Package} title="No orders match" body="Try another tab, a different time range, or clear your search.">
              <Button variant="secondary" onClick={() => { setQ(''); setParams({}, { replace: true }) }}>Show all orders</Button>
            </EmptyState>
          ) : (
            <ul className="mt-6 space-y-4">
              {list.map((o) => (
                <li key={o.id}>
                  <Link to={`/orders/${o.id}`} className="group block rounded-xl ring-1 ring-inset ring-ink-150 transition-shadow hover:shadow-lift">
                    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-ink-150 bg-ink-50 px-5 py-3 text-[13px] text-ink-600">
                      <span>Placed {formatDate(o.placedAt)}</span>
                      <span className="num">Total <span className="font-semibold text-ink-950">{formatPrice(o.totals.total)}</span></span>
                      <span className="hidden sm:inline">Ship to {o.address.name}</span>
                      <span className="ml-auto font-medium text-ink-800 num">#{o.id}</span>
                    </div>
                    <div className="flex items-center gap-4 p-5">
                      <div className="flex -space-x-4">
                        {o.items.slice(0, 3).map((i) => (
                          <span key={i.id} className="rounded-md ring-2 ring-white">
                            <ItemThumb item={i} className="size-16 sm:size-[72px]" />
                          </span>
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <StatusBadge order={o} now={now} />
                        <p className="mt-1.5 text-[15px] font-semibold text-ink-950">{headline(o, now)}</p>
                        <p className="mt-0.5 line-clamp-1 text-[13px] text-ink-600">
                          {o.items[0].brand} {o.items[0].title}
                          {o.items.length > 1 && ` + ${o.items.length - 1} more`}
                        </p>
                      </div>
                      <ChevronRight className="size-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
