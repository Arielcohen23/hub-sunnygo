import { useState, useEffect, useRef } from 'react'
import useAdminData from '../../hooks/useAdminData'

function Toast({ message, type = 'success', onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed', bottom: '24px', right: '24px',
        background: type === 'success' ? '#16A34A' : '#EF4444',
        color: 'white',
        fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px',
        padding: '14px 24px', borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: '8px',
      }}
    >
      <span>{type === 'success' ? '✓' : '!'}</span> {message}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  padding: '10px 12px',
  fontFamily: 'Quicksand, sans-serif',
  fontSize: '13px',
  color: '#04255B',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'white',
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '5px',
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', marginBottom: '20px' }}>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '18px', color: '#04255B', margin: '0 0 4px 0' }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '13px', color: '#9CA3AF', margin: '0 0 20px 0' }}>{subtitle}</p>}
      {children}
    </div>
  )
}

function ResetModal({ onConfirm, onCancel }) {
  const [confirmText, setConfirmText] = useState('')
  const required = 'RÉINITIALISER'

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: 'white', borderRadius: '16px', padding: '32px',
          maxWidth: '440px', width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '18px' }}>⚠️</span>
          </div>
          <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '18px', color: '#DC2626', margin: 0 }}>
            Réinitialisation
          </h3>
        </div>
        <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>
          Cette action est <strong>irréversible</strong>. Toutes les modifications de produits et d&apos;apparence seront perdues et les données par défaut seront restaurées.
        </p>
        <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '13px', color: '#6B7280', margin: '0 0 8px 0' }}>
          Tapez <strong style={{ color: '#DC2626' }}>RÉINITIALISER</strong> pour confirmer :
        </p>
        <input
          value={confirmText}
          onChange={e => setConfirmText(e.target.value)}
          placeholder="RÉINITIALISER"
          style={{ ...inputStyle, marginBottom: '20px', borderColor: confirmText === required ? '#16A34A' : '#E5E7EB' }}
          autoFocus
        />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '13px', color: '#6B7280' }}
          >
            Annuler
          </button>
          <button
            onClick={() => { if (confirmText === required) onConfirm() }}
            disabled={confirmText !== required}
            style={{
              background: confirmText === required ? '#EF4444' : '#D1D5DB',
              border: 'none', borderRadius: '8px', padding: '10px 20px',
              cursor: confirmText === required ? 'pointer' : 'not-allowed',
              fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '13px', color: 'white',
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminParametres() {
  const { produits, resetToDefault } = useAdminData()
  const [toast, setToast] = useState(null)
  const [showResetModal, setShowResetModal] = useState(false)

  // Password section
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [pwdError, setPwdError] = useState('')

  // Import ref
  const importRef = useRef(null)

  function handleChangePassword() {
    setPwdError('')
    if (!newPassword) { setPwdError('Le mot de passe ne peut pas être vide'); return }
    if (newPassword !== confirmPassword) { setPwdError('Les mots de passe ne correspondent pas'); return }
    if (newPassword.length < 6) { setPwdError('Minimum 6 caractères'); return }
    sessionStorage.setItem('sunnygo_admin_password_override', newPassword)
    setNewPassword('')
    setConfirmPassword('')
    setToast('Mot de passe modifié pour cette session')
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function handleExportJS() {
    const content = 'export const produits = ' + JSON.stringify(produits, null, 2) + '\n'
    downloadFile(content, 'produits.js', 'text/javascript')
    setToast('Fichier produits.js exporté')
  }

  function handleExportJSON() {
    const content = JSON.stringify(produits, null, 2)
    downloadFile(content, 'produits.json', 'application/json')
    setToast('Fichier produits.json exporté')
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target.result
      try {
        let data = null

        if (file.name.endsWith('.json')) {
          data = JSON.parse(text)
        } else if (file.name.endsWith('.js')) {
          // Try to extract array from JS content
          const match = text.match(/=\s*(\[[\s\S]*\])\s*;?\s*$/)
          if (match) {
            data = JSON.parse(match[1])
          } else {
            throw new Error('Format JS non reconnu')
          }
        }

        if (!Array.isArray(data)) {
          throw new Error('Le fichier doit contenir un tableau de produits')
        }

        localStorage.setItem('sunnygo_produits', JSON.stringify(data))
        window.dispatchEvent(new StorageEvent('storage', { key: 'sunnygo_produits' }))
        setToast(`${data.length} produits importés avec succès`)
      } catch (err) {
        setToast(`Erreur d'import : ${err.message}`)
      }
    }
    reader.readAsText(file)
    // Reset input so same file can be re-imported
    e.target.value = ''
  }

  function handleReset() {
    resetToDefault()
    setShowResetModal(false)
    setToast('Données réinitialisées aux valeurs par défaut')
  }

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#04255B',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
  }

  const eyeButton = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9CA3AF',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  }

  const EyeIcon = ({ show }) => show ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )

  return (
    <div style={{ padding: '32px', fontFamily: 'Quicksand, sans-serif' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#04255B', margin: '0 0 6px 0' }}>
          Paramètres
        </h1>
        <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>
          Configuration et gestion des données de l&apos;admin.
        </p>
      </div>

      {/* Section 1 — Mot de passe */}
      <SectionCard
        title="Mot de passe admin"
        subtitle="Ce changement s'applique uniquement à la session courante (démonstration)."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>Nouveau mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNewPwd ? 'text' : 'password'}
                value={newPassword}
                onChange={e => { setNewPassword(e.target.value); setPwdError('') }}
                placeholder="Nouveau mot de passe..."
                style={{ ...inputStyle, paddingRight: '40px' }}
              />
              <button type="button" onClick={() => setShowNewPwd(s => !s)} style={eyeButton}>
                <EyeIcon show={showNewPwd} />
              </button>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Confirmer</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPwd ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setPwdError('') }}
                placeholder="Confirmer le mot de passe..."
                style={{ ...inputStyle, paddingRight: '40px' }}
              />
              <button type="button" onClick={() => setShowConfirmPwd(s => !s)} style={eyeButton}>
                <EyeIcon show={showConfirmPwd} />
              </button>
            </div>
          </div>
        </div>
        {pwdError && (
          <p style={{ color: '#EF4444', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>{pwdError}</p>
        )}
        <button
          onClick={handleChangePassword}
          disabled={!newPassword || !confirmPassword}
          style={{
            ...btnStyle,
            background: newPassword && confirmPassword ? '#04255B' : '#D1D5DB',
            cursor: newPassword && confirmPassword ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={e => { if (newPassword && confirmPassword) e.currentTarget.style.background = '#162CA1' }}
          onMouseLeave={e => { if (newPassword && confirmPassword) e.currentTarget.style.background = '#04255B' }}
        >
          🔒 Changer le mot de passe
        </button>
        <p style={{ fontSize: '11px', color: '#D1D5DB', marginTop: '8px' }}>
          Note : valable uniquement pour la session en cours
        </p>
      </SectionCard>

      {/* Section 2 — Export */}
      <SectionCard
        title="Export des données"
        subtitle={`${produits.length} produits actuellement en base`}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportJS}
            style={btnStyle}
            onMouseEnter={e => e.currentTarget.style.background = '#162CA1'}
            onMouseLeave={e => e.currentTarget.style.background = '#04255B'}
          >
            📄 Exporter produits.js
          </button>
          <button
            onClick={handleExportJSON}
            style={{ ...btnStyle, background: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#4B5563'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B7280'}
          >
            📦 Exporter en JSON
          </button>
        </div>
      </SectionCard>

      {/* Section 3 — Import */}
      <SectionCard
        title="Import des données"
        subtitle="Importez un fichier .js ou .json pour remplacer les données existantes."
      >
        <div
          style={{
            border: '2px dashed #E5E7EB', borderRadius: '10px',
            padding: '24px', textAlign: 'center',
            background: '#F9FAFB',
          }}
        >
          <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📂</span>
          <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
            Fichier .json ou .js (même format que produits.js)
          </p>
          <button
            onClick={() => importRef.current?.click()}
            style={{ ...btnStyle, background: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#4B5563'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B7280'}
          >
            Choisir un fichier
          </button>
          <input
            ref={importRef}
            type="file"
            accept=".js,.json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>
        <div style={{ marginTop: '12px', background: '#FFFBEB', borderRadius: '8px', padding: '10px 14px', border: '1px solid rgba(253,199,28,0.3)' }}>
          <p style={{ fontSize: '12px', color: '#92620A', margin: 0 }}>
            ⚠️ L&apos;import remplacera <strong>toutes les données actuelles</strong>. Exportez d&apos;abord si vous souhaitez conserver vos modifications.
          </p>
        </div>
      </SectionCard>

      {/* Section 4 — Réinitialisation */}
      <SectionCard
        title="Réinitialisation"
        subtitle="Restaure les données par défaut du fichier produits.js original."
      >
        <button
          onClick={() => setShowResetModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#DC2626'}
          onMouseLeave={e => e.currentTarget.style.background = '#EF4444'}
        >
          ⚠️ Réinitialiser aux données par défaut
        </button>
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>
          Cette action supprime toutes vos modifications et restaure les données originales.
        </p>
      </SectionCard>

      {showResetModal && (
        <ResetModal
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
