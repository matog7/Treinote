/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        champion: ['Champion', 'sans-serif'],
        audiowide: ['Audiowide', 'cursive'],
      },
    },
  },
  plugins: [],
};
