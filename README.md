# Bazaar

Bazaar is a responsive, multi-brand Indian marketplace practice application built with React. It includes a 700-product local catalogue and shopper journeys from discovery through simulated checkout, order tracking, returns, and account management.

> **Practice project:** the catalogue, account, checkout, payment, delivery, order tracking, and exchange quote are demo implementations. There is no production API, payment gateway, inventory service, fulfilment network, or live trade-in provider. Payment screens never move real money.

## Get started

Requirements: Node.js 20.19+ or 22.12+ and npm. Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Other useful commands:

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # Oxlint static checks
```

To use hash-based routes for static hosting, set `VITE_HASH_ROUTER=true` in the environment before building. The default router uses normal browser paths.

### Demo account

The sign-in screen offers a one-click demo account:

| Field | Demo value |
| --- | --- |
| Email | `aarav.sharma@example.com` |
| Password | `Bazaar@2026` |

The demo account is seeded in the browser with sample addresses, saved payment methods, Bazaar Plus membership, and a mixed order history. Signing up creates another browser-local demo account.

## Shopper experience

### Discover and browse

- Homepage with campaign hero slides, category shortcuts, daily deals, editorial promotions, featured brands, personalised product rails, and trust information.
- Category and brand storefronts, deals, search results, and a complete category index.
- Search suggestions include matching products, brands, categories, and suggested queries.
- Product listings support category/type, brand, price bucket or custom price, rating, discount, delivery, seller verification, and stock filters; sorting includes relevance, price, discount, rating, and newest.
- Listings progressively reveal more results with the **Show more** control.
- Product cards offer quick view, wishlist, compare selection, ratings, offer prices, and delivery details.

### Product details

Product pages show product information and specifications, price/MRP and discount, delivery and returns, seller, bank/UPI/EMI offers, share, wishlist, comparison, quantity, and related recommendations. Fashion and footwear expose standard size choices; products with verified colour galleries can switch to those colour-specific images.

The gallery UI supports a primary image, thumbnails, arrow/keyboard navigation, zoom, and mobile interaction when a product has multiple real image assets. **Gallery controls do not create alternate views:** as of the latest image audit, only 1 of 700 products has multiple mapped images. Image coverage is incomplete; see [Product imagery](#product-imagery).

The product page has a disclosure showing today's listed offer and MRP as the lowest/highest listed prices. It is not historical price tracking.

### Compare, wishlist, and recently viewed

- Compare up to four selected products in a side-by-side comparison view.
- Save products to a persistent wishlist and add them to cart later.
- Recently viewed products are kept in browser storage and can be cleared.

### Cart, checkout, and payment

1. Add a product to the cart, selecting any required size or colour first.
2. Change quantity, remove items, save eligible items for later, and apply a coupon.
3. Sign in, select or enter a delivery address, choose a delivery option, and review the price breakdown.
4. Select UPI, card, net banking, EMI, or cash on delivery. The checkout validates entries and simulates payment completion.
5. Place the demo order and view its confirmation, invoice, order history, and tracking timeline.

Payment offers and EMI calculations are simulated. COD has a configured order limit. The payment modal explicitly identifies payments as simulated.

### Device exchange estimate

On supported mobile, laptop, TV, appliance, and eligible electronics product pages, a shopper can opt to exchange a working old device. The form collects its brand, model, age, and condition; a demo estimate appears in cart and checkout totals and is saved with the order. The estimate uses local illustrative rules, is not a real trade-in valuation, and requires no external service. No pickup or inspection is actually scheduled.

### Orders, returns, and account

- Order tracking advances through a simulated timeline on an accelerated clock.
- Pre-shipment cancellation, return/replacement/refund requests, and invoice printing are available in the demo order flow.
- Account pages cover profile, addresses, saved payments, and security settings.
- Help includes FAQs and a scripted support chat; notifications and Bazaar Plus pages are also included.

## Catalogue

The catalogue combines 197 original product records with 503 deterministic additions for **700 products**. The additions live in `src/data/catalogExpansion.js` and are checked against expected counts when loaded. Current category counts:

| Category | Products | Category | Products |
| --- | ---: | --- | ---: |
| Mobiles | 64 | Electronics | 67 |
| Laptops | 56 | TVs | 44 |
| Gaming | 52 | Fashion | 69 |
| Footwear | 57 | Beauty | 58 |
| Home | 42 | Furniture | 7 |
| Kitchen | 45 | Appliances | 51 |
| Grocery | 46 | Sports | 7 |
| Books | 8 | Toys | 6 |
| Baby | 5 | Automotive | 5 |
| Travel | 6 | Pet supplies | 5 |
| **Total** | **700** | | |

Each built product record has a stable slug ID and generated SKU, category/subcategory, brand, title, seller, price/MRP/discount, rating/review count, stock, specifications, description, highlights, tags, delivery and return policy, offers, size/colour options, and image/gallery metadata. Ratings, stock, and some catalogue additions are seeded demo data rather than a live seller feed.

### Adding or changing products

- Edit the base product rows and normalisation in `src/data/products.js`.
- Add expansion families in `src/data/catalogExpansion.js`; keep the asserted category totals and 503-row expansion total in sync.
- Add or update a product photo record keyed by the generated product ID in `src/data/productImages.js`, and place the corresponding file in `public/products/`.
- Only add genuine product-specific alternate views or colour sets to the gallery metadata. Do not copy, mirror, or relabel a single image as multiple angles.
- `src/lib/productOptions.js` provides the current standard fashion/footwear size selectors. The demo does not track stock per size.

## Product imagery

Product and campaign image records are local files, not real-time feeds. The current matcher checks source titles against the product's model, colour, identity, and accessory terms; photos that fail the match are not displayed as that product's photo. An unavailable-image state is used instead of substituting a generic illustration for a product listing.

Latest audit (`artifacts/product-image-audit.json`):

| Audit result | Count |
| --- | ---: |
| Products | 700 |
| Products with a valid mapped primary image | 505 |
| Products without an image asset | 99 |
| Mapped assets rejected by product-title matching | 96 |
| Products with multiple mapped images | 1 |
| Duplicate image hashes among valid mapped images | 0 |

Image assets and attribution metadata are in `public/products/` and `src/data/productImages.js`. Sourced photos include Amazon India and Flipkart listings, plus some Wikimedia Commons and other credited assets. These are currently static local snapshots, not live retailer connections. Availability of a primary image does not imply alternate front/side/back/detail views; colour-specific photo sets are only used where their assets are explicitly supplied. The gallery structure supports multiple images, but comprehensive three-angle photography is still outstanding.

Homepage and category lifestyle photo attribution is recorded in `src/data/photoCredits.js` and shown on `/credits`. Brand visuals are described in `src/data/brands.js` and stored under `public/brands/`.

## Application routes

| Path | Screen |
| --- | --- |
| `/` | Homepage |
| `/categories` | Category directory |
| `/c/:slug` | Category listing |
| `/brand/:brand` | Brand listing |
| `/search` | Search listing |
| `/deals` | Today's deals |
| `/p/:id` | Product detail |
| `/compare` | Compare products |
| `/wishlist` | Wishlist |
| `/cart` | Cart |
| `/recently-viewed` | Recently viewed |
| `/checkout` | Sign-in protected checkout |
| `/order-placed/:id` | Order confirmation |
| `/orders`, `/orders/:id` | Order history and details |
| `/orders/:id/return` | Return/replacement request |
| `/orders/:id/invoice` | Printable invoice |
| `/account/*` | Profile, addresses, payments, security |
| `/login`, `/signup`, `/forgot-password` | Demo account access |
| `/notifications`, `/help`, `/plus`, `/credits` | Supporting pages |

## Visual and interaction design

- **Palette:** cool slate/deep navy surfaces, electric blue for primary actions, violet for Bazaar Plus, coral for deals and urgency, green for savings and free delivery, and amber for ratings.
- **Typography:** Plus Jakarta Sans for display headings; Inter for interface and body text, with tabular numerals for prices.
- **Components:** shared buttons, fields, cards, product art/photo handling, banners, price and rating UI, overlays, drawers, toast notifications, and skeleton/loading states.
- **Responsive flow:** wide storefront navigation and filter sidebar on desktop; compact navigation, filter/sort sheets, and touch-friendly product interactions on mobile.
- **Motion:** Framer Motion section/card transitions, drawers, carousels, and interaction feedback. Reduced-motion preferences are supported by the shared motion components.

## Architecture

```text
src/
  App.jsx                 Route table and lazy-loaded page boundaries
  components/              Shared layout, home, listing, product, cart, checkout and UI pieces
  context/                 StoreContext and AccountContext state providers
  data/                    Product catalogue, categories, sellers, promotions, images, payment rules
  hooks/                   Async and interface hooks
  lib/                     Formatting, storage, dates, validation, options and exchange estimate
  pages/                   Storefront, account, checkout, order and support pages
  services/                Local mock catalogue, account, and order services
public/
  products/                Product photo assets
  photos/                  Lifestyle and campaign assets
  brands/                  Featured brand assets
scripts/                    Image-source and image-audit utilities
```

`src/services/catalog.js` wraps the in-memory catalogue with simulated latency, local search, sorting, deals, and recommendations. `src/services/account.js` and `src/services/orders.js` provide browser-only demo account and order behavior. `src/context/StoreContext.jsx` handles cart, wishlist, compare, location, coupons, recently viewed, and saved-for-later state. `src/context/AccountContext.jsx` handles the current user, addresses, saved payments, and orders.

Cart and browsing preferences use `localStorage` with the `bazaar:` prefix. Account and order collections use per-user `localStorage` keys. Clearing browser site data resets the demo state.

### Stack

- React 19
- Vite 8
- Tailwind CSS 4 with `@tailwindcss/vite`
- React Router 7
- Framer Motion
- Lucide React
- Oxlint

## Important limitations

- This is a front-end practice project with mock/local services; it is not ready to accept customers or real payments.
- Product, stock, price, rating, review, seller, delivery, return, and exchange information is demo data.
- Product imagery is incomplete: 195 products currently have no usable matched photo, and only one product has a multi-image gallery. The three-angle requirement is not met across the catalogue.
- Search, filtering, ordering, recommendations, checkout, and payment are local simulations; there is no API/database or external payment integration.
- Exchange amounts are examples only. The application does not contact a trade-in partner or book an inspection/pickup.

## Useful files

- `src/data/products.js` — base catalogue, product builder, image matching rules
- `src/data/catalogExpansion.js` — 503 expanded catalogue records
- `src/data/productImages.js` — product image map and source/credit metadata
- `src/data/banners.js` — campaign and homepage product references
- `src/components/listing/filters.js` — filter and sort logic
- `src/pages/Product.jsx` — product detail, gallery, variants, price range, and exchange form
- `src/pages/Checkout.jsx` — delivery, payment, offer, and order placement flow
- `src/lib/productExchange.js` — supported categories and demo exchange estimate
- `scripts/auditProductPhotos.mjs` — image validity/coverage report
- `scripts/sourceAmazonImages.mjs`, `scripts/sourceFlipkartImages.mjs` — conservative product-title-matched image sourcing utilities
