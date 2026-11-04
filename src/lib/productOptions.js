export function productSizeOptions(product) {
  if (Array.isArray(product?.sizes) && product.sizes.length) return product.sizes
  // Bazaar's local demo catalogue has no per-size inventory feed. Offer standard selectors and
  // persist the selection in cart/checkout; do not mark individual sizes as in or out of stock.
  if (product?.category === 'footwear') return ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  if (product?.category === 'fashion') return ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  return []
}

export function productColorName(color) {
  const names = { '#f8f7f4': 'White with navy accent', '#191a1d': 'Black' }
  return names[String(color ?? '').toLowerCase()] ?? 'Selected colour'
}
