
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function App() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-24">
        <Outlet />
      </main>
    </div>
  )
}
