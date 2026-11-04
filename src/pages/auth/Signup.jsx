import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { AuthShell, FormError } from '../../components/auth/AuthShell'
import { Checkbox, PasswordField, TextField } from '../../components/form/Field'
import { PasswordChecklist } from '../../components/auth/PasswordChecklist'
import { Button } from '../../components/ui/Button'
import * as v from '../../lib/validate'

export default function Signup() {
  const { user, signUp } = useAccount()
  const { toast } = useStore()
  const [params] = useSearchParams()
  const next = params.get('next') || '/account'
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', email: '', phone: '', password: '', agree: false })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.title = 'Create account · BAZAAR'
  }, [])
  useEffect(() => {
    if (user && !busy) navigate(next, { replace: true })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : k === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value
    setValues((s) => ({ ...s, [k]: val }))
    setErrors((s) => ({ ...s, [k]: '' }))
    setFormError('')
  }
  const blur = (k, fn) => () => values[k] && setErrors((s) => ({ ...s, [k]: fn(values[k]) }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = v.validate(values, { name: v.name, email: v.email, phone: v.phone, password: v.password, agree: (x) => (x ? '' : 'Please accept the terms to continue') })
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`su-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setBusy(true)
    const res = await signUp({ ...values, phone: v.cleanPhone(values.phone) })
    setBusy(false)
    if (!res.ok) {
      if (res.field) setErrors({ [res.field]: res.error })
      else setFormError(res.error)
      return
    }
    toast({ title: `Welcome to Bazaar, ${res.user.name.split(' ')[0]}` })
    navigate(next, { replace: true })
  }

  return (
    <AuthShell title="Create your account" subtitle="It takes a minute. Your cart and wishlist come with you.">
      <FormError>{formError}</FormError>
      <form noValidate onSubmit={submit} className="space-y-4">
        <TextField id="su-name" label="Full name" autoComplete="name" value={values.name} onChange={set('name')} onBlur={blur('name', v.name)} error={errors.name} placeholder="As on your ID" autoFocus />
        <TextField id="su-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} onBlur={blur('email', v.email)} error={errors.email} placeholder="you@example.com" />
        <TextField id="su-phone" label="Mobile number" type="tel" inputMode="numeric" autoComplete="tel-national" prefix="+91" value={values.phone} onChange={set('phone')} onBlur={blur('phone', v.phone)} error={errors.phone} hint="For delivery updates. We never share it." placeholder="98765 43210" />
        <div>
          <PasswordField id="su-password" label="Password" autoComplete="new-password" value={values.password} onChange={set('password')} error={errors.password} />
          <PasswordChecklist value={values.password} />
        </div>
        <div>
          <Checkbox
            id="su-agree"
            checked={values.agree}
            onChange={set('agree')}
            label={
              <>
                I agree to Bazaar’s{' '}
                <Link to="/help#terms" target="_blank" className="font-medium underline underline-offset-2">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link to="/help#privacy" target="_blank" className="font-medium underline underline-offset-2">
                  Privacy Policy
                </Link>
              </>
            }
          />
          {errors.agree && (
            <p className="mt-1.5 pl-8 text-xs text-danger-700" role="alert">
              {errors.agree}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy && <Loader2 className="size-4 animate-spin" />} {busy ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-8 text-sm text-ink-600">
        Already have an account?{' '}
        <Link to={`/login${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}`} className="font-semibold text-ink-950 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-950">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}
