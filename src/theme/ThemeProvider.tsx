import /*React,*/ { type ReactNode } from "react";
import { createTheme as createMuiTheme, ThemeProvider as MuiThemeProvider, Palette } from "@mui/material/styles";
import type { TypographyOptions } from "@mui/material/styles/createTypography";

function setSpacing(factor: number) {
    const width = window.innerWidth;
    if (width >= 1920) {
        return 8 * factor;
    }
    if (width >= 1440) {
        return 7 * factor;
    }
    if (width >= 1280) {
        return 6 * factor;
    }
    if (width >= 960) {
        return 5 * factor;
    }
    return 4 * factor;
}


const typo: (palette: Palette) => TypographyOptions = (palette) => {
    return ({
        "h1": {
            "fontFamily": '"orpheuspro", serif',
            "fontSize": "clamp(4.5rem, 6.667vw, 8rem)",
            "color": palette.headings.main,
            "lineHeight": "1em"

        },
        "h2": {
            "fontFamily": '"orpheuspro", serif',
            "fontSize": "clamp(2.5rem, 3.333vw, 4rem)",
            "color": palette.headings.main,
            "lineHeight": "1em",
            "letterSpacing": "-0.01em"
            
        },
        "h3": {
            "fontFamily": '"orpheuspro", serif',
            "fontSize": "clamp(2rem, 2.917vw, 3.5rem)",
            "color": palette.headings.main,
            "lineHeight": "1em",
            "letterSpacing": "-0.01em"

        },
        "h4": {
            "fontFamily": '"orpheuspro", serif',
            "fontSize": "clamp(1.3rem, 1.667vw, 2rem)",
            "color": palette.headings.main,
            "lineHeight": "1em",
            "letterSpacing": "-0.01em"

        },
        "body1": {
            "fontFamily": '"proxima-nova", sans-serif',
            "fontSize": "clamp(0.9rem, 0.886vw, 1.063rem)",
            "color": palette.body.main,
            "lineHeight": "1.5em",
            "letterSpacing": "0em"

        },
        "body2": {
            "fontFamily": '"proxima-nova", sans-serif',
            "fontSize": "clamp(0.790rem, 0.677vw, 0.813rem)",
            "color": palette.body.main,
            "lineHeight": "1em",
            "letterSpacing": "0.5em"

        },
        "button": {
            "fontFamily": '"proxima-nova", sans-serif',
            "fontSize": "clamp(0.9rem, 0.886vw, 1.063rem)",
            "color": palette.body.main,
            "lineHeight": "1em",
            "letterSpacing": "0.05em",
            "fontWeight": "bold"

        }
    })
}


const muiTheme = createMuiTheme({
    "typography": typo,
    "spacing": setSpacing,
    "breakpoints": {
        "values": {
            "xl": 1920,
            "lgPlus": 1650,
            "lg": 1440,
            "mdPlus": 1200,
            "md": 960,
            "sm": 600,
            "xs": 400
        }
    },
    "palette": {
        "background": {
            "default": "#FAF9F6",
        },
        "goldGradient": {
            "main": "linear-gradient(185deg, rgba(189,166,107,1) 0%, rgba(189,166,107,1) 20%, rgba(255,231,171,1) 44%, rgba(189,166,107,1) 63%, rgba(87,77,49,1) 100%)"
        },
        "gold1": {
            "main": "#BDA66B"
        },
        "gold2": {
            "main": "#FFE7AB"
        },
        "cardDark": {
            "main": "linear-gradient(185deg, rgba(93,87,87,1) 0%, rgba(24,23,23,1) 100%)"
        },
        "footerDark": {
            "main": "linear-gradient(185deg, rgba(93,87,87,1) 0%, rgba(24,23,23,1) 100%)"
        },
        "videoFilter": {
            "main": "linear-gradient(185deg, rgba(93,87,87,0.8) 0%, rgba(24,23,23,0.8) 100%)"
        },
        "icon": {
            "main": "#D5D5D5"
        },
        "elementBackground": {
            "main": "#F8F6F2"
        },
        "patternBackground": {
            "main": "#F4F1EB"
        },
        "headings": {
            "main": "#404040"
        },
        "body": {
            "main": "#959595"
        },
        "heroVideoFilter": {
            "main": "rgba(56,49,30,0.7)"
        }
    }

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

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        lgPlus: true;
        mdPlus: true;
    }
    interface Palette {
        goldGradient: Palette['primary'];
        cardDark: Palette['primary'];
        footerDark: Palette['primary'];
        videoFilter: Palette['primary'];
        icon: Palette['primary'];
        elementBackground: Palette['primary'];
        patternBackground: Palette['primary'];
        gold1: Palette['primary'];
        gold2: Palette['primary'];
        headings: Palette['primary'];
        heroVideoFilter: Palette['primary'];
        body: Palette['primary'];

        

    }

    interface PaletteOptions {
        goldGradient: PaletteOptions['primary'];
        cardDark: PaletteOptions['primary'];
        footerDark: PaletteOptions['primary'];
        videoFilter: PaletteOptions['primary'];
        icon: PaletteOptions['primary'];
        elementBackground: PaletteOptions['primary'];
        patternBackground: PaletteOptions['primary'];
        gold1: PaletteOptions['primary'];
        gold2: PaletteOptions['primary'];
        headings: PaletteOptions['primary'];
        heroVideoFilter: PaletteOptions['primary'];
        body: PaletteOptions['primary'];
    }

}