module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['IBM Plex Sans'],
    },
    extend: {
      fontSize: ['hover'],
      scale: ['hover'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
