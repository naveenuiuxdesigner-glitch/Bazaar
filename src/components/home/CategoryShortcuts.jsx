import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'
import { ProductArt } from '../art/ProductArt'
import { catColor } from '../layout/Header'
import { photo } from '../../data/photos'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Motion'

function Tile({ c, priority = false }) {
  const pic = photo(`cat-${c.slug}`)
  return (
    <Link
      to={`/c/${c.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-inset ring-ink-950/5 transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card"
      style={{ backgroundColor: c.tint }}
    >
      {pic ? (
        <img src={pic.src} alt="" loading={priority ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-110" />
      ) : (
        <ProductArt kind={c.art} color={catColor(c.slug)} tint={c.tint} fallback="illustration" className="absolute inset-0 size-full p-[14%] transition-transform duration-700 ease-out-soft group-hover:scale-110" title="" />
      )}
      {/* legibility gradient; deepens slightly on hover so the label stays crisp as the image moves */}
      <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/15 to-transparent transition-opacity duration-300 group-hover:opacity-90" aria-hidden />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1 p-2.5 sm:p-3">
        <span className="text-[12.5px] font-semibold leading-tight text-white transition-transform duration-300 ease-out-soft group-hover:-translate-y-0.5 sm:text-[13.5px]">{c.name}</span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-ink-950 opacity-0 transition-[opacity,transform] duration-300 ease-out-soft -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </Link>
  )
}

export function CategoryShortcuts() {
  return (
    <section aria-labelledby="cats-title">
      <SectionHeader id="cats-title" eyebrow="20 departments" title="Shop by category" to="/categories" action="All categories" />
      <Stagger
        step={0.025}
        className="scrollbar-none -mx-4 -my-2 grid snap-x auto-cols-[104px] grid-flow-col grid-rows-2 gap-3 overflow-x-auto scroll-px-4 px-4 py-2 sm:-mx-6 sm:scroll-px-6 sm:auto-cols-[124px] sm:px-6 lg:mx-0 lg:grid-flow-row lg:grid-cols-10 lg:grid-rows-none lg:gap-3.5 lg:overflow-visible lg:px-0"
      >
        {categories.map((c, i) => (
          <StaggerItem key={c.slug} className="snap-start">
            <Tile c={c} priority={i < 10} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
