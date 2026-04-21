import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CarrouselProcess from '../components/ui/CarrouselProcess'
import AccordionFAQ from '../components/ui/AccordionFAQ'

export default function CommentCaMarche() {
  return (
    <div className="min-h-screen font-quicksand" style={{ background: '#F7F6F2' }}>
      <Navbar />

      <div className="mx-auto px-6 py-10" style={{ maxWidth: '900px' }}>

        {/* ── HERO ── */}
        <div
          className="rounded-card p-10 md:p-12 mb-6"
          style={{ background: 'linear-gradient(135deg, #162CA1, #04255B)' }}
        >
          <span
            className="inline-block font-quicksand font-bold text-[11px] uppercase tracking-[0.08em] text-sunnygo-navy rounded-pill mb-5"
            style={{ background: '#FDC71C', padding: '4px 12px' }}
          >
            Guide apporteur
          </span>
          <h1
            className="font-quicksand font-bold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.2 }}
          >
            Comment ça marche ?
          </h1>
          <p
            className="font-quicksand text-[16px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '560px' }}
          >
            5 étapes simples pour générer vos premières commissions avec SunnyGo.
          </p>
        </div>

        {/* ── CARROUSEL ── */}
        <div className="bg-white rounded-card p-8 md:p-12 mb-6 shadow-card">
          <CarrouselProcess />
        </div>

        {/* ── BLOC LÉGAL ── */}
        <div
          className="bg-white rounded-card p-8 mb-6 shadow-card flex gap-5"
          style={{ borderLeft: '4px solid #FDC71C' }}
        >
          <span className="text-2xl flex-shrink-0 mt-0.5">⚖️</span>
          <div>
            <h2 className="font-quicksand font-bold text-[18px] text-sunnygo-navy mb-3">
              Aspect légal — important à lire
            </h2>
            <p className="font-quicksand text-[14px] text-sunnygo-muted leading-[1.8] mb-3">
              SunnyGo opère dans le strict respect de la réglementation française.
              Pour percevoir vos commissions, vous devez impérativement disposer d'un cadre légal
              vous permettant d'émettre des factures : auto-entreprise, SASU, EURL, SAS ou toute
              autre forme juridique adaptée.
            </p>
            <p className="font-quicksand text-[14px] text-sunnygo-muted leading-[1.8] mb-3">
              Vous devez également être à jour de l'ensemble de vos obligations fiscales et sociales
              auprès de l'administration.
            </p>
            <p className="font-quicksand text-[14px] text-sunnygo-muted leading-[1.8] mb-4">
              Notre équipe peut vous orienter si vous avez des questions sur votre situation.
            </p>
            <a
              href="mailto:contact@sunnygo.fr"
              className="font-quicksand font-bold text-[14px] transition-default hover:opacity-80"
              style={{ color: '#FDC71C' }}
            >
              Une question sur votre statut ? Contactez-nous →
            </a>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="bg-white rounded-card p-8 mb-10 shadow-card">
          <h2 className="font-quicksand font-bold text-[20px] text-sunnygo-navy mb-6">
            Questions fréquentes
          </h2>
          <AccordionFAQ />
        </div>

        {/* ── BOUTON RETOUR ── */}
        <div className="flex justify-center pb-4">
          <Link
            to="/"
            className="font-quicksand font-bold text-[14px] text-white rounded-pill transition-default hover:bg-sunnygo-navy-light"
            style={{ background: '#04255B', padding: '12px 32px' }}
          >
            ← Retour au Hub
          </Link>
        </div>

      </div>
    </div>
  )
}
