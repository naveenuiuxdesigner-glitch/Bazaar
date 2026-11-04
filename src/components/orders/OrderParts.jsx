import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, CircleDot } from 'lucide-react'
import { FORWARD, STAGES, bucketOf, currentEvent, eventAt, pastEvents, statusOf } from '../../services/orders'
import { productById } from '../../data/products'
import { ProductArt } from '../art/ProductArt'
import { StatusPill } from '../form/Field'
import { formatDateTime, formatDay, formatTime } from '../../lib/dates'
import { productColorName } from '../../lib/productOptions'

export function StatusBadge({ order, now }) {
  const code = statusOf(order, now)
  const s = STAGES[code]
  return (
    <StatusPill tone={s.tone}>
      <span className={`size-1.5 rounded-full ${s.tone === 'save' ? 'bg-save-600' : s.tone === 'brand' ? 'bg-brand-500' : s.tone === 'muted' ? 'bg-ink-400' : 'bg-ink-700'} ${['placed', 'packed', 'shipped', 'out'].includes(code) ? 'animate-pulse' : ''}`} />
      {s.short}
    </StatusPill>
  )
}

export function ItemThumb({ item, className = 'size-16' }) {
  const p = productById[item.id]
  return (
    <span className={`block shrink-0 overflow-hidden rounded-md bg-studio ${className}`}>
      {p ? <ProductArt src={p.colorGalleries?.[item.color]?.[0] ?? p.image} kind={p.art.kind} color={item.color ?? p.art.color} brand={p.brand} label={p.title} className="size-full p-1" /> : null}
    </span>
  )
}

/** Horizontal progress for the forward journey, or the return / cancellation journey. */
export function ProgressTrack({ order, now }) {
  const bucket = bucketOf(order, now)
  const past = new Set(pastEvents(order, now).map((e) => e.code))
  let steps
  if (bucket === 'cancelled') steps = ['placed', 'cancelled', ...(order.events.some((e) => e.code === 'refunded') ? ['refunded'] : [])]
  else if (bucket === 'returns') steps = order.events.some((e) => e.code === 'replacement_shipped') ? ['return_requested', 'pickup_scheduled', 'picked_up', 'replacement_shipped', 'replacement_delivered'] : ['return_requested', 'pickup_scheduled', 'picked_up', 'refund_initiated', 'refunded']
  else steps = FORWARD
  const doneCount = steps.filter((s) => past.has(s)).length
  const edge = `${50 / steps.length}%`
  const pct = steps.length > 1 ? (Math.max(0, doneCount - 1) / (steps.length - 1)) * 100 : 100
  return (
    <div className="relative" role="img" aria-label={`Order progress: ${STAGES[statusOf(order, now)].label}`}>
      <div className="absolute top-3 h-0.5 bg-ink-150" style={{ left: edge, right: edge }} />
      <div className="absolute top-3" style={{ left: edge, right: edge }}>
        <motion.div className={`h-0.5 ${bucket === 'cancelled' ? 'bg-ink-400' : 'bg-save-600'}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} />
      </div>
      <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((code) => {
          const done = past.has(code)
          const at = eventAt(order, code)
          const isNow = currentEvent(order, now).code === code
          return (
            <li key={code} className="flex flex-col items-center text-center">
              <span className={`relative grid size-6 place-items-center rounded-full ring-4 ring-white ${done ? (code === 'cancelled' ? 'bg-ink-500' : 'bg-save-600') : 'bg-ink-150'}`}>
                {done ? <Check className="size-3.5 text-white" strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-ink-400" />}
                {isNow && !['delivered', 'refunded', 'cancelled', 'replacement_delivered'].includes(code) && <span className="absolute inset-0 animate-ping rounded-full bg-save-600/40" />}
              </span>
              <span className={`mt-2 text-[11.5px] font-semibold leading-tight sm:text-xs ${done ? 'text-ink-950' : 'text-ink-400'}`}>{STAGES[code].short}</span>
              {at && <span className={`mt-0.5 hidden text-[11px] sm:block ${done ? 'text-ink-500' : 'text-ink-400'}`}>{done ? formatDay(at) : `Exp. ${formatDay(at)}`}</span>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Detailed event log, newest first, with the planned events greyed out. */
export function TrackingLog({ order, now }) {
  const past = pastEvents(order, now)
  const future = order.events.filter((e) => e.at > now)
  return (
    <ol className="relative">
      {[...past].reverse().map((e, i) => (
        <li key={e.code + e.at} className="relative flex gap-4 pb-6 last:pb-0">
          <span className="relative flex flex-col items-center">
            <span className={`z-10 grid size-5 place-items-center rounded-full ${i === 0 ? 'bg-ink-950' : 'bg-save-600'}`}>
              {i === 0 ? <CircleDot className="size-3 text-white" /> : <Check className="size-3 text-white" strokeWidth={3} />}
            </span>
            {i < past.length - 1 && <span className="absolute top-5 h-[calc(100%)] w-0.5 bg-save-600/40" />}
          </span>
          <div className="-mt-0.5 min-w-0">
            <p className="text-sm font-semibold text-ink-950">{STAGES[e.code].label}</p>
            <p className="text-[13px] text-ink-600">{e.note}</p>
            <p className="mt-0.5 text-xs text-ink-400">
              {formatDateTime(e.at)}
              {e.place ? ` · ${e.place}` : ''}
            </p>
          </div>
        </li>
      ))}
      {future.length > 0 && (
        <li className="mt-6 border-t border-ink-150 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500">Coming up</p>
          <ul className="mt-3 space-y-2.5">
            {future.map((e) => (
              <li key={e.code} className="flex items-center justify-between gap-3 text-sm text-ink-500">
                <span className="flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-ink-300" /> {STAGES[e.code].label}
                </span>
                <span className="text-xs num">{order.demo ? `around ${formatTime(e.at)}` : formatDay(e.at)}</span>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ol>
  )
}

export function OrderItemRow({ item, actions }) {
  return (
    <div className="flex gap-4">
      <Link to={`/p/${item.id}`}>
        <ItemThumb item={item} className="size-20" />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">{item.brand}</p>
        <Link to={`/p/${item.id}`} className="mt-0.5 line-clamp-2 text-sm text-ink-900 hover:underline">{item.title}</Link>
        <p className="mt-1 text-[13px] text-ink-500">
          Qty {item.qty} · <span className="font-semibold text-ink-950 num">₹{(item.price * item.qty).toLocaleString('en-IN')}</span> · Sold by {item.seller}
        </p>
        {(item.size || item.color) && <p className="mt-1 text-xs text-ink-500">{[item.size, item.color ? productColorName(item.color) : null].filter(Boolean).join(' · ')}</p>}
        {actions && <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] font-semibold">{actions}</div>}
      </div>
    </div>
  )
}
