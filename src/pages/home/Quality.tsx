import { memo } from "react";
import { tss } from "tss";
import { PictureAnimator } from "components/PictureAnimator";
import { LinkButton } from "components/LinkButton";
import backgroundSvg from "assets/svg/marble-court.svg"
import { useTranslation } from "i18n";
import Typo from "@mui/material/Typography";
import qualityJpeg from "assets/jpg/home/qualite.jpg";
import qualityWebp from "assets/webp/home/qualite.webp";
import { routes } from "router";

export const Quality = memo(() => {
    const { classes, cx, theme, windowInnerWidth } = useStyles();
    const { t } = useTranslation("Home");
    return (
        <section className={classes.root}>
            <div className={classes.inner}>
                <img className={classes.background} src={backgroundSvg} alt="background svg" />
                <PictureAnimator
                    className={classes.picture}
                    borderRadius=""
                    width={parseInt(theme.spacing(64))}
                    height={parseInt(theme.spacing(64))}
                    src={qualityWebp}
                    sources={[
                        {
                            "srcSet": qualityWebp,
                            "type": "image/webp"
                        },
                        {
                            "srcSet": qualityJpeg,
                            "type": "image/jpeg"
                        }
                    ]}
                    alt="quality section"

                />
                <div className={classes.textWrapper}>
                    <div>
                        <Typo className={classes.text} variant="h3">{t("qualityTitle1")}</Typo>
                        <Typo className={cx(classes.text, classes.textGold)} variant="h3">{t("qualityTitle2")}</Typo>
                    </div>
                    <Typo className={classes.text} variant="body1">{t("qualityParagraph")}</Typo>
                    <LinkButton
                        {
                        ...routes.services().link
                        }
                        label={t("qualityButtonLabel")}
                    />
                </div>


            </div>
        </section>
    )
});

const useStyles = tss.create(({ theme }) => {
    const innerMargin = theme.spacing(7);
    return ({
        "root": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "paddingTop": theme.spacing(10),
            "paddingBottom": theme.spacing(10)
        },
        "inner": {
            "position": "relative",
            "left": innerMargin,
            "maxWidth": 900,
            "display": "flex",
            "alignItems": "center",
            "background": theme.palette.cardDark.main,
            ...(() => {
                const value = theme.spacing(8);
                return {
                    "paddingTop": value,
                    "paddingBottom": value
                }
            })(),
            "boxShadow": theme.shadows[1],
            "paddingRight": parseInt(innerMargin) * 2,
            "boxSizing": "border-box",
            [theme.breakpoints.down("mdPlus")]: {
                "maxWidth": "unset",
                "width": "80%"
            },
            [theme.breakpoints.down("sm")]: {
                "width": "100%",
                "left": 0,
                ...(()=>{
                    const value = theme.spacing(5);
                    return {
                        "paddingRight": value,
                        "paddingLeft": value
                    }
                })()
            }

        },
        "background": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%"

        },
        "picture": {
            //"flex": 1
            "position": "relative",
            "right": parseInt(innerMargin) * 2,
            [theme.breakpoints.down("sm")]: {
                "display": "none"
            }

        },
        "textWrapper": {
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "gap": theme.spacing(5),
            "justifyItems": "center"
        },
        "text": {
            "textAlign": "center",
            "color": theme.palette.white.main
        },
        "textGold": {
            "color": "transparent",
            "background": theme.palette.goldGradient.main,
            "backgroundClip": "text"
        }
    })
})
