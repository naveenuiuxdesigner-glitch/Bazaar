import { RefreshCw, SearchX } from 'lucide-react'
import { Button } from './Button'

export function ErrorState({ title = 'We couldn’t load this section', body = 'Check your connection and try again.', onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-xl bg-ink-50 px-6 py-12 text-center ring-1 ring-inset ring-ink-150">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">{body}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-5" onClick={onRetry}>
          <RefreshCw className="size-4" /> Try again
        </Button>
      )}
    </div>
  )
}

export function EmptyState({ icon: Icon = SearchX, title, body, children }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-ink-100">
        <Icon className="size-7 text-ink-500" />
      </span>
      <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink-950">{title}</h2>
      {body && <p className="mt-1.5 max-w-sm text-sm text-ink-500">{body}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-2.5">{children}</div>}
    </div>
  )
}
