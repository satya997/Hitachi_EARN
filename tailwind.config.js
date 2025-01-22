/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}" // Scan for Tailwind classes in these files
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Custom font
      },
      colors: {
        "electric-green": "#21fc0d", // Custom color
      },
    },
  },
  plugins: [
    require("daisyui"), // Include daisyUI plugin
    require("tailwind-scrollbar"),
  ],
};
