import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, MailCheck } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { AuthShell, FormError } from '../../components/auth/AuthShell'
import { PasswordField, TextField } from '../../components/form/Field'
import { PasswordChecklist } from '../../components/auth/PasswordChecklist'
import { Button } from '../../components/ui/Button'
import * as v from '../../lib/validate'

export default function ForgotPassword() {
  const { requestReset, resetPassword } = useAccount()
  const { toast } = useStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState(params.get('email') ?? '')
  const [sentCode, setSentCode] = useState('')
  const [code, setCode] = useState('')
  const [pw, setPw] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.title = 'Reset password · BAZAAR'
  }, [])

  const send = async (e) => {
    e?.preventDefault()
    const err = v.email(email)
    setErrors({ email: err })
    if (err) return
    setBusy(true)
    const res = await requestReset(email)
    setBusy(false)
    if (!res.ok) return setErrors({ email: res.error })
    setSentCode(res.code)
    setStep('code')
  }

  const reset = async (e) => {
    e.preventDefault()
    const errs = v.validate({ code, pw }, { code: (x) => (/^\d{6}$/.test(x) ? '' : 'Enter the 6-digit code'), pw: v.password })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    const res = await resetPassword(email, code, pw)
    setBusy(false)
    if (!res.ok) return res.field ? setErrors({ [res.field]: res.error }) : setFormError(res.error)
    setStep('done')
    toast({ title: 'Password updated' })
  }

  return (
    <AuthShell title="Reset your password" subtitle={step === 'done' ? '' : 'We’ll send a one-time code to your email.'}>
      <FormError>{formError}</FormError>
      {step === 'email' && (
        <form noValidate onSubmit={send} className="space-y-4">
          <TextField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} autoFocus />
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="size-4 animate-spin" />} Send code
          </Button>
        </form>
      )}
      {step === 'code' && (
        <form noValidate onSubmit={reset} className="space-y-4">
          <div className="flex gap-3 rounded-lg bg-ink-50 p-4 ring-1 ring-inset ring-ink-150">
            <MailCheck className="size-5 shrink-0 text-ink-600" />
            <div className="text-[13px] text-ink-700">
              We sent a code to <span className="font-semibold text-ink-950">{email}</span>.
              <span className="mt-1 block text-ink-500">
                This demo doesn’t send email, so here it is: <span className="font-mono font-semibold tracking-widest text-ink-950">{sentCode}</span>
              </span>
            </div>
          </div>
          <TextField label="6-digit code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} error={errors.code} inputClassName="font-mono tracking-[0.4em]" autoFocus />
          <div>
            <PasswordField label="New password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.pw} />
            <PasswordChecklist value={pw} />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="size-4 animate-spin" />} Update password
          </Button>
          <button type="button" onClick={send} className="text-[13px] font-medium text-ink-600 underline underline-offset-2 hover:text-ink-950">
            Send a new code
          </button>
        </form>
      )}
      {step === 'done' && (
        <div>
          <CheckCircle2 className="size-10 text-save-700" />
          <p className="mt-4 text-[15px] text-ink-700">Your password has been updated. Sign in with your new password.</p>
          <Button size="lg" className="mt-6 w-full" onClick={() => navigate(`/login?email=${encodeURIComponent(email)}`)}>
            Go to sign in
          </Button>
        </div>
      )}
      {step !== 'done' && (
        <p className="mt-8 text-sm text-ink-600">
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-ink-950 underline underline-offset-4 decoration-ink-300">
            Back to sign in
          </Link>
        </p>
      )}
    </AuthShell>
  )
}
