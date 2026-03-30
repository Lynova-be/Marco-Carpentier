# SEO/GEO Optimalisatie Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De website mobile-coating.be volledig zichtbaar maken voor Google via prerendering en volledige on-page SEO-optimalisatie.

**Architecture:** We voegen `vite-plugin-prerender` toe aan de Vite-build zodat elke route als statische HTML wordt gegenereerd. `react-helmet-async` zorgt voor unieke meta tags per pagina. JSON-LD structured data (LocalBusiness + Services) helpt Google de business en het werkgebied te begrijpen.

**Tech Stack:** Vite 4, React 18, react-router-dom 7, react-helmet-async, vite-plugin-prerender

---

## Bestandsoverzicht

| Actie | Bestand | Verantwoordelijkheid |
|-------|---------|----------------------|
| Modify | `vite.config.ts` | Prerender plugin toevoegen voor 4 routes |
| Modify | `src/main.tsx` | `hydrateRoot` i.p.v. `createRoot` voor prerendered pages |
| Modify | `App.tsx` | `HelmetProvider` wrapper toevoegen |
| Create | `components/PageSeo.tsx` | Herbruikbaar component: title, description, canonical, OG tags |
| Create | `components/JsonLd.tsx` | Injecteert `<script type="application/ld+json">` via Helmet |
| Modify | `App.tsx` (HomePage) | LocalBusiness schema + homepage meta |
| Modify | `components/Hero.tsx` | Hero paragraaf + image alt text |
| Modify | `components/Services.tsx` | Image alt texts diensten |
| Modify | `src/pages/Diensten.tsx` | Diensten meta + Service schemas |
| Modify | `src/pages/Fotos.tsx` | Fotos meta + gallery alt texts |
| Modify | `src/pages/Contact.tsx` | Contact meta |
| Modify | `components/Footer.tsx` | `<address>` element rond contactgegevens |
| Modify | `public/sitemap.xml` | lastmod datums updaten |

---

## Task 1: Dependencies installeren

**Files:**
- Modify: `package.json` (automatisch via npm)

- [ ] **Stap 1: Installeer react-helmet-async**

```bash
npm install react-helmet-async
```

Verwacht: `added X packages` zonder errors.

- [ ] **Stap 2: Installeer vite-plugin-prerender**

```bash
npm install --save-dev vite-plugin-prerender
```

Verwacht: `added X packages` zonder errors. Dit installeert ook `@prerenderer/renderer-puppeteer` en Chromium (kan even duren — Chromium download is ~170MB).

- [ ] **Stap 3: Verifieer installatie**

```bash
node -e "require('react-helmet-async'); console.log('OK')"
node -e "require('vite-plugin-prerender'); console.log('OK')"
```

Verwacht: twee keer `OK`.

- [ ] **Stap 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(seo): install react-helmet-async and vite-plugin-prerender"
```

---

## Task 2: Vite configureren voor prerendering

**Files:**
- Modify: `vite.config.ts`

- [ ] **Stap 1: Controleer huidig bestand**

Lees `vite.config.ts` — bevat nu enkel `react()` plugin en `resolve.alias`.

- [ ] **Stap 2: Voeg prerender plugin toe**

Vervang de volledige inhoud van `vite.config.ts` door:

```ts
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import PrerenderPlugin from 'vite-plugin-prerender'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    PrerenderPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/diensten', '/fotos', '/contact'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      'lucide-react@0.487.0': 'lucide-react',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
    },
  },
})
```

> **Windows-compatibel:** `fileURLToPath(import.meta.url)` converteert de ESM-URL correct naar een Windows-pad (`C:\Users\...`). Dit is betrouwbaarder dan `import.meta.url.pathname` op Windows.

- [ ] **Stap 3: Commit**

```bash
git add vite.config.ts
git commit -m "feat(seo): configure vite-plugin-prerender for 4 routes"
```

---

## Task 3: main.tsx updaten voor hydration

**Files:**
- Modify: `src/main.tsx`

Prerendered HTML bevat al DOM-nodes. `createRoot` maakt de DOM leeg en herbouwt — dit geeft een flash. `hydrateRoot` matched de bestaande DOM, wat sneller is en flicker voorkomt.

- [ ] **Stap 1: Vervang inhoud van `src/main.tsx`**

```tsx
import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from '../App'
import './index.css'

