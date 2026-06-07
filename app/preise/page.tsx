'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'

// ─── Daten ────────────────────────────────────────────────────────────────────

const packages = [
  {
    name: 'Basic',
    subtitle: 'Basisaufbereitung',
    price: 'ab XX €',
    highlight: false,
    description: 'Ideal für eine schnelle, gründliche Auffrischung – innen wie außen.',
    features: ['Handwäsche außen', 'Felgen & Reifenpflege', 'Scheibenreinigung', 'Innenraumstaubsaugen', 'Armaturenpflege', 'Dufterfrischung'],
    notIncluded: ['Polierung', 'Lederversiegelung', 'Keramikbeschichtung'],
  },
  {
    name: 'Standard',
    subtitle: 'Komplettaufbereitung',
    price: 'ab XX €',
    highlight: true,
    description: 'Unsere meistgebuchte Leistung – perfektes Ergebnis für den Alltag.',
    features: ['Alles aus Basic', 'Lackversiegelung', 'Scheibenversiegelung', 'Polstertiefenreinigung', 'Lederreinigung & -pflege', 'Motor-Außenreinigung', 'Reifenglanz'],
    notIncluded: ['Maschinenpolish', 'Keramikbeschichtung'],
  },
  {
    name: 'Premium',
    subtitle: 'Premium Detailing',
    price: 'ab XX €',
    highlight: false,
    description: 'Maximaler Glanz und Schutz – für Fahrzeuge mit höchstem Anspruch.',
    features: ['Alles aus Standard', 'Maschinenpolish (1-stufig)', 'Lackkorrektur (Swirls)', 'Hochwertige Lackversiegelung', 'Lederversiegelung', 'Kunststoffpflege innen & außen', 'Motorraum-Detailing'],
    notIncluded: ['Keramikbeschichtung'],
  },
  {
    name: 'Keramik',
    subtitle: 'Keramik-Beschichtung',
    price: 'auf Anfrage',
    highlight: false,
    description: 'Langlebiger Nano-Schutz für bis zu 5 Jahre – das Beste für Ihren Lack.',
    features: ['Lackkorrektur (mehrstufig)', 'Professionelle Nano-Keramik', 'Bis zu 5 Jahre Schutz', 'Hydrophober Lotuseffekt', 'UV- & Oxidationsschutz', 'Scheibenversiegelung', 'Felgenbeschichtung'],
    notIncluded: [],
  },
]

const singleServices = [
  { category: 'Außen', items: [
    { name: 'Handwäsche', price: 'ab XX €' },
    { name: 'Scheibenversiegelung', price: 'ab XX €' },
    { name: 'Lackversiegelung', price: 'ab XX €' },
    { name: 'Maschinenpolish (1-stufig)', price: 'ab XX €' },
    { name: 'Maschinenpolish (2-stufig)', price: 'ab XX €' },
    { name: 'Felgenpflege', price: 'ab XX €' },
    { name: 'Reifenglanz', price: 'ab XX €' },
  ]},
  { category: 'Innen', items: [
    { name: 'Innenraumreinigung', price: 'ab XX €' },
    { name: 'Polsterreinigung', price: 'ab XX €' },
    { name: 'Lederreinigung & -pflege', price: 'ab XX €' },
    { name: 'Lederversiegelung', price: 'ab XX €' },
    { name: 'Dachhimmelreinigung', price: 'ab XX €' },
    { name: 'Geruchsbeseitigung', price: 'ab XX €' },
  ]},
  { category: 'Sonderdienste', items: [
    { name: 'Motorraum-Reinigung', price: 'ab XX €' },
    { name: 'Teerflecken-Entfernung', price: 'ab XX €' },
    { name: 'Hagelschadenpolitur', price: 'auf Anfrage' },
    { name: 'Tierhaarentfernung', price: 'ab XX €' },
    { name: 'Keramikbeschichtung', price: 'auf Anfrage' },
  ]},
]

const vehicleClasses = [
  { label: 'Kleinwagen', example: 'Polo, Fiesta, A1', factor: 'Grundpreis' },
  { label: 'Kompaktklasse', example: 'Golf, A3, 1er', factor: 'Grundpreis' },
  { label: 'Mittelklasse', example: 'Passat, A4, 3er', factor: '+ ca. 10–20 %' },
  { label: 'Oberklasse', example: 'S-Klasse, A8, 7er', factor: '+ ca. 20–35 %' },
  { label: 'SUV / Van', example: 'Cayenne, X5, Touareg', factor: '+ ca. 20–30 %' },
]

