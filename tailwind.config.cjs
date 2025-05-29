/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand:  { DEFAULT: "#0f172a", soft: "#16233a", lighter: "#1e2b44" },
        accent: { DEFAULT: "#38bdf8", soft: "#7dd3fc" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};