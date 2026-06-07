'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    id: 'Fahrzeugaufbereitung',
    label: 'Fahrzeugaufbereitung',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
        <path d="M4 18C4 18 6 13 14 13C22 13 24 18 24 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 18V21H21V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="21" r="1.5" fill="currentColor"/>
        <circle cx="19" cy="21" r="1.5" fill="currentColor"/>
        <path d="M14 13V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'Lackpflege',
    label: 'Lackpflege',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
        <path d="M14 3L16.5 10H24L18 14.5L20.5 21.5L14 17L7.5 21.5L10 14.5L4 10H11.5L14 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'Keramik-Beschichtung',
    label: 'Keramik-Beschichtung',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
        <path d="M14 3C14 3 23 8 23 16C23 21.523 18.971 26 14 26C9.029 26 5 21.523 5 16C5 8 14 3 14 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 10C14 10 19 13 19 17C19 19.761 16.761 22 14 22" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    id: 'Detailing',
    label: 'Detailing',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M17 17L24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 12H15M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'Beratung',
    label: 'Beratung',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
        <path d="M4 6C4 4.895 4.895 4 6 4H22C23.105 4 24 4.895 24 6V18C24 19.105 23.105 20 22 20H8L4 24V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 11H19M9 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

type Step = 'service' | 'datetime' | 'contact' | 'done'

export default function Booking() {

  const [step, setStep] = useState<Step>('service')
  const [form, setForm] = useState({
    service: '',
    vehicle: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStep('done')
      } else {
        const d = await res.json()
        setError(d.error ?? 'Fehler beim Absenden')
      }
    } catch {
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    }
    setSubmitting(false)
  }

  const inputCls = 'w-full border border-gray-200 bg-white px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors font-body text-sm'
  const labelCls = 'font-heading font-bold text-xs uppercase tracking-wider text-gray-400 block mb-2'

  return (
    <section id="termin" className="py-24 bg-charcoal">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
            Online Buchung
          </p>
          <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight text-white mt-2">
            Termin buchen
          </h2>
          <span className="block w-16 h-1 bg-gold mt-4 mx-auto" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Buchen Sie Ihren Termin bequem online. Wir melden uns zur Bestätigung bei Ihnen.
          </p>
        </motion.div>

        {/* Steps indicator */}
        {step !== 'done' && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {(['service', 'datetime', 'contact'] as Step[]).map((s, i) => {
              const stepIndex = ['service', 'datetime', 'contact'].indexOf(step)
              const done = i < stepIndex
              const active = s === step
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all ${
                    active ? 'bg-gold text-white' : done ? 'bg-gold/30 text-gold' : 'bg-white/10 text-white/30'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`font-heading font-bold text-xs uppercase tracking-wider hidden sm:block ${
                    active ? 'text-white' : done ? 'text-gold/60' : 'text-white/30'
                  }`}>
                    {s === 'service' ? 'Leistung' : s === 'datetime' ? 'Datum & Zeit' : 'Kontakt'}
                  </span>
                  {i < 2 && <div className={`w-8 h-px mx-1 ${i < stepIndex ? 'bg-gold/30' : 'bg-white/10'}`} />}
                </div>
              )
            })}
          </div>
        )}

        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white"
        >

          {/* ── Step 1: Service ── */}
          {step === 'service' && (
            <div className="p-8">
              <h3 className="font-heading font-black text-lg uppercase tracking-tight text-charcoal mb-6">
                Welche Leistung wünschen Sie?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => set('service', s.id)}
                    className={`flex flex-col items-center gap-3 p-4 border-2 transition-all duration-200 text-center ${
                      form.service === s.id
                        ? 'border-gold bg-gold/5 text-gold'
                        : 'border-gray-100 text-gray-400 hover:border-gold/50 hover:text-gold'
                    }`}
                  >
                    {s.icon}
                    <span className="font-heading font-bold text-xs uppercase tracking-wide leading-tight hyphens-auto break-words w-full text-center" lang="de">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className={labelCls}>Fahrzeug (Marke & Modell) *</label>
                <input
                  value={form.vehicle}
                  onChange={(e) => set('vehicle', e.target.value)}
                  placeholder="z. B. BMW M4, Porsche 911, Mercedes C-AMG"
                  className={inputCls}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep('datetime')}
                  disabled={!form.service || !form.vehicle}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Weiter
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Datum & Zeit ── */}
          {step === 'datetime' && (
            <div className="p-8">
              <h3 className="font-heading font-black text-lg uppercase tracking-tight text-charcoal mb-6">
                Wann soll der Termin sein?
              </h3>

              <div className="mb-6">
                <label className={labelCls}>Datum *</label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => { set('date', e.target.value); set('time', '') }}
                  className={inputCls}
                />
              </div>

              <div className="mb-8">
                <label className={labelCls}>Uhrzeit *</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => set('time', t)}
                      className={`py-2.5 font-heading font-bold text-sm border-2 transition-all duration-150 ${
                        form.time === t
                          ? 'bg-gold border-gold text-white'
                          : 'bg-white border-gray-100 text-gray-500 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep('service')} className="flex items-center gap-2 text-gray-400 hover:text-charcoal font-heading font-bold text-sm uppercase tracking-wider transition-colors">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Zurück
                </button>
                <button
                  onClick={() => setStep('contact')}
                  disabled={!form.date || !form.time}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Weiter
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Kontakt ── */}
          {step === 'contact' && (
            <div className="p-8">
              <h3 className="font-heading font-black text-lg uppercase tracking-tight text-charcoal mb-2">
                Ihre Kontaktdaten
              </h3>

              {/* Summary */}
              <div className="bg-cream border border-gray-100 px-4 py-3 mb-6 flex flex-wrap gap-4 text-sm">
                <span className="text-gray-500">Leistung: <strong className="text-charcoal">{form.service}</strong></span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">Fahrzeug: <strong className="text-charcoal">{form.vehicle}</strong></span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">Termin: <strong className="text-charcoal">{new Date(form.date).toLocaleDateString('de-DE')} um {form.time} Uhr</strong></span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Max Mustermann" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Telefon / WhatsApp *</label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+49 ..." className={inputCls} />
                </div>
              </div>
              <div className="mb-4">
                <label className={labelCls}>E-Mail</label>
                <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="email@beispiel.de" className={inputCls} />
              </div>
              <div className="mb-6">
                <label className={labelCls}>Anmerkungen (optional)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Besondere Wünsche, Zustand des Fahrzeugs, ..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex justify-between items-center">
                <button onClick={() => setStep('datetime')} className="flex items-center gap-2 text-gray-400 hover:text-charcoal font-heading font-bold text-sm uppercase tracking-wider transition-colors">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Zurück
                </button>
                <button
                  onClick={submit}
                  disabled={!form.name || !form.phone || submitting}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? 'Wird gesendet...' : 'Termin anfragen'}
                </button>
              </div>
            </div>
          )}

          {/* ── Done ── */}
          {step === 'done' && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-green-500">
                  <path d="M6 16L13 23L26 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-charcoal mb-3">
                Anfrage gesendet!
              </h3>
              <p className="text-gray-500 mb-2">
                Vielen Dank, <strong>{form.name}</strong>. Ihre Terminanfrage ist bei uns eingegangen.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Wir melden uns in Kürze unter <strong>{form.phone}</strong> zur Bestätigung.
              </p>
              <button
                onClick={() => { setStep('service'); setForm({ service:'', vehicle:'', date:'', time:'', name:'', phone:'', email:'', message:'' }) }}
                className="btn-primary"
              >
                Weiteren Termin buchen
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
