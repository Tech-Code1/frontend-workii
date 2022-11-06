/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.{html,ts}'],
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
          lightBlue: '#E8F9FF',
          strongYellow: '#FFC738'
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
          principal: '#111827',
          alternative: '#1F2937'
        },
        dark: {
          prymaryColor: '#217AFF',
          secondaryColorYellow: '#FFB800',
          secondaryColorBlue: '#1673FF40',
          accentColor: '#FDC32E'
        },

        error: {
          redLight: '#FFDACE',
          redDark: '#C20707'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
