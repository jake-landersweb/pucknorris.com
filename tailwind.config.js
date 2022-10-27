/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gains: ["Gainsborough", "sans-serif"],
      },
      colors: {
        'bg': {
          DEFAULT: '#1F1F23',
          '50': '#676774',
          '100': '#62626F',
          '200': '#585864',
          '300': '#4F4F59',
          '400': '#45454E',
          '500': '#3C3C43',
          '600': '#323239',
          '700': '#29292E',
          '800': '#1F1F23',
          '900': '#0E0E10'
        },
        main: "#f9bf3c",
        'txt': {
          DEFAULT: '#FFFFFF',
          '50': '#FFFFFF',
          '100': '#F1F1F1',
          '200': '#D5D5D5',
          '300': '#B9B9B9',
          '400': '#9D9D9D',
          '500': '#818181',
          '600': '#656565',
          '700': '#494949',
          '800': '#2D2D2D',
          '900': '#111111'
        },
      }
    },
  },
  plugins: [],
}
