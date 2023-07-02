/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      LeeSeoyun: ["LeeSeoyun"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};
