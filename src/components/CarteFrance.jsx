// Coordonnées SVG approximatives des villes dans un viewBox 0 0 400 450
const villes = [
  { nom: 'Paris',             x: 210, y: 108 },
  { nom: 'Lyon',              x: 242, y: 250 },
  { nom: 'Marseille',         x: 248, y: 345 },
  { nom: 'Bordeaux',          x: 128, y: 282 },
  { nom: 'Toulouse',          x: 168, y: 330 },
  { nom: 'Lille',             x: 208, y: 60  },
  { nom: 'Nantes',            x: 108, y: 200 },
  { nom: 'Strasbourg',        x: 310, y: 110 },
  { nom: 'Rennes',            x: 95,  y: 155 },
  { nom: 'Nice',              x: 300, y: 340 },
  { nom: 'Montpellier',       x: 220, y: 340 },
  { nom: 'Grenoble',          x: 272, y: 268 },
  { nom: 'Rouen',             x: 182, y: 90  },
  { nom: 'Toulon',            x: 268, y: 355 },
  { nom: 'Metz',              x: 272, y: 88  },
  { nom: 'Clermont-Ferrand',  x: 210, y: 248 },
  { nom: 'Dijon',             x: 258, y: 180 },
  { nom: 'Angers',            x: 130, y: 185 },
  { nom: 'Le Havre',          x: 158, y: 80  },
  { nom: 'Saint-Étienne',     x: 235, y: 260 },
  { nom: 'Brest',             x: 50,  y: 138 },
  { nom: 'Reims',             x: 235, y: 88  },
  { nom: 'Le Mans',           x: 158, y: 168 },
  { nom: 'Tours',             x: 170, y: 188 },
  { nom: 'Caen',              x: 152, y: 100 },
]

// Simplified France metropolitan path (approximated SVG)
const FRANCE_PATH = `
  M 148,22 L 170,20 L 198,28 L 220,22 L 248,30 L 278,22 L 305,32
  L 318,52 L 328,72 L 320,92 L 308,100 L 318,118 L 328,138
  L 340,158 L 348,182 L 338,200 L 325,215 L 328,235
  L 318,255 L 308,272 L 312,292 L 305,310 L 292,325
  L 278,338 L 268,350 L 255,362 L 242,370 L 228,368
  L 215,358 L 202,348 L 188,345 L 175,348 L 165,342
  L 152,332 L 142,318 L 128,305 L 118,290 L 108,272
  L 98,255 L 88,238 L 82,220 L 75,200 L 70,180
  L 68,160 L 62,142 L 55,128 L 48,115 L 52,100
  L 60,88  L 72,78  L 80,65  L 90,55  L 102,45
  L 115,38 L 130,28 L 148,22 Z
`

export default function CarteFrance() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full max-w-[320px] mx-auto">
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
        >
          {/* France territory */}
          <path
            d={FRANCE_PATH}
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* City dots with pulse animation */}
          {villes.map(v => (
            <g key={v.nom}>
              {/* Pulse ring */}
              <circle
                cx={v.x}
                cy={v.y}
                r="10"
                fill="none"
                stroke="#FDC71C"
                strokeWidth="1"
                className="animate-ping"
                style={{
                  animationDuration: `${2 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0,
                }}
              />
              {/* Dot */}
              <circle
                cx={v.x}
                cy={v.y}
                r="4"
                fill="#FDC71C"
                opacity="0.9"
              />
            </g>
          ))}
        </svg>

        {/* Pulse animation keyframes via inline style */}
        <style>{`
          @keyframes ping {
            0%   { transform: scale(1);   opacity: 0.6; }
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          .animate-ping {
            animation: ping 2s cubic-bezier(0,0,0.2,1) infinite;
          }
        `}</style>
      </div>

      <p className="font-quicksand text-[12px] text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Présents partout en France
      </p>
    </div>
  )
}
