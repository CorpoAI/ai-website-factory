import { defineSite } from '@/engine/defineSite'

/**
 * EXAMPLE (fictional company) — minimal construction demo.
 * Shows how little is needed: business data + theme. Everything else comes
 * from the construction template defaults.
 */
export default defineSite({
  slug: 'budmax-krakow',
  industry: 'construction',
  locale: 'pl',
  business: {
    name: 'Budmax',
    tagline: 'Generalny wykonawca domów i remontów',
    phone: '+48 600 100 200',
    email: 'biuro@budmax.example',
    street: 'ul. Przykładowa 12',
    postalCode: '30-001',
    city: 'Kraków',
    serviceArea: 'Kraków i 60 km wokół',
    taxId: '000-000-00-00',
    openingHours: [
      { days: 'Pon–Pt', hours: '7:00–17:00' },
      { days: 'Sob', hours: '8:00–13:00' },
    ],
    rating: { value: 4.9, count: 87, source: 'Google' },
  },
  theme: { preset: 'industrial' },
  demo: {
    isDemo: true,
    preparedBy: 'AI Website Factory',
    contactHref: 'mailto:kontakt@example.com?subject=Nowa%20strona%20Budmax',
    note: 'Fikcyjna firma — przykład w repozytorium.',
  },
})
