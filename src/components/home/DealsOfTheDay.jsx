import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Zap } from 'lucide-react'
import { catalog } from '../../services/catalog'
import { useAsync } from '../../hooks/useAsync'
import { useCountdown } from '../../hooks/useUi'
import { ProductRail } from '../product/ProductRail'
import { ProductCard } from '../product/ProductCard'
import { ErrorState } from '../ui/States'
import { Reveal } from '../ui/Motion'

const claimed = (id) => {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997
  return 38 + (h % 55)
}

function Countdown() {
  const end = useMemo(() => {
    const d = new Date()
    d.setHours(24, 0, 0, 0)
    return d.getTime()
  }, [])
  const { h, m, s } = useCountdown(end)
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <div className="flex items-center gap-2.5" role="timer" aria-label={`Deals end in ${h} hours ${m} minutes`}>
      <span className="text-[13px] font-medium text-ink-600">Ends in</span>
      <span className="flex items-start gap-1 num" aria-hidden>
        {[
          [h, 'hrs'],
          [m, 'min'],
          [s, 'sec'],
        ].map(([v, unit], i) => (
          <span key={unit} className="flex items-start gap-1">
            <span className="flex flex-col items-center">
              {/* seconds tick in coral so the urgency reads at a glance */}
              <span className={`grid h-9 min-w-9 place-items-center rounded-lg px-1.5 font-display text-[15px] font-bold text-white ${i === 2 ? 'bg-deal-600' : 'bg-ink-950'}`}>{pad(v)}</span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.08em] text-ink-500">{unit}</span>
            </span>
            {i < 2 && <span className="pt-1.5 font-bold text-ink-300">:</span>}
          </span>
        ))}
      </span>
    </div>
  )
}

export function DealsOfTheDay() {
  const { data, loading, error, retry } = useAsync(() => catalog.deals(14), [])
  return (
    <section aria-labelledby="deals-title" id="deals" className="relative isolate py-10 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-[radial-gradient(60%_80%_at_85%_0%,rgb(255_106_61/0.10),transparent_70%),linear-gradient(180deg,#FFF6F1,#FFFAF7_60%,#FFFFFF)] lg:py-16">
      <Reveal y={16} className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-4 sm:mb-7">
        <div>
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-deal-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            <Zap className="size-3.5 fill-current" /> Lightning deals
          </p>
          <h2 id="deals-title" className="font-display text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-950 sm:text-[32px]">
            Deals of the day
          </h2>
          <p className="mt-1.5 text-sm text-ink-500 sm:text-[15px]">Up to 60% off, refreshed every midnight. While stocks last.</p>
        </div>
        <div className="flex w-full items-center justify-between gap-5 sm:w-auto">
          <Countdown />
          <Link to="/deals" className="group inline-flex h-9 items-center gap-1 rounded-full bg-ink-950 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-deal-600">
            All deals <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
      {error ? (
        <ErrorState onRetry={retry} />
      ) : (
        <ProductRail
          label="Deals of the day"
          loading={loading}
          products={data ?? []}
          renderItem={(p) => {
            const pct = claimed(p.id)
            return (
              <div className="flex h-full flex-col">
                <ProductCard product={p} showDelivery={false} className="flex-1" />
                <div className="mt-2.5 px-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-deal-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Deal claimed">
                    <div className="h-full rounded-full bg-gradient-to-r from-deal-400 to-deal-600" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1.5 flex items-center justify-between text-xs text-ink-600 num">
                    <span>{pct}% claimed</span>
                    {pct >= 70 && (
                      <span className="inline-flex items-center gap-0.5 font-semibold text-deal-700">
                        <Flame className="size-3.5" aria-hidden /> Selling fast
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )
          }}
        />
      )}
    </section>
  )
}
