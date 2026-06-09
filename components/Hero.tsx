'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/r8/r8-innenraum.jpg"
          alt="Baatz Performance – Fahrzeugaufbereitung"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="font-heading font-black text-white uppercase leading-none tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Baatz</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold">Performance</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-lg font-body leading-relaxed">
            Professionelle Fahrzeugaufbereitung, Lackpflege und Keramik-Beschichtung –
            für Fahrzeuge, die sich abheben.
          </p>
          <motion.div
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a href="#kontakt" className="btn-primary">
              Jetzt anfragen
            </a>
            <a href="#galerie" className="btn-outline">
              Galerie ansehen
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/50 font-heading text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-px h-12 bg-white/30 origin-top"
          animate={{ scaleY: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
