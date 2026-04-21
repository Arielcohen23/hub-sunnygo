import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import FilterPanel from '../components/layout/FilterPanel'
import ProduitCard from '../components/ui/ProduitCard'
import useFiltresProduits from '../hooks/useFiltresProduits'
import useAdminData from '../hooks/useAdminData'
import logoBlanc from '../assets/logo-blanc.png'

const FILTER_LABELS = {
  vedette:            'Produits du moment',
  cee:                "CEE — Économies d'Énergie",
  pv:                 'Panneaux Photovoltaïques',
  courtage:           'Courtage en Énergie',
  tiers:              'Tiers Investissement',
  particulier:        'Particulier',
  'pro-tous':         'Professionnel',
  'pro-industriel':   'Professionnel — Industriel',
  'pro-tertiaire':    'Professionnel — Tertiaire',
  'pro-agriculteur':  'Professionnel — Agriculteur',
  'pro-collectivite': 'Professionnel — Collectivités',
  'archives':         'Produits archivés',
}

// ─── Pillar ───────────────────────────────────────────────────────────────────
function Pillar({ bg, icon, titre, sub }) {
  return (
    <div className="flex items-start" style={{ gap: '10px' }}>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 36, height: 36, borderRadius: '8px', background: bg }}
      >
        {icon}
      </div>
      <div>
        <p className="font-quicksand font-bold" style={{ fontSize: '13px', color: '#04255B', lineHeight: 1.3 }}>
          {titre}
        </p>
        <p className="font-quicksand" style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
          {sub}
        </p>
      </div>
    </div>
  )
}

// ─── Hero bloc — pleine largeur ────────────────────────────────────────────────
function HeroBloc({ totalProduits, apparence }) {
  const titreHero = apparence?.titreHero || 'Le Hub SunnyGo'
  const sousTitreHero = apparence?.sousTitreHero || "L'espace dédié à nos apporteurs d'affaires"
  const stats = apparence?.stats || [
    { val: '+ 30', label: "apporteurs d'affaires partout en France", yellow: false },
    { val: String(totalProduits), label: 'produits disponibles sur le Hub', yellow: false },
    { val: '24h', label: 'délai de traitement des dossiers maximum', yellow: true },
  ]

  // Parse the hero title to highlight the word "Hub"
  const titleParts = titreHero.split('Hub')

  return (
    <div
      className="relative overflow-hidden hero-bloc-pad"
      style={{
        background: '#ffffff',
        border: '1px solid #F0EEE9',
        borderRadius: '20px',
        margin: '24px 24px 0',
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute', top: -60, right: -60, zIndex: 0,
          width: 280, height: 280, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(253,199,28,0.12) 0%, transparent 70%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid hero-grid">

          {/* LEFT — texte */}
          <div className="flex flex-col">
            {/* Badge */}
            <span
              className="self-start font-quicksand font-bold uppercase"
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: '#92620A',
                background: '#FDF3D0',
                border: '1px solid rgba(253,199,28,0.4)',
                borderRadius: '50px',
                padding: '4px 12px',
              }}
            >
              ✦ Espace apporteurs d'affaires
            </span>

            {/* Titre */}
            <div style={{ marginTop: '14px', marginBottom: '16px' }}>
              <p
                className="font-quicksand font-bold"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: '#04255B', lineHeight: 1.2 }}
              >
                {titleParts.length > 1 ? (
                  <>
                    {titleParts[0]}<span style={{ color: '#FDC71C' }}>Hub</span>{titleParts[1]}
                  </>
                ) : (
                  titreHero
                )}
              </p>
              <p
                className="font-quicksand"
                style={{ fontSize: '20px', fontWeight: 500, color: '#6B7280', marginTop: '4px' }}
              >
                {sousTitreHero}
              </p>
            </div>

            {/* Sous-titre */}
            <p
              className="font-quicksand"
              style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.75, maxWidth: '440px', marginBottom: '28px' }}
            >
              Accédez à l'ensemble de nos gammes de produits,
              à tous vos supports commerciaux et à vos grilles de rémunération.
              Tout ce qu'il vous faut pour convaincre et générer des commissions.
            </p>

            {/* 3 piliers */}
            <div className="flex flex-wrap" style={{ gap: '20px' }}>
              <Pillar
                bg="#FDF3D0"
                titre="Tous nos produits"
                sub="CEE · PV · Tiers invest"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E59319" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                }
              />
              <Pillar
                bg="#EEF2FF"
                titre="Supports commerciaux"
                sub="Fiches · Présentations · FAQ"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#04255B" strokeWidth="2">
                    <path strokeLinecap="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path strokeLinecap="round" d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                }
              />
              <Pillar
                bg="#F0FDF4"
                titre="Vos rémunérations"
                sub="Commissions par produit"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path strokeLinecap="round" d="M14.5 7.5h-4a2 2 0 000 4h3a2 2 0 010 4H9"/>
                    <path strokeLinecap="round" d="M12 6v1.5M12 16.5V18"/>
                  </svg>
                }
              />
            </div>
          </div>

          {/* RIGHT — stats */}
          <div
            className="self-start"
            style={{
              background: '#F8F7F4',
              borderRadius: '14px',
              padding: '28px 24px',
              border: '1px solid #F0EEE9',
              minWidth: '200px',
            }}
          >
            <p
              className="font-quicksand font-bold uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: '20px' }}
            >
              En quelques chiffres
            </p>
            {stats.map((s, i, arr) => (
              <div
                key={i}
                style={{
                  paddingTop:    i === 0 ? 0 : '14px',
                  paddingBottom: i === arr.length - 1 ? 0 : '14px',
                  borderBottom:  i < arr.length - 1 ? '1px solid #F0EEE9' : 'none',
                }}
              >
                <p
                  className="font-quicksand"
                  style={{ fontSize: '34px', fontWeight: 800, lineHeight: 1, color: s.yellow ? '#FDC71C' : '#04255B' }}
                >
                  {s.val}
                </p>
                <p className="font-quicksand" style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Image banner — pleine largeur ────────────────────────────────────────────
function ImageBanner() {
  return (
    <div
      className="relative overflow-hidden image-banner-h"
      style={{ background: '#0A1628', borderRadius: '20px', margin: '16px 24px 0' }}
    >
      <img
        src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&q=80"
        alt="Panneaux solaires"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(4,37,91,0.85) 0%, rgba(4,37,91,0.3) 60%, transparent 100%)',
        }}
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '32px 40px' }}>
        <span
          className="font-quicksand font-bold uppercase"
          style={{
            fontSize: '10px', letterSpacing: '0.1em',
            color: '#ffffff', background: 'rgba(255,255,255,0.15)',
            borderRadius: '50px', padding: '3px 10px',
            display: 'inline-block', marginBottom: '8px',
          }}
        >
          Solutions énergétiques
        </span>
        <p className="font-quicksand font-bold" style={{ fontSize: '22px', color: '#ffffff', lineHeight: 1.25, marginBottom: '4px' }}>
          Des solutions concrètes pour vos prospects
        </p>
        <p className="font-quicksand" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
          CEE · Photovoltaïque · Tiers investissement · Courtage
        </p>
      </div>
    </div>
  )
}

