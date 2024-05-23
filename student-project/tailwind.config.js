/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        marqueeLeftToRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marqueeRightToLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeTopToBottom: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        marqueeBottomToTop: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        'marquee-ltr': 'marqueeLeftToRight 10s linear infinite',
        'marquee-rtl': 'marqueeRightToLeft 10s linear infinite',
        'marquee-ttb': 'marqueeTopToBottom 6s linear infinite',
        'marquee-btt': 'marqueeBottomToTop 10s linear infinite',
        slide: 'slide 5s linear infinite',
      },
    },
  },
  plugins: [],
}

