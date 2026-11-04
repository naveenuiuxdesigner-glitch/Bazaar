import { load, save } from '../lib/storage'

/*
  Deterministic review generator. Every product gets the same reviews on every load, with a star
  breakdown that matches its average rating, plus any reviews the shopper writes (stored locally).
*/

const rand = (seed) => {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hashStr = (s) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7)

const NAMES = ['Rohan Mehta', 'Ananya Iyer', 'Vikram Singh', 'Sneha Kulkarni', 'Arjun Nair', 'Priya Raghavan', 'Karthik Reddy', 'Neha Gupta', 'Aditya Joshi', 'Ishita Banerjee', 'Rahul Verma', 'Meera Pillai', 'Siddharth Rao', 'Kavya Menon', 'Harsh Agarwal', 'Pooja Desai', 'Nikhil Chauhan', 'Divya Krishnan', 'Aman Malhotra', 'Shreya Das', 'Varun Kapoor', 'Tanvi Shah', 'Manish Yadav', 'Ritika Sen']
const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Kochi', 'Lucknow', 'Indore', 'Chandigarh', 'Gurugram', 'Noida']

const ASPECTS = {
  mobiles: ['Camera', 'Battery life', 'Display', 'Performance'],
  electronics: ['Sound quality', 'Battery life', 'Comfort', 'Build quality'],
  laptops: ['Performance', 'Battery life', 'Display', 'Keyboard'],
  tvs: ['Picture quality', 'Sound', 'Smart features', 'Installation'],
  gaming: ['Performance', 'Build quality', 'Ergonomics', 'Value for money'],
  fashion: ['Fit', 'Fabric quality', 'Colour', 'Comfort'],
  footwear: ['Comfort', 'Fit', 'Durability', 'Grip'],
  beauty: ['Effectiveness', 'Fragrance', 'Texture', 'Value for money'],
  appliances: ['Performance', 'Noise level', 'Energy efficiency', 'Installation'],
  kitchen: ['Performance', 'Build quality', 'Ease of cleaning', 'Value for money'],
  grocery: ['Taste', 'Freshness', 'Packaging', 'Value for money'],
  books: ['Story', 'Print quality', 'Value for money', 'Packaging'],
}
export const aspectsFor = (category) => ASPECTS[category] ?? ['Quality', 'Value for money', 'Design', 'Durability']

const TEXT = {
  5: [
    ['Absolutely worth it', 'Been using the {sub} for a few weeks now and it has exceeded what I expected. {brand} has nailed the details. {aspect} in particular is excellent.'],
    ['Best purchase this year', 'Compared a lot of options before picking this. {aspect} is top notch and delivery was quicker than promised. Packaging was secure.'],
    ['Premium feel, great value', 'Genuine product from an authorised seller. The {aspect.lower} is the highlight for me. Would happily recommend to friends and family.'],
    ['Exactly as described', 'No surprises. Looks and works exactly like the listing says. Got it during the sale, which made it an even better deal.'],
    ['Superb', 'Quality is clearly a step above the cheaper alternatives. {aspect} is great and it feels like it will last.'],
  ],
  4: [
    ['Very good, minor nitpicks', 'Overall happy with the {sub}. {aspect} is very good. Took off one star because setup instructions could be clearer.'],
    ['Good product', 'Does what it promises. {aspect} is solid. Price could be a little lower, but the offers at checkout helped.'],
    ['Solid choice', 'Using it daily. No complaints so far. {aspect} could be slightly better but it is still good for the price.'],
  ],
  3: [
    ['Decent, not great', 'It is okay for the price. {aspect} is average. Expected a bit more from {brand}, but it gets the job done.'],
    ['Average experience', 'Product is fine but nothing special. Delivery was on time. {aspect} was weaker than I hoped.'],
  ],
  2: [['Not as expected', 'The {aspect.lower} was disappointing for me. Customer support was helpful though and offered a replacement.']],
  1: [['Received a damaged box', 'Outer box was damaged on arrival. Bazaar replaced it within three days, so the experience was saved, but the first impression was poor.']],
}

/** Star breakdown (percentages for 5..1) whose weighted mean is close to `rating`. */
export function breakdown(rating) {
  const t = Math.min(1, Math.max(0, (rating - 3) / 2)) // 3.0 → 0, 5.0 → 1
  const raw = [8 + 82 * t ** 1.3, 20 - 6 * t, 18 - 15 * t, 8 - 7 * t, 10 - 8.5 * t]
  const sum = raw.reduce((a, b) => a + b, 0)
  const pct = raw.map((x) => Math.round((x / sum) * 100))
  pct[0] += 100 - pct.reduce((a, b) => a + b, 0)
  return pct
}

const fill = (s, p, aspect) => s.replaceAll('{brand}', p.brand).replaceAll('{sub}', p.subcategory.toLowerCase().replace(/s$/, '')).replaceAll('{aspect}', aspect).replaceAll('{aspect.lower}', aspect.toLowerCase())

export function generatedReviews(p, count = 14) {
  const r = rand(hashStr(p.id))
  const pct = breakdown(p.rating)
  const aspects = aspectsFor(p.category)
  const out = []
  for (let i = 0; i < count; i++) {
    // pick star by the breakdown so the visible reviews mirror the distribution
    let x = r() * 100
    let star = 5
    for (let s = 0; s < 5; s++) {
      x -= pct[s]
      if (x <= 0) {
        star = 5 - s
        break
      }
    }
    const pool = TEXT[star]
    const [title, body] = pool[Math.floor(r() * pool.length)]
    const aspect = aspects[Math.floor(r() * aspects.length)]
    out.push({
      id: `${p.id}-r${i}`,
      name: NAMES[Math.floor(r() * NAMES.length)],
      city: CITIES[Math.floor(r() * CITIES.length)],
      rating: star,
      title,
      body: fill(body, p, aspect),
      at: Date.UTC(2026, 9, 1) - Math.floor(r() * 260) * 86400000,
      verified: r() > 0.12,
      helpful: Math.floor(r() ** 2 * 240),
      variant: ['fashion', 'footwear'].includes(p.category) ? `Size ${['S', 'M', 'L', 'UK 8', 'UK 9', 'UK 10'][Math.floor(r() * 6)]}` : null,
    })
  }
  return out
}

export function aspectScores(p) {
  const r = rand(hashStr(p.id + 'aspects'))
  return aspectsFor(p.category).map((name) => ({ name, score: Math.min(5, Math.max(3.2, p.rating + (r() - 0.55) * 0.7)) }))
}

/* ── Shopper-written reviews and helpful votes ──────────────────────────── */

export const userReviews = (pid) => load(`reviews:${pid}`, [])
export const saveUserReview = (pid, review) => save(`reviews:${pid}`, [review, ...userReviews(pid).filter((r) => r.userId !== review.userId)])
export const helpfulVotes = () => load('review-helpful', [])
export const toggleHelpful = (id) => {
  const v = helpfulVotes()
  const next = v.includes(id) ? v.filter((x) => x !== id) : [...v, id]
  save('review-helpful', next)
  return next
}
