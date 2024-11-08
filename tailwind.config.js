/** @type {import('tailwindcss').Config} */
import tailwindcssRtl from 'tailwindcss-rtl'; // import instead of require

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        secondary: '#0f172a',
      }
    },
  },
  plugins: [
    tailwindcssRtl, // using the imported version
  ],
}
