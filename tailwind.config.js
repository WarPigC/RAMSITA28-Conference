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
          blue: '#0D6BA1',
          cyan: '#1B88CA',
          green: '#48A23F',
          emerald: '#5CB85C',
          mint: '#F0FDF4',
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
