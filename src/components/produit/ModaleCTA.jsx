import { useState } from 'react'
import logoBlanc from '../../assets/logo-blanc.png'
import FormulaireApporteur from './FormulaireApporteur'

const SOFTR_URL = import.meta.env.VITE_SOFTR_URL || 'https://sunnygo.softr.app'

// ── Card profil ───────────────────────────────────────────────────────────────
function CardProfil({ icon, iconBg, title, description, borderHover, bgHover, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        background: hovered ? bgHover : 'white',
        border: `1.5px solid ${hovered ? borderHover : '#E5E7EB'}`,
        borderRadius: '14px',
        padding: '20px 16px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'border-color 0.15s, background 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '15px',
          color: '#04255B', margin: '0 0 4px 0', lineHeight: 1.3,
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: 'Quicksand, sans-serif', fontSize: '12px',
          color: '#6B7280', margin: 0, lineHeight: 1.5,
        }}>
          {description}
        </p>
      </div>
    </button>
  )
}

// ── Modale principale ─────────────────────────────────────────────────────────
export default function ModaleCTA({ produit, onClose }) {
  // step: 1 | 2 | 'success' | 'error'
  const [step, setStep] = useState(1)
  const [confirmedEmail, setConfirmedEmail] = useState('')

  function handlePartenaireClick() {
    onClose()
    window.open(SOFTR_URL, '_blank', 'noopener,noreferrer')
  }

  function handleSuccess(email) {
    setConfirmedEmail(email)
    setStep('success')
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(4,37,91,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white', borderRadius: '20px',
          padding: '40px',
          width: '100%', maxWidth: '480px',
          boxShadow: '0 24px 60px rgba(4,37,91,0.25)',
          position: 'relative',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            width: '28px', height: '28px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#9CA3AF', fontSize: '20px', lineHeight: 1,
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#04255B' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#9CA3AF' }}
        >
          ×
        </button>

        {/* ── ÉTAPE 1 — Choix profil ── */}
        {step === 1 && (
          <>
            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #162CA1 0%, #04255B 100%)',
                borderRadius: '12px', padding: '10px 20px',
                display: 'inline-flex', alignItems: 'center',
              }}>
                <img src={logoBlanc} alt="SunnyGo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

            <h2 style={{
              fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px',
              color: '#04255B', textAlign: 'center', margin: '0 0 8px 0',
            }}>
              Vous souhaitez commercialiser ce produit&nbsp;?
            </h2>
            <p style={{
              fontSize: '13px', color: '#9CA3AF', textAlign: 'center',
              margin: '0 0 32px 0', lineHeight: 1.6,
              fontFamily: 'Quicksand, sans-serif',
            }}>
              Dites-nous qui vous êtes pour vous orienter au mieux
            </p>

            {/* Cards */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <CardProfil
                icon="👥"
                iconBg="#EFF6FF"
                title="Je fais partie de l'équipe SunnyGo"
                description="J'ai déjà un compte et je veux soumettre un client"
                borderHover="#04255B"
                bgHover="#F8F7FF"
                onClick={handlePartenaireClick}
              />
              <CardProfil
                icon="🤝"
                iconBg="#FDF3D0"
                title="Je ne fais pas encore partie de l'équipe"
                description="Je souhaite devenir apporteur d'affaires SunnyGo"
                borderHover="#FDC71C"
                bgHover="#FFFBEB"
                onClick={() => setStep(2)}
              />
            </div>
          </>
        )}

        {/* ── ÉTAPE 2 — Formulaire ── */}
        {step === 2 && (
          <FormulaireApporteur
            produit={produit}
            onBack={() => setStep(1)}
            onSuccess={handleSuccess}
          />
        )}

        {/* ── CONFIRMATION ── */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px', lineHeight: 1 }}>✅</div>
            <h2 style={{
              fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '22px',
              color: '#04255B', margin: '0 0 12px 0',
            }}>
              Demande envoyée&nbsp;!
            </h2>
            <p style={{
              fontSize: '13px', color: '#6B7280', lineHeight: 1.7,
              fontFamily: 'Quicksand, sans-serif', margin: '0 0 28px 0',
            }}>
              Un membre de l'équipe SunnyGo vous contacte sous 24h à l'adresse{' '}
              <strong style={{ color: '#04255B' }}>{confirmedEmail}</strong>.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#04255B', color: 'white', border: 'none',
                borderRadius: '50px', padding: '12px 32px',
                fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#162CA1'}
              onMouseLeave={e => e.currentTarget.style.background = '#04255B'}
            >
              Fermer
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
