import { formatPrice } from '../../lib/format'

export function Price({ price, mrp, discount, size = 'md', className = '' }) {
  const big = { sm: 'text-[15px]', md: 'text-[18px]', lg: 'text-[30px]' }[size]
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${className}`}>
      <span className={`font-bold tracking-[-0.02em] text-ink-950 num ${big}`}>{formatPrice(price)}</span>
      {discount > 0 && (
        <>
          <span className={`text-ink-500 line-through num ${size === 'lg' ? 'text-base' : 'text-[13px]'}`}>
            <span className="sr-only">MRP </span>
            {formatPrice(mrp)}
          </span>
          <span className={`font-semibold text-save-700 num ${size === 'lg' ? 'text-base' : 'text-[13px]'}`}>{discount}% off</span>
        </>
      )}
    </div>
  )
}
