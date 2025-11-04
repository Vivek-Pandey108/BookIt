
import { useParams, Link } from 'react-router-dom'

export default function Result() {
  const { ref } = useParams()
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <div className="size-16 rounded-full bg-green-500" />
      <h1 className="text-2xl font-semibold">Booking Confirmed</h1>
      <p className="text-gray-600">Ref ID: {ref}</p>
      <Link to="/" className="btn-soft mt-4">Back to Home</Link>
    </div>
  )
}
