/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        calculator: {
          bg: '#1a1a2e',
          display: '#0f172a',
          button: {
            number: '#334155',
            operator: '#2563eb',
            function: '#9333ea',
            clear: '#dc2626',
            equals: '#059669',
            graph: '#4f46e5'
          }
        }
      },
      fontFamily: {
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      animation: {
        'button-press': 'buttonPress 0.1s ease-in-out',
      },
      keyframes: {
        buttonPress: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
