/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                azure: {
                    50: '#f6f9fa',
                    100: '#e4f1fb',
                    200: '#c4def6',
                    300: '#97bce9',
                    400: '#6895d8',
                    500: '#5072c7',
                    600: '#4156b0',
                    700: '#2a3f77',
                    800: '#232b62',
                    900: '#141a3d',
                },
                gold: {
                    50: '#fbfaf4',
                    100: '#f8efc4',
                    200: '#f0dc8d',
                    300: '#caa55e',
                    400: '#bc8d32',
                    500: '#9e6e1a',
                    600: '#815411',
                    700: '#623f0f',
                    800: '#432b0d',
                    900: '#2c1b0a',
                },
                alt: {
                    50: '#f6f6f6',
                    100: '#e7e7e7',
                    200: '#d1d1d1',
                    300: '#b0b0b0',
                    400: '#999999',
                    500: '#6d6d6d',
                    600: '#5d5d5d',
                    700: '#4f4f4f',
                    800: '#454545',
                    900: '#3d3d3d',
                    950: '#262626',
                },
            },
        },
    },
    plugins: [],
})
