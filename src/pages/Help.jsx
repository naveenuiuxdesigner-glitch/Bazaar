import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Loader2, MessageCircle, Phone, Search, Send, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useAccount } from '../context/AccountContext'
import { Overlay } from '../components/overlay/Overlay'
import { Button } from '../components/ui/Button'
import { SelectField, StatusPill, TextArea, TextField } from '../components/form/Field'
import { ItemThumb, StatusBadge } from '../components/orders/OrderParts'
import { bucketOf, headline, returnable } from '../services/orders'
import { formatDate, formatDateTime, formatTime } from '../lib/dates'

const faqs = [
  {
    id: 'delivery',
    title: 'Delivery & tracking',
    items: [
      ['When will my order arrive?', 'Delivery dates are shown on every product for your pincode. Most electronics, books and grocery arrive within 1–2 days; large appliances in 3–5 days with free installation.'],
      ['Is delivery free?', 'Delivery is free on orders above ₹499. Below that, a ₹49 fee applies. Express delivery is ₹99, and free for Bazaar Plus members.'],
      ['How do I track my order?', 'Open My Orders and select the order. You’ll see each step from packing to delivery, the courier and tracking number, and a live timeline.'],
      ['Can I change my delivery address?', 'You can cancel and reorder before your order ships. Once it ships, contact us and we’ll try to redirect it.'],
    ],
  },
  {
    id: 'returns',
    title: 'Returns & refunds',
    items: [
      ['How do I return an item?', 'Fashion and footwear have 15-day free returns with size exchange. Electronics have a 7-day replacement window. Start a return from My Orders and we’ll schedule a doorstep pickup.'],
      ['When will I get my refund?', 'Refunds to UPI and cards are processed within 2–4 business days after pickup. Refunds to Bazaar balance are instant. Cash on delivery orders are refunded to Bazaar balance.'],
      ['Which items can’t be returned?', 'Grocery and beauty products are replaceable only if they arrive damaged. Raise a request within 48 hours of delivery.'],
    ],
  },
  {
    id: 'payments',
    title: 'Payments & EMI',
    items: [
      ['Which payment methods do you accept?', 'UPI, credit and debit cards, net banking, no-cost EMI on eligible products, and cash on delivery up to ₹50,000.'],
      ['How does no-cost EMI work?', 'On orders of ₹10,000 or more, 3 and 6 month plans on supported bank cards are no-cost: the interest is given as an upfront discount, so you pay only the product price.'],
      ['Are there payment offers?', 'UPI payments above ₹1,000 get ₹100 off. HDFC Bank cards get 10% instant discount on orders above ₹5,000, up to ₹7,500. Offers apply automatically at checkout.'],
    ],
  },
  {
    id: 'account',
    title: 'Account & orders',
    items: [
      ['How do I cancel an order?', 'Open the order in My Orders and choose Cancel order. You can cancel any time before it ships. Prepaid orders are refunded automatically.'],
      ['I forgot my password', 'Use “Forgot password” on the sign-in page. We’ll send a one-time code to your email so you can set a new one.'],
      ['How do I get an invoice?', 'Every order has an Invoice button on its order page. You can print it or save it as a PDF.'],
    ],
  },
  {
    id: 'security',
    title: 'Buying safely',
    items: [
      ['Are products genuine?', 'Brand stores are run by authorised sellers. Bazaar Verified products are quality-checked in our warehouses before dispatch.'],
      ['How are reviews moderated?', 'Reviews marked “Verified purchase” come from shoppers who bought the item on Bazaar. We remove reviews that are paid, abusive or not about the product.'],
    ],
  },
  {
    id: 'terms',
    title: 'Terms of use',
    items: [['What are the key terms?', 'Bazaar is a marketplace: products are sold by independent sellers, and Bazaar handles payments, delivery and support. Prices include GST. Orders can be cancelled before shipping, and returns follow the policy on each product page.']],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    items: [['How is my data used?', 'We use your details to deliver orders and send updates. We never sell personal data. In this demo, everything you enter stays in your browser’s local storage.']],
  },
]

const CATEGORIES = ['Order status & delivery', 'Returns & refunds', 'Payments & EMI', 'Cancel an order', 'Damaged or wrong item', 'Account & login', 'Something else']

