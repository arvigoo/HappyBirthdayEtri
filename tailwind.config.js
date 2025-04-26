/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sunset: '#ff6b6b', // Warna senja jingga
        cloud: '#f1f1f1', // Warna awan
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace'], // Font retro
      },
    },
  },
  plugins: [],
}
