/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
  },
  plugins: [],
};
