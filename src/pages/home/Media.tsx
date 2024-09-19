import { useTranslation } from "i18n";
import { memo } from "react";
import { tss } from "tss";
import mediaJpg1 from "assets/jpg/home/en-images-1.jpg";
import mediaJpg2 from "assets/jpg/home/en-images-2.jpg";
import mediaWebp1 from "assets/webp/home/en-images-1.webp";
import mediaWebp2 from "assets/webp/home/en-images-2.webp";
import Typo from "@mui/material/Typography";
import { LinkButton } from "components/LinkButton";
import backgroundSvg from "assets/svg/marble-large.svg";
import backgroundPng from "assets/png/home/rp-background.png";
import { SmallTitle } from "components/SmallTitle";
import { routes } from "router";



export const Media = memo(() => {

    const { classes } = useStyles();
    const { t } = useTranslation("Home");

    return (
        <section className={classes.root}>
            <img className={classes.backgroundPng} src={backgroundPng} alt="background recital production" />
            <div className={classes.inner}>
                <div className={classes.titleWrapper}>
                    <SmallTitle
                        description={t("mediaSurtitle")}
                        className={classes.surtitle}
                    />
                    <Typo variant="h2">{t("mediaTitle")}</Typo>
                </div>
                <div className={classes.imageWrapper}>
                    <picture>
                        <source srcSet={mediaWebp1} type="image/webp" />
                        <source srcSet={mediaJpg1} type="image/jpeg" />
                        <img className={classes.image1} src={mediaWebp1} alt="quartet" />
                    </picture>
                    <picture>
                        <source srcSet={mediaWebp2} type="image/webp" />
                        <source srcSet={mediaJpg2} type="image/jpeg" />
                        <img className={classes.image2} src={mediaWebp2} alt="cellist" />
                    </picture>

                </div>
                <LinkButton
                    {...routes.media().link}
                    label={t("mediaButtonLabel")}
                    className={classes.link}
                />

            </div>
            <div className={classes.decoSection}>
                <img className={classes.backgroundSvg} src={backgroundSvg} alt="background" />

            </div>
        </section>
    )
})

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "position": "relative"

        },
        "inner": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "flex-start",
            [theme.breakpoints.down("mdPlus")]: {
                ...(()=>{
                    const value = theme.spacing(5);
                    return {
                        "paddingLeft": value,
                        "paddingRight": value
                    }
                })()
            }
        },
        "titleWrapper": {
            "position": "relative",
            "left": theme.spacing(30),
            [theme.breakpoints.down("sm")]: {
                "left": 0

            },
            "marginBottom": theme.spacing(12)
        },
        "surtitle": {
            "marginBottom": theme.spacing(4)

        },
        "imageWrapper": {
            "marginBottom": theme.spacing(12),
            [theme.breakpoints.down("mdPlus")]: {
                "maxWidth": "100%",
                "left": 0,
            }
            
        },
        "image1": {
            "width": 880,
            "position": "relative",
            "left": 45,
            [theme.breakpoints.down("mdPlus")]: {
                "maxWidth": "100%",
                "left": 0,
            }
        },
        "image2": {
            "width": 300,
            "position": "relative",
            "right": 45,
            "top": 90,
            [theme.breakpoints.down("mdPlus")]: {
                "display": "none"
            }
        },
        "link": {
            "position": "relative",
            "left": theme.spacing(30),
            [theme.breakpoints.down("sm")]: {
                "left": 0

            },
        },
        "decoSection": {
            "width": "100%",
            "height": theme.spacing(62),
            "overflow": "hidden",
            "background": theme.palette.patternBackground.main,
            "borderTop": "solid 2px",
            "borderBottom": "solid 2px",
            "borderColor": theme.palette.gold1.main,
            "position": "relative",
            "bottom": theme.spacing(38),
            "zIndex": -1

        },
        "backgroundSvg": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"

        },
        "backgroundPng": {
            "position": "absolute",
            "top": -parseInt(theme.spacing(50)),
            "left": theme.spacing(20),
            "zIndex": -2
        }
    })
})