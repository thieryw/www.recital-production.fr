import { memo } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import heroMp4 from "assets/mp4/home/hero.mp4";
import heroPosterJpg from "assets/jpg/home/hero-poster.jpg";
import { useTranslation } from "i18n";


export const Hero = memo(() => {

    const { t } = useTranslation("Home");
    const { classes } = useStyles();
    const theme = useTheme();

    // Only load the (multi-MB) background video on larger screens. Mobile
    // visitors get the lightweight poster image instead — this keeps the page
    // weight and LCP down on the devices that need it most, and saves their data.
    const shouldLoadVideo = useMediaQuery(theme.breakpoints.up("md"));

    return <div className={classes.root}>
        <div className={classes.backgroundWrapper}>
            <picture>
                <img
                    className={classes.backgroundImage}
                    src={heroPosterJpg}
                    alt=""
                    aria-hidden="true"
                    fetchPriority="high"
                    decoding="async"
                    width={1600}
                    height={1066}
                />
            </picture>
            {shouldLoadVideo && (
                <video
                    className={classes.backgroundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster={heroPosterJpg}
                >
                    <source src={heroMp4} type="video/mp4" />
                </video>
            )}
        </div>
        <div className={classes.backgroundFilter}>

        </div>
        <div className={classes.backgroundFilter2}>

        </div>
        <div className={classes.content}>
            <h1 className={classes.hiddenTitle}>{t("heroHiddenTitle")}</h1>
            <div className={classes.titleWrapper}>
                <Typo className={classes.title} variant="h2">{t("heroTitleLine1")}</Typo>
                <Typo className={classes.titleGold} variant="h2">{t("heroTitleLine2")}</Typo>
                <Typo className={classes.title} variant="h2">{t("heroTitleLine3")}</Typo>
            </div>

            <Typo className={classes.paragraph} variant="body1">{t("heroParagraph")}</Typo>

        </div>
    </div>
});


const useStyles = tss.withName("homeHero").create(({theme}) => {

    return ({
        "root": {
            "minHeight": 800,
            "position": "relative",
            "width": "100vw",
            "height": "100vh",

        },
        "backgroundWrapper": {
            "position": "absolute",
            "width": "100%",
            "height": "100%",
            "top": 0,
            "left": 0,
            "overflow": "hidden"

        },
        "backgroundImage": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "objectFit": "cover",
            "width": "100%",
            "height": "100%"
        },
        "backgroundVideo": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "objectFit": "cover",
            "width": "100%",
            "height": "100%"
        },
        "backgroundFilter": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "background": "rgba(87, 77, 49, 0.7)"

        },
        "backgroundFilter2": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "background": "rgba(0, 0, 0, 0.2)"

        },
        "content": {
            "position": "relative",
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "height": "100%",
            "width": "100%",
            "padding": theme.spacing(4),
            "boxSizing": "border-box"
        },
        "titleWrapper": {},
        "title": {
            "textAlign": "center",
            "color": theme.palette.white.main,
            "fontFamily": '"orpheuspro", serif',
            "fontSize": "clamp(3.5rem, 6.667vw, 8rem)",
            "lineHeight": "1em"
        },
        "hiddenTitle": {
            "position": "absolute",
            "left": 9999,
            "width": 1,
            "height": 1,
            "overflow": "hidden",

        },
        "titleGold": {
            "background": theme.palette.goldGradient.main,
            "color": "transparent",
            "backgroundClip": "text",
            "textAlign": "center",
            "fontFamily": '"orpheuspro", serif',
            "fontSize": "clamp(3.5rem, 6.667vw, 8rem)",
            "lineHeight": "1em"
        },
        "paragraph": {
            "color": theme.palette.white.main,
            "textAlign": "center",
            "marginTop": theme.spacing(5),
            "maxWidth": 524
        }
    })
})
