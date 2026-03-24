import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#0A0A0A",
          surface: "#111111",
          elevated: "#151515",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#9E9E9E",
        },
        accent: {
          DEFAULT: "#C7A97B",
          hover: "#D4BA8F",
        },
        line: "rgba(255,255,255,0.08)",
        divider: "rgba(255,255,255,0.10)",
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
