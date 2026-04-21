import { useState, useEffect } from 'react'
import SliderNote from './SliderNote'
import ListeDynamique from './ListeDynamique'
import DocumentUpload from './DocumentUpload'

const CATEGORIES = ['CEE', 'PV', 'TiersInvestissement', 'Courtage']
const BADGE_JAUNE_OPTIONS = ['', 'Commission élevée', 'Gros volume']

function generateId(nom) {
  return nom.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function calcScore(notation) {
  const { remuneration, delaiTraitement, delaiPaiement, simplicite, volumeMarche } = notation
  return ((remuneration + delaiTraitement + delaiPaiement + simplicite + volumeMarche) / 25 * 10).toFixed(1)
}

// ── AccordionSection ──────────────────────────────────────────────────────────
function AccordionSection({ id, title, subtitle, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      id={id}
      data-section={id}
      style={{ marginBottom: '12px', background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
          borderBottom: open ? '1px solid #E5E7EB' : 'none', textAlign: 'left',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div>
          <span style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px', color: '#04255B' }}>
            {title}
          </span>
          {subtitle && (
            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, margin: '2px 0 0 0', fontFamily: 'Quicksand, sans-serif' }}>
              {subtitle}
            </p>
          )}
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#9CA3AF" strokeWidth="2.5" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, marginLeft: '8px' }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div style={{ padding: '20px' }}>{children}</div>}
    </div>
  )
}

// ── Styles partagés ───────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px',
  padding: '10px 12px', fontFamily: 'Quicksand, sans-serif', fontSize: '13px',
  color: '#04255B', outline: 'none', boxSizing: 'border-box', background: 'white',
}
const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px',
  fontFamily: 'Quicksand, sans-serif',
}
const fieldStyle = { marginBottom: '14px' }
const subLabelStyle = { fontSize: '10px', color: '#9CA3AF', margin: '0 0 6px 0' }

