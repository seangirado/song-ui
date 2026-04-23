export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        modalPop: 'modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        modalPop: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8) translateY(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}