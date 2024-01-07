import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: 'class', // add this line
  theme: {
    extend: {
      colors: {
        temp: 'gray',
      },
    },
  },
  plugins: [],
} satisfies Config;