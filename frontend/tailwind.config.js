/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1a202c',
        darkText: '#a0aec0',
        lightBg: '#ffffff',
        lightText: '#000000',
      },
    },
    plugins: [],
  }
}