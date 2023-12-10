import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const {
  blackA,
  mauve,
  violet,
  gray,
  grayDark,
  blue,
  iris,
  irisDark,
  ruby,
  red,
  cyan,
} = require("@radix-ui/colors");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "button-bg-primary": "rgb(33 144 255)",
        "bg-slidebar-profile": "rgb(15 23 42)",
        gradient: "var(--tw-gradient-stops)",
        ...blackA,
        ...mauve,
        ...violet,
        ...gray,
        ...grayDark,
        ...blue,
        ...iris,
        ...irisDark,
        ...red,
        ...ruby,
        ...cyan,
      },
      keyframes: {
        overlayShow: {
          from: {},
          to: {},
        },
        contentShow: {
          from: { transform: "translate(-50%, -48%) scale(0.96)" },
          to: { transform: "translate(-50%, -50%) scale(1)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        hidePlayVideo: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        spin: "spin 1s linear infinite",
        hideVideo: "hidePlayVideo 1s ease-in-out",
      },

      screens: {
        "800px": "800px",
        "900px": "900px",
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1400px": "1400px",
        "1500px": "1500px",
      },
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        Josefind: ["var(--font-Josefin)"],
      },
    },
  },
  plugins: [],
};
export default config;
