const brands = [
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Porsche',
  'Volkswagen',
  'Ferrari',
  'Lamborghini',
  'Bentley',
  'Rolls-Royce',
  'McLaren',
  'Aston Martin',
  'Maserati',
  'Jaguar',
  'Land Rover',
  'Volvo',
  'Tesla',
  'Toyota',
  'Honda',
  'Ford',
  'Opel',
  'Hyundai',
  'Kia',
  'Nissan',
  'Mazda',
  'Škoda',
  'SEAT',
  'Peugeot',
  'Renault',
  'Citroën',
  'Alfa Romeo',
  'Fiat',
  'Dodge',
  'Subaru',
  'Lexus',
  'Mitsubishi',
  'Suzuki',
]

// Separator between brand names
function Dot() {
  return (
    <span className="mx-6 text-gold/40 select-none" aria-hidden>
      ◆
    </span>
  )
}

export default function BrandScroller() {
  // Duplicate list so the loop is seamless (animate-marquee moves -50%)
  const items = [...brands, ...brands]

  return (
    <section className="py-5 bg-white border-y border-gray-100 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Label */}
      <p className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 font-heading font-bold text-[10px] uppercase tracking-[0.3em] text-gray-300 z-10 whitespace-nowrap select-none">
        Alle Marken · Alle Modelle
      </p>

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((brand, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-heading font-bold text-sm uppercase tracking-[0.12em] text-gray-400 hover:text-gold transition-colors duration-200 cursor-default select-none">
              {brand}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </section>
  )
}
