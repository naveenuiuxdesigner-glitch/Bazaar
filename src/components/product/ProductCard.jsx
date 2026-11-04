import { Link } from 'react-router-dom'
import { BadgeCheck, Eye, Truck } from 'lucide-react'
import { ProductArt } from '../art/ProductArt'
import { Rating } from '../ui/Rating'
import { Price } from '../ui/Price'
import { WishlistButton } from './WishlistButton'
import { AddToCartButton } from './AddToCartButton'
import { useStore } from '../../context/StoreContext'
import { deliveryLabel } from '../../lib/format'

export function DeliveryLine({ product, className = '' }) {
  const { delivery } = product
  const when = deliveryLabel(delivery)
  const fast = delivery.days <= 1 || delivery.slot
  return (
    <p className={`flex items-center gap-1.5 text-xs text-ink-600 ${className}`}>
      <Truck className={`size-3.5 shrink-0 ${delivery.free ? 'text-save-600' : 'text-ink-400'}`} aria-hidden />
      <span className="truncate">
        {delivery.free ? <span className="font-semibold text-save-700">Free delivery </span> : 'Delivery '}
        <span className={fast ? 'font-semibold text-ink-900' : ''}>{when}</span>
      </span>
    </p>
  )
}

// Big discounts get a coral badge on the image; smaller ones are shown only in the price row, so the
// coral accent keeps meaning "this is a real deal".
const DEAL_BADGE_MIN = 20

export function ProductCard({ product, showDelivery = true, compare = false, priority = false, className = '' }) {
  const { openQuickView, inCompare, toggleCompare } = useStore()
  const lowStock = product.stock <= 10
  const badge = product.badges[0]
  const alt = product.galleryImages?.[1]?.url ?? product.images?.[1]
  const bigDeal = product.discount >= DEAL_BADGE_MIN
  const editorialFashion = product.category === 'fashion' && product.photo?.generated

  return (
    <article
      className={`group/card relative flex h-full flex-col rounded-2xl bg-white p-2 ring-1 ring-inset ring-ink-200 transition-[transform,box-shadow,ring-color] duration-300 ease-out-soft hover:-translate-y-1 hover:ring-ink-300 hover:shadow-card focus-within:shadow-card motion-reduce:hover:translate-y-0 ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-studio">
        <Link
          to={`/p/${product.id}`}
          className={`relative block ${editorialFashion ? 'aspect-[4/5]' : 'aspect-square'}`}
          tabIndex={-1}
          aria-hidden
          onClick={(e) => {
            // On phones the image opens a quick-view sheet; the title still goes to the product page.
            if (window.matchMedia('(max-width: 767px)').matches) {
              e.preventDefault()
              openQuickView(product.id)
            }
          }}
        >
          <ProductArt
            key={product.id}
            src={product.image}
            loading={priority ? 'eager' : 'lazy'}
            kind={product.art.kind}
            color={product.art.color}
            brand={product.brand}
            label={product.title}
            fit={editorialFashion ? 'cover' : 'contain'}
            className={`size-full ${product.photo?.generated ? 'p-0' : 'p-[9%]'} transition-[transform,opacity] duration-500 ease-out-soft group-hover/card:scale-[1.06] ${alt ? 'md:group-hover/card:opacity-0' : ''}`}
          />
          {alt && (
            <img
              src={alt}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 hidden size-full scale-[1.02] object-contain p-[9%] opacity-0 transition-[transform,opacity] duration-500 ease-out-soft group-hover/card:scale-100 group-hover/card:opacity-100 md:block"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {bigDeal && <span className="rounded-md bg-deal-600 px-1.5 py-0.5 text-[11px] font-bold text-white shadow-[0_2px_6px_-2px_rgb(193_63_21/0.6)] num">−{product.discount}%</span>}
          {badge && <span className="rounded-md bg-white/95 px-1.5 py-0.5 text-[11px] font-semibold text-ink-900 shadow-[0_1px_2px_rgb(11_18_32/0.08)] ring-1 ring-ink-950/5">{badge}</span>}
        </div>

        {product.photo?.generated && <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-white/90 px-1.5 py-1 text-[9px] font-semibold text-ink-600 shadow-sm">AI concept photo</span>}

        <div className="absolute right-2 top-2 z-10">
          <WishlistButton id={product.id} />
        </div>

        {/* Desktop hover actions */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden translate-y-3 gap-2 opacity-0 transition-[opacity,transform] duration-300 ease-out-soft group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 md:flex">
          <button
            type="button"
            onClick={() => openQuickView(product.id)}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/90 text-[13px] font-semibold text-ink-900 shadow-[0_2px_8px_-2px_rgb(11_18_32/0.18)] ring-1 ring-ink-950/5 backdrop-blur-md transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.97]"
          >
            <Eye className="size-4" /> Quick view
          </button>
          <AddToCartButton id={product.id} variant="icon" disabled={product.stock === 0} />
        </div>

        {/* Touch: add to cart (image tap opens quick view) */}
        <div className="absolute bottom-2 right-2 z-10 md:hidden">
          <AddToCartButton id={product.id} variant="icon" disabled={product.stock === 0} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${editorialFashion ? 'pt-2.5' : 'px-1.5 pb-1.5 pt-3'}`}>
        <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">
          <span className="truncate">{product.brand}</span>
          {product.assured && (
            <span className="inline-flex shrink-0 items-center gap-0.5 normal-case tracking-normal text-brand-600" title="Bazaar Assured: quality-checked, top-rated seller">
              <BadgeCheck className="size-3.5" aria-hidden />
              <span className="sr-only">Bazaar Assured</span>
            </span>
          )}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-[14px] leading-5 text-ink-900">
          <Link to={`/p/${product.id}`} className="rounded-sm transition-colors hover:text-brand-700">
            {product.title}
          </Link>
        </h3>
        <div className="mt-1.5">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <Price price={product.price} mrp={product.mrp} discount={product.discount} className="mt-2" />
        {showDelivery && <DeliveryLine product={product} className="mt-1.5" />}
        {lowStock && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-deal-700">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-deal-500 opacity-60 motion-reduce:hidden" />
              <span className="relative size-1.5 rounded-full bg-deal-600" />
            </span>
            Only {product.stock} left
          </p>
        )}
        {compare && (
          <label className="mt-auto inline-flex cursor-pointer items-center gap-2 self-start pt-2.5 text-[12.5px] font-medium text-ink-600 hover:text-ink-950">
            <input type="checkbox" checked={inCompare(product.id)} onChange={() => toggleCompare(product.id)} className="size-4 cursor-pointer rounded-[4px] accent-brand-600" />
            Compare
          </label>
        )}
      </div>
    </article>
  )
}
