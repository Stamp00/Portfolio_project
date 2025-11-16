import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Style Guide Colors
        primary: '#ED6A5A',      // Coral red
        secondary: '#F4F1BB',    // Cream yellow
        tertiary: '#9BC1BC',     // Teal
        background: '#ED6A5A',   // Light cream background
        text: '#66635B',         // Dark gray text

        cream: {
          50: '#FEFDFB',
          100: '#FBF8F3',
          200: '#F5EFE0',
          300: '#EDE4D3',
          400: '#E5D9C6',
          500: '#D4C5B0',
        },
        retro: {
          teal: {
            light: '#9BC1BC',
            DEFAULT: '#5ECCC4',
            dark: '#4AB4AC',
          },
          orange: {
            light: '#FF9B7A',
            DEFAULT: '#BC3601',
            dark: '#95582A',
          },
          yellow: {
            light: '#F5C472',
            DEFAULT: '#E8B86D',
            dark: '#C09A5A',
          },
          brown: {
            DEFAULT: '#8B4513',
            dark: '#49250A',
          },
        },
        apple: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
        'protest-strike': ['"Protest Strike"', 'sans-serif'],
        'spicy-rice': ['"Spicy Rice"', 'sans-serif'],
        'squada-one': ['"Squada One"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
