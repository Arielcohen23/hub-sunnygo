import { useState } from 'react'
import { createApporteur } from '../../services/airtable'

const inputStyle = {
  width: '100%',
  border: '1.5px solid #E5E7EB',
  borderRadius: '10px',
  padding: '12px 16px',
  fontFamily: 'Quicksand, sans-serif',
  fontSize: '14px',
  color: '#04255B',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'white',
  transition: 'border-color 0.15s',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#04255B',
  marginBottom: '6px',
}

const fieldStyle = { marginBottom: '14px' }

// Spinner CSS inline
const spinnerStyle = `
@keyframes spin { to { transform: rotate(360deg); } }
.sg-spinner {
  display: inline-block;
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
  margin-left: 8px;
}
`

export default function FormulaireApporteur({ produit, onBack, onSuccess }) {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  function validate() {
    const errs = {}
    if (!form.nom.trim())       errs.nom       = 'Requis'
    if (!form.email.trim())     errs.email     = 'Requis'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide'
    if (!form.telephone.trim()) errs.telephone = 'Requis'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setSubmitError(false)

    const now = new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })

    // ACTION 1 — Email mailto
    const subject = encodeURIComponent(
      `🤝 Nouvel apporteur — ${form.nom} souhaite commercialiser ${produit.nom}`
    )
    const body = encodeURIComponent(
      `Bonjour,\n\nUn nouvel apporteur d'affaires souhaite rejoindre l'équipe SunnyGo.\n\nNom : ${form.nom}\nEmail : ${form.email}\nTéléphone : ${form.telephone}\nProduit consulté : ${produit.nom}\nCatégorie : ${produit.categorie}\nDate : ${now}\n\nÀ contacter sous 24h.\n— Hub SunnyGo`
    )
    window.open(`mailto:hello@sunnygo.fr?subject=${subject}&body=${body}`)

    // ACTION 2 — Airtable (silencieux en cas d'erreur partielle)
    try {
      await createApporteur({
        nom:        form.nom,
        email:      form.email,
        telephone:  form.telephone,
        produitNom: produit.nom,
        categorie:  produit.categorie,
      })
    } catch (err) {
      // Erreur Airtable ignorée silencieusement — l'email a déjà été envoyé
      console.warn('Airtable:', err.message)
    }

    setLoading(false)
    onSuccess(form.email)
  }

  const focusStyle = { borderColor: '#04255B', boxShadow: '0 0 0 3px rgba(4,37,91,0.08)' }
  const blurStyle  = { borderColor: '#E5E7EB', boxShadow: 'none' }

  return (
    <>
      <style>{spinnerStyle}</style>

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Quicksand, sans-serif', fontWeight: 600,
            fontSize: '13px', color: '#9CA3AF', padding: 0,
            display: 'flex', alignItems: 'center', gap: '4px',
            marginBottom: '16px',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#04255B'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
        >
          ← Retour
        </button>

        <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', margin: '0 0 6px 0' }}>
          Rejoindre l'équipe SunnyGo
        </h2>
        <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 12px 0', fontFamily: 'Quicksand, sans-serif' }}>
          Un membre de notre équipe vous contacte sous 24h
        </p>

        {/* Badge produit */}
        <span style={{
          display: 'inline-block',
          background: '#FDF3D0',
          border: '1px solid rgba(253,199,28,0.4)',
          borderRadius: '50px',
          padding: '4px 14px',
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          color: '#92620A',
        }}>
          {produit.nom}
        </span>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} noValidate>
        <div style={fieldStyle}>
          <label style={labelStyle}>Votre nom complet</label>
          <input
            type="text"
            value={form.nom}
            onChange={e => setField('nom', e.target.value)}
            placeholder="Prénom Nom"
            style={{ ...inputStyle, borderColor: errors.nom ? '#DC2626' : '#E5E7EB' }}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => Object.assign(e.target.style, blurStyle)}
          />
          {errors.nom && <p style={{ color: '#DC2626', fontSize: '11px', margin: '4px 0 0 2px' }}>{errors.nom}</p>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Votre email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setField('email', e.target.value)}
            placeholder="vous@exemple.fr"
            style={{ ...inputStyle, borderColor: errors.email ? '#DC2626' : '#E5E7EB' }}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => Object.assign(e.target.style, blurStyle)}
          />
          {errors.email && <p style={{ color: '#DC2626', fontSize: '11px', margin: '4px 0 0 2px' }}>{errors.email}</p>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Votre téléphone</label>
          <input
            type="tel"
            value={form.telephone}
            onChange={e => setField('telephone', e.target.value)}
            placeholder="06 12 34 56 78"
            style={{ ...inputStyle, borderColor: errors.telephone ? '#DC2626' : '#E5E7EB' }}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => Object.assign(e.target.style, blurStyle)}
          />
          {errors.telephone && <p style={{ color: '#DC2626', fontSize: '11px', margin: '4px 0 0 2px' }}>{errors.telephone}</p>}
        </div>

        {submitError && (
          <p style={{ color: '#DC2626', fontSize: '12px', textAlign: 'center', margin: '0 0 10px 0' }}>
            Une erreur est survenue — réessayez
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#6B7280' : '#04255B',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '14px',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px',
            transition: 'background 0.15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#162CA1' }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#04255B' }}
        >
          {loading ? (
            <>Envoi en cours...<span className="sg-spinner" /></>
          ) : (
            'Envoyer ma demande →'
          )}
        </button>
      </form>
    </>
  )
}
