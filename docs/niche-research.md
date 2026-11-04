# Research: trzecia branża — szkoły jazdy (OSK)

_Listopad 2026. Cel: nisza z małą konkurencją wśród dostawców stron, w której treść do dema
jest łatwo dostępna publicznie, a wartość nowej strony da się pokazać od razu._

## Dlaczego szkoły jazdy

| Kryterium | Szkoły jazdy (OSK) |
|---|---|
| Wielkość rynku | **ponad 10 tys. ośrodków** w Polsce (wg rzecznika ITS) — rozdrobniony rynek małych, lokalnych firm |
| Konkurencja wśród dostawców stron | w researchu **nie znaleziono wyspecjalizowanego produktu „strona dla OSK”** — są systemy do zarządzania kursantami (SuperOSK, eSzkoła) i AI-recepcja, ale nie gotowe, nowoczesne strony |
| Dostępność danych do dema | **zdawalność z podziałem na OSK** publikują starostwa / WORD (BIP, np. Toruń kwartalnie, Kalisz, powiat gorlicki); cenniki i terminy kursów są na starych stronach i Facebooku; opinie i ocena w Google |
| Wyróżnik strony, którego nie ma konkurencja | oficjalna zdawalność vs średnia, kalkulator **całkowitego** kosztu prawa jazdy (kurs + WORD + badanie + dokument), terminy startu z liczbą miejsc, zapis w 2 kliknięcia |
| Klient końcowy | 17–19 lat + rodzice — szukają na telefonie, porównują cenę, zdawalność i termin |
| Sezonowość | szczyt zapisów: wakacje i ferie → dobry moment na sprzedaż przed sezonem |

Twarde dane rynkowe użyte w szablonie:
- średnia cena kursu kat. B: ok. 3,6–3,8 tys. zł (kb.pl, rankomat),
- opłaty WORD 2026 (woj. mazowieckie): teoria 55 zł, praktyka 222 zł (inne województwa — sprawdzić w lokalnym WORD),
- zdawalność teorii kat. B w 2025 r.: 56% (dokument ZPP), średnio 1,69 podejścia do praktyki na placu.

## Rozważane alternatywy

- **Zakłady pogrzebowe** — ok. 2,5 tys. firm, słabe strony, mało dostawców; ale temat delikatny, mniej wyszukiwań i trudniejsza sprzedaż „na zimno”. Dobry kandydat na później.
- **Instalatorzy (pompy ciepła, HVAC, dachy)** — wysoki koszt leada i słabe strony, ale silna konkurencja agencji i portali leadowych; częściowo pokrywa ich szablon budowlany.
- **Warsztaty samochodowe** — dużo firm bez strony, ale klienci szukają głównie w mapach i portalach.

## Jak robić demo dla prawdziwej szkoły jazdy

1. Znajdź raport zdawalności z podziałem na OSK dla powiatu (BIP starostwa / WORD) — wpisz liczby i źródło w sekcji `passRate`.
2. Ceny i kategorie z obecnej strony lub Facebooka → `courses`.
3. Opłaty WORD dla województwa → `licenceCost.fees`.
4. Ocena i 3 opinie z Google → `business.rating`, `testimonials`.
5. Zdjęcia aut, placu i instruktorów z ich Facebooka / Google → `team`, `hero.image`.

## Źródła
- Auto Świat — liczba OSK, wypowiedź rzecznika ITS: https://www.auto-swiat.pl/porady/prawo/nie-bedzie-zielonego-listka/cwd408q
- ZPP — dane o zdawalności 2025: https://zpp.pl/storage/library/2026-06/6cc1bf6153adc0575bd09f86719e4cda.pdf
- BIP Toruń — raporty zdawalności z podziałem na OSK: https://bip.torun.pl/artykul/pdf/32560/52301/1
- BIP Kalisz — zdawalność OSK: https://www.bip.kalisz.pl/ogloszenia/inne/zdaw_osk_za_2023rok_20240409.pdf
- Powiat gorlicki — szkoły nauki jazdy: https://samorzad.gov.pl/web/powiat-gorlicki/szkoly-nauki-jazdy
- RankingPro — jak wybrać szkołę jazdy (rankingi starostw): https://rankingpro.pl/jak-wybrac-szkole-nauki-jazdy-i-nie-wtopic-pieniedzy/
- ainora.lt — AI recepcja dla OSK (integracje SuperOSK, eSzkoła): https://ainora.lt/pl/recepcjonista-ai-szkoly-jazdy
- kb.pl — koszty prawa jazdy 2026: https://kb.pl/transport/prawo-motoryzacyjne/ile-kosztuje-prawo-jazdy-wyjasniamy-krok-po-kroku-_mot/
- rankomat — ile kosztuje prawo jazdy: https://rankomat.pl/samochod/prawo-jazdy-ile-kosztuje
- Money.pl / Wprost — rynek usług pogrzebowych: https://www.money.pl/gospodarka/wiadomosci/artykul/to-nie-jest-usluga-jak-kazda-inna-branza,219,0,2400987.html
- Leads by Location — niedoinwestowane nisze (HVAC, dachy): https://leadsbylocation.com/blog/best-niches-for-web-design/
