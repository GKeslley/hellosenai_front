/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        auto: 'auto auto 1fr',
        footer: '0.4fr 1fr',
      },
    },
  },
  plugins: [],
};
