const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    colors: {
      'FrenchViolet': '#731DD8',
      'Verdigris': '#48A9A6',
      'Timberwolf': '#E4DFDA',
      'Tan': '#D4B483',
      'FuzzyWuzzy': '#C1666B',

    },
  },
},
  plugins: [
    require('@tailwindcss/forms'),

  ],
}
