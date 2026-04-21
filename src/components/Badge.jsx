export default function Badge({ children, variant = 'navy', className = '' }) {
  const base = 'inline-block font-quicksand font-bold text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-pill'

  const variants = {
    navy: 'bg-sunnygo-navy/8 text-sunnygo-navy',
    yellow: 'bg-sunnygo-yellow text-sunnygo-navy',
    outline: 'border border-[1.5px] border-sunnygo-navy text-sunnygo-navy bg-transparent',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-[#FF6B35] text-white',
    white: 'bg-white/15 text-white',
  }

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
