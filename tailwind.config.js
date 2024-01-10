/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color': 'rgba(255, 255, 255, 0.443)',
        'hover-color': 'rgba(255, 255, 255, 0.055)',
      },
      boxShadow: {
        dark: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