function useBot() {
  const { user, orders, now } = useAccount()
  return (text) => {
    const t = text.toLowerCase()
    const active = orders.filter((o) => bucketOf(o, now) === 'active')
    if (/track|where|status|deliver|arriv/.test(t)) {
      if (!user) return { text: 'Sign in and I can look up your orders. You can also track any order from My Orders.', link: ['/login?next=/help', 'Sign in'] }
      if (!active.length) return { text: 'You have no orders on the way right now. Your latest order is in My Orders.', link: ['/orders', 'View orders'] }
      const o = active[0]
      return { text: `Your order ${o.id} (${o.items[0].brand} ${o.items[0].title.split(',')[0]}) is ${headline(o, now).toLowerCase()}.${active.length > 1 ? ` You have ${active.length - 1} more on the way.` : ''}`, link: [`/orders/${o.id}`, 'Track order'] }
    }
    if (/return|exchange|replace|size/.test(t)) {
      const r = orders.flatMap((o) => (returnable(o, now).length ? [o] : []))
      if (r.length) return { text: `Order ${r[0].id} has items you can still return, with free doorstep pickup.`, link: [`/orders/${r[0].id}/return`, 'Start a return'] }
      return { text: 'Returns start from My Orders. Fashion and footwear have 15 days, electronics a 7-day replacement window.', link: ['/orders', 'My Orders'] }
    }
    if (/refund|money/.test(t)) return { text: 'Refunds reach UPI and cards in 2–4 business days after pickup, and Bazaar balance instantly. Each order page shows the refund status.', link: ['/orders?tab=returns', 'See returns'] }
    if (/cancel/.test(t)) return { text: 'You can cancel any order before it ships from its order page. Prepaid orders are refunded automatically.', link: ['/orders?tab=active', 'Orders in progress'] }
    if (/emi|pay|upi|card|cod|cash/.test(t)) return { text: 'We accept UPI, cards, net banking, EMI and cash on delivery up to ₹50,000. UPI gets ₹100 off above ₹1,000.', link: ['/help#payments', 'Payment FAQs'] }
    if (/agent|human|person|call/.test(t)) return { text: 'Connecting you to a specialist. Priya from Bazaar Support has joined. How can I help?', agent: true }
    if (/hi|hello|hey/.test(t)) return { text: `Hi${user ? ` ${user.name.split(' ')[0]}` : ''}! Ask me about tracking, returns, refunds, cancellations or payments.` }
    return { text: 'I can help with tracking, returns, refunds, cancellations and payments. For anything else, type “agent” to talk to a person, or raise a request below.' }
  }
}

