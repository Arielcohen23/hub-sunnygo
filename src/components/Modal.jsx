import { useEffect } from 'react'
import Button from './Button'

export default function Modal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const nom = data.get('nom') || ''
    const email = data.get('email') || ''
    const tel = data.get('tel') || ''
    const entreprise = data.get('entreprise') || ''
    const subject = encodeURIComponent(`Demande Tiers Invest - ${nom}`)
    const body = encodeURIComponent(
      `Nom : ${nom}\nEmail : ${email}\nTéléphone : ${tel}\nEntreprise cliente : ${entreprise}`
    )
    window.location.href = `mailto:contact@sunnygo.fr?subject=${subject}&body=${body}`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,37,91,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-card w-full max-w-md p-8 relative shadow-card-hover">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sunnygo-muted hover:text-sunnygo-navy text-xl font-bold transition-default"
          aria-label="Fermer"
        >
          ×
        </button>

        <h3 className="font-quicksand font-bold text-2xl text-sunnygo-navy mb-6">
          Signaler un intérêt
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { name: 'nom', label: 'Votre nom', type: 'text', required: true },
            { name: 'email', label: 'Votre email', type: 'email', required: true },
            { name: 'tel', label: 'Votre téléphone', type: 'tel', required: true },
            { name: 'entreprise', label: "Nom de l'entreprise cliente", type: 'text', required: false },
          ].map(field => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label className="font-quicksand font-600 text-sm text-sunnygo-navy">
                {field.label}{field.required && ' *'}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                className="border border-gray-200 rounded-input px-4 py-2.5 text-sm font-quicksand outline-none focus:border-sunnygo-yellow transition-default"
              />
            </div>
          ))}

          <Button type="submit" variant="primary" className="mt-2 justify-center">
            Envoyer ma demande
          </Button>
        </form>
      </div>
    </div>
  )
}
