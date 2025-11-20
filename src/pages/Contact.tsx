import * as React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const naam = (data.get('naam') as string) || '';
    const email = (data.get('email') as string) || '';
    const telefoon = (data.get('telefoon') as string) || '';
    const onderwerp = (data.get('onderwerp') as string) || '';
    const bericht = (data.get('bericht') as string) || '';

    const templateParams = {
      naam,
      email,
      telefoon,
      onderwerp,
      bericht,
      datum: new Date().toLocaleString('nl-BE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      setIsSubmitting(true);
      setStatus('idle');
      setErrorMessage(null);

      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS configuratie ontbreekt. Controleer de VITE_EMAILJS_* variabelen.');
      }

      await emailjs.send(EMAILJS_SERVICE_ID!, EMAILJS_TEMPLATE_ID!, templateParams, EMAILJS_PUBLIC_KEY!);

      setStatus('success');
      form.reset();
    } catch (err) {
      console.error('EmailJS error', err);
      setStatus('error');
      setErrorMessage('Er ging iets mis bij het versturen. Probeer het later opnieuw of neem telefonisch contact op.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Neem contact op
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vragen, advies of een offerte? Laat je gegevens achter.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card className="border border-primary/20 bg-white/90 backdrop-blur-md shadow-2xl ring-1 ring-primary/20">
              <CardContent className="p-6 lg:p-8">
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  onSubmit={handleSubmit}
                >
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Naam</label>
                    <input
                      required
                      type="text"
                      placeholder="Voor- en achternaam"
                      name="naam"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <input
                      required
                      type="email"
                      placeholder="naam@bedrijf.be"
                      name="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Telefoon (optioneel)</label>
                    <input
                      type="tel"
                      placeholder="+32 4xx xx xx xx"
                      name="telefoon"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Onderwerp</label>
                    <input
                      type="text"
                      placeholder="Offerte / Vraag / Advies"
                      name="onderwerp"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Bericht</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Beschrijf kort je project: type ondergrond, aantal ramen/deuren, gewenste kleur/afwerking, foto’s indien mogelijk."
                      name="bericht"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="text-green-600 mt-0.5" size={18} />
                    <p>We gebruiken je gegevens uitsluitend om contact met je op te nemen over je aanvraag.</p>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                      <Send size={18} />
                      {isSubmitting ? 'Verzenden…' : 'Versturen'}
                    </Button>

                    {status === 'success' && (
                      <p className="text-sm text-green-700">
                        Bedankt! Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-sm text-red-600">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info & map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Methods */}
            <Card className="border border-primary/20 bg-white/90 backdrop-blur-md shadow-2xl ring-1 ring-primary/20 h-full">
              <CardContent className="p-6 flex flex-col min-h-full lg:min-h-[100%]">
                <h2 className="text-xl font-semibold mb-4">Contactgegevens</h2>
                <div className="space-y-4">
                  <a href="mailto:carpentier_marco@telenet.be" className="flex items-center gap-3 group">
                    <span className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                      <Mail size={18} />
                    </span>
                    <div>
                      <div className="font-medium group-hover:underline">carpentier_marco@telenet.be</div>
                      <div className="text-sm text-gray-600">E-mail</div>
                    </div>
                  </a>
                  <a href="tel:+32497903908" className="flex items-center gap-3 group">
                    <span className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                      <Phone size={18} />
                    </span>
                    <div>
                      <div className="font-medium group-hover:underline">+32 497 90 39 08</div>
                      <div className="text-sm text-gray-600">Telefonisch</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <span className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                      <MapPin size={18} />
                    </span>
                    <div>
                      <div className="font-medium">2040 Berendrecht</div>
                      <div className="text-sm text-gray-600">Valeriaanstraat 1A</div>
                    </div>
                  </div>
                </div>
                {/* Illustration to fill remaining space */}
                <div className="flex-1 mt-2 grid place-items-center">
                  <img
                    src="/images/Coating_character.png"
                    alt="Mobile Coating illustratie"
                    className="max-h-28 md:max-h-36 w-auto object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                {/* Bottom CTAs */}
                <div className="mt-6 border-t border-primary/10 pt-4 flex flex-wrap gap-3">
                  <a href="tel:+32497903908">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Bel nu</Button>
                  </a>
                  <a href="mailto:carpentier_marco@telenet.be">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">E-mail</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
