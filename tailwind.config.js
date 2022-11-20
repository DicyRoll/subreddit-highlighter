/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      "base-card": "#213155",
    }
  },
  daisyui: {
    themes: [
      "night"
    ],
  },
  plugins: [require("daisyui")],
}
