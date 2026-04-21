import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link, Navigate } from 'react-router-dom'
import useAdminAuth from '../../hooks/useAdminAuth'
import logoBlanc from '../../assets/logo-blanc.png'

const navItems = [
  { path: '/admin/produits', icon: '📦', label: 'Produits' },
  { path: '/admin/vedette', icon: '⭐', label: 'Vedette' },
  { path: '/admin/documents', icon: '📄', label: 'Documents' },
  { path: '/admin/apparence', icon: '🎨', label: 'Apparence' },
  { path: '/admin/parametres', icon: '🔧', label: 'Paramètres' },
]

export default function AdminLayout() {
  const { isAuth, logout } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuth) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAuth, navigate])

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />
  }

  function isActive(path) {
    if (path === '/admin/produits') {
      return location.pathname.startsWith('/admin/produits')
    }
    return location.pathname === path
  }

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Quicksand, sans-serif' }}>

      {/* ── TOP NAVBAR ── */}
      <div
        style={{
          height: '60px',
          background: '#04255B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {/* Left: logo + title + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logoBlanc} alt="SunnyGo" style={{ height: '36px', width: 'auto' }} />
          <span
            style={{
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              color: 'white',
            }}
          >
            Admin SunnyGo
          </span>
          <span
            style={{
              background: '#FDC71C',
              color: '#04255B',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: '50px',
            }}
          >
            MODE ADMIN
          </span>
        </div>

        {/* Right: portal link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/"
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            ← Voir le portail
          </Link>
        </div>
      </div>

      {/* ── BODY (sidebar + content) ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <div
          style={{
            width: '220px',
            background: '#0A1628',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <nav style={{ flex: 1, padding: '16px 0' }}>
            {navItems.map(item => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 600,
                    color: active ? 'white' : 'rgba(255,255,255,0.6)',
                    background: active ? '#162CA1' : 'transparent',
                    borderLeft: active ? '3px solid #FDC71C' : '3px solid transparent',
                    textDecoration: 'none',
                    transition: 'background 0.15s, color 0.15s',
                    marginBottom: '2px',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.color = 'white'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                    }
                  }}
                >
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom: logout */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                fontSize: '12px',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
                e.currentTarget.style.color = '#FCA5A5'
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Déconnexion
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main
          style={{
            flex: 1,
            background: '#F8F7F4',
            overflowY: 'auto',
            minHeight: 0,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
