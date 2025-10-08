import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BeforeAfter } from './components/BeforeAfter';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Diensten from '@/pages/Diensten';
import Contact from '@/pages/Contact';
import Fotos from '@/pages/Fotos';

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <BeforeAfter />
    </>
  );
}

export default function App() {
  return (
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
  );
}