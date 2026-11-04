import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { editorialPromos } from '../../data/banners'
import { ProductArt } from '../art/ProductArt'
import { Drift, Stagger, StaggerItem } from '../ui/Motion'
import { Photo } from '../ui/Photo'

// Each promo carries one accent family that matches its card colour.
const EYEBROW = { violet: 'text-violet-700', deal: 'text-deal-700', save: 'text-save-700' }

export function EditorialPromos() {
  return (
    <Stagger
      as="section"
      aria-label="Category promotions"
      step={0.08}
      className="scrollbar-none -mx-4 -my-3 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-4 lg:overflow-visible lg:px-0"
    >
      {editorialPromos.map((p) => (
        <StaggerItem as="div" key={p.id} className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
          <Link
            to={p.to}
            className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl p-6 sm:rounded-3xl transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card lg:min-h-[320px] lg:p-7"
            style={{ backgroundColor: p.bg }}
          >
            <p className={`relative z-10 text-xs font-bold uppercase tracking-[0.14em] ${EYEBROW[p.theme] ?? 'text-ink-600'}`}>{p.eyebrow}</p>
            <h3 className="relative z-10 mt-2 max-w-[15ch] font-display text-2xl font-extrabold leading-[1.06] tracking-[-0.03em] text-ink-950 lg:text-[28px]">{p.title}</h3>
            <p className={`relative z-10 mt-2 text-sm text-ink-700 ${p.photo ? 'max-w-[80%]' : 'max-w-[50%]'}`}>{p.body}</p>
            {p.photo ? (
              <>
                <span className="relative z-10 mt-auto inline-flex h-10 items-center gap-1.5 self-start rounded-full bg-white pl-4 pr-3 text-sm font-semibold text-ink-950 shadow-lift transition-colors group-hover:bg-ink-950 group-hover:text-white">
                  Shop now <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
                </span>
                {/* photo fills the lower part of the card, fades up into the card colour and drifts slightly on scroll */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] overflow-hidden" style={{ '--tone': p.bg }}>
                  <Drift range={24} className="size-full">
                    <Photo src={p.photo.src} className="size-full" imgClassName="group-hover:scale-[1.05]" />
                  </Drift>
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--tone)_10%,transparent_65%)]" />
                </div>
              </>
            ) : (
              <>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink-950">
                  Shop now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="pointer-events-none absolute bottom-0 right-0 h-[58%] w-[58%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]">
                  {p.art.map((a, j) => (
                    <div key={j} className="absolute" style={{ left: `${a.x}%`, top: `${a.y}%`, width: `${72 * a.s}%`, aspectRatio: '1' }}>
                      <ProductArt src={a.image} kind={a.kind} color={a.color} framed={false} className="size-full" title="" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
