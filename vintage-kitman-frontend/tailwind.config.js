/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      black: "#131212",
      white: "#ffffff",
      canary: "#FFE520",
      grey:"#515052",
      darkgrey: "#333138"
    },
    screens: {
      xs:'400px',
      sm: "500px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",

    }

  },
  
  plugins: [],
}

