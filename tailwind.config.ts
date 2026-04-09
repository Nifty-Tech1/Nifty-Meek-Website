import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        surface: "var(--surface)",
        "surface-light": "var(--surface-light)",
        background: "var(--background)",
      },
      borderColor: {
        "border-color": "var(--border-color)",
      },
      textColor: {
        accent: "var(--accent)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
      },
      backgroundColor: {
        surface: "var(--surface)",
        "surface-light": "var(--surface-light)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
