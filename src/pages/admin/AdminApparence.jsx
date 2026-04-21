import { useState, useEffect, useRef } from 'react'
import useAdminData from '../../hooks/useAdminData'

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed', bottom: '24px', right: '24px',
        background: '#16A34A', color: 'white',
        fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px',
        padding: '14px 24px', borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: '8px',
      }}
    >
      <span>✓</span> {message}
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

const fieldStyle = { marginBottom: '14px' }

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

export default function AdminApparence() {
  const { produits, apparence, saveProduits, saveApparence } = useAdminData()
  const [localApparence, setLocalApparence] = useState({ ...apparence })
  const [toast, setToast] = useState(null)
  const dragIndex = useRef(null)
  const [dragOver, setDragOver] = useState(null)

  useEffect(() => {
    setLocalApparence({ ...apparence })
  }, [apparence])

  // Vedette products for drag & drop ordering
  const vedetteIds = produits
    .filter(p => p.enVedette && !p.archive)
    .map(p => p.id)

  const [orderedVedetteIds, setOrderedVedetteIds] = useState(vedetteIds)

  useEffect(() => {
    setOrderedVedetteIds(produits.filter(p => p.enVedette && !p.archive).map(p => p.id))
  }, [produits])

  function setApparenceField(key, value) {
    setLocalApparence(prev => ({ ...prev, [key]: value }))
  }

  function setStatField(index, key, value) {
    setLocalApparence(prev => {
      const stats = prev.stats.map((s, i) => i === index ? { ...s, [key]: value } : s)
      return { ...prev, stats }
    })
  }

  // Drag & drop for vedette order
  function handleDragStart(e, index) {
    dragIndex.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, index) {
    e.preventDefault()
    setDragOver(index)
  }

  function handleDrop(e, index) {
    e.preventDefault()
    setDragOver(null)
    if (dragIndex.current === null || dragIndex.current === index) return
    const newOrder = [...orderedVedetteIds]
    const [removed] = newOrder.splice(dragIndex.current, 1)
    newOrder.splice(index, 0, removed)
    dragIndex.current = null
    setOrderedVedetteIds(newOrder)
  }

  function handleDragEnd() {
    dragIndex.current = null
    setDragOver(null)
  }

  function handleSave() {
    // Save apparence
    saveApparence(localApparence)

    // Reorder produits based on vedette order
    const nonVedette = produits.filter(p => !p.enVedette || p.archive)
    const vedetteOrdered = orderedVedetteIds
      .map(id => produits.find(p => p.id === id))
      .filter(Boolean)

    // Rebuild: keep original order of non-vedette, but vedette items are reordered among themselves
    const newProduits = produits.map(p => {
      if (p.enVedette && !p.archive) {
        const newIndex = orderedVedetteIds.indexOf(p.id)
        return { ...p, _vedetteOrder: newIndex }
      }
      return p
    })

    // Sort vedette products by their new order within the array
    const sorted = [...newProduits].sort((a, b) => {
      const aIsVedette = a.enVedette && !a.archive
      const bIsVedette = b.enVedette && !b.archive
      if (aIsVedette && bIsVedette) {
        return (a._vedetteOrder || 0) - (b._vedetteOrder || 0)
      }
      return 0
    }).map(({ _vedetteOrder, ...rest }) => rest)

    saveProduits(sorted)
    setToast('Apparence enregistrée')
  }

  return (
    <div style={{ padding: '32px', fontFamily: 'Quicksand, sans-serif' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#04255B', margin: '0 0 6px 0' }}>
          Apparence du portail
        </h1>
        <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>
          Personnalisez les textes et l&apos;ordre d&apos;affichage du portail.
        </p>
      </div>

      {/* Section 1 — Ordre des produits du moment */}
      <SectionCard
        title="Ordre d'affichage des produits du moment"
        subtitle="Glissez-déposez pour réordonner les produits en vedette."
      >
        {orderedVedetteIds.length === 0 ? (
          <p style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '20px' }}>
            Aucun produit en vedette. Activez-en depuis la page Vedette.
          </p>
        ) : (
          <div>
            {orderedVedetteIds.map((id, index) => {
              const produit = produits.find(p => p.id === id)
              if (!produit) return null
              return (
                <div
                  key={id}
                  draggable
                  onDragStart={e => handleDragStart(e, index)}
                  onDragOver={e => handleDragOver(e, index)}
                  onDrop={e => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    background: dragOver === index ? 'rgba(4,37,91,0.05)' : index % 2 === 0 ? '#F9FAFB' : 'white',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    cursor: 'grab',
                    border: dragOver === index ? '2px solid #04255B' : '2px solid transparent',
                    userSelect: 'none',
                  }}
                >
                  <span style={{ color: '#D1D5DB', fontSize: '18px' }}>⠿</span>
                  <span style={{ background: '#EFF6FF', color: '#04255B', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '50px', flexShrink: 0 }}>
                    #{index + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#04255B', margin: 0 }}>{produit.nom}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>{produit.categorie} · Score {produit.score}/10</p>
                  </div>
                  <span style={{ background: '#FFFBEB', color: '#92620A', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '50px', border: '1px solid rgba(253,199,28,0.4)' }}>
                    ⭐ En vedette
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </SectionCard>

      {/* Section 2 — Textes hero */}
      <SectionCard
        title="Textes de la page d'accueil"
        subtitle="Modifiez les textes affichés dans le bloc hero."
      >
        <div style={fieldStyle}>
          <label style={labelStyle}>Titre hero</label>
          <input
            value={localApparence.titreHero || ''}
            onChange={e => setApparenceField('titreHero', e.target.value)}
            placeholder="Le Hub SunnyGo"
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Sous-titre hero</label>
          <input
            value={localApparence.sousTitreHero || ''}
            onChange={e => setApparenceField('sousTitreHero', e.target.value)}
            placeholder="L'espace dédié à nos apporteurs d'affaires"
            style={inputStyle}
          />
        </div>
      </SectionCard>

      {/* Section 3 — Statistiques */}
      <SectionCard
        title="Statistiques de la page d'accueil"
        subtitle="Les 3 chiffres clés affichés dans le bloc hero."
      >
        {(localApparence.stats || []).map((stat, i) => (
          <div
            key={i}
            style={{
              background: '#F9FAFB',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '12px',
              border: '1px solid #F3F4F6',
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', marginTop: 0 }}>
              Statistique {i + 1}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '10px' }}>
              <div>
                <label style={labelStyle}>Valeur</label>
                <input
                  value={stat.val || ''}
                  onChange={e => setStatField(i, 'val', e.target.value)}
                  placeholder="Ex: + 30"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Label</label>
                <input
                  value={stat.label || ''}
                  onChange={e => setStatField(i, 'label', e.target.value)}
                  placeholder="Ex: apporteurs d'affaires..."
                  style={inputStyle}
                />
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>
              <input
                type="checkbox"
                checked={!!stat.yellow}
                onChange={e => setStatField(i, 'yellow', e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#FDC71C' }}
              />
              Afficher en jaune (accent)
            </label>
          </div>
        ))}
      </SectionCard>

      {/* Save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          style={{
            background: '#04255B', color: 'white', border: 'none',
            borderRadius: '10px', padding: '12px 28px',
            fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#162CA1'}
          onMouseLeave={e => e.currentTarget.style.background = '#04255B'}
        >
          💾 Enregistrer l&apos;apparence
        </button>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
