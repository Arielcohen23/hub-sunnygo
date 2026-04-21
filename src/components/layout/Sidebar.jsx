import { Link } from 'react-router-dom'
import { produits } from '../../data/produits'

const courtageCount = produits.filter(p => p.categorie === 'Courtage').length

function SectionTitle({ label, first = false }) {
  return (
    <div
      className="font-quicksand font-bold uppercase"
      style={{
        fontSize: '10px',
        letterSpacing: '0.12em',
        color: '#9CA3AF',
        padding: first ? '12px 16px 4px' : '20px 16px 4px',
      }}
    >
      {label}
    </div>
  )
}

function NavItem({ itemKey, icon, label, selected, onSelect, indent = false, bientot = false }) {
  const isActive = selected === itemKey

  return (
    <div style={{ margin: '1px 8px' }}>
      <button
        onClick={() => !bientot && onSelect(itemKey)}
        className="w-full text-left flex items-center gap-2 font-quicksand transition-default"
        style={{
          fontSize: indent ? '12px' : '13px',
          fontWeight: isActive ? 700 : indent ? 500 : 600,
          padding: indent ? '6px 10px 6px 28px' : '7px 10px',
          borderRadius: '8px',
          cursor: bientot ? 'default' : 'pointer',
          color: isActive ? '#04255B' : '#4B5563',
          background: isActive ? '#EEF2FF' : 'transparent',
          borderLeft: isActive ? '2px solid #FDC71C' : '2px solid transparent',
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
            e.currentTarget.style.color = '#4B5563'
          }
        }}
      >
        <span style={{ fontSize: indent ? '13px' : '15px', lineHeight: 1, flexShrink: 0 }}>
          {icon}
        </span>
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

export default function Sidebar({ selected, onSelect }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: '#ffffff',
        width: '240px',
        flexShrink: 0,
        borderRight: '1px solid #F0EEE9',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {/* ── Produits du moment ── */}
      <div style={{ paddingTop: '16px' }}>
        <NavItem itemKey="vedette" icon="⭐" label="Produits du moment" selected={selected} onSelect={onSelect} />
      </div>

      {/* ── Type de produit ── */}
      <SectionTitle label="Type de produit" />
      <NavItem itemKey="cee"      icon="⚡" label="CEE — Économies d'Énergie" selected={selected} onSelect={onSelect} />
      <NavItem itemKey="pv"       icon="☀️" label="Panneaux Photovoltaïques"  selected={selected} onSelect={onSelect} />
      <NavItem itemKey="courtage" icon="📊" label="Courtage en Énergie"       selected={selected} onSelect={onSelect} bientot={courtageCount === 0} />
      <NavItem itemKey="tiers"    icon="🤝" label="Tiers Investissement"      selected={selected} onSelect={onSelect} />

      {/* ── Type de client ── */}
      <SectionTitle label="Type de client" />
      <NavItem itemKey="particulier"      icon="👤" label="Particulier"          selected={selected} onSelect={onSelect} />
      <NavItem itemKey="pro-tous"         icon="🏢" label="Professionnel"        selected={selected} onSelect={onSelect} />
      <NavItem itemKey="pro-industriel"   icon="🏭" label="Industriel"           selected={selected} onSelect={onSelect} indent />
      <NavItem itemKey="pro-tertiaire"    icon="🏗️" label="Tertiaire"           selected={selected} onSelect={onSelect} indent />
      <NavItem itemKey="pro-agriculteur"  icon="🌾" label="Agriculteur"          selected={selected} onSelect={onSelect} indent />
      <NavItem itemKey="pro-collectivite" icon="🏛️" label="Collectivités"       selected={selected} onSelect={onSelect} indent />

      {/* Spacer */}
      <div className="flex-1" />

      {/* ── Lien bas ── */}
      <div style={{ borderTop: '1px solid #F0EEE9' }}>
        <Link
          to="/comment-ca-marche"
          className="block font-quicksand font-semibold transition-default"
          style={{ fontSize: '12px', color: '#FDC71C', padding: '14px 16px' }}
          onMouseEnter={e => e.currentTarget.style.color = '#E59319'}
          onMouseLeave={e => e.currentTarget.style.color = '#FDC71C'}
        >
          Comment ça marche →
        </Link>
      </div>
    </div>
  )
}
