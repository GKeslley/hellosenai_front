/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-header': '#2E7BEF',
        'gray-400': '#7A8B93',
      },
      backgroundColor: {
        'color-pattern-100': '#2E7BEF',
      },
      textColor: {
        'text-color-pattern': '#131B24',
        'text-color-pattern-100': '#2E7BEF',
        'text-color-pattern-400': '#405261',
      },
      gridTemplateRows: {
        auto: 'auto auto 1fr',
        footer: 'auto 1fr',
        auto2: 'auto 1fr',
      },
      gridTemplateColumns: {
        autoColumns: '1fr auto',
        'auto-columns-2': 'auto 1fr',
        projects: 'repeat(12, calc((100% - 2rem * 11) / 12))',
      },
      gridColumn: {
        'column-1-9': '1 / 9',
        'column-1-7': '1 / 7',
        'column-7-13': '7 / 13',
        'column-1-13': '1 / 13',
        'column-9-13': '9 / 13',
      },
    },
  },
  plugins: [],
};
