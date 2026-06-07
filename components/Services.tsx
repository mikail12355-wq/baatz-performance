'use client'

import Reveal from './Reveal'

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 36C8 36 12 28 24 28C36 28 40 36 40 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M24 28V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M6 40H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M14 36L12 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M34 36L36 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Fahrzeugaufbereitung',
    description: 'Komplette Innen- und Außenreinigung Ihres Fahrzeugs. Von der gründlichen Wäsche bis zur detaillierten Aufbereitung – Ihr Auto strahlt wie neu.',
    features: ['Außenwäsche & Trocknung', 'Innenreinigung', 'Polsteraufbereitung', 'Scheibenversiegelung'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Lackpflege',
    description: 'Kratzer, Swirls und matte Stellen gehören der Vergangenheit an. Mit professioneller Politur bringen wir Ihren Lack zum Strahlen.',
    features: ['Lackanalyse', 'Maschinenpolish', 'Kratzerentfernung', 'Lackversiegelung'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6C24 6 38 14 38 26C38 34.837 31.732 42 24 42C16.268 42 10 34.837 10 26C10 14 24 6 24 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M24 16C24 16 32 21 32 28C32 33.523 28.418 38 24 38C19.582 38 16 33.523 16 28C16 21 24 16 24 16Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'Keramik-Beschichtung',
    description: 'Die langlebigste Schutzlösung für Ihren Lack. Unsere Nano-Keramikbeschichtung schützt bis zu 5 Jahre und verleiht einen tiefen Glanz.',
    features: ['Nano-Keramik', 'Bis zu 5 Jahre Schutz', 'Hydrophober Effekt', 'UV-Schutz'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M29 29L42 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M15 20H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 15V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Detailing',
    description: 'Höchste Präzision und Liebe zum Detail. Jede Ecke, jede Fuge, jede Oberfläche – wir sorgen für ein Ergebnis, das perfektionistisch ist.',
    features: ['Engine Bay Reinigung', 'Reifenpflege', 'Metallpolitur', 'Lederversiegelung'],
  },
]

export default function Services() {
  return (
    <section id="leistungen" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">Was wir bieten</p>
          <h2 className="section-title mt-2">Unsere Leistungen</h2>
          <span className="gold-line" />
          <p className="section-subtitle mt-4">
            Von der Basisaufbereitung bis zur professionellen Keramik-Beschichtung –
            wir bieten alles, was Ihr Fahrzeug verdient.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group bg-white border border-gray-100 p-8 hover:border-gold hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <div className="text-gold mb-6">{s.icon}</div>
                <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-charcoal mb-3 hyphens-auto break-words" lang="de">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
