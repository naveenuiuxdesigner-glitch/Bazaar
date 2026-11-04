import { Check, Circle } from 'lucide-react'
import { passwordRules, passwordStrength } from '../../lib/validate'

const LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']

export function PasswordChecklist({ value }) {
  const rules = passwordRules(value)
  const s = passwordStrength(value)
  return (
    <div className="mt-2.5" aria-live="polite">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1" aria-hidden>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={`h-1 flex-1 rounded-full transition-colors ${value && s >= n ? (s >= 3 ? 'bg-save-600' : s === 2 ? 'bg-star' : 'bg-danger-600') : 'bg-ink-150'}`} />
          ))}
        </div>
        <span className="w-16 text-right text-xs font-medium text-ink-600">{value ? LABELS[s] : ''}</span>
      </div>
      <ul className="mt-2 space-y-1">
        {rules.map((r) => (
          <li key={r.id} className={`flex items-center gap-2 text-xs ${r.ok ? 'text-save-700' : 'text-ink-500'}`}>
            {r.ok ? <Check className="size-3.5" strokeWidth={3} /> : <Circle className="size-3" />}
            {r.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
