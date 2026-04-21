import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import useAdminData from '../hooks/useAdminData'
import logoBlanc from '../assets/logo-blanc.png'
import ModaleCTA from '../components/produit/ModaleCTA'

const SECTEUR_LABELS = {
  industriel: 'Industrie',
  tertiaire: 'Tertiaire',
  agriculteur: 'Agriculture',
  collectivite: 'Collectivité',
}

const FINANCEMENT_LABELS = {
  'prise-en-charge': '100% prise en charge',
  'reste-a-charge': 'Reste à charge',
  'tiers-financement': 'Tiers financement',
}

const criteresNotation = [
  { key: 'remuneration', label: 'Rémunération', icon: '💰' },
  { key: 'delaiTraitement', label: 'Délai traitement', icon: '⏱️' },
  { key: 'delaiPaiement', label: 'Délai paiement', icon: '📅' },
  { key: 'simplicite', label: 'Simplicité', icon: '✅' },
  { key: 'volumeMarche', label: 'Volume marché', icon: '📈' },
]

function Breadcrumb({ produit, navigate }) {
  const categoryLabel = produit.categorie === 'CEE'
    ? 'CEE'
    : produit.categorie === 'PV'
      ? 'Panneaux PV'
      : 'Tiers Investissement'

  return (
    <div style={{ padding: '20px 0 8px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Quicksand, sans-serif' }}>
      <button
        onClick={() => navigate('/')}
        style={{ fontSize: '13px', color: '#6B7280', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'Quicksand, sans-serif', padding: 0 }}
        onMouseEnter={e => { e.target.style.color = '#04255B' }}
        onMouseLeave={e => { e.target.style.color = '#6B7280' }}
      >
        ← Hub SunnyGo
      </button>
      <span style={{ color: '#D1D5DB' }}>/</span>
      <button
        onClick={() => navigate('/')}
        style={{ fontSize: '13px', color: '#6B7280', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'Quicksand, sans-serif', padding: 0 }}
        onMouseEnter={e => { e.target.style.color = '#04255B' }}
        onMouseLeave={e => { e.target.style.color = '#6B7280' }}
      >
        {categoryLabel}
      </button>
      <span style={{ color: '#D1D5DB' }}>/</span>
      <span style={{ fontSize: '13px', color: '#04255B', fontWeight: 600 }}>{produit.nom}</span>
    </div>
  )
}

