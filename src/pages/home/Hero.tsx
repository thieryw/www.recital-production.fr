import { memo } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography"
import heroMp4 from "assets/mp4/home/hero.mp4";
import { useTranslation } from "i18n";


export const Hero = memo(() => {

    const { t } = useTranslation("Home");
    const { classes } = useStyles();

    return <div className={classes.root}>
        <div className={classes.backgroundWrapper}>
            <video className={classes.backgroundVideo} autoPlay loop muted playsInline>
                <source src={heroMp4} type="video/mp4" />
            </video>
        </div>
        <div className={classes.backgroundFilter}>

        </div>
        <div className={classes.backgroundFilter2}>

        </div>
        <div className={classes.content}>
            <div className={classes.titleWrapper}>
                <Typo className={classes.title} variant="h1">{t("heroTitleLine1")}</Typo>
                <Typo className={classes.titleGold} variant="h1">{t("heroTitleLine2")}</Typo>
                <Typo className={classes.title} variant="h1">{t("heroTitleLine3")}</Typo>
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
        "backgroundVideo": {
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
            "color": theme.palette.white.main,
            "textAlign": "center"
        },
        "titleGold": {
            "background": theme.palette.goldGradient.main,
            "color": "transparent",
            "backgroundClip": "text",
            "textAlign": "center"
        },
        "paragraph": {
            "color": theme.palette.white.main,
            "textAlign": "center",
            "marginTop": theme.spacing(5),
            "maxWidth": 524
        }
    })
})