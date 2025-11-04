
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import PricePanel from '../components/PricePanel'

export default function Checkout() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  const [qty, setQty] = useState(Number(params.get('qty') || 1))
  const [exp, setExp] = useState<any>(null)
  const [discount, setDiscount] = useState(0)

  const experienceId = params.get('experienceId')
  const slotId = params.get('slotId')

  useEffect(() => {
    if (!experienceId) return
    api.get(`/experiences/${experienceId}`).then(r => setExp(r.data.data))
  }, [experienceId])

  const applyPromo = async () => {
    if (!promo) return
    const r = await api.post('/promo/validate', { code: promo, subtotal: (exp?.priceFrom||0)*qty })
    setDiscount(r.data.data.discountAmount || 0)
  }

  const total = useMemo(() => {
    const taxes = 59
    const base = (exp?.priceFrom || 0) * qty
    return base + taxes - discount
  }, [exp, qty, discount])

  const payAndConfirm = async () => {
    if (!name || !email || !experienceId || !slotId) return alert('Missing details')
    const r = await api.post('/bookings', {
      experienceId, slotId, qty, customer: { name, email }, promoCode: promo
    })
    navigate(`/result/${r.data.data.reference}`)
  }

  return (
    <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <div className="card space-y-4 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <input className="input" placeholder="Promo code" value={promo} onChange={e=>setPromo(e.target.value)} />
            <button className="btn-soft" onClick={applyPromo}>Apply</button>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="size-4" /> I agree to the terms and safety policy
          </label>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="card p-4">
          <div className="space-y-2 text-sm">
            <Row l="Experience" r={exp?.title||'—'} />
            <Row l="Date" r={params.get("date") || "—"} />
            <Row l="Time" r={params.get("time") || "—"} />
            <Row l="Qty" r={String(qty)} />
          </div>
        </div>
        <div className="card p-4">
          <PricePanel price={exp?.priceFrom||0} qty={qty} onQty={setQty} taxes={59} />
          {discount>0 && <p className="mt-2 text-sm text-green-600">Promo applied: −₹{discount}</p>}
          <button className="btn-primary mt-4 w-full" onClick={payAndConfirm}>Pay and Confirm</button>
          <p className="mt-2 text-right text-lg font-semibold">Total ₹{total}</p>
        </div>
      </aside>
    </div>
  )
}

function Row({ l, r }: { l: string; r: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{l}</span>
      <span className="font-medium">{r}</span>
    </div>
  )
}
