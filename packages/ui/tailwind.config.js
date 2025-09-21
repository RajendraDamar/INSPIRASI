/**
 * Tailwind config for @inspirasi/ui — shared for web and native (NativeWind)
 */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          600: '#2563eb',
          700: '#1d4ed8'
        },
        surface: {
          light: '#ffffff',
          dark: '#111827'
        }
      }
    }
  },
  plugins: []
};
