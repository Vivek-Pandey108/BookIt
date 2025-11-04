
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import ExperienceCard, { Experience } from '../components/ExperienceCard'

export default function Home() {
  const [items, setItems] = useState<Experience[]>([])
  useEffect(() => {
    api.get('/experiences').then(r => setItems(r.data.data))
  }, [])

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(e => <ExperienceCard key={e._id} e={e} />)}
    </div>
  )
}
