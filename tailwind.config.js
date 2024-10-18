/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        commerzYellow: '#FFE900',
        commerzBlue: '#00414B',
      },
      fontFamily: {
        sans: ['Gotham', 'sans-serif'],  // Set Gotham as the default sans-serif
      },
    },
  },
  plugins: [],
}

