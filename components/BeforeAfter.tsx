import { useState } from 'react';
import { motion } from 'motion/react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

export function BeforeAfter() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <section id="fotos" className="py-20 bg-white">
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
              Voor & Na
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schaaf aan het verschil te zien
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gray-100 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Before/After Image Container */}
            <div className="relative aspect-video overflow-hidden">
              {/* Before Image */}
              <div className="absolute inset-0">
                <img
                  src="../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.59.31_07887158.jpg"
                  alt="Before renovation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  VOOR
                </div>
              </div>

              {/* After Image with Clip Path */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(${sliderValue[0]}% 0%, 100% 0%, 100% 100%, ${sliderValue[0]}% 100%)`
                }}
              >
                <img
                  src="../src/images/Afbeelding van WhatsApp op 2025-09-18 om 20.59.31_9386934c.jpg"
                  alt="After renovation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  NA
                </div>
              </div>

              {/* Slider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${sliderValue[0]}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="max-w-md mx-auto">
                <p className="text-center text-gray-600 mb-4">
                  Sleep om het verschil te zien
                </p>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {[
              { number: '98%', label: 'Klanttevredenheid', icon: '😊' },
              { number: '28 jaar', label: 'Ervaring', icon: '🛠️' },
              { number: 'Eerlijke prijzen', label: 'Transparant', icon: '💰' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-xl text-gray-600 mb-8">
              Klaar om jouw project te transformeren?
            </p>
            <a href="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start jouw project
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}