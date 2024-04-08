/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        instaYell: "#f9ce34",
        instaPink: "#ee2a7b",
        instaPurp: "#6228d7",
        thalesRed: "#820001"
      },
      backgroundImage: {
        bannerPrincipal: "url('./src/assets/imgs/banner-thales.png')"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}