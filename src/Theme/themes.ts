import { createTheme } from'@mui/material';

export const theme = createTheme({
    typography: {
        // need to download FONT
        fontFamily: 'Impact, Haettenschweiler, sans-serif',
        
    },

    palette: {
        primary: {
            main: '#E3ECB6'
        },
        secondary: {
            main: '#7DC61B',
            light: '#A2D176'
        },
        info: {
            main: '#BEF2E9'
        }
    }
})