const EXCHANGE_CATEGORIES = new Set(['mobiles', 'appliances', 'laptops', 'tvs', 'electronics'])
const ACCESSORY_WORDS = /\b(case|cover|charger|cable|adapter|screen guard|tempered glass|earbuds|headphones|remote|ink|toner|battery pack)\b/i

export function isExchangeEligible(product) {
  if (!product || !EXCHANGE_CATEGORIES.has(product.category)) return false
  if (ACCESSORY_WORDS.test(`${product.title} ${product.subcategory ?? ''}`)) return false
  return true
}

export function estimateExchangeCredit(product, condition, age) {
  const multipliers = { excellent: 0.12, good: 0.08, fair: 0.04 }
  const ageFactors = { 'Under 1 year': 1, '1–2 years': 0.85, '2–4 years': 0.65, 'Over 4 years': 0.4 }
  const categoryFactor = product.category === 'mobiles' ? 1 : product.category === 'laptops' ? 0.9 : product.category === 'tvs' ? 0.75 : 0.65
  return Math.min(Math.round(product.price * (multipliers[condition] ?? 0) * (ageFactors[age] ?? 1) * categoryFactor / 100) * 100, Math.floor(product.price * 0.25))
}
