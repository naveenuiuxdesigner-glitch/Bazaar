import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '../ui/Skeleton'

/** Horizontal, scroll-snapping product row with edge-aware arrow controls. */
export function ProductRail({ products, loading, skeletons = 6, renderItem, label, itemClass = 'w-[46%] sm:w-[31%] md:w-[23.5%] lg:w-[18.6%]' }) {
  const ref = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = () => {
    const el = ref.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }
  useEffect(() => {
    update()
    const el = ref.current
    const ro = new ResizeObserver(update)
    if (el) ro.observe(el)
    return () => ro.disconnect()
  }, [products, loading])

  const scroll = (d) => {
    const el = ref.current
    el.scrollBy({ left: d * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  const btn = 'absolute top-[calc(var(--img-h,40%)/2)] z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-900 shadow-pop ring-1 ring-ink-950/5 transition-[opacity,transform,background-color,color] duration-200 hover:scale-105 hover:bg-ink-950 hover:text-white active:scale-95 md:grid'

  return (
    <div className="group/rail relative">
      <ul ref={ref} onScroll={update} aria-label={label} className="scrollbar-none -mx-4 -my-3 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-3 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-3 lg:scroll-px-3 lg:gap-4 lg:px-3">
        {loading
          ? Array.from({ length: skeletons }).map((_, i) => (
              <li key={i} className={`shrink-0 snap-start ${itemClass}`}>
                <ProductCardSkeleton />
              </li>
            ))
          : products.map((p, i) => (
              <li key={p.id} className={`shrink-0 snap-start ${itemClass}`}>
                {renderItem ? renderItem(p, i) : <ProductCard product={p} />}
              </li>
            ))}
      </ul>
      {!loading && (
        <>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left" className={`${btn} -left-5 ${edges.start ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover/rail:opacity-100 focus-visible:opacity-100'}`} style={{ top: '34%' }}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll right" className={`${btn} -right-5 ${edges.end ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover/rail:opacity-100 focus-visible:opacity-100'}`} style={{ top: '34%' }}>
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </div>
  )
}
