import { useState } from 'react'

const etapes = [
  {
    num: 1,
    navy: true,
    badge: 'Étape 1 / 5',
    titre: 'Vous identifiez le prospect',
    description:
      'Grâce à tous nos supports commerciaux, vous avez tous les moyens à votre disposition pour qualifier vos prospects : fiches techniques, présentations, FAQ, cahiers des charges — tout est prêt pour vous.',
  },
  {
    num: 2,
    navy: false,
    badge: 'Étape 2 / 5',
    titre: 'Vous transmettez le dossier',
    description:
      "Faites une demande de transmission pour qu'un interlocuteur privilégié vous accompagne de A à Z sur l'insertion de votre premier client. Notre équipe est disponible pour répondre à toutes vos questions.",
  },
  {
    num: 3,
    navy: true,
    badge: 'Étape 3 / 5',
    titre: 'Vous convertissez le prospect',
    description:
      "Après validation par nos équipes, vous êtes chargé de convertir votre prospect en client en lui faisant signer notre offre. Nos supports de closing sont à votre disposition pour maximiser votre taux de conversion.",
  },
  {
    num: 4,
    navy: false,
    badge: 'Étape 4 / 5',
    titre: 'SunnyGo prend le relais',
    description:
      "SunnyGo gère intégralement la suite — visite technique, installation, démarches administratives, dossier CEE. Vous n'avez plus rien à faire. On s'occupe de tout.",
  },
  {
    num: 5,
    navy: true,
    badge: 'Étape 5 / 5',
    titre: 'Vous êtes payé',
    description:
      "Paiement automatique sous 30 jours après validation de l'installation par notre équipe. Virement direct, aucune ambiguïté, aucune démarche supplémentaire de votre côté.",
  },
]

export default function CarrouselProcess() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(0) // -1 left, 1 right

  function go(i) {
    setDir(i > current ? 1 : -1)
    setCurrent(i)
  }
  function prev() { if (current > 0) go(current - 1) }
  function next() { if (current < etapes.length - 1) go(current + 1) }

  const e = etapes[current]

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Main card */}
      <div className="relative w-full max-w-[600px] mx-auto">
        {/* Prev button */}
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Étape précédente"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-default hover:border-sunnygo-navy hover:bg-sunnygo-navy hover:text-white text-sunnygo-navy disabled:opacity-30 disabled:cursor-not-allowed shadow-card hidden sm:flex"
        >
          ‹
        </button>
        {/* Next button */}
        <button
          onClick={next}
          disabled={current === etapes.length - 1}
          aria-label="Étape suivante"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-default hover:border-sunnygo-navy hover:bg-sunnygo-navy hover:text-white text-sunnygo-navy disabled:opacity-30 disabled:cursor-not-allowed shadow-card hidden sm:flex"
        >
          ›
        </button>

        {/* Step card */}
        <div
          key={current}
          className="bg-white rounded-card shadow-card p-8 md:p-10 text-center flex flex-col items-center gap-4 transition-default"
          style={{ animation: 'fadeSlide 0.3s ease' }}
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

          {/* Step badge */}
          <span className="font-quicksand font-bold text-[11px] uppercase tracking-[0.08em] text-sunnygo-navy border border-[1.5px] border-sunnygo-navy rounded-pill px-3 py-1">
            {e.badge}
          </span>

          <h3 className="font-quicksand font-bold text-[22px] text-sunnygo-navy leading-tight">
            {e.titre}
          </h3>
          <p className="font-quicksand text-[15px] text-sunnygo-muted leading-[1.75] max-w-md">
            {e.description}
          </p>
        </div>
      </div>

      {/* Mobile nav buttons */}
      <div className="flex sm:hidden gap-4">
        <button onClick={prev} disabled={current === 0} className="px-5 py-2 rounded-pill bg-sunnygo-navy text-white font-bold text-sm disabled:opacity-30">
          ← Préc.
        </button>
        <button onClick={next} disabled={current === etapes.length - 1} className="px-5 py-2 rounded-pill bg-sunnygo-navy text-white font-bold text-sm disabled:opacity-30">
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

      {/* Bloc légal */}
      <div
        className="w-full max-w-[600px] mx-auto mt-6 bg-white rounded-[0_12px_12px_0] p-5 flex gap-4"
        style={{ borderLeft: '4px solid #FDC71C' }}
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">⚖️</span>
        <div>
          <h4 className="font-quicksand font-bold text-[15px] text-sunnygo-navy mb-2">
            Aspect légal — important
          </h4>
          <p className="font-quicksand text-[13px] text-sunnygo-muted leading-[1.7]">
            SunnyGo opère dans le strict respect de la réglementation. Pour percevoir vos commissions,
            vous devez disposer d'un cadre légal adapté : auto-entreprise, société (SASU, EURL, SAS...)
            ou tout autre statut vous permettant d'émettre une facture. Vous devez également être à jour
            de vos obligations fiscales et sociales. Notre équipe peut vous orienter si vous avez des questions.
          </p>
          <a
            href="mailto:contact@sunnygo.fr"
            className="inline-block mt-3 font-quicksand font-bold text-[13px] text-sunnygo-yellow hover:text-sunnygo-yellow-dark transition-default"
          >
            Une question sur votre statut ? Contactez-nous →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
