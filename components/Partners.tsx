'use client'

import { useState } from 'react'
import Reveal from './Reveal'

const partners = [
  {
    name: 'Waschguru.de',
    url: 'https://www.waschguru.de',
    category: 'Reinigung & Pflege',
    desc: 'Premium-Waschmittel, Polituren und Pflegeprodukte für den professionellen Einsatz. Alles, was ein gepflegtes Fahrzeug braucht.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 28C8 28 10 20 20 20C30 20 32 28 32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 28V32H28V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 12C16 12 17 8 20 8C23 8 24 12 24 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Safe-Shield.eu',
    url: 'https://www.safe-shield.eu',
    category: 'Lackschutz & Folien',
    desc: 'Hochwertige Schutzfolien, Paint Protection Film und Lackschutzprodukte für dauerhaften Schutz Ihrer Fahrzeuglackierung.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4L34 10V22C34 29.732 27.732 36 20 36C12.268 36 6 29.732 6 22V10L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Dampfdrache.shop',
    url: 'https://www.dampfdrache.shop',
    category: 'Dampfreinigung',
    desc: 'Professionelle Dampfreiniger und Zubehör für die gründliche Innenraum- und Außenreinigung ohne aggressive Chemikalien.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M12 32C12 32 8 26 8 20C8 14 12 10 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 8C28 10 32 14 32 20C32 26 28 32 28 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 18C16 18 18 14 20 14C22 14 24 18 24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 24H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 28H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function CopyButton() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('BAATZ10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wider px-6 py-3 transition-all duration-200 ${
        copied ? 'bg-green-500 text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'
      }`}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"/>
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" fill="currentColor"/>
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" fill="currentColor"/>
          </svg>
          Code kopieren
        </>
      )}
    </button>
  )
}

export default function Partners() {
  return (
    <section id="partner" className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
              Unsere Kooperationen
            </p>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight text-white mt-2">
              Partner & Rabatte
            </h2>
            <span className="block w-16 h-1 bg-gold mt-4" />
            <p className="text-white/50 mt-4 max-w-xl">
              Als Baatz Performance Kunde profitieren Sie von exklusiven Rabatten
              bei unseren vertrauenswürdigen Partnern.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="border border-gold/40 bg-white/5 px-6 py-5 text-center min-w-[200px]">
              <p className="text-white/50 font-body text-xs mb-1">Rabattcode</p>
              <p className="font-heading font-black text-3xl text-gold tracking-[0.2em]">BAATZ10</p>
              <p className="text-white/40 text-xs font-body mt-1">10 % auf alle Bestellungen</p>
              <div className="mt-3">
                <CopyButton />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 border border-white/10 hover:border-gold hover:bg-white/10 p-7 transition-all duration-300 flex flex-col gap-5 h-full"
              >
                <div className="flex items-start justify-between">
                  <div className="text-gold">{p.icon}</div>
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors">
                    <path d="M6 4H4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-[11px] uppercase tracking-[0.2em] text-gold/70 mb-1">
                    {p.category}
                  </p>
                  <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide group-hover:text-gold transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-gold/70 group-hover:text-gold transition-colors">
                  <span className="font-heading font-bold text-xs uppercase tracking-wider">Shop besuchen</span>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 transition-transform group-hover:translate-x-1">
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-white/30 text-xs text-center mt-10" delay={200}>
          Code <span className="text-gold font-heading font-bold tracking-widest">BAATZ10</span> einfach im Checkout eingeben · Gilt auf alle Produkte der Partnershops
        </Reveal>
      </div>
    </section>
  )
}
