export const Skeleton = ({ className = '' }) => <div className={`skeleton rounded-md ${className}`} aria-hidden />

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-2 ring-1 ring-inset ring-ink-950/[0.05]" aria-hidden>
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}
