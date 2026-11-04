import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck, Tag, Truck, X } from 'lucide-react'
import { Overlay } from '../overlay/Overlay'
import { useStore } from '../../context/StoreContext'
import { productById } from '../../data/products'
import { ProductArt } from '../art/ProductArt'
import { Rating } from '../ui/Rating'
import { Price } from '../ui/Price'
import { AddToCartButton } from './AddToCartButton'
import { WishlistButton } from './WishlistButton'
import { deliveryLabel } from '../../lib/format'
import { SelectField } from '../form/Field'
import { productColorName, productSizeOptions } from '../../lib/productOptions'

export function QuickView() {
  const { quickViewId, closeQuickView, pushRecent, location, addToCart } = useStore()
  const navigate = useNavigate()
  const product = quickViewId ? productById[quickViewId] : null
  const [color, setColor] = useState(null)
  const [size, setSize] = useState('')
  const [imageIndex, setImageIndex] = useState(0)
  const touchStartX = useRef(null)
  const sizeOptions = productSizeOptions(product)
  const imageEntries = product?.colorGalleries?.[color]?.length ? product.colorGalleries[color] : product?.galleryImages?.length ? product.galleryImages : product?.images?.length ? product.images : product?.image ? [product.image] : []
  const images = imageEntries.map((entry) => typeof entry === 'string' ? entry : entry.url).filter(Boolean)

  const changeImage = (direction) => {
    if (images.length < 2) return
    setImageIndex((index) => (index + direction + images.length) % images.length)
  }

  useEffect(() => {
    if (product) {
      pushRecent(product.id)
      setColor(product.colors[0])
      setSize('')
      setImageIndex(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickViewId])

  useEffect(() => setImageIndex(0), [color])

  return (
    <Overlay open={!!product} onClose={closeQuickView} label={product ? `Quick view: ${product.title}` : 'Quick view'}>
      {product && (
        <div className="grid max-h-[92dvh] overflow-y-auto md:max-h-[86vh] md:grid-cols-[1.05fr_1fr]">
          <div className="relative bg-studio md:flex md:flex-col md:justify-center">
            <div
              onKeyDown={(event) => { if (event.key === 'ArrowLeft') changeImage(-1); if (event.key === 'ArrowRight') changeImage(1) }}
              onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }}
              onTouchEnd={(event) => {
                if (touchStartX.current == null) return
                const delta = event.changedTouches[0].clientX - touchStartX.current
                if (Math.abs(delta) > 45) changeImage(delta < 0 ? 1 : -1)
                touchStartX.current = null
              }}
              tabIndex={images.length > 1 ? 0 : undefined}
              aria-label={images.length > 1 ? 'Product image gallery. Swipe or use left and right arrow keys to change images.' : undefined}
              className="relative mx-auto w-full max-w-[300px] overflow-hidden md:max-w-none"
            >
              <ProductArt src={images[imageIndex]} kind={product.art.kind} color={color ?? product.art.color} brand={product.brand} label={product.title} fit={product.category === 'fashion' && product.photo?.generated ? 'cover' : 'contain'} className={`${product.category === 'fashion' && product.photo?.generated ? 'aspect-[4/5]' : 'aspect-square'} w-full ${product.photo?.generated ? 'p-0' : 'p-[10%]'}`} />
              {images.length > 1 && <>
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink-700 shadow-sm">{imageIndex + 1} / {images.length}</span>
                <button type="button" onClick={() => changeImage(-1)} aria-label="Show previous product image" className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink-900 shadow-lift ring-1 ring-ink-950/5"><ChevronLeft className="size-5" /></button>
                <button type="button" onClick={() => changeImage(1)} aria-label="Show next product image" className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink-900 shadow-lift ring-1 ring-ink-950/5"><ChevronRight className="size-5" /></button>
              </>}
            </div>
            {images.length > 1 && <div className="scrollbar-none mx-auto mt-2 grid w-full max-w-[300px] grid-cols-4 gap-1.5 px-2 md:max-w-none md:px-4" role="group" aria-label="Product images">
              {images.slice(0, 4).map((src, index) => <button key={src} type="button" onClick={() => setImageIndex(index)} aria-label={product.imageLabels?.[index] ?? `View ${index + 1}`} aria-pressed={imageIndex === index} className={`overflow-hidden rounded-md bg-white ring-1 ring-inset ${imageIndex === index ? 'ring-2 ring-brand-600' : 'ring-ink-200'}`}><img src={src} alt={typeof imageEntries[index] === 'string' ? `${product.imageLabels?.[index] ?? `View ${index + 1}`} of ${product.title}` : imageEntries[index]?.alt ?? `${product.imageLabels?.[index] ?? `View ${index + 1}`} of ${product.title}`} loading="lazy" className={`aspect-square size-full ${product.category === 'fashion' && product.photo?.generated ? 'object-cover' : 'object-contain p-1'}`} /></button>)}
            </div>}
            <div className="absolute inset-x-0 top-0 flex justify-center pt-2 md:hidden">
              <span className="h-1 w-10 rounded-full bg-ink-950/20" />
            </div>
          </div>

          <div className="flex flex-col p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link to={`/brand/${encodeURIComponent(product.brand)}`} onClick={closeQuickView} className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700 hover:underline">
                  {product.brand}
                </Link>
                <h2 className="mt-1.5 font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink-950 sm:text-2xl">{product.title}</h2>
              </div>
              <button type="button" onClick={closeQuickView} aria-label="Close quick view" className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-ink-600 hover:bg-ink-100 hover:text-ink-950">
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-3">
              <Rating value={product.rating} count={product.reviewCount} size="md" />
            </div>

            <div className="mt-5 border-t border-ink-150 pt-5">
              <Price price={product.price} mrp={product.mrp} discount={product.discount} size="lg" />
              <p className="mt-1 text-xs text-ink-500">Inclusive of all taxes</p>
            </div>

            {sizeOptions.length > 0 && (
              <div className="mt-4">
                <SelectField id="quick-view-size" label="Size" value={size} hint="Choose a size to add this item" onChange={(e) => setSize(e.target.value)}>
                  <option value="">Choose a size</option>
                  {sizeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </SelectField>
              </div>
            )}

            {Object.keys(product.colorGalleries ?? {}).length > 1 && (
              <fieldset className="mt-5">
                <legend className="text-sm font-medium text-ink-800">Colour <span className="font-normal text-ink-500">· {productColorName(color)}</span></legend>
                <div className="mt-2 flex gap-2.5">
                  {Object.keys(product.colorGalleries).map((c) => (
                    <label key={c} className="relative cursor-pointer">
                      <input type="radio" name="qv-colour" value={c} checked={color === c} onChange={() => setColor(c)} className="peer sr-only" />
                      <span className="block size-8 rounded-full ring-1 ring-inset ring-ink-950/10 transition-shadow peer-checked:ring-2 peer-checked:ring-ink-950 peer-checked:ring-offset-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink-950" style={{ backgroundColor: c }} />
                      <span className="sr-only">{productColorName(c)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {product.offers[0] && (
              <div className="mt-5 rounded-lg bg-save-50 p-3.5">
                <p className="flex items-start gap-2 text-[13px] leading-5 text-ink-800">
                  <Tag className="mt-0.5 size-4 shrink-0 text-save-700" />
                  <span>
                    <span className="font-semibold">Bank offer · </span>
                    {product.offers[0].text}
                    {product.offers[0].cap ? <span className="text-ink-500"> (save up to ₹{product.offers[0].cap.toLocaleString('en-IN')})</span> : null}
                  </span>
                </p>
              </div>
            )}

            <ul className="mt-5 space-y-3 text-[13px] text-ink-700">
              <li className="flex gap-2.5">
                <Truck className="size-4 shrink-0 text-ink-500" />
                <span>
                  {product.delivery.free ? 'Free delivery' : 'Delivery ₹49'} <span className="font-semibold text-ink-900">{deliveryLabel(product.delivery)}</span> to {location.city} {location.pincode}
                  {product.delivery.installation && <span className="text-ink-500"> · {product.delivery.installation}</span>}
                </span>
              </li>
              <li className="flex gap-2.5">
                <RotateCcw className="size-4 shrink-0 text-ink-500" />
                {product.returns.policy}
              </li>
              <li className="flex gap-2.5">
                <BadgeCheck className="size-4 shrink-0 text-ink-500" />
                <span>
                  Sold by <span className="font-medium text-ink-900">{product.seller.name}</span> · {product.seller.rating}★ seller
                </span>
              </li>
              {product.assured && (
                <li className="flex gap-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-save-700" />
                  <span>
                    <span className="font-medium text-ink-900">Bazaar Verified</span> · quality-checked and fast-shipped
                  </span>
                </li>
              )}
            </ul>

            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-ink-150 pt-5 text-[13px]">
              {Object.entries(product.specs)
                .slice(0, 4)
                .map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="text-ink-900">{v}</dd>
                  </div>
                ))}
            </dl>

            <div className="sticky bottom-0 -mx-5 mt-6 flex gap-2.5 border-t border-ink-150 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:-mx-7 sm:px-7 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
              <AddToCartButton id={product.id} size={size || undefined} color={color || undefined} disabled={(sizeOptions.length > 0 && !size) || (Object.keys(product.colorGalleries ?? {}).length > 1 && !color)} className="h-12 flex-1 text-[15px]" />
              <button
                type="button"
                onClick={() => {
                  if (sizeOptions.length && !size) return
                  addToCart(product.id, 1, { silent: true, size: size || undefined, color: color || undefined })
                  closeQuickView()
                  navigate('/checkout')
                }}
                disabled={(sizeOptions.length > 0 && !size) || (Object.keys(product.colorGalleries ?? {}).length > 1 && !color)}
                className="h-12 flex-1 rounded-md bg-brand-600 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Buy now
              </button>
              <WishlistButton id={product.id} size="lg" className="h-12! w-12! rounded-md! shadow-none! ring-ink-200!" />
            </div>

            <Link to={`/p/${product.id}`} onClick={closeQuickView} className="group mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-ink-900 hover:text-brand-700">
              See full details <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </Overlay>
  )
}