const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  // Prerendered HTML aanwezig — hydrate i.p.v. mount
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  // Dev-mode of niet-geprerenderde pagina — gewone mount
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
```

- [ ] **Stap 2: Commit**

```bash
git add src/main.tsx
git commit -m "feat(seo): use hydrateRoot for prerendered pages"
```

---

## Task 4: PageSeo component aanmaken

**Files:**
- Create: `components/PageSeo.tsx`

- [ ] **Stap 1: Maak het bestand aan**

```tsx
import { Helmet } from 'react-helmet-async'

interface PageSeoProps {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
}

export function PageSeo({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
}: PageSeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nl_BE" />
      <meta property="og:site_name" content="Mobile Coating" />
    </Helmet>
  )
}
```

- [ ] **Stap 2: Commit**

```bash
git add components/PageSeo.tsx
git commit -m "feat(seo): add reusable PageSeo component"
```

---

## Task 5: JsonLd component aanmaken

**Files:**
- Create: `components/JsonLd.tsx`

- [ ] **Stap 1: Maak het bestand aan**

```tsx
import { Helmet } from 'react-helmet-async'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  )
}
```

- [ ] **Stap 2: Commit**

```bash
git add components/JsonLd.tsx
git commit -m "feat(seo): add JsonLd component for structured data"
```

---

## Task 6: App.tsx updaten — HelmetProvider + homepage SEO

**Files:**
- Modify: `App.tsx`

- [ ] **Stap 1: Vervang volledige inhoud van `App.tsx`**

```tsx
import { HelmetProvider } from 'react-helmet-async'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { BeforeAfter } from './components/BeforeAfter'
import { Footer } from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageSeo } from './components/PageSeo'
import { JsonLd } from './components/JsonLd'
import Diensten from '@/pages/Diensten'
import Contact from '@/pages/Contact'
import Fotos from '@/pages/Fotos'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Mobile Coating',
  url: 'https://www.mobile-coating.be',
  telephone: '+32497903908',
  email: 'carpentier_marco@telenet.be',
  vatID: 'BE0662665990',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Valeriaanstraat 1A',
    addressLocality: 'Berendrecht',
    postalCode: '2040',
    addressCountry: 'BE',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '16:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Antwerpen' },
    { '@type': 'City', name: 'Gent' },
    { '@type': 'City', name: 'Mechelen' },
    { '@type': 'AdministrativeArea', name: 'Vlaanderen' },
  ],
  description:
    'Specialist in coating van aluminium ramen, PVC deuren en geveldelen. Ter plaatse, 28 jaar ervaring.',
  priceRange: '$$',
}

