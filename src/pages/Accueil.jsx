import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge'
import Button from '../components/Button'
import CarteFrance from '../components/CarteFrance'
import Configurateur from '../components/Configurateur'
import CarrouselProcess from '../components/CarrouselProcess'
import ProduitCard from '../components/ProduitCard'
import { produits } from '../data/produits'

const vedettes = produits.filter(p => p.enVedette)

// ─── Gamme card ───────────────────────────────────────────────────────────────
function GammeCard({ icon, titre, badge, description, info, infoStyle, href, phare }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(href)}
      className="bg-white rounded-card flex flex-col gap-4 p-7 cursor-pointer transition-default hover:-translate-y-1 group"
      style={{
        border: phare ? '1.5px solid #E5E7EB' : '1.5px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(4,37,91,0.06), 0 8px 24px rgba(4,37,91,0.04)',
        borderLeft: phare ? '4px solid #FDC71C' : undefined,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(4,37,91,0.14)'
        e.currentTarget.style.borderBottom = '3px solid #FDC71C'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(4,37,91,0.06), 0 8px 24px rgba(4,37,91,0.04)'
        e.currentTarget.style.borderBottom = ''
      }}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-sunnygo-navy flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* Title + badge */}
      <div className="flex flex-col gap-2">
        <h3 className="font-quicksand font-bold text-[18px] text-sunnygo-navy leading-tight">
          {titre}
        </h3>
        <span
          className="self-start font-quicksand font-bold text-[11px] uppercase tracking-[0.07em] text-sunnygo-navy rounded-pill px-3 py-1"
          style={{ border: '1.5px solid #04255B' }}
        >
          {badge}
        </span>
      </div>

      <p className="font-quicksand text-[14px] text-sunnygo-muted leading-relaxed flex-1">
        {description}
      </p>

      {info && (
        <p
          className="font-quicksand font-bold text-[13px]"
          style={{ color: infoStyle === 'green' ? '#16A34A' : '#FDC71C' }}
        >
          {infoStyle === 'green' ? '🟢 ' : ''}{info}
        </p>
      )}

      <span className="font-quicksand font-bold text-[13px] text-sunnygo-yellow group-hover:text-sunnygo-yellow-dark transition-default self-start">
        Découvrir →
      </span>
    </div>
  )
}

