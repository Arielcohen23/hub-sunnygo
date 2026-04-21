import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-blanc.png'

export default function Footer() {
  return (
    <footer className="bg-sunnygo-navy py-12 flex flex-col items-center gap-3">
      <img src={logoWhite} alt="SunnyGo" className="h-12 w-auto" />
      <p className="font-quicksand font-normal italic text-[14px] text-sunnygo-yellow">
        Votre expert photovoltaïque
      </p>
      <div className="w-[60px] h-[2px] bg-sunnygo-yellow my-1" />
      <p className="font-quicksand text-[12px] text-white/40">
        © 2025 SunnyGo — Tous droits réservés
      </p>
      <Link
        to="/admin"
        style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', marginTop: '8px', display: 'block' }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
      >
        Admin
      </Link>
    </footer>
  )
}
