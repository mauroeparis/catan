module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel']
      }
    }
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.h-fit': {
          height: 'fit-content',
        }
      }

      addUtilities(newUtilities, ['responsive'])
    }
  ]
}
