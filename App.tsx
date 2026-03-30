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
