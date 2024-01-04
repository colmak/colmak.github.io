import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        temp: 'gray',
      },
    },
  },
  plugins: [],
} satisfies Config;
