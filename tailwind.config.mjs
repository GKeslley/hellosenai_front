import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      colors: {
        'header-blue': '#2E7BEF'
      },
      backgroundImage: {
        'header-immage': "url('/assets/header/headerImage.png')"
      }
    },
  },
  plugins: [forms],
  variants: {
    extend: {},
  },
  darkMode: "media",
};