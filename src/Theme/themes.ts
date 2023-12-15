import { createTheme } from'@mui/material';

export const theme = createTheme({
    typography: {
        // need to download FONT
        fontFamily: 'Impact, Haettenschweiler, sans-serif',
        
    },

    palette: {
        primary: {
            main: '#FFFFF'
        },
        secondary: {
            main: '#7DC61B',
            light: '#A2D176'
        },
        info: {
            main: '#2BA4C1'
        }
    }
})