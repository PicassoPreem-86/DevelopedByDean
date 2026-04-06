import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        hero: "#0B0F19",
        surface: {
          dark: "#111827",
          light: "#F8FAFC",
          white: "#FFFFFF",
        },
        content: {
          primary: "#0F172A",
          body: "#334155",
          muted: "#64748B",
          inverse: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#4361EE",
          hover: "#3A56D4",
          light: "#7B93F5",
          glow: "rgba(67, 97, 238, 0.15)",
        },
        border: {
          light: "#E2E8F0",
          dark: "rgba(255,255,255,0.08)",
        },
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)",
        glow: "0 0 60px rgba(67, 97, 238, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
