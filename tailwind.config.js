const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Bebas Neue',
          ...defaultTheme.fontFamily.sans
        ]
      },
      fontSize: {
        'orion-display-3xl': ['4.5rem', '1.3'],
        'orion-display-2xl': ['4rem', '1.3'],
        'orion-display-lg': ['3.5rem', '1.3'],
        'orion-display-md': ['2.8125rem', '1.3'],
        'orion-display-sm': ['2.25rem', '1.3'],
        'orion-headline-lg': ['2rem', '1.5'],
        'orion-headline-md': ['1.75rem', '1.5'],
        'orion-headline-sm': ['1.5rem', '1.5'],
        'orion-title-lg': ['1.375rem', '1.5'],
        'orion-title-md': ['1rem', '1.5'],
        'orion-title-sm': ['0.875rem', '1.5'],
        'orion-title-esm': ['0.6875rem', '1.5'],
        'orion-label-lg': ['1.5rem', '1.5'],
        'orion-label-md': ['1.25rem', '1.5'],
        'orion-label-sm': ['1rem', '1.5'],
        'orion-body-lg': ['1.5rem', '1.5'],
        'orion-body-md': ['1.25rem', '1.5'],
        'orion-body-sm': ['1rem', '1.5'],
      },
      colors: {
        'orion-primary': { 
          50: '#ffe6e6',   // tons claros de vermelho
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000',  // vermelho base
          600: '#cc0000',  // tons escuros de vermelho
          700: '#990000',
          800: '#660000',
          900: '#330000'
        },
        'orion-secondary': {
          50: '#e9e9e9',
          100: '#bbbaba',
          200: '#9a9898',
          300: '#6c696a',
          400: '#4f4c4d',
          500: '#231f20',
          600: '#201c1d',
          700: '#191617',
          800: '#131112',
          900: '#0f0d0d '
        },
        'orion-neutrals': {
          50: '#fefefe',
          100: '#fbfbfb',
          200: '#f9f9f9',
          300: '#f6f6f6',
          400: '#f4f4f5',
          500: '#f1f1f2',
          600: '#dbdbdc',
          700: '#ababac',
          800: '#858585',
          900: '#656566' 
        },
        'orion-green': {
          50: '#f2f9e9',
          100: '#d8ebbb',
          200: '#c5e29b',
          300: '#abd56d',
          400: '#9acd51',
          500: '#81c025',
          600: '#75af22',
          700: '#5c881a',
          800: '#476a14',
          900: '#365110'
        },
        'orion-warning': {
          50: '#fef4ea',
          100: '#fddebf',
          200: '#fccea0',
          300: '#fab874',
          400: '#f9aa59',
          500: '#f89530',
          600: '#e2882c',
          700: '#b06a22',
          800: '#88521a',
          900: '#683f14'
        },
        'orion-error': {
          50: '#fbeaec',
          100: '#f3bdc3',
          200: '#ee9da5',
          300: '#e6717c',
          400: '#e15563',
          500: '#d92b3c',
          600: '#c52737',
          700: '#9a1f2b',
          800: '#771821',
          900: '#5b1219'
        }
      },
      backgroundImage: {
        waves: "url('./src/assets/grafismos/waves.svg')",
        'waves-short': "url('./src/assets/grafismos/waves-short.svg')",
        'waves-no-padding': "url('./src/assets/grafismos/wave-no-padding.svg')"
      }
    },
    container: {
      center: true
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    plugin(function({ addVariant }) {
      addVariant(
        'supports-backdrop-blur',
        '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
      )
    })
  ],
  daisyui: {
    themes: [
      {
        'orion': {
          'primary': '#2a4ddd',
          'primary-focus': '#2d56fb',
          'primary-content': '#ffffff',
          'secondary': '#ffcf64',
          'secondary-focus': '#bd0091',
          'secondary-content': '#ffffff',
          'accent': '#ffcf64',
          'accent-focus': '#fdc449',
          'accent-content': '#ffffff',
          'neutral': '#3b3f51',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#3c3e45',
          'info': '#2094f3',
          'success': '#81c025',
          'warning': '#f89530',
          'error': '#d92b3c',
        },
      },
    ],
  },
}
