import type { BusinessInfo, PlacedSection } from '../types'

/**
 * Restaurant template.
 * Goal of the page: reservation or visit. The guest's questions, in order:
 * What's the vibe? → What's on the menu and how much? → Is it good (reviews)?
 * → When are they open / where? → Book.
 */
export function restaurantDefaults(b: BusinessInfo): PlacedSection[] {
  return [
    {
      type: 'hero',
      variant: 'image',
      eyebrow: `${b.city}${b.street ? ` · ${b.street}` : ''}`,
      title: b.tagline ?? 'Kuchnia sezonowa, która smakuje jak u siebie',
      subtitle: 'Świeże produkty od lokalnych dostawców, domowe makarony i wino, które warto odkryć.',
      primaryCta: { label: 'Zarezerwuj stolik', href: '#rezerwacja' },
      secondaryCta: { label: 'Zobacz menu', href: '#menu' },
    },
    {
      type: 'about',
      id: 'o-nas',
      nav: 'O nas',
      title: 'Gotujemy z tego, co akurat najlepsze',
      body: [
        'Nasze menu zmienia się razem z porami roku. Warzywa bierzemy od rolników spod miasta, makaron robimy codziennie rano, a pieczywo wypiekamy na miejscu.',
        'To miejsce na długą kolację ze znajomymi, szybki lunch w tygodniu i rodzinny obiad w niedzielę.',
      ],
      bullets: ['Lokalni dostawcy', 'Domowy makaron', 'Opcje wege i bez glutenu'],
    },
    {
      type: 'menu',
      id: 'menu',
      nav: 'Menu',
      title: 'Menu',
      subtitle: 'Karta zmienia się sezonowo. Aktualne dania dnia znajdziesz na naszym Instagramie.',
      categories: [
        {
          name: 'Przystawki',
          items: [
            { name: 'Burrata z pomidorami', description: 'pomidory malinowe, bazylia, oliwa z pierwszego tłoczenia', price: '42 zł', tags: ['vege', 'gf'] },
            { name: 'Tatar wołowy', description: 'żółtko, kapary, marynowana szalotka, grzanka', price: '48 zł', tags: ['chef'] },
            { name: 'Zupa dnia', description: 'zapytaj obsługę', price: '24 zł' },
          ],
        },
        {
          name: 'Dania główne',
          items: [
            { name: 'Tagliatelle z ragù', description: 'wolno duszona wołowina, parmezan 24 mies.', price: '54 zł', tags: ['chef'] },
            { name: 'Risotto z grzybami leśnymi', description: 'masło szałwiowe, pecorino', price: '52 zł', tags: ['vege', 'gf'] },
            { name: 'Pierś z kaczki', description: 'puree z pieczonej dyni, sos wiśniowy', price: '72 zł', tags: ['gf'] },
            { name: 'Pstrąg z pieca', description: 'masło cytrynowe, młode ziemniaki, fasolka', price: '64 zł', tags: ['gf'] },
          ],
        },
        {
          name: 'Desery',
          items: [
            { name: 'Tiramisu', description: 'klasyczne, z mascarpone', price: '28 zł', tags: ['vege'] },
            { name: 'Sernik baskijski', description: 'z sosem z sezonowych owoców', price: '26 zł', tags: ['vege', 'gf'] },
          ],
        },
        {
          name: 'Napoje',
          items: [
            { name: 'Lemoniada domowa', description: '0,4 l — cytryna/mięta lub sezonowa', price: '16 zł', tags: ['vegan'] },
            { name: 'Kieliszek wina', description: 'zapytaj o wina dnia', price: 'od 22 zł' },
          ],
        },
      ],
      note: 'Informacje o alergenach dostępne u obsługi. Do rachunku dla grup 8+ osób doliczamy 10% serwisu.',
    },
    {
      type: 'features',
      title: 'Na każdą okazję',
      items: [
        { icon: 'clock', title: 'Lunch w tygodniu', description: 'Pon–Pt 12:00–15:00 — zupa + danie dnia w stałej cenie.' },
        { icon: 'users', title: 'Przyjęcia i imprezy', description: 'Sala do 40 osób: urodziny, komunie, spotkania firmowe. Menu ustalamy razem.' },
        { icon: 'truck', title: 'Na wynos', description: 'Zamów telefonicznie i odbierz po 20 minutach.' },
      ],
    },
    {
      type: 'gallery',
      id: 'galeria',
      title: 'Zajrzyj do nas',
      images: [{ alt: 'Sala' }, { alt: 'Danie' }, { alt: 'Bar' }, { alt: 'Kuchnia' }, { alt: 'Deser' }],
    },
    {
      type: 'testimonials',
      id: 'opinie',
      nav: 'Opinie',
      title: 'Goście o nas',
      items: [
        { author: 'Kasia M.', rating: 5, date: 'październik 2026', text: 'Najlepsze tagliatelle w mieście. Obsługa przemiła, a tiramisu — obowiązkowo!' },
        { author: 'Michał', rating: 5, date: 'wrzesień 2026', text: 'Byliśmy na kolacji rocznicowej. Świetne wino polecone przez kelnera i super klimat.' },
        { author: 'Joanna K.', rating: 4, date: 'sierpień 2026', text: 'Bardzo dobre jedzenie i duże porcje. W weekend warto rezerwować wcześniej.' },
      ],
    },
    {
      type: 'reservation',
      id: 'rezerwacja',
      nav: 'Rezerwacja',
      title: 'Zarezerwuj stolik',
      subtitle: 'Potwierdzimy rezerwację SMS-em lub telefonicznie. Dla grup powyżej 8 osób zadzwoń do nas.',
      slots: ['12:00', '13:00', '14:00', '17:00', '18:00', '18:30', '19:00', '19:30', '20:00', '21:00'],
      maxGuests: 8,
    },
    {
      type: 'contact',
      id: 'kontakt',
      nav: 'Kontakt',
      title: 'Jak do nas trafić',
      map: true,
      form: false,
    },
  ]
}
