import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { spotlightBanners } from '../../data/banners'
import { ProductArt } from '../art/ProductArt'
import { Drift, Stagger, StaggerItem } from '../ui/Motion'
import { Photo } from '../ui/Photo'

function Banner({ b }) {
  return (
    <Link
      to={b.to}
      className="group relative isolate flex h-[320px] overflow-hidden rounded-2xl p-6 sm:rounded-3xl text-white shadow-[0_24px_50px_-30px_rgb(11_18_32/0.6)] transition-transform duration-300 ease-out-soft hover:-translate-y-1 sm:h-[340px] sm:p-8"
      style={{ background: b.bg }}
    >
      {/* soft accent glow behind the products; brightens on hover */}
      <span
        className="pointer-events-none absolute -right-16 top-1/2 -z-10 size-[340px] -translate-y-1/2 rounded-full opacity-35 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
        style={{ backgroundColor: b.glow }}
        aria-hidden
      />
      {b.photo && <Photo src={b.photo.src} className="absolute inset-0 -z-20" imgClassName="opacity-65 transition-transform duration-700 group-hover:scale-[1.04]" />}
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,10,24,.96)_0%,rgba(6,10,24,.82)_44%,rgba(6,10,24,.18)_100%)]" aria-hidden />
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden />

      <div className="relative z-10 flex max-w-[56%] flex-col">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: b.accent }}>
          {b.eyebrow}
        </p>
        <h3 className="mt-2 text-balance font-display text-[24px] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[30px]">{b.title}</h3>
        <p className="mt-2 hidden text-sm leading-5 text-white/70 sm:block">{b.body}</p>
        <span className="mt-auto inline-flex h-10 items-center gap-2 self-start rounded-full bg-white pl-4 pr-1.5 text-sm font-semibold text-ink-950 transition-colors group-hover:bg-ink-50">
          {b.cta}
          <span className="grid size-7 place-items-center rounded-full bg-ink-950 text-white transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5">
            <ArrowRight className="size-3.5" />
          </span>
        </span>
      </div>

      {!b.photo && <Drift range={22} className="pointer-events-none absolute inset-y-0 right-0 w-[52%]">
        <div className="relative size-full">
          {b.art.map((a, i) => (
            <div
              key={i}
              className="absolute transition-transform duration-700 ease-out-soft group-hover:-translate-y-1.5"
              style={{ left: `${a.x}%`, top: `${a.y}%`, width: `${74 * a.s}%`, aspectRatio: '1', rotate: `${a.r ?? 0}deg`, transitionDelay: `${i * 60}ms` }}
            >
              <ProductArt src={a.image} kind={a.kind} color={a.color} framed={false} className="size-full drop-shadow-[0_24px_30px_rgb(0_0_0/0.45)]" title="" />
            </div>
          ))}
        </div>
      </Drift>}
    </Link>
  )
}

export function SpotlightBanners() {
  return (
    <Stagger as="section" aria-label="Spotlight" step={0.1} className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      {spotlightBanners.map((b) => (
        <StaggerItem as="div" key={b.id}>
          <Banner b={b} />
        </StaggerItem>
      ))}
    </Stagger>
  )
}
