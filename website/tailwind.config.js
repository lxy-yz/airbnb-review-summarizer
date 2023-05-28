module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#F2565B',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
