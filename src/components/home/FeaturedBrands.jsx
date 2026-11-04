import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredBrands } from '../../data/brands'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Motion'

function BrandVisual({ src }) {
  const [state, setState] = useState('loading')
  if (state === 'error') return null
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      onLoad={() => setState('ready')}
      onError={() => setState('error')}
      className={`absolute inset-0 size-full object-contain transition-opacity duration-500 ease-out-soft ${state === 'ready' ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

function BrandCard({ brand }) {
  const deal = brand.bestDiscount >= 10
  return (
    <Link
      to={brand.to}
      aria-label={`${brand.name}, ${brand.productCount} products. Explore brand store`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-inset ring-ink-950/[0.07] transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-studio">
        {/* a soft brand-blue wash rises behind the product on hover */}
        <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-100/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
        <div className="absolute inset-[6%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.07]">
          <BrandVisual src={brand.image} />
        </div>
        {deal && <span className="absolute left-2 top-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[11px] font-bold text-save-700 shadow-[0_1px_2px_rgb(11_18_32/0.08)] num">Up to {brand.bestDiscount}% off</span>}
      </div>

      <div className="flex items-end justify-between gap-2 px-1.5 pb-1 pt-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-[17px] font-extrabold leading-tight tracking-[-0.02em] text-ink-950 sm:text-lg">{brand.name}</h3>
          <p className="mt-0.5 truncate text-xs text-ink-500">
            <span className="num">{brand.productCount}</span> products<span className="hidden sm:inline"> · {brand.category}</span>
          </p>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-100 text-ink-900 transition-[background-color,color,transform] duration-300 ease-out-soft group-hover:bg-brand-600 group-hover:text-white group-hover:-rotate-45" aria-hidden>
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}

export function FeaturedBrands() {
  return (
    <section aria-labelledby="brands-title">
      <SectionHeader id="brands-title" eyebrow="Official brand stores" title="Featured brands" subtitle="Authorised sellers, genuine products and brand warranty." />
      <Stagger step={0.04} className="scrollbar-none -mx-4 -my-3 grid snap-x auto-cols-[44%] grid-flow-col grid-rows-2 gap-3 overflow-x-auto scroll-px-4 px-4 py-3 sm:-mx-6 sm:auto-cols-[29%] sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid-flow-row lg:grid-cols-6 lg:grid-rows-none lg:gap-4 lg:overflow-visible lg:px-0">
        {featuredBrands.map((b) => (
          <StaggerItem key={b.id} className="snap-start">
            <BrandCard brand={b} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
