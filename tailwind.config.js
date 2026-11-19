/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A2540',
          dark: '#0E2B5C',
          blue: '#0C5B94',
          cyan: '#1472B8',
          green: '#77B232',
          emerald: '#6BA02D',
          mint: '#F4F9EC',
          surface: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
        serif: ['"Roboto Slab"', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
