
import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import PricePanel from '../components/PricePanel'

type Slot = { _id: string; date: string; time: string; capacity: number; bookedCount: number }
type Exp = {
  _id: string; title: string; description: string; imageUrl: string; priceFrom: number;
  city?: string; state?: string; slots: Slot[];
}

export default function Details() {
  const { id } = useParams()
  const [exp, setExp] = useState<Exp | null>(null)
  const [date, setDate] = useState('')
  const [slotId, setSlotId] = useState('')
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    api.get(`/experiences/${id}`).then(r => {
      setExp(r.data.data)
      const first = r.data.data.slots?.[0]
      if (first) { setDate(first.date); setSlotId(first._id) }
    })
  }, [id])

  const dates = useMemo(() => Array.from(new Set(exp?.slots.map(s => s.date) ?? [])), [exp])
  const daySlots = useMemo(() => exp?.slots.filter(s => s.date === date) ?? [], [exp, date])
  const selected = daySlots.find(s => s._id === slotId)

  if (!exp) return <div className="py-10">Loading...</div>

  const confirm = () => {
  if (!selected) return;
  const params = new URLSearchParams({
    experienceId: exp._id,
    slotId: selected._id,
    qty: String(qty),
    date: selected.date,
    time: selected.time
  });
  navigate(`/checkout?${params.toString()}`);
};


  return (
    <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <img src={exp.imageUrl} alt={exp.title} className="h-80 w-full rounded-2xl object-cover" />
        <h1 className="mt-6 text-3xl font-semibold">{exp.title}</h1>
        <p className="mt-2 max-w-2xl text-gray-600">{exp.description}</p>

        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold">Choose date</h3>
          <div className="flex flex-wrap gap-3">
            {dates.map(d => (
              <button key={d}
                onClick={() => setDate(d)}
                className={`btn ${d===date? 'bg-brand-yellow':'bg-gray-100 hover:bg-gray-200'}`}>{new Date(d).toDateString().slice(4,10)}</button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold">Choose time</h3>
          <div className="flex flex-wrap gap-3">
            {daySlots.map(s => {
              const left = s.capacity - s.bookedCount
              const sold = left <= 0
              return (
                <button key={s._id}
                  disabled={sold}
                  onClick={() => setSlotId(s._id)}
                  className={`btn ${sold? 'bg-gray-100 text-gray-400 cursor-not-allowed':'bg-white border border-gray-300'} ${slotId===s._id? 'ring-2 ring-brand-yellow':''}`}>
                  {s.time}
                  <span className="ml-2 text-xs text-gray-500">{sold? 'Sold out' : `${left} left`}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-gray-500">All times are in IST (GMT +5:30)</p>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-sm font-semibold">About</h3>
          <div className="input bg-gray-100">Scenic routes, trained guides, and safety briefing. Minimum age 10.</div>
        </div>
      </div>

      <PricePanel price={exp.priceFrom} qty={qty} onQty={setQty} onConfirm={confirm} />
    </div>
  )
}
