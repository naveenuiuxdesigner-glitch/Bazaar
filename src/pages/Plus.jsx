import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgePercent, Check, Clock, Loader2, Sparkles, Truck, Undo2, Zap } from 'lucide-react'
import { useAccount } from '../context/AccountContext'
import { useStore } from '../context/StoreContext'
import { Button } from '../components/ui/Button'
import { formatDate } from '../lib/dates'

const BENEFITS = [
  { icon: Truck, title: 'Free express delivery', body: 'Next-day delivery on every order, no minimum, in 40 cities.' },
  { icon: Clock, title: 'Early access to sales', body: 'Shop Festive and Big Saver sales 24 hours before everyone else.' },
  { icon: BadgePercent, title: '2% back on every order', body: 'Credited to your Bazaar balance after delivery.' },
  { icon: Undo2, title: 'Priority returns', body: 'Same-day pickup and instant refunds to Bazaar balance.' },
  { icon: Zap, title: 'Free scheduled slots', body: 'Pick any day and time for delivery at no extra cost.' },
  { icon: Sparkles, title: 'Member-only prices', body: 'Extra discounts on selected brands every week.' },
]

export default function Plus() {
  const { user, joinPlus, cancelPlus } = useAccount()
  const { toast } = useStore()
  const [busy, setBusy] = useState(false)
  const [confirm, setConfirm] = useState(false)
  useEffect(() => {
    document.title = 'Bazaar Plus · BAZAAR'
  }, [])

  const join = async () => {
    setBusy(true)
    await joinPlus()
    setBusy(false)
    toast({ title: 'Welcome to Bazaar Plus. Your 30-day trial has started.' })
  }
  const leave = async () => {
    setBusy(true)
    await cancelPlus()
    setBusy(false)
    setConfirm(false)
    toast({ title: 'Bazaar Plus cancelled' })
  }

  return (
    <div className="container-page pt-8">
      <section className="overflow-hidden rounded-2xl bg-ink-950 bg-[radial-gradient(60%_90%_at_100%_0%,rgb(124_77_255/0.45),transparent_60%),radial-gradient(50%_80%_at_0%_100%,rgb(52_97_255/0.35),transparent_60%)] text-white">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-14">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-200"><Sparkles className="size-4" /> Bazaar Plus</p>
            <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[48px]">Faster delivery. Better prices. Every brand.</h1>
            <p className="mt-4 max-w-lg text-white/70">One membership across 2,000+ brands and every seller on Bazaar. Try it free for 30 days, then ₹149 a month or ₹999 a year. Cancel any time.</p>
            <div className="mt-8">
              {!user ? (
                <Button to="/login?next=/plus" size="lg" className="bg-white! text-ink-950! hover:bg-ink-100!">Sign in to start your free trial</Button>
              ) : user.plus ? (
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                    <Check className="size-4 text-save-100" /> You’re a member{user.plus.trial ? ' (free trial)' : ''} until {formatDate(user.plus.until)}
                  </p>
                  <div className="mt-4">
                    {confirm ? (
                      <span className="flex flex-wrap items-center gap-3 text-sm">
                        You’ll lose free express delivery and 2% back.
                        <button type="button" onClick={leave} disabled={busy} className="font-semibold text-violet-200 underline underline-offset-2">{busy ? 'Cancelling…' : 'Cancel membership'}</button>
                        <button type="button" onClick={() => setConfirm(false)} className="font-semibold text-white/70">Keep it</button>
                      </span>
                    ) : (
                      <button type="button" onClick={() => setConfirm(true)} className="text-sm font-medium text-white/60 underline underline-offset-2 hover:text-white">Cancel membership</button>
                    )}
                  </div>
                </div>
              ) : (
                <Button size="lg" onClick={join} disabled={busy} className="bg-white! text-ink-950! hover:bg-ink-100!">
                  {busy && <Loader2 className="size-4 animate-spin" />} Start 30-day free trial
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {[
              ['₹0', 'delivery fee on express orders'],
              ['24h', 'early access to every sale'],
              ['2%', 'back on all purchases'],
              ['40', 'cities with next-day delivery'],
            ].map(([k, v], i) => (
              <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }} className="rounded-lg bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10">
                <p className="font-display text-3xl font-bold">{k}</p>
                <p className="mt-1 text-[13px] text-white/60">{v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] sm:text-[28px]">What you get</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-700"><Icon className="size-5" /></span>
              <span>
                <span className="block font-semibold text-ink-950">{title}</span>
                <span className="text-sm text-ink-600">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:max-w-[760px]">
        {[
          ['Monthly', '₹149', 'per month after your trial'],
          ['Yearly', '₹999', 'per year, saves ₹789'],
        ].map(([k, p, n]) => (
          <div key={k} className={`rounded-xl p-6 ring-1 ring-inset ${k === 'Yearly' ? 'ring-2 ring-ink-950' : 'ring-ink-150'}`}>
            <p className="text-sm font-semibold text-ink-600">{k} {k === 'Yearly' && <span className="ml-1 rounded-sm bg-save-50 px-1.5 py-0.5 text-[11px] text-save-700">Best value</span>}</p>
            <p className="mt-2 font-display text-3xl font-bold">{p}</p>
            <p className="text-sm text-ink-500">{n}</p>
          </div>
        ))}
      </section>
      <p className="mt-6 text-sm text-ink-500">
        Questions? Read the <Link to="/help#delivery" className="underline">delivery FAQ</Link>. This is a demo: no payment is taken when the trial ends.
      </p>
    </div>
  )
}
