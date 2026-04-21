export default function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }) {
  const base = 'inline-flex items-center gap-2 font-quicksand font-bold text-sm px-8 py-3.5 rounded-pill transition-default cursor-pointer border-0'

  const variants = {
    primary: 'bg-sunnygo-yellow text-sunnygo-navy hover:bg-sunnygo-yellow-dark hover:translate-y-[-1px]',
    secondary: 'bg-sunnygo-navy text-white hover:bg-sunnygo-navy-light hover:translate-y-[-1px]',
    outline: 'border-2 border-white text-white bg-transparent hover:bg-white/10',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
