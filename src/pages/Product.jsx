import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BadgeCheck, Banknote, Check, ChevronDown, ChevronLeft, ChevronRight, CreditCard, GitCompareArrows, MapPin, Minus, Plus, RotateCcw, Share2, ShieldCheck, ShoppingBag, Tag, Truck, X, Zap, ZoomIn, ZoomOut } from 'lucide-react'
import { catalog } from '../services/catalog'
import { useAsync } from '../hooks/useAsync'
import { useStore } from '../context/StoreContext'
import { categoryBySlug } from '../data/categories'
import { products, productById } from '../data/products'
import { ProductArt } from '../components/art/ProductArt'
import { Rating } from '../components/ui/Rating'
import { Price } from '../components/ui/Price'
import { WishlistButton } from '../components/product/WishlistButton'
import { ProductRail } from '../components/product/ProductRail'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Skeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'
import { Overlay } from '../components/overlay/Overlay'
import { LocationPicker } from '../components/layout/LocationPicker'
import { Reviews } from '../components/product/Reviews'
import { deliveryLabel, formatPrice } from '../lib/format'
import { COD_LIMIT, EMI_BANKS, EMI_MIN, EMI_TENURES, emiPlan, isNoCost } from '../data/payments'
import { SelectField } from '../components/form/Field'
import { productColorName, productSizeOptions } from '../lib/productOptions'
import { estimateExchangeCredit, isExchangeEligible } from '../lib/productExchange'

const COMPLEMENTS = {
  mobiles: ['electronics', 'mobiles'],
  laptops: ['electronics', 'gaming', 'travel'],
  electronics: ['mobiles', 'electronics'],
  tvs: ['electronics', 'gaming'],
  gaming: ['gaming', 'electronics'],
  footwear: ['fashion', 'sports'],
  fashion: ['footwear', 'fashion', 'beauty'],
  kitchen: ['kitchen', 'grocery', 'home'],
  sports: ['sports', 'footwear'],
  beauty: ['beauty'],
}

