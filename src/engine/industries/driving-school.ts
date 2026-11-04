import { MEDIA } from '../media'
import type { BusinessInfo, PlacedSection } from '../types'

const M = MEDIA['driving-school']

/** Upcoming start dates computed at build time, so demos never show past dates. */
function nextDates(offsets: number[]): string[] {
  const now = new Date()
  return offsets.map((days) => {
    const d = new Date(now)
    d.setDate(d.getDate() + days)
    // Courses start on Mondays (theory) — snap forward to the next Monday
    d.setDate(d.getDate() + ((8 - d.getDay()) % 7))
    return d.toISOString().slice(0, 10)
  })
}

/**
 * Driving school (OSK) template.
 * Students (17–19 y.o., often with parents) compare three things:
 * pass rate → total price → when can I start. Everything else is trust.
 * State exam fees below: Mazowsze 2026 — update per voivodeship (WORD).
 */
export function drivingSchoolDefaults(b: BusinessInfo): PlacedSection[] {
  const [d1, d2, d3, d4] = nextDates([3, 17, 31, 45])
  return [
    {
      type: 'hero',
      variant: 'split',
      eyebrow: `Szkoła jazdy · ${b.city}`,
      title: 'Prawo jazdy *za pierwszym razem.*',
      subtitle: 'Kat. B, A i C. Jazdy po trasach egzaminacyjnych WORD, plac manewrowy na miejscu i instruktorzy, którzy nie krzyczą.',
      image: M.driverSunset,
      primaryCta: { label: 'Zapisz się na kurs', href: '#kursy' },
      secondaryCta: { label: 'Policz koszt', href: '#koszt' },
      highlights: ['Kurs od najbliższego poniedziałku', 'Raty 0% bez BIK', 'Jazdy 7 dni w tygodniu'],
    },
    {
      type: 'marquee',
      items: ['Trasy egzaminacyjne WORD', 'Plac manewrowy na miejscu', 'Jazdy 6:00–22:00', 'Odbiór spod szkoły lub domu', 'Teoria online + stacjonarnie', 'Egzamin wewnętrzny w cenie'],
    },
    {
      type: 'passRate',
      id: 'zdawalnosc',
      nav: 'Zdawalność',
      title: 'Liczby *mówią same za siebie.*',
      subtitle: 'Zdawalność egzaminów państwowych naszych kursantów na tle średniej. Dane z oficjalnych raportów — nie z naszego marketingu.',
      period: 'Kat. B · ostatnie 4 kwartały',
      rows: [
        { label: 'Egzamin teoretyczny', school: 81, region: 56 },
        { label: 'Egzamin praktyczny', school: 52, region: 38 },
      ],
      source: 'Dane demonstracyjne. Średnia krajowa teorii kat. B w 2025 r.: 56%. W demie dla konkretnej szkoły — raport zdawalności z podziałem na OSK publikowany przez WORD / starostwo (BIP).',
    },
    {
      type: 'courses',
      id: 'kursy',
      nav: 'Kursy',
      title: 'Wybierz kurs *i termin startu.*',
      subtitle: 'Kliknij datę, żeby zapisać się od razu. Płatność dopiero przy pierwszych zajęciach.',
      currency: 'PLN',
      extraHourPrice: 140,
      items: [
        {
          id: 'b',
          code: 'B',
          name: 'Samochód osobowy',
          description: 'Najczęściej wybierany kurs — manualna skrzynia biegów.',
          price: 3590,
          includes: ['30 h teorii (stacjonarnie lub online)', '30 h jazd', 'Egzamin wewnętrzny', 'Platforma z testami egzaminacyjnymi'],
          starts: [{ date: d1, seatsLeft: 3, mode: 'stacjonarnie' }, { date: d2, seatsLeft: 9, mode: 'online' }, { date: d3, seatsLeft: 12 }],
          badge: 'Najpopularniejszy',
          installments: true,
        },
        {
          id: 'b-auto',
          code: 'B',
          name: 'Automat',
          description: 'Ta sama kategoria B, auto z automatyczną skrzynią.',
          price: 3890,
          includes: ['30 h teorii', '30 h jazd automatem', 'Egzamin wewnętrzny', 'Testy online'],
          starts: [{ date: d2, seatsLeft: 4 }, { date: d4, seatsLeft: 8 }],
          installments: true,
        },
        {
          id: 'b-express',
          code: 'B',
          name: 'Ekspres 4 tygodnie',
          description: 'Intensywnie: jazdy codziennie, teoria w weekend. Dla tych, którzy chcą szybko.',
          price: 4290,
          includes: ['Teoria w 2 weekendy', '30 h jazd w 4 tygodnie', 'Pierwszeństwo terminów', 'Egzamin wewnętrzny'],
          starts: [{ date: d1, seatsLeft: 2 }, { date: d3, seatsLeft: 6 }],
        },
        {
          id: 'a',
          code: 'A',
          name: 'Motocykl',
          description: 'Kat. A — od 24 lat (lub po 2 latach z A2).',
          price: 3290,
          includes: ['30 h teorii', '20 h jazd', 'Strój ochronny do dyspozycji', 'Plac i ruch miejski'],
          starts: [{ date: d2, seatsLeft: 5 }],
          installments: true,
        },
        {
          id: 'a2',
          code: 'A2',
          name: 'Motocykl do 35 kW',
          description: 'Od 18 lat. Najlepszy start na dwóch kołach.',
          price: 2990,
          includes: ['30 h teorii', '20 h jazd', 'Strój ochronny do dyspozycji'],
          starts: [{ date: d2, seatsLeft: 6 }, { date: d4 }],
        },
        {
          id: 'c',
          code: 'C',
          name: 'Ciężarówka',
          description: 'Dla firm i przyszłych kierowców zawodowych. Faktura VAT.',
          price: 4990,
          includes: ['20 h teorii', '30 h jazd', 'Pomoc w kwalifikacji wstępnej'],
          starts: [{ date: d3, seatsLeft: 4 }],
          installments: true,
        },
      ],
    },
    {
      type: 'licenceCost',
      id: 'koszt',
      nav: 'Koszt',
      title: 'Ile *naprawdę* kosztuje prawo jazdy?',
      subtitle: 'Kurs to nie wszystko. Policz razem z badaniem lekarskim, opłatami w WORD i wydaniem dokumentu — bez niespodzianek.',
      currency: 'PLN',
      defaultCourse: 'b',
      fees: [
        { label: 'Badanie lekarskie', amount: 200 },
        { label: 'Zdjęcie do dokumentu', amount: 40 },
        { label: 'Egzamin teoretyczny (WORD)', amount: 55 },
        { label: 'Egzamin praktyczny (WORD)', amount: 222, perAttempt: true },
        { label: 'Wydanie prawa jazdy', amount: 100.5 },
      ],
      note: 'Opłaty WORD wg stawek dla woj. mazowieckiego (2026). Badanie lekarskie — maksymalna stawka urzędowa, zdjęcie — orientacyjnie.',
    },
    {
      type: 'process',
      id: 'jak-zaczac',
      title: 'Od zapisu *do prawa jazdy.*',
      steps: [
        { title: 'Badanie i zdjęcie', description: 'Badanie u lekarza uprawnionego — podpowiemy, gdzie najbliżej.' },
        { title: 'Profil PKK', description: 'Składasz wniosek w wydziale komunikacji. Pomożemy wypełnić dokumenty.' },
        { title: 'Teoria', description: '30 godzin stacjonarnie lub online, plus platforma z oficjalnymi pytaniami.' },
        { title: 'Jazdy', description: 'Plac, miasto i trasy egzaminacyjne WORD. Terminy ustalasz w aplikacji.' },
        { title: 'Egzamin w WORD', description: 'Po egzaminie wewnętrznym zapisujemy Cię na egzamin państwowy.' },
      ],
    },
    {
      type: 'team',
      id: 'instruktorzy',
      nav: 'Instruktorzy',
      title: 'Instruktorzy, *którzy nie krzyczą.*',
      subtitle: 'Spokojni, cierpliwi i z doświadczeniem. Instruktora możesz zmienić w każdej chwili — bez pytań.',
      members: [
        { name: 'Anna', role: 'Instruktorka kat. B', photo: M.instructorAnna, facts: ['14 lat', 'B'], bio: 'Specjalistka od kursantów z tremą. Zaczyna od spokojnych osiedli.' },
        { name: 'Marek', role: 'Instruktor kat. B, A, A2', photo: M.instructorMarek, facts: ['9 lat', 'B', 'A'], bio: 'Motocyklista z pasji. Uczy jazdy defensywnej.' },
        { name: 'Jan', role: 'Kierownik szkolenia, kat. B, C', photo: M.instructorJan, facts: ['22 lata', 'B', 'C'], bio: 'Były egzaminator. Wie, na co patrzy się w WORD.' },
        { name: 'Piotr', role: 'Instruktor kat. B (automat)', photo: M.instructorPiotr, facts: ['6 lat', 'B'], bio: 'Jazdy wieczorne i weekendowe, także automatem.' },
      ],
      fleet: [
        { name: 'Hatchback — manual', detail: 'Taki sam model jak w WORD. 6 aut, nie starsze niż 3 lata.', image: M.hatchbackBlue },
        { name: 'Automat', detail: 'Dla kursu B z automatyczną skrzynią biegów.', image: M.automatic },
        { name: 'Motocykle A / A2', detail: 'Pełne wyposażenie ochronne do dyspozycji kursanta.', image: M.motorcycle },
      ],
    },
    {
      type: 'testimonials',
      id: 'opinie',
      nav: 'Opinie',
      title: 'Zdali. *Polecają.*',
      items: [
        { author: 'Zuzia, 18 lat', context: 'Kat. B, zdana za 1. razem', rating: 5, text: 'Bałam się, że będzie jak w opowieściach znajomych — a pani Anna była najspokojniejszą osobą na świecie. Zdałam za pierwszym razem!' },
        { author: 'Kuba', context: 'Kurs ekspres', rating: 5, text: 'Cały kurs w miesiąc, jazdy po trasach z egzaminu. Na egzaminie znałem każde skrzyżowanie.' },
        { author: 'Pani Ewa (mama kursanta)', context: 'Kat. B', rating: 5, text: 'Przejrzyste ceny, raty bez formalności i stały kontakt. Syn zdał teorię i praktykę za pierwszym podejściem.' },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      title: 'Pytania *przed zapisem.*',
      items: [
        { question: 'Od jakiego wieku mogę zacząć kurs kat. B?', answer: 'Kurs możesz rozpocząć na 3 miesiące przed 18. urodzinami. Egzamin państwowy zdajesz po ukończeniu 18 lat.' },
        { question: 'Czy muszę mieć PKK przed zapisem?', answer: 'Nie. Możesz zapisać się wcześniej — numer PKK będzie potrzebny przed pierwszymi jazdami. Pomożemy go uzyskać.' },
        { question: 'Ile trwa cały kurs?', answer: 'Standardowo 2–3 miesiące, w trybie ekspres ok. 4 tygodnie. Tempo jazd ustalasz sam.' },
        { question: 'Czy mogę płacić w ratach?', answer: 'Tak — 3 raty 0% bez sprawdzania w BIK. Pierwsza rata przy rozpoczęciu kursu.' },
        { question: 'Co jeśli nie zdam za pierwszym razem?', answer: 'Dobierzesz dodatkowe godziny po trasach egzaminacyjnych w cenie 140 zł/h, a my pomożemy szybko zapisać się na kolejny termin.' },
      ],
    },
    {
      type: 'contact',
      id: 'kontakt',
      nav: 'Kontakt',
      title: 'Wpadnij *albo zadzwoń.*',
      subtitle: 'Biuro czynne codziennie. Zapisy także telefonicznie i przez formularz.',
      form: true,
      map: true,
    },
  ]
}
