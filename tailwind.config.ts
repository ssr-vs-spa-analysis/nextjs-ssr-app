import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#e2e8f0",
        background: "#f8fafc",
        foreground: "#0f172a",
        primary: "#0f172a",
        accent: "#2563eb"
      }
    }
  },
  plugins: []
} satisfies Config;
