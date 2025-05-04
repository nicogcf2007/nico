// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para el modo claro
        light: {
          primary: {
            DEFAULT: colors.yellow[500],
            hover: colors.yellow[600],
            active: colors.yellow[700],
          },
          secondary: {
            DEFAULT: colors.gray[100],
            hover: colors.gray[200],
            active: colors.gray[300],
          },
          text: {
            primary: colors.gray[800],
            secondary: colors.gray[600],
            tertiary: colors.gray[500],
          },
          background: {
            primary: colors.white,
            secondary: colors.yellow[50],
            tertiary: colors.gray[100],
          },
          border: {
            DEFAULT: colors.gray[400],
            hover: colors.gray[500],
          },
          link: {
            DEFAULT: colors.yellow[600],
            hover: colors.yellow[800],
          },
        },
        // Colores personalizados para el modo oscuro
        dark: {
          primary: {
            DEFAULT: colors.indigo[500],
            hover: colors.indigo[600],
            active: colors.indigo[700],
          },
          secondary: {
            DEFAULT: colors.gray[700],
            hover: colors.gray[600],
            active: colors.gray[500],
          },
          text: {
            primary: colors.gray[100],
            secondary: colors.gray[300],
            tertiary: colors.gray[400],
          },
          background: {
            primary: '#0a0426',
            secondary: '#1a0f3c',
            tertiary: '#2c1166',
          },
          border: {
            DEFAULT: colors.gray[700],
            hover: colors.gray[500],
          },
          link: {
            DEFAULT: colors.indigo[400],
            hover: colors.indigo[300],
          },
        },
      },
      // Configuración de gradientes personalizados
      backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-dark': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
    },
  },
  plugins: [],
};