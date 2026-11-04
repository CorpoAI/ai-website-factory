# Silnik stron — jak to działa

Jedna aplikacja Next.js obsługuje **wiele stron** (klientów i dem dla prospektów).
Każda strona to **jeden plik konfiguracyjny** w `src/sites/<slug>.ts`.

```
src/
  engine/
    types.ts            ← kontrakt: SiteConfig, wszystkie typy sekcji
    defineSite.ts       ← scala szablon branży + dane firmy + nadpisania
    industries/         ← szablony branżowe (domyślne sekcje i treści)
      construction.ts
      restaurant.ts
    theme.ts            ← motywy (CSS variables) + nadpisanie koloru marki
    i18n.ts             ← etykiety UI: pl / de / en
    seo.ts              ← metadata, noindex dla dem, JSON-LD (LocalBusiness)
  sections/             ← biblioteka sekcji (komponenty)
    registry.tsx        ← mapowanie type → komponent
  sites/                ← konfiguracje stron (1 plik = 1 strona)
  app/
    page.tsx            ← wewnętrzny katalog wszystkich stron
    s/[site]/page.tsx   ← renderowanie strony (SSG)
    api/lead/route.ts   ← odbiór leadów (kontakt, wycena, rezerwacja)
  middleware.ts         ← własna domena klienta → jego strona
scripts/new-site.mjs    ← generator nowej strony
```

## Nowa strona / demo dla prospekta

```bash
npm run new-site -- construction kowalski-bud-lodz "Kowalski Bud" "Łódź"
npm run dev   # → http://localhost:3000/s/kowalski-bud-lodz
```

Potem w pliku uzupełniasz dane firmy (telefon, adres, ocena z Google, godziny),
kolor z ich logo (`theme.primary`) i — jeśli trzeba — nadpisujesz sekcje:

- `overrides: { hero: { title: '…' }, services: { items: [...] } }` — zmienia wybrane pola sekcji szablonu,
- `hide: ['stats']` — usuwa sekcję szablonu,
- `sections: [...]` — pełna, własna lista sekcji (patrz `ogien-warszawa.ts`).

Zdjęcia: pole `image: { src, alt }` w hero/about/services/projects/gallery/menu.
Szablony mają domyślnie dobrane zdjęcia stockowe (`src/engine/media.ts`, Unsplash —
licencja pozwala na użycie komercyjne). W demie dla prospekta podmień je na
zdjęcia firmy. Brak zdjęcia lub błąd ładowania = elegancki placeholder.

Akcenty w tytułach: słowa w `*gwiazdkach*` renderują się w kolorze marki
(kursywą w motywach szeryfowych), np. `'Budujemy *na czas.* Bez dopłat.'`.

Fonty są serwowane z naszej domeny (`@fontsource`, `src/engine/fonts.ts`) — bez
Google Fonts CDN (ważne dla RODO, szczególnie w Niemczech).

## Szablony branżowe

| Branża | Motywy | Sekcje specyficzne |
|---|---|---|
| Budownictwo / remonty | `industrial` (szyldowe, kondensowane wersaliki), `modern-build` (redakcyjny szeryf jak studio architektoniczne) | usługi jako numerowana lista z podglądem zdjęcia, mozaika realizacji z filtrem, **suwak przed/po**, **kalkulator wyceny (najpierw cena, potem kontakt)**, pasek gwarancji (marquee), liczniki, oś procesu |
| Restauracje | `bistro` (ciepły papier, terakota), `fine-dining` (czerń, mosiądz, Garamond) | **pasek rezerwacji w hero** (data/godzina/osoby → formularz), menu z polecanymi daniami ze zdjęciami + filtr wege/bez glutenu, kolaż „o nas”, przewijana galeria, wydarzenia, duży cytat z opinii |
| Szkoły jazdy (OSK) | `road` (szeroki krój Unbounded, asfalt + niebieski jak tablica „L” + limonka) | **zdawalność vs średnia w regionie** (z raportu WORD/starostwa), **kursy z terminami startu i liczbą miejsc → zapis w oknie dialogowym**, **kalkulator całkowitego kosztu prawa jazdy** (kurs + opłaty WORD + badanie + dokument), instruktorzy + flota, kroki „od zapisu do prawa jazdy” |

Wspólne: hero (3 warianty), usługi, o nas, opinie, FAQ, CTA, kontakt z formularzem
i mapą, sticky header z nawigacją, przycisk „Zadzwoń” na mobile, baner demo.

## Leady

Wszystkie formularze wysyłają `POST /api/lead` (`{ site, kind, data }`).
Jeśli ustawiony jest `LEAD_WEBHOOK_URL`, lead leci tam jako JSON (Make / n8n /
Zapier / Slack / CRM). Bez niego — tylko log serwera. Jest honeypot antyspamowy
i walidacja imienia/telefonu.

## Dema dla prospektów

`demo: { isDemo: true, preparedBy, contactHref }` →
baner „Projekt demonstracyjny przygotowany dla …”, `noindex`, pole `isDemo`
w leadach. Po podpisaniu umowy: `isDemo: false`, dodaj `domains: ['firma.pl']`,
podepnij domenę w Vercel — middleware serwuje stronę pod `/`.

## Dodanie nowej branży

1. `src/engine/types.ts` — dopisz do `Industry` (+ nowe typy sekcji, jeśli trzeba).
2. `src/engine/industries/<branża>.ts` — funkcja zwracająca domyślne sekcje.
3. Zarejestruj w `defineSite.ts` (`TEMPLATES`, `DEFAULT_PRESET`).
4. Nowe sekcje: komponent w `src/sections/` + wpis w `registry.tsx`
   (TypeScript wymusi kompletność).
5. Opcjonalnie motyw w `theme.ts`.

## Sanity CMS

Schematy i `/studio` zostały z MVP, ale silnik **czyta dziś treść z plików**
(`src/sites`). Pliki są szybsze w pracy przy demach (generowane przez AI, w gicie,
bez kont CMS). Sanity warto podpiąć dopiero dla klientów, którzy chcą sami
edytować treść — wtedy `getSite()` w `src/sites/index.ts` pobiera config z CMS.

Research wyboru branży „szkoły jazdy”: `docs/niche-research.md`.
