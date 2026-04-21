import { useState, useEffect } from 'react'
import useAdminData from '../../hooks/useAdminData'
import DocumentUpload from '../../components/admin/DocumentUpload'

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

export default function AdminDocuments() {
  const { produits, updateProduit } = useAdminData()
  const [selectedId, setSelectedId] = useState('')
  const [documents, setDocuments] = useState([])
  const [toast, setToast] = useState(null)

  const selectedProduit = produits.find(p => p.id === selectedId)

  useEffect(() => {
    if (selectedProduit) {
      setDocuments(selectedProduit.documents || [])
    } else {
      setDocuments([])
    }
  }, [selectedId, selectedProduit])

  function handleSave() {
    if (!selectedId) return
    updateProduit(selectedId, { documents })
    setToast('Documents enregistrés')
  }

  const selectStyle = {
    border: '1.5px solid #E5E7EB',
    borderRadius: '10px',
    padding: '10px 14px',
    fontFamily: 'Quicksand, sans-serif',
    fontSize: '14px',
    color: '#04255B',
    outline: 'none',
    background: 'white',
    width: '100%',
    maxWidth: '400px',
    cursor: 'pointer',
  }

  return (
    <div style={{ padding: '32px', fontFamily: 'Quicksand, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#04255B', margin: '0 0 6px 0' }}>
          Gestion des documents
        </h1>
        <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>
          Gérez les supports commerciaux associés à chaque produit.
        </p>
      </div>

      {/* Product selector */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px', marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Sélectionner un produit
        </label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          style={selectStyle}
        >
          <option value="">— Choisir un produit —</option>
          {produits.map(p => (
            <option key={p.id} value={p.id}>
              {p.nom} {p.archive ? '(archivé)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Documents section */}
      {selectedProduit && (
        <>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '16px', color: '#04255B', margin: '0 0 4px 0' }}>
                  Documents de : {selectedProduit.nom}
                </h2>
                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                  {documents.length} document{documents.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <DocumentUpload
              documents={documents}
              onChange={setDocuments}
              productId={selectedId}
            />
          </div>

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
              💾 Enregistrer les documents
            </button>
          </div>
        </>
      )}

      {!selectedId && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px' }}>
          <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>📄</span>
          Sélectionnez un produit pour gérer ses documents
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