// ── CheckGroup ────────────────────────────────────────────────────────────────
function CheckGroup({ label, options, values, onChange }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map(opt => {
          const checked = values.includes(opt.value)
          return (
            <label
              key={opt.value}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                fontFamily: 'Quicksand, sans-serif', fontSize: '13px', fontWeight: 600,
                color: checked ? '#04255B' : '#6B7280',
                background: checked ? '#EFF6FF' : '#F3F4F6',
                border: checked ? '1px solid #BFDBFE' : '1px solid transparent',
                borderRadius: '8px', padding: '6px 12px', userSelect: 'none',
              }}
            >
              <input
                type="checkbox" checked={checked} style={{ display: 'none' }}
                onChange={e => {
                  if (e.target.checked) onChange([...values, opt.value])
                  else onChange(values.filter(v => v !== opt.value))
                }}
              />
              {opt.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

// ── Navigation sidebar items ──────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'sec-a',      label: 'Infos générales' },
  { id: 'sec-b',      label: 'Type client' },
  { id: 'sec-q',      label: '⭐ Notation' },
  { id: 'sec-k',      label: 'Description' },
  { id: 'sec-p',      label: 'Rémunération' },
  { id: 'sec-o',      label: 'Matériel' },
  { id: 'sec-n',      label: 'Éligibilité' },
  { id: 'sec-m',      label: 'Process client' },
  { id: 'sec-l',      label: 'Exemple dossier' },
  { id: 'sec-j',      label: 'Documents' },
  { id: 'sec-a-tags', label: '🏷 Tags & vedette' },
]

// ── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────────
export default function ProduitForm({ produit, onSave, onCancel }) {
  const isNew = !produit
  const [activeSection, setActiveSection] = useState('sec-a')

  const [form, setForm] = useState(() => {
    if (produit) return { ...produit }
    return {
      id: '', nom: '', categorie: 'CEE', ficheRef: '', score: 0,
      typeClient: ['professionnel'], typeFinancement: ['prise-en-charge'], secteurs: [],
      remuneration: '', declenchement: '', delaiPaiement: '',
      typeClientLabel: 'Professionnel', disponible: true, archive: false,
      tags: { hot: false, nouveau: false, badgeJaune: null },
      enVedette: false,
      notation: { remuneration: 3, delaiTraitement: 3, delaiPaiement: 3, simplicite: 3, volumeMarche: 3 },
      accroche: '', description: '',
      materiel: [], eligibilite: [], processClient: [], documents: [],
      exempleDossier: null,
    }
  })

  const [idManual, setIdManual] = useState(!isNew)
  const [errors, setErrors] = useState({})
  const calculatedScore = calcScore(form.notation)

  // IntersectionObserver — section active dans la nav
  useEffect(() => {
    const els = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section)
        })
      },
      { threshold: 0.15, rootMargin: '-80px 0px -55% 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollToSection(id) {
    if (id === 'sec-a-tags') {
      const el = document.getElementById('sec-a-tags-anchor')
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveSection('sec-a') }
      return
    }
    const el = document.getElementById(id)
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveSection(id) }
  }

  function setField(path, value) {
    setForm(prev => {
      const parts = path.split('.')
      if (parts.length === 1) return { ...prev, [path]: value }
      if (parts.length === 2) return { ...prev, [parts[0]]: { ...prev[parts[0]], [parts[1]]: value } }
      return prev
    })
    if (errors[path]) setErrors(e => { const n = { ...e }; delete n[path]; return n })
  }

  function handleNomChange(e) {
    const nom = e.target.value
    setField('nom', nom)
    if (!idManual) setField('id', generateId(nom))
  }

  function validate() {
    const errs = {}
    if (!form.nom)         errs.nom         = 'Le nom est requis'
    if (!form.id)          errs.id          = "L'identifiant est requis"
    if (!form.categorie)   errs.categorie   = 'La catégorie est requise'
    if (!form.remuneration) errs.remuneration = 'La rémunération est requise'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSave() {
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    onSave({ ...form, score: parseFloat(calculatedScore) })
  }

  // ── Rendu ──
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', fontFamily: 'Quicksand, sans-serif' }}>

      {/* ── Navigation sticky ── */}
      <nav style={{
        width: '160px', flexShrink: 0,
        position: 'sticky', top: '72px', alignSelf: 'flex-start',
        background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden',
      }}>
        <div style={{
          padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6',
          fontSize: '9px', fontWeight: 700, color: '#9CA3AF',
          textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Quicksand, sans-serif',
        }}>
          Sections
        </div>
        {NAV_ITEMS.map(item => {
          const isActive = activeSection === item.id
            || (item.id === 'sec-a-tags' && activeSection === 'sec-a')
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', border: 'none',
                borderLeft: isActive ? '3px solid #FDC71C' : '3px solid transparent',
                background: isActive ? '#FFFBEB' : 'transparent',
                cursor: 'pointer', fontFamily: 'Quicksand, sans-serif',
                fontSize: '12px', fontWeight: isActive ? 700 : 500,
                color: isActive ? '#92620A' : '#6B7280', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.color = '#04255B' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280' } }}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* ── Contenu du formulaire ── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* ── A — Informations générales ── */}
        <AccordionSection id="sec-a" title="A — Informations générales">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

            <div style={{ gridColumn: '1 / -1', ...fieldStyle }}>
              <label style={labelStyle}>Nom du produit *</label>
              <input
                value={form.nom} onChange={handleNomChange}
                placeholder="Ex: Déshumidificateur agricole"
                style={{ ...inputStyle, borderColor: errors.nom ? '#EF4444' : '#E5E7EB' }}
              />
              {errors.nom && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.nom}</p>}
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Identifiant (slug) *
                {!idManual && (
                  <button type="button" onClick={() => setIdManual(true)}
                    style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '10px', textDecoration: 'underline' }}>
                    Modifier manuellement
                  </button>
                )}
              </label>
              <input
                value={form.id}
                onChange={e => { setIdManual(true); setField('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')) }}
                placeholder="mon-produit"
                style={{ ...inputStyle, borderColor: errors.id ? '#EF4444' : '#E5E7EB', fontFamily: 'monospace' }}
              />
              {errors.id && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.id}</p>}
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Catégorie *</label>
              <select value={form.categorie} onChange={e => setField('categorie', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.categorie ? '#EF4444' : '#E5E7EB' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Fiche de référence CEE</label>
              <input value={form.ficheRef || ''} onChange={e => setField('ficheRef', e.target.value)} placeholder="Ex: AGRI-TH-117" style={inputStyle} />
            </div>

            <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Label type client</label>
              <input value={form.typeClientLabel || ''} onChange={e => setField('typeClientLabel', e.target.value)} placeholder="Ex: Professionnel" style={{ ...inputStyle, width: '50%' }} />
            </div>
          </div>

          {/* Score live */}
          <div style={{ background: '#EFF6FF', borderRadius: '8px', padding: '12px 16px', border: '1px solid #BFDBFE', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Score calculé automatiquement depuis la notation</p>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#04255B', margin: 0 }}>
              {calculatedScore} <span style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF' }}>/10</span>
            </p>
          </div>

          {/* Statut */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              { key: 'disponible', label: '✅ Disponible' },
              { key: 'archive',    label: '🗂 Archivé' },
              { key: 'enVedette', label: '⭐ En vedette' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>
                <input type="checkbox" checked={!!form[key]} onChange={e => setField(key, e.target.checked)} />
                {label}
              </label>
            ))}
          </div>

          {/* Tags — anchor pour la nav */}
          <div id="sec-a-tags-anchor" style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
            <p style={{ ...labelStyle, marginBottom: '10px' }}>Tags & badges</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>
                <input type="checkbox" checked={!!form.tags?.hot} onChange={e => setField('tags', { ...form.tags, hot: e.target.checked })} />
                🔥 Hot
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>
                <input type="checkbox" checked={!!form.tags?.nouveau} onChange={e => setField('tags', { ...form.tags, nouveau: e.target.checked })} />
                ✨ Nouveau
              </label>
            </div>
            <div>
              <label style={labelStyle}>Badge jaune</label>
              <select value={form.tags?.badgeJaune || ''} onChange={e => setField('tags', { ...form.tags, badgeJaune: e.target.value || null })}
                style={{ ...inputStyle, width: 'auto' }}>
                {BADGE_JAUNE_OPTIONS.map(o => <option key={o} value={o}>{o || '— Aucun —'}</option>)}
              </select>
            </div>
          </div>
        </AccordionSection>

        {/* ── B — Type de client / financement ── */}
        <AccordionSection id="sec-b" title="B — Type de client / financement">
          <CheckGroup
            label="Type de client"
            options={[{ value: 'professionnel', label: '🏢 Professionnel' }, { value: 'particulier', label: '👤 Particulier' }]}
            values={form.typeClient}
            onChange={v => setField('typeClient', v)}
          />
          <CheckGroup
            label="Type de financement"
            options={[{ value: 'prise-en-charge', label: '✅ Prise en charge' }, { value: 'reste-a-charge', label: '💰 Reste à charge' }]}
            values={form.typeFinancement}
            onChange={v => setField('typeFinancement', v)}
          />
          <CheckGroup
            label="Secteurs"
            options={[
              { value: 'industriel',   label: '🏭 Industriel' },
              { value: 'tertiaire',    label: '🏗️ Tertiaire' },
              { value: 'agriculteur',  label: '🌾 Agriculteur' },
              { value: 'collectivite', label: '🏛️ Collectivité' },
            ]}
            values={form.secteurs}
            onChange={v => setField('secteurs', v)}
          />
        </AccordionSection>

        {/* ── Q — Notation détaillée ── */}
        <AccordionSection
          id="sec-q"
          title="Q — Notation détaillée"
          subtitle="Affiché dans l'encadré navy — note globale calculée automatiquement"
        >
          <SliderNote label="Rémunération"     icon="💰" value={form.notation.remuneration}    onChange={v => setField('notation', { ...form.notation, remuneration: v })} />
          <SliderNote label="Délai traitement" icon="⏱️" value={form.notation.delaiTraitement} onChange={v => setField('notation', { ...form.notation, delaiTraitement: v })} />
          <SliderNote label="Délai paiement"   icon="📅" value={form.notation.delaiPaiement}   onChange={v => setField('notation', { ...form.notation, delaiPaiement: v })} />
          <SliderNote label="Simplicité"       icon="✅" value={form.notation.simplicite}       onChange={v => setField('notation', { ...form.notation, simplicite: v })} />
          <SliderNote label="Volume marché"    icon="📈" value={form.notation.volumeMarche}    onChange={v => setField('notation', { ...form.notation, volumeMarche: v })} />
          <div style={{
            marginTop: '16px', background: '#04255B', borderRadius: '8px', padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Quicksand, sans-serif' }}>
              Note globale calculée
            </span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#FDC71C', fontFamily: 'Quicksand, sans-serif' }}>
              {calculatedScore}&nbsp;<span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/10</span>
            </span>
          </div>
        </AccordionSection>

        {/* ── K — Description du produit ── */}
        <AccordionSection
          id="sec-k"
          title="K — Description du produit"
          subtitle="Affiché dans le bloc 'Présentation du produit' de la fiche"
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>Description du produit</label>
            <p style={subLabelStyle}>
              Parle uniquement du produit et de ses avantages — ne mentionne pas SunnyGo ni son process.
            </p>
            <textarea
              value={form.description || ''}
              onChange={e => setField('description', e.target.value)}
              placeholder="Décrivez le produit, son fonctionnement et ce qu'il apporte au client..."
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Accroche (1 ligne)</label>
            <p style={subLabelStyle}>Courte phrase affichée sous le titre du produit</p>
            <input
              value={form.accroche || ''}
              onChange={e => setField('accroche', e.target.value)}
              placeholder="Ex: Déshumidification thermodynamique pour serres — sans reste à charge."
              style={inputStyle}
            />
          </div>
        </AccordionSection>

        {/* ── P — Rémunération ── */}
        <AccordionSection
          id="sec-p"
          title="P — Rémunération"
          subtitle="Affiché dans le bandeau jaune horizontal de la fiche"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Rémunération *</label>
              <p style={subLabelStyle}>Format libre — affiché tel quel</p>
              <input
                value={form.remuneration || ''}
                onChange={e => setField('remuneration', e.target.value)}
                placeholder="ex: 0,50 € / m² ou 20% du devis HT"
                style={{ ...inputStyle, borderColor: errors.remuneration ? '#EF4444' : '#E5E7EB' }}
              />
              {errors.remuneration && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.remuneration}</p>}
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Déclenchement</label>
              <input
                value={form.declenchement || ''}
                onChange={e => setField('declenchement', e.target.value)}
                placeholder="ex: Après validation du Cofrac"
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Délai de paiement</label>
              <input
                value={form.delaiPaiement || ''}
                onChange={e => setField('delaiPaiement', e.target.value)}
                placeholder="ex: 2 semaines après installation"
                style={inputStyle}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ── O — Matériel utilisé ── */}
        <AccordionSection
          id="sec-o"
          title="O — Matériel utilisé"
          subtitle="Tableau affiché dans le bloc 'Matériel utilisé'"
        >
          {form.materiel === null ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '14px' }}>
                Le bloc matériel est désactivé — il n'apparaît pas sur la fiche produit.
              </p>
              <button type="button" onClick={() => setField('materiel', [])}
                style={{ background: '#04255B', color: 'white', border: 'none', borderRadius: '8px', padding: '9px 18px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                + Activer le bloc matériel
              </button>
            </div>
          ) : (
            <>
              <ListeDynamique
                items={form.materiel || []}
                onChange={v => setField('materiel', v)}
                addLabel="Ajouter un équipement"
                onAdd={() => setField('materiel', [...(form.materiel || []), { modele: '', dimensionnement: '' }])}
                renderItem={(item, idx, onChange) => (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input value={item.modele || ''} onChange={e => onChange({ ...item, modele: e.target.value })}
                      placeholder="Modèle (ex: RUIWANG — RWDD-240L)" style={{ ...inputStyle, marginBottom: 0 }} />
                    <input value={item.dimensionnement || ''} onChange={e => onChange({ ...item, dimensionnement: e.target.value })}
                      placeholder="Dimensionnement (ex: 1 unité / 1 000 m²)" style={{ ...inputStyle, marginBottom: 0 }} />
                  </div>
                )}
              />
              <button type="button" onClick={() => setField('materiel', null)}
                style={{ marginTop: '10px', background: 'none', color: '#9CA3AF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '6px 14px', fontFamily: 'Quicksand, sans-serif', fontWeight: 500, fontSize: '11px', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = '#FECACA' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = '#E5E7EB' }}>
                🚫 Désactiver le bloc matériel
              </button>
            </>
          )}
        </AccordionSection>

        {/* ── N — Conditions d'éligibilité ── */}
        <AccordionSection
          id="sec-n"
          title="N — Conditions d'éligibilité"
          subtitle="Tableau affiché dans le bloc 'Conditions d'éligibilité'"
        >
          <ListeDynamique
            items={form.eligibilite || []}
            onChange={v => setField('eligibilite', v)}
            addLabel="Ajouter une condition"
            onAdd={() => setField('eligibilite', [...(form.eligibilite || []), { critere: '', valeur: '' }])}
            renderItem={(item, idx, onChange) => (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                <input value={item.critere || ''} onChange={e => onChange({ ...item, critere: e.target.value })}
                  placeholder="Critère (ex: Superficie minimum)" style={{ ...inputStyle, marginBottom: 0 }} />
                <input value={item.valeur || ''} onChange={e => onChange({ ...item, valeur: e.target.value })}
                  placeholder="Valeur (ex: 3 000 m²)" style={{ ...inputStyle, marginBottom: 0 }} />
              </div>
            )}
          />
        </AccordionSection>

        {/* ── M — Process client ── */}
        <AccordionSection
          id="sec-m"
          title="M — Process client"
          subtitle="Étapes numérotées affichées sur la fiche produit"
        >
          <ListeDynamique
            items={form.processClient || []}
            onChange={v => setField('processClient', v)}
            addLabel="Ajouter une étape"
            onAdd={() => setField('processClient', [...(form.processClient || []), { titre: '', description: '', duree: null }])}
            renderItem={(item, idx, onChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                  <input value={item.titre || ''} onChange={e => onChange({ ...item, titre: e.target.value })}
                    placeholder="Titre de l'étape (requis)" style={{ ...inputStyle, marginBottom: 0, fontWeight: 600 }} />
                  <div>
                    <input value={item.duree || ''} onChange={e => onChange({ ...item, duree: e.target.value || null })}
                      placeholder="Durée (ex: 24h)" style={{ ...inputStyle, marginBottom: 0 }} />
                    <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '3px 0 0 2px' }}>Affiché comme badge à droite</p>
                  </div>
                </div>
                <textarea value={item.description || ''} onChange={e => onChange({ ...item, description: e.target.value })}
                  placeholder="Description de l'étape..." rows={2}
                  style={{ ...inputStyle, marginBottom: 0, resize: 'vertical', lineHeight: 1.5 }} />
              </div>
            )}
          />
        </AccordionSection>

        {/* ── L — Exemple de dossier ── */}
        <AccordionSection
          id="sec-l"
          title="L — Exemple de dossier"
          subtitle="Affiché dans le bloc 'Exemple de dossier et rémunération'"
        >
          {!form.exempleDossier ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '14px' }}>
                Aucun exemple de dossier — ce bloc n'apparaît pas sur la fiche produit.
              </p>
              <button type="button"
                onClick={() => setField('exempleDossier', { contexte: '', details: [], resultat: { label: 'Votre rémunération', valeur: '', highlight: true }, note: '' })}
                style={{ background: '#04255B', color: 'white', border: 'none', borderRadius: '8px', padding: '9px 18px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                + Activer l'exemple de dossier
              </button>
            </div>
          ) : (
            <>
              {/* Contexte */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Description du client type</label>
                <textarea
                  value={form.exempleDossier.contexte || ''}
                  onChange={e => setField('exempleDossier', { ...form.exempleDossier, contexte: e.target.value })}
                  placeholder="Ex: Serre maraîchère chapelle — Sénas (13)"
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
                />
              </div>

              {/* Détails */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Détails du dossier</label>
                <ListeDynamique
                  items={form.exempleDossier.details || []}
                  onChange={v => setField('exempleDossier', { ...form.exempleDossier, details: v })}
                  addLabel="Ajouter un détail"
                  onAdd={() => setField('exempleDossier', { ...form.exempleDossier, details: [...(form.exempleDossier.details || []), { label: '', valeur: '' }] })}
                  renderItem={(item, idx, onChange) => (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input value={item.label || ''} onChange={e => onChange({ ...item, label: e.target.value })}
                        placeholder="Label (ex: Surface de serre)" style={{ ...inputStyle, marginBottom: 0 }} />
                      <input value={item.valeur || ''} onChange={e => onChange({ ...item, valeur: e.target.value })}
                        placeholder="Valeur (ex: 37 000 m²)" style={{ ...inputStyle, marginBottom: 0 }} />
                    </div>
                  )}
                />
              </div>

              {/* Résultat */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={labelStyle}>Label résultat</label>
                  <input
                    value={form.exempleDossier.resultat?.label || ''}
                    onChange={e => setField('exempleDossier', { ...form.exempleDossier, resultat: { ...form.exempleDossier.resultat, label: e.target.value } })}
                    placeholder="Votre rémunération sur ce dossier"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Valeur résultat (mise en avant)</label>
                  <input
                    value={form.exempleDossier.resultat?.valeur || ''}
                    onChange={e => setField('exempleDossier', { ...form.exempleDossier, resultat: { ...form.exempleDossier.resultat, valeur: e.target.value } })}
                    placeholder="18 500 €"
                    style={{ ...inputStyle, fontSize: '16px', fontWeight: 700, color: '#04255B' }}
                  />
                </div>
              </div>

              {/* Note */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Note ou précision (optionnel)</label>
                <textarea
                  value={form.exempleDossier.note || ''}
                  onChange={e => setField('exempleDossier', { ...form.exempleDossier, note: e.target.value })}
                  placeholder="Ex: 0,50 € × 37 000 m² = 18 500 €"
                  rows={2}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <button type="button" onClick={() => setField('exempleDossier', null)}
                style={{ background: 'none', color: '#9CA3AF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '6px 14px', fontFamily: 'Quicksand, sans-serif', fontWeight: 500, fontSize: '11px', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = '#FECACA' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = '#E5E7EB' }}>
                🚫 Désactiver l'exemple de dossier
              </button>
            </>
          )}
        </AccordionSection>

        {/* ── J — Documents ── */}
        <AccordionSection id="sec-j" title="J — Documents / Supports commerciaux">
          <DocumentUpload
            documents={form.documents || []}
            onChange={docs => setField('documents', docs)}
            productId={form.id}
          />
        </AccordionSection>

        {/* ── Boutons actions ── */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: '12px',
          padding: '20px 0', borderTop: '1px solid #E5E7EB', marginTop: '8px',
        }}>
          <button
            type="button" onClick={onCancel}
            style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: '10px', padding: '12px 24px', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '14px', color: '#6B7280', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#04255B'; e.currentTarget.style.color = '#04255B' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280' }}>
            Annuler
          </button>
          <button
            type="button" onClick={handleSave}
            style={{ background: '#04255B', border: 'none', borderRadius: '10px', padding: '12px 28px', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '14px', color: 'white', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = '#162CA1'}
            onMouseLeave={e => e.currentTarget.style.background = '#04255B'}>
            💾 Enregistrer
          </button>
        </div>

      </div>
    </div>
  )
}
