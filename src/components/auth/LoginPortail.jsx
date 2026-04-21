import { useState } from 'react'
import logoBlanc from '../../assets/logo-blanc.png'

const PASSWORD = import.meta.env.VITE_PORTAIL_PASSWORD || 'sunnygo2026'

const shakeKeyframes = `
@keyframes shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-8px); }
  30%  { transform: translateX(8px); }
  45%  { transform: translateX(-6px); }
  60%  { transform: translateX(6px); }
  75%  { transform: translateX(-3px); }
  90%  { transform: translateX(3px); }
  100% { transform: translateX(0); }
}
`

export default function LoginPortail({ onSuccess }) {
  const [value, setValue]   = useState('')
  const [error, setError]   = useState(false)
  const [shaking, setShaking] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem('portail_auth', 'true')
      onSuccess()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
    }
  }

  function handleChange(e) {
    setValue(e.target.value)
    if (error) setError(false)
  }

  return (
    <>
      <style>{shakeKeyframes}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #162CA1 0%, #04255B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Quicksand, sans-serif',
      }}>
        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '48px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 24px 60px rgba(4,37,91,0.35)',
          animation: shaking ? 'shake 0.55s ease' : 'none',
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #162CA1 0%, #04255B 100%)',
              borderRadius: '14px',
              padding: '12px 24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={logoBlanc}
                alt="SunnyGo"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Titre */}
          <h1 style={{
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '20px',
            color: '#04255B',
            textAlign: 'center',
            margin: '0 0 8px 0',
          }}>
            Espace apporteurs d'affaires
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#9CA3AF',
            textAlign: 'center',
            margin: '0 0 32px 0',
            lineHeight: 1.5,
          }}>
            Accès réservé aux partenaires SunnyGo
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '8px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#04255B',
                marginBottom: '8px',
              }}>
                Mot de passe
              </label>

              {/* Input wrapper avec icône œil */}
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={value}
                  onChange={handleChange}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Entrez le mot de passe"
                  autoFocus
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    border: `1.5px solid ${error ? '#DC2626' : '#E5E7EB'}`,
                    borderRadius: '10px',
                    padding: '12px 44px 12px 16px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '14px',
                    color: '#04255B',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => { if (!error) e.target.style.borderColor = '#04255B' }}
                  onBlur={e => { if (!error) e.target.style.borderColor = '#E5E7EB' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  tabIndex={-1}
                >
                  {showPwd ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Message erreur */}
            <div style={{ minHeight: '20px', marginBottom: '4px' }}>
              {error && (
                <p style={{
                  fontSize: '12px',
                  color: '#DC2626',
                  textAlign: 'center',
                  margin: '6px 0 0 0',
                  fontFamily: 'Quicksand, sans-serif',
                }}>
                  Mot de passe incorrect — contactez SunnyGo
                </p>
              )}
            </div>

            {/* Bouton */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#04255B',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '14px',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '16px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#162CA1'}
              onMouseLeave={e => e.currentTarget.style.background = '#04255B'}
            >
              Accéder au Hub →
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
