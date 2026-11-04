import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, Truck } from 'lucide-react'
import { photo } from '../../data/photos'
import { Photo } from '../ui/Photo'

const campaign = photo('hero-fashion')

export function HomeHero() {
  return (
    <section className="relative isolate grid overflow-hidden rounded-2xl bg-[#f3f0e8] ring-1 ring-inset ring-ink-950/5 sm:rounded-3xl md:min-h-[500px] md:grid-cols-2">
      <div className="relative order-first aspect-[4/3] overflow-hidden bg-[#e8e5de] md:absolute md:inset-y-0 md:right-0 md:order-last md:aspect-auto md:w-1/2">
        <Photo src={campaign?.src} alt="Model wearing a printed everyday overshirt" priority className="size-full" imgClassName="object-cover object-[50%_0%] md:object-[50%_8%]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f3f0e8]/25 to-transparent md:hidden" aria-hidden />
      </div>

      <div className="relative z-10 order-last flex flex-col justify-center px-5 pb-6 pt-2 sm:px-8 sm:pb-8 md:order-first md:min-h-[500px] md:px-10 md:py-10 lg:px-14">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-ink-700 ring-1 ring-ink-950/5">
          <MapPin className="size-3.5 text-brand-600" /> The Hyderabad edit
        </p>
        <h1 className="mt-4 max-w-[12ch] text-balance font-display text-[36px] font-extrabold leading-[0.98] tracking-[-0.05em] text-ink-950 sm:text-[48px] lg:text-[56px]">
          Good finds.<br />Better everyday.
        </h1>
        <p className="mt-3 max-w-[38ch] text-sm leading-6 text-ink-700 sm:text-base">
          Fresh style, trusted tech and home essentials, picked for life in Hyderabad.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link to="/c/fashion" className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink-950 pl-5 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
            Shop the edit <span className="grid size-7 place-items-center rounded-full bg-white/15"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
          </Link>
          <Link to="/deals" className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-ink-950/10 transition-colors hover:bg-ink-50">
            Today’s deals
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-950/10 pt-4 text-[11px] font-medium text-ink-600 sm:text-xs">
          <span className="inline-flex items-center gap-1.5"><Truck className="size-3.5 text-save-700" /> Delivery across Hyderabad</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-brand-700" /> Easy returns on eligible items</span>
        </div>
      </div>
    </section>
  )
}
