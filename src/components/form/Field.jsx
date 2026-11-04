import { forwardRef, useId, useState } from 'react'
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'

export const inputCls =
  'h-11 w-full rounded-md bg-white px-3.5 text-[15px] text-ink-950 ring-1 ring-inset ring-ink-200 transition-shadow placeholder:text-ink-400 hover:ring-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:ring-danger-600 disabled:bg-ink-50 disabled:text-ink-500'

export function FieldShell({ id, label, hint, error, optional, children, className = '', action }) {
  return (
    <div className={className}>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <label htmlFor={id} className="text-[13px] font-medium text-ink-800">
            {label} {optional && <span className="font-normal text-ink-400">(optional)</span>}
          </label>
          {action}
        </div>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-xs text-danger-700" role="alert">
          <AlertCircle className="mt-px size-3.5 shrink-0" /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export const TextField = forwardRef(function TextField({ label, hint, error, optional, className = '', prefix, suffix, action, id: idProp, inputClassName = '', ...props }, ref) {
  const auto = useId()
  const id = idProp ?? auto
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className} action={action}>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-ink-500">{prefix}</span>}
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`${inputCls} ${prefix ? 'pl-12' : ''} ${suffix ? 'pr-12' : ''} ${inputClassName}`}
          {...props}
        />
        {suffix && <span className="absolute right-1.5 top-1/2 -translate-y-1/2">{suffix}</span>}
      </div>
    </FieldShell>
  )
})

export function PasswordField(props) {
  const [show, setShow] = useState(false)
  return (
    <TextField
      {...props}
      type={show ? 'text' : 'password'}
      suffix={
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="grid size-9 place-items-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900">
          {show ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
        </button>
      }
    />
  )
}

export function SelectField({ label, hint, error, optional, className = '', children, id: idProp, ...props }) {
  const auto = useId()
  const id = idProp ?? auto
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <select id={id} aria-invalid={!!error} className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%236b6c64%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10`} {...props}>
        {children}
      </select>
    </FieldShell>
  )
}

export function TextArea({ label, hint, error, optional, className = '', id: idProp, ...props }) {
  const auto = useId()
  const id = idProp ?? auto
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea id={id} aria-invalid={!!error} className={`${inputCls} h-auto min-h-[110px] py-2.5 leading-6`} {...props} />
    </FieldShell>
  )
}

export function Checkbox({ label, description, className = '', ...props }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 ${className}`}>
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
        <input type="checkbox" className="peer absolute inset-0 cursor-pointer appearance-none rounded-[5px] bg-white ring-1 ring-inset ring-ink-300 transition-colors checked:bg-ink-950 checked:ring-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950" {...props} />
        <Check className="pointer-events-none relative size-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
      </span>
      <span className="text-sm leading-5 text-ink-800">
        {label}
        {description && <span className="block text-xs text-ink-500">{description}</span>}
      </span>
    </label>
  )
}

/** A selectable card that behaves as a radio button. */
export function RadioCard({ name, value, checked, onChange, children, className = '', disabled }) {
  return (
    <label className={`relative flex cursor-pointer gap-3.5 rounded-lg p-4 ring-1 ring-inset transition-[box-shadow,background-color] ${checked ? 'bg-white ring-2 ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'} ${disabled ? 'pointer-events-none opacity-50' : ''} ${className}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" />
      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ring-1 ring-inset peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink-950 ${checked ? 'bg-ink-950 ring-ink-950' : 'bg-white ring-ink-300'}`}>
        <span className={`size-2 rounded-full bg-white transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </label>
  )
}

/** Small pill showing a status, coloured by tone. */
export function StatusPill({ tone = 'ink', children, className = '' }) {
  const t = {
    ink: 'bg-ink-100 text-ink-800',
    brand: 'bg-brand-50 text-brand-700',
    save: 'bg-save-50 text-save-700',
    muted: 'bg-ink-100 text-ink-500',
  }[tone]
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${t} ${className}`}>{children}</span>
}
