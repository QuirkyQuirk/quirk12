/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'shake': 'shake 0.6s ease-in-out',
        'scroll': 'scroll 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      colors: {
        primary: {
          light: '#00D2C3',
          dark: '#FF2E93',
        },
        quirklo: {
          turquoise: '#00D2C3',
          pink: '#FF2E93',
        },
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          border: '#2E2E2E',
          text: {
            primary: '#FFFFFF',
            secondary: '#A0A0A0',
          },
        },
        light: {
          bg: '#FFFFFF',
          card: '#F5F5F5',
          border: '#E5E5E5',
          text: {
            primary: '#1A1A1A',
            secondary: '#666666',
          },
        },
      },
    },
  },
  plugins: [],
};