/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "button-idle-gradient": "linear-gradient(to top right, #5653FF, #B10DFF)",
        "button-hover-gradient": "linear-gradient(to right, #5653FF, #B10DFF)",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans serif"],
      },
      colors: {
        primary: "#1E1E1E",
        secondary: "#2D2D2D",
        highlight: "#9EC1A3",
        light: "#7F8CA0",
        card: {
          red: "#FF0000",
          gray: "#999999",
        },
      },
    },
    plugins: [],
  },
};
