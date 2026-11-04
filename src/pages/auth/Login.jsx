import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, Sparkles } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { AuthShell, FormError } from '../../components/auth/AuthShell'
import { PasswordField, TextField } from '../../components/form/Field'
import { Button } from '../../components/ui/Button'
import { DEMO } from '../../services/account'
import * as v from '../../lib/validate'

export default function Login() {
  const { user, signIn } = useAccount()
  const { toast } = useStore()
  const [params] = useSearchParams()
  const next = params.get('next') || '/account'
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: params.get('email') ?? '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.title = 'Sign in · BAZAAR'
  }, [])
  useEffect(() => {
    if (user && !busy) navigate(next, { replace: true })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => {
    setValues((s) => ({ ...s, [k]: e.target.value }))
    setErrors((s) => ({ ...s, [k]: '' }))
    setFormError('')
  }

  const submit = async (vals = values) => {
    const errs = v.validate(vals, { email: v.email, password: (x) => (x ? '' : 'Enter your password') })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    const res = await signIn(vals.email, vals.password)
    setBusy(false)
    if (!res.ok) {
      if (res.field) setErrors({ [res.field]: res.error })
      else setFormError(res.error)
      return
    }
    toast({ title: `Welcome back, ${res.user.name.split(' ')[0]}` })
    navigate(next, { replace: true })
  }

  return (
    <AuthShell title="Sign in" subtitle="Track orders, checkout faster and keep your wishlist in sync.">
      <FormError>{formError}</FormError>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="space-y-4"
      >
        <TextField label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" autoFocus />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          value={values.password}
          onChange={set('password')}
          error={errors.password}
          action={
            <Link to={`/forgot-password${values.email ? `?email=${encodeURIComponent(values.email)}` : ''}`} className="text-[13px] font-medium text-ink-600 underline-offset-2 hover:text-ink-950 hover:underline">
              Forgot password?
            </Link>
          }
        />
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy && <Loader2 className="size-4 animate-spin" />} {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className="mt-5 rounded-lg bg-ink-50 p-4 ring-1 ring-inset ring-ink-150">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink-950">
          <Sparkles className="size-4 text-brand-600" /> Try the demo account
        </p>
        <p className="mt-1 text-[13px] text-ink-600">
          Aarav Sharma has orders that are delivered, shipped, out for delivery, cancelled and returned.
          <span className="mt-1 block font-mono text-xs text-ink-700">
            {DEMO.email} · {DEMO.password}
          </span>
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-3"
          disabled={busy}
          onClick={() => {
            const vals = { email: DEMO.email, password: DEMO.password }
            setValues(vals)
            submit(vals)
          }}
        >
          Sign in as Aarav
        </Button>
      </div>

      <p className="mt-8 text-sm text-ink-600">
        New to Bazaar?{' '}
        <Link to={`/signup${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}`} className="font-semibold text-ink-950 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-950">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}
