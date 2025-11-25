/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for the dashboard
        background: "#09090b", // zinc-950
        surface: "#18181b", // zinc-900
        primary: "#10b981", // emerald-500
        secondary: "#6366f1", // indigo-500
        danger: "#ef4444", // red-500
      }
    },
  },
  plugins: [],
}
