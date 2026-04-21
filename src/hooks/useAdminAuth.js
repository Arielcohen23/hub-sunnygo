import { useState } from 'react'

const SESSION_KEY = 'sunnygo_admin_session'
const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'sunnygo_admin_2026'

export default function useAdminAuth() {
  const [isAuth, setIsAuth] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })

  function login(password) {
    const effectivePassword = sessionStorage.getItem('sunnygo_admin_password_override') || PASSWORD
    if (password === effectivePassword) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuth(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuth(false)
  }

  return { isAuth, login, logout }
}
