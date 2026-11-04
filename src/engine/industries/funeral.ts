import { MEDIA } from '../media'
import type { BusinessInfo, PlacedSection } from '../types'

const M = MEDIA.funeral

/** Ceremony dates relative to build time, so sample obituaries never look stale. */
function dayFromNow(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })
}

/**
 * Funeral home template.
 * The visitor is a family member in shock, often at night, on a phone.
 * Priorities: (1) 24h phone always one tap away, (2) calm guidance "what now",
 * (3) honest costs incl. the ZUS allowance, (4) obituaries & ceremony times —
 * the most visited page on Polish funeral home sites, (5) trust.
 * No marquee, no counters, no hard sell. Tone: quiet, plain, respectful.
 */
export function funeralDefaults(b: BusinessInfo): PlacedSection[] {
  const tel = b.phone ? `tel:${b.phone.replace(/[^+\d]/g, '')}` : '#kontakt'
  return [
    {
      type: 'hero',
      variant: 'centered',
      eyebrow: `Zakład pogrzebowy · ${b.city}`,
      title: 'Jesteśmy przy Was *w najtrudniejszym momencie.*',
      subtitle: 'Zajmiemy się wszystkim — od formalności po ceremonię. Spokojnie, z szacunkiem i bez pośpiechu.',
      image: M.candlesDark,
      primaryCta: { label: `Zadzwoń: ${b.phone ?? ''}`.trim(), href: tel },
      secondaryCta: { label: 'Co zrobić teraz?', href: '#pierwsze-kroki' },
      highlights: ['Całodobowo, 7 dni w tygodniu', 'Rozliczenie zasiłku z ZUS', 'Pogrzeby tradycyjne i kremacyjne'],
    },
    {
      type: 'firstSteps',
      id: 'pierwsze-kroki',
      nav: 'Pierwsze kroki',
      title: 'Co zrobić, *gdy odchodzi bliska osoba.*',
      subtitle: 'Krótko i po kolei. Nie musisz pamiętać wszystkiego — przeprowadzimy Cię przez każdy krok.',
      reassurance: 'Nie musisz niczego wiedzieć ani przygotowywać. Wystarczy telefon — resztą zajmiemy się razem.',
      scenarios: [
        {
          id: 'dom',
          label: 'Zgon w domu',
          steps: [
            { title: 'Wezwij lekarza', description: 'Lekarz rodzinny, nocna i świąteczna opieka lub pogotowie stwierdzi zgon i wystawi kartę zgonu.' },
            { title: 'Zadzwoń do nas — o każdej porze', description: 'Przyjedziemy, przewieziemy zmarłego z godnością i umówimy spokojną rozmowę o ceremonii.' },
            { title: 'Przygotuj dokumenty', description: 'Karta zgonu, dowód osobisty zmarłego i ubranie. Jeśli czegoś brakuje — podpowiemy, co dalej.' },
            { title: 'Zgłoszenie zgonu w USC', description: 'Zgon zgłasza się w urzędzie stanu cywilnego w ciągu 3 dni od wystawienia karty zgonu. Pomożemy w tej formalności.' },
            { title: 'Ceremonia i zasiłek', description: 'Ustalimy termin, miejsce i oprawę. Zasiłek pogrzebowy możemy rozliczyć bezpośrednio z ZUS.' },
          ],
        },
        {
          id: 'szpital',
          label: 'Zgon w szpitalu lub hospicjum',
          steps: [
            { title: 'Placówka wystawia kartę zgonu', description: 'Szpital lub hospicjum stwierdza zgon i przekazuje rodzinie kartę zgonu.' },
            { title: 'Wybór zakładu należy do Was', description: 'Nikt nie może narzucić zakładu pogrzebowego. Zadzwoń — odbierzemy zmarłego z placówki.' },
            { title: 'Dokumenty i ubranie', description: 'Dowód osobisty zmarłego i ubranie możesz przekazać nam podczas spotkania.' },
            { title: 'Zgłoszenie zgonu w USC', description: 'W ciągu 3 dni od wystawienia karty zgonu. Pomożemy w tej formalności.' },
            { title: 'Ceremonia i zasiłek', description: 'Wspólnie ustalimy szczegóły. Zasiłek ZUS rozliczymy bez wykładania pieniędzy z góry.' },
          ],
        },
      ],
    },
    {
      type: 'services',
      id: 'uslugi',
      nav: 'Usługi',
      title: 'Zajmiemy się *wszystkim.*',
      subtitle: 'Kompleksowa organizacja pogrzebu — tak, by rodzina mogła skupić się na pożegnaniu.',
      items: [
        { title: 'Organizacja pogrzebu', description: 'Ceremonia tradycyjna lub kremacyjna — terminy, cmentarz, kościół lub sala pożegnań.', image: M.rose },
        { title: 'Kremacja', description: 'Pogrzeb z urną, także z ceremonią pożegnania przed kremacją.', image: M.candleSingle },
        { title: 'Transport zmarłych', description: 'Całodobowo, z domu, szpitala lub hospicjum. Także przewozy na większe odległości.', image: M.forestMist },
        { title: 'Formalności i zasiłek ZUS', description: 'Pomoc w USC, dokumenty do cmentarza i parafii, bezgotówkowe rozliczenie zasiłku.', image: M.candlesPair },
        { title: 'Oprawa ceremonii', description: 'Kwiaty, muzyka, nekrologi i klepsydry — ceremonia wyznaniowa lub świecka.', image: M.florist },
        { title: 'Trumny, urny i akcesoria', description: 'Szeroki wybór w różnych przedziałach cenowych — pokażemy bez presji.', image: M.chapelLight },
      ],
    },
    {
      type: 'funeralCost',
      id: 'koszty',
      nav: 'Koszty',
      title: 'Ile kosztuje pogrzeb — *i ile pokryje zasiłek.*',
      subtitle: 'Uczciwie i z góry. Wybierz rodzaj ceremonii i dodatki — od razu zobaczysz, ile pokryje zasiłek pogrzebowy z ZUS.',
      currency: 'PLN',
      types: [
        { id: 'tradycyjny', label: 'Pogrzeb tradycyjny', description: 'Ceremonia z trumną, pochówek w grobie.', base: 6900, includes: ['Trumna i wyposażenie', 'Przygotowanie i ubranie zmarłego', 'Przechowanie w chłodni', 'Karawan i przewóz', 'Obsługa ceremonii', 'Formalności'] },
        { id: 'kremacyjny', label: 'Pogrzeb kremacyjny', description: 'Pożegnanie z trumną lub urną, pochówek urny.', base: 5600, includes: ['Kremacja', 'Urna', 'Trumna do kremacji', 'Przygotowanie zmarłego', 'Obsługa ceremonii', 'Formalności'] },
        { id: 'kremacja', label: 'Kremacja bez ceremonii', description: 'Kremacja i przekazanie urny rodzinie.', base: 3400, includes: ['Kremacja', 'Urna podstawowa', 'Przewóz', 'Formalności'] },
      ],
      extras: [
        { id: 'muzyka', label: 'Oprawa muzyczna', price: 600 },
        { id: 'wieniec', label: 'Wieniec lub wiązanka', price: 350 },
        { id: 'nekrolog', label: 'Nekrolog w prasie', price: 450 },
        { id: 'klepsydry', label: 'Klepsydry (20 szt.)', price: 150 },
        { id: 'tablica', label: 'Tabliczka i krzyż', price: 250 },
        { id: 'ksiega', label: 'Księga kondolencyjna', price: 120 },
      ],
      allowance: {
        label: 'Zasiłek pogrzebowy ZUS',
        amount: 7000,
        note: 'Od 1 stycznia 2026 r. zasiłek pogrzebowy wynosi 7000 zł. Na podstawie upoważnienia ZUS może wypłacić go bezpośrednio zakładowi — bez wykładania pieniędzy z góry.',
      },
      note: 'Ceny przykładowe. W wersji dla konkretnego zakładu podstawiamy jego cennik.',
    },
    {
      type: 'obituaries',
      id: 'nekrologi',
      nav: 'Nekrologi',
      title: 'Nekrologi *i terminy pogrzebów.*',
      subtitle: 'Informacje o najbliższych ceremoniach. Możesz zapalić wirtualny znicz.',
      items: [
        { name: 'Ś.p. Halina Nowicka', age: 'lat 86', died: dayFromNow(-3), ceremony: { date: dayFromNow(2), time: '11:00', place: `Cmentarz Komunalny, ${b.city}` } },
        { name: 'Ś.p. Stanisław Wiśniewski', age: 'lat 79', died: dayFromNow(-4), ceremony: { date: dayFromNow(3), time: '13:30', place: 'Kaplica cmentarna' }, note: 'Rodzina prosi o nieskładanie kwiatów.' },
        { name: 'Ś.p. Maria Kaczmarek', age: 'lat 91', died: dayFromNow(-2), ceremony: { date: dayFromNow(5), time: '10:00', place: `Kościół parafialny, ${b.city}` } },
      ],
      note: 'Przykładowe wpisy — dane fikcyjne.',
    },
    {
      type: 'about',
      id: 'o-nas',
      nav: 'O nas',
      eyebrow: 'O nas',
      title: 'Od pokoleń *pomagamy rodzinom.*',
      body: [
        'Wiemy, że w takiej chwili najważniejszy jest spokój. Dlatego mówimy prostym językiem, pokazujemy ceny z góry i dajemy czas na decyzje.',
        'Jesteśmy dostępni o każdej porze — także w nocy, w weekendy i święta.',
      ],
      image: M.forestPath,
      image2: M.sprout,
      bullets: ['Całodobowo', 'Ceny z góry', 'Bez presji'],
    },
    {
      type: 'faq',
      id: 'faq',
      title: 'Najczęstsze *pytania.*',
      items: [
        { question: 'Ile wynosi zasiłek pogrzebowy?', answer: 'Od 1 stycznia 2026 r. zasiłek pogrzebowy z ZUS wynosi 7000 zł. Wniosek (Z-12) składa się w ciągu 12 miesięcy od dnia zgonu. Możemy rozliczyć zasiłek bezpośrednio z ZUS.' },
        { question: 'Czy szpital może wskazać zakład pogrzebowy?', answer: 'Nie. Wybór zakładu pogrzebowego należy wyłącznie do rodziny. Wystarczy zadzwonić — odbierzemy zmarłego z placówki.' },
        { question: 'Jakie dokumenty są potrzebne?', answer: 'Karta zgonu i dowód osobisty zmarłego. Po zgłoszeniu zgonu w USC otrzymasz odpis aktu zgonu — warto poprosić o kilka egzemplarzy (bank, ZUS, ubezpieczyciel).' },
        { question: 'Ile czasu zajmuje przygotowanie pogrzebu?', answer: 'Zwykle kilka dni — termin zależy od cmentarza, parafii lub krematorium. Ustalimy go z Wami podczas pierwszej rozmowy.' },
      ],
    },
    {
      type: 'contact',
      id: 'kontakt',
      nav: 'Kontakt',
      title: 'Jesteśmy *do Waszej dyspozycji.*',
      subtitle: 'Zadzwoń o każdej porze albo zostaw numer — oddzwonimy.',
      form: true,
      map: true,
    },
  ]
}
