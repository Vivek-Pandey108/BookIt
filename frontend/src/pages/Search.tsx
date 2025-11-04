
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import ExperienceCard, { Experience } from '../components/ExperienceCard'

export default function Search() {
  const [params] = useSearchParams()
  const [items, setItems] = useState<Experience[]>([])
  useEffect(() => {
    const q = params.get('q') || ''
    api.get('/experiences', { params: { q } }).then(r => setItems(r.data.data))
  }, [params])

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(e => <ExperienceCard key={e._id} e={e} />)}
      {items.length === 0 && <p className="text-gray-500">No results.</p>}
    </div>
  )
}
