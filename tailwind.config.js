/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './sites/**/*.{ts,tsx}'],
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
      },
      borderRadius: {
        theme: 'var(--radius)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
}
