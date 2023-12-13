import { createTheme } from'@mui/material';

export const theme = createTheme({
    typography: {
        // need to download FONT
        fontFamily: 'Impact, Haettenschweiler, sans-serif',
        
    },
    // {
    //     font-family: "blockhead-dark-side", sans-serif;
    //     font-weight: 400;
    //     font-style: normal;
    // },
    // KEEP THESE IN MIND WHEN CALLING
    palette: {
        primary: {
            main: '#E3ECB6'
        },
        secondary: {
            main: '#7DC61B',
            light: '#A2D176'
        },
        info: {
            main: '#BEF2E4'
        }
    }
})