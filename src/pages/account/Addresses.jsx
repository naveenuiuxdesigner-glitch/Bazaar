import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Plus } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { AddressForm, AddressLines } from '../../components/account/AddressForm'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/States'
import { PageTitle } from './AccountLayout'

export default function Addresses() {
  const { user, addresses, saveAddress, removeAddress, setDefaultAddress } = useAccount()
  const { toast, location } = useStore()
  const [editing, setEditing] = useState(null) // id | 'new'
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    document.title = 'Addresses · BAZAAR'
  }, [])

  const form = (id) => (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-5 ring-2 ring-ink-950 sm:p-6">
      <h2 className="mb-4 font-display text-lg font-bold">{id === 'new' ? 'Add a new address' : 'Edit address'}</h2>
      <AddressForm
        initial={id === 'new' ? null : addresses.find((a) => a.id === id)}
        defaults={id === 'new' ? { name: user.name, phone: user.phone, pincode: location.pincode, city: location.city } : null}
        onCancel={() => setEditing(null)}
        onSave={(a) => {
          saveAddress(a)
          setEditing(null)
          toast({ title: id === 'new' ? 'Address added' : 'Address updated' })
        }}
      />
    </motion.div>
  )

  return (
    <div className="max-w-[860px]">
      <PageTitle title="Addresses" subtitle="Where we deliver your orders and pick up returns.">
        {editing !== 'new' && (
          <Button onClick={() => setEditing('new')}>
            <Plus className="size-4" /> Add address
          </Button>
        )}
      </PageTitle>
      <AnimatePresence>{editing === 'new' && <div className="mb-5">{form('new')}</div>}</AnimatePresence>
      {addresses.length === 0 && editing !== 'new' ? (
        <EmptyState icon={MapPin} title="No saved addresses" body="Add one now to check out faster.">
          <Button onClick={() => setEditing('new')}>Add address</Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {addresses.map((a) =>
            editing === a.id ? (
              <li key={a.id} className="md:col-span-2">{form(a.id)}</li>
            ) : (
              <li key={a.id} className={`flex flex-col rounded-xl p-5 ring-1 ring-inset ${a.isDefault ? 'ring-ink-400' : 'ring-ink-150'}`}>
                {a.isDefault && <span className="mb-2 self-start rounded-full bg-ink-950 px-2 py-0.5 text-[11px] font-semibold text-white">Default</span>}
                <AddressLines a={a} />
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink-150 pt-3 text-[13px] font-semibold">
                  <button type="button" onClick={() => setEditing(a.id)} className="text-ink-950 underline underline-offset-2">Edit</button>
                  {confirm === a.id ? (
                    <span className="flex items-center gap-3">
                      <span className="font-normal text-ink-600">Remove this address?</span>
                      <button type="button" onClick={() => { removeAddress(a.id); setConfirm(null); toast({ title: 'Address removed' }) }} className="text-danger-700">Remove</button>
                      <button type="button" onClick={() => setConfirm(null)} className="text-ink-600">Keep</button>
                    </span>
                  ) : (
                    <button type="button" onClick={() => setConfirm(a.id)} className="text-ink-600 hover:text-ink-950">Remove</button>
                  )}
                  {!a.isDefault && confirm !== a.id && (
                    <button type="button" onClick={() => { setDefaultAddress(a.id); toast({ title: 'Default address updated' }) }} className="text-ink-600 hover:text-ink-950">Set as default</button>
                  )}
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  )
}
