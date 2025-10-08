import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mobile Coating
              </h3>
              <p className="text-gray-400 mt-2">
                28 jaar ervaring in professionele coating services
              </p>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <span className="text-gray-300">06 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <span className="text-gray-300">info@mobilecoating.nl</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-gray-300">Heel Nederland</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Diensten</h4>
            <div className="space-y-2">
              {['Schadeherstel', 'Inbraakherstel', 'Renovatie', 'PVC Spuiten'].map((service) => (
                <div key={service} className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">
                  {service}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Openingstijden</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock size={18} className="text-blue-400" />
                <div className="text-gray-300">
                  <div>Ma-Vr: 07:00 - 17:00</div>
                  <div>Za: 08:00 - 16:00</div>
                  <div>Zo: Gesloten</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-center md:text-left">
            © 2025 Mobile Coating. Alle rechten voorbehouden.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Algemene Voorwaarden
            </a>
            <a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}