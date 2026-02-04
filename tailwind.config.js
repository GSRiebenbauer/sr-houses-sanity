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
        '6xl': '2rem',
      },
      lineHeight: {
        tight: '1.2',
      },
    },
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '@screen lg': {
          '.text-6xl': {
            fontSize: '2.75rem',
            lineHeight: theme('lineHeight.tight'),
          },
        },
      });
    },
    require('@tailwindcss/typography'),
  ],
};
