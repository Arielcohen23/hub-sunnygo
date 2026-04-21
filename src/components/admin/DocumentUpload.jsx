import { useState } from 'react'

const DOC_TYPES = ['pdf', 'slides', 'image', 'video', 'autre']

const TYPE_ICONS = {
  pdf: '📄',
  slides: '📊',
  image: '🖼️',
  video: '🎬',
  autre: '📎',
}

function EmptyDoc() {
  return (
    <div style={{ padding: '16px', border: '1.5px dashed #D1D5DB', borderRadius: '8px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px', fontFamily: 'Quicksand, sans-serif' }}>
      Aucun document — ajoutez-en un ci-dessous
    </div>
  )
}

function DocCard({ doc, index, onUpdate, onDelete, productId }) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState({ ...doc })

  function handleSave() {
    onUpdate(index, local)
    setEditing(false)
  }

  function handleCancel() {
    setLocal({ ...doc })
    setEditing(false)
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result
      const storageKey = `admin_docs_${productId}_${index}`
      try {
        localStorage.setItem(storageKey, base64)
        setLocal(prev => ({ ...prev, url: storageKey, nom: prev.nom || file.name }))
      } catch {
        alert('Fichier trop volumineux pour le stockage local. Utilisez une URL externe.')
      }
    }
    reader.readAsDataURL(file)
  }

  const inputStyle = {
    width: '100%',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '8px 10px',
    fontFamily: 'Quicksand, sans-serif',
    fontSize: '13px',
    color: '#04255B',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        marginBottom: '8px',
      }}
    >
      {!editing ? (
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>{TYPE_ICONS[doc.type] || '📎'}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '13px', color: '#04255B', marginBottom: '2px' }}>
              {doc.nom || '(sans nom)'}
            </div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>{doc.description}</div>
            <div style={{ fontSize: '10px', color: '#D1D5DB', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {doc.url}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <button
              onClick={() => setEditing(true)}
              style={{ background: '#F3F4F6', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, color: '#6B7280' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
            >
              ✏️ Modifier
            </button>
            <button
              onClick={() => onDelete(index)}
              style={{ background: '#FEE2E2', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, color: '#DC2626' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FECACA'}
              onMouseLeave={e => e.currentTarget.style.background = '#FEE2E2'}
            >
              🗑 Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Nom</label>
              <input value={local.nom} onChange={e => setLocal(p => ({ ...p, nom: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Type</label>
              <select
                value={local.type}
                onChange={e => setLocal(p => ({ ...p, type: e.target.value }))}
                style={{ ...inputStyle }}
              >
                {DOC_TYPES.map(t => <option key={t} value={t}>{TYPE_ICONS[t]} {t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Description</label>
            <input value={local.description} onChange={e => setLocal(p => ({ ...p, description: e.target.value }))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>URL externe</label>
            <input value={local.url && !local.url.startsWith('admin_docs_') ? local.url : ''} onChange={e => setLocal(p => ({ ...p, url: e.target.value }))} placeholder="https://..." style={inputStyle} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Ou uploader un fichier (stocké localement)
            </label>
            <input type="file" onChange={handleFileChange} style={{ fontSize: '12px', fontFamily: 'Quicksand, sans-serif' }} />
            {local.url && local.url.startsWith('admin_docs_') && (
              <p style={{ fontSize: '11px', color: '#16A34A', marginTop: '4px' }}>✓ Fichier stocké localement</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={handleCancel}
              style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, color: '#6B7280' }}
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              style={{ background: '#04255B', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, color: 'white' }}
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AddDocForm({ onAdd, onCancel }) {
  const [doc, setDoc] = useState({ nom: '', description: '', type: 'pdf', url: '' })

  const inputStyle = {
    width: '100%',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '8px 10px',
    fontFamily: 'Quicksand, sans-serif',
    fontSize: '13px',
    color: '#04255B',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ background: '#F8F7F4', borderRadius: '10px', border: '1.5px dashed #04255B', padding: '16px', marginBottom: '8px' }}>
      <p style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '13px', color: '#04255B', marginTop: 0, marginBottom: '12px' }}>
        Nouveau document
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Nom *</label>
          <input value={doc.nom} onChange={e => setDoc(p => ({ ...p, nom: e.target.value }))} placeholder="Présentation commerciale" style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Type</label>
          <select value={doc.type} onChange={e => setDoc(p => ({ ...p, type: e.target.value }))} style={{ ...inputStyle }}>
            {DOC_TYPES.map(t => <option key={t} value={t}>{TYPE_ICONS[t]} {t}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Description</label>
        <input value={doc.description} onChange={e => setDoc(p => ({ ...p, description: e.target.value }))} placeholder="Description du document" style={inputStyle} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>URL</label>
        <input value={doc.url} onChange={e => setDoc(p => ({ ...p, url: e.target.value }))} placeholder="https://... ou laisser vide" style={inputStyle} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, color: '#6B7280' }}
        >
          Annuler
        </button>
        <button
          onClick={() => { if (doc.nom) { onAdd({ ...doc, url: doc.url || '#' }); } }}
          disabled={!doc.nom}
          style={{ background: doc.nom ? '#04255B' : '#9CA3AF', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: doc.nom ? 'pointer' : 'not-allowed', fontSize: '13px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, color: 'white' }}
        >
          Ajouter
        </button>
      </div>
    </div>
  )
}

export default function DocumentUpload({ documents, onChange, productId }) {
  const [showAddForm, setShowAddForm] = useState(false)

  const docs = documents || []

  function handleUpdate(index, newDoc) {
    const updated = docs.map((d, i) => i === index ? newDoc : d)
    onChange(updated)
  }

  function handleDelete(index) {
    const updated = docs.filter((_, i) => i !== index)
    onChange(updated)
  }

  function handleAdd(newDoc) {
    onChange([...docs, newDoc])
    setShowAddForm(false)
  }

  return (
    <div>
      {docs.length === 0 && !showAddForm && <EmptyDoc />}

      {docs.map((doc, i) => (
        <DocCard
          key={i}
          doc={doc}
          index={i}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          productId={productId}
        />
      ))}

      {showAddForm && (
        <AddDocForm
          onAdd={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            background: 'none',
            border: '1.5px dashed #D1D5DB',
            borderRadius: '8px',
            color: '#6B7280',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            padding: '8px 16px',
            cursor: 'pointer',
            width: '100%',
            marginTop: docs.length > 0 ? '8px' : '0',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#04255B'; e.currentTarget.style.color = '#04255B' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#6B7280' }}
        >
          + Ajouter un document
        </button>
      )}
    </div>
  )
}
