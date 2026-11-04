import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { ProductArt } from '../components/art/ProductArt'
import { catColor } from '../components/layout/Header'
import { photo } from '../data/photos'
import { Photo } from '../components/ui/Photo'
import { PageBanner } from '../components/ui/PageBanner'
import { Stagger, StaggerItem } from '../components/ui/Motion'

const count = (slug) => products.filter((p) => p.category === slug).length

export default function Categories() {
  return (
    <div className="container-page pt-6">
      <PageBanner
        eyebrow="20 departments"
        title="Every category, one cart"
        subtitle="From phones to pet food: genuine products from 2,000+ brands, delivered to 19,000+ pincodes."
        tone="brand"
        stats={[
          ['departments', categories.length],
          ['products', products.length],
        ]}
      />
      <Stagger step={0.03} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {categories.map((c) => {
          const pic = photo(`cat-${c.slug}`)
          return (
            <StaggerItem key={c.slug}>
              <Link
                to={`/c/${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-inset ring-ink-950/5 transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card"
                style={{ backgroundColor: c.tint }}
              >
                {pic ? (
                  <Photo src={pic.src} className="aspect-[4/5]" imgClassName="group-hover:scale-110" />
                ) : (
                  <span className="block aspect-[4/5]">
                    <ProductArt kind={c.art} color={catColor(c.slug)} tint={c.tint} fallback="illustration" className="size-full p-[16%]" title="" />
                  </span>
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
                  <span>
                    <span className="block font-display text-[17px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-lg">{c.name}</span>
                    <span className="text-xs text-white/70 num">{count(c.slug)} products</span>
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-ink-950 transition-transform duration-300 ease-out-soft group-hover:rotate-45" aria-hidden>
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </div>
  )
}
