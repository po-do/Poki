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
  // 이 부분을 추가해줍니다!
  plugins: [require("tailwind-scrollbar-hide")],
};
