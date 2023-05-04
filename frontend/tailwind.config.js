/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '500px',
      'md': '668px',
      'lg': '1024px',
      'xl': '1280px', // custom breakpoint
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
        logo: ['MuseoModerno', 'sans-serif']
      },
      colors: {
        flyplanyellow: '#EBBE6F',
      },
    },
  },
  plugins: [],
}