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

Zdjęcia: pole `image: { src, alt }` w hero/about/projects/gallery. Brak zdjęcia =
estetyczny placeholder w kolorach marki, więc demo wygląda dobrze od razu.

## Szablony branżowe

| Branża | Motywy | Sekcje specyficzne |
|---|---|---|
| Budownictwo / remonty | `industrial`, `modern-build` | realizacje z filtrem kategorii (+ przed/po), **kalkulator wyceny → lead**, proces współpracy, statystyki, FAQ |
| Restauracje | `bistro`, `fine-dining` | **menu z kategoriami i filtrem wege/bez glutenu**, **rezerwacja stolika**, godziny otwarcia, galeria, wydarzenia, opinie z oceną |

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
