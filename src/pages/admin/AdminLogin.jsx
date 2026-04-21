import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAdminAuth from '../../hooks/useAdminAuth'
import logoBlanc from '../../assets/logo-blanc.png'

export default function AdminLogin() {
  const { login, isAuth } = useAdminAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuth) {
    navigate('/admin/produits', { replace: true })
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const ok = login(password)
      if (ok) {
        navigate('/admin/produits', { replace: true })
      } else {
        setError('Mot de passe incorrect')
        setPassword('')
      }
      setLoading(false)
    }, 300)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#04255B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand, sans-serif',
        padding: '16px',
      }}
    >
      {/* Background decorative circles */}
      <div style={{
        position: 'fixed', top: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(253,199,28,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-80px', left: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,44,161,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        style={{
          background: 'white',
          borderRadius: '32px',
          padding: '48px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 24px 64px rgba(4,37,91,0.4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#04255B',
              borderRadius: '16px',
              padding: '12px 20px',
              marginBottom: '20px',
            }}
          >
            <img src={logoBlanc} alt="SunnyGo" style={{ height: '48px', width: 'auto' }} />
          </div>
          <h1
            style={{
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 800,
              fontSize: '22px',
              color: '#04255B',
              margin: '0 0 6px 0',
            }}
          >
            Espace administration
          </h1>
          <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
            Accès réservé à l&apos;équipe SunnyGo
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 700,
                color: '#04255B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
              }}
            >
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                onKeyDown={handleKeyDown}
                placeholder="Entrez le mot de passe admin"
                autoFocus
                style={{
                  width: '100%',
                  border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '14px 48px 14px 16px',
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '14px',
                  color: '#04255B',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: 'white',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = '#04255B' }}
                onBlur={e => { if (!error) e.target.style.borderColor = '#E5E7EB' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <p style={{ marginTop: '8px', fontSize: '13px', color: '#EF4444', fontWeight: 600 }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              background: loading || !password ? '#9CA3AF' : '#04255B',
              color: 'white',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '12px',
              padding: '14px',
              border: 'none',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (!loading && password) e.currentTarget.style.background = '#162CA1' }}
            onMouseLeave={e => { if (!loading && password) e.currentTarget.style.background = '#04255B' }}
          >
            {loading ? 'Vérification...' : 'Accéder à l\'admin'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#D1D5DB', marginTop: '24px', marginBottom: 0 }}>
          Accès sécurisé — session temporaire
        </p>
      </div>
    </div>
  )
}
