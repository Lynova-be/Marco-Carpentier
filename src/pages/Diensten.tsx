import { motion } from 'motion/react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import clsx from 'clsx';
import { HoverSpotlight } from '../../components/ui/hover-spotlight';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

export default function Diensten() {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const services = [
    {
      title: 'Schadeherstel',
      subtitle: 'Laat krassen en deuken verdwijnen alsof ze er nooit geweest zijn.',
      description:
        'Wij herstellen lakschade, krassen en schrammen met professionele technieken zoals blending en kleurmatching. Het resultaat: een perfect glad oppervlak zonder zichtbare overgangen.',
      benefits: [
        'Onzichtbare reparaties, geen kleurverschil',
        'Snelle en duurzame oplossing',
      ],
      details:
        'Wij herstellen krassen, schrammen en oppervlaktebeschadigingen met professionele blending en kleurmatching voor een onzichtbare overgang.',
    },
    {
      title: 'Inbraakherstel',
      subtitle: 'Herstel de sporen van inbraak, esthetisch en duurzaam.',
      description:
        'Na een inbraak zorgen wij voor een professioneel herstel van beschadigingen aan ramen, deuren of poorten. We vullen, schuren en spuiten tot het oppervlak weer strak en uniform oogt — bestand tegen weer en dagelijks gebruik.',
      benefits: [
        'Esthetisch én stevig herstel',
        'Bescherming tegen verdere schade',
        'Terug naar een nette, verzorgde uitstraling',
      ],
    },
    {
      title: 'Renovatie van alu ramen, deuren & poorten',
      subtitle: 'Geef je woning een tweede leven zonder dure vervanging.',
      description:
        'Verweerde of verkleurde aluminium oppervlakken frissen we op met weerbestendige coatings van topkwaliteit. Zo krijgt je woning een moderne look, zonder dat je alles moet laten vervangen.',
      benefits: [
        'Duurzame coatings met lange levensduur',
        'Bescherming tegen weer en zonlicht',
        'Nieuwe uitstraling tegen een fractie van de kost van vervanging',
      ],
    },
    {
      title: 'Spuiten van PVC ramen & deuren',
      subtitle: 'Kies zelf je kleur, van mat tot glans.',
      description:
        'Met speciale primers en hoogwaardige coatings spuiten we PVC ramen en deuren in elke gewenste kleur en afwerking. Zo passen ze perfect bij jouw stijl en blijven ze jarenlang mooi.',
      benefits: [
        'Strak en egaal resultaat',
        'Beschikbaar in mat, satijn of glans',
        'Langdurig kleur- en weerbestendig',
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              Diensten
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Onze expertises, als overzichtelijke tijdlijn.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line: left on mobile, centered on md+ (thicker and more visible) */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30 z-0" />

          <ol className="space-y-10">
            {services.map((s, idx) => {
              const placeLeft = idx % 2 === 0; // even -> left, odd -> right on md+
              return (
                <li
                  key={s.title}
                  className={clsx(
                    'relative pl-16', // mobile padding for left line
                    'md:grid md:grid-cols-2 md:gap-16 md:pl-0'
                  )}
                >
                  {/* Horizontal connector from the main line to the card (branch) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={clsx(
                      'absolute top-1/2 -translate-y-1/2 h-0.5 bg-primary/40',
                      placeLeft ? 'right-1/2 w-24' : 'left-1/2 w-24'
                    )}
                    style={{ transformOrigin: placeLeft ? 'right center' : 'left center' }}
                    aria-hidden
                  />

                  {/* Left/Right spacer depending on side */}
                  <div
                    className={clsx(
                      'hidden md:block md:col-span-1',
                      placeLeft ? 'md:order-2' : 'md:order-1'
                    )}
                  />

                  {/* Right column (or sole column on mobile) */}
                  <div
                    className={clsx(
                      'md:col-span-1',
                      placeLeft
                        ? 'md:pr-16 md:mr-auto md:order-1'
                        : 'md:pl-16 md:ml-auto md:order-2'
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <HoverSpotlight className="rounded-2xl">
                        <Card
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setActiveIndex(idx);
                            setOpen(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveIndex(idx);
                              setOpen(true);
                            }
                          }}
                          className="relative overflow-hidden cursor-pointer border border-primary/20 bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-primary/20 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(26,42,61,0.40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                          <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
                            <p className="text-gray-600 leading-relaxed">{s.description}</p>
                          </CardContent>
                        </Card>
                      </HoverSpotlight>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-primary to-foreground rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Kleuren op maat</h3>
              <p className="text-white/80 mb-6">
                Laat jouw kleur exact ontwikkelen. We werken met kwalitatieve coatings en kleurmatching zodat het resultaat
                perfect aansluit bij jouw project.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition"
              >
                Vraag advies
              </a>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                '#ef4444', // red-500
                '#3b82f6', // blue-500
                '#22c55e', // green-500
                '#eab308', // yellow-500
                '#a855f7', // purple-500
                '#ec4899', // pink-500
                '#6366f1', // indigo-500
                '#1f2937', // gray-800
              ].map((hex, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full shadow-lg ring-1 ring-white/30"
                  style={{ backgroundColor: hex }}
                  aria-label={`Kleur ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        {/* Details dialog */}
        <ServiceDialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setActiveIndex(null);
          }}
          service={activeIndex !== null ? services[activeIndex] : null}
        />
      </div>
    </section>
  );
}

// Dialog rendering outside of list ensures portal overlay
function ServiceDialog({
  open,
  onOpenChange,
  service,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  service: {
    title: string;
    description: string;
    details?: string;
    subtitle?: string;
    benefits?: string[];
  } | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{service?.title}</DialogTitle>
          {service?.subtitle && (
            <p className="text-sm text-gray-600 mt-1">{service.subtitle}</p>
          )}
          <DialogDescription>
            {service?.details ?? service?.description}
          </DialogDescription>
        </DialogHeader>
        {service?.benefits && service.benefits.length > 0 && (
          <ul className="mt-4 list-disc list-inside text-sm text-gray-800 space-y-1">
            {service.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <a href="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Offerte aanvragen
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