// ─── Komponenten ──────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold flex-shrink-0">
      <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gray-300 flex-shrink-0">
      <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  return (
    <Reveal delay={index * 80}>
      <div className={`relative flex flex-col border h-full ${
        pkg.highlight
          ? 'border-gold bg-charcoal text-white shadow-xl shadow-gold/10'
          : 'border-gray-100 bg-white text-charcoal'
      }`}>
        {pkg.highlight && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="bg-gold text-white font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1">
              Beliebteste Wahl
            </span>
          </div>
        )}
        <div className={`h-1 w-full ${pkg.highlight ? 'bg-gradient-gold' : 'bg-gray-100'}`} />
        <div className="p-6 flex flex-col flex-1">
          <p className={`font-heading font-bold text-[11px] uppercase tracking-[0.2em] mb-1 ${pkg.highlight ? 'text-gold' : 'text-gold/80'}`}>
            {pkg.subtitle}
          </p>
          <h3 className={`font-heading font-black text-xl uppercase tracking-tight ${pkg.highlight ? 'text-white' : 'text-charcoal'}`}>
            {pkg.name}
          </h3>
          <div className="mt-4 mb-4">
            <span className={`font-heading font-black text-3xl ${pkg.highlight ? 'text-white' : 'text-charcoal'}`}>
              {pkg.price}
            </span>
            {pkg.price !== 'auf Anfrage' && (
              <span className={`text-xs ml-1 ${pkg.highlight ? 'text-white/50' : 'text-gray-400'}`}>
                (Kl. Kompakt)
              </span>
            )}
          </div>
          <p className={`text-sm leading-relaxed mb-5 ${pkg.highlight ? 'text-white/60' : 'text-gray-500'}`}>
            {pkg.description}
          </p>
          <ul className="space-y-2.5 flex-1">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <CheckIcon />
                <span className={pkg.highlight ? 'text-white/80' : 'text-gray-600'}>{f}</span>
              </li>
            ))}
            {pkg.notIncluded.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <CrossIcon />
                <span className="text-gray-300 line-through">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/#kontakt"
            className={`mt-6 flex items-center justify-center gap-2 font-heading font-bold text-sm uppercase tracking-wider py-3.5 transition-all duration-200 ${
              pkg.highlight
                ? 'bg-gold text-white hover:bg-gold-dark'
                : 'bg-cream text-charcoal border border-gray-200 hover:border-gold hover:text-gold'
            }`}
          >
            Jetzt anfragen
          </Link>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreisePage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#C8A951_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors font-heading font-bold text-xs uppercase tracking-widest mb-8"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zurück zur Startseite
          </Link>
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
            Transparent & fair
          </p>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl uppercase text-white mt-2 leading-none">
            Unsere<br /><span className="text-gold">Preise</span>
          </h1>
          <p className="text-white/50 mt-5 max-w-xl text-base sm:text-lg leading-relaxed">
            Klare Preise, keine versteckten Kosten. Alle Pakete können individuell
            angepasst werden – sprechen Sie uns einfach an.
          </p>
          <div className="mt-4 flex items-start gap-2 text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-4 py-2 text-sm font-body max-w-full sm:max-w-lg">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0 mt-0.5">
              <path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
            </svg>
            <span>Platzhalterpreise – bitte mit Ihren tatsächlichen Preisen befüllen</span>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">Pakete</p>
            <h2 className="section-title mt-2">{'Aufbereitungs­pakete'}</h2>
            <span className="gold-line" />
            <p className="section-subtitle mt-4">
              Wählen Sie das passende Paket für Ihr Fahrzeug. Alle Preise verstehen sich als Richtwerte –
              die genauen Kosten hängen von Fahrzeuggröße und Zustand ab.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Single services */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">Einzelleistungen</p>
            <h2 className="section-title mt-2">À-la-carte</h2>
            <span className="gold-line" />
            <p className="section-subtitle mt-4">
              Sie möchten nur einzelne Leistungen buchen? Kein Problem – alles ist auch separat buchbar.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {singleServices.map((cat, ci) => (
              <Reveal key={cat.category} delay={ci * 80}>
                <div>
                  <h3 className="font-heading font-black text-sm uppercase tracking-[0.2em] text-gold border-b border-gold/20 pb-3 mb-4">
                    {cat.category}
                  </h3>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-600 font-body">{item.name}</span>
                        <span className="font-heading font-bold text-sm text-charcoal flex-shrink-0">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle classes */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-10">
            <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">Hinweis</p>
            <h2 className="section-title mt-2">{'Fahrzeug­klassen'}</h2>
            <span className="gold-line" />
            <p className="section-subtitle mt-4">
              Der Aufwand variiert je nach Fahrzeuggröße. Die angegebenen Preise gelten als Basis für die Kompaktklasse.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[400px] bg-white border border-gray-100">
                <thead>
                  <tr className="bg-charcoal text-white">
                    <th className="text-left font-heading font-bold text-xs uppercase tracking-wider px-4 sm:px-6 py-4">Klasse</th>
                    <th className="text-left font-heading font-bold text-xs uppercase tracking-wider px-4 sm:px-6 py-4">Beispiele</th>
                    <th className="text-left font-heading font-bold text-xs uppercase tracking-wider px-4 sm:px-6 py-4">Preisanpassung</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleClasses.map((vc, i) => (
                    <tr key={vc.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 sm:px-6 py-4 font-heading font-bold text-sm text-charcoal whitespace-nowrap">{vc.label}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 font-body">{vc.example}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`font-heading font-bold text-sm whitespace-nowrap ${vc.factor === 'Grundpreis' ? 'text-gold' : 'text-charcoal'}`}>
                          {vc.factor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-charcoal">
        <Reveal className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm mb-3">
            Unverbindlich
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white">
            Preis anfragen
          </h2>
          <p className="text-white/50 mt-4 leading-relaxed text-sm sm:text-base">
            Nicht sicher, welches Paket passt? Kontaktieren Sie uns – wir beraten Sie gerne
            und erstellen ein individuelles Angebot für Ihr Fahrzeug.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/#kontakt" className="btn-primary">
              Kostenlos anfragen
            </Link>
            <a
              href="https://www.facebook.com/LackKratzerDellenPflege/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Auf Facebook schreiben
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}
