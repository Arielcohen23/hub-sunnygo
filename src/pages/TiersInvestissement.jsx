import { useState } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Modal from '../components/Modal'

// ─── Check icon ───────────────────────────────────────────────────────────────
function Check({ text }) {
  return (
    <li className="flex items-start gap-2 text-[14px] text-sunnygo-muted">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04255B" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  )
}

// ─── Profile card ─────────────────────────────────────────────────────────────
function ProfilCard({ icon, titre, criteres }) {
  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-default p-6 border-t-[3px] border-sunnygo-yellow">
      <div className="w-14 h-14 rounded-full bg-sunnygo-navy flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-quicksand font-bold text-[18px] text-sunnygo-navy mb-4">{titre}</h3>
      <ul className="flex flex-col gap-2">
        {criteres.map((c, i) => <Check key={i} text={c} />)}
      </ul>
    </div>
  )
}

// ─── Document card ────────────────────────────────────────────────────────────
function DocCard({ titre, sousTitre }) {
  return (
    <div className="bg-white rounded-[12px] p-4 flex items-center gap-4 border border-gray-100 hover:border-sunnygo-yellow transition-default shadow-card">
      <div className="w-10 h-10 rounded-lg bg-sunnygo-navy flex items-center justify-center flex-shrink-0">
        <span className="font-bold text-[10px] text-sunnygo-yellow">PDF</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-quicksand font-bold text-[13px] text-sunnygo-navy">{titre}</p>
        <p className="font-quicksand text-[11px] text-sunnygo-muted mt-0.5">{sousTitre}</p>
      </div>
      <a
        href="#"
        className="font-quicksand font-bold text-[12px] text-sunnygo-yellow hover:text-sunnygo-yellow-dark transition-default flex-shrink-0"
        onClick={e => e.preventDefault()}
      >
        ↓ Télécharger
      </a>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function TiersInvestissement() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="font-quicksand">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #162CA1, #04255B)', minHeight: '480px' }}
      >
        <div
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(253,199,28,0.08)' }}
        />
        <div className="container-app py-20 md:py-28 relative z-10 max-w-[700px]">
          <Badge variant="yellow" className="mb-6">Tiers Investissement Photovoltaïque</Badge>
          <h1
            className="font-quicksand font-bold text-white mb-6"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.2' }}
          >
            SunnyGo finance.<br />
            Le client consomme.<br />
            <span className="text-sunnygo-yellow">Vous êtes payé.</span>
          </h1>
          <p className="text-[17px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Un modèle révolutionnaire — zéro investissement pour le client,
            économies immédiates dès le premier mois, propriétaire de la centrale
            au bout de 18 ans.
          </p>
        </div>
      </section>

      {/* ── LE MÉCANISME ─────────────────────────────────────────────────── */}
      <section className="bg-sunnygo-bg py-24">
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <Badge variant="yellow">Le mécanisme</Badge>
            <h2 className="font-quicksand font-bold text-sunnygo-navy" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Le bail aller-retour
            </h2>
            <p className="text-sunnygo-muted text-[15px] max-w-lg">
              Un double contrat qui protège et avantage le client à chaque étape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* BAIL ALLER */}
            <div className="rounded-card overflow-hidden shadow-card border-t-4 border-sunnygo-yellow">
              <div className="bg-sunnygo-navy px-6 py-5">
                <Badge variant="yellow" className="mb-3">BAIL ALLER</Badge>
                <h3 className="font-quicksand font-bold text-white text-[18px]">
                  Le client loue sa toiture à SunnyGo
                </h3>
                <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Durée 20 ans · Loyer 1 € symbolique / an
                </p>
              </div>
              <div className="bg-white">
                {[
                  { label: 'SunnyGo prend en charge', val: 'Finance + installe + assure + maintient' },
                  { label: 'Le client fournit', val: 'Sa toiture', alt: true },
                  { label: 'Investissement client', val: '0 € — aucun apport', green: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-4 px-6 py-3 text-[14px] ${row.alt ? 'bg-sunnygo-bg' : 'bg-white'}`}
                  >
                    <span className="text-sunnygo-muted font-medium">{row.label}</span>
                    <span className={`font-bold text-right ${row.green ? 'text-green-600' : 'text-sunnygo-navy'}`}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BAIL RETOUR */}
            <div className="rounded-card overflow-hidden shadow-card border-t-4 border-sunnygo-yellow">
              <div className="bg-sunnygo-navy px-6 py-5">
                <Badge variant="yellow" className="mb-3">BAIL RETOUR</Badge>
                <h3 className="font-quicksand font-bold text-white text-[18px]">
                  SunnyGo loue la centrale au client
                </h3>
                <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Durée 18 ans · Loyer = kWh × 0,15 €
                </p>
              </div>
              <div className="bg-white">
                {[
                  { label: 'Prix du kWh SunnyGo', val: '0,15 € vs 0,25 € EDF', yellow: true },
                  { label: 'Surplus produit non consommé', val: 'Revendu EDF OA — déduit du loyer', alt: true },
                  { label: 'Au terme des 18 ans', val: 'Centrale offerte au client', green: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-4 px-6 py-3 text-[14px] ${row.alt ? 'bg-sunnygo-bg' : 'bg-white'}`}
                  >
                    <span className="text-sunnygo-muted font-medium">{row.label}</span>
                    <span className={`font-bold text-right ${row.green ? 'text-green-600' : row.yellow ? 'text-[#D4A600]' : 'text-sunnygo-navy'}`}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXEMPLE CHIFFRÉ ──────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#04255B' }}>
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <Badge variant="yellow">Exemple concret</Badge>
            <h2 className="font-quicksand font-bold text-white" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Exemple concret
            </h2>
            <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
              PME industrielle — 40 000 kWh consommés par an
            </p>
          </div>

          {/* Formula */}
          <div
            className="max-w-xl mx-auto text-center font-quicksand font-bold text-white text-[15px] rounded-[12px] px-6 py-4 mb-10"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Loyer mensuel = kWh autoconsommés × 0,15 €
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {[
              { num: '1', val: '40 000 kWh', label: 'Consommation annuelle' },
              { num: '2', val: '70 %', label: 'Couverture SunnyGo' },
              { num: '3', val: '28 000 kWh', label: 'kWh facturés par SunnyGo' },
            ].map(step => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-2 rounded-[12px] p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <div className="w-8 h-8 rounded-full bg-sunnygo-yellow flex items-center justify-center font-bold text-sunnygo-navy text-[14px]">
                  {step.num}
                </div>
                <span className="font-bold text-sunnygo-yellow text-[22px]">{step.val}</span>
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{step.label}</span>
              </div>
            ))}
          </div>

          {/* Résultat */}
          <div
            className="max-w-sm mx-auto text-center rounded-[12px] p-5 mb-10"
            style={{ background: 'rgba(253,199,28,0.1)', border: '1px solid rgba(253,199,28,0.25)' }}
          >
            <div className="font-quicksand text-sunnygo-yellow mb-1" style={{ fontWeight: 800, fontSize: '32px' }}>
              4 200 € / an
            </div>
            <p className="italic text-[14px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              de loyer SunnyGo (vs 10 000 € chez EDF)
            </p>
          </div>

          {/* Avant / Après */}
          <div className="max-w-2xl mx-auto grid grid-cols-3 items-center gap-4">
            <div
              className="text-center rounded-[12px] p-5"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <p className="font-bold text-[12px] text-red-400 uppercase tracking-widest mb-2">AVANT</p>
              <p className="font-bold text-white text-[28px]">10 000 €</p>
              <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Facture EDF seule</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-2xl">→</span>
              <Badge variant="yellow" className="text-center">− 2 800 €/an dès le 1er mois</Badge>
            </div>
            <div
              className="text-center rounded-[12px] p-5"
              style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.2)' }}
            >
              <p className="font-bold text-[12px] text-green-400 uppercase tracking-widest mb-2">APRÈS</p>
              <p className="font-bold text-white text-[28px]">7 200 €</p>
              <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Loyer SunnyGo + EDF résiduel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CE QUE LE CLIENT GAGNE ───────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-app">
          <h2
            className="font-quicksand font-bold text-sunnygo-navy text-center mb-10"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
          >
            Ce que le client gagne
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Zéro investissement — centrale 100% financée par SunnyGo',
              'Baisse de facture électrique dès le premier mois',
              'Prix du kWh garanti inférieur à EDF pendant 18 ans',
              'Maintenance et assurance gérées par SunnyGo',
              'Contrat EDF conservé en secours — zéro risque',
              'Propriétaire de la centrale au terme des 18 ans',
            ].map((txt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-[12px] p-4 bg-sunnygo-bg"
              >
                <div className="w-7 h-7 rounded-full bg-sunnygo-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-quicksand font-medium text-[14px] text-sunnygo-navy">{txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILS IDÉAUX ───────────────────────────────────────────────── */}
      <section className="bg-sunnygo-bg py-20">
        <div className="container-app">
          <h2
            className="font-quicksand font-bold text-sunnygo-navy text-center mb-10"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
          >
            Qui est le client idéal ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <ProfilCard
              titre="PME industrielle"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
                </svg>
              }
              criteres={[
                'Facture électrique > 5 000 €/an',
                'Toiture de 300 m² minimum',
                'Activité de jour (autoconsommation optimale)',
              ]}
            />
            <ProfilCard
              titre="Exploitation agricole"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                </svg>
              }
              criteres={[
                'Hangar, bâtiment d\'élevage ou serre',
                'Surface importante disponible',
                'Consommation électrique régulière',
              ]}
            />
            <ProfilCard
              titre="Commerçant / Artisan"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              criteres={[
                'Local commercial ou entrepôt',
                'Horaires d\'activité en journée',
                'Propriétaire de ses murs',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── PROCESS COMMERCIAL ───────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-app max-w-2xl">
          <h2
            className="font-quicksand font-bold text-sunnygo-navy text-center mb-3"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
          >
            Votre process en 5 étapes
          </h2>
          <p className="text-sunnygo-muted text-[15px] text-center mb-12">
            SunnyGo s'occupe de tout à partir de l'étape 2
          </p>

          <div className="flex flex-col gap-0">
            {[
              { num: 1, navy: true, titre: 'Identifier le client', texte: 'Grande toiture + facture élevée = profil idéal pour le tiers investissement' },
              { num: 2, navy: false, titre: 'Transmettre le contact à SunnyGo', texte: 'Nom, coordonnées, type de bâtiment, consommation estimée' },
              { num: 3, navy: true, titre: 'Audit technique gratuit', texte: 'SunnyGo analyse la toiture et la consommation, produit une simulation chiffrée' },
              { num: 4, navy: false, titre: 'Présentation de la simulation', texte: 'SunnyGo présente l\'économie personnalisée et gère le closing' },
              { num: 5, navy: true, titre: 'Signature + commission', texte: 'Votre commission est versée à la signature du contrat de bail' },
            ].map((step, i, arr) => (
              <div key={step.num} className="flex gap-5">
                {/* Circle + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-quicksand font-bold text-[16px] flex-shrink-0 ${
                      step.navy
                        ? 'bg-sunnygo-navy text-sunnygo-yellow'
                        : 'bg-sunnygo-yellow text-sunnygo-navy'
                    }`}
                  >
                    {step.num}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 border-l-2 border-dashed border-sunnygo-navy/20 my-1" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-8 ${i === arr.length - 1 ? 'pb-0' : ''}`}>
                  <h3 className="font-quicksand font-bold text-[16px] text-sunnygo-navy mb-1">
                    {step.titre}
                  </h3>
                  <p className="text-sunnygo-muted text-[14px]">{step.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ────────────────────────────────────────────────────── */}
      <section className="bg-sunnygo-bg py-20">
        <div className="container-app">
          <h2
            className="font-quicksand font-bold text-sunnygo-navy text-center mb-10"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
          >
            Documents disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px] mx-auto">
            <DocCard titre="Présentation client TI" sousTitre="Slides de présentation pour le prospect" />
            <DocCard titre="Schéma bail aller-retour" sousTitre="Visuel explicatif du mécanisme" />
            <DocCard titre="Exemple de simulation PME" sousTitre="Chiffres types pour convaincre" />
            <DocCard titre="FAQ Tiers Investissement" sousTitre="Réponses aux objections fréquentes" />
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ───────────────────────────────────────────────────── */}
      <section className="bg-sunnygo-yellow py-20">
        <div className="container-app text-center">
          <h2
            className="font-quicksand text-sunnygo-navy mb-4"
            style={{ fontWeight: 800, fontSize: 'clamp(26px, 3vw, 36px)' }}
          >
            Vous avez un client pour le tiers invest ?
          </h2>
          <p
            className="text-[16px] max-w-xl mx-auto mb-8"
            style={{ color: 'rgba(4,37,91,0.65)' }}
          >
            Signalez votre intérêt — SunnyGo réalise l'audit technique gratuitement
            et vous présente la simulation sous 5 jours.
          </p>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Je veux commercialiser ce produit →
          </Button>
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
