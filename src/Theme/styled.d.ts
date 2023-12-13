import 'styled-components';
import { Theme } from '@mui/material/styles';
// import { Style } from '"https://use.typekit.net/fwx1jzy.css"';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}