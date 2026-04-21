import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoColor from '../assets/logo-couleur.png'
import logoWhite from '../assets/logo-blanc.png'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Produits CEE', to: '/cee' },
  { label: 'Panneaux PV', to: '/pv' },
  { label: 'Tiers Investissement', to: '/tiers-investissement' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      <nav
        className="sticky top-0 z-40 bg-white h-[68px] flex items-center"
        style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.07)' }}
      >
        <div className="container-app w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logoColor} alt="SunnyGo" className="h-11 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(link => {
              const active = pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-quicksand font-semibold text-[14px] transition-default hover:text-sunnygo-yellow ${
                    active
                      ? 'text-sunnygo-yellow underline underline-offset-4'
                      : 'text-sunnygo-navy'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/espace-commerciaux"
              className="ml-2 font-quicksand font-bold text-[13px] text-white bg-sunnygo-navy px-5 py-2.5 rounded-pill transition-default hover:bg-sunnygo-navy-light"
            >
              Espace commerciaux
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-sunnygo-navy p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-sunnygo-navy flex flex-col items-center justify-center">
          <button
            className="absolute top-5 right-5 text-white p-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l16 16M22 6L6 22" />
            </svg>
          </button>

          <img src={logoWhite} alt="SunnyGo" className="h-12 w-auto mb-12" />

          <div className="flex flex-col items-center gap-8">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="font-quicksand font-bold text-2xl text-white hover:text-sunnygo-yellow transition-default"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/espace-commerciaux"
              onClick={() => setMenuOpen(false)}
              className="mt-4 font-quicksand font-bold text-base text-sunnygo-navy bg-sunnygo-yellow px-8 py-3 rounded-pill transition-default"
            >
              Espace commerciaux
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
