'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const partners = [
  { name: 'Waschguru', url: 'https://www.waschguru.de', desc: 'Profi-Waschmittel & Pflegeprodukte' },
  { name: 'Safe-Shield', url: 'https://www.safe-shield.eu', desc: 'Schutzfolien & Lackschutz' },
  { name: 'Dampfdrache', url: 'https://www.dampfdrache.shop', desc: 'Dampfreiniger & Zubehör' },
]

export default function PartnerBanner() {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('partner_banner_dismissed')) return
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('partner_banner_dismissed', '1')
  }

  const copyCode = () => {
    navigator.clipboard.writeText('BAATZ10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop + centering container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={dismiss}
          >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[520px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top bar */}
            <div className="h-1.5 bg-gradient-gold w-full" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="font-heading font-bold text-gold uppercase tracking-[0.2em] text-xs">
                    Exklusiv für Baatz-Kunden
                  </p>
                  <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-charcoal mt-1">
                    10 % Rabatt bei unseren Partnern
                  </h2>
                </div>
                <button
                  onClick={dismiss}
                  className="text-gray-300 hover:text-charcoal transition-colors flex-shrink-0 mt-0.5"
                  aria-label="Schließen"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Code */}
              <div className="flex items-center gap-3 bg-cream border border-gold/30 px-5 py-4 mb-6">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-body mb-0.5">Dein Rabattcode</p>
                  <p className="font-heading font-black text-2xl text-charcoal tracking-widest">
                    BAATZ10
                  </p>
                </div>
                <button
                  onClick={copyCode}
                  className={`font-heading font-bold text-xs uppercase tracking-wider px-4 py-2.5 transition-all duration-200 flex items-center gap-2 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gold text-white hover:bg-gold-dark'
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
              </div>

              {/* Partners */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {partners.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-gray-100 hover:border-gold p-3 text-center transition-all duration-200 hover:shadow-sm"
                  >
                    <p className="font-heading font-black text-sm text-charcoal group-hover:text-gold transition-colors uppercase tracking-wide">
                      {p.name}
                    </p>
                    <p className="text-gray-400 text-[11px] mt-1 leading-tight">{p.desc}</p>
                    <p className="text-gold text-[10px] font-heading font-bold uppercase tracking-wider mt-2">
                      Shop besuchen →
                    </p>
                  </a>
                ))}
              </div>

              <button
                onClick={dismiss}
                className="w-full text-center text-gray-300 hover:text-gray-500 font-heading font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Schließen
              </button>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
