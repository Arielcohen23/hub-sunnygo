import { useState, useEffect } from 'react'
import useAdminData from '../../hooks/useAdminData'

const BADGE_JAUNE_OPTIONS = ['', 'Commission élevée', 'Gros volume']

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

export default function AdminVedette() {
  const { produits, saveProduits } = useAdminData()
  const [local, setLocal] = useState(() => produits.map(p => ({ ...p })))
  const [toast, setToast] = useState(null)

  useEffect(() => {
    setLocal(produits.map(p => ({ ...p })))
  }, [produits])

  const activeProduits = local.filter(p => !p.archive)

  function toggleVedette(id) {
    setLocal(prev => prev.map(p => p.id === id ? { ...p, enVedette: !p.enVedette } : p))
  }

  function updateTag(id, field, value) {
    setLocal(prev => prev.map(p => p.id === id ? { ...p, tags: { ...p.tags, [field]: value } } : p))
  }

  function handleSave() {
    saveProduits(local)
    setToast('Modifications enregistrées')
  }

  return (
    <div style={{ padding: '32px', fontFamily: 'Quicksand, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#04255B', margin: '0 0 6px 0' }}>
          Produits du moment
        </h1>
        <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>
          Ces produits apparaissent dans la section &quot;Produits du moment&quot;. Cliquez pour activer/désactiver.
        </p>
      </div>

      {/* Grid de cartes vedette */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {activeProduits.map(p => {
          const isVedette = p.enVedette
          return (
            <div
              key={p.id}
              onClick={() => toggleVedette(p.id)}
              style={{
                position: 'relative',
                background: isVedette ? '#FFFBEB' : '#F8F7F4',
                border: isVedette ? '2px solid #FDC71C' : '2px solid transparent',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                opacity: isVedette ? 1 : 0.7,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(4,37,91,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = isVedette ? '1' : '0.7'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {isVedette && (
                <span
                  style={{
                    position: 'absolute', top: '-8px', right: '10px',
                    background: '#FDC71C', color: '#04255B',
                    fontSize: '10px', fontWeight: 800,
                    padding: '2px 8px', borderRadius: '50px',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}
                >
                  ✓ En vedette
                </span>
              )}
              <p style={{ fontWeight: 700, fontSize: '13px', color: '#04255B', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                {p.nom}
              </p>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 8px 0' }}>{p.categorie}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#FDC71C' }}>{p.score}</span>
                <span style={{ fontSize: '10px', color: '#D1D5DB' }}>/10</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Section badges */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#04255B', margin: '0 0 16px 0' }}>
          Configuration des badges
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                {['Produit', '🔥 Hot', '✨ Nouveau', '🏷️ Badge jaune'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeProduits.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < activeProduits.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, fontSize: '13px', color: '#04255B' }}>
                    {p.nom}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={!!p.tags?.hot}
                        onChange={e => updateTag(p.id, 'hot', e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#04255B' }}
                      />
                    </label>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={!!p.tags?.nouveau}
                        onChange={e => updateTag(p.id, 'nouveau', e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#04255B' }}
                      />
                    </label>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <select
                      value={p.tags?.badgeJaune || ''}
                      onChange={e => updateTag(p.id, 'badgeJaune', e.target.value || null)}
                      style={{ border: '1px solid #E5E7EB', borderRadius: '6px', padding: '5px 8px', fontFamily: 'Quicksand, sans-serif', fontSize: '12px', color: '#04255B', outline: 'none', background: 'white' }}
                    >
                      {BADGE_JAUNE_OPTIONS.map(o => <option key={o} value={o}>{o || '— Aucun —'}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save button */}
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
          💾 Enregistrer les modifications
        </button>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
