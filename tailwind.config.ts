module.exports = {
  safelist: ['animate-fade-in-out', 'animate-stopscroll'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '60%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'stopscroll': {
          '0%, 90%': { overflow: 'hidden' },
          '100%': { overflow: 'auto' },
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 3s forwards',
        'stopscroll': 'stopscroll 3.5s forwards',
      },
    },
  },
  plugins: [],
};
