import { products } from './products'

/*
  Featured brand stores shown on the homepage.

  Every brand visual lives in public/brands/<id>.webp: a studio cut-out of one of the brand's own
  catalogue products on a transparent 1:1 canvas, with the same margin and soft shadow as the
  product photos. To change a brand's image, replace that file (or point `image` elsewhere);
  components never hardcode image URLs. `heroProductId` records which product the visual shows.
*/
const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const FEATURED = [
  { id: 'apple', name: 'Apple', category: 'Electronics', heroProductId: 'apple-macbook-air-13-m4-16-gb-256-gb-sky-blue' },
  { id: 'samsung', name: 'Samsung', category: 'Mobiles', heroProductId: 'samsung-galaxy-z-fold7-5g-256-gb-blue-shadow' },
  { id: 'sony', name: 'Sony', category: 'Audio', heroProductId: 'sony-wh-1000xm6-wireless-noise-cancelling-headphones' },
  { id: 'oneplus', name: 'OnePlus', category: 'Mobiles', heroProductId: 'oneplus-oneplus-nord-5-5g-256-gb-marble-sands' },
  { id: 'lg', name: 'LG', category: 'TVs & appliances', heroProductId: 'lg-oled-evo-c5-65-4k-smart-tv' },
  { id: 'lenovo', name: 'Lenovo', category: 'Laptops', heroProductId: 'lenovo-thinkpad-x1-carbon-gen-13-aura-edition' },
  { id: 'nike', name: 'Nike', category: 'Footwear', heroProductId: 'nike-dunk-low-retro-mens-shoes-panda' },
  { id: 'adidas', name: 'Adidas', category: 'Footwear', heroProductId: 'adidas-samba-og-shoes-cloud-white' },
  { id: 'hp', name: 'HP', category: 'Laptops', heroProductId: 'hp-elitebook-840-g11-core-ultra-5-16-gb' },
  { id: 'dell', name: 'Dell', category: 'Laptops', heroProductId: 'dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb' },
  { id: 'puma', name: 'Puma', category: 'Footwear', heroProductId: 'puma-suede-classic-xxi-sneakers-peacoat' },
  { id: 'jbl', name: 'JBL', category: 'Audio', heroProductId: 'jbl-charge-6-portable-bluetooth-speaker' },
]

export const featuredBrands = FEATURED.map((b) => {
  const items = products.filter((p) => p.brand === b.name)
  return {
    ...b,
    productCount: items.length,
    bestDiscount: Math.max(0, ...items.map((p) => p.discount)),
    image: asset(`brands/${b.id}.webp`),
    to: `/brand/${encodeURIComponent(b.name)}`,
  }
})
