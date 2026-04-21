import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useAdminData from '../../hooks/useAdminData'
import ProduitForm from '../../components/admin/ProduitForm'

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: '#16A34A',
        color: 'white',
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 700,
        fontSize: '14px',
        padding: '14px 24px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>✓</span>
      {message}
    </div>
  )
}

function ConfirmModal({ message, onConfirm, onCancel }) {
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
          maxWidth: '400px', width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '18px', color: '#04255B', margin: '0 0 12px 0' }}>
          Confirmation
        </h3>
        <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '14px', color: '#6B7280', margin: '0 0 24px 0' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '13px', color: '#6B7280' }}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            style={{ background: '#EF4444', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '13px', color: 'white' }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ produit }) {
  if (produit.archive) {
    return (
      <span style={{ background: '#F3F4F6', color: '#6B7280', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '50px', fontFamily: 'Quicksand, sans-serif' }}>
        Archivé
      </span>
    )
  }
  if (produit.disponible === false) {
    return (
      <span style={{ background: '#FFFBEB', color: '#92620A', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '50px', fontFamily: 'Quicksand, sans-serif', border: '1px solid rgba(253,199,28,0.4)' }}>
        À venir
      </span>
    )
  }
  return (
    <span style={{ background: '#F0FDF4', color: '#16A34A', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '50px', fontFamily: 'Quicksand, sans-serif', border: '1px solid #BBF7D0' }}>
      Actif
    </span>
  )
}

function ProduitsList() {
  const { produits, deleteProduit, updateProduit, addProduit } = useAdminData()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  function handleDelete(id) {
    setConfirmDelete(id)
  }

  function confirmDeleteAction() {
    deleteProduit(confirmDelete)
    setConfirmDelete(null)
    setToast('Produit supprimé')
  }

  function handleDuplicate(produit) {
    const newProduit = {
      ...produit,
      id: `${produit.id}-copie`,
      nom: `${produit.nom} (copie)`,
      enVedette: false,
    }
    addProduit(newProduit)
    setToast('Produit dupliqué')
  }

  function handleArchiveToggle(produit) {
    updateProduit(produit.id, { archive: !produit.archive })
    setToast(produit.archive ? 'Produit désarchivé' : 'Produit archivé')
  }

  const btnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 600,
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'background 0.15s',
  }

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 800, fontSize: '24px', color: '#04255B', margin: 0 }}>
            Gestion des produits
          </h1>
          <span style={{ background: '#EFF6FF', color: '#04255B', fontSize: '13px', fontWeight: 700, padding: '3px 12px', borderRadius: '50px', border: '1px solid #BFDBFE' }}>
            {produits.length}
          </span>
        </div>
        <button
          onClick={() => navigate('/admin/produits/nouveau')}
          style={{
            background: '#04255B',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#162CA1'}
          onMouseLeave={e => e.currentTarget.style.background = '#04255B'}
        >
          + Ajouter un produit
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              {['Nom', 'Catégorie', 'Score', 'Statut', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, i) => (
              <tr
                key={produit.id}
                style={{
                  borderBottom: i < produits.length - 1 ? '1px solid #F3F4F6' : 'none',
                  background: produit.archive ? '#FAFAFA' : 'white',
                }}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '13px', color: produit.archive ? '#9CA3AF' : '#04255B' }}>
                    {produit.nom}
                  </div>
                  <div style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '11px', color: '#9CA3AF', marginTop: '2px', fontStyle: 'italic' }}>
                    ID: {produit.id}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                    {produit.categorie}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 800, fontSize: '14px', color: '#FDC71C' }}>
                    {produit.score}
                  </span>
                  <span style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '11px', color: '#D1D5DB' }}>/10</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <StatusBadge produit={produit} />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => navigate(`/admin/produits/${produit.id}`)}
                      style={{ ...btnStyle, color: '#04255B' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#EFF6FF'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      title="Modifier"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDuplicate(produit)}
                      style={{ ...btnStyle, color: '#6B7280' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      title="Dupliquer"
                    >
                      📋 Dupliquer
                    </button>
                    <button
                      onClick={() => handleArchiveToggle(produit)}
                      style={{ ...btnStyle, color: '#92620A' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FFFBEB'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      title={produit.archive ? 'Désarchiver' : 'Archiver'}
                    >
                      🗂 {produit.archive ? 'Désarchiver' : 'Archiver'}
                    </button>
                    <button
                      onClick={() => handleDelete(produit.id)}
                      style={{ ...btnStyle, color: '#DC2626' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      title="Supprimer"
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      {confirmDelete && (
        <ConfirmModal
          message="Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}

function ProduitEditor({ id }) {
  const { produits, updateProduit, addProduit } = useAdminData()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const isNew = !id || id === 'nouveau'
  const produit = isNew ? null : produits.find(p => p.id === id)

  if (!isNew && !produit) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
        <p style={{ color: '#EF4444', fontWeight: 700 }}>Produit introuvable : {id}</p>
        <button onClick={() => navigate('/admin/produits')} style={{ marginTop: '12px', background: '#04255B', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}>
          ← Retour à la liste
        </button>
      </div>
    )
  }

  function handleSave(data) {
    if (isNew) {
      addProduit(data)
    } else {
      updateProduit(id, data)
    }
    setToast('Modifications enregistrées')
    setTimeout(() => navigate('/admin/produits'), 1200)
  }

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/admin/produits')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '13px', padding: '6px 10px', borderRadius: '8px' }}
          onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          ← Retour
        </button>
        <span style={{ color: '#D1D5DB' }}>/</span>
        <h1 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 800, fontSize: '24px', color: '#04255B', margin: 0 }}>
          {isNew ? 'Nouveau produit' : `Modifier : ${produit?.nom}`}
        </h1>
      </div>

      <ProduitForm
        produit={produit}
        onSave={handleSave}
        onCancel={() => navigate('/admin/produits')}
      />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

export default function AdminProduits() {
  const { id } = useParams()
  const location = useLocation()

  const isNouveau = location.pathname.endsWith('/nouveau')
  const isEdit = !!id && !isNouveau
  const showForm = isNouveau || isEdit

  if (showForm) {
    return <ProduitEditor id={isNouveau ? 'nouveau' : id} />
  }

  return <ProduitsList />
}
