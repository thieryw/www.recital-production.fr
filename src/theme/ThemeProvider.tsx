import /*React,*/ { type ReactNode } from "react";
import { createTheme as createMuiTheme, ThemeProvider as MuiThemeProvider, Palette } from "@mui/material/styles";
//import type { TypographyOptions } from "@mui/material/styles/createTypography";


const muiTheme = createMuiTheme({

});


export function ThemeProvider(props: {
    children: ReactNode
}) {
    return (
        <MuiThemeProvider theme={muiTheme}>
            {props.children}
        </MuiThemeProvider>
    )
};