import { useEffect, useState } from 'react'
import { Loader2, LogOut, Monitor, Smartphone } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { PasswordField } from '../../components/form/Field'
import { PasswordChecklist } from '../../components/auth/PasswordChecklist'
import { Button } from '../../components/ui/Button'
import { PageTitle } from './AccountLayout'
import { timeAgo } from '../../lib/dates'
import * as v from '../../lib/validate'

export default function Security() {
  const { user, changePassword, signOut, now } = useAccount()
  const { toast } = useStore()
  const [vals, setVals] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    document.title = 'Login & security · BAZAAR'
  }, [])

  const set = (k) => (e) => {
    setVals((s) => ({ ...s, [k]: e.target.value }))
    setErrors((s) => ({ ...s, [k]: '' }))
  }
  const submit = async (e) => {
    e.preventDefault()
    const errs = v.validate(vals, {
      current: (x) => (x ? '' : 'Enter your current password'),
      next: (x, all) => v.password(x) || (x === all.current ? 'Choose a password you haven’t used here' : ''),
      confirm: (x, all) => (x === all.next ? '' : 'Passwords don’t match'),
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    const res = await changePassword(vals.current, vals.next)
    setBusy(false)
    if (!res.ok) return setErrors({ [res.field]: res.error })
    setVals({ current: '', next: '', confirm: '' })
    toast({ title: 'Password changed' })
  }

  const ua = navigator.userAgent
  const device = /iPhone|Android/i.test(ua) ? 'Phone browser' : /Mac/i.test(ua) ? 'Mac · Browser' : /Windows/i.test(ua) ? 'Windows · Browser' : 'This browser'

  return (
    <div className="max-w-[640px]">
      <PageTitle title="Login & security" subtitle={`Signed in as ${user.email}`} />
      <section>
        <h2 className="font-display text-lg font-bold">Change password</h2>
        <form noValidate onSubmit={submit} className="mt-4 space-y-4">
          <PasswordField label="Current password" autoComplete="current-password" value={vals.current} onChange={set('current')} error={errors.current} />
          <div>
            <PasswordField label="New password" autoComplete="new-password" value={vals.next} onChange={set('next')} error={errors.next} />
            <PasswordChecklist value={vals.next} />
          </div>
          <PasswordField label="Confirm new password" autoComplete="new-password" value={vals.confirm} onChange={set('confirm')} error={errors.confirm} />
          <Button type="submit" disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />} Update password</Button>
        </form>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-lg font-bold">Where you’re signed in</h2>
        <ul className="mt-4 divide-y divide-ink-150 rounded-xl ring-1 ring-inset ring-ink-150">
          <li className="flex items-center gap-3 p-4">
            {/Phone/.test(device) ? <Smartphone className="size-5 text-ink-500" /> : <Monitor className="size-5 text-ink-500" />}
            <span className="flex-1">
              <span className="block text-sm font-semibold">{device}</span>
              <span className="text-xs text-save-700">This device · active now</span>
            </span>
          </li>
          {user.id === 'u_aarav' && <li className="flex items-center gap-3 p-4">
            <Smartphone className="size-5 text-ink-500" />
            <span className="flex-1">
              <span className="block text-sm font-semibold">Bazaar app on Android</span>
              <span className="text-xs text-ink-500">Bengaluru · last active {timeAgo(now - 2 * 86400000, now)}</span>
            </span>
          </li>}
        </ul>
        <Button variant="secondary" className="mt-4" onClick={signOut}><LogOut className="size-4" /> Sign out of this device</Button>
      </section>
    </div>
  )
}
