/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        e1dff0: "#e1dff0",
      },
    },
    fontFamily: {
      Dovemayo_gothic: ["Dovemayo_gothic"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};
