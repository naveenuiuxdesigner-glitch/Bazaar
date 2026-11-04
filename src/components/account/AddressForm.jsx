import { useState } from 'react'
import { Loader2, LocateFixed } from 'lucide-react'
import { Checkbox, SelectField, TextField } from '../form/Field'
import { Button } from '../ui/Button'
import { lookupPincode, stateFor, STATE_NAMES } from '../../data/locations'
import * as v from '../../lib/validate'

const EMPTY = { name: '', phone: '', pincode: '', line1: '', line2: '', landmark: '', city: '', state: '', type: 'Home', isDefault: false }

/** Add or edit a delivery address, with pincode lookup that fills the city and state. */
export function AddressForm({ initial, defaults, onSave, onCancel, submitLabel = 'Save address', compact }) {
  const [a, setA] = useState(() => ({ ...EMPTY, ...defaults, ...initial }))
  const [errors, setErrors] = useState({})
  const [pinState, setPinState] = useState({ loading: false, note: '' })
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (k === 'phone') val = val.replace(/\D/g, '').slice(0, 10)
    if (k === 'pincode') val = val.replace(/\D/g, '').slice(0, 6)
    setA((s) => ({ ...s, [k]: val }))
    setErrors((s) => ({ ...s, [k]: '' }))
    if (k === 'pincode' && val.length === 6) checkPin(val)
  }

  const checkPin = async (pin) => {
    setPinState({ loading: true, note: '' })
    const res = await lookupPincode(pin)
    if (res.ok) {
      setA((s) => ({ ...s, city: res.location.city, state: stateFor(pin) || s.state, line2: s.line2 || res.location.area }))
      setPinState({ loading: false, note: `Delivering to ${res.location.city}` })
    } else {
      setPinState({ loading: false, note: '' })
      setErrors((s) => ({ ...s, pincode: res.error }))
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = v.validate(a, {
      name: v.name,
      phone: v.phone,
      pincode: v.pincode,
      line1: (x) => v.required(x, 'House, flat or building'),
      line2: (x) => v.required(x, 'Area or street'),
      city: (x) => v.required(x, 'City'),
      state: (x) => v.required(x, 'State'),
    })
    if (errors.pincode && !errs.pincode) errs.pincode = errors.pincode
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`addr-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setBusy(true)
    await new Promise((r) => setTimeout(r, 350))
    setBusy(false)
    onSave({ ...a, name: a.name.trim(), line1: a.line1.trim(), line2: a.line2.trim(), landmark: a.landmark.trim() })
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="addr-name" label="Full name" autoComplete="name" value={a.name} onChange={set('name')} error={errors.name} />
        <TextField id="addr-phone" label="Mobile number" type="tel" inputMode="numeric" prefix="+91" autoComplete="tel-national" value={a.phone} onChange={set('phone')} error={errors.phone} hint="The delivery partner may call this number" />
        <TextField
          id="addr-pincode"
          label="Pincode"
          inputMode="numeric"
          autoComplete="postal-code"
          value={a.pincode}
          onChange={set('pincode')}
          error={errors.pincode}
          hint={pinState.note || 'We’ll fill the city and state'}
          suffix={pinState.loading ? <Loader2 className="mr-2 size-4 animate-spin text-ink-400" /> : a.pincode.length === 6 && !errors.pincode ? <LocateFixed className="mr-2 size-4 text-save-700" /> : null}
        />
        <TextField id="addr-line1" label="House, flat or building" autoComplete="address-line1" value={a.line1} onChange={set('line1')} error={errors.line1} placeholder="Flat 12B, Lake View Apartments" />
        <TextField id="addr-line2" className="sm:col-span-2" label="Area, street or locality" autoComplete="address-line2" value={a.line2} onChange={set('line2')} error={errors.line2} />
        <TextField id="addr-landmark" label="Landmark" optional value={a.landmark} onChange={set('landmark')} placeholder="Near City Mall" />
        <TextField id="addr-city" label="City" autoComplete="address-level2" value={a.city} onChange={set('city')} error={errors.city} />
        <SelectField id="addr-state" label="State" value={a.state} onChange={set('state')} error={errors.state} className={compact ? '' : 'sm:col-span-1'}>
          <option value="">Select state</option>
          {STATE_NAMES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </SelectField>
      </div>
      <fieldset>
        <legend className="mb-2 text-[13px] font-medium text-ink-800">Address type</legend>
        <div className="flex gap-2">
          {['Home', 'Work', 'Other'].map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="addr-type" value={t} checked={a.type === t} onChange={set('type')} className="peer sr-only" />
              <span className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium ring-1 ring-inset ring-ink-200 peer-checked:bg-ink-950 peer-checked:text-white peer-checked:ring-ink-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink-950">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <Checkbox label="Make this my default address" checked={a.isDefault} onChange={set('isDefault')} />
      <div className="flex gap-2.5 pt-1">
        <Button type="submit" disabled={busy}>
          {busy && <Loader2 className="size-4 animate-spin" />} {submitLabel}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export function AddressLines({ a, className = '' }) {
  return (
    <div className={`text-sm leading-6 text-ink-700 ${className}`}>
      <p className="font-semibold text-ink-950">
        {a.name} <span className="ml-1.5 rounded-sm bg-ink-100 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-600">{a.type}</span>
      </p>
      <p>{a.line1}, {a.line2}{a.landmark ? `, ${a.landmark}` : ''}</p>
      <p>{a.city}, {a.state} <span className="num">{a.pincode}</span></p>
      <p className="text-ink-500 num">+91 {a.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</p>
    </div>
  )
}
