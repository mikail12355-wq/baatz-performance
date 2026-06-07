import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Baatz Performance – Fahrzeugaufbereitung & Lackpflege Berlin',
  description:
    'Professionelle Fahrzeugaufbereitung, Lackpflege, Keramik-Beschichtung und Detailing in Berlin. Qualität die begeistert.',
  keywords:
    'Fahrzeugaufbereitung Berlin, Lackpflege Berlin, Keramikbeschichtung Berlin, Detailing Berlin, Autoaufbereitung Berlin, Baatz Performance',
  openGraph: {
    title: 'Baatz Performance – Fahrzeugaufbereitung & Lackpflege Berlin',
    description:
      'Professionelle Fahrzeugaufbereitung, Lackpflege, Keramik-Beschichtung und Detailing in Berlin.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Baatz Performance',
  description:
    'Professionelle Fahrzeugaufbereitung, Lackpflege, Keramik-Beschichtung und Detailing in Berlin',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Berlin',
    addressCountry: 'DE',
  },
  sameAs: ['https://www.facebook.com/LackKratzerDellenPflege/'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
