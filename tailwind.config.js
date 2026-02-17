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
          brown: {
            DEFAULT: '#3D2817',
            secondary: '#54473D',
            light: '#6B5B4F',
          },
          green: {
            DEFAULT: '#3E6B2E',   // richer green pulled from logo
            secondary: '#4A7A3A', // lighter accent green
            light: '#E8F0E4',     // very light green for backgrounds
            pale: '#F2F8EF',      // almost-white green tint
          },
          orange: {
            DEFAULT: '#E89B3C',
            tan: '#FF8C42',
            dark: '#D2691E',
          },
          cream: {
            DEFAULT: '#FAFDF8',   // slight green-tinted white
            dark: '#F0E8DB',
          },
          blue: '#4A7C8C',
          footer: '#F0F5EC',      // light green-tinted footer
          border: {
            DEFAULT: '#D5DFD0',   // greenish border
            light: '#E2EAD8',     // lighter greenish border
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
