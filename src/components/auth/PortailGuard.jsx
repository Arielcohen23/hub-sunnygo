import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoginPortail from './LoginPortail'

export default function PortailGuard({ children }) {
  const location = useLocation()
  const isAdmin  = location.pathname.startsWith('/admin')

  const [auth, setAuth] = useState(() =>
    sessionStorage.getItem('portail_auth') === 'true'
  )

  // Les routes /admin ont leur propre auth — ne pas intercepter
  if (isAdmin) return children

  if (!auth) {
    return <LoginPortail onSuccess={() => setAuth(true)} />
  }

  return children
}
