/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      'ebony-clay': {
        '50': '#f6f7f9',
        '100': '#eceef2',
        '200': '#d4dae3',
        '300': '#afbaca',
        '400': '#8395ad',
        '500': '#647793',
        '600': '#4f607a',
        '700': '#414e63',
        '800': '#384354',
        '900': '#323a48',
        '950': '#242933',
    },
    'mandy': { //primary
      '50': '#fef2f2',
      '100': '#fee6e5',
      '200': '#fccfd0',
      '300': '#f9a8a9',
      '400': '#f5777c',
      '500': '#ec4c56',
      '600': '#d8263a',
      '700': '#b61a2f',
      '800': '#98192e',
      '900': '#83182d',
      '950': '#490813',
  },

  'shuttle-gray': { //alt
    '50': '#f4f5f7',
    '100': '#e3e5ea',
    '200': '#cbcfd6',
    '300': '#a6acba',
    '400': '#7b8495',
    '500': '#596172',
    '600': '#525868',
    '700': '#474b57',
    '800': '#3f424b',
    '900': '#373942',
    '950': '#22242a',
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
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {},
  },
  plugins: [],
};
