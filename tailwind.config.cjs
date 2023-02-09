/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
