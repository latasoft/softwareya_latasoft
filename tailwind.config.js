const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'cabeceraVideoFondo': 'linear-gradient(162deg,rgba(0,0,0,0.6) ,rgba(255,255,255,0), #748295)',
                'metalicoGlassFondo': 'linear-gradient(162deg, #C1BECF, #AFB5C0, #A7B1C5, #A5B0D2, #9CA7C0, #96A1B1, #939BA4 )',
                'metalicoGlassFondoB': 'linear-gradient(162deg, #D4D5E1, #C8CFD8, #C3CCDB, #C2CCE3, #BDC6D8, #B9C2CE, #B7BFC6 )',
            },
            colors: {
                neutral: colors.neutral
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                Roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
                RobotoCondensed: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
                LexendDeca: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
                Oswald: ['Oswald', ...defaultTheme.fontFamily.sans]
            },
            screens: {
              'sm': '640px',
              'md': '768px',
              'lg': '1024px',
              'ml': '1152px',
              'xl': '1280px',
              '2xl': '1536px',
            }
        }
    },
    plugins: []
};
