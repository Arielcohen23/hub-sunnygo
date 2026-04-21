import { useState } from 'react'

const faq = [
  {
    q: 'Faut-il une formation pour démarrer ?',
    r: "Non. Tous nos supports sont clés en main. Vous pouvez commencer à prospecter dès votre inscription avec nos fiches techniques, présentations et FAQ disponibles dans le Hub.",
  },
  {
    q: 'Quel est le montant des commissions ?',
    r: "Les commissions varient selon le produit. Elles sont détaillées sur chaque fiche produit dans le Hub. Certains produits fonctionnent sur une marge à la revente, d'autres sur un montant fixe par dossier.",
  },
  {
    q: 'Combien de temps entre la signature et le paiement ?',
    r: "Le paiement intervient sous 30 jours après validation de l'installation par nos équipes. Vous recevrez une confirmation par email à chaque étape.",
  },
  {
    q: "Puis-je apporter des clients dans toute la France ?",
    r: "Oui. SunnyGo intervient sur tout le territoire métropolitain grâce à son réseau de plus de 180 partenaires RGE certifiés.",
  },
  {
    q: 'Comment transmettre un dossier client ?',
    r: "Directement depuis le Hub SunnyGo — sélectionnez le produit concerné et utilisez le formulaire de transmission intégré à la fiche produit.",
  },
]

function AccordionItem({ question, reponse, isOpen, onToggle }) {
  return (
    <div
      className="border-b last:border-b-0 transition-default"
      style={{ borderColor: '#F3F4F6' }}
    >
      <button
        className="w-full text-left flex items-center justify-between gap-4 py-4 font-quicksand font-semibold text-[15px] text-sunnygo-navy hover:text-sunnygo-yellow transition-default"
        onClick={onToggle}
      >
        <span>{question}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-[14px] font-bold transition-default"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="font-quicksand text-[14px] text-sunnygo-muted leading-[1.75] pb-4">
          {reponse}
        </p>
      </div>
    </div>
  )
}

export default function AccordionFAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <div className="flex flex-col">
      {faq.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.q}
          reponse={item.r}
          isOpen={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  )
}
