import { useState } from 'react';
import { motion } from 'motion/react';
import { HoverEffect } from '../../components/ui/card-hover-effect';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Slider } from '../../components/ui/slider';

// Support both before/after pairs and single photos
type PairItem = { before: string; after: string; alt: string };
type SingleItem = { src: string; alt: string };
type GalleryItem = PairItem | SingleItem;

// Resolve images from src/images using module-relative URLs
const asset = (p: string) => {
  if (!p) return p;
  if (p.startsWith('../src/images/')) {
    const rel = p.replace('../src/images/', '../images/');
    return new URL(rel, import.meta.url).href;
  }
  if (p.startsWith('../images/')) {
    return new URL(p, import.meta.url).href;
  }
  return p; // absolute http(s) or /public path
};
const images: GalleryItem[] = [
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.12.33_78c0a3b3.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.12.33_8fd99c78.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.25.43_10cc6d51.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.25.43_d4ed4b3d.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.26.26_7c8d9721.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.26.27_b38d7984.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.27.45_9594b1e0.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.27.45_01243dbd.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.54.12_d78ae399.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.54.12_62e78012.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.55.15_bc2dd99e.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.55.16_6db8a658.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.56.35_3a74c594.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.56.35_2c719731.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.57.53_e91223a2.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.57.53_5cb78684.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.58.38_6f38058c.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.58.38_1d1a0458.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.59.31_07887158.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.59.31_9386934c.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.03.42_e5c231f5.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.03.42_be813768.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.04.52_ea68c676.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.04.52_c2f7427b.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.05.52_829d8973.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.05.52_41f0bd4d.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.07.50_aad2cb2f.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 21.07.50_fc5e8b94.jpg',
    alt: '',
  },
  {
    before: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.59.07_09fd225b.jpg',
    after: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.59.07_d8ed1b3f.jpg',
    alt: '',
  },
  { src: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.56.10_de3cd015.jpg', alt: '' },
  { src: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.52.48_42a2dfde.jpg', alt: '' },
  { src: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.50.59_b8707d5b.jpg', alt: '' },
  { src: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.31.38_0b22cf57.jpg', alt: '' },
  

];

export default function Fotos() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = images.length;
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Foto's
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Een selectie van recent werk. Meer zien? Neem gerust contact op.
          </p>
        </motion.div>

        {/* Gallery with hover effect */}
        {(() => {
          const galleryItems = images
            .map((item) => {
              if (isPair(item)) {
                const img = asset(item.after);
                if (!img) return null;
                return {
                  title: item.alt || 'Voor & Na',
                  description: 'Klik om voor/na te bekijken',
                  link: img,
                  image: img,
                };
              } else {
                const img = asset(item.src);
                if (!img) return null;
                return {
                  title: item.alt || 'Foto',
                  description: 'Klik om te vergroten',
                  link: img,
                  image: img,
                };
              }
            })
            .filter((x): x is { title: string; description: string; link: string; image: string } => Boolean(x));
          return (
            <HoverEffect className="mt-2" items={galleryItems} onItemClick={(idx) => { setActiveIndex(idx); setOpen(true); }} />
          );
        })()}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0 bg-white/95">
            <div className="relative">
              {isPair(images[activeIndex]) ? (
                <BeforeAfterLightboxContent item={images[activeIndex] as PairItem} />
              ) : (
                <SingleLightboxContent item={images[activeIndex] as SingleItem} />
              )}
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow hover:bg-white"
                aria-label="Vorige"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow hover:bg-white"
                aria-label="Volgende"
              >
                <ChevronRight />
              </button>
              <div className="p-4 text-center text-gray-700">
                {images[activeIndex].alt}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function BeforeAfterLightboxContent({ item }: { item: PairItem }) {
  const [value, setValue] = useState<number[]>([50]);
  const percent = value[0];
  return (
    <div className="w-full">
      <div className="relative h-[70vh] bg-black/5 overflow-hidden">
        {/* Before */}
        <ImageWithFallback
          src={asset(item.before)}
          alt={item.alt + ' – voor'}
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* After clipped */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(${percent}% 0%, 100% 0%, 100% 100%, ${percent}% 100%)`,
          }}
        >
          <ImageWithFallback
            src={asset(item.after)}
            alt={item.alt + ' – na'}
            className="w-full h-full object-contain bg-transparent"
          />
        </div>
        {/* Divider line and handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow z-10"
          style={{ left: `${percent}%` }}
        />
      </div>
      <div className="p-4">
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}

// Type guard
function isPair(item: GalleryItem): item is PairItem {
  return (item as PairItem).before !== undefined && (item as PairItem).after !== undefined;
}

// Lightbox for single image
function SingleLightboxContent({ item }: { item: SingleItem }) {
  return (
    <div className="w-full">
      <div className="relative h-[70vh] bg-black/5 overflow-hidden">
        <ImageWithFallback
          src={asset(item.src)}
          alt={item.alt || 'Foto'}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
