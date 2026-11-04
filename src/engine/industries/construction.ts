import { MEDIA } from '../media'
import type { BusinessInfo, PlacedSection } from '../types'

const M = MEDIA.construction

/**
 * Construction / renovation template.
 * Goal of the page: get a qualified lead (call or quote request).
 * Order follows the buyer's questions: Can they do my job? → Have they done it
 * before? → How much? → Can I trust them? → How do I start?
 */
export function constructionDefaults(b: BusinessInfo): PlacedSection[] {
  return [
    {
      type: 'hero',
      variant: 'image',
      eyebrow: b.serviceArea ?? `${b.city} i okolice`,
      title: 'Budujemy *na czas.* Bez dopłat.',
      image: M.siteAerial,
      subtitle:
        'Domy jednorodzinne, remonty generalne i wykończenia pod klucz. Stała cena w umowie, jeden kierownik budowy, raporty ze zdjęciami co tydzień.',
      primaryCta: { label: 'Bezpłatna wycena', href: '#wycena' },
      secondaryCta: { label: 'Zobacz realizacje', href: '#realizacje' },
      highlights: ['Gwarancja do 5 lat', 'Umowa z harmonogramem', 'Ubezpieczenie OC'],
    },
    {
      type: 'marquee',
      items: ['Stała cena w umowie', 'Gwarancja do 5 lat', 'Własne ekipy', 'Raporty co tydzień', 'Ubezpieczenie OC 2 mln zł', 'Płatność etapami'],
    },
    {
      type: 'stats',
      items: [
        { value: '15+', label: 'lat na rynku' },
        { value: '240', label: 'zakończonych budów' },
        { value: '98%', label: 'oddanych w terminie' },
        { value: '5 lat', label: 'gwarancji' },
      ],
    },
    {
      type: 'services',
      id: 'uslugi',
      nav: 'Usługi',
      title: 'Od fundamentów *po klucze.*',
      subtitle: 'Od fundamentów po malowanie ścian — jedna firma, jedna odpowiedzialność.',
      items: [
        { icon: 'home', image: M.houseEvening, title: 'Domy pod klucz', description: 'Stan surowy, deweloperski lub pod klucz. Własne ekipy, sprawdzone hurtownie.', priceFrom: 'od 4 200 zł/m²' },
        { icon: 'hammer', image: M.demolition, title: 'Remonty generalne', description: 'Mieszkania i domy: instalacje, tynki, posadzki, łazienki. Bez podwykonawców z przypadku.', priceFrom: 'od 1 400 zł/m²' },
        { icon: 'roof', image: M.houseFacade, title: 'Dachy i elewacje', description: 'Więźby, pokrycia, docieplenia i elewacje. Także z dofinansowaniem „Czyste Powietrze”.' },
        { icon: 'drop', image: M.bathroom, title: 'Łazienki', description: 'Kompleksowo w 10–14 dni roboczych: hydraulika, płytki, biały montaż.', priceFrom: 'od 25 000 zł' },
        { icon: 'bolt', image: M.electrician, title: 'Instalacje', description: 'Elektryka, hydraulika, ogrzewanie podłogowe, pompy ciepła — z odbiorami.' },
        { icon: 'ruler', image: M.plans, title: 'Projekt i nadzór', description: 'Adaptacja projektu, kosztorys, kierownik budowy i formalności w urzędzie.' },
      ],
    },
    {
      type: 'projects',
      id: 'realizacje',
      nav: 'Realizacje',
      title: 'Realizacje, *które mówią same za siebie.*',
      subtitle: 'Każdy projekt ma zdjęcia, zakres i czas realizacji — bez ściemy.',
      items: [
        { title: 'Dom jednorodzinny z garażem', category: 'Domy', location: b.city, year: '2025', facts: ['164 m²', '9 miesięcy', 'pod klucz'], image: M.houseModern },
        { title: 'Remont kamienicy — mieszkanie 3-pok.', category: 'Remonty', location: b.city, year: '2025', facts: ['78 m²', '7 tygodni'], image: M.livingClassic, before: M.demolition, description: 'Nowe instalacje, wyrównane ściany, odnowione stolarka i podłogi — mieszkanie gotowe w 7 tygodni.' },
        { title: 'Łazienka z prysznicem walk-in', category: 'Łazienki', location: b.city, year: '2024', facts: ['9 m²', '12 dni'], image: M.bathroom },
        { title: 'Docieplenie i nowa elewacja', category: 'Elewacje', location: b.city, year: '2024', facts: ['220 m² elewacji', '5 tygodni'], image: M.houseFacade },
        { title: 'Dom w technologii szkieletowej', category: 'Domy', location: b.city, year: '2024', facts: ['120 m²', '6 miesięcy'], image: M.timberInterior },
        { title: 'Wykończenie biura', category: 'Remonty', location: b.city, year: '2023', facts: ['310 m²', '6 tygodni'], image: M.glassInterior },
      ],
    },
    {
      type: 'quoteCalculator',
      id: 'wycena',
      nav: 'Wycena',
      title: 'Ile to kosztuje? *Sprawdź w 30 sekund.*',
      subtitle: 'Wybierz rodzaj prac i metraż — pokażemy orientacyjne widełki. Dokładny kosztorys przygotujemy bezpłatnie.',
      currency: 'PLN',
      workTypes: [
        { id: 'house-shell', label: 'Dom — stan surowy zamknięty', pricePerUnit: [2600, 3300], unit: 'm²', image: M.rebar, duration: '4–6 miesięcy' },
        { id: 'house-turnkey', label: 'Dom — pod klucz', pricePerUnit: [4200, 5600], unit: 'm²', image: M.houseEvening, duration: '8–12 miesięcy' },
        { id: 'renovation', label: 'Remont generalny mieszkania', pricePerUnit: [1400, 2200], unit: 'm²', image: M.demolition, duration: '6–10 tygodni' },
        { id: 'finishing', label: 'Wykończenie od stanu deweloperskiego', pricePerUnit: [900, 1500], unit: 'm²', image: M.livingRoom2, duration: '4–8 tygodni' },
        { id: 'bathroom', label: 'Łazienka kompleksowo', pricePerUnit: [3200, 4500], unit: 'm²', image: M.bathroom2, duration: '10–14 dni roboczych' },
        { id: 'facade', label: 'Docieplenie + elewacja', pricePerUnit: [260, 380], unit: 'm²', image: M.houseFacade, duration: '3–6 tygodni' },
      ],
      standards: [
        { id: 'basic', label: 'Ekonomiczny', multiplier: 0.85 },
        { id: 'standard', label: 'Standard', multiplier: 1 },
        { id: 'premium', label: 'Premium', multiplier: 1.35 },
      ],
      disclaimer: 'Kwoty netto, orientacyjne — zawierają robociznę i materiały. Ostateczna cena zależy od projektu i stanu obiektu.',
    },
    {
      type: 'process',
      id: 'jak-pracujemy',
      title: 'Pięć kroków. *Zero chaosu.*',
      steps: [
        { title: 'Rozmowa i oględziny', description: 'Bezpłatnie przyjeżdżamy na miejsce, mierzymy i słuchamy, czego potrzebujesz.' },
        { title: 'Kosztorys i harmonogram', description: 'W ciągu 5 dni roboczych dostajesz szczegółowy kosztorys i plan prac.' },
        { title: 'Umowa ze stałą ceną', description: 'Cena, terminy i kary umowne na papierze. Zaliczki tylko za wykonane etapy.' },
        { title: 'Realizacja z raportami', description: 'Kierownik budowy wysyła cotygodniowe zdjęcia i postęp prac.' },
        { title: 'Odbiór i gwarancja', description: 'Protokół odbioru, dokumentacja powykonawcza i gwarancja do 5 lat.' },
      ],
    },
    {
      type: 'testimonials',
      id: 'opinie',
      nav: 'Opinie',
      title: 'Klienci *polecają nas dalej.*',
      items: [
        { author: 'Anna i Tomasz', context: 'Dom 150 m²', rating: 5, text: 'Dom oddany 2 tygodnie przed terminem. Co piątek dostawaliśmy zdjęcia z budowy, więc nie musieliśmy jeździć co chwilę.' },
        { author: 'Pan Krzysztof', context: 'Remont mieszkania', rating: 5, text: 'Kosztorys zgodził się z fakturą końcową co do złotówki. Ekipa czysta i kulturalna — polecam.' },
        { author: 'Marta W.', context: 'Łazienka', rating: 5, text: 'Łazienka zrobiona w 11 dni, fugi idealne. Pan kierownik zawsze odbierał telefon.' },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      title: 'Zanim *zadzwonisz.*',
      items: [
        { question: 'Jak szybko możecie zacząć?', answer: 'Zwykle w ciągu 3–6 tygodni od podpisania umowy. Małe remonty i łazienki często szybciej.' },
        { question: 'Czy cena w umowie może się zmienić?', answer: 'Nie, jeśli nie zmienia się zakres. Każda zmiana jest wyceniana osobno i wymaga Twojej akceptacji przed wykonaniem.' },
        { question: 'Czy pomagacie z formalnościami i dofinansowaniem?', answer: 'Tak — pozwolenia, zgłoszenia, kierownik budowy oraz wnioski do programów typu „Czyste Powietrze”.' },
        { question: 'Jak wyglądają płatności?', answer: 'Płacisz etapami, po odbiorze każdego etapu. Bez dużych zaliczek na start.' },
      ],
    },
    {
      type: 'contact',
      id: 'kontakt',
      nav: 'Kontakt',
      title: 'Porozmawiajmy *o Twojej budowie.*',
      subtitle: 'Zadzwoń lub zostaw wiadomość — oddzwonimy w ciągu jednego dnia roboczego.',
      form: true,
      map: true,
    },
  ]
}
