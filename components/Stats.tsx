'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / 60
    const timer = setInterval(() => {
      start += step
      if (start >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])

  return (
    <span ref={ref} className="font-heading font-black text-4xl md:text-5xl text-white whitespace-nowrap">
      {count.toLocaleString('de-DE')}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: '+', label: 'Aufbereitungen', note: 'Fahrzeuge erfolgreich aufbereitet' },
  { value: 74000, suffix: '+', label: 'Follower', note: 'Auf allen Social-Media-Kanälen' },
  { value: 100, suffix: '%', label: 'Zufriedenheit', note: 'Kundenzufriedenheit als Priorität' },
]

export default function Stats() {

  return (
    <section id="ueber-uns" className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/carrera/carrera-innenraum.jpg"
          alt="Baatz Performance – Fahrzeuginnenraum"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
            Baatz Performance
          </p>
          <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight text-white mt-2">
            Zahlen sprechen<br />für sich
          </h2>
          <span className="block w-16 h-1 bg-gold mt-4 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-3 gap-8 lg:gap-16 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              style={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <p className="font-heading font-bold text-gold uppercase tracking-widest text-xs mt-2">
                {s.label}
              </p>
              <p className="text-white/40 text-xs mt-1">{s.note}</p>
            </motion.div>
          ))}
        </div>

        {/* About text */}
        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="font-heading font-black text-2xl md:text-3xl uppercase text-white">
              Leidenschaft für <span className="text-gold">perfekte Fahrzeuge</span>
            </h3>
            <p className="text-white/60 mt-4 leading-relaxed">
              Baatz Performance wurde mit einer klaren Vision gegründet: Fahrzeuge auf
              höchstem Niveau aufzubereiten. Was als Leidenschaft begann, ist heute ein
              professioneller Betrieb in Berlin, dem Kunden aus der ganzen Region vertrauen.
            </p>
            <p className="text-white/60 mt-3 leading-relaxed">
              Von der gründlichen Fahrzeugaufbereitung über hochwertige Lackpflege bis hin zur
              professionellen Keramik-Beschichtung – bei uns ist Ihr Fahrzeug in den besten Händen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏆', label: 'Premium Materialien' },
              { icon: '⚡', label: 'Schnelle Bearbeitung' },
              { icon: '🛡️', label: 'Langzeitschutz' },
              { icon: '✨', label: 'Makellose Ergebnisse' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/5 border border-white/10 p-5 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-heading font-bold text-white text-xs uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
