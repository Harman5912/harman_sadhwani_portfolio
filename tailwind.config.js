/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kingdom: {
          bg: '#07080B',
          surface: 'rgba(18, 20, 29, 0.65)',
          surfaceHover: 'rgba(28, 31, 46, 0.8)',
          card: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(212, 175, 55, 0.18)',
          borderLight: 'rgba(255, 255, 255, 0.12)',
          text: '#F5F5F7',
          muted: '#9DA3B4',
          gold: '#D4AF37',
          goldLight: '#F5E4B5',
          goldMuted: '#96782B',
          ivory: '#FFFBF0',
          champagne: '#EAD7A1',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Didot', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
