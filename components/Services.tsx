import { motion } from 'motion/react';
import { Shield, Home, Palette, Car } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function Services() {
  // Resolve images from src/images so Vite bundles them
  const asset = (p: string) => {
    if (!p) return p;
    if (p.startsWith('../src/images/') || p.startsWith('../images/')) {
      return new URL(p.replace('../src/images/', '../images/'), import.meta.url).href;
    }
    return p; // external URL
  };
  const services = [
    {
      icon: Car,
      title: 'Schadeherstel',
      description: 'Snelle en vakkundige reparaties van lakschade, krassen en deuken.',
      image: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.12.33_78c0a3b3.jpg',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Inbraakherstel',
      description: 'Esthetisch herstel na sporen na inbraak met duurzame afwerking.',
      image: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.57.53_e91223a2.jpg',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Home,
      title: 'Renovatie',
      description: 'Alu ramen, deuren, veranda\'s en garagepoorten weer als nieuw.',
      image: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.31.38_0b22cf57.jpg',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Palette,
      title: 'Spuiten van PVC',
      description: 'Strakke kwaliteitsafwerking voor PVC ramen en deuren in elke kleur.',
      image: '../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.26.27_b38d7984.jpg',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="diensten" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Wat we doen
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Korte samenvatting van onze expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={asset(service.image)}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-80`}></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-4 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      Meer informatie →
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Color Customization Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Kleuren op maat</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Laat jouw kleur exact ontwerpen. We werken met kwalitatieve coatings en kleurmatcher.
              </p>
              <p className="text-blue-100 mb-6">
                We adviseren over glansgraad, textuur en duurzaamheid zodat het resultaat perfect aansluit bij jouw project.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Bespreek jouw kleur
              </motion.a>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[
                '#ef4444', // red-500
                '#3b82f6', // blue-500
                '#22c55e', // green-500
                '#eab308', // yellow-500
                '#a855f7', // purple-500
                '#ec4899', // pink-500
                '#6366f1', // indigo-500
                '#1f2937', // gray-800
              ].map((hex, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full shadow-lg cursor-pointer ring-1 ring-white/30"
                  style={{ backgroundColor: hex }}
                  aria-label={`Kleur ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}