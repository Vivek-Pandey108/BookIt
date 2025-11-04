
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { yellow: "#F5BD02", dark: "#111111" },
        card: "#F6F6F6"
      },
      boxShadow: { soft: "0 2px 12px rgba(0,0,0,0.08)" },
      borderRadius: { xl: "12px", "2xl": "16px" }
    }
  },
  plugins: []
}
