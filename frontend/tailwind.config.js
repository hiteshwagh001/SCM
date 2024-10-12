import flowbite from "flowbite-react/tailwind";
// const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1a202c',
        darkText: '#a0aec0',
        // lightBg: '#ffffff',
        lightText: '#000000',
      },
      gradients: {
        lightBg: 'to right, #e0eafc, #cfdef3',
      },
    },

  },
  plugins: [
    flowbite.plugin(),

  ]
}