'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Leistungen', anchor: 'leistungen' },
  { label: 'Galerie', page: '/galerie' },
  { label: 'Videos', anchor: 'videos' },
  { label: 'Termin', anchor: 'termin' },
  { label: 'Preise', page: '/preise' },
  { label: 'Partner', anchor: 'partner' },
  { label: 'Über uns', anchor: 'ueber-uns' },
  { label: 'Kontakt', anchor: 'kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Anchor links get '/#anchor' outside of homepage
  const getHref = (link: { anchor?: string; page?: string }) => {
    if (link.page) return link.page
    return isHome ? `#${link.anchor}` : `/#${link.anchor}`
  }

  const contactHref = isHome ? '#kontakt' : '/#kontakt'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href={isHome ? '#' : '/'}
          className={`font-heading font-black text-xl uppercase tracking-widest transition-colors duration-300 ${
            scrolled ? 'text-charcoal' : 'text-white'
          }`}
        >
          Baatz<span className="text-gold">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const href = getHref(l)
            const isActive = l.page && pathname === l.page
            return (
              <Link
                key={l.label}
                href={href}
                className={`font-heading font-semibold text-sm uppercase tracking-wider transition-colors duration-200 hover:text-gold ${
                  isActive ? 'text-gold' : scrolled ? 'text-charcoal' : 'text-white/90'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <Link href={contactHref} className="btn-primary !py-2.5 !px-6 text-xs">
            Anfrage senden
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden flex flex-col gap-1.5 p-1 ${scrolled ? 'text-charcoal' : 'text-white'}`}
          aria-label="Menü"
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <Link
              key={l.label}
              href={getHref(l)}
              onClick={() => setOpen(false)}
              className="font-heading font-bold text-sm uppercase tracking-wider text-charcoal hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="btn-primary self-start !py-2.5 !px-6 text-xs"
          >
            Anfrage senden
          </Link>
        </nav>
      </div>
    </header>
  )
}
