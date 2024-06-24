/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary_color: "#1976d2",
      secondary_color: "#009FF5",
      tertiary_color: "#ECFBFF",
      alternative_color: "#E6F4F1",
      text_nav_color: "#FFFFFF",
      text_nav_color_active: "#FFFFFF",
      footer_color: "#FFFFFF"
    },
    extend:{
    }
  },
  plugins: [],
}