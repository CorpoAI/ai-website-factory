import { defineSite } from '@/engine/defineSite'

/**
 * EXAMPLE (fictional) — steakhouse with a fully custom section list.
 * Uses the dark "fine-dining" theme, adds an events section and its own menu.
 */
export default defineSite({
  slug: 'ogien-warszawa',
  industry: 'restaurant',
  locale: 'pl',
  business: {
    name: 'Ogień & Dym',
    tagline: 'Steki sezonowane na miejscu i kuchnia z otwartego ognia',
    phone: '+48 800 400 500',
    email: 'rezerwacje@ogien.example',
    street: 'ul. Przykładowa 21',
    postalCode: '00-001',
    city: 'Warszawa',
    openingHours: [
      { days: 'Wt–Czw', hours: '17:00–23:00' },
      { days: 'Pt–Sob', hours: '13:00–24:00' },
      { days: 'Niedz', hours: '13:00–21:00' },
      { days: 'Pon', hours: 'nieczynne' },
    ],
    rating: { value: 4.8, count: 1240, source: 'Google' },
  },
  theme: { preset: 'fine-dining' },
  sections: [
    {
      type: 'hero',
      variant: 'centered',
      eyebrow: 'Warszawa · od 2014',
      title: 'Ogień, czas i najlepsza wołowina',
      subtitle: 'Sezonujemy mięso na miejscu przez 28–45 dni i pieczemy je nad dębowym drewnem.',
      primaryCta: { label: 'Zarezerwuj stolik', href: '#rezerwacja' },
      secondaryCta: { label: 'Karta', href: '#menu' },
    },
    {
      type: 'about',
      id: 'o-nas',
      nav: 'O nas',
      title: 'Kuchnia bez skrótów',
      body: [
        'Pracujemy z dwoma polskimi hodowcami bydła rasy Angus i Hereford. Cały proces — od rozbioru po sezonowanie — odbywa się w naszej kuchni.',
        'Grill opalamy wyłącznie drewnem dębowym i bukowym. Do tego karta win z ponad 120 pozycjami.',
      ],
      bullets: ['Własna sezonownia', 'Grill na drewno', '120+ win'],
    },
    {
      type: 'menu',
      id: 'menu',
      nav: 'Karta',
      title: 'Karta',
      categories: [
        {
          name: 'Steki',
          items: [
            { name: 'Ribeye 400 g', description: 'sezonowany 35 dni, sól wędzona', price: '189 zł', tags: ['chef', 'gf'] },
            { name: 'T-bone 800 g', description: 'dla dwojga, sezonowany 45 dni', price: '340 zł', tags: ['gf'] },
            { name: 'Polędwica 250 g', description: 'masło z bone marrow', price: '165 zł', tags: ['gf'] },
          ],
        },
        {
          name: 'Dodatki',
          items: [
            { name: 'Frytki na łoju wołowym', price: '22 zł', tags: ['gf'] },
            { name: 'Pieczone warzywa z ognia', price: '24 zł', tags: ['vegan', 'gf'] },
            { name: 'Sos chimichurri / pieprzowy', price: '12 zł', tags: ['gf'] },
          ],
        },
        {
          name: 'Desery',
          items: [{ name: 'Crème brûlée z dymem', price: '32 zł', tags: ['vege', 'gf'] }],
        },
      ],
      note: 'Ceny brutto. Wagi podane przed obróbką.',
    },
    {
      type: 'events',
      id: 'wydarzenia',
      nav: 'Wydarzenia',
      title: 'Najbliższe wydarzenia',
      items: [
        { title: 'Kolacja z winiarzem z Rioja', date: '14 listopada', description: '5 dań, 5 win. Liczba miejsc ograniczona do 30.' },
        { title: 'Warsztaty: stek idealny w domu', date: '28 listopada', description: 'Szef kuchni pokaże rozbiór i techniki grillowania.' },
      ],
    },
    { type: 'gallery', title: 'Wnętrze', images: [{ alt: 'Sala' }, { alt: 'Grill' }, { alt: 'Sezonownia' }, { alt: 'Bar' }, { alt: 'Stek' }] },
    {
      type: 'testimonials',
      id: 'opinie',
      nav: 'Opinie',
      title: 'Opinie gości',
      items: [
        { author: 'Piotr', rating: 5, date: 'październik 2026', text: 'Najlepszy ribeye, jaki jadłem w Polsce. Obsługa zna się na winie.' },
        { author: 'Agnieszka', rating: 5, date: 'październik 2026', text: 'Kolacja firmowa na 12 osób — wszystko perfekcyjnie zorganizowane.' },
        { author: 'Tomek', rating: 5, date: 'wrzesień 2026', text: 'Drogo, ale warto. Frytki na łoju to obowiązek.' },
      ],
    },
    {
      type: 'reservation',
      id: 'rezerwacja',
      nav: 'Rezerwacja',
      title: 'Rezerwacja',
      subtitle: 'W piątki i soboty rekomendujemy rezerwację z kilkudniowym wyprzedzeniem.',
      slots: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
      maxGuests: 10,
    },
    { type: 'contact', id: 'kontakt', title: 'Dojazd', map: true },
  ],
  demo: { isDemo: true, preparedBy: 'AI Website Factory', note: 'Fikcyjna restauracja — przykład w repozytorium.' },
})
