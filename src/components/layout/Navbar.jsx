import { Link, useLocation } from 'react-router-dom'
import logoBlanc from '../../assets/logo-blanc.png'

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const isHub = pathname === '/'

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between"
      style={{
        height: '60px',
        flexShrink: 0,
        background: 'linear-gradient(135deg, #162CA1 0%, #04255B 100%)',
        borderBottom: 'none',
        boxShadow: '0 2px 20px rgba(4,37,91,0.3)',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {isHub && (
          <button
            onClick={onMenuClick}
            className="md:hidden flex flex-col gap-1.5 p-1"
            style={{ color: '#ffffff' }}
            aria-label="Ouvrir le menu"
          >
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
          </button>
        )}
        {!isHub && (
          <Link
            to="/"
            className="hidden md:flex items-center gap-1.5 font-quicksand font-semibold"
            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FDC71C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          >
            ← Hub SunnyGo
          </Link>
        )}
        <Link to="/">
          <img src={logoBlanc} alt="SunnyGo" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
        </Link>
      </div>

      {/* RIGHT */}
      {isHub ? (
        <div className="flex items-center gap-2">
          <Link
            to="/comment-ca-marche"
            className="font-quicksand font-semibold hidden sm:block"
            style={{
              fontSize: '13px',
              color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '7px 14px',
              background: 'transparent',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Comment ça marche
          </Link>
          <Link
            to="/espace"
            className="font-quicksand font-bold"
            style={{
              fontSize: '13px',
              color: '#04255B',
              background: '#FDC71C',
              borderRadius: '8px',
              padding: '7px 14px',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#E59319'}
            onMouseLeave={e => e.currentTarget.style.background = '#FDC71C'}
          >
            Espace commerciaux
          </Link>
        </div>
      ) : (
        <Link
          to="/"
          className="md:hidden font-quicksand font-semibold text-[13px]"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          ← Retour
        </Link>
      )}
    </nav>
  )
}
