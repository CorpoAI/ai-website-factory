import { defineSite } from '@/engine/defineSite'

/**
 * EXAMPLE (fictional) — driving school demo built from the template.
 * For a real prospect: copy prices from their site/Facebook, pass rates from
 * the WORD / starostwo report (BIP), reviews + rating from Google.
 */
export default defineSite({
  slug: 'osk-prawko-warszawa',
  industry: 'driving-school',
  locale: 'pl',
  business: {
    name: 'Prawko.',
    tagline: 'Szkoła jazdy, w której zdaje się za pierwszym razem',
    phone: '+48 600 700 800',
    email: 'zapisy@prawko.example',
    street: 'ul. Przykładowa 15',
    postalCode: '02-001',
    city: 'Warszawa',
    serviceArea: 'Mokotów, Ursynów, Wilanów — odbiór spod domu',
    openingHours: [
      { days: 'Pon–Pt', hours: '9:00–19:00' },
      { days: 'Sob', hours: '9:00–14:00' },
    ],
    rating: { value: 4.9, count: 418, source: 'Google' },
    social: [
      { platform: 'instagram', url: 'https://instagram.com/' },
      { platform: 'tiktok', url: 'https://tiktok.com/' },
    ],
  },
  theme: { preset: 'road' },
  demo: { isDemo: true, preparedBy: 'AI Website Factory', note: 'Fikcyjna szkoła jazdy — przykład w repozytorium.' },
})
