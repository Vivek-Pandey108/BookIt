
import { Link } from 'react-router-dom'

export type Experience = {
  _id: string
  title: string
  city?: string
  state?: string
  priceFrom: number
  description: string
  imageUrl: string
}

export default function ExperienceCard({ e }: { e: Experience }) {
  return (
    <div className="card overflow-hidden">
      <img src={e.imageUrl} alt={e.title} className="h-44 w-full object-cover" />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{e.title}</h3>
          {(e.city || e.state) && (
            <span className="badge">{[e.city, e.state].filter(Boolean).join(', ')}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{e.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            From <span className="text-base font-semibold">₹{e.priceFrom}</span>
          </div>
          <Link to={`/experiences/${e._id}`} className="btn-primary">View Details</Link>
        </div>
      </div>
    </div>
  )
}
