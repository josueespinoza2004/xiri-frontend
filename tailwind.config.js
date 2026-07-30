/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        xiri: {
          dark: "#053225",
          cream: "#F5EFED",
          teal: "#2292A4",
          olive: "#BDBF09",
          orange: "#D96C06",
        },
      },
    },
  },
  plugins: [],
};