function HomePage() {
  return (
    <>
      <PageSeo
        title="Mobile Coating Antwerpen – Ramen & Deuren Spuiten aan Huis"
        description="Mobile Coating is uw specialist voor het spuiten van alu ramen, PVC deuren en geveldelen in Antwerpen en heel Vlaanderen. 28 jaar ervaring. Offerte aanvragen."
        canonical="https://www.mobile-coating.be/"
      />
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <Services />
      <BeforeAfter />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diensten" element={<Diensten />} />
              <Route path="/fotos" element={<Fotos />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
```

- [ ] **Stap 2: Commit**

```bash
git add App.tsx
git commit -m "feat(seo): add HelmetProvider, homepage meta tags and LocalBusiness schema"
```

---

## Task 7: Hero.tsx updaten — paragraaf + alt text

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Stap 1: Vervang de paragrafentekst**

Zoek in `components/Hero.tsx` de paragraaf:
```tsx
Ik herstel en spuit ramen, deuren en geveldelen met oog voor detail. Al 28 jaar
              ervaring en vakmanschap op locatie.
```

Vervang door:
```tsx
Ik herstel en spuit aluminium ramen, PVC deuren, veranda's en geveldelen met oog voor detail — bij u thuis in Antwerpen en heel Vlaanderen. Al 28 jaar ervaring en vakmanschap op locatie.
```

- [ ] **Stap 2: Vervang de hero image alt text**

Zoek:
```tsx
alt="Professional coating work"
```

Vervang door:
```tsx
alt="Professioneel gespoten aluminium ramen en deuren door Mobile Coating Antwerpen"
```

- [ ] **Stap 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat(seo): improve hero paragraph keywords and image alt text"
```

---

## Task 8: Services.tsx — image alt texts updaten

**Files:**
- Modify: `components/Services.tsx`

- [ ] **Stap 1: Vervang de alt-waarden in de services array**

In `components/Services.tsx` staat de `services` array met 4 objecten. Elke `<img>` gebruikt `alt={service.title}`. We voegen per service een expliciete `alt`-string toe.

Vervang de `services` array door:

```tsx
const services = [
  {
    icon: Car,
    title: 'Schadeherstel',
    alt: 'Schadeherstel aan aluminium ramen en deuren – Mobile Coating Antwerpen',
    description: 'Snelle en vakkundige reparaties van lakschade, krassen en deuken.',
    image: imgSchade,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Inbraakherstel',
    alt: 'Inbraakherstel van deuren en ramen – professioneel gespoten door Mobile Coating',
    description: 'Esthetisch herstel na sporen na inbraak met duurzame afwerking.',
    image: imgInbraak,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Home,
    title: 'Renovatie',
    alt: 'Renovatie van aluminium ramen, veranda en garagepoort – Mobile Coating Antwerpen',
    description: "Alu ramen, deuren, veranda's en garagepoorten weer als nieuw.",
    image: imgRenovatie,
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: Palette,
    title: 'Spuiten van PVC',
    alt: 'PVC ramen en deuren spuiten in elke kleur – Mobile Coating Antwerpen',
    description: 'Strakke kwaliteitsafwerking voor PVC ramen en deuren in elke kleur.',
    image: imgPVC,
    gradient: 'from-orange-500 to-red-500',
  },
]
```

- [ ] **Stap 2: Vervang `alt={service.title}` in de img tag**

Zoek in de JSX:
```tsx
alt={service.title}
```

Vervang door:
```tsx
alt={service.alt}
```

- [ ] **Stap 3: Commit**

```bash
git add components/Services.tsx
git commit -m "feat(seo): add keyword-rich alt texts to service images"
```

---

## Task 9: Diensten pagina — meta tags + Service schemas

**Files:**
- Modify: `src/pages/Diensten.tsx`

- [ ] **Stap 1: Voeg imports toe bovenaan het bestand**

Voeg toe onder de bestaande imports in `src/pages/Diensten.tsx`:

```tsx
import { PageSeo } from '../../components/PageSeo'
import { JsonLd } from '../../components/JsonLd'
```

- [ ] **Stap 2: Definieer de service schemas voor de pagina**

Voeg toe direct voor de `export default function Diensten()` regel:

```tsx
const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Schadeherstel',
    description:
      'Vakkundige reparaties van lakschade, krassen en deuken aan aluminium ramen, deuren en geveldelen.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mobile Coating',
      url: 'https://www.mobile-coating.be',
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Antwerpen' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Inbraakherstel',
    description:
      'Professioneel herstel van beschadigingen aan ramen, deuren en poorten na inbraak.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mobile Coating',
      url: 'https://www.mobile-coating.be',
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Antwerpen' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Renovatie van aluminium ramen, deuren en poorten',
    description:
      'Verweerde of verkleurde aluminium oppervlakken opfrissen met weerbestendige coatings.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mobile Coating',
      url: 'https://www.mobile-coating.be',
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Antwerpen' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Spuiten van PVC ramen en deuren',
    description:
      'PVC ramen en deuren spuiten in elke gewenste kleur en afwerking met hoogwaardige coatings.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mobile Coating',
      url: 'https://www.mobile-coating.be',
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Antwerpen' },
  },
]
```

- [ ] **Stap 3: Voeg PageSeo en JsonLd toe in de return van Diensten**

Zoek in de JSX van `Diensten()`:
```tsx
return (
    <section className="py-24">
```

Vervang door:
```tsx
return (
    <section className="py-24">
      <PageSeo
        title="Onze Diensten – Schadeherstel, Renovatie & PVC Spuiten | Mobile Coating"
        description="Ontdek alle coating diensten van Mobile Coating: schadeherstel, inbraakherstel, renovatie van aluminium ramen en spuiten van PVC ramen in Antwerpen."
        canonical="https://www.mobile-coating.be/diensten"
      />
      {serviceSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
```

- [ ] **Stap 4: Commit**

```bash
git add src/pages/Diensten.tsx
git commit -m "feat(seo): add meta tags and Service schemas to Diensten page"
```

---

## Task 10: Fotos pagina — meta tags + gallery alt texts

**Files:**
- Modify: `src/pages/Fotos.tsx`

- [ ] **Stap 1: Voeg PageSeo import toe**

Voeg toe onder de bestaande imports:
```tsx
import { PageSeo } from '../../components/PageSeo'
```

- [ ] **Stap 2: Voeg alt texts toe aan de images array**

In `src/pages/Fotos.tsx` staat een `images` array met voor/na paren, allemaal met `alt: ''`. Vervang de `images` array volledig door:

```tsx
const images: GalleryItem[] = [
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.12.33_78c0a3b3.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.12.33_8fd99c78.jpg',
    alt: 'Schadeherstel aluminium ramen – voor en na coating Mobile Coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.25.43_10cc6d51.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.25.43_d4ed4b3d.jpg',
    alt: 'Renovatie aluminium ramen – voor en na resultaat',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.26.26_7c8d9721.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.26.27_b38d7984.jpg',
    alt: 'PVC ramen gespoten – voor en na afwerking Mobile Coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.27.45_9594b1e0.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.27.45_01243dbd.jpg',
    alt: 'Inbraakherstel deuren – voor en na coating resultaat',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.54.12_d78ae399.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.54.12_62e78012.jpg',
    alt: 'Garagepoort gespoten – voor en na professionele coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.55.15_bc2dd99e.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.55.16_6db8a658.jpg',
    alt: 'Aluminium deur renovatie – voor en na Mobile Coating Antwerpen',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.56.35_3a74c594.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.56.35_2c719731.jpg',
    alt: 'Raam schadeherstel – voor en na kleurmatching coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.57.53_e91223a2.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.57.53_5cb78684.jpg',
    alt: 'PVC deur gespoten – voor en na resultaat Mobile Coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.58.38_6f38058c.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.58.38_1d1a0458.jpg',
    alt: 'Veranda coating – voor en na professioneel gespoten',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.59.31_07887158.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.59.31_9386934c.jpg',
    alt: 'Aluminium ramen renovatie – voor en na coating Antwerpen',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 21.03.42_e5c231f5.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 21.03.42_be813768.jpg',
    alt: 'Geveldelen coating – voor en na afwerking Mobile Coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 21.04.52_ea68c676.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 21.04.52_c2f7427b.jpg',
    alt: 'Deur inbraakherstel – voor en na professionele coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 21.05.52_829d8973.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 21.05.52_41f0bd4d.jpg',
    alt: 'PVC ramen kleurwijziging – voor en na gespoten door Mobile Coating',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 21.07.50_aad2cb2f.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 21.07.50_fc5e8b94.jpg',
    alt: 'Aluminium poort coating – voor en na resultaat Antwerpen',
  },
  {
    before: 'Afbeelding van WhatsApp op 2025-09-18 om 20.59.07_09fd225b.jpg',
    after: 'Afbeelding van WhatsApp op 2025-09-18 om 20.59.07_d8ed1b3f.jpg',
    alt: 'Raam schadeherstel – voor en na kleurmatching Mobile Coating',
  },
  {
    src: 'Afbeelding van WhatsApp op 2025-09-18 om 20.56.10_de3cd015.jpg',
    alt: 'Professioneel gespoten aluminium ramen – Mobile Coating Antwerpen',
  },
  {
    src: 'Afbeelding van WhatsApp op 2025-09-18 om 20.52.48_42a2dfde.jpg',
    alt: 'Coating resultaat PVC deur – Mobile Coating Vlaanderen',
  },
  {
    src: 'Afbeelding van WhatsApp op 2025-09-18 om 20.50.59_b8707d5b.jpg',
    alt: 'Gespoten aluminium gevelelement – Mobile Coating',
  },
  {
    src: 'Afbeelding van WhatsApp op 2025-09-18 om 20.31.38_0b22cf57.jpg',
    alt: 'Renovatie aluminium ramen en deuren – Mobile Coating Antwerpen',
  },
]
```

- [ ] **Stap 3: Voeg PageSeo toe in de return van Fotos**

Zoek:
```tsx
return (
    <section className="relative py-24">
```

Vervang door:
```tsx
return (
    <section className="relative py-24">
      <PageSeo
        title="Realisaties & Foto's – Coating Resultaten | Mobile Coating Antwerpen"
        description="Bekijk de voor-en-na foto's van onze coatingwerken aan ramen, deuren en gevels in Antwerpen en omgeving."
        canonical="https://www.mobile-coating.be/fotos"
      />
```

- [ ] **Stap 4: Commit**

```bash
git add src/pages/Fotos.tsx
git commit -m "feat(seo): add meta tags and alt texts to Fotos page"
```

---

## Task 11: Contact pagina — meta tags

**Files:**
- Modify: `src/pages/Contact.tsx`

- [ ] **Stap 1: Voeg PageSeo import toe**

Voeg toe onder de bestaande imports in `src/pages/Contact.tsx`:
```tsx
import { PageSeo } from '../../components/PageSeo'
```

- [ ] **Stap 2: Voeg PageSeo toe in de return**

Zoek:
```tsx
return (
    <section className="relative py-24 overflow-hidden">
```

Vervang door:
```tsx
return (
    <section className="relative py-24 overflow-hidden">
      <PageSeo
        title="Contact & Offerte Aanvragen – Mobile Coating Antwerpen"
        description="Neem contact op met Mobile Coating voor een vrijblijvende offerte. Wij zijn actief in Antwerpen en heel Vlaanderen. Bel 0497 90 39 08."
        canonical="https://www.mobile-coating.be/contact"
      />
```

- [ ] **Stap 3: Commit**

```bash
git add src/pages/Contact.tsx
git commit -m "feat(seo): add meta tags to Contact page"
```

---

## Task 12: Footer — semantisch adres element

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Stap 1: Wrap het adresblok in `<address>`**

Zoek in `components/Footer.tsx` de div met de contactgegevens (Phone, Mail, MapPin, Receipt). Het gaat om de div die begint met:
```tsx
<h4 className="font-semibold text-lg mb-4">Contact</h4>
<div className="space-y-3">
```

Vervang `<div className="space-y-3">` en de sluitende `</div>` door `<address className="space-y-3 not-italic">` en `</address>`:

```tsx
<h4 className="font-semibold text-lg mb-4">Contact</h4>
<address className="space-y-3 not-italic">
  <div className="flex items-center space-x-3">
    <Phone size={18} className="text-blue-400" />
    <span className="text-gray-300">GSM: 0497903908</span>
  </div>
  <div className="flex items-center space-x-3">
    <Mail size={18} className="text-blue-400" />
    <span className="text-gray-300">carpentier_marco@telenet.be</span>
  </div>
  <div className="flex items-center space-x-3">
    <MapPin size={18} className="text-blue-400" />
    <span className="text-gray-300">Valeriaanstraat 1A, 2040 Berendrecht</span>
  </div>
  <div className="flex items-center space-x-3">
    <Receipt size={18} className="text-blue-400" />
    <span className="text-gray-300">BTW: BE0662665990</span>
  </div>
</address>
```

- [ ] **Stap 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat(seo): wrap contact info in semantic address element"
```

---

## Task 13: Sitemap updaten

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Stap 1: Vervang alle lastmod datums**

Vervang de volledige inhoud van `public/sitemap.xml` door:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.mobile-coating.be/</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.mobile-coating.be/diensten</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.mobile-coating.be/fotos</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.mobile-coating.be/contact</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Stap 2: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat(seo): update sitemap lastmod dates to 2026-03-30"
```

---

## Task 14: Build uitvoeren en verifiëren

**Files:**
- Geen codewijzigingen — alleen verificatie

- [ ] **Stap 1: Run de build**

```bash
npm run build
```

Verwacht: build slaagt zonder errors. Vite genereert de `dist/` folder, waarna de prerender plugin Chromium start en de 4 routes rendert. Dit duurt langer dan een normale build (30-60 seconden extra).

- [ ] **Stap 2: Controleer of prerendering werkte voor homepage**

```bash
grep -i "Mobile Coating Antwerpen" dist/index.html
```

Verwacht: de title of meta description verschijnt in de output.

- [ ] **Stap 3: Controleer of subpagina's gerenderd zijn**

```bash
ls dist/diensten/
ls dist/fotos/
ls dist/contact/
```

Verwacht: elk van deze mappen bevat een `index.html`.

- [ ] **Stap 4: Controleer JSON-LD aanwezig in homepage**

```bash
grep -i "LocalBusiness" dist/index.html
```

Verwacht: de LocalBusiness schema verschijnt in de HTML output.

- [ ] **Stap 5: Controleer meta description in diensten pagina**

```bash
grep -i "schadeherstel" dist/diensten/index.html
```

Verwacht: de meta description en/of pagina-content met "schadeherstel" is zichtbaar.

> **Als de build faalt door puppeteer/Chromium:** Controleer of Chromium correct gedownload is via `npx puppeteer browsers install chrome`. Op Windows kan het ook nodig zijn om `--no-sandbox` toe te voegen aan de PrerenderPlugin opties: `rendererOptions: { args: ['--no-sandbox'] }`.

- [ ] **Stap 6: Lokaal preview testen**

```bash
npm run preview
```

Open `http://localhost:4173` en `http://localhost:4173/diensten` in de browser. Controleer:
- Juiste page title in browser tab
- Rechtermuisklik → "Paginabron bekijken" → meta description zichtbaar in de HTML source

> **Geef dit resultaat aan de ontwikkelaar** zodat hij lokaal kan bevestigen dat alles werkt voor er gepushed wordt.

---

## Aanbeveling na go-live (buiten scope van dit plan)

1. **Google Search Console:** Dien de sitemap in via `https://search.google.com/search-console` → Sitemaps → `https://www.mobile-coating.be/sitemap.xml`. Dit versnelt indexering aanzienlijk.

2. **Google Business Profile:** `business.google.com` — eenmalige setup, cruciaal voor "Local Pack" verschijning in Maps en lokale zoekresultaten. Kan worden gedaan zonder technische kennis.

3. **Herindexering afwachten:** Typisch 2–6 weken voor volledige Google-indexering na go-live van de verbeteringen.
