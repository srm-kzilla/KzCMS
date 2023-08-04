/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
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
        button: {
          blue: '#5653FF',
          purple: '#B10DFF',
          textColor: '#C4D3E0'
        }
      },
    },
    plugins: [],
  },
  gradients: {
    default: "linear-gradient(to right, #5653FF, #B10DFF)",
    "to-tr": "linear-gradient(to top right, #5653FF, #B10DFF)",
    "hover:bg-gradient-to-br": "linear-gradient(to bottom right, #5653FF, #B10DFF)",
  },
};
