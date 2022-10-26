/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  purge: {
    content: ['./projects/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ['Montserrat', 'sans-serif'],
      body: ['Poppins', 'sans-serif']
    },

    extend: {
      colors: {
        primary: {
          blueNeutral: '#278CEA'
        },

        secondary: {
          lightBlue: '#E8F9FF'
        },

        accent: {
          yellow: '#FFD465'
        },

        gray: {
          lighter: '#F8F8F8',
          light: '#F1F1F1',
          neutral: '#D9D9D9'
        },

        white: {
          principal: '#FFFFFF',
          alternative: '#FDFDFD'
        },

        black: {
          principal: '#0E0D0D',
          alternative: '#333333'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
