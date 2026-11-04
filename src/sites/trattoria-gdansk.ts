import { defineSite } from '@/engine/defineSite'

/** EXAMPLE (fictional) — casual Italian restaurant using restaurant defaults + bistro theme. */
export default defineSite({
  slug: 'trattoria-gdansk',
  industry: 'restaurant',
  locale: 'pl',
  business: {
    name: 'Trattoria Nonna',
    tagline: 'Włoska kuchnia domowa w sercu Gdańska',
    phone: '+48 500 200 300',
    email: 'stolik@trattoria.example',
    street: 'ul. Przykładowa 8',
    postalCode: '80-001',
    city: 'Gdańsk',
    openingHours: [
      { days: 'Pon–Czw', hours: '12:00–22:00' },
      { days: 'Pt–Sob', hours: '12:00–23:00' },
      { days: 'Niedz', hours: '12:00–21:00' },
    ],
    rating: { value: 4.7, count: 512, source: 'Google' },
    social: [
      { platform: 'instagram', url: 'https://instagram.com/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
  },
  demo: { isDemo: true, preparedBy: 'AI Website Factory', note: 'Fikcyjna restauracja — przykład w repozytorium.' },
})
