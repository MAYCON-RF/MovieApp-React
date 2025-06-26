
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  colors: {
    netflix: {
      red: '#E50914',
      'dark-red': '#B20710',
      black: '#000000',
      'dark-gray': '#141414',
      'medium-gray': '#333333',
      'light-gray': '#757575'
    }
  },
  backgroundImage: {
    'cinema-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #000000 50%, #141414 75%, #000000 100%)',
    'red-gradient': 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    'glow-header': 'radial-gradient(circle at 50% 0%, rgba(214, 46, 82, 0.8) 0%, rgba(124, 58, 237, 0) 70%)'
  },
  keyframes: {
    'fade-in': {
      '0%': {
        opacity: '0',
        transform: 'translateY(20px)'
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)'
      }
    },
    'glow': {
      '0%, 100%': {
        boxShadow: '0 0 20px rgba(229, 9, 20, 0.3)'
      },
      '50%': {
        boxShadow: '0 0 30px rgba(229, 9, 20, 0.6)'
      }
    },
    'float': {
      '0%, 100%': {
        transform: 'translateY(0px)'
      },
      '50%': {
        transform: 'translateY(-10px)'
      }
    }
  },
  animation: {
    'fade-in': 'fade-in 0.6s ease-out',
    'glow': 'glow 2s ease-in-out infinite',
    'float': 'float 6s ease-in-out infinite'
  }
},
  },
  plugins: [],
}