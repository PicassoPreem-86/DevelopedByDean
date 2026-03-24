import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#050508",
          secondary: "#0c0c14",
          card: "#12121e",
          "card-hover": "#1a1a2e",
        },
        border: {
          DEFAULT: "#1e1e30",
          hover: "#2e2e48",
        },
        text: {
          primary: "#ededf0",
          secondary: "#6b6b80",
        },
        accent: {
          violet: "#7c3aed",
          cyan: "#06b6d4",
          rose: "#f43f5e",
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #7c3aed, #6366f1, #06b6d4)",
        "gradient-accent-hover": "linear-gradient(135deg, #8b5cf6, #7c3aed, #0891b2)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
