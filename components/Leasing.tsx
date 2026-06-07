'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5">
        <path d="M9 11L11 13L15 9M21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 5.477 5.477 1 11 1C16.523 1 21 5.477 21 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Protokollgerechte Innen- und Außenreinigung',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5">
        <path d="M9 11L11 13L15 9M21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 5.477 5.477 1 11 1C16.523 1 21 5.477 21 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Entfernung von Gebrauchsspuren & Kratzer',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5">
        <path d="M9 11L11 13L15 9M21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 5.477 5.477 1 11 1C16.523 1 21 5.477 21 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Lackpflege & Polierung nach Herstellerstandard',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5">
        <path d="M9 11L11 13L15 9M21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 5.477 5.477 1 11 1C16.523 1 21 5.477 21 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Polsteraufbereitung & Geruchsbeseitigung',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5">
        <path d="M9 11L11 13L15 9M21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 5.477 5.477 1 11 1C16.523 1 21 5.477 21 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Vorbereitung für DEKRA / TÜV Bewertung',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5">
        <path d="M9 11L11 13L15 9M21 11C21 16.523 16.523 21 11 21C5.477 21 1 16.523 1 11C1 5.477 5.477 1 11 1C16.523 1 21 5.477 21 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Minimierung von Rückgabemängeln & Nachforderungen',
  },
]

export default function Leasing() {

  return (
    <section id="leasing" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <motion.div
            style={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 mb-6">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-gold">
                <path d="M9 2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V9M9 2l7 7M9 2v7h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-gold">
                Spezialservice
              </span>
            </div>

            <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm mb-2">
              Leasing-Rückläufer
            </p>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight text-charcoal leading-tight">
              Professionelle<br />
              <span className="text-gold">Rückgabe&shy;aufbereitung</span>
            </h2>
            <span className="block w-16 h-1 bg-gold mt-4 mb-6" />

            <p className="text-gray-500 leading-relaxed mb-4">
              Das Leasing läuft aus – und jetzt? Eine professionelle Aufbereitung vor der
              Fahrzeugrückgabe kann teure Nachforderungen des Leasinggebers verhindern.
              Wir bereiten Ihr Fahrzeug gezielt für die Rückgabe vor.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Von der gründlichen Innenreinigung über Lackkorrektur bis zur vollständigen
              Aufbereitung – wir sorgen dafür, dass Ihr Fahrzeug in bestem Zustand zurückgegeben
              wird und Sie unnötige Kosten vermeiden.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  style={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="text-gold flex-shrink-0">{f.icon}</span>
                  {f.text}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/#termin" className="btn-primary">
                Termin anfragen
              </Link>
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 border-2 border-charcoal text-charcoal font-heading font-bold uppercase tracking-wider text-sm px-8 py-4 transition-all duration-300 hover:bg-charcoal hover:text-white"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/7er/7er-vorne.jpg"
                alt="Leasing Rückläufer Aufbereitung"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-5 -left-5 bg-gold text-white p-5 shadow-xl">
              <p className="font-heading font-black text-3xl leading-none">100%</p>
              <p className="font-heading font-bold text-xs uppercase tracking-wider mt-1 opacity-90">
                Rückgabe-<br />bereit
              </p>
            </div>

            {/* Decorative line */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