function HeroProduit({ produit }) {
  const categoryBadge = () => {
    if (produit.categorie === 'CEE') {
      return { label: `⚡ CEE — ${produit.ficheRef}`, bg: '#EFF6FF', color: '#04255B', border: '1px solid #BFDBFE' }
    } else if (produit.categorie === 'PV') {
      return { label: `☀️ Panneaux PV — ${produit.ficheRef}`, bg: '#EFF6FF', color: '#04255B', border: '1px solid #BFDBFE' }
    } else {
      return { label: `🤝 Tiers Investissement`, bg: '#EFF6FF', color: '#04255B', border: '1px solid #BFDBFE' }
    }
  }

  const badge = categoryBadge()
  const filledDots = Math.round(produit.score / 2)

  const pillStyle = {
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    padding: '4px 12px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    display: 'inline-block',
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '40px 48px',
      border: '1px solid #F0EEE9',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(253,199,28,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="pd-hero-grid">
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ ...pillStyle, background: badge.bg, color: badge.color, border: badge.border }}>
                {badge.label}
              </span>
              {produit.tags.hot && (
                <span style={{ ...pillStyle, background: '#FFF7ED', color: '#C2410C', border: '1px solid #FDDCBA' }}>
                  🔥 Chaud
                </span>
              )}
              {produit.tags.nouveau && (
                <span style={{ ...pillStyle, background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}>
                  Nouveau
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 36px)',
              color: '#04255B',
              lineHeight: 1.2,
              margin: '0 0 8px 0',
            }}>
              {produit.nom}
            </h1>

            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6, marginBottom: '20px', marginTop: '8px' }}>
              {produit.accroche}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                borderRadius: '50px', padding: '6px 14px',
                fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '12px',
                background: '#EFF6FF', color: '#04255B', border: '1px solid #BFDBFE',
              }}>
                {produit.typeClient.includes('professionnel') && produit.typeClient.includes('particulier')
                  ? '👥 Pro & Particulier'
                  : produit.typeClient.includes('professionnel')
                    ? '🏢 Professionnel'
                    : '👤 Particulier'}
              </span>
              <span style={{
                borderRadius: '50px', padding: '6px 14px',
                fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '12px',
                background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0',
              }}>
                {produit.typeFinancement.includes('prise-en-charge')
                  ? '✅ Prise en charge à 100%'
                  : '💰 Reste à charge'}
              </span>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #04255B, #162CA1)',
            borderRadius: '16px',
            padding: '24px 22px',
          }}>
            {/* Score global */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', display: 'block' }}>
                Note globale
              </span>
              <div style={{ lineHeight: 1 }}>
                <span style={{ fontWeight: 800, fontSize: '52px', color: '#FDC71C', fontFamily: 'Quicksand, sans-serif' }}>{produit.score}</span>
                <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Quicksand, sans-serif' }}>/10</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '8px', marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: i <= filledDots ? '#FDC71C' : 'rgba(255,255,255,0.2)',
                  }} />
                ))}
              </div>
            </div>
            {/* Séparateur */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }} />
            {/* 5 critères */}
            {criteresNotation.map((critere, i) => {
              const value = produit.notation[critere.key]
              return (
                <div key={critere.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '7px', paddingBottom: '7px',
                  borderBottom: i < criteresNotation.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{critere.icon}</span>
                    <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 500, fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                      {critere.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '70px', height: '4px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${(value / 5) * 100}%`, height: '100%', background: '#FDC71C', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '11px', color: 'rgba(255,255,255,0.5)', minWidth: '26px', textAlign: 'right' }}>
                      {value}/5
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function BlocRemuneration({ produit }) {
  const metrics = [
    { label: "Rémunération", valeur: produit.remuneration },
    { label: "Déclenchement", valeur: produit.declenchement },
    { label: "Délai de paiement", valeur: produit.delaiPaiement },
  ]

  return (
    <div style={{
      background: 'linear-gradient(135deg, #FDF3D0, #FFFBEB)',
      border: '1.5px solid rgba(253,199,28,0.4)',
      borderRadius: '20px',
      marginBottom: '20px',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex' }}>
        {metrics.map((metric, i) => (
          <div key={i} style={{
            flex: 1,
            textAlign: 'center',
            padding: '20px 16px',
            borderRight: i < metrics.length - 1 ? '1px solid rgba(253,199,28,0.3)' : 'none',
          }}>
            <div style={{
              fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '10px',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: '#92620A', marginBottom: '8px',
            }}>
              {metric.label}
            </div>
            <div style={{
              fontFamily: 'Quicksand, sans-serif', fontWeight: 800,
              fontSize: '18px', color: '#04255B', lineHeight: 1.3,
            }}>
              {metric.valeur}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function BlocDescription({ produit }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px 40px',
      border: '1px solid #F0EEE9',
      marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', marginBottom: '16px', marginTop: 0 }}>
        Présentation du produit
      </h2>
      <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.75, margin: 0 }}>
        {produit.description}
      </p>
      {produit.categorie === 'CEE' && (
        <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            border: '1.5px solid #04255B',
            color: '#04255B',
            borderRadius: '50px',
            fontSize: '12px',
            fontWeight: 600,
            padding: '4px 12px',
            fontFamily: 'Quicksand, sans-serif',
          }}>
            📄 Fiche CEE : {produit.ficheRef}
          </span>
          <a
            href="#"
            style={{ fontSize: '12px', color: '#FDC71C', fontWeight: 600, textDecoration: 'none', fontFamily: 'Quicksand, sans-serif' }}
            onMouseEnter={e => { e.target.style.color = '#E59319' }}
            onMouseLeave={e => { e.target.style.color = '#FDC71C' }}
          >
            Voir la fiche officielle →
          </a>
        </div>
      )}
    </div>
  )
}

function BlocMateriel({ produit }) {
  if (!produit.materiel || produit.materiel.length === 0) return null
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px 40px',
      border: '1px solid #F0EEE9',
      marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', margin: '0 0 4px 0' }}>
        Matériel utilisé
      </h2>
      <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', marginTop: '4px' }}>
        Marques et modèles référencés par SunnyGo
      </p>
      <div>
        {produit.materiel.map((item, i) => {
          const isFirst = i === 0
          const isLast = i === produit.materiel.length - 1
          return (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 16px',
              background: i % 2 === 0 ? '#F8F7F4' : 'white',
              borderRadius: isFirst ? '8px 8px 0 0' : isLast ? '0 0 8px 8px' : '0',
            }}>
              <span style={{ fontSize: '13px', color: '#04255B', fontFamily: 'Quicksand, sans-serif', fontWeight: 600 }}>
                {item.modele}
              </span>
              {item.dimensionnement && (
                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500, fontFamily: 'Quicksand, sans-serif', textAlign: 'right' }}>
                  {item.dimensionnement}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BlocEligibilite({ produit }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px 40px',
      border: '1px solid #F0EEE9',
      marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', margin: '0 0 4px 0' }}>
        {"Conditions d'éligibilité"}
      </h2>
      <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', marginTop: '4px' }}>
        Vérifiez ces critères avant de proposer le produit
      </p>
      <div>
        {produit.eligibilite.map((item, i) => {
          const isFirst = i === 0
          const isLast = i === produit.eligibilite.length - 1
          return (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: i % 2 === 0 ? '#F8F7F4' : 'white',
              borderRadius: isFirst ? '8px 8px 0 0' : isLast ? '0 0 8px 8px' : '0',
            }}>
              <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'Quicksand, sans-serif' }}>{item.critere}</span>
              <span style={{ fontSize: '13px', color: '#04255B', fontWeight: 600, fontFamily: 'Quicksand, sans-serif' }}>{item.valeur}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BlocProcess({ produit }) {
  return (
    <div style={{
      background: '#F8F7F4',
      borderRadius: '20px',
      padding: '32px 40px',
      marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', margin: '0 0 4px 0' }}>
        Process client
      </h2>
      <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '28px', marginTop: '4px' }}>
        Les étapes de A à Z pour un dossier réussi
      </p>

      {produit.processClient.map((step, i, arr) => {
        const isLast = i === arr.length - 1
        const isEven = i % 2 === 0
        return (
          <div key={i} style={{ display: 'flex', gap: '20px', position: 'relative', paddingBottom: isLast ? 0 : '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 800,
                fontSize: '18px',
                background: isEven ? '#04255B' : '#FDC71C',
                color: isEven ? '#FDC71C' : '#04255B',
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              {!isLast && (
                <div style={{
                  flex: 1,
                  width: '2px',
                  background: 'repeating-linear-gradient(to bottom, #E5E7EB 0px, #E5E7EB 5px, transparent 5px, transparent 11px)',
                  marginTop: '4px',
                }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px 20px',
                border: '1px solid #F0EEE9',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '15px', color: '#04255B', flex: 1 }}>
                    {step.titre}
                  </span>
                  {step.duree && (
                    <span style={{
                      background: '#F3F4F6',
                      color: '#6B7280',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '50px',
                      flexShrink: 0,
                      fontFamily: 'Quicksand, sans-serif',
                    }}>
                      ~ {step.duree}
                    </span>
                  )}
                </div>
                <p style={{ marginTop: '6px', fontSize: '13px', color: '#6B7280', lineHeight: 1.6, margin: '6px 0 0 0', fontFamily: 'Quicksand, sans-serif' }}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function BlocDocuments({ produit }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [bientotIndex, setBientotIndex] = useState(null)

  const getTypeStyle = (type) => {
    switch (type) {
      case 'pdf': return { bg: '#FEE2E2', text: 'PDF', color: '#DC2626' }
      case 'slides': return { bg: '#EDE9FE', text: 'PPT', color: '#7C3AED' }
      case 'image': return { bg: '#DBEAFE', text: 'IMG', color: '#1D4ED8' }
      case 'video': return { bg: '#D1FAE5', text: 'VID', color: '#065F46' }
      default: return { bg: '#F3F4F6', text: type.toUpperCase().slice(0, 3), color: '#6B7280' }
    }
  }

  function resolveUrl(url) {
    if (!url || url === '#') return null
    // Google Drive partage → URL de téléchargement direct
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/)
    if (driveMatch) return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return null
  }

  function handleDocClick(url, index) {
    const resolved = resolveUrl(url)
    if (resolved) {
      window.open(resolved, '_blank', 'noopener,noreferrer')
    } else {
      setBientotIndex(index)
      setTimeout(() => setBientotIndex(null), 3000)
    }
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px 40px',
      border: '1px solid #F0EEE9',
      marginBottom: '20px',
    }}>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', margin: '0 0 4px 0' }}>
        Supports commerciaux
      </h2>
      <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', marginTop: '4px' }}>
        Tous les documents pour convaincre vos prospects
      </p>

      <div className="pd-docs-grid">
        {produit.documents.map((doc, i) => {
          const typeStyle = getTypeStyle(doc.type)
          const isHovered = hoveredIndex === i
          const isBientot = bientotIndex === i
          return (
            <div key={i}>
            <div
              style={{
                background: '#F8F7F4',
                borderRadius: '12px',
                padding: '14px 18px',
                border: isHovered ? '1px solid rgba(4,37,91,0.2)' : '1px solid #F0EEE9',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                boxShadow: isHovered ? '0 2px 8px rgba(4,37,91,0.06)' : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                userSelect: 'none',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleDocClick(doc.url, i)}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: typeStyle.bg,
              }}>
                <span style={{ color: typeStyle.color, fontFamily: 'Quicksand, sans-serif', fontWeight: 800, fontSize: '10px' }}>
                  {typeStyle.text}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '13px', color: '#04255B' }}>
                  {doc.nom}
                </div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px', fontFamily: 'Quicksand, sans-serif' }}>
                  {doc.description}
                </div>
              </div>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isHovered ? '#04255B' : 'rgba(4,37,91,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={isHovered ? 'white' : '#04255B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="2" x2="7" y2="10" />
                  <polyline points="4,7 7,10 10,7" />
                  <line x1="2" y1="12" x2="12" y2="12" />
                </svg>
              </div>
            </div>
            {isBientot && (
              <p style={{
                fontSize: '11px',
                color: '#9CA3AF',
                fontFamily: 'Quicksand, sans-serif',
                margin: '5px 0 0 6px',
                fontStyle: 'italic',
              }}>
                Document bientôt disponible
              </p>
            )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BlocExempleDossier({ produit }) {
  const ex = produit.exempleDossier
  if (!ex) return null
  const [hoveredDoc, setHoveredDoc] = useState(null)

  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '32px 40px',
      border: '1px solid #F0EEE9', marginBottom: '20px',
    }}>
      <span style={{
        display: 'inline-block', background: '#FDF3D0',
        border: '1px solid rgba(253,199,28,0.4)', color: '#92620A',
        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.06em', borderRadius: '50px', padding: '4px 12px',
        fontFamily: 'Quicksand, sans-serif', marginBottom: '12px',
      }}>
        📊 Exemple concret
      </span>
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '20px', color: '#04255B', margin: '0 0 4px 0' }}>
        Exemple de dossier et rémunération
      </h2>
      <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '4px 0 28px 0' }}>
        Cas concret pour vous projeter sur ce produit
      </p>

      <div className="pd-exemple-grid">
        {/* Colonne gauche — contexte client */}
        <div style={{ background: '#F8F7F4', borderRadius: '14px', padding: '22px' }}>
          <div style={{
            fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#9CA3AF', fontWeight: 700, fontFamily: 'Quicksand, sans-serif',
            marginBottom: '10px',
          }}>
            Le client
          </div>
          <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.7, margin: '0 0 16px 0', fontFamily: 'Quicksand, sans-serif' }}>
            {ex.contexte}
          </p>
          {ex.details.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: i < ex.details.length - 1 ? '1px solid #F0EEE9' : 'none',
            }}>
              <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'Quicksand, sans-serif' }}>{item.label}</span>
              <span style={{ fontSize: '12px', color: '#04255B', fontWeight: 600, fontFamily: 'Quicksand, sans-serif' }}>{item.valeur}</span>
            </div>
          ))}
        </div>

        {/* Colonne droite — rémunération */}
        <div style={{
          background: 'linear-gradient(135deg, #FDF3D0, #FFFBEB)',
          border: '1.5px solid rgba(253,199,28,0.4)',
          borderRadius: '14px', padding: '22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em',
              color: '#92620A', fontWeight: 700, fontFamily: 'Quicksand, sans-serif',
              marginBottom: '8px',
            }}>
              {ex.resultat.label}
            </div>
            <div style={{
              fontFamily: 'Quicksand, sans-serif', fontWeight: 800,
              fontSize: '36px', color: '#04255B', lineHeight: 1.1,
            }}>
              {ex.resultat.valeur}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontFamily: 'Quicksand, sans-serif' }}>
              sur ce type de dossier
            </div>
          </div>
          {ex.note && (
            <div style={{
              background: 'rgba(253,199,28,0.15)', borderRadius: '8px',
              padding: '10px 12px', marginTop: '16px',
            }}>
              <span style={{ fontSize: '11px', color: '#92620A', fontStyle: 'italic', fontFamily: 'Quicksand, sans-serif' }}>
                ℹ️ {ex.note}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function BlocCTA({ onContactClick, navigate, isArchive = false }) {
  const [hoveredPrimary, setHoveredPrimary] = useState(false)

  return (
    <div style={{
      background: 'linear-gradient(135deg, #04255B, #162CA1)',
      borderRadius: '20px',
      padding: '40px 48px',
      textAlign: 'center',
      marginBottom: '40px',
    }}>
      <img src={logoBlanc} alt="SunnyGo" style={{ width: '48px', opacity: 0.3, marginBottom: '16px', display: 'block', margin: '0 auto 16px auto' }} />
      <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '24px', color: 'white', marginBottom: '8px', marginTop: 0 }}>
        Vous avez un prospect pour ce produit ?
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '28px', marginTop: 0 }}>
        Transmettez-nous le contact — notre équipe prend le relais sous 24h.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {!isArchive && <button
          onClick={onContactClick}
          style={{
            background: hoveredPrimary ? '#E59319' : '#FDC71C',
            color: '#04255B',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            borderRadius: '50px',
            padding: '14px 32px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={() => setHoveredPrimary(true)}
          onMouseLeave={() => setHoveredPrimary(false)}
        >
          Je veux commercialiser ce produit →
        </button>}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '50px',
            padding: '14px 32px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
        >
          ← Retour au Hub
        </button>
      </div>
    </div>
  )
}


export default function ProduitDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const { produits } = useAdminData()

  const produit = produits.find(p => p.id === id)

  if (!produit) {
    return (
      <div style={{ fontFamily: 'Quicksand, sans-serif', minHeight: '100vh', background: '#F8F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ color: '#04255B', fontSize: '28px', fontWeight: 800, margin: 0 }}>Produit introuvable</h1>
        <p style={{ color: '#6B7280', fontSize: '15px', margin: 0 }}>Ce produit n'existe pas ou a été supprimé.</p>
        <button
          onClick={() => navigate('/')}
          style={{ background: '#04255B', color: 'white', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px', borderRadius: '50px', padding: '12px 28px', border: 'none', cursor: 'pointer' }}
        >
          ← Retour au Hub
        </button>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .pd-hero-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 768px) { .pd-hero-grid { grid-template-columns: 55% 43%; gap: 40px; } }
        .pd-remu-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .pd-remu-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }
        .pd-docs-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 768px) { .pd-docs-grid { grid-template-columns: 1fr 1fr; gap: 12px; } }
        .pd-exemple-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .pd-exemple-grid { grid-template-columns: 1fr 1fr; gap: 24px; } }
      `}</style>
      <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <Breadcrumb produit={produit} navigate={navigate} />
          {produit.archive && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: '#F3F4F6', borderRadius: '12px', padding: '12px 18px',
              border: '1px solid #E5E7EB', marginBottom: '16px',
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>🗂️</span>
              <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500, margin: 0, fontFamily: 'Quicksand, sans-serif' }}>
                Ce produit n&apos;est plus commercialisé par SunnyGo. Cette fiche est conservée à titre d&apos;historique.
              </p>
            </div>
          )}
          <HeroProduit produit={produit} />
          <BlocRemuneration produit={produit} />
          {!produit.archive && (
            <>
              <BlocDescription produit={produit} />
              <BlocMateriel produit={produit} />
              <BlocEligibilite produit={produit} />
              <BlocProcess produit={produit} />
              <BlocDocuments produit={produit} />
              <BlocExempleDossier produit={produit} />
              <BlocCTA onContactClick={() => setModalOpen(true)} navigate={navigate} />
            </>
          )}
        </div>
        {modalOpen && <ModaleCTA produit={produit} onClose={() => setModalOpen(false)} />}
      </div>
    </>
  )
}
