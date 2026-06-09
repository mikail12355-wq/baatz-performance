'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Anfrage von ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nTelefon: ${form.phone}\n\nNachricht:\n${form.message}`
    )
    window.location.href = `mailto:info@baatz-performance.de?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
            Kontakt
          </p>
          <h2 className="section-title mt-2">Anfrage senden</h2>
          <span className="gold-line" />
          <p className="section-subtitle mt-4">
            Bereit für eine professionelle Aufbereitung? Schreiben Sie uns – wir melden uns schnell zurück.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <motion.div
            style={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8"
          >
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                ),
                label: 'Telefon',
                value: 'Bitte eintragen',
                href: 'tel:+49',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                ),
                label: 'E-Mail',
                value: 'info@baatz-performance.de',
                href: 'mailto:info@baatz-performance.de',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                ),
                label: 'Standort',
                value: 'Alte Str. 6, 14542 Werder (Havel)-Glindow',
                href: 'https://maps.google.com/?q=Alte+Str.+6,+14542+Werder+Havel+Glindow',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
                label: 'Facebook',
                value: 'Baatz Performance',
                href: 'https://www.facebook.com/LackKratzerDellenPflege/',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                ),
                label: 'Instagram',
                value: '@baatzperformance',
                href: 'https://www.instagram.com/baatzperformance',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                ),
                label: 'YouTube',
                value: '@baatzperformance',
                href: 'https://www.youtube.com/@baatzperformance',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
                  </svg>
                ),
                label: 'TikTok',
                value: '@baatzperformance',
                href: 'https://www.tiktok.com/@baatzperformance',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 transition-colors group-hover:bg-gold group-hover:text-white duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">
                    {item.label}
                  </p>
                  <p className="font-body text-charcoal font-medium mt-0.5">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            style={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div>
              <label className="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 block mb-2">
                Ihr Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 bg-white px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors font-body"
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label className="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 block mb-2">
                Telefon / WhatsApp
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 bg-white px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors font-body"
                placeholder="+49 ..."
              />
            </div>
            <div>
              <label className="font-heading font-bold text-xs uppercase tracking-wider text-gray-500 block mb-2">
                Nachricht
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 bg-white px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors font-body resize-none"
                placeholder="Beschreiben Sie Ihr Fahrzeug und gewünschte Leistung..."
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              {sent ? 'E-Mail-App öffnet sich ...' : 'Anfrage absenden'}
            </button>
            <p className="text-gray-400 text-xs">
              Alternativ direkt auf Facebook schreiben oder anrufen – wir antworten schnell.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
