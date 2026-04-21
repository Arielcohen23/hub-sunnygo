import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAdminData from '../../hooks/useAdminData'

// ─── Chevron ──────────────────────────────────────────────────────────────────
function Chevron({ open }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      style={{
        flexShrink: 0,
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Filter item ──────────────────────────────────────────────────────────────
function FilterItem({ itemKey, icon, label, selected, onSelect, indent = false, bientot = false, greyActive = false }) {
  const isActive = selected === itemKey
  const defaultColor = indent ? '#6B7280' : '#4B5563'
  const activeColor = greyActive ? '#6B7280' : '#04255B'
  const activeBorder = greyActive ? '2.5px solid #9CA3AF' : '2px solid #FDC71C'

  return (
    <div style={{ margin: '1px 8px' }}>
      <button
        onClick={() => !bientot && onSelect(itemKey)}
        className="w-full text-left flex items-center gap-2 font-quicksand"
        style={{
          fontSize: indent ? '12px' : '13px',
          fontWeight: isActive ? 700 : indent ? 500 : 600,
          padding: indent ? '6px 10px 6px 34px' : '7px 10px',
          borderRadius: '8px',
          cursor: bientot ? 'default' : 'pointer',
          color: isActive ? activeColor : defaultColor,
          background: isActive ? '#EFF6FF' : 'transparent',
          borderLeft: isActive ? activeBorder : '2px solid transparent',
          width: '100%',
        }}
        onMouseEnter={e => {
          if (!isActive && !bientot) {
            e.currentTarget.style.background = '#F8F7F4'
            e.currentTarget.style.color = '#04255B'
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = defaultColor
          }
        }}
      >
        <span style={{ fontSize: indent ? '13px' : '15px', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
        <span className="flex-1 truncate">{label}</span>
        {bientot && (
          <span
            className="font-quicksand font-bold flex-shrink-0"
            style={{
              fontSize: '9px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              background: '#F3F4F6',
              color: '#9CA3AF',
              borderRadius: '50px',
              padding: '2px 6px',
            }}
          >
            Bientôt
          </span>
        )}
      </button>
    </div>
  )
}

// ─── Accordion section ────────────────────────────────────────────────────────
function AccordionSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between font-quicksand font-bold"
        style={{
          padding: '12px 20px',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#04255B',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          width: '100%',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#F8F7F4'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <span>{title}</span>
        <Chevron open={open} />
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '500px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.25s ease, opacity 0.2s ease',
        }}
      >
        {children}
        <div style={{ height: '8px' }} />
      </div>
    </div>
  )
}

// ─── FILTER PANEL ─────────────────────────────────────────────────────────────
export default function FilterPanel({ selected, onSelect }) {
  const { produits } = useAdminData()
  const courtageDisponible = produits.filter(p => p.categorie === 'Courtage' && p.disponible !== false && !p.archive).length > 0
  const [proOpen, setProOpen] = useState(false)
  const isProFamilyActive = ['pro-tous', 'pro-industriel', 'pro-tertiaire', 'pro-agriculteur', 'pro-collectivite'].includes(selected)

  return (
    <div className="flex flex-col" style={{ background: '#ffffff', borderRight: '1px solid #F0EEE9', minHeight: '100%' }}>

      {/* ── Produits du moment (standalone) ── */}
      <div style={{ padding: '16px 0 8px' }}>
        <FilterItem itemKey="vedette" icon="⭐" label="Produits du moment" selected={selected} onSelect={onSelect} />
      </div>

      {/* Séparateur */}
      <div style={{ borderBottom: '1px solid #F0EEE9', margin: '0 0 8px' }} />

      {/* ── Accordéon 1 : Type de produit ── */}
      <AccordionSection title="Type de produit" defaultOpen>
        <FilterItem itemKey="cee"      icon="⚡" label="CEE — Économies d'Énergie" selected={selected} onSelect={onSelect} />
        <FilterItem itemKey="pv"       icon="☀️" label="Panneaux Photovoltaïques"  selected={selected} onSelect={onSelect} />
        <FilterItem itemKey="courtage" icon="📊" label="Courtage en Énergie"       selected={selected} onSelect={onSelect} bientot={!courtageDisponible} />
        <FilterItem itemKey="tiers"    icon="🤝" label="Tiers Investissement"      selected={selected} onSelect={onSelect} />
      </AccordionSection>

      {/* Séparateur */}
      <div style={{ borderTop: '1px solid #F0EEE9', margin: '8px 0' }} />

      {/* ── Accordéon 2 : Type de client ── */}
      <AccordionSection title="Type de client" defaultOpen>
        <FilterItem itemKey="particulier" icon="👤" label="Particulier" selected={selected} onSelect={onSelect} />

        {/* Professionnel — avec chevron pour les sous-items */}
        <div style={{ margin: '1px 8px' }}>
          <button
            onClick={() => { onSelect('pro-tous'); setProOpen(o => !o) }}
            className="w-full text-left flex items-center gap-2 font-quicksand"
            style={{
              fontSize: '13px',
              fontWeight: selected === 'pro-tous' ? 700 : 600,
              padding: '7px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: selected === 'pro-tous' ? '#04255B' : isProFamilyActive ? '#04255B' : '#4B5563',
              background: selected === 'pro-tous' ? '#EFF6FF' : 'transparent',
              borderLeft: selected === 'pro-tous' ? '2px solid #FDC71C' : '2px solid transparent',
              width: '100%',
            }}
            onMouseEnter={e => {
              if (selected !== 'pro-tous') {
                e.currentTarget.style.background = '#F8F7F4'
                e.currentTarget.style.color = '#04255B'
              }
            }}
            onMouseLeave={e => {
              if (selected !== 'pro-tous') {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = isProFamilyActive ? '#04255B' : '#4B5563'
              }
            }}
          >
            <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0 }}>🏢</span>
            <span className="flex-1 truncate">Professionnel</span>
            <Chevron open={proOpen} />
          </button>
        </div>

        {/* Sous-items Professionnel */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: proOpen ? '200px' : '0',
            opacity: proOpen ? 1 : 0,
            transition: 'max-height 0.25s ease, opacity 0.2s ease',
          }}
        >
          <FilterItem itemKey="pro-industriel"   icon="🏭" label="Industriel"    selected={selected} onSelect={onSelect} indent />
          <FilterItem itemKey="pro-tertiaire"    icon="🏗️" label="Tertiaire"     selected={selected} onSelect={onSelect} indent />
          <FilterItem itemKey="pro-agriculteur"  icon="🌾" label="Agriculteur"   selected={selected} onSelect={onSelect} indent />
          <FilterItem itemKey="pro-collectivite" icon="🏛️" label="Collectivités" selected={selected} onSelect={onSelect} indent />
        </div>
      </AccordionSection>

      {/* ── Archives ── */}
      <div style={{ borderTop: '1px solid #F0EEE9', margin: '8px 0' }} />
      <div
        className="font-quicksand font-bold uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#9CA3AF', padding: '16px 16px 4px' }}
      >
        Archives
      </div>
      <FilterItem itemKey="archives" icon="🗂️" label="Produits archivés" selected={selected} onSelect={onSelect} greyActive />

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Lien bas ── */}
      <div style={{ borderTop: '1px solid #F0EEE9' }}>
        <Link
          to="/comment-ca-marche"
          className="block font-quicksand font-semibold"
          style={{ fontSize: '12px', color: '#FDC71C', padding: '14px 20px' }}
          onMouseEnter={e => e.currentTarget.style.color = '#E59319'}
          onMouseLeave={e => e.currentTarget.style.color = '#FDC71C'}
        >
          Comment ça marche →
        </Link>
      </div>
    </div>
  )
}
