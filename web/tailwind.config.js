/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          100: '#e0f7fa',
          200: '#b2ebf2',
          500: '#03a9f4',
          600: '#0288d1',
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          to: {
            backgroundPosition: '200% center',
          },
        },
      },
    },
  },
  plugins: [],
}
