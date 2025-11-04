
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  useEffect(() => setQ(params.get('q') ?? ''), [params])

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="logo.png"
            alt="Highway Delite"
            className="h-10 w-auto transition-transform duration-200 hover:scale-105"
          />
        </Link>
        <div className="ml-auto flex w-full max-w-xl gap-2">
          <input
            className="input"
            placeholder="Search experiences"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={() => navigate(`/search?q=${encodeURIComponent(q)}`)}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  )
}
