// Pure filtering helpers for the listing page. Filters live in the URL so results are shareable.

// Show a useful catalogue page before asking shoppers to load more.
export const PAGE_SIZE = 48

export const SORTS = [
  ['relevance', 'Relevance'],
  ['popular', 'Most popular'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['discount', 'Biggest discount'],
  ['rating', 'Top rated'],
  ['newest', 'Newest first'],
]

export const PRICE_BUCKETS = [
  [0, 999, 'Under ₹1,000'],
  [1000, 4999, '₹1,000 – ₹4,999'],
  [5000, 14999, '₹5,000 – ₹14,999'],
  [15000, 49999, '₹15,000 – ₹49,999'],
  [50000, Infinity, '₹50,000 and above'],
]

export const RATINGS = [4.5, 4, 3]
export const DISCOUNTS = [10, 25, 40, 50]

const AUDIENCES = new Set(['Men', 'Women', 'Kids'])

function productMatchesAudience(product, audience) {
  if (product.category !== 'fashion') return false
  if (product.subcategory === audience) return true
  const title = product.title.toLowerCase()
  if (audience === 'Men') return /\bmen(?:['’]s)?\b|\bmale\b/.test(title)
  if (audience === 'Women') return /\bwomen(?:['’]s)?\b|\blad(?:y|ies)\b/.test(title)
  return /\bkids?\b|\bchildren(?:'s|’s)?\b|\bboys?\b|\bgirls?\b/.test(title)
}

function matchesSubcategory(product, selected) {
  const audiences = selected.filter((value) => AUDIENCES.has(value))
  const types = selected.filter((value) => !AUDIENCES.has(value))
  const matchesAudience = !audiences.length || audiences.some((audience) => productMatchesAudience(product, audience))
  const matchesType = !types.length || types.some((type) => product.subcategory === type)
  return matchesAudience && matchesType
}

const list = (s) => (s ? s.split(',').filter(Boolean) : [])

export function readFilters(params) {
  return {
    cat: list(params.get('cat')),
    sub: list(params.get('sub')),
    brand: list(params.get('brand')),
    min: params.get('min') ? +params.get('min') : null,
    max: params.get('max') ? +params.get('max') : null,
    rating: params.get('rating') ? +params.get('rating') : null,
    disc: params.get('disc') ? +params.get('disc') : null,
    fast: params.get('fast') === '1',
    free: params.get('free') === '1',
    verified: params.get('verified') === '1',
    instock: params.get('instock') === '1',
  }
}

/** Applies every filter except the one named in `skip`, so each facet can show live counts. */
export function applyFilters(items, f, skip = null) {
  return items.filter((p) => {
    if (skip !== 'cat' && f.cat.length && !f.cat.includes(p.category)) return false
    if (skip !== 'sub' && f.sub.length && !matchesSubcategory(p, f.sub)) return false
    if (skip !== 'brand' && f.brand.length && !f.brand.includes(p.brand)) return false
    if (skip !== 'price') {
      if (f.min != null && p.price < f.min) return false
      if (f.max != null && p.price > f.max) return false
    }
    if (skip !== 'rating' && f.rating && p.rating < f.rating) return false
    if (skip !== 'disc' && f.disc && p.discount < f.disc) return false
    if (skip !== 'fast' && f.fast && !(p.delivery.days <= 1)) return false
    if (skip !== 'free' && f.free && !p.delivery.free) return false
    if (skip !== 'verified' && f.verified && !p.assured) return false
    if (skip !== 'instock' && f.instock && p.stock < 10) return false
    return true
  })
}

export const countBy = (items, fn) => items.reduce((m, p) => ((m[fn(p)] = (m[fn(p)] ?? 0) + 1), m), {})

export function activeCount(f) {
  return f.cat.length + f.sub.length + f.brand.length + (f.min != null || f.max != null ? 1 : 0) + (f.rating ? 1 : 0) + (f.disc ? 1 : 0) + f.fast + f.free + f.verified + f.instock
}

export const sorters = {
  relevance: null,
  popular: (a, b) => b.reviewCount - a.reviewCount,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  discount: (a, b) => b.discount - a.discount,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  newest: (a, b) => b.addedAt - a.addedAt,
}