function ChatPanel({ open, onClose }) {
  const bot = useBot()
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi, I’m Bazaar’s assistant. What can I help you with?', at: Date.now() }])
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const end = useRef(null)
  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth' }), [msgs, typing])
  const send = (t) => {
    const q = (t ?? text).trim()
    if (!q) return
    setMsgs((m) => [...m, { from: 'you', text: q, at: Date.now() }])
    setText('')
    setTyping(true)
    setTimeout(() => {
      const r = bot(q)
      setTyping(false)
      setMsgs((m) => [...m, { from: r.agent ? 'agent' : 'bot', ...r, at: Date.now() }])
    }, 750)
  }
  return (
    <Overlay open={open} onClose={onClose} label="Chat with Bazaar support" variant="drawer-right">
      <header className="flex items-center justify-between border-b border-ink-150 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-bold">Bazaar support</h2>
          <p className="flex items-center gap-1.5 text-xs text-save-700"><span className="size-1.5 rounded-full bg-save-600" /> Online · replies instantly</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close chat" className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink-100">
          <X className="size-5" />
        </button>
      </header>
      <ol className="flex-1 space-y-3 overflow-y-auto bg-ink-50 px-5 py-5" aria-live="polite">
        {msgs.map((m, i) => (
          <li key={i} className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${m.from === 'you' ? 'rounded-br-sm bg-ink-950 text-white' : 'rounded-bl-sm bg-white text-ink-900 ring-1 ring-inset ring-ink-150'}`}>
              {m.from === 'agent' && <p className="mb-0.5 text-xs font-semibold text-brand-700">Priya · Support specialist</p>}
              <p>{m.text}</p>
              {m.link && (
                <Link to={m.link[0]} onClick={onClose} className="mt-2 inline-block text-[13px] font-semibold underline underline-offset-2">
                  {m.link[1]}
                </Link>
              )}
              <p className={`mt-1 text-[10.5px] ${m.from === 'you' ? 'text-white/50' : 'text-ink-400'}`}>{formatTime(m.at)}</p>
            </div>
          </li>
        ))}
        {typing && (
          <li className="flex">
            <span className="inline-flex gap-1 rounded-xl bg-white px-3.5 py-3 ring-1 ring-inset ring-ink-150" aria-label="Typing">
              {[0, 1, 2].map((d) => (
                <motion.span key={d} className="size-1.5 rounded-full bg-ink-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.15 }} />
              ))}
            </span>
          </li>
        )}
        <li ref={end} />
      </ol>
      <div className="border-t border-ink-150 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <div className="scrollbar-none mb-2.5 flex gap-2 overflow-x-auto">
          {['Track my order', 'Return an item', 'Refund status', 'Talk to an agent'].map((s) => (
            <button key={s} type="button" onClick={() => send(s)} className="h-8 shrink-0 rounded-full bg-ink-100 px-3 text-[13px] font-medium text-ink-800 hover:bg-ink-150">
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="flex gap-2"
        >
          <label htmlFor="chat-input" className="sr-only">Message</label>
          <input id="chat-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" className="h-11 min-w-0 flex-1 rounded-md px-3.5 text-sm ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <button type="submit" aria-label="Send" disabled={!text.trim()} className="grid size-11 place-items-center rounded-md bg-ink-950 text-white disabled:opacity-40">
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </Overlay>
  )
}

function TicketForm({ presetOrder }) {
  const { user, orders, createTicket, now } = useAccount()
  const { toast } = useStore()
  const [v, setV] = useState({ category: presetOrder ? CATEGORIES[0] : '', orderId: presetOrder ?? '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  if (!user)
    return (
      <div className="rounded-lg bg-white p-5 ring-1 ring-inset ring-ink-150">
        <p className="text-sm text-ink-700">Sign in to raise a request about an order. We’ll keep the conversation in your account.</p>
        <Button to="/login?next=/help%23contact" className="mt-3">Sign in</Button>
      </div>
    )
  if (done)
    return (
      <div className="rounded-lg bg-white p-5 ring-1 ring-inset ring-ink-150">
        <p className="font-semibold text-ink-950">Request {done.id} received</p>
        <p className="mt-1 text-sm text-ink-600">A specialist will reply within 4 hours. You’ll see it under “Your requests”.</p>
        <Button variant="secondary" className="mt-3" onClick={() => setDone(null)}>Raise another request</Button>
      </div>
    )
  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    setErrors((s) => ({ ...s, [k]: '' }))
  }
  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!v.category) errs.category = 'Choose a topic'
    if (v.subject.trim().length < 5) errs.subject = 'Add a short summary'
    if (v.message.trim().length < 15) errs.message = 'Tell us a little more (at least 15 characters)'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 700))
    const t = createTicket({ ...v, subject: v.subject.trim(), message: v.message.trim() })
    setBusy(false)
    setDone(t)
    toast({ title: `Request ${t.id} created` })
  }
  return (
    <form noValidate onSubmit={submit} className="grid gap-4 rounded-lg bg-white p-5 ring-1 ring-inset ring-ink-150 sm:grid-cols-2">
      <SelectField label="Topic" value={v.category} onChange={set('category')} error={errors.category}>
        <option value="">Choose a topic</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </SelectField>
      <SelectField label="Order" optional value={v.orderId} onChange={set('orderId')}>
        <option value="">Not about an order</option>
        {orders.map((o) => (
          <option key={o.id} value={o.id}>
            {o.id} · {o.items[0].brand} · {formatDate(o.placedAt)}
          </option>
        ))}
      </SelectField>
      {v.orderId && (() => {
        const o = orders.find((x) => x.id === v.orderId)
        return o ? (
          <div className="flex items-center gap-3 rounded-md bg-ink-50 p-3 sm:col-span-2">
            <ItemThumb item={o.items[0]} className="size-11" />
            <div className="min-w-0 flex-1 text-[13px]">
              <p className="line-clamp-1 font-medium">{o.items[0].title}</p>
              <p className="text-ink-500">{headline(o, now)}</p>
            </div>
            <StatusBadge order={o} now={now} />
          </div>
        ) : null
      })()}
      <TextField className="sm:col-span-2" label="Subject" value={v.subject} onChange={set('subject')} error={errors.subject} maxLength={90} />
      <TextArea className="sm:col-span-2" label="How can we help?" value={v.message} onChange={set('message')} error={errors.message} maxLength={1000} />
      <div className="sm:col-span-2">
        <Button type="submit" disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />} Submit request</Button>
      </div>
    </form>
  )
}

function Tickets() {
  const { tickets } = useAccount()
  const [open, setOpen] = useState(null)
  if (!tickets.length) return null
  return (
    <section className="scroll-mt-40" id="requests">
      <h2 className="font-display text-xl font-bold tracking-tight">Your requests</h2>
      <ul className="mt-3 divide-y divide-ink-150 border-y border-ink-150">
        {tickets.map((t) => (
          <li key={t.id}>
            <button type="button" onClick={() => setOpen(open === t.id ? null : t.id)} aria-expanded={open === t.id} className="flex w-full items-center gap-3 py-4 text-left">
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink-950">{t.subject}</span>
                <span className="text-xs text-ink-500">{t.id} · {t.category} · {formatDate(t.createdAt)}</span>
              </span>
              <StatusPill tone={t.status === 'Resolved' ? 'save' : 'brand'}>{t.status}</StatusPill>
              <ChevronDown className={`size-4 text-ink-500 transition-transform ${open === t.id ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === t.id && (
                <motion.ol initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden pb-4">
                  {t.orderId && <li className="text-[13px] text-ink-500">About order <Link to={`/orders/${t.orderId}`} className="font-semibold text-ink-900 underline">{t.orderId}</Link></li>}
                  {t.messages.map((m, i) => (
                    <li key={i} className={`rounded-lg p-3 text-sm ${m.from === 'you' ? 'bg-ink-50' : 'bg-white ring-1 ring-inset ring-ink-150'}`}>
                      <p className="text-xs font-semibold text-ink-600">{m.from === 'you' ? 'You' : m.name} · {formatDateTime(m.at)}</p>
                      <p className="mt-1 text-ink-800">{m.text}</p>
                    </li>
                  ))}
                </motion.ol>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Help() {
  const { user, orders, now } = useAccount()
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  const [chat, setChat] = useState(false)
  const presetOrder = params.get('order')

  useEffect(() => {
    document.title = 'Help & support · BAZAAR'
  }, [])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return faqs
    return faqs.map((s) => ({ ...s, items: s.items.filter(([a, b]) => `${a} ${b}`.toLowerCase().includes(t)) })).filter((s) => s.items.length)
  }, [q])
  const recent = orders.slice(0, 3)

  return (
    <div className="container-page max-w-[880px] pt-8">
      <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">{user ? `How can we help, ${user.name.split(' ')[0]}?` : 'Help & support'}</h1>
      <p className="mt-1 text-ink-500">Answers to common questions, or reach us any time.</p>
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search help, like “refund” or “EMI”" aria-label="Search help articles" className="h-12 w-full rounded-lg pl-12 pr-4 text-[15px] ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      {!q && (
        <div className="mt-4 flex flex-wrap gap-2">
          {faqs.slice(0, 5).map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full bg-ink-100 px-3.5 py-1.5 text-[13px] font-medium text-ink-800 hover:bg-ink-150">{s.title}</a>
          ))}
        </div>
      )}

      {user && recent.length > 0 && !q && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold tracking-tight">Help with a recent order</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {recent.map((o) => (
              <li key={o.id}>
                <Link to={`/help?order=${o.id}#contact`} className="flex h-full flex-col gap-2 rounded-xl p-4 ring-1 ring-inset ring-ink-150 hover:shadow-lift">
                  <div className="flex items-center gap-3">
                    <ItemThumb item={o.items[0]} className="size-11" />
                    <StatusBadge order={o} now={now} />
                  </div>
                  <p className="line-clamp-1 text-[13px] text-ink-800">{o.items[0].title}</p>
                  <p className="text-xs text-ink-500">{headline(o, now)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 space-y-10">
        {filtered.length === 0 && <p className="text-sm text-ink-600">No articles match “{q}”. Try another word, or chat with us below.</p>}
        {filtered.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-40">
            <h2 className="font-display text-xl font-bold tracking-tight">{s.title}</h2>
            <div className="mt-3 divide-y divide-ink-150 border-y border-ink-150">
              {s.items.map(([question, a]) => (
                <details key={question} className="group py-1" open={!!q}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
                    {question}
                    <ChevronDown className="size-4 shrink-0 text-ink-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 text-sm leading-6 text-ink-600">{a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section id="contact" className="scroll-mt-40 rounded-xl bg-ink-50 p-5 ring-1 ring-inset ring-ink-150 sm:p-6">
          <h2 className="font-display text-xl font-bold tracking-tight">Still need help?</h2>
          <p className="mt-1 text-sm text-ink-600">Our team is available 24×7 in English, Hindi, Tamil and Telugu.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button variant="dark" size="lg" onClick={() => setChat(true)}>
              <MessageCircle className="size-4" /> Chat with us
            </Button>
            <Button as="a" href="tel:18001234567" variant="secondary" size="lg">
              <Phone className="size-4" /> 1800 123 4567
            </Button>
          </div>
          <h3 className="mt-8 text-sm font-semibold text-ink-950">Raise a request</h3>
          <div className="mt-3">
            <TicketForm key={presetOrder ?? 'none'} presetOrder={presetOrder} />
          </div>
        </section>

        {user && <Tickets />}
      </div>
      <ChatPanel open={chat} onClose={() => setChat(false)} />
    </div>
  )
}
