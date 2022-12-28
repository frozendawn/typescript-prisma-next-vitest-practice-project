/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
      'teal-100': '#ccfbf1',
      'teal-200': '#99f6e4',
      'teal-500': '#14b8a6',
      'teal-700': '#0f766e',
      'teal-900': '#134e4a'
    },
    spacing: {
      xxs: "0.8rem",
      s: "1.2rem",
      n: "1.6rem",
      md: "2.4rem",
      xl: "3.2rem",
      xxl: "4.8rem",
      '100parent': "100%",
      'negative-50': '-5rem',
      8: "8rem",
      10: "10rem",
      12: "12rem",
      35: '35rem',
      36: "36rem",
      31: "31rem"
    },
    borderRadius: {
      'none': '0',
      DEFAULT: '50%',
      'large': '12px',
    },
    extend: {},
  },
  plugins: [],
};
