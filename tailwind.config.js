/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        laptop: "1300px",
        lg: "1025px",
        tablet: "600px",
        xs: "450px",
      },
      colors: {
        primary: "#63B017",
        secondary: "#66B5B2",
        submitBtn: "#EB553A",
        customWhite: "#F4F4F4",
        black: "#232323",
        gray: "#C4C4C4",
        lightGray: "#969696",
        error: "#FF0000",
        GrayBorder: "#DFDFDF",
        textGray: "#565656",
        lightYellow: "#FCFFF5",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
    },
  },
  tailwindConfig: "./tailwind.config.js",
};
