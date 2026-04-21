import { useNavigate } from 'react-router-dom'

const CATEGORIE_ICONS = {
  CEE: '⚡',
  PV: '☀️',
  Courtage: '📊',
  TiersInvestissement: '🤝',
}

function ScoreDots({ score }) {
  const filled = Math.round(score / 2)
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-full flex-shrink-0"
          style={{
            width: '7px',
            height: '7px',
            background: i < filled ? '#FDC71C' : '#E5E7EB',
          }}
        />
      ))}
      <span
        className="ml-1 font-quicksand"
        style={{ fontSize: '11px', fontWeight: 500, color: '#9CA3AF' }}
      >
        {score} / 10
      </span>
    </div>
  )
}

export default function ProduitCard({ produit }) {
  const navigate = useNavigate()
  const { hot, nouveau, badgeJaune } = produit.tags
  const catIcon = CATEGORIE_ICONS[produit.categorie] || '📦'
  const catLabel = produit.categorie === 'TiersInvestissement' ? 'Tiers Invest' : produit.categorie
  const isProf = produit.typeClient.includes('professionnel')
  const isArchive = produit.archive === true
  const isDisponible = produit.disponible !== false

  return (
    <div
      onClick={() => { if (isDisponible) navigate(`/produit/${produit.id}`) }}
      className="flex flex-col overflow-hidden transition-default"
      style={{
        background: '#ffffff',
        border: '1px solid #F0EEE9',
        borderLeft: (!isArchive && !isDisponible) ? '1px solid #F0EEE9' : (!isArchive && hot) ? '3px solid #FDC71C' : '1px solid #F0EEE9',
        borderRadius: '14px',
        opacity: !isDisponible ? 0.5 : isArchive ? 0.72 : 1,
        filter: isArchive ? 'grayscale(30%)' : 'none',
        cursor: !isDisponible ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={e => {
        if (!isDisponible) return
        if (isArchive) { e.currentTarget.style.opacity = '0.9'; return }
        e.currentTarget.style.borderColor = 'rgba(4,37,91,0.15)'
        if (hot) e.currentTarget.style.borderLeftColor = '#FDC71C'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(4,37,91,0.08)'
      }}
      onMouseLeave={e => {
        if (!isDisponible) return
        if (isArchive) { e.currentTarget.style.opacity = '0.72'; return }
        e.currentTarget.style.borderColor = '#F0EEE9'
        if (hot) e.currentTarget.style.borderLeftColor = '#FDC71C'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* HEADER */}
      <div
        className="flex items-center justify-between gap-2 px-4 py-3 flex-wrap"
        style={{ borderBottom: '1px solid #F8F7F4' }}
      >
        <span
          className="font-quicksand font-semibold uppercase"
          style={{
            fontSize: '10px',
            color: '#6B7280',
            background: '#F8F7F4',
            borderRadius: '6px',
            padding: '3px 7px',
          }}
        >
          {catIcon} {catLabel}
        </span>
        <div className="flex gap-1.5 flex-shrink-0">
          {!isDisponible ? (
            <span
              className="font-quicksand rounded-pill"
              style={{
                fontSize: '10px', fontWeight: 600,
                color: '#9CA3AF',
                background: '#F3F4F6',
                border: '1px solid #E5E7EB',
                padding: '2px 8px',
              }}
            >
              À venir
            </span>
          ) : isArchive ? (
            <span
              className="font-quicksand rounded-pill"
              style={{
                fontSize: '10px', fontWeight: 600,
                color: '#6B7280',
                background: '#F3F4F6',
                border: '1px solid #E5E7EB',
                padding: '2px 8px',
              }}
            >
              Archivé
            </span>
          ) : (
            <>
              {hot && (
                <span
                  className="font-quicksand font-bold rounded-pill"
                  style={{
                    fontSize: '10px',
                    color: '#C2410C',
                    background: '#FFF7ED',
                    border: '1px solid #FDDCBA',
                    padding: '2px 8px',
                  }}
                >
                  🔥 Chaud
                </span>
              )}
              {nouveau && (
                <span
                  className="font-quicksand font-bold rounded-pill"
                  style={{
                    fontSize: '10px',
                    color: '#15803D',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    padding: '2px 8px',
                  }}
                >
                  Nouveau
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col px-4 py-3 flex-1" style={{ gap: '8px' }}>
        <h3
          className="font-quicksand font-bold leading-tight"
          style={{ fontSize: '14px', color: '#04255B', marginBottom: '2px' }}
        >
          {produit.nom}
        </h3>
        <ScoreDots score={produit.score} />
        <div
          className="flex items-center font-quicksand"
          style={{ gap: '5px', fontSize: '12px', color: '#6B7280' }}
        >
          <span>{isProf ? '🏢' : '👤'}</span>
          <span>{produit.typeClientLabel}</span>
        </div>
        <div
          className="font-quicksand font-semibold"
          style={{ fontSize: '12px', color: '#04255B' }}
        >
          💰 {produit.remuneration}
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderTop: '1px solid #F8F7F4' }}
      >
        <div>
          {badgeJaune && (
            <span
              className="font-quicksand font-bold uppercase rounded-pill"
              style={{
                fontSize: '10px',
                color: '#92620A',
                background: '#FDF3D0',
                border: '1px solid rgba(253,199,28,0.4)',
                padding: '2px 8px',
              }}
            >
              {badgeJaune}
            </span>
          )}
        </div>
        {isDisponible && (
          <span
            className="font-quicksand font-bold transition-default"
            style={{ fontSize: '11px', color: '#FDC71C' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E59319'}
            onMouseLeave={e => e.currentTarget.style.color = '#FDC71C'}
          >
            Voir la fiche →
          </span>
        )}
      </div>
    </div>
  )
}
