import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandScroller from '@/components/BrandScroller'
import Services from '@/components/Services'
import Leasing from '@/components/Leasing'
import Gallery from '@/components/Gallery'
import Videos from '@/components/Videos'
import Stats from '@/components/Stats'
import Partners from '@/components/Partners'
import Booking from '@/components/Booking'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PartnerBanner from '@/components/PartnerBanner'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandScroller />
      <Services />
      <Leasing />
      <Gallery />
      <Videos />
      <Stats />
      <Partners />
      <Booking />
      <Contact />
      <Footer />
      <PartnerBanner />
    </main>
  )
}