// ─── Header grille — vue vedette ──────────────────────────────────────────────
function VedetteHeader({ count }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
      <div>
        <p className="font-quicksand font-bold" style={{ fontSize: '18px', color: '#04255B' }}>
          🔥 Produits du moment
        </p>
        <p className="font-quicksand" style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>
          Sélection mise à jour par notre équipe
        </p>
      </div>
      <span
        className="font-quicksand font-semibold flex-shrink-0"
        style={{
          fontSize: '12px',
          color: '#ffffff',
          background: '#04255B',
          borderRadius: '50px',
          padding: '4px 12px',
        }}
      >
        {count} produit{count !== 1 ? 's' : ''}
      </span>
    </div>
  )
}

// ─── Header grille — vue filtre actif ─────────────────────────────────────────
function FilterHeader({ label, count, onReset, isArchives = false }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginBottom: '20px' }}>
      <div>
        <div className="flex items-center font-quicksand" style={{ gap: '6px', fontSize: '13px' }}>
          <span style={{ color: '#9CA3AF' }}>Hub</span>
          <span style={{ color: '#9CA3AF' }}>/</span>
          <span style={{ color: '#04255B', fontWeight: 700 }}>{label}</span>
        </div>
        {isArchives ? (
          <p className="font-quicksand" style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px', fontStyle: 'italic' }}>
            Produits que SunnyGo ne commercialise plus actuellement
          </p>
        ) : (
          <p className="font-quicksand" style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
            {count} produit{count !== 1 ? 's' : ''} trouvé{count !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <button
        onClick={onReset}
        className="font-quicksand"
        style={{
          fontSize: '11px', fontWeight: 500,
          color: '#6B7280',
          background: '#ffffff',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '6px 12px',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#04255B'; e.currentTarget.style.color = '#04255B' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280' }}
      >
        ← Retour aux produits du moment
      </button>
    </div>
  )
}

// ─── PAGE HUB ─────────────────────────────────────────────────────────────────
export default function Hub() {
  const [selected, setSelected]     = useState('vedette')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { filteredProducts }         = useFiltresProduits(selected)
  const { produits: allProduits, apparence } = useAdminData()
  const isVedette                    = selected === 'vedette'

  function handleSelect(key) {
    setSelected(key)
    setMobileOpen(false)
  }

  return (
    <>
      <style>{`
        /* Responsive : hero padding */
        .hero-bloc-pad { padding: 32px 24px; }
        @media (min-width: 768px) { .hero-bloc-pad { padding: 48px 64px; } }

        /* Responsive : hero grid */
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        @media (min-width: 768px) { .hero-grid { grid-template-columns: 3fr 2fr; gap: 48px; } }

        /* Responsive : image banner height */
        .image-banner-h { height: 160px; }
        @media (min-width: 768px) { .image-banner-h { height: 220px; } }

        /* Scrollbar filtre */
        .filter-scroll::-webkit-scrollbar { width: 4px; }
        .filter-scroll::-webkit-scrollbar-track { background: transparent; }
        .filter-scroll::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 2px; }
      `}</style>

      <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>

        {/* ── NAVBAR ── */}
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        {/* ── HERO (pleine largeur, statique) ── */}
        <HeroBloc totalProduits={allProduits.length} apparence={apparence} />

        {/* ── IMAGE BANNER (pleine largeur, statique) ── */}
        <ImageBanner />

        {/* ── SECTION PRODUITS ── */}
        <div className="flex" style={{ alignItems: 'flex-start' }}>

          {/* Colonne filtres — desktop sticky */}
          <div
            className="hidden md:flex flex-col filter-scroll"
            style={{
              width: '260px',
              flexShrink: 0,
              position: 'sticky',
              top: '60px',
              maxHeight: 'calc(100vh - 60px)',
              overflowY: 'auto',
              alignSelf: 'flex-start',
            }}
          >
            <FilterPanel selected={selected} onSelect={handleSelect} />
          </div>

          {/* Colonne grille */}
          <main className="flex-1" style={{ padding: '28px 24px' }}>

            {/* Mobile : bouton Filtres */}
            <div className="md:hidden" style={{ marginBottom: '16px' }}>
              <button
                onClick={() => setMobileOpen(true)}
                className="flex items-center gap-2 font-quicksand font-semibold"
                style={{
                  fontSize: '13px',
                  color: '#04255B',
                  background: '#ffffff',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#04255B'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round"/>
                  <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round"/>
                  <line x1="11" y1="18" x2="13" y2="18" strokeLinecap="round"/>
                </svg>
                Filtres
                {!isVedette && (
                  <span style={{ color: '#9CA3AF', fontWeight: 500 }}>
                    · {FILTER_LABELS[selected]}
                  </span>
                )}
              </button>
            </div>

            {/* Header de la grille */}
            {isVedette ? (
              <VedetteHeader count={filteredProducts.length} />
            ) : (
              <>
                <FilterHeader
                  label={FILTER_LABELS[selected]}
                  count={filteredProducts.length}
                  onReset={() => setSelected('vedette')}
                  isArchives={selected === 'archives'}
                />
                {selected === 'archives' && (
                  <div style={{
                    background: '#FFFBEB', borderRadius: '10px',
                    padding: '10px 16px', border: '1px solid rgba(253,199,28,0.3)',
                    marginBottom: '16px',
                  }}>
                    <p className="font-quicksand" style={{ fontSize: '12px', color: '#92620A', margin: 0 }}>
                      ℹ️ Ces produits sont conservés à titre d&apos;historique. Contactez SunnyGo pour toute question.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Grille produits */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center" style={{ padding: '60px 0' }}>
                <span style={{ fontSize: '48px' }}>🔍</span>
                <h2 className="font-quicksand font-bold" style={{ fontSize: '18px', color: '#04255B', marginTop: '16px', marginBottom: '8px' }}>
                  Aucun produit
                </h2>
                <p className="font-quicksand" style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '20px' }}>
                  Aucun produit ne correspond à cette sélection pour le moment.
                </p>
                <button
                  onClick={() => setSelected('vedette')}
                  className="font-quicksand font-semibold"
                  style={{ fontSize: '13px', color: '#04255B', background: '#ffffff', border: '1.5px solid #04255B', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#04255B'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#04255B' }}
                >
                  Voir tous les produits
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '14px',
                  alignContent: 'start',
                }}
              >
                {filteredProducts.map(p => (
                  <ProduitCard key={p.id} produit={p} />
                ))}
              </div>
            )}

          </main>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {mobileOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-30"
              style={{ background: 'rgba(4,37,91,0.4)' }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div
              className="fixed inset-y-0 left-0 z-40 flex flex-col"
              style={{ width: '280px', background: '#ffffff', boxShadow: '4px 0 24px rgba(4,37,91,0.15)' }}
            >
              {/* Header drawer — gradient + logo blanc */}
              <div
                className="flex items-center justify-between flex-shrink-0"
                style={{
                  height: '60px',
                  padding: '0 16px',
                  background: 'linear-gradient(135deg, #162CA1 0%, #04255B 100%)',
                }}
              >
                <img src={logoBlanc} alt="SunnyGo" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ color: '#ffffff', fontSize: '24px', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>
              {/* Filtres */}
              <div className="flex-1 overflow-y-auto filter-scroll">
                <FilterPanel selected={selected} onSelect={handleSelect} />
              </div>
            </div>
          </>
        )}

      </div>
    </>
  )
}
