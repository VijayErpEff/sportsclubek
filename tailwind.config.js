/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A3B8F",
          light: "#2B52B0",
          dark: "#0E2260",
        },
        accent: {
          DEFAULT: "#1B7D3A",
          hover: "#15662F",
          light: "#2BA84A",
        },
        secondary: {
          DEFAULT: "#2BA84A",
          light: "#A8E6CF",
        },
        neutral: {
          50: "#FAFAFE",
          100: "#F5F5FA",
          200: "#E8E8EE",
          500: "#8A8A9A",
          700: "#4A4A5A",
          900: "#1A1A2E",
        },
        error: "#E74C3C",
        warning: "#F39C12",
        info: "#3498DB",
        success: "#1B7D3A",
      },
      fontFamily: {
        display: [
          "var(--font-plus-jakarta)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "page-title": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        section: [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        subsection: [
          "clamp(1.25rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.25", letterSpacing: "-0.005em", fontWeight: "600" },
        ],
        "card-title": [
          "clamp(1.125rem, 2vw, 1.5rem)",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        label: [
          "clamp(1rem, 1.5vw, 1.25rem)",
          { lineHeight: "1.4", fontWeight: "600" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      maxWidth: {
        container: "1280px",
        wide: "1440px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(26, 59, 143, 0.08), 0 1px 2px rgba(26, 59, 143, 0.04)",
        "card-hover":
          "0 8px 24px rgba(26, 59, 143, 0.12), 0 2px 4px rgba(26, 59, 143, 0.06)",
        nav: "0 1px 3px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
