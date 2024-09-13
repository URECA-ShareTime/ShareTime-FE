/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d6e8f5',
          white: '#ffffff',
          darkblue: '#3F6886',
        },
      },
      height: {
        header : '80px',
        content: 'calc(100vh - 80px)',
      }
    },
  },
  plugins: [],
});
