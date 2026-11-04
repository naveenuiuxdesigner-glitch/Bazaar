import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { SelectField, TextField } from '../../components/form/Field'
import { Button } from '../../components/ui/Button'
import { PageTitle } from './AccountLayout'
import * as v from '../../lib/validate'

export default function Profile() {
  const { user, updateProfile } = useAccount()
  const { toast } = useStore()
  const [vals, setVals] = useState({ name: user.name, email: user.email, phone: user.phone, gender: user.gender ?? '', dob: user.dob ?? '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const dirty = Object.entries(vals).some(([k, x]) => (user[k] ?? '') !== x)

  useEffect(() => {
    document.title = 'Profile · BAZAAR'
  }, [])

  const set = (k) => (e) => {
    const x = k === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value
    setVals((s) => ({ ...s, [k]: x }))
    setErrors((s) => ({ ...s, [k]: '' }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = v.validate(vals, {
      name: v.name,
      email: v.email,
      phone: v.phone,
      dob: (x) => {
        if (!x) return ''
        const age = (Date.now() - new Date(x).getTime()) / (365.25 * 86400000)
        return age < 13 ? 'You must be at least 13 to shop on Bazaar' : age > 110 ? 'Check the year' : ''
      },
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    const res = await updateProfile({ ...vals, name: vals.name.trim(), email: vals.email.trim() })
    setBusy(false)
    if (!res.ok) return setErrors({ [res.field]: res.error })
    toast({ title: 'Profile updated' })
  }

  return (
    <div className="max-w-[640px]">
      <PageTitle title="Profile" subtitle="Your name and contact details for orders and receipts." />
      <form noValidate onSubmit={submit} className="space-y-4">
        <TextField label="Full name" autoComplete="name" value={vals.name} onChange={set('name')} error={errors.name} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Email" type="email" autoComplete="email" value={vals.email} onChange={set('email')} error={errors.email} hint="Used to sign in" />
          <TextField label="Mobile number" type="tel" inputMode="numeric" prefix="+91" value={vals.phone} onChange={set('phone')} error={errors.phone} />
          <SelectField label="Gender" optional value={vals.gender} onChange={set('gender')}>
            <option value="">Prefer not to say</option>
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
          </SelectField>
          <TextField label="Date of birth" optional type="date" value={vals.dob} onChange={set('dob')} error={errors.dob} hint="For birthday offers" />
        </div>
        <div className="flex gap-2.5 pt-2">
          <Button type="submit" disabled={busy || !dirty}>
            {busy && <Loader2 className="size-4 animate-spin" />} Save changes
          </Button>
          <Button variant="secondary" disabled={!dirty} onClick={() => setVals({ name: user.name, email: user.email, phone: user.phone, gender: user.gender ?? '', dob: user.dob ?? '' })}>
            Discard
          </Button>
        </div>
      </form>
    </div>
  )
}
