/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#3B826A',
        'secondary-blue': '#2563EB',
        'light-blue': '#EFF6FF',
      }
    },
  },
  plugins: [],
}
