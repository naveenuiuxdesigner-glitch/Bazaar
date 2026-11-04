import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Loader2, PenLine, Star, ThumbsUp, X } from 'lucide-react'
import { aspectScores, breakdown, generatedReviews, helpfulVotes, saveUserReview, toggleHelpful, userReviews } from '../../data/reviews'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { bucketOf } from '../../services/orders'
import { Button } from '../ui/Button'
import { TextArea, TextField } from '../form/Field'
import { formatDate } from '../../lib/dates'
import { formatCount } from '../../lib/format'

export function Stars({ value, size = 'size-4' }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="relative">
          <Star className={`${size} fill-ink-150 text-ink-150`} strokeWidth={0} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, value - n + 1)) * 100}%` }}>
            <Star className={`${size} fill-star text-star`} strokeWidth={0} />
          </span>
        </span>
      ))}
    </span>
  )
}

function StarPicker({ value, onChange, error }) {
  const [hover, setHover] = useState(0)
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']
  const shown = hover || value
  return (
    <fieldset>
      <legend className="mb-1.5 text-[13px] font-medium text-ink-800">Your rating</legend>
      <div className="flex items-center gap-3" onMouseLeave={() => setHover(0)}>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} onMouseEnter={() => setHover(n)} className="cursor-pointer">
              <input type="radio" name="rating" value={n} checked={value === n} onChange={() => onChange(n)} className="peer sr-only" />
              <Star className={`size-8 transition-transform peer-focus-visible:outline-2 peer-focus-visible:outline-ink-950 ${n <= shown ? 'fill-star text-star' : 'fill-ink-100 text-ink-300'} hover:scale-110`} strokeWidth={n <= shown ? 0 : 1.25} />
              <span className="sr-only">{n} star{n > 1 ? 's' : ''}</span>
            </label>
          ))}
        </div>
        <span className="text-sm font-medium text-ink-700">{labels[shown]}</span>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger-700" role="alert">{error}</p>}
    </fieldset>
  )
}

function ReviewForm({ product, onDone, onCancel }) {
  const { user, orders } = useAccount()
  const { toast } = useStore()
  const [v, setV] = useState({ rating: 0, title: '', body: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const bought = orders.some((o) => ['delivered', 'returns'].includes(bucketOf(o)) && o.items.some((i) => i.id === product.id))

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!v.rating) errs.rating = 'Choose a star rating'
    if (v.title.trim().length < 4) errs.title = 'Add a short headline'
    if (v.body.trim().length < 20) errs.body = 'Tell other shoppers a little more (at least 20 characters)'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 500))
    saveUserReview(product.id, { id: `${product.id}-u-${user.id}`, userId: user.id, name: user.name, city: '', rating: v.rating, title: v.title.trim(), body: v.body.trim(), at: Date.now(), verified: bought, helpful: 0, mine: true })
    setBusy(false)
    toast({ title: 'Thanks, your review is live' })
    onDone()
  }

  return (
    <motion.form initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-xl bg-ink-50 p-5 ring-1 ring-inset ring-ink-150">
      <div className="flex items-start justify-between">
        <h3 className="font-display text-lg font-bold">Write a review</h3>
        <button type="button" onClick={onCancel} aria-label="Close review form" className="-mr-2 -mt-1 grid size-9 place-items-center rounded-full hover:bg-ink-100">
          <X className="size-4" />
        </button>
      </div>
      <StarPicker value={v.rating} onChange={(rating) => setV((s) => ({ ...s, rating }))} error={errors.rating} />
      <TextField label="Headline" value={v.title} maxLength={80} onChange={(e) => setV((s) => ({ ...s, title: e.target.value }))} error={errors.title} placeholder="What stood out?" />
      <TextArea label="Your review" value={v.body} maxLength={1200} onChange={(e) => setV((s) => ({ ...s, body: e.target.value }))} error={errors.body} hint={`${v.body.length}/1200 · ${bought ? 'Marked as a verified purchase' : 'Not a verified purchase'}`} placeholder="How has it been to use? What would you tell a friend?" />
      <Button type="submit" disabled={busy}>
        {busy && <Loader2 className="size-4 animate-spin" />} Submit review
      </Button>
    </motion.form>
  )
}

export function Reviews({ product }) {
  const { user } = useAccount()
  const loc = useLocation()
  const [writing, setWriting] = useState(false)
  const [mine, setMine] = useState(() => userReviews(product.id))
  const [votes, setVotes] = useState(helpfulVotes)
  const [star, setStar] = useState(0)
  const [sort, setSort] = useState('helpful')
  const [limit, setLimit] = useState(5)

  const pct = breakdown(product.rating)
  const aspects = useMemo(() => aspectScores(product), [product])
  const all = useMemo(() => [...mine, ...generatedReviews(product)], [mine, product])
  const list = useMemo(() => {
    const l = all.filter((r) => !star || r.rating === star)
    const by = {
      helpful: (a, b) => (b.mine ? 1 : 0) - (a.mine ? 1 : 0) || b.helpful - a.helpful,
      newest: (a, b) => b.at - a.at,
      high: (a, b) => b.rating - a.rating || b.at - a.at,
      low: (a, b) => a.rating - b.rating || b.at - a.at,
    }[sort]
    return [...l].sort(by)
  }, [all, star, sort])
  const already = user && mine.some((r) => r.userId === user.id)

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-40">
      <h2 id="reviews-title" className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink-950 sm:text-[28px]">
        Ratings & reviews
      </h2>
      <div className="mt-6 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
        <div>
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl font-bold tracking-tight text-ink-950 num">{product.rating.toFixed(1)}</span>
            <div className="pb-1.5">
              <Stars value={product.rating} />
              <p className="mt-1 text-[13px] text-ink-500">{product.reviewCount.toLocaleString('en-IN')} ratings</p>
            </div>
          </div>
          <ul className="mt-5 space-y-1.5">
            {pct.map((p, i) => {
              const s = 5 - i
              return (
                <li key={s}>
                  <button type="button" onClick={() => setStar(star === s ? 0 : s)} aria-pressed={star === s} className={`group flex w-full items-center gap-3 rounded-md px-1.5 py-1 text-[13px] ${star === s ? 'bg-ink-100' : 'hover:bg-ink-50'}`}>
                    <span className="w-8 text-left font-medium text-ink-700 num">{s} ★</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                      <motion.span className={`block h-full rounded-full ${s >= 4 ? 'bg-save-600' : s === 3 ? 'bg-star' : 'bg-danger-600'}`} initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }} />
                    </span>
                    <span className="w-10 text-right text-ink-500 num">{formatCount(Math.round((product.reviewCount * p) / 100))}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-6 space-y-3 border-t border-ink-150 pt-5">
            {aspects.map((a) => (
              <div key={a.name} className="flex items-center gap-3 text-[13px]">
                <span className="w-32 shrink-0 text-ink-600">{a.name}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                  <span className="block h-full rounded-full bg-ink-800" style={{ width: `${(a.score / 5) * 100}%` }} />
                </span>
                <span className="w-7 text-right font-semibold text-ink-900 num">{a.score.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl p-5 ring-1 ring-inset ring-ink-150">
            <p className="text-sm font-semibold text-ink-950">Used this product?</p>
            <p className="mt-0.5 text-[13px] text-ink-500">Share your experience with other shoppers.</p>
            {user ? (
              <Button variant="secondary" className="mt-3 w-full" onClick={() => setWriting(true)} disabled={writing}>
                <PenLine className="size-4" /> {already ? 'Edit your review' : 'Write a review'}
              </Button>
            ) : (
              <Button to={`/login?next=${encodeURIComponent(loc.pathname + '#reviews')}`} variant="secondary" className="mt-3 w-full">
                Sign in to write a review
              </Button>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <AnimatePresence>
            {writing && (
              <ReviewForm
                product={product}
                onCancel={() => setWriting(false)}
                onDone={() => {
                  setMine(userReviews(product.id))
                  setWriting(false)
                  setStar(0)
                  setSort('helpful')
                }}
              />
            )}
          </AnimatePresence>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 first:mt-0">
            <p className="text-sm text-ink-600">
              {star ? `${list.length} reviews with ${star} stars` : `Showing ${Math.min(limit, list.length)} of ${list.length} reviews`}
              {star > 0 && (
                <button type="button" onClick={() => setStar(0)} className="ml-2 font-semibold text-ink-950 underline underline-offset-2">
                  Show all
                </button>
              )}
            </p>
            <label className="flex items-center gap-2 text-[13px] text-ink-600">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-md bg-white pl-2.5 pr-7 text-[13px] font-medium ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="helpful">Most helpful</option>
                <option value="newest">Newest</option>
                <option value="high">Highest rated</option>
                <option value="low">Lowest rated</option>
              </select>
            </label>
          </div>
          <ul className="mt-2 divide-y divide-ink-150">
            {list.slice(0, limit).map((r) => {
              const voted = votes.includes(r.id)
              return (
                <li key={r.id} className="py-5">
                  <div className="flex items-center gap-2.5">
                    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold text-white num ${r.rating >= 4 ? 'bg-save-700' : r.rating === 3 ? 'bg-[#b7791f]' : 'bg-danger-600'}`}>
                      {r.rating} <Star className="size-3 fill-white" strokeWidth={0} />
                    </span>
                    <h3 className="text-[15px] font-semibold text-ink-950">{r.title}</h3>
                    {r.mine && <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-semibold text-ink-700">Your review</span>}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-700">{r.body}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                    <span className="font-medium text-ink-700">{r.name}</span>
                    {r.city && <span>{r.city}</span>}
                    <span>{formatDate(r.at)}</span>
                    {r.variant && <span>{r.variant}</span>}
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 font-medium text-save-700">
                        <BadgeCheck className="size-3.5" /> Verified purchase
                      </span>
                    )}
                  </div>
                  {!r.mine && (
                    <button type="button" onClick={() => setVotes(toggleHelpful(r.id))} aria-pressed={voted} className={`mt-3 inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold ring-1 ring-inset transition-colors ${voted ? 'bg-ink-950 text-white ring-ink-950' : 'text-ink-700 ring-ink-200 hover:ring-ink-400'}`}>
                      <ThumbsUp className="size-3.5" /> Helpful · <span className="num">{r.helpful + (voted ? 1 : 0)}</span>
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
          {list.length > limit && (
            <Button variant="secondary" onClick={() => setLimit((l) => l + 5)}>
              Show more reviews
            </Button>
          )}
          {list.length === 0 && <p className="py-8 text-sm text-ink-500">No reviews with {star} stars yet.</p>}
          <p className="mt-6 text-xs text-ink-400">
            Reviews are from shoppers on Bazaar. <Link to="/help#security" className="underline">How we moderate reviews</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
