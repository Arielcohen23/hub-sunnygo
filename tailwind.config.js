/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sunnygo: {
          navy: '#04255B',
          'navy-light': '#162CA1',
          yellow: '#FDC71C',
          'yellow-dark': '#E59319',
          bg: '#F7F6F2',
          text: '#1A1A1A',
          muted: '#6B7A8D',
        },
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '50px',
        input: '10px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(4,37,91,0.06), 0 8px 24px rgba(4,37,91,0.04)',
        'card-hover': '0 8px 32px rgba(4,37,91,0.14)',
        navbar: '0 1px 0 rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}
