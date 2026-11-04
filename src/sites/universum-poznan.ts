import { defineSite } from '@/engine/defineSite'
import { funeralDefaults } from '@/engine/industries/funeral'
import { MEDIA } from '@/engine/media'
import type { BusinessInfo, PlacedSection } from '@/engine/types'

const M = MEDIA.funeral

/**
 * PROSPECT DEMO — Universum Spółdzielnia Pracy, Poznań (real company).
 *
 * Only facts found in public sources are used (company site / directories,
 * Nov 2026): founded 1960; office ul. Woźna 15a; phone 61 853 19 43 (7–20)
 * and 506 364 455 (night); own crematorium in Fort 3A at Miłostowo cemetery
 * (fort built 1887–1890, crematorium opened 1993); managed the municipal
 * cemeteries Miłostowo and Junikowo from 1975 for 42 years; Junikowo funeral home.
 * Sources: universum-poznan.com.pl (/krematorium, /historia-fortu-3a,
 * /o-universum-spoldzielni-pracy), funer.com.pl, uslugipogrzebowe.com.pl.
 *
 * NOT invented: no reviews, no rating, no statistics. Prices and obituaries
 * are clearly labelled as samples. Verify phone numbers before sending.
 * Photos are stock (not the company's premises).
 */
const business: BusinessInfo = {
  name: 'Universum',
  tagline: 'Usługi pogrzebowe i krematorium w Poznaniu — od 1960 roku',
  phone: '61 853 19 43',
  street: 'ul. Woźna 15a',
  city: 'Poznań',
  serviceArea: 'W godzinach 7:00–20:00. W nocy: 506 364 455',
  mapQuery: 'Universum, Woźna 15a, Poznań',
  openingHours: [
    { days: 'Telefon 7:00–20:00', hours: '61 853 19 43' },
    { days: 'Telefon w nocy', hours: '506 364 455' },
  ],
}

const base = funeralDefaults(business)
const pick = <T extends PlacedSection['type']>(type: T) => base.find((s) => s.type === type) as Extract<PlacedSection, { type: T }>

const sections: PlacedSection[] = [
  {
    ...pick('hero'),
    eyebrow: 'Universum · Poznań · od 1960',
    title: 'Godne pożegnanie, *spokojnie i bez pośpiechu.*',
    subtitle: 'Od ponad sześciu dekad pomagamy poznańskim rodzinom. Organizujemy pogrzeby tradycyjne i kremacyjne — we własnym krematorium w zabytkowym Forcie 3A.',
    highlights: ['Telefon całodobowy', 'Własne krematorium', 'Rozliczenie zasiłku z ZUS'],
  },
  {
    ...pick('firstSteps'),
    reassurance: 'W nocy zadzwoń pod 506 364 455. Nie musisz niczego wiedzieć ani przygotowywać — resztą zajmiemy się razem.',
  },
  {
    ...pick('services'),
    subtitle: 'Kompleksowa organizacja pogrzebu w Poznaniu i okolicach.',
    items: [
      { title: 'Pogrzeby tradycyjne', description: 'Organizacja ceremonii i pochówku — terminy, cmentarz, oprawa.', image: M.rose },
      { title: 'Kremacja we własnym krematorium', description: 'Krematorium w Forcie 3A na terenie cmentarza Miłostowo — bez przewozu do odległych miast.', image: M.candleSingle },
      { title: 'Transport zmarłych', description: 'Całodobowo, z domu, szpitala lub hospicjum — własna flota.', image: M.forestMist },
      { title: 'Przechowywanie zmarłych', description: 'Godne warunki do czasu ceremonii.', image: M.chapelLight },
      { title: 'Urny i akcesoria', description: 'Wybór urn i akcesoriów pogrzebowych.', image: M.candlesPair },
    ],
  },
  { ...pick('funeralCost'), note: 'Ceny przykładowe — w wersji docelowej podstawiamy cennik Universum.' },
  {
    ...pick('obituaries'),
    items: pick('obituaries').items.map((o, i) => ({
      ...o,
      ceremony: { ...o.ceremony, place: ['Cmentarz Junikowo', 'Cmentarz Miłostowo', 'Cmentarz Junikowo'][i] ?? o.ceremony.place },
    })),
    note: 'Przykładowe wpisy — dane fikcyjne. W wersji docelowej nekrologi dodaje biuro zakładu w prostym panelu.',
  },
  {
    ...pick('about'),
    eyebrow: 'Universum Spółdzielnia Pracy',
    title: 'Pomagamy poznańskim rodzinom *od 1960 roku.*',
    body: [
      'Universum to poznańska spółdzielnia pracy, która od ponad sześciu dekad organizuje pogrzeby w Poznaniu i okolicach.',
      'Od 1993 roku prowadzimy własne krematorium w zabytkowym Forcie 3A na terenie cmentarza Miłostowo — forcie wzniesionym w latach 1887–1890 jako część pierścienia Twierdzy Poznań.',
    ],
    image: M.forestLight,
    image2: M.chapelGlass,
    bullets: ['Od 1960 roku', 'Krematorium w Forcie 3A', 'Telefon całodobowy'],
  },
  {
    type: 'events',
    id: 'historia',
    nav: 'Historia',
    title: 'Ponad *sześć dekad* w Poznaniu',
    items: [
      { date: '1960', title: 'Początek działalności', description: 'W Poznaniu rozpoczyna działalność Spółdzielnia Pracy Universum.' },
      { date: '1975', title: 'Opieka nad cmentarzami komunalnymi', description: 'Przez 42 lata Universum zarządza poznańskimi cmentarzami komunalnymi na Miłostowie i Junikowie.' },
      { date: '1993', title: 'Krematorium w Forcie 3A', description: 'Otwarcie krematorium w zabytkowym forcie z lat 1887–1890 na terenie cmentarza Miłostowo.' },
      { date: 'Dziś', title: 'Biuro, dom pogrzebowy i krematorium', description: 'Biuro przy ul. Woźnej na Starym Mieście, dom pogrzebowy na Junikowie i własne krematorium.' },
    ],
  },
  pick('faq'),
  { ...pick('contact'), title: 'Jesteśmy *do Państwa dyspozycji.*' },
]

export default defineSite({
  slug: 'universum-poznan',
  industry: 'funeral',
  locale: 'pl',
  business,
  theme: { preset: 'serene' },
  sections,
  demo: {
    isDemo: true,
    preparedBy: 'AI Website Factory',
    note: 'Demo dla prawdziwej firmy. Dane z publicznych źródeł — zweryfikować numery telefonów przed wysłaniem.',
  },
})
