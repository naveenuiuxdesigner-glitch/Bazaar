import { productById } from './products'
import { photo } from './photos'

// An art item with `product` shows that product's studio photo when it has one, and its vector render otherwise.
const withPhotos = (items) => items.map((p) => ({ ...p, art: p.art.map((a) => ({ ...a, image: a.product ? productById[a.product]?.image ?? null : null })) }))
// A banner with a lifestyle photo (public/photos/<prefix>-<id>.webp) shows that instead of the product art.
const withLifestyle = (prefix, items) => items.map((p) => ({ ...p, photo: photo(`${prefix}-${p.id}`) }))

// Home hero slides. Art is composed from catalogue products so every banner links to real items.
export const heroSlides = withLifestyle('hero', withPhotos([
  {
    id: 's26',
    eyebrow: 'New launch · Samsung',
    title: 'Galaxy S26 Ultra',
    body: 'A 200 MP camera, built-in S Pen and Galaxy AI. Get ₹10,000 off with HDFC Bank cards.',
    price: 'From ₹1,39,999',
    cta: 'Shop Galaxy S26',
    to: '/p/samsung-galaxy-s26-ultra-5g-512-gb-titanium-black',
    bg: '#16191F',
    fg: 'light',
    accent: '#9FB4D6',
    art: [{ kind: 'phone', color: '#3C4E66', brand: 'Samsung', product: 'samsung-galaxy-s26-ultra-5g-512-gb-titanium-black', x: 4, y: 0, s: 1.5 }],
  },
  {
    id: 'sneakers',
    eyebrow: 'The Sneaker Edit',
    title: 'Up to 40% off the season’s best pairs',
    body: 'Nike, Adidas, Puma, ASICS and New Balance. Free 15-day returns and size exchange.',
    price: '',
    cta: 'Shop footwear',
    to: '/c/footwear',
    bg: '#E8DED0',
    fg: 'dark',
    accent: '#B5321A',
    art: [
      { kind: 'shoe', color: '#E4502F', product: 'nike-pegasus-42-mens-road-running-shoes', x: 0, y: -4, s: 1.2, r: -8 },
      { kind: 'sneaker', color: '#253049', product: 'adidas-samba-og-shoes-cloud-white', x: 30, y: 30, s: 1.1, r: 0 },
    ],
  },
  {
    id: 'ps5',
    eyebrow: 'Gaming week',
    title: 'PlayStation 5 Pro',
    body: 'Sharper 4K, PSSR upscaling and Wi-Fi 7. No-cost EMI from ₹6,249 a month.',
    price: '₹74,990',
    cta: 'Buy PS5 Pro',
    to: '/p/sony-playstation-5-pro-console-2-tb',
    bg: '#0F1A3A',
    fg: 'light',
    accent: '#7FA2FF',
    art: [
      { kind: 'console', color: '#ECEBE8', product: 'sony-playstation-5-pro-console-2-tb', x: 34, y: -2, s: 1.25, r: 0 },
      { kind: 'controller', color: '#ECEBE8', product: 'sony-dualsense-wireless-controller-cosmic-red', x: -2, y: 38, s: 0.9, r: -12 },
    ],
  },
  {
    id: 'kitchen',
    eyebrow: 'Home & kitchen',
    title: 'Cook more, clean less',
    body: 'Air fryers, mixers and stand mixers from Philips, KitchenAid and Instant Pot.',
    price: 'Starting ₹1,199',
    cta: 'Explore kitchen',
    to: '/c/kitchen',
    bg: '#DCE5DE',
    fg: 'dark',
    accent: '#0F7B4A',
    art: [
      { kind: 'standmixer', color: '#B4242C', product: 'kitchenaid-artisan-stand-mixer-4-8-l-empire-red', x: 28, y: -2, s: 1.22, r: 0 },
      { kind: 'airfryer', color: '#1F2022', product: 'philips-airfryer-3000-series-xl-6-2-l', x: -2, y: 32, s: 0.9, r: 0 },
    ],
  },
  {
    id: 'macbook',
    eyebrow: 'Back to campus',
    title: 'MacBook Air with M4',
    body: 'Up to 18 hours of battery in a 1.24 kg design. Extra ₹5,000 off for students.',
    price: 'From ₹99,900',
    cta: 'Shop laptops',
    to: '/c/laptops',
    bg: '#D7E2EA',
    fg: 'dark',
    accent: '#2B4E73',
    art: [{ kind: 'laptop', color: '#B6CCD9', product: 'apple-macbook-air-13-m4-16-gb-256-gb-sky-blue', x: 0, y: 2, s: 1.55, r: 0 }],
  },
]))

