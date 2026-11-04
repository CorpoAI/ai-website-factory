/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        'bg-alt': token('bg-alt'),
        card: token('card'),
        ink: token('ink'),
        'ink-muted': token('ink-muted'),
        line: token('line'),
        brand: token('brand'),
        'brand-ink': token('brand-ink'),
        accent: token('accent'),
        inverse: token('inverse'),
        'inverse-ink': token('inverse-ink'),
      },
      borderRadius: { theme: 'var(--radius)' },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'rise-in': { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'none' } },
        'slow-zoom': { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'rise-in': 'rise-in 0.9s cubic-bezier(.2,.7,.2,1) both',
        'slow-zoom': 'slow-zoom 2.4s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}