function Gallery({ p, color }) {
  const [zoom, setZoom] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const touchStartX = useRef(null)
  const gallery = p.colorGalleries?.[color]?.length ? p.colorGalleries[color] : p.galleryImages?.length ? p.galleryImages : (p.images?.length ? p.images : [p.image]).filter(Boolean).map((url, index) => ({ url, alt: `${index ? 'Additional' : 'Primary'} view of ${p.title}` }))
  const images = gallery.map((entry) => typeof entry === 'string' ? entry : entry.url).filter(Boolean)
  const portrait = p.category === 'fashion' && p.photo?.generated
  const changeImage = (direction) => {
    if (images.length < 2) return
    setActiveIndex((current) => (current + direction + images.length) % images.length)
    setZoom(null)
  }
  useEffect(() => {
    setActiveIndex(0)
    setZoom(null)
  }, [p.id, color])
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <div>
      <div ref={ref} onMouseMove={move} onMouseLeave={() => setZoom(null)} onKeyDown={(e) => { if (e.key === 'ArrowLeft') changeImage(-1); if (e.key === 'ArrowRight') changeImage(1) }} onTouchStart={(e) => { touchStartX.current = e.changedTouches[0]?.clientX ?? null }} onTouchEnd={(e) => { if (touchStartX.current == null) return; const delta = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 45) changeImage(delta < 0 ? 1 : -1); touchStartX.current = null }} tabIndex={images.length > 1 ? 0 : undefined} aria-label={images.length > 1 ? 'Product image gallery. Swipe or use left and right arrow keys to change images.' : undefined} className="relative cursor-zoom-in overflow-hidden rounded-xl bg-studio focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
        <ProductArt
          key={images[activeIndex]}
          src={images[activeIndex]}
          loading="eager"
          kind={p.art.kind}
          color={color ?? p.art.color}
          brand={p.brand}
          label={p.title}
          fit={portrait ? 'cover' : 'contain'}
          className={`${portrait ? 'aspect-[4/5]' : 'aspect-square'} w-full ${p.photo?.generated ? 'p-0' : 'p-[10%]'} transition-transform duration-200 ease-out-soft`}
          style={zoom ? { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        {p.discount >= 10 && <span className="absolute left-4 top-4 rounded-sm bg-save-700 px-2 py-1 text-xs font-bold text-white num">{p.discount}% off</span>}
        {images.length > 1 && <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink-700 shadow-sm">{activeIndex + 1} / {images.length}</span>}
        {images.length > 1 && <>
          <button type="button" onClick={() => changeImage(-1)} aria-label="Show previous product image" className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink-900 shadow-lift ring-1 ring-ink-950/5 transition hover:scale-105 active:scale-95"><ChevronLeft className="size-5" /></button>
          <button type="button" onClick={() => changeImage(1)} aria-label="Show next product image" className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink-900 shadow-lift ring-1 ring-ink-950/5 transition hover:scale-105 active:scale-95"><ChevronRight className="size-5" /></button>
        </>}
        <span className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink-600 md:block">Hover to zoom</span>
        <button
          type="button"
          aria-label={zoom ? 'Reset product image zoom' : 'Zoom product image'}
          onClick={() => setZoom((current) => current ? null : { x: 50, y: 50 })}
          className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white/95 text-ink-800 shadow-lift ring-1 ring-ink-950/5 active:scale-95 md:hidden"
        >
          {zoom ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
        </button>
      </div>
      {images.length > 1 && (
        <div className="scrollbar-none mt-3 grid grid-cols-4 gap-2" role="group" aria-label="Product images">
          {images.slice(0, 4).map((src, index) => {
            const label = p.imageLabels?.[index] ?? `View ${index + 1}`
            return (
              <button key={src} type="button" onClick={() => { setActiveIndex(index); setZoom(null) }} aria-label={label} aria-pressed={activeIndex === index} className={`group overflow-hidden rounded-lg bg-white ring-1 ring-inset transition ${activeIndex === index ? 'ring-2 ring-brand-600' : 'ring-ink-200 hover:ring-ink-400'}`}>
                <span className={`block overflow-hidden bg-studio ${portrait ? 'aspect-[4/5]' : 'aspect-square'}`}>
                <img src={src} alt={typeof gallery[index] === 'string' ? `${label} of ${p.title}` : gallery[index]?.alt ?? `${label} of ${p.title}`} loading="lazy" className={`size-full ${portrait ? 'object-cover' : 'object-contain'} ${p.photo?.generated ? '' : 'p-2'}`} />
                </span>
                <span className="block truncate px-1.5 py-1.5 text-center text-[10px] font-medium text-ink-600">{label}</span>
              </button>
            )
          })}
        </div>
      )}
      {p.photo && (
        <p className="mt-2 text-[11px] leading-snug text-ink-500">
          {p.photo.generated ? 'AI-generated concept photography by Bazaar Studio. This is a visual reference, not a verified manufacturer product photo.' : <>Photo: {p.photo.source ? <a href={p.photo.source} target="_blank" rel="noreferrer" className="underline decoration-ink-300 underline-offset-2 hover:text-ink-800">{p.photo.title}</a> : p.photo.title} by {p.photo.author},{' '}</>}
          {!p.photo.generated && (p.photo.licenseUrl ? (
            <a href={p.photo.licenseUrl} target="_blank" rel="noreferrer license" className="underline decoration-ink-300 underline-offset-2 hover:text-ink-800">
              {p.photo.license}
            </a>
          ) : (
            p.photo.license
          ))}
          {!p.photo.generated && (p.photo.representative ? ' Representative category or product-type photo; check the product details for exact variant.' : ', background removed. Representative image; the delivered model may differ.')}
        </p>
      )}
    </div>
  )
}

function EmiSheet({ open, onClose, price }) {
  const [bank, setBank] = useState(EMI_BANKS[0].id)
  const b = EMI_BANKS.find((x) => x.id === bank)
  return (
    <Overlay open={open} onClose={onClose} label="EMI plans" className="md:!w-[560px]">
      <div className="max-h-[88dvh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">EMI plans</h2>
            <p className="mt-0.5 text-sm text-ink-500">On {formatPrice(price)}. Choose EMI at checkout to use a plan.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink-100">
            <X className="size-5" />
          </button>
        </div>
        <div className="scrollbar-none mt-5 flex gap-2 overflow-x-auto" role="tablist">
          {EMI_BANKS.map((x) => (
            <button key={x.id} role="tab" aria-selected={bank === x.id} type="button" onClick={() => setBank(x.id)} className={`h-9 shrink-0 rounded-full px-3.5 text-[13px] font-medium ${bank === x.id ? 'bg-ink-950 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-150'}`}>
              {x.name}
            </button>
          ))}
        </div>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-ink-150 text-left text-xs text-ink-500">
              <th className="py-2 font-medium">Tenure</th>
              <th className="py-2 font-medium">Monthly</th>
              <th className="py-2 font-medium">Interest</th>
              <th className="py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-150">
            {EMI_TENURES.map((m) => {
              const plan = emiPlan(price, m, b.rate, isNoCost(price, m))
              return (
                <tr key={m}>
                  <td className="py-3 font-medium">
                    {m} months {plan.noCost && <span className="ml-1 rounded-sm bg-save-50 px-1.5 py-0.5 text-[11px] font-semibold text-save-700">No cost</span>}
                  </td>
                  <td className="py-3 num">{formatPrice(plan.monthly)}</td>
                  <td className="py-3 text-ink-600 num">{plan.interest ? formatPrice(plan.interest) : '₹0'}</td>
                  <td className="py-3 text-right font-semibold num">{formatPrice(plan.total)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-ink-500">Interest at {b.rate}% a year. No-cost EMI applies to orders of ₹10,000 or more on 3 and 6 month plans; the interest is given as an upfront discount.</p>
      </div>
    </Overlay>
  )
}

function PriceRangeChart({ price, mrp }) {
  const low = Math.min(price, mrp)
  const high = Math.max(price, mrp)
  const discount = high > 0 ? Math.round(((high - low) / high) * 100) : 0

  return (
    <details aria-label="Product price range" className="group mt-4 overflow-hidden rounded-xl bg-ink-50 ring-1 ring-inset ring-ink-150">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-sm font-semibold text-ink-900">Price range</span>
          <span className="mt-0.5 block text-xs text-ink-500">Tap to see today’s lowest price and listed MRP</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {discount > 0 && <span className="rounded-full bg-save-50 px-2.5 py-1 text-xs font-bold text-save-700">Save {discount}%</span>}
          <ChevronDown className="size-4 text-ink-500 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <div className="px-4 pb-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-ink-900">Offer compared with MRP</h2>
          <p className="mt-0.5 text-xs text-ink-500">Current offer compared with listed MRP</p>
        </div>
      </div>
      <div className="mt-4 px-1" role="img" aria-label={`Lowest listed price ${formatPrice(low)}. Highest listed price ${formatPrice(high)}.`}>
        <div className="relative h-2 rounded-full bg-ink-200">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-save-500 to-brand-500" />
          <span className="absolute -left-1 -top-1.5 size-5 rounded-full border-[3px] border-white bg-save-600 shadow" />
          <span className="absolute -right-1 -top-1.5 size-5 rounded-full border-[3px] border-white bg-brand-600 shadow" />
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <p className="text-xs text-ink-500">Lowest listed<span className="mt-0.5 block text-sm font-bold text-save-700 num">{formatPrice(low)}</span></p>
          <p className="text-right text-xs text-ink-500">Highest listed (MRP)<span className="mt-0.5 block text-sm font-semibold text-ink-700 num">{formatPrice(high)}</span></p>
        </div>
      </div>
      <p className="mt-3 border-t border-ink-200 pt-2.5 text-[11px] leading-4 text-ink-500">This range uses today’s offer and MRP. Historical price tracking isn’t available for this item.</p>
      </div>
    </details>
  )
}

function BoughtTogether({ p }) {
  const { addToCart, setCartOpen } = useStore()
  const picks = useMemo(() => {
    const cats = COMPLEMENTS[p.category] ?? [p.category]
    const used = new Set([p.subcategory])
    const out = []
    for (const c of products.filter((x) => cats.includes(x.category) && x.id !== p.id && x.price < Math.max(p.price * 0.6, 1500)).sort((a, b) => b.reviewCount - a.reviewCount)) {
      if (used.has(c.subcategory)) continue
      used.add(c.subcategory)
      out.push(c)
      if (out.length === 2) break
    }
    return out
  }, [p])
  const [sel, setSel] = useState(() => new Set(picks.map((x) => x.id)))
  useEffect(() => setSel(new Set(picks.map((x) => x.id))), [picks])
  if (!picks.length) return null
  const items = [p, ...picks.filter((x) => sel.has(x.id))]
  const total = items.reduce((s, x) => s + x.price, 0)
  const mrp = items.reduce((s, x) => s + x.mrp, 0)
  return (
    <section aria-labelledby="fbt-title">
      <SectionHeader id="fbt-title" title="Frequently bought together" />
      <div className="flex flex-col gap-6 rounded-xl p-5 ring-1 ring-inset ring-ink-150 lg:flex-row lg:items-center lg:p-6">
        <ul className="flex flex-1 items-start gap-2 overflow-x-auto sm:gap-4">
          {[p, ...picks].map((x, i) => (
            <li key={x.id} className="flex shrink-0 items-start gap-2 sm:gap-4">
              {i > 0 && <Plus className="mt-14 size-5 shrink-0 text-ink-400" />}
              <div className="w-[120px] sm:w-[150px]">
                <Link to={`/p/${x.id}`} className="block aspect-square overflow-hidden rounded-lg bg-studio">
                  <ProductArt src={x.image} kind={x.art.kind} color={x.art.color} brand={x.brand} label={x.title} className="size-full p-3" />
                </Link>
                <label className="mt-2 flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4 shrink-0 accent-brand-600"
                    checked={i === 0 || sel.has(x.id)}
                    disabled={i === 0}
                    onChange={() =>
                      setSel((s) => {
                        const n = new Set(s)
                        if (n.has(x.id)) n.delete(x.id)
                        else n.add(x.id)
                        return n
                      })
                    }
                  />
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[12.5px] leading-[17px] text-ink-800">{i === 0 ? 'This item: ' : ''}{x.title}</span>
                    <span className="text-[13px] font-semibold num">{formatPrice(x.price)}</span>
                  </span>
                </label>
              </div>
            </li>
          ))}
        </ul>
        <div className="shrink-0 lg:w-64 lg:border-l lg:border-ink-150 lg:pl-6">
          <p className="text-sm text-ink-600">Total for {items.length} items</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight num">{formatPrice(total)}</span>
            {mrp > total && <span className="text-sm text-ink-500 line-through num">{formatPrice(mrp)}</span>}
          </p>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              items.forEach((x) => addToCart(x.id, 1, { silent: true }))
              setCartOpen(true)
            }}
          >
            <ShoppingBag className="size-4" /> Add {items.length} to cart
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { pushRecent, recent, location, addToCart, toggleCompare, inCompare, toast } = useStore()
  const { data: p, loading } = useAsync(() => catalog.getProduct(id), [id])
  const similar = useAsync(async () => (p ? (await catalog.list({ category: p.category })).filter((x) => x.id !== p.id).slice(0, 12) : []), [p?.id])
  const forYou = useAsync(() => (p ? catalog.recommended([p.id, ...recent.slice(0, 4)], 12) : Promise.resolve([])), [p?.id])
  const [color, setColor] = useState(null)
  const [size, setSize] = useState('')
  const [sizeError, setSizeError] = useState('')
  const [qty, setQty] = useState(1)
  const [locOpen, setLocOpen] = useState(false)
  const [emiOpen, setEmiOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [exchangeEnabled, setExchangeEnabled] = useState(false)
  const [exchange, setExchange] = useState({ brand: '', model: '', age: '1–2 years', condition: 'good' })
  const [exchangeError, setExchangeError] = useState('')

  useEffect(() => {
    if (p) {
      pushRecent(p.id)
      setColor(p.colors[0])
      setSize('')
      setSizeError('')
      setQty(1)
      setExchangeEnabled(false)
      setExchange({ brand: '', model: '', age: '1–2 years', condition: 'good' })
      document.title = `${p.title} · ${p.brand} · BAZAAR`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.id])

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1600)
    return () => clearTimeout(t)
  }, [added])

  if (loading)
    return (
      <div className="container-page grid gap-10 pt-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-4/5" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    )

  if (!p)
    return (
      <div className="container-page">
        <EmptyState title="This product isn’t available" body="It may have been removed by the seller.">
          <Button to="/">Back to home</Button>
          <Button to="/deals" variant="secondary">See today’s deals</Button>
        </EmptyState>
      </div>
    )

  const cat = categoryBySlug[p.category]
  const sizeOptions = productSizeOptions(p)
  const exchangeEligible = isExchangeEligible(p)
  const exchangeCredit = exchangeEligible ? estimateExchangeCredit(p, exchange.condition, exchange.age) : 0
  const maxQty = Math.min(10, p.stock)
  const recentItems = recent.filter((x) => x !== p.id).map((x) => productById[x]).filter(Boolean)
  const comparing = inCompare(p.id)

  const add = () => {
    if (exchangeEnabled && (!exchange.brand.trim() || !exchange.model.trim())) {
      setExchangeError('Enter the old device brand and model to continue.')
      document.getElementById('exchange-brand')?.focus()
      return
    }
    setExchangeError('')
    if (sizeOptions.length && !size) {
      setSizeError('Choose a size to continue.')
      document.getElementById('product-size')?.focus()
      return
    }
    const exchangeOffer = exchangeEnabled ? { ...exchange, deviceType: p.category, estimatedCredit: exchangeCredit } : undefined
    addToCart(p.id, qty, { size: size || undefined, color: color || undefined, exchange: exchangeOffer })
    setAdded(true)
  }
  const buyNow = () => {
    if (exchangeEnabled && (!exchange.brand.trim() || !exchange.model.trim())) {
      setExchangeError('Enter the old device brand and model to continue.')
      document.getElementById('exchange-brand')?.focus()
      return
    }
    setExchangeError('')
    if (sizeOptions.length && !size) {
      setSizeError('Choose a size to continue.')
      document.getElementById('product-size')?.focus()
      return
    }
    const exchangeOffer = exchangeEnabled ? { ...exchange, deviceType: p.category, estimatedCredit: exchangeCredit } : undefined
    addToCart(p.id, qty, { silent: true, size: size || undefined, color: color || undefined, exchange: exchangeOffer })
    navigate('/checkout')
  }
  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: p.title, url })
      else {
        await navigator.clipboard.writeText(url)
        toast({ title: 'Link copied to clipboard' })
      }
    } catch {
      /* share sheet dismissed */
    }
  }

  return (
    <div className="container-page pb-24 pt-6 lg:pb-0">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 overflow-hidden whitespace-nowrap text-[13px] text-ink-500">
        <Link to="/" className="hover:text-ink-950">Home</Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <Link to={`/c/${p.category}`} className="hover:text-ink-950">{cat.name}</Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <Link to={`/c/${p.category}?sub=${encodeURIComponent(p.subcategory)}`} className="hover:text-ink-950">{p.subcategory}</Link>
        <ChevronRight className="hidden size-3.5 shrink-0 sm:block" />
        <span className="hidden truncate text-ink-800 sm:block" aria-current="page">{p.title}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Gallery p={p} color={color} />
        </div>

        <div>
          <Link to={`/brand/${encodeURIComponent(p.brand)}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700 hover:underline">
            Visit the {p.brand} store
          </Link>
          <h1 className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink-950 sm:text-[32px]">{p.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <a href="#reviews" className="rounded-sm hover:opacity-80">
              <Rating value={p.rating} count={p.reviewCount} size="md" />
            </a>
            {p.assured && (
              <span className="inline-flex items-center gap-1 rounded-sm bg-ink-100 px-1.5 py-0.5 text-[11.5px] font-semibold text-ink-800">
                <ShieldCheck className="size-3.5 text-save-700" /> Bazaar Verified
              </span>
            )}
            {p.badges.map((b) => (
              <span key={b} className="rounded-sm bg-brand-50 px-1.5 py-0.5 text-[11.5px] font-semibold text-brand-700">{b}</span>
            ))}
          </div>

          <div className="mt-6 border-t border-ink-150 pt-6">
            <Price price={p.price} mrp={p.mrp} discount={p.discount} size="lg" />
            <p className="mt-1 text-xs text-ink-500">Inclusive of all taxes{p.discount > 0 && <> · You save <span className="font-semibold text-save-700 num">{formatPrice(p.mrp - p.price)}</span></>}</p>
            <PriceRangeChart price={p.price} mrp={p.mrp} />
            {p.price >= EMI_MIN && (
              <p className="mt-2 text-[13px] text-ink-700">
                EMI from <span className="font-semibold num">{formatPrice(Math.ceil(p.price / (p.price >= 10000 ? 6 : 12)))}/month</span>
                {p.price >= 10000 && ' with no-cost EMI'}.{' '}
                <button type="button" onClick={() => setEmiOpen(true)} className="font-semibold text-ink-950 underline underline-offset-2">
                  View plans
                </button>
              </p>
            )}
          </div>

          {sizeOptions.length > 0 && (
            <div className="mt-6 max-w-sm">
              <SelectField id="product-size" label="Size" value={size} error={sizeError} hint={size ? 'Size selected' : 'Select your size before adding to cart'} onChange={(e) => { setSize(e.target.value); setSizeError('') }}>
                <option value="">Choose a size</option>
                {sizeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </SelectField>
            </div>
          )}

          {Object.keys(p.colorGalleries ?? {}).length > 1 && (
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ink-800">Colour <span className="font-normal text-ink-500">· {productColorName(color)}</span></legend>
              <div className="mt-2 flex gap-2.5">
                {Object.keys(p.colorGalleries).map((c) => {
                  const name = productColorName(c)
                  return <label key={c} className="cursor-pointer" title={name}>
                    <input type="radio" name="colour" checked={color === c} onChange={() => setColor(c)} className="peer sr-only" />
                    <span className="block size-9 rounded-full ring-1 ring-inset ring-ink-950/10 peer-checked:ring-2 peer-checked:ring-ink-950 peer-checked:ring-offset-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink-950" style={{ backgroundColor: c }} />
                    <span className="sr-only">{name}</span>
                  </label>
                })}
              </div>
            </fieldset>
          )}

          {exchangeEligible && (
            <section className="mt-6 rounded-xl border border-brand-200 bg-brand-50/60 p-4" aria-labelledby="exchange-title">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={exchangeEnabled} onChange={(event) => { setExchangeEnabled(event.target.checked); setExchangeError('') }} className="mt-1 size-4 accent-brand-600" />
                <span className="min-w-0 flex-1">
                  <span id="exchange-title" className="block text-sm font-semibold text-ink-950">Exchange an old device</span>
                  <span className="mt-0.5 block text-xs text-ink-600">Estimated credit up to {formatPrice(exchangeCredit)}. Final value depends on inspection.</span>
                </span>
                <span className="text-sm font-bold text-save-700">−{formatPrice(exchangeCredit)}</span>
              </label>
              {exchangeEnabled && <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-medium text-ink-700">Old device brand<input id="exchange-brand" value={exchange.brand} onChange={(e) => setExchange((v) => ({ ...v, brand: e.target.value }))} placeholder="e.g. Samsung" className="mt-1 h-10 w-full rounded-md border border-ink-200 bg-white px-3 text-sm" /></label>
                <label className="text-xs font-medium text-ink-700">Model<input value={exchange.model} onChange={(e) => setExchange((v) => ({ ...v, model: e.target.value }))} placeholder="e.g. Galaxy A52" className="mt-1 h-10 w-full rounded-md border border-ink-200 bg-white px-3 text-sm" /></label>
                <label className="text-xs font-medium text-ink-700">Device age<select value={exchange.age} onChange={(e) => setExchange((v) => ({ ...v, age: e.target.value }))} className="mt-1 h-10 w-full rounded-md border border-ink-200 bg-white px-3 text-sm"><option>Under 1 year</option><option>1–2 years</option><option>2–4 years</option><option>Over 4 years</option></select></label>
                <label className="text-xs font-medium text-ink-700">Condition<select value={exchange.condition} onChange={(e) => setExchange((v) => ({ ...v, condition: e.target.value }))} className="mt-1 h-10 w-full rounded-md border border-ink-200 bg-white px-3 text-sm"><option value="excellent">Like new</option><option value="good">Good, working</option><option value="fair">Fair, working</option></select></label>
              </div>}
              {exchangeError && <p role="alert" className="mt-2 text-xs font-medium text-deal-700">{exchangeError}</p>}
              <p className="mt-3 text-[11px] leading-4 text-ink-500">Practice demo estimate only. Exchange is confirmed after a seller inspection; the old device must power on and be handed over at delivery.</p>
            </section>
          )}

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium text-ink-800">Quantity</span>
            <div className="inline-flex h-10 items-center rounded-md ring-1 ring-inset ring-ink-200">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity" className="grid h-10 w-10 place-items-center text-ink-700 hover:bg-ink-100 disabled:opacity-35">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold num" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty} aria-label="Increase quantity" className="grid h-10 w-10 place-items-center text-ink-700 hover:bg-ink-100 disabled:opacity-35">
                <Plus className="size-4" />
              </button>
            </div>
            <span className={`text-[13px] ${p.stock <= 10 ? 'font-medium text-deal-700' : 'text-save-700'}`}>{p.stock <= 10 ? `Only ${p.stock} left` : 'In stock'}</span>
          </div>

          <div className="mt-6 hidden gap-2.5 sm:flex">
            <button type="button" onClick={add} className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md text-[15px] font-semibold text-white transition-colors ${added ? 'bg-save-700' : 'bg-ink-950 hover:bg-ink-800'}`}>
              {added ? <Check className="size-4" strokeWidth={3} /> : <ShoppingBag className="size-4" />} {added ? 'Added to cart' : 'Add to cart'}
            </button>
            <button type="button" onClick={buyNow} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-brand-600 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700">
              <Zap className="size-4" /> Buy now
            </button>
            <WishlistButton id={p.id} size="lg" className="h-12! w-12! rounded-md! shadow-none! ring-ink-200!" />
          </div>
          <div className="mt-3 flex gap-5 text-[13px] font-medium text-ink-700">
            <button type="button" onClick={() => toggleCompare(p.id)} aria-pressed={comparing} className="inline-flex items-center gap-1.5 hover:text-ink-950">
              {comparing ? <Check className="size-4 text-save-700" /> : <GitCompareArrows className="size-4" />} {comparing ? 'Added to compare' : 'Compare'}
            </button>
            <button type="button" onClick={share} className="inline-flex items-center gap-1.5 hover:text-ink-950">
              <Share2 className="size-4" /> Share
            </button>
            <span className="sm:hidden">
              <WishlistButton id={p.id} className="!size-auto !bg-transparent !shadow-none !ring-0" />
            </span>
          </div>

          <ul className="mt-6 divide-y divide-ink-150 rounded-xl ring-1 ring-inset ring-ink-150">
            <li className="flex gap-3 p-4 text-sm">
              <MapPin className="size-5 shrink-0 text-ink-500" />
              <span className="flex-1">
                Delivering to <span className="font-semibold">{location.area ? `${location.area}, ` : ''}{location.city} {location.pincode}</span>
              </span>
              <button type="button" onClick={() => setLocOpen(true)} className="text-[13px] font-semibold text-ink-950 underline underline-offset-2">Change</button>
            </li>
            <li className="flex gap-3 p-4 text-sm">
              <Truck className="size-5 shrink-0 text-ink-500" />
              <span>
                {p.delivery.free ? 'Free delivery' : 'Delivery ₹49'} <span className="font-semibold">{deliveryLabel(p.delivery)}</span>
                <span className="block text-[13px] text-ink-500">{p.delivery.installation ?? (p.delivery.days <= 1 ? 'Order in the next few hours for this date' : 'Express delivery available at checkout')}</span>
              </span>
            </li>
            <li className="flex gap-3 p-4 text-sm">
              <Banknote className="size-5 shrink-0 text-ink-500" />
              {p.price <= COD_LIMIT ? 'Cash on delivery available' : 'Pay by UPI, card, net banking or EMI (cash on delivery up to ₹50,000)'}
            </li>
            <li className="flex gap-3 p-4 text-sm"><RotateCcw className="size-5 shrink-0 text-ink-500" />{p.returns.policy}</li>
            <li className="flex gap-3 p-4 text-sm">
              <BadgeCheck className="size-5 shrink-0 text-ink-500" />
              <span>
                Sold by <span className="font-semibold">{p.seller.name}</span>
                <span className="block text-[13px] text-ink-500">{p.seller.rating}★ seller rating · selling since {p.seller.since} · ships from {p.seller.city}</span>
              </span>
            </li>
          </ul>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-ink-950">Offers</h2>
            <ul className="mt-3 space-y-2.5">
              {p.offers.map((o) => (
                <li key={o.text} className="flex gap-2.5 text-[13px] text-ink-700">
                  {o.type === 'bank' || o.type === 'emi' ? <CreditCard className="mt-0.5 size-4 shrink-0 text-save-700" /> : <Tag className="mt-0.5 size-4 shrink-0 text-save-700" />}
                  <span>
                    {o.text}
                    {o.cap ? <span className="text-ink-500"> (up to {formatPrice(o.cap)})</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-ink-950">Highlights</h2>
            <ul className="mt-3 grid gap-2 text-sm text-ink-700">
              {(p.highlights?.length ? p.highlights : Object.entries(p.specs).map(([k, v]) => `${k}: ${v}`)).map((highlight) => (
                <li key={highlight} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-400" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-10 border-t border-ink-150 pt-12 lg:grid-cols-2 lg:gap-14" aria-label="Product details">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">About this product</h2>
          <p className="mt-4 max-w-prose text-sm leading-6 text-ink-700">{p.description}</p>
          <h2 className="mt-8 font-display text-xl font-bold tracking-tight">Specifications</h2>
          <dl className="mt-4 divide-y divide-ink-150 border-y border-ink-150 text-sm">
            {[['Brand', p.brand], ['Category', `${cat.name} › ${p.subcategory}`], ...Object.entries(p.specs), ['SKU', p.sku]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3">
                <dt className="text-ink-500">{k}</dt>
                <dd className="text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">Delivery, returns & warranty</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-ink-700">
            <p>
              Ships from {p.seller.name} in {p.seller.city}. Standard delivery is {p.delivery.free ? 'free' : '₹49 on orders under ₹499'}; express and scheduled slots are offered at checkout where available.
              {p.delivery.installation ? ` ${p.delivery.installation} is booked automatically after delivery.` : ''}
            </p>
            <p>{p.returns.days > 0 ? `${p.returns.policy}. Start a return from My Orders and we’ll schedule a doorstep pickup. Refunds reach UPI and cards within 2 to 4 business days.` : `${p.returns.policy}. If something arrives damaged, raise it from My Orders within 48 hours.`}</p>
            <p>{p.specs.Warranty ? `Warranty: ${p.specs.Warranty}, serviced by ${p.brand} authorised centres.` : `Covered by the ${p.brand} manufacturer warranty. Keep your Bazaar invoice, available from My Orders.`}</p>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <BoughtTogether p={p} />
      </div>

      <div className="mt-16 border-t border-ink-150 pt-12">
        <Reviews product={p} />
      </div>

      <section className="mt-20">
        <SectionHeader title={`More in ${cat.name}`} to={`/c/${p.category}`} />
        <ProductRail label="Similar products" loading={similar.loading} products={similar.data ?? []} />
      </section>
      <section className="mt-16">
        <SectionHeader title="You might also like" subtitle="Based on what you’ve been browsing" />
        <ProductRail label="Recommended products" loading={forYou.loading} products={forYou.data ?? []} />
      </section>
      {recentItems.length > 0 && (
        <section className="mt-16">
          <SectionHeader title="Recently viewed" to="/recently-viewed" />
          <ProductRail label="Recently viewed" products={recentItems} />
        </section>
      )}

      {/* Phone purchase bar */}
      <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 flex items-center gap-2 border-t border-ink-150 bg-white/90 px-4 py-2.5 shadow-[0_-12px_30px_-18px_rgb(11_18_32/0.35)] backdrop-blur-xl sm:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-bold tracking-[-0.02em] num">{formatPrice(p.price * qty)}</p>
          {p.discount > 0 && (
            <p className="text-[11px] font-semibold text-save-700 num">
              <span className="mr-1 font-normal text-ink-400 line-through">{formatPrice(p.mrp * qty)}</span>
              {p.discount}% off
            </p>
          )}
        </div>
        <button type="button" onClick={add} className={`h-12 rounded-xl px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-200 active:scale-[0.96] ${added ? 'bg-save-600' : 'bg-ink-950'}`}>
          {added ? 'Added ✓' : 'Add to cart'}
        </button>
        <button type="button" onClick={buyNow} className="h-12 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-glow transition-[background-color,transform] duration-200 active:scale-[0.96]">
          Buy now
        </button>
      </div>

      <LocationPicker open={locOpen} onClose={() => setLocOpen(false)} />
      <EmiSheet open={emiOpen} onClose={() => setEmiOpen(false)} price={p.price} />
    </div>
  )
}
