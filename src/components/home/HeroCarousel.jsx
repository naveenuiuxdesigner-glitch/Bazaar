import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides, sidePromos } from '../../data/banners'
import { ProductArt } from '../art/ProductArt'
import { Photo } from '../ui/Photo'

const DURATION = 6500
const ease = [0.2, 0.8, 0.2, 1]

function SlideArt({ art, active }) {
  return (
    <div className="absolute inset-0">
      {art.map((a, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `calc(50% - ${50 - a.x}% * var(--art-k))`, top: `calc(${a.y}% * var(--art-k))`, width: `calc(${62 * a.s}% * var(--art-k))`, aspectRatio: '1' }}
          initial={{ opacity: 0, y: 24, rotate: a.r ?? 0 }}
          animate={active ? { opacity: 1, y: 0, rotate: a.r ?? 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.08 }}
        >
          <ProductArt src={a.image} kind={a.kind} color={a.color} brand={a.brand} label={a.label} framed={false} className="size-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]" title="" />
        </motion.div>
      ))}
    </div>
  )
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const reduced = useReducedMotion()
  const startRef = useRef(performance.now())
  const [progress, setProgress] = useState(0)
  const n = heroSlides.length

  const go = useCallback(
    (i, d) => {
      setDir(d ?? (i > index ? 1 : -1))
      setIndex(((i % n) + n) % n)
      startRef.current = performance.now()
      setProgress(0)
    },
    [index, n],
  )

  // Autoplay with a visible progress bar; pauses on hover/focus and when the tab is hidden.
  const elapsedRef = useRef(0)
  useEffect(() => {
    if (reduced || userPaused) return
    let raf
    const tick = (t) => {
      if (paused || document.hidden) {
        startRef.current = t - elapsedRef.current
      } else {
        elapsedRef.current = t - startRef.current
        const p = elapsedRef.current / DURATION
        if (p >= 1) {
          elapsedRef.current = 0
          go(index + 1, 1)
          return
        }
        setProgress(p)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [index, paused, userPaused, reduced, go])

  const slide = heroSlides[index]
  // A photo slide takes its background from the photo's edge tone so the two blend; text contrast follows that tone.
  const bg = slide.photo?.tone ?? slide.bg
  const light = slide.photo ? slide.photo.dark : slide.fg === 'light'

  return (
    <section aria-roledescription="carousel" aria-label="Featured offers" className="grid gap-3 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] lg:gap-4">
      <div
        className="relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-30px_rgb(11_18_32/0.45)] sm:rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1, 1)
          if (e.key === 'ArrowLeft') go(index - 1, -1)
        }}
      >
        <motion.div className="relative aspect-[5/6] sm:aspect-[16/10] lg:aspect-auto lg:h-[460px]" animate={{ backgroundColor: bg }} transition={{ duration: 0.6, ease }}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={slide.id}
              custom={dir}
              className="absolute inset-0"
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.55, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(index + 1, 1)
                else if (info.offset.x > 60 || info.velocity.x > 400) go(index - 1, -1)
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${n}: ${slide.title}`}
            >
              {slide.photo ? (
                // photo: bottom on mobile, right two-thirds on desktop, faded into the slide background
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] overflow-hidden sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[66%]" style={{ '--tone': bg }}>
                  <img
                    src={slide.photo.src}
                    alt=""
                    draggable={false}
                    fetchpriority={index === 0 ? 'high' : undefined}
                    className="size-full object-cover will-change-transform"
                    // Slow push-in driven by the slide's progress, so it pauses whenever the slideshow pauses.
                    style={{ transform: `scale(${1.08 - 0.07 * (reduced || userPaused ? 1 : progress)})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--tone),transparent_40%),linear-gradient(to_top,var(--tone),transparent_26%)] sm:bg-[linear-gradient(to_right,var(--tone),transparent_42%),linear-gradient(to_top,var(--tone),transparent_22%)]" />
                </div>
              ) : (
                // art: bottom on mobile, right half on desktop
                <div className="pointer-events-none absolute inset-x-0 bottom-10 h-[46%] [--art-k:0.62] sm:inset-y-0 sm:bottom-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[52%] sm:[--art-k:0.8] lg:[--art-k:1]">
                  <SlideArt art={slide.art} active />
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_255_255/0.10),transparent_55%)]" aria-hidden />

              <div className={`relative z-10 flex h-full flex-col p-5 sm:max-w-[56%] sm:justify-center sm:p-10 lg:p-14 ${light ? 'text-white' : 'text-ink-950'}`}>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45, ease }} className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ring-1 ring-inset backdrop-blur-md ${light ? 'bg-white/10 text-white ring-white/20' : 'bg-white/60 text-ink-800 ring-ink-950/10'}`}>
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: light ? '#3FD8FF' : '#3461FF' }} aria-hidden />
                  {slide.eyebrow}
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.5, ease }} className="mt-3 text-balance font-display text-[32px] font-extrabold leading-[0.98] tracking-[-0.045em] sm:mt-4 sm:text-[44px] lg:text-[60px]">
                  {slide.title}
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.5, ease }} className={`mt-2.5 line-clamp-2 max-w-md text-sm leading-5 sm:mt-3 sm:line-clamp-none sm:text-base sm:leading-6 ${light ? 'text-white/75' : 'text-ink-700'}`}>
                  {slide.body}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5, ease }} className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-6 sm:gap-x-5">
                  <Link
                    to={slide.to}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 pl-5 pr-2 text-sm font-semibold text-white shadow-glow transition-[background-color,transform] duration-200 hover:bg-brand-700 active:scale-[0.97] sm:h-12 sm:text-[15px]"
                  >
                    {slide.cta}
                    <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 sm:size-8">
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                  {slide.price && (
                    <span className={`flex flex-col leading-tight ${light ? 'text-white' : 'text-ink-950'}`}>
                      <span className={`text-[11px] font-medium uppercase tracking-[0.1em] ${light ? 'text-white/60' : 'text-ink-500'}`}>{/^From|^Starting/.test(slide.price) ? 'Starting at' : 'Offer price'}</span>
                      <span className="text-base font-bold num sm:text-lg">{slide.price.replace(/^(From|Starting)\s*/, '')}</span>
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className={`absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 px-5 pb-4 sm:px-10 sm:pb-5 lg:px-14 ${light ? 'text-white' : 'text-ink-950'}`}>
            <span className={`hidden font-display text-[13px] font-bold tabular-nums sm:block ${light ? 'text-white/80' : 'text-ink-600'}`} aria-hidden>
              {String(index + 1).padStart(2, '0')}
              <span className="opacity-50"> / {String(n).padStart(2, '0')}</span>
            </span>
            <div className="flex flex-1 gap-1.5 sm:max-w-[220px]" role="tablist" aria-label="Choose slide">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.title}`}
                  onClick={() => go(i)}
                  className="group relative h-6 flex-1"
                >
                  <span className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full ${light ? 'bg-white/25' : 'bg-ink-950/15'}`}>
                    <span
                      className={`absolute inset-y-0 left-0 rounded-full ${light ? 'bg-white' : 'bg-ink-950'}`}
                      style={{ width: i < index ? '100%' : i === index ? `${(reduced || userPaused ? 1 : progress) * 100}%` : '0%' }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <div className="ml-auto hidden items-center gap-1 sm:flex">
              <button type="button" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'} className={`grid size-9 place-items-center rounded-full transition-colors ${light ? 'hover:bg-white/15' : 'hover:bg-ink-950/10'}`}>
                {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
              <button type="button" onClick={() => go(index - 1, -1)} aria-label="Previous slide" className={`grid size-9 place-items-center rounded-full ring-1 ring-inset transition-colors ${light ? 'ring-white/30 hover:bg-white/15' : 'ring-ink-950/20 hover:bg-ink-950/10'}`}>
                <ChevronLeft className="size-4" />
              </button>
              <button type="button" onClick={() => go(index + 1, 1)} aria-label="Next slide" className={`grid size-9 place-items-center rounded-full ring-1 ring-inset transition-colors ${light ? 'ring-white/30 hover:bg-white/15' : 'ring-ink-950/20 hover:bg-ink-950/10'}`}>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Side promos: stacked on desktop, side-by-side strip on mobile */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
        {sidePromos.map((p) => {
          const lightText = p.fg === 'light'
          return (
            <Link
              key={p.id}
              to={p.to}
              className={`group relative flex min-h-[108px] flex-col overflow-hidden rounded-2xl p-4 sm:rounded-3xl transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-card sm:min-h-[148px] sm:p-5 lg:min-h-0 ${p.gradient ? 'bg-brand-grad' : ''} ${lightText ? 'text-white' : 'text-ink-950'}`}
              style={p.gradient ? undefined : { backgroundColor: p.bg }}
            >
              <h3 className="relative z-10 max-w-[70%] font-display text-lg sm:max-w-none font-bold leading-tight tracking-[-0.02em] sm:text-xl">{p.title}</h3>
              <p className={`relative z-10 mt-1 hidden max-w-[62%] text-[13px] leading-[18px] sm:block ${lightText ? 'text-white/85' : 'text-ink-600'}`}>{p.body}</p>
              <span className="relative z-10 mt-auto inline-flex items-center gap-1 whitespace-nowrap pt-3 text-[13px] font-semibold leading-tight">
                {p.cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              {p.photo ? (
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] sm:w-[64%]" style={{ '--tone': p.tone ?? p.bg }}>
                  <Photo src={p.photo.src} className="size-full" imgClassName="group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--tone)_2%,transparent_70%)]" />
                </div>
              ) : (
                <div className="pointer-events-none absolute right-1.5 top-2 w-[28%] sm:bottom-1 sm:top-auto sm:w-[34%] transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:scale-[1.03] lg:bottom-0 lg:right-2 lg:w-[42%]">
                  <ProductArt kind={p.art.kind} color={p.art.color} framed={false} className="aspect-square w-full" title="" />
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
