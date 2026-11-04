import { products, productById } from '../data/products'
import { categories, categoryBySlug } from '../data/categories'

// Mock network latency so loading states are real and visible.
const wait = (ms = 450) => new Promise((r) => setTimeout(r, ms + Math.random() * 250))

const byScore = (a, b) => b.rating * Math.log10(b.reviewCount + 10) - a.rating * Math.log10(a.reviewCount + 10)

export const catalog = {
  async getProduct(id) {
    await wait(250)
    return productById[id] ?? null
  },

  async deals(limit = 12) {
    await wait()
    // best deal per category first, interleaved so the rail spans the whole marketplace
    const pool = products.filter((p) => p.discount >= 12 && p.rating >= 4.2).sort((a, b) => b.discount * Math.log10(b.price) - a.discount * Math.log10(a.price))
    const order = ['mobiles', 'electronics', 'footwear', 'laptops', 'tvs', 'kitchen', 'fashion', 'gaming', 'appliances', 'beauty', 'furniture', 'home', 'travel', 'sports', 'books', 'toys', 'grocery']
    const out = []
    for (let round = 0; out.length < limit && round < 3; round++) {
      for (const cat of order) {
        const pick = pool.filter((p) => p.category === cat)[round]
        if (pick && out.length < limit) out.push(pick)
      }
    }
    return out
  },

  async byCategories(slugs, perCategory = 2) {
    await wait()
    return slugs.flatMap((s) => products.filter((p) => p.category === s).sort(byScore).slice(0, perCategory))
  },

  async list({ category, q, brand, sort = 'relevance' } = {}) {
    await wait()
    let list = products
    if (category) list = list.filter((p) => p.category === category)
    if (brand) list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    if (q) list = searchLocal(q)
    const sorters = {
      relevance: byScore,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      discount: (a, b) => b.discount - a.discount,
      rating: (a, b) => b.rating - a.rating,
      newest: (a, b) => b.addedAt - a.addedAt,
    }
    // search results keep their match order unless the shopper picks a sort
    if (q && sort === 'relevance') return list
    return [...list].sort(sorters[sort] ?? byScore)
  },

  /** Recommendations seeded by categories the shopper has shown interest in. */
  async recommended(seedIds = [], limit = 10) {
    await wait()
    const seedCats = [...new Set(seedIds.map((id) => productById[id]?.category).filter(Boolean))]
    const pool = seedCats.length ? products.filter((p) => seedCats.includes(p.category) && !seedIds.includes(p.id)) : products
    const ranked = [...pool].sort(byScore)
    // keep it multi-brand: at most two items per brand
    const perBrand = {}
    const out = []
    for (const p of ranked) {
      perBrand[p.brand] = (perBrand[p.brand] ?? 0) + 1
      if (perBrand[p.brand] <= 2) out.push(p)
      if (out.length === limit) break
    }
    return out
  },

  categories,
  categoryBySlug,
}

/* ── Search ─────────────────────────────────────────────────────────────── */

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function searchLocal(q) {
  const terms = norm(q).split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return products
    .map((p) => {
      const hay = norm(`${p.brand} ${p.title} ${p.categoryName} ${p.subcategory} ${p.description ?? ''} ${(p.tags ?? []).join(' ')} ${Object.entries(p.specs ?? {}).flat().join(' ')}`)
      let score = 0
      for (const t of terms) {
        if (!hay.includes(t)) return null
        if (norm(p.brand).startsWith(t)) score += 4
        if (norm(p.title).includes(t)) score += 2
        if (norm(p.subcategory).includes(t)) score += 1
      }
      return { p, score: score + p.rating / 5 }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)
}

export function suggest(q) {
  const query = norm(q.trim())
  if (!query) return { queries: [], products: [], categories: [], brands: [] }
  const matches = searchLocal(q)
  const cats = categories.filter((c) => norm(c.name).includes(query) || c.subs.some((s) => norm(s).includes(query))).slice(0, 3)
  const brandNames = [...new Set(products.map((p) => p.brand))].filter((b) => norm(b).startsWith(query)).slice(0, 3)
  const queries = [...new Set(matches.slice(0, 12).map((p) => `${p.brand} ${p.subcategory}`.toLowerCase()))].slice(0, 4)
  return { queries, products: matches.slice(0, 4), categories: cats, brands: brandNames }
}

export const trendingSearches = ['iPhone 17 Pro', 'Running shoes', 'OLED TV', 'Air fryer', 'PS5', 'Noise cancelling headphones', 'Atomic Habits', 'Office chair']
