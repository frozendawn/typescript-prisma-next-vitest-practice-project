/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.tsx"],
  theme: {
    colors: {
      'white': "#fff",
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    spacing: {
      xxs: "0.8rem",
      s: "1.2rem",
      n: "1.6rem",
      md: "2.4rem",
      xl: "3.2rem",
      xxl: "4.8rem",
      36: "36rem",
      31: "31rem"
    },
    extend: {},
  },
  plugins: [],
};
