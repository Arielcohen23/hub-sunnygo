import { Link } from 'react-router-dom'

function ScoreDots({ score }) {
  // Score is /10, convert to /5 for 5 dots
  const filled = Math.round(score / 2)
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: i < filled ? '#FDC71C' : '#E5E7EB' }}
        />
      ))}
      <span className="ml-1 font-quicksand text-[12px] text-sunnygo-muted">
        {score} / 10
      </span>
    </div>
  )
}

export default function ProduitCard({ produit }) {
  const { hot, nouveau, badgeJaune } = produit.tags
  const isProf = produit.typeClient.includes('professionnel')

  return (
    <div
      className="bg-white rounded-card flex flex-col overflow-hidden hover:-translate-y-1 transition-default"
      style={{
        border: '1.5px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(4,37,91,0.06), 0 8px 24px rgba(4,37,91,0.04)',
        borderLeft: hot ? '4px solid #FDC71C' : undefined,
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(4,37,91,0.14)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(4,37,91,0.06), 0 8px 24px rgba(4,37,91,0.04)'}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2 px-[18px] py-[14px]" style={{ borderBottom: '1px solid #F3F4F6' }}>
        <span
          className="font-quicksand font-bold text-[10px] uppercase tracking-[0.07em] text-sunnygo-navy rounded-pill px-2.5 py-1"
          style={{ background: 'rgba(4,37,91,0.07)' }}
        >
          {produit.categorie} — {produit.ficheRef}
        </span>
        <div className="flex gap-1.5 flex-shrink-0">
          {hot && (
            <span className="font-quicksand font-bold text-[10px] text-white rounded-pill px-2.5 py-1" style={{ background: '#FF6B35' }}>
              🔥 Chaud
            </span>
          )}
          {nouveau && (
            <span className="font-quicksand font-bold text-[10px] text-white rounded-pill px-2.5 py-1" style={{ background: '#16A34A' }}>
              Nouveau
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col gap-2 px-[18px] py-[14px] flex-1">
        <h3 className="font-quicksand font-bold text-[16px] text-sunnygo-navy leading-tight">
          {produit.nom}
        </h3>
        <ScoreDots score={produit.score} />

        {/* Client type */}
        <div className="flex items-center gap-1.5 text-[12px] text-sunnygo-muted">
          <span>{isProf ? '🏢' : '👤'}</span>
          <span>{isProf ? 'Professionnel' : 'Particulier'}</span>
        </div>

        {/* Rémunération */}
        <p className="font-quicksand font-bold text-[12px] text-sunnygo-navy">
          {produit.remuneration}
        </p>

        <p className="font-quicksand text-[13px] text-sunnygo-muted leading-relaxed flex-1">
          {produit.description}
        </p>
      </div>

      {/* FOOTER */}
      <div
        className="flex items-center justify-between px-[18px] py-[10px]"
        style={{ borderTop: '1px solid #F3F4F6', background: '#FAFAFA' }}
      >
        <div>
          {badgeJaune && (
            <span
              className="font-quicksand font-bold text-[10px] uppercase tracking-[0.07em] text-sunnygo-navy rounded-pill px-2.5 py-1"
              style={{ background: '#FDC71C' }}
            >
              {badgeJaune}
            </span>
          )}
        </div>
        <Link
          to={produit.href}
          className="font-quicksand font-bold text-[12px] text-sunnygo-yellow hover:text-sunnygo-yellow-dark transition-default"
        >
          Voir la fiche →
        </Link>
      </div>
    </div>
  )
}
