'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type GalleryItem = { src: string; label: string; category: string }

const allItems: GalleryItem[] = [
  // BMW 3er
  { src: '/images/3er/3er-vorne-fahrer.jpg', label: 'BMW 3er', category: 'BMW' },
  { src: '/images/3er/3er-hinten-fahrer.jpg', label: 'BMW 3er', category: 'BMW' },
  { src: '/images/3er/3er-innenraum.jpg', label: 'BMW 3er – Innenraum', category: 'BMW' },
  { src: '/images/3er/3er-vorne-beifahrer.jpg', label: 'BMW 3er', category: 'BMW' },
  // BMW 7er
  { src: '/images/7er/7er-vorne.jpg', label: 'BMW 7er', category: 'BMW' },
  { src: '/images/7er/7er-vorne-fahrer.jpg', label: 'BMW 7er', category: 'BMW' },
  { src: '/images/7er/7er-hinten-beifahrer.jpg', label: 'BMW 7er', category: 'BMW' },
  { src: '/images/7er/7er-innenraum.jpg', label: 'BMW 7er – Innenraum', category: 'BMW' },
  { src: '/images/7er/7er-vorne-beifahrer.jpg', label: 'BMW 7er', category: 'BMW' },
  // BMW M4
  { src: '/images/M4/m3-vorne-fahrer.jpg', label: 'BMW M4', category: 'BMW' },
  { src: '/images/M4/m3-vorne-beifahrer.jpg', label: 'BMW M4', category: 'BMW' },
  { src: '/images/M4/m3-hinten-fahrer.jpg', label: 'BMW M4', category: 'BMW' },
  { src: '/images/M4/m3-hinten-fahrer2.jpg', label: 'BMW M4', category: 'BMW' },
  { src: '/images/M4/m3-emblem.jpg', label: 'BMW M4 – Emblem', category: 'BMW' },
  // BMW M3
  { src: '/images/m3-2/m3-vorne.jpg', label: 'BMW M3', category: 'BMW' },
  { src: '/images/m3-2/m3-vorne-fahrer.jpg', label: 'BMW M3', category: 'BMW' },
  { src: '/images/m3-2/m3-vorne-fahrer-2.jpg', label: 'BMW M3', category: 'BMW' },
  { src: '/images/m3-2/m3-hinten-fahrer.jpg', label: 'BMW M3', category: 'BMW' },
  { src: '/images/m3-2/m3-hinten-beifahrer.jpg', label: 'BMW M3', category: 'BMW' },
  { src: '/images/m3-2/m3-innenraum.jpg', label: 'BMW M3 – Innenraum', category: 'BMW' },
  { src: '/images/m3-2/m3-innenraum-2.jpg', label: 'BMW M3 – Innenraum', category: 'BMW' },
  // BMW E46
  { src: '/images/e46/e46-vorne.jpg', label: 'BMW E46', category: 'BMW' },
  { src: '/images/e46/e46-vorne-fahrer.jpg', label: 'BMW E46', category: 'BMW' },
  { src: '/images/e46/e46-vorne-beifahrer.jpg', label: 'BMW E46', category: 'BMW' },
  { src: '/images/e46/e46-hinten-beifahrer.jpg', label: 'BMW E46', category: 'BMW' },
  { src: '/images/e46/e46-innenraum.jpg', label: 'BMW E46 – Innenraum', category: 'BMW' },
  { src: '/images/e46/e46-auspudd.jpg', label: 'BMW E46 – Auspuff', category: 'BMW' },
  { src: '/images/e46/e46-emblem.jpg', label: 'BMW E46 – Emblem', category: 'BMW' },
  { src: '/images/e46/e46-schaum.jpg', label: 'BMW E46 – Reinigung', category: 'BMW' },
  // Mercedes E-Klasse
  { src: '/images/E-Klasse/e-vorne-fahrer.jpg', label: 'Mercedes E-Klasse', category: 'Mercedes' },
  { src: '/images/E-Klasse/E-innenraum-fahrer.jpg', label: 'Mercedes E-Klasse – Innenraum', category: 'Mercedes' },
  // Mercedes C-AMG
  { src: '/images/c-amg/c-amg-vorne-fahrer.jpg', label: 'Mercedes C-AMG', category: 'Mercedes' },
  { src: '/images/c-amg/c-amg-vorne-beifahrer.jpg', label: 'Mercedes C-AMG', category: 'Mercedes' },
  { src: '/images/c-amg/c-amg-hinten-fahrer.jpg', label: 'Mercedes C-AMG', category: 'Mercedes' },
  { src: '/images/c-amg/c-amg-innenraum.jpg', label: 'Mercedes C-AMG – Innenraum', category: 'Mercedes' },
  // Audi
  { src: '/images/audi/audi-vorne-fahrer.jpg', label: 'Audi', category: 'Audi' },
  { src: '/images/audi/audi-vorne-beifahrer.jpg', label: 'Audi', category: 'Audi' },
  { src: '/images/audi/audi-hinten-fahrer.jpg', label: 'Audi', category: 'Audi' },
  { src: '/images/audi/audi-hinten-beifahrer.jpg', label: 'Audi', category: 'Audi' },
  // Audi R8
  { src: '/images/r8/r8-vorne.jpg', label: 'Audi R8', category: 'Audi' },
  { src: '/images/r8/r8-vorne-fahrer.jpg', label: 'Audi R8', category: 'Audi' },
  { src: '/images/r8/r8-vorne-beifahrer.jpg', label: 'Audi R8', category: 'Audi' },
  { src: '/images/r8/r8-hinten-fahrer.jpg', label: 'Audi R8', category: 'Audi' },
  { src: '/images/r8/r8-hinten-beifahrer.jpg', label: 'Audi R8', category: 'Audi' },
  { src: '/images/r8/r8-innenraum.jpg', label: 'Audi R8 – Innenraum', category: 'Audi' },
  // Porsche Carrera
  { src: '/images/carrera/carrera-vorne-fahrer.jpg', label: 'Porsche Carrera', category: 'Porsche' },
  { src: '/images/carrera/carrera-vorne-beifahrer.jpg', label: 'Porsche Carrera', category: 'Porsche' },
  { src: '/images/carrera/carrera-hinten-auspuff.jpg', label: 'Porsche Carrera – Auspuff', category: 'Porsche' },
  { src: '/images/carrera/carrera-innenraum.jpg', label: 'Porsche Carrera – Innenraum', category: 'Porsche' },
  { src: '/images/carrera/carrera-lenkrad.jpg', label: 'Porsche Carrera – Lenkrad', category: 'Porsche' },
  { src: '/images/carrera/carrera-emblem.jpg', label: 'Porsche Carrera – Emblem', category: 'Porsche' },
  // Dodge
  { src: '/images/dodge/dodge-vorne-fahrer.jpg', label: 'Dodge', category: 'Weitere' },
  { src: '/images/dodge/dodge-vorne-beifahrer.jpg', label: 'Dodge', category: 'Weitere' },
  { src: '/images/dodge/dodge-innenraum.jpg', label: 'Dodge – Innenraum', category: 'Weitere' },
  // Fiat
  { src: '/images/fiat/fiat-vorne-fahrer.jpg', label: 'Fiat', category: 'Weitere' },
  { src: '/images/fiat/fiat-vorne-beifahrer.jpg', label: 'Fiat', category: 'Weitere' },
  { src: '/images/fiat/fiat-vorne-beifahrer-2.jpg', label: 'Fiat', category: 'Weitere' },
  { src: '/images/fiat/fiat-beifahrer-hinten.jpg', label: 'Fiat', category: 'Weitere' },
  { src: '/images/fiat/fiat-hinten-emblem.jpg', label: 'Fiat – Emblem', category: 'Weitere' },
]

