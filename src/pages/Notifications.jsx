import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BellOff, X } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { timeAgo } from '../lib/dates'

const TABS = [
  ['all', 'All'],
  ['orders', 'Orders'],
  ['offers', 'Offers & alerts'],
]

export default function Notifications() {
  const { notifications, isRead, markRead, markAllRead, dismiss, unread, now } = useAccount()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') ?? 'all'
  const [onlyUnread, setOnlyUnread] = useState(false)

  useEffect(() => {
    document.title = `${unread ? `(${unread}) ` : ''}Notifications · BAZAAR`
  }, [unread])

  const list = useMemo(() => notifications.filter((n) => (tab === 'all' || n.kind === tab) && (!onlyUnread || !isRead(n.id))), [notifications, tab, onlyUnread, isRead])

  return (
    <div className="container-page max-w-3xl pt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Notifications</h1>
          <p className="mt-1 text-sm text-ink-500">{unread ? `${unread} unread` : 'You’re all caught up'}</p>
        </div>
        {unread > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            Mark all as read
          </Button>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-ink-150">
        <div className="flex gap-1" role="tablist">
          {TABS.map(([v, l]) => (
            <button key={v} type="button" role="tab" aria-selected={tab === v} onClick={() => setParams(v === 'all' ? {} : { tab: v }, { replace: true })} className={`relative h-11 px-3 text-sm font-medium ${tab === v ? 'text-ink-950' : 'text-ink-500 hover:text-ink-900'}`}>
              {l}
              {tab === v && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-ink-950" />}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 pb-2 text-[13px] text-ink-600">
          <input type="checkbox" checked={onlyUnread} onChange={(e) => setOnlyUnread(e.target.checked)} className="size-4 accent-brand-600" /> Unread only
        </label>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={BellOff} title="Nothing here" body="We’ll let you know about order updates, price drops and offers." />
      ) : (
        <ul className="divide-y divide-ink-150">
          <AnimatePresence initial={false}>
            {list.map(({ id, icon: Icon, title, body, to, at }) => {
              const read = isRead(id)
              return (
                <motion.li key={id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className={`flex gap-4 py-4 ${read ? '' : ''}`}>
                  <span className={`relative grid size-10 shrink-0 place-items-center rounded-full ${read ? 'bg-ink-100 text-ink-600' : 'bg-ink-950 text-white'}`}>
                    <Icon className="size-[18px]" />
                    {!read && <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-brand-500 ring-2 ring-white" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link to={to} onClick={() => markRead([id])} className={`text-[15px] hover:underline ${read ? 'font-medium text-ink-800' : 'font-semibold text-ink-950'}`}>
                      {title}
                    </Link>
                    <p className="text-sm text-ink-600">{body}</p>
                    <p className="mt-1 text-xs text-ink-400">{timeAgo(at, now)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button type="button" onClick={() => dismiss(id)} aria-label="Dismiss notification" className="grid size-8 place-items-center rounded-md text-ink-400 hover:bg-ink-100 hover:text-ink-950">
                      <X className="size-4" />
                    </button>
                    {!read && (
                      <button type="button" onClick={() => markRead([id])} className="text-xs font-medium text-ink-500 hover:text-ink-950">
                        Mark read
                      </button>
                    )}
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
