import { useState } from 'react'
import { produits } from '../data/produits'
import ProduitCard from './ProduitCard'

function ToggleBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-[12px] px-6 py-4 font-quicksand font-semibold text-[15px] transition-default text-left sm:text-center"
      style={{
        border: active ? '2px solid #04255B' : '2px solid #E5E7EB',
        background: active ? '#04255B' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#1A1A1A',
      }}
    >
      {label}
    </button>
  )
}

function MultiToggleBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[12px] px-5 py-3 font-quicksand font-semibold text-[14px] transition-default"
      style={{
        border: active ? '2px solid #04255B' : '2px solid #E5E7EB',
        background: active ? '#04255B' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#1A1A1A',
      }}
    >
      {label}
    </button>
  )
}

export default function Configurateur() {
  const [typeClient, setTypeClient] = useState(null)
  const [typeFinancement, setTypeFinancement] = useState(null)
  const [secteurs, setSecteurs] = useState([])

  function toggleSecteur(s) {
    setSecteurs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const step1Done = typeClient !== null
  const step2Done = step1Done && typeFinancement !== null
  const showStep3 = step2Done && typeClient === 'professionnel'
  const showResults = step2Done

  const filtered = produits.filter(p => {
    if (!p.typeClient.includes(typeClient)) return false
    if (!p.typeFinancement.includes(typeFinancement)) return false
    if (typeClient === 'professionnel' && secteurs.length > 0) {
      if (p.secteurs.length === 0) return false
      if (!secteurs.some(s => p.secteurs.includes(s))) return false
    }
    return true
  })

  return (
    <div className="flex flex-col gap-8 max-w-[760px] mx-auto">

      {/* STEP 1 */}
      <div className="flex flex-col gap-3">
        <p className="font-quicksand font-semibold text-[14px] text-sunnygo-navy uppercase tracking-[0.06em]">
          Votre prospect est…
        </p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <ToggleBtn
            label="👤 Particulier"
            active={typeClient === 'particulier'}
            onClick={() => { setTypeClient('particulier'); setTypeFinancement(null); setSecteurs([]) }}
          />
          <ToggleBtn
            label="🏢 Professionnel"
            active={typeClient === 'professionnel'}
            onClick={() => { setTypeClient('professionnel'); setTypeFinancement(null); setSecteurs([]) }}
          />
        </div>
      </div>

      {/* STEP 2 */}
      {step1Done && (
        <div
          className="flex flex-col gap-3"
          style={{ animation: 'fadeIn 0.25s ease' }}
        >
          <p className="font-quicksand font-semibold text-[14px] text-sunnygo-navy uppercase tracking-[0.06em]">
            Type de financement souhaité
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <ToggleBtn
              label="✅ Prise en charge à 100%"
              active={typeFinancement === 'prise-en-charge'}
              onClick={() => setTypeFinancement('prise-en-charge')}
            />
            <ToggleBtn
              label="💰 Reste à charge"
              active={typeFinancement === 'reste-a-charge'}
              onClick={() => setTypeFinancement('reste-a-charge')}
            />
          </div>
        </div>
      )}

      {/* STEP 3 — Professionnel only */}
      {showStep3 && (
        <div
          className="flex flex-col gap-3"
          style={{ animation: 'fadeIn 0.25s ease' }}
        >
          <p className="font-quicksand font-semibold text-[14px] text-sunnygo-navy uppercase tracking-[0.06em]">
            Secteur d'activité du prospect
            <span className="ml-2 font-normal normal-case text-sunnygo-muted text-[12px]">
              (choix multiple)
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'industriel',   label: '🏭 Industriel' },
              { id: 'tertiaire',    label: '🏗️ Tertiaire' },
              { id: 'agriculteur',  label: '🌾 Agriculteur' },
              { id: 'collectivite', label: '🏛️ Collectivité' },
            ].map(s => (
              <MultiToggleBtn
                key={s.id}
                label={s.label}
                active={secteurs.includes(s.id)}
                onClick={() => toggleSecteur(s.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {showResults && (
        <div
          className="flex flex-col gap-5"
          style={{ animation: 'slideDown 0.3s ease' }}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-quicksand font-bold text-[18px] text-sunnygo-navy">
              {filtered.length} produit{filtered.length !== 1 ? 's' : ''} correspondant{filtered.length !== 1 ? 's' : ''}
            </h3>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-card p-8 text-center border border-gray-100 shadow-card">
              <p className="font-quicksand text-[15px] text-sunnygo-muted mb-4">
                Aucun produit ne correspond exactement — contactez-nous pour une solution sur mesure.
              </p>
              <a
                href="mailto:contact@sunnygo.fr"
                className="inline-block font-quicksand font-bold text-[14px] text-white bg-sunnygo-navy px-6 py-3 rounded-pill transition-default hover:bg-sunnygo-navy-light"
              >
                Contactez-nous
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => <ProduitCard key={p.id} produit={p} />)}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
