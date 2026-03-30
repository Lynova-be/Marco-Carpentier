# SEO/GEO Optimalisatie – Mobile Coating

**Datum:** 2026-03-30
**URL:** https://www.mobile-coating.be/
**Tech stack:** Vite + React + React Router (SPA)

---

## Probleemstelling

De website is een pure client-side SPA. Google crawlt de lege `index.html` en ziet enkel `<title>Mobile Coating</title>`. Geen meta descriptions, geen structured data, geen statische HTML-content. Resultaat: de site verschijnt nergens in Google, zelfs niet op de eigen bedrijfsnaam.

---

## Doelstelling

De website laten verschijnen in Google voor lokale zoekopdrachten zoals:
- "coating bedrijf Antwerpen"
- "ramen spuiten Antwerpen"
- "aluminium ramen coaten Antwerpen"
- "PVC ramen spuiten Antwerpen"
- "coating aan huis Vlaanderen"

Primair werkgebied: **Antwerpen en omliggende gemeenten**
Secundair werkgebied: **heel Vlaanderen**

---

## Gekozen aanpak: Prerendering + volledige SEO-optimalisatie

Geen migratie naar Next.js. We voegen prerendering toe aan de bestaande Vite-build zodat Google statische HTML per pagina krijgt, gecombineerd met alle ontbrekende SEO-elementen.

---

## Sectie 1 — Technische architectuur (Prerendering)

### Pakket
`vite-plugin-prerender` (of equivalent zoals `@prerenderer/rollup-plugin`) toegevoegd aan `vite.config.ts`.

### Routes om te prerenderen
- `/`
- `/diensten`
- `/fotos`
- `/contact`

### react-helmet-async
- Installeren als dependency
- `HelmetProvider` wikkelt de volledige app in `main.tsx`
- Elke pagina/component krijgt zijn eigen `<Helmet>` met unieke title en meta description

### Resultaat
Bij `vite build` genereert Vite een statische `index.html` per route. Google crawlt echte HTML-bestanden i.p.v. een lege JS-shell.

---

## Sectie 2 — Meta tags per pagina

| Pagina | Title | Meta Description |
|--------|-------|-----------------|
| `/` | `Mobile Coating Antwerpen – Ramen & Deuren Spuiten aan Huis` | `Mobile Coating is uw specialist voor het spuiten van alu ramen, PVC deuren en geveldelen in Antwerpen en heel Vlaanderen. 28 jaar ervaring. Offerte aanvragen.` |
| `/diensten` | `Onze Diensten – Schadeherstel, Renovatie & PVC Spuiten \| Mobile Coating` | `Ontdek alle coating diensten van Mobile Coating: schadeherstel, inbraakherstel, renovatie van aluminium ramen en spuiten van PVC ramen in Antwerpen.` |
| `/fotos` | `Realisaties & Foto's – Coating Resultaten \| Mobile Coating Antwerpen` | `Bekijk de voor-en-na foto's van onze coatingwerken aan ramen, deuren en gevels in Antwerpen en omgeving.` |
| `/contact` | `Contact & Offerte Aanvragen – Mobile Coating Antwerpen` | `Neem contact op met Mobile Coating voor een vrijblijvende offerte. Wij zijn actief in Antwerpen en heel Vlaanderen. Bel 0497 90 39 08.` |

### Aanvullend op elke pagina
- `<link rel="canonical" href="https://www.mobile-coating.be/[route]" />`
- Open Graph tags: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` (nl_BE)
- `<html lang="nl">` is reeds aanwezig — geen wijziging nodig

---

## Sectie 3 — JSON-LD Structured Data

### LocalBusiness schema (homepage — `Hero.tsx` of aparte `JsonLd.tsx` component)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mobile Coating",
  "url": "https://www.mobile-coating.be",
  "telephone": "+32497903908",
  "email": "carpentier_marco@telenet.be",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Valeriaanstraat 1A",
    "addressLocality": "Berendrecht",
    "postalCode": "2040",
    "addressCountry": "BE"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "16:00" }
  ],
  "areaServed": [
    { "@type": "City", "name": "Antwerpen" },
    { "@type": "City", "name": "Gent" },
    { "@type": "City", "name": "Mechelen" },
    { "@type": "AdministrativeArea", "name": "Vlaanderen" }
  ],
  "description": "Specialist in coating van aluminium ramen, PVC deuren en geveldelen. Ter plaatse, 28 jaar ervaring.",
  "priceRange": "$$",
  "vatID": "BE0662665990"
}
```

### Service schema's (pagina `/diensten`)
Één `Service` schema per dienst, inline als `<script type="application/ld+json">`:
- Schadeherstel
- Inbraakherstel
- Renovatie van alu ramen, deuren & poorten
- Spuiten van PVC ramen & deuren

Elk schema bevat: `name`, `description`, `provider` (verwijzing naar het bedrijf), `areaServed`.

### Implementatie
Aparte `<JsonLd>` component die een `<script type="application/ld+json">` injecteert via `react-helmet-async`. Eén component voor LocalBusiness (homepage), één voor Services (diensten pagina).

---

## Sectie 4 — Content & Keyword Optimalisatie

### Image alt texts
Alle alt texts worden beschrijvend en keyword-rijk:

| Huidig | Nieuw |
|--------|-------|
| `"Professional coating work"` | `"Schadeherstel aan aluminium ramen in Antwerpen door Mobile Coating"` |
| `service.title` (generiek) | `"Schadeherstel van ramen en deuren – Mobile Coating Antwerpen"` |
| `service.title` (generiek) | `"Inbraakherstel aan deuren en ramen – professioneel gespoten"` |
| `service.title` (generiek) | `"Renovatie aluminium ramen en garagepoort – Mobile Coating"` |
| `service.title` (generiek) | `"PVC ramen spuiten in elke kleur – Mobile Coating Antwerpen"` |

### Hero sectie — tekstuele aanpassing
De h1 ("Strak resultaat, ter plaatse gecoat") blijft visueel intact.
De paragraaf eronder wordt uitgebreid met lokale en dienstgerelateerde keywords:

> "Ik herstel en spuit aluminium ramen, PVC deuren, veranda's en geveldelen met oog voor detail — bij u thuis in Antwerpen en heel Vlaanderen. Al 28 jaar ervaring en vakmanschap op locatie."

### Footer — semantisch adres
Het adres wordt gewikkeld in een `<address>` HTML-element zodat zoekmachines het correct herkennen als contactinformatie.

### Sitemap
`lastmod` datums updaten naar `2026-03-30` voor alle 4 URL's.

---

## Aanbeveling buiten scope (toekomstig)

**Google Business Profile:** Dit is minstens even belangrijk als de website voor lokale SEO. Het zorgt voor het kaartje in Google Maps en de "Local Pack" (de 3 bedrijven bovenaan bij lokale zoekopdrachten). De eigenaar dient dit zelf aan te maken op business.google.com — eenmalige setup, daarna minimaal beheer.

---

## Wat we NIET doen (bewuste keuze)

- Geen migratie naar Next.js (overkill voor 4 pagina's)
- Geen nieuwe pagina's (werkgebied-pagina, FAQ-pagina) — te bespreken met de klant
- Geen blog/content marketing — te bespreken met de klant
- Geen betaalde Google Ads

---

## Verwacht resultaat

Na implementatie en herindexering door Google (typisch 2-6 weken):
- Site verschijnt in Google voor eigen bedrijfsnaam
- Site verschijnt voor lokale coating-gerelateerde zoekopdrachten in Antwerpen
- Rich results mogelijk via LocalBusiness en Service schema's
