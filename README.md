# BAZAAR

A multi-brand marketplace front end. This is Phase 1: the design foundation and the homepage, plus working routes for everything the homepage links to.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Stack: React 19, Vite, Tailwind CSS v4, React Router 7, Framer Motion and Lucide. Data comes from mock services with simulated latency, and cart, wishlist, recently viewed, location and coupon state are saved to localStorage.

## Visual direction

The aim is a premium but mass-market feel. The foundation is a cool navy and slate neutral. Each colour accent has one job, so colour creates hierarchy instead of decoration.

| Token | Value | Use |
| --- | --- | --- |
| `ink-50 … ink-950` | cool slate → deep navy, #f7f8fb → #0b1220 | Surfaces, text, borders, dark UI (cart button, footer) |
| `brand-500 / 600 / 700` Electric Blue | #3461ff / #2149e8 / #1a3bc0 | Primary actions, links, focus rings, active states |
| `violet-500 / 600` | #7c4dff / #6a35f0 | Membership (Bazaar Plus), personal and curated sections |
| `.bg-brand-grad` | blue → violet | Identity only: logo mark, Bazaar Plus |
| `deal-500 / 600 / 700` Coral | #ff6a3d / #e9511f / #c13f15 | Deals, discount badges, countdown, stock urgency, wishlist heart |
| `save-600 / 700` | #138a52 / #0f7b4a | Savings and free delivery only |
| `danger-600 / 700` | #d92d2d / #b42020 | Errors and destructive actions only |
| `star` | #f5a524 | Ratings only |

Banner pairings never mix accent families: gaming is dark navy with cyan, electronics is deep blue with electric blue, fashion is violet with lavender, beauty is coral with cream, and grocery is green with warm white.

Typography:
- Display: Plus Jakarta Sans (variable, via @fontsource), extra-bold with tight tracking, for headlines.
- UI and body: Inter, with tabular numerals for prices.

Shape, depth and motion:
- Radii run from 4 to 20px; cards and banners use 16px (`rounded-2xl`). Shadows (lift, pop, card, header, glow, drawer) are tinted with navy. There is one easing curve, `cubic-bezier(.2,.8,.2,1)`, and drawers settle on a spring.
- `src/components/ui/Motion.jsx` holds the scroll motion. `Reveal` eases a section in the first time it enters the viewport, `Stagger`/`StaggerItem` reveal lists in order, and `Drift` moves promo imagery a few pixels for depth. Each runs once, uses only IntersectionObserver and transforms, and is switched off for reduced-motion users.
- Every animation reports a state: a card lifts on hover, the add-to-cart button turns green with a ring pulse, the header bag bumps when the count changes, the wishlist heart bursts, and active tabs and nav links use a sliding indicator. The hero image push-in is tied to slide progress, so it pauses with the slideshow.
- The header compacts, turns translucent and blurs once you scroll. The mega menu shows subcategories, featured brands and popular products, and crossfades between categories.

## Product imagery

Every product image sits on one studio backdrop (`--color-studio`, #f4f3ef), whether it is a photo or a vector render, so the catalogue reads as a single shoot.

127 products show a real photo; the rest use the vector "studio shot" drawn by `src/components/art/ProductArt.jsx` (about 70 product kinds with brand-aware details). A photo that fails to load falls back to the vector render too. A cluttered or cropped photo was judged worse than the vector render, so those products deliberately use vector art.

Photos are free-licensed: Wikimedia Commons (Creative Commons or public domain) and rawpixel (CC0). Each source had its background removed with BiRefNet and was composed onto a transparent 800px square with the same margin (product fits 78% of the frame), centring and soft shadow. They live in `public/products/<product-id>.webp` and are registered in `src/data/productImages.js` with title, author, licence and source link. The product page prints that credit under the image with "background removed", as the licences require. Many are the closest model with a free photo, so the credit line also says the image is representative. A few are CC BY-NC, which suits a portfolio but not commercial use.

Homepage lifestyle photos (hero banners, side promos, editorial promos and the 20 category tiles) live in `public/photos/<slot>.webp` and are registered in `src/data/photoCredits.js`. They are high-resolution Wikimedia Commons photos (CC0, CC BY or CC BY-SA), resized to 1800px for banners and cropped to 480px squares for tiles. Each entry stores a `tone` sampled from the photo's left edge, which the hero slide uses as its background so the photo fades into it. Credits are listed on `/credits`, which the footer links to. A slot without a photo falls back to the vector art.

Brand visuals for the homepage "Featured brands" section live in `public/brands/<brand-id>.webp` (same studio treatment, 84% fill) and are registered in `src/data/brands.js`, which also holds the brand name, category and hero product. Product counts and best discount are derived from the catalogue. To change a brand's image, replace its file; no component hardcodes an image URL. Hero banners and editorial promos reference products by id in `src/data/banners.js` and show that product's photo when it has one.

## Structure

```
src/
  data/        categories (20), products (197 across 129 brands), sellers, banners, locations
  services/    catalog.js: mock async API, search suggestions, recommendations
  context/     StoreContext: cart, wishlist, recent, location, coupons, toasts
  components/
    layout/    Header (fixed, collapsing), SearchBar, LocationPicker, MegaMenu, Footer, MobileTabBar
    home/      HeroCarousel, CategoryShortcuts, DealsOfTheDay, EditorialPromos, TopPicks,
               SpotlightBanners, FeaturedBrands, PersonalRails, TrustBar
    product/   ProductCard, QuickView, ProductRail, WishlistButton, AddToCartButton
    cart/      CartDrawer
    overlay/   Overlay (modal, drawers, focus trap), Toaster
    ui/        Button, Rating, Price, Skeleton, SectionHeader, Motion (Reveal, Stagger, Drift), states
  pages/       Home, Listing, Product, Cart, Wishlist, Categories, Account, Orders,
               Notifications, Help, NotFound
```

## Notes for later phases

- **Header:** the header is `position: fixed` with a measured spacer. A sticky header whose category row collapses on scroll fought the browser's scroll anchoring and jittered.
- **Listing and product pages:** these are functional but basic. Filters, PDP gallery depth and checkout come in later phases.
- **Bundle size:** the main bundle is about 665 KB. Route-level code splitting is planned for the performance phase.
