import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian:  "#0a0a09",
        charcoal:  "#15140f",
        ivory:     "#f7f4ec",
        "gold": {
          400: "#c9a256",
          500: "#b8903f",
        },
        "warm-gray": "#9a948a",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans:    ["'DM Sans'", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      transitionDuration: {
        "1500": "1500ms",
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
