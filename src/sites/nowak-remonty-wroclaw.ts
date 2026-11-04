import { defineSite } from '@/engine/defineSite'
import { MEDIA } from '@/engine/media'

const M = MEDIA.construction

/**
 * EXAMPLE (fictional company) — customised construction demo.
 * Renovation-only firm: different theme + brand color, own services and
 * projects, hidden "stats", patched hero and calculator via `overrides`.
 */
export default defineSite({
  slug: 'nowak-remonty-wroclaw',
  industry: 'construction',
  locale: 'pl',
  business: {
    name: 'Nowak Remonty',
    tagline: 'Remonty mieszkań i łazienek we Wrocławiu',
    phone: '+48 700 300 400',
    email: 'kontakt@nowak-remonty.example',
    street: 'ul. Testowa 5/2',
    postalCode: '50-001',
    city: 'Wrocław',
    serviceArea: 'Wrocław i powiat wrocławski',
    rating: { value: 4.8, count: 132, source: 'Google' },
  },
  theme: { preset: 'modern-build', primary: '#0f766e', accent: '#134e4a' },
  hide: ['stats', 'marquee'],
  overrides: {
    hero: {
      variant: 'split',
      eyebrow: 'Remonty pod klucz · Wrocław',
      title: 'Remont mieszkania *bez stresu.*',
      image: M.livingRoom,
      subtitle: 'Jedna ekipa od skuwania płytek po montaż lamp. Mieszkanie 50 m² oddajemy średnio w 6 tygodni.',
      primaryCta: { label: 'Policz koszt remontu', href: '#wycena' },
      secondaryCta: { label: 'Nasze realizacje', href: '#realizacje' },
      highlights: ['Gwarancja 3 lata', 'Sprzątanie po pracach w cenie'],
    },
    services: {
      title: 'Robimy *wszystko,* co dzieje się między ścianami.',
      subtitle: 'Specjalizujemy się w mieszkaniach w blokach i kamienicach.',
      items: [
        { icon: 'hammer', image: M.demolition, title: 'Remont generalny', description: 'Kompleksowo: instalacje, gładzie, podłogi, drzwi.', priceFrom: 'od 1 300 zł/m²' },
        { icon: 'drop', image: M.bathroom2, title: 'Łazienki', description: 'Projekt, hydraulika, płytki wielkoformatowe, zabudowy.', priceFrom: 'od 22 000 zł' },
        { icon: 'paint', image: M.minimalRoom, title: 'Malowanie i gładzie', description: 'Szybko i czysto — z odkurzaczami przemysłowymi.', priceFrom: 'od 45 zł/m²' },
        { icon: 'bolt', image: M.electrician2, title: 'Elektryka', description: 'Wymiana instalacji aluminiowej, rozdzielnice, pomiary.' },
        { icon: 'key', image: M.openLiving, title: 'Pod wynajem', description: 'Odświeżenie mieszkania pod najem w 2–3 tygodnie.' },
        { icon: 'shield', image: M.kitchen2, title: 'Odbiory od dewelopera', description: 'Sprawdzimy mieszkanie przed odbiorem i wypiszemy usterki.', priceFrom: '450 zł' },
      ],
    },
    projects: {
      items: [
        { title: 'Kawalerka na Nadodrzu', category: 'Mieszkania', location: 'Wrocław', year: '2026', facts: ['32 m²', '4 tygodnie'], description: 'Pełny remont pod wynajem krótkoterminowy.', image: M.minimalRoom },
        { title: 'Łazienka z prysznicem walk-in', category: 'Łazienki', location: 'Wrocław', year: '2026', facts: ['6 m²', '10 dni'], image: M.bathroom },
        { title: 'Mieszkanie w kamienicy', category: 'Mieszkania', location: 'Wrocław', year: '2025', facts: ['84 m²', '9 tygodni'], description: 'Nowe instalacje, odnowione oryginalne parkiety i sztukaterie. Przesuń suwak, żeby zobaczyć stan sprzed remontu.', image: M.livingClassic, before: M.demolition },
        { title: 'Jasna łazienka w bloku', category: 'Łazienki', location: 'Wrocław', year: '2025', facts: ['5 m²', '9 dni'], image: M.bathroom2 },
        { title: 'Mieszkanie od dewelopera', category: 'Wykończenia', location: 'Wrocław', year: '2025', facts: ['58 m²', '5 tygodni'], image: M.livingRoom2 },
        { title: 'Kuchnia otwarta na salon', category: 'Wykończenia', location: 'Wrocław', year: '2024', facts: ['24 m²', '3 tygodnie'], image: M.kitchen },
      ],
    },
    quoteCalculator: {
      title: 'Ile kosztuje *Twój remont?*',
      workTypes: [
        { id: 'general', label: 'Remont generalny mieszkania', pricePerUnit: [1300, 2000], unit: 'm²', image: M.demolition, duration: '6–9 tygodni' },
        { id: 'developer', label: 'Wykończenie od dewelopera', pricePerUnit: [850, 1400], unit: 'm²', image: M.livingRoom2, duration: '4–6 tygodni' },
        { id: 'bathroom', label: 'Łazienka kompleksowo', pricePerUnit: [3000, 4200], unit: 'm²', image: M.bathroom, duration: '9–14 dni' },
        { id: 'paint', label: 'Gładzie i malowanie', pricePerUnit: [45, 75], unit: 'm² ścian', image: M.minimalRoom, duration: '1–2 tygodnie' },
      ],
    },
  },
  demo: { isDemo: true, preparedBy: 'AI Website Factory', note: 'Fikcyjna firma — przykład w repozytorium.' },
})
