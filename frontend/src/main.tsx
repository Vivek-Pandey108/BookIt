
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Search from './pages/Search'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Result from './pages/Result'
import './styles.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/search', element: <Search /> },
      { path: '/experiences/:id', element: <Details /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/result/:ref', element: <Result /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