export const sidePromos = withLifestyle('side', [
  {
    id: 'plus',
    title: 'Bazaar Plus',
    body: 'Free same-day delivery and early access to sales.',
    cta: 'Join for ₹149/mo',
    to: '/plus',
    bg: '#3461FF',
    // identity gradient (brand blue into violet); the photo fades into its mid tone
    gradient: true,
    tone: '#4F58FF',
    fg: 'light',
    art: { kind: 'parcel', color: '#C98A4E' },
  },
  {
    id: 'emi',
    title: 'No-cost EMI',
    body: 'On 12,000+ products with 14 bank cards.',
    cta: 'See EMI deals',
    to: '/deals',
    bg: '#EEF1F6',
    fg: 'dark',
    art: { kind: 'laptop', color: '#2B2C30' },
  },
])

export const editorialPromos = withLifestyle('promo', withPhotos([
  {
    id: 'fall',
    eyebrow: 'Fashion',
    title: 'The autumn wardrobe, from ₹699',
    body: 'Levi’s, H&M, Zara, Fabindia and more.',
    to: '/c/fashion',
    theme: 'violet', // purple + soft lavender
    bg: '#EEE8FF',
    art: [
      { kind: 'jacket', color: '#4D6A8F', product: 'levis-mens-classic-trucker-denim-jacket', x: 36, y: 0, s: 0.95 },
      { kind: 'hoodie', color: '#3D4A3C', product: 'nike-sportswear-club-mens-fleece-hoodie', x: 0, y: 14, s: 0.9 },
    ],
  },
  {
    id: 'skin',
    eyebrow: 'Beauty',
    title: 'Skincare under ₹999',
    body: 'Minimalist, The Ordinary, CeraVe.',
    to: '/c/beauty',
    theme: 'deal', // coral + cream
    bg: '#FFF0E6',
    art: [
      { kind: 'serum', color: '#E9B45A', product: 'the-ordinary-niacinamide-10-zinc-1-serum-30-ml', x: 8, y: 0, s: 0.95 },
      { kind: 'jar', color: '#F1F3F5', product: 'cerave-moisturising-cream-for-dry-skin-454-g', x: 34, y: 18, s: 0.9 },
    ],
  },
  {
    id: 'grocery',
    eyebrow: 'Grocery',
    title: 'Daily essentials, delivered today',
    body: 'Order by 2 PM for evening delivery.',
    to: '/c/grocery',
    theme: 'save', // green + warm white
    bg: '#EDF5EA',
    art: [
      { kind: 'teabox', color: '#B8262E', product: 'tata-tea-gold-premium-assam-tea-1-kg', x: 2, y: 4, s: 0.95 },
      { kind: 'coffee', color: '#3A1E14', product: 'nescafe-classic-instant-coffee-jar-200-g', x: 34, y: 16, s: 0.9 },
    ],
  },
]))

// Spotlight banners: full-width category moments with their own colour pairing (never more than one accent
// family per banner). Art is product cut-outs from the catalogue so each banner links to real items.
export const spotlightBanners = withPhotos([
  {
    id: 'gaming',
    eyebrow: 'Gaming week',
    title: 'Play it in 4K at 120 fps',
    body: 'PS5 Pro, Xbox Series X and Switch 2, with no-cost EMI and free next-day delivery.',
    cta: 'Shop gaming',
    to: '/c/gaming',
    // dark navy + cyan
    bg: 'linear-gradient(135deg, #060A18 0%, #0C1733 55%, #0A2A47 100%)',
    glow: '#3FD8FF',
    accent: '#7FE6FF',
    art: [
      { kind: 'console', color: '#ECEBE8', product: 'sony-playstation-5-pro-console-2-tb', x: 30, y: 2, s: 1.0 },
      { kind: 'controller', color: '#B4242C', product: 'sony-dualsense-wireless-controller-cosmic-red', x: 2, y: 34, s: 0.62, r: -14 },
    ],
  },
  {
    id: 'audio',
    eyebrow: 'Electronics',
    title: 'Sound that shuts the world out',
    body: 'Noise-cancelling headphones and earbuds from Sony, Bose and Apple.',
    cta: 'Shop audio',
    to: '/c/electronics',
    // deep blue + electric blue
    bg: 'linear-gradient(135deg, #0D1A66 0%, #1A3BC0 60%, #3461FF 100%)',
    glow: '#8EAAFF',
    accent: '#BCCDFF',
    art: [
      { kind: 'headphones', color: '#2E2F33', product: 'sony-wh-1000xm6-wireless-noise-cancelling-headphones', x: 26, y: 0, s: 1.0 },
      { kind: 'earbuds', color: '#F4F3EF', product: 'apple-airpods-pro-3-with-magsafe-case', x: 0, y: 40, s: 0.55, r: 8 },
    ],
  },
])

// Licensed category photography adds an editorial finish to the campaign panels.
spotlightBanners[0].photo = photo('cat-gaming')
spotlightBanners[1].photo = photo('cat-electronics')
