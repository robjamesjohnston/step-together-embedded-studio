const { screens } = require("tailwindcss/defaultTheme");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "520px",
      ...screens,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "rgb(255, 255, 255)",
      black: "rgb(17, 17, 17)",
      green: "rgb(83, 166, 155)",
      lime: "rgb(205, 214, 34)",
      darkGrey: "rgb(124, 124, 124)",
      red: "rgb(235, 97, 93)",
      lightGreen: "rgb(154, 210, 209)",
      orange: "rgb(242, 183, 1)",
    },
    extend: {
      spacing: {
        "18": "4.5rem",
      },
      zIndex: {
        "999": "999",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
