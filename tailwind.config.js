/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        c4c4fb: "#c4c4fb"
      },
    },
    fontFamily: {
      LeeSeoyun: ["LeeSeoyun"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};
