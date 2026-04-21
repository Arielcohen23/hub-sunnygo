import { useState } from 'react'

const etapes = [
  {
    num: 1, navy: true,
    titre: 'Vous identifiez le prospect',
    description: 'Grâce à tous nos supports commerciaux, vous avez tous les moyens à votre disposition pour qualifier vos prospects : fiches techniques, présentations, FAQ, cahiers des charges — tout est prêt pour vous.',
  },
  {
    num: 2, navy: false,
    titre: 'Vous transmettez le dossier',
    description: "Faites une demande de transmission pour qu'un interlocuteur privilégié vous accompagne de A à Z sur l'insertion de votre premier client. Notre équipe est disponible pour répondre à toutes vos questions.",
  },
  {
    num: 3, navy: true,
    titre: 'Vous convertissez le prospect',
    description: "Après validation par nos équipes, vous êtes chargé de convertir votre prospect en client en lui faisant signer notre offre. Nos supports de closing sont à votre disposition pour maximiser votre taux de conversion.",
  },
  {
    num: 4, navy: false,
    titre: 'SunnyGo prend le relais',
    description: "SunnyGo gère intégralement la suite — visite technique, installation, démarches administratives, dossier CEE. Vous n'avez plus rien à faire. On s'occupe de tout.",
  },
  {
    num: 5, navy: true,
    titre: 'Vous êtes payé',
    description: "Paiement automatique sous 30 jours après validation de l'installation par notre équipe. Virement direct, aucune ambiguïté, aucune démarche supplémentaire de votre côté.",
  },
]

export default function CarrouselProcess() {
  const [current, setCurrent] = useState(0)

  function go(i) { setCurrent(i) }
  function prev() { if (current > 0) setCurrent(c => c - 1) }
  function next() { if (current < etapes.length - 1) setCurrent(c => c + 1) }

  const e = etapes[current]

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-[600px] mx-auto">
        {/* Desktop arrows */}
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Précédent"
          className="absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 font-bold text-xl text-sunnygo-navy flex items-center justify-center shadow-card transition-default hover:bg-sunnygo-navy hover:text-white disabled:opacity-25 disabled:cursor-not-allowed hidden sm:flex"
        >
          ‹
        </button>
        <button
          onClick={next}
          disabled={current === etapes.length - 1}
          aria-label="Suivant"
          className="absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 font-bold text-xl text-sunnygo-navy flex items-center justify-center shadow-card transition-default hover:bg-sunnygo-navy hover:text-white disabled:opacity-25 disabled:cursor-not-allowed hidden sm:flex"
        >
          ›
        </button>

        {/* Card */}
        <div
          key={current}
          className="text-center p-10 flex flex-col items-center gap-4"
          style={{ animation: 'fadeUp 0.25s ease' }}
        >
          {/* Circle */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: e.navy ? '#04255B' : '#FDC71C',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 800,
              fontSize: '32px',
              color: e.navy ? '#FDC71C' : '#04255B',
            }}
          >
            {e.num}
          </div>

          {/* Badge */}
          <span
            className="font-quicksand font-bold text-[11px] uppercase tracking-[0.08em] rounded-pill px-3 py-1"
            style={{ border: '1.5px solid #04255B', color: '#04255B' }}
          >
            Étape {e.num} / {etapes.length}
          </span>

          <h3 className="font-quicksand font-bold text-[22px] text-sunnygo-navy leading-tight">
            {e.titre}
          </h3>
          <p className="font-quicksand text-[15px] text-sunnygo-muted leading-[1.8] max-w-md">
            {e.description}
          </p>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex sm:hidden items-center gap-4">
        <button onClick={prev} disabled={current === 0} className="px-4 py-2 rounded-pill bg-sunnygo-navy text-white font-bold text-sm disabled:opacity-30">
          ← Préc.
        </button>
        <button onClick={next} disabled={current === etapes.length - 1} className="px-4 py-2 rounded-pill bg-sunnygo-navy text-white font-bold text-sm disabled:opacity-30">
          Suiv. →
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {etapes.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Étape ${i + 1}`}
            className="rounded-full transition-default"
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              background: i === current ? '#04255B' : '#CBD5E1',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
