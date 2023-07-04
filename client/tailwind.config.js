/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans serif'],
      },
      colors: {
        cms: {
          dark: '#0d1117',
          grey: '#161b22',
          blue: '#5b4fff',
          purple: '#ad10ff',
        },
      },
    },
  },
  plugins: [],
};
