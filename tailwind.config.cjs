/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        comp: {
          900: "#7986a0",
          100: "#242933",
        },
        primary: { // caret, error, text
          100: "#ec4c56",
          900: "#750c13",
        },
  
        sub: {
          100: "#596172",
          800: "#1c222d", //subalt
          900: "#30353e",
        },
        subText: {
          100: "#f6f0e9",
          900: "#bb8e59",
        },
  
        //light mode
        comp2: {
          100: colors.white,
          900: colors.gray,
        },
        primary2: {
          100: "#ff360d",
          900: "#b70000",
        },
        sub2: {
          100: "#b7b7b7",
          900: "#ececec",
        },
        subText2: {
          100: "#ececec",
          900: "#b7b7b7",
        },
    },
  },
  plugins: [],
};