// ─── Advantage card ───────────────────────────────────────────────────────────
function Avantage({ titre, texte }) {
  return (
    <div className="flex gap-4 items-start p-6 bg-white rounded-card shadow-card hover:shadow-card-hover transition-default">
      <div className="w-12 h-12 rounded-full bg-sunnygo-navy flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-quicksand font-bold text-[16px] text-sunnygo-navy mb-1">{titre}</h3>
        <p className="text-[14px] text-sunnygo-muted leading-relaxed">{texte}</p>
      </div>
    </div>
  )
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Accueil() {
  return (
    <div className="font-quicksand">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #162CA1, #04255B)', minHeight: '580px' }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'rgba(253,199,28,0.06)' }}
        />

        <div className="container-app py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* LEFT — Text */}
            <div className="flex flex-col items-start">
              <Badge variant="yellow" className="mb-6">✦ Espace partenaires</Badge>

              <h1
                className="font-quicksand font-bold text-white mb-5"
                style={{ fontSize: 'clamp(30px, 4vw, 50px)', lineHeight: '1.15' }}
              >
                Le{' '}
                <span className="text-sunnygo-yellow">Hub</span>
                {' '}SunnyGo
              </h1>

              <p
                className="font-quicksand font-semibold mb-3"
                style={{ color: 'rgba(255,255,255,0.88)', fontSize: '18px' }}
              >
                Le portail dédié uniquement à nos apporteurs d'affaires
              </p>

              <p
                className="mb-8 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.62)', fontSize: '16px' }}
              >
                SunnyGo gère tout — visite technique, devis, installation, dossier CEE,
                facturation. Vous identifiez le client, on fait le reste.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Button variant="primary" onClick={() => scrollTo('gammes-produits')}>
                  Voir les produits
                </Button>
                <Button variant="outline" onClick={() => scrollTo('comment-ca-marche')}>
                  Comment ça marche
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-0 md:divide-x md:divide-white/20">
                {[
                  { val: '500+',    label: 'Installations réalisées' },
                  { val: '180+',    label: 'Partenaires RGE certifiés' },
                  { val: '30 jours', label: 'Délai de paiement' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 md:px-7 first:pl-0">
                    <span className="font-quicksand font-bold text-sunnygo-yellow text-[30px]">
                      {stat.val}
                    </span>
                    <span className="font-quicksand text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Carte de France */}
            <div className="hidden md:flex items-center justify-center">
              <CarteFrance />
            </div>

          </div>
        </div>
      </section>

      {/* ── PRODUITS EN VOGUE ─────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <Badge variant="yellow">🔥 En vogue</Badge>
            <h2 className="font-quicksand font-bold text-sunnygo-navy" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Les produits du moment
            </h2>
            <p className="text-sunnygo-muted text-[15px]">
              Sélection mise à jour régulièrement par notre équipe
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {vedettes.map(p => <ProduitCard key={p.id} produit={p} />)}
          </div>
        </div>
      </section>

      {/* ── CONFIGURATEUR ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#F7F6F2' }}>
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <Badge variant="navy">Configurateur</Badge>
            <h2 className="font-quicksand font-bold text-sunnygo-navy" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Trouvez le produit fait pour vous
            </h2>
            <p className="text-sunnygo-muted text-[15px] max-w-md">
              Répondez à 3 questions pour voir uniquement les produits adaptés à vos prospects
            </p>
          </div>
          <Configurateur />
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE — CARROUSEL ────────────────────────────────── */}
      <section id="comment-ca-marche" className="py-24" style={{ background: '#F7F6F2' }}>
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <Badge variant="yellow">Process</Badge>
            <h2 className="font-quicksand font-bold text-sunnygo-navy" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Comment ça marche
            </h2>
            <p className="text-sunnygo-muted text-[15px] max-w-md">
              5 étapes simples pour générer vos premières commissions
            </p>
          </div>
          <CarrouselProcess />
        </div>
      </section>

      {/* ── GAMMES DE PRODUITS ────────────────────────────────────────────── */}
      <section id="gammes-produits" className="bg-white py-24">
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <Badge variant="yellow">Nos gammes</Badge>
            <h2 className="font-quicksand font-bold text-sunnygo-navy" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Explorez nos gammes de produits
            </h2>
            <p className="text-sunnygo-muted text-[15px] max-w-md">
              Cliquez sur une gamme pour découvrir tous les produits disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
            <GammeCard
              href="/cee"
              titre="Certificats d'Économies d'Énergie"
              badge="CEE"
              description="LED, déshumidificateurs, destratificateurs, VMC... Des solutions financées par les obligés."
              info="6 produits disponibles"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <GammeCard
              href="/pv"
              titre="Panneaux Photovoltaïques"
              badge="PV"
              description="Installations solaires pour particuliers et professionnels. Autoconsommation, revente, stockage."
              info="2 gammes disponibles"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="5" />
                  <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              }
            />
            <GammeCard
              href="/courtage"
              titre="Courtage en Énergie"
              badge="Énergie"
              description="Optimisation des contrats d'énergie pour les professionnels. Économies immédiates garanties."
              info="Nouveau"
              infoStyle="green"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l5-5 3 3 5-5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                </svg>
              }
            />
            <GammeCard
              href="/tiers-investissement"
              titre="Tiers Investissement Photovoltaïque"
              badge="Tiers Invest"
              description="SunnyGo finance, installe et exploite. Le client paie moins qu'EDF dès le premier mois."
              info="0€ pour le client"
              phare
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDC71C" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7l1.5 2.5L16 10l-2 2 .5 3L12 13.5 9.5 15 10 12l-2-2 2.5-.5z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── POURQUOI SUNNYGO ──────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <h2 className="font-quicksand font-bold text-sunnygo-navy" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
              Pourquoi choisir SunnyGo
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            <Avantage
              titre="Zéro gestion administrative"
              texte="Devis, dossier CEE, installation, facturation — on gère tout de A à Z."
            />
            <Avantage
              titre="Commission attractive"
              texte="Des rémunérations parmi les plus compétitives du marché pour récompenser votre apport."
            />
            <Avantage
              titre="Supports commerciaux fournis"
              texte="Présentation client, fiche technique, FAQ — tout le matériel pour convaincre."
            />
            <Avantage
              titre="Paiement rapide et garanti"
              texte="Virement automatique sous 30 jours après validation. Aucune ambiguïté, aucun délai."
            />
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ───────────────────────────────────────────────────── */}
      <section className="py-24 text-center" style={{ background: 'linear-gradient(135deg, #162CA1, #04255B)' }}>
        <div className="container-app">
          <h2 className="font-quicksand font-bold text-white mb-4" style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
            Prêt à démarrer ?
          </h2>
          <p className="mb-8 text-[16px] max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Rejoignez nos apporteurs d'affaires et commencez à générer des commissions dès cette semaine.
          </p>
          <Button variant="primary" onClick={() => scrollTo('gammes-produits')}>
            Voir tous les produits →
          </Button>
        </div>
      </section>

    </div>
  )
}
