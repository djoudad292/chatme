/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        primary: "#6C63FF",
        secondary: "#00E5FF",
        text: "#FFFFFF",
        border: "#A1A1AA",
      },
    },
  },
  plugins: [],
};