const categories = ['Alle', 'BMW', 'Mercedes', 'Audi', 'Porsche', 'Weitere']

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 12) * 0.04 }}
      className="group relative overflow-hidden cursor-pointer bg-gray-100 aspect-[4/3]"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/55 transition-colors duration-300 flex items-end justify-between p-4">
        <span className="text-white font-heading font-bold text-sm uppercase tracking-wider translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {item.label}
        </span>
        <div className="w-8 h-8 bg-gold/0 group-hover:bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white">
            <path d="M7 3H3V7M17 3H13M3 13V17H7M13 17H17V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function GaleriePage() {
  const [active, setActive] = useState('Alle')
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; index: number } | null>(null)

  const filtered = active === 'Alle' ? allItems : allItems.filter((i) => i.category === active)

  const openLightbox = useCallback(
    (item: GalleryItem) => {
      setLightbox({ item, index: filtered.indexOf(item) })
    },
    [filtered]
  )

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return
    const newIdx = (lightbox.index + dir + filtered.length) % filtered.length
    setLightbox({ item: filtered[newIdx], index: newIdx })
  }

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/m3-2/m3-vorne.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors font-heading font-bold text-xs uppercase tracking-widest mb-8"
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Zurück zur Startseite
            </Link>
            <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
              Baatz Performance
            </p>
            <h1 className="font-heading font-black text-4xl md:text-6xl uppercase text-white mt-2 leading-tight">
              Unsere Arbeit –<br />
              <span className="text-gold">Ihr Ergebnis</span>
            </h1>
            <p className="text-white/60 mt-5 max-w-xl text-lg leading-relaxed">
              Jedes Fahrzeug erzählt eine Geschichte. Hier sehen Sie, wie wir Leidenschaft,
              Präzision und Erfahrung in makellose Ergebnisse verwandeln – Fahrzeug für Fahrzeug.
            </p>
            <div className="flex items-center gap-6 mt-8">
              <div className="text-center">
                <p className="font-heading font-black text-3xl text-white">{allItems.length}+</p>
                <p className="text-white/40 text-xs font-heading uppercase tracking-wider">Fotos</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="font-heading font-black text-3xl text-white">12</p>
                <p className="text-white/40 text-xs font-heading uppercase tracking-wider">Fahrzeuge</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="font-heading font-black text-3xl text-white">5</p>
                <p className="text-white/40 text-xs font-heading uppercase tracking-wider">Marken</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-heading font-bold text-xs uppercase tracking-wider px-5 py-2.5 border transition-all duration-200 ${
                  active === cat
                    ? 'bg-gold border-gold text-white'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
                <span className="ml-2 text-[10px] opacity-60">
                  ({cat === 'Alle' ? allItems.length : allItems.filter((i) => i.category === cat).length})
                </span>
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <GalleryCard item={item} index={i} onClick={() => openLightbox(item)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 bg-cream border border-gray-100 p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="font-heading font-black text-xl uppercase tracking-tight text-charcoal">
                Soll Ihr Fahrzeug das Nächste sein?
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Kontaktieren Sie uns für ein unverbindliches Angebot.
              </p>
            </div>
            <Link href="/#kontakt" className="btn-primary flex-shrink-0">
              Jetzt anfragen
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <motion.div
              key={lightbox.item.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}${lightbox.item.src}`}
                alt={lightbox.item.label}
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />
              <p className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center py-2 font-heading text-sm uppercase tracking-wider">
                {lightbox.item.label}
              </p>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 font-heading text-xs">
              {lightbox.index + 1} / {filtered.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
