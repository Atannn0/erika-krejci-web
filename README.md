# Mgr. Erika Krejčí – Web

Statická prezentační webová stránka pro Mgr. et Bc. Eriku Krejčí (zdravotně-pohybová terapie, spirální stabilizace SPS, manuální techniky, workshopy).

## Struktura

```
erika_krejci/
├── index.html                      # Hlavní stránka (jednostránkový web se sekcemi)
├── ochrana-osobnich-udaju.html     # Zásady ochrany osobních údajů (GDPR)
├── css/
│   ├── style.css                   # Hlavní styly
│   └── fonts.css                   # Definice self-hosted fontů (@font-face)
├── js/
│   └── main.js                     # Mobilní menu, modální okna, cookie lišta, kontaktní formulář
├── fonts/                          # Self-hosted fonty (woff2)
├── img/                            # Optimalizované obrázky a favicony použité na webu
├── favicon.ico
└── README.md
```

## Sekce webu

- **Úvod** – hero sekce s výzvou k akci
- **Služby** – spirální stabilizace SPS, zdravotně-kompenzační cvičení, manuální techniky a lymfodrenáž, diagnostika a poradenství (detaily v modálních oknech)
- **Workshopy** – autogenní trénink, paměťové techniky, workshopy na míru pro organizace (detaily v modálních oknech)
- **O mně** – profesní představení, vzdělání a certifikace
- **Spolupráce** – partneři a organizace
- **Kontakt** – kontaktní údaje, mapa (Google Maps, načte se až po souhlasu s cookies) a kontaktní formulář

## Spuštění lokálně

Otevřete `index.html` v prohlížeči, nebo spusťte lokální server:

```bash
# Python
python3 -m http.server 8080

# nebo npx
npx serve .
```

Poté navštivte `http://localhost:8080`.

## Nasazení

Web je statický – stačí nahrát obsah na hosting (např. Netlify, Vercel, běžný shared hosting).

### Kontaktní formulář

Formulář je napojený na [Formspree](https://formspree.io/) (`action="https://formspree.io/f/mwlklzlr"` v `index.html`, odeslání přes `fetch` v `js/main.js`). Před ostrým nasazením:

- ve Formspree účtu ověřte, že formulář `mwlklzlr` je aktivní a doručuje zprávy na správný e-mail,
- zkontrolujte nastavení spamového filtru / potvrzení e-mailu ve Formspree.

### Cookie lišta a mapa

Google mapa v sekci Kontakt se z důvodu GDPR/cookies nenačítá automaticky, ale až po souhlasu uživatele (cookie lišta dole na stránce, nebo tlačítko „Zobrazit mapu“ přímo u mapy). Souhlas se ukládá do `localStorage` prohlížeče. Uživatel může svou volbu kdykoli změnit přes odkaz „Nastavení cookies“ v patičce.

### Před spuštěním ještě zkontrolujte

- [ ] Doplnit skutečné odkazy na Facebook a Instagram (aktuálně `href="#"` v patičce obou stránek)
- [ ] Doplnit `robots.txt` a `sitemap.xml` (až bude známa produkční doména)
- [ ] Doplnit Open Graph / meta tagy pro sdílení na sociálních sítích (`og:title`, `og:description`, `og:image`, `og:url`) a `<link rel="canonical">` v `index.html`
- [ ] Finální korektura textů klientkou
- [ ] Zajistit doménu a hosting

## Úpravy obsahu

Texty jsou reálné (dodané klientkou). Úpravy se provádí přímo v `index.html` (hlavní stránka) nebo `ochrana-osobnich-udaju.html` (zásady ochrany osobních údajů). Detailní texty modálních oken (tlačítko „Více informací“) se upravují v `js/main.js` v objektu `modalContent`.

## Barvy

| Barva | HEX | Použití |
|-------|-----|---------|
| Terakota | `#A85C43` | Tlačítka, akcenty |
| Béžová | `#DDBEAC` | Sekundární pozadí |
| Off-white | `#EDE7E3` | Hlavní pozadí |
| Tmavě zelená | `#6F7D6B` | Patička, cookie lišta |

## Fonty

- Nadpisy: Playfair Display
- Text: Mulish
- Fonty jsou **self-hosted** ve složce `fonts/` včetně subsetu `latin-ext` pro plnou podporu české diakritiky (ě, š, č, ř, ž, …)
- Definice `@font-face` v `css/fonts.css`

## Právní stránky

- `ochrana-osobnich-udaju.html` obsahuje zásady ochrany osobních údajů odpovídající GDPR a povinným náležitostem pro OSVČ podle českého práva (§ 435 NOZ), včetně informací o Formspree jako zpracovateli a cookies třetí strany (Google Maps).
