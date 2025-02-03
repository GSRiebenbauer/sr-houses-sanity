const { theme } = require('@sanity/demo/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    extend: {
      fontSize: {
        '6xl': '2.75rem',
      },
      lineHeight: {
        tight: '1.2',
      },
    },
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
