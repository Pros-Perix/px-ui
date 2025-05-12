import { type Config } from "tailwindcss";

const config: Config = {
  content: ["../../packages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
