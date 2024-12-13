import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(31 41 55)",
        secondary: "rgb(55 65 81)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e6e6e6",
          300: "#d1d1d1",
          400: "#a0a0a0",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          750: "#404040",
          800: "#333333",
          900: "#202225",
          950: "#18191c",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
