const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })


export const formatPrice = (n) => inr.format(n)
export const formatCount = (n) => (n >= 100000 ? `${(n / 100000).toFixed(1).replace(/\.0$/, '')}L` : n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n))
export const plural = (n, one, many = one + 's') => `${n.toLocaleString('en-IN')} ${n === 1 ? one : many}`

export function deliveryLabel(delivery, now = new Date()) {
  if (delivery.slot) return delivery.slot
  if (delivery.days === 0) return 'Today'
  if (delivery.days === 1) return 'Tomorrow'
  const d = new Date(now)
  d.setDate(d.getDate() + delivery.days)
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}
