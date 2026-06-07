'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type GalleryItem = { src: string; label: string; category: string }

const featuredItems: GalleryItem[] = [
  { src: '/images/carrera/carrera-vorne-fahrer.jpg', label: 'Porsche Carrera', category: 'Porsche' },
  { src: '/images/r8/r8-vorne.jpg', label: 'Audi R8', category: 'Audi' },
  { src: '/images/M4/m3-vorne-fahrer.jpg', label: 'BMW M4', category: 'BMW' },
  { src: '/images/c-amg/c-amg-vorne-fahrer.jpg', label: 'Mercedes C-AMG', category: 'Mercedes' },
  { src: '/images/7er/7er-vorne.jpg', label: 'BMW 7er', category: 'BMW' },
  { src: '/images/r8/r8-innenraum.jpg', label: 'Audi R8 – Innenraum', category: 'Audi' },
  { src: '/images/m3-2/m3-vorne.jpg', label: 'BMW M3', category: 'BMW' },
  { src: '/images/carrera/carrera-innenraum.jpg', label: 'Porsche Carrera – Innenraum', category: 'Porsche' },
  { src: '/images/audi/audi-vorne-fahrer.jpg', label: 'Audi', category: 'Audi' },
  { src: '/images/e46/e46-vorne.jpg', label: 'BMW E46', category: 'BMW' },
  { src: '/images/dodge/dodge-vorne-fahrer.jpg', label: 'Dodge', category: 'Weitere' },
  { src: '/images/3er/3er-vorne-fahrer.jpg', label: 'BMW 3er', category: 'BMW' },
]

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      style={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-end justify-between p-4">
        <span className="text-white font-heading font-bold text-sm uppercase tracking-wider translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {item.label}
        </span>
        <div className="w-8 h-8 bg-gold/0 group-hover:bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white">
            <path d="M7 3H3V7M17 3H13M3 13V17H7M13 17H17V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const navigate = (dir: 1 | -1) => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + dir + featuredItems.length) % featuredItems.length
    )
  }

  const current = lightboxIndex !== null ? featuredItems[lightboxIndex] : null

  return (
    <section id="galerie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
            Unsere Arbeit
          </p>
          <h2 className="section-title mt-2">Galerie</h2>
          <span className="gold-line" />
          <p className="section-subtitle mt-4">
            Eine Auswahl unserer aufbereiteten Fahrzeuge – von der BMW bis zum Porsche.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {featuredItems.map((item, i) => (
            <GalleryCard
              key={item.src}
              item={item}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <p className="text-gray-400 font-body text-sm">
            Über 60 aufbereitete Fahrzeuge warten auf Sie
          </p>
          <Link href="/galerie" className="btn-primary group">
            Alle Fotos ansehen
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.label}
                width={1600}
                height={1200}
                className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
                unoptimized
              />
              <p className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center py-2 font-heading text-sm uppercase tracking-wider">
                {current.label}
              </p>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Counter */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 font-heading text-xs">
              {lightboxIndex! + 1} / {featuredItems.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
