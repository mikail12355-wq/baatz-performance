import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C8A951',
          light: '#E8CC7A',
          dark: '#9C7B2E',
        },
        charcoal: {
          DEFAULT: '#141414',
          card: '#1D1D1D',
        },
        cream: {
          DEFAULT: '#F8F5F0',
          light: '#FDFCFA',
        },
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C8A951 0%, #E8CC7A 50%, #C8A951 100%)',
      },
    },
  },
  plugins: [],
}
export default config
