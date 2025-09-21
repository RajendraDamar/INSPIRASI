/**
 * Tailwind configuration shared across web (Next.js) and native (Expo + NativeWind).
 * - content: includes apps and packages so shared components in `packages/ui` are scanned
 * - darkMode: 'class' so both web and native can toggle via a `dark` class
 * - theme: extends a blue primary palette and provides light/dark tokens
 */

module.exports = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#2563EB'
        },
        background: {
          light: '#FFFFFF',
          dark: '#0B1220'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#0F1724'
        },
        text: {
          light: '#0F1724',
          dark: '#E6EEF8'
        }
      }
    }
  },
  plugins: []
};
