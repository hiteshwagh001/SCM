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
        // lightBg: linear-gradient(to right, #e0eafc, #cfdef3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        darkText: '#a0aec0',
        // lightBg: '#ffffff',
        lightText: '#000000',
      },
      gradients: {
        lightBg: 'to right, #e0eafc, #cfdef3',
      },
    },

    plugins: [],
  }
}