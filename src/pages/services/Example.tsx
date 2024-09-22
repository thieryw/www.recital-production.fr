import { memo } from "react";
import Typo from "@mui/material/Typography";
import jpg from "assets/jpg/services/quatuor-video.jpg";
import webp from "assets/webp/services/quatuor-video.webp";
import { Video } from "components/Video";
import { SmallTitle } from "components/SmallTitle";
import { useTranslation } from "i18n";
import { tss } from "tss";
import backgroundSvg from "assets/svg/marble-large.svg";


export const Example = memo(() => {
    const { t } = useTranslation("Services");
    const { classes, theme, windowInnerWidth } = useStyles();
    return (
        <section className={classes.root}>
            <div className={classes.decoSection}>
                <img className={classes.backgroundSvg} src={backgroundSvg} alt="background" />

            </div>
            <SmallTitle
                description={t("exampleSectionTitle")}
            />
            <div className={classes.content}>
                <Video
                    className={classes.video}
                    borderRadius=""
                    src={webp}
                    sources={[
                        {
                            "srcSet": webp,
                            "type": "image/webp"
                        },
                        {
                            "srcSet": jpg,
                            "type": "image/jpeg"
                        }
                    ]}
                    width={windowInnerWidth > theme.breakpoints.values.md ? 673 : 600}
                    height={windowInnerWidth > theme.breakpoints.values.md ? 450 : 400}
                    videoId="Chw4LtjoQS0"
                    rgbaFilter="rgba(0, 0, 0, 0.5)"
                />
                <div className={classes.textWrapper}>
                    <Typo className={classes.surtitle} variant="button">{t("exampleSurtitle")}</Typo>
                    <Typo className={classes.title} variant="h3">{t("exampleTitle")}</Typo>
                    <Typo className={classes.paragraph} variant="body1">{t("exampleParagraph")}</Typo>

                </div>
            </div>

        </section>
    )
});


const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "display": "flex",
            "alignItems": "flex-start",
            "justifyContent": "space-between",
            ...(()=>{
                const value = theme.spacing(25);
                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                }
            })(),
            "boxSizing": "border-box",
            "marginBottom": theme.spacing(22),
            [theme.breakpoints.between("md", "mdPlus")]: {
                "flexDirection": "column",
                "alignItems": "flex-start",
                "justifyContent": "center"
            },
            [theme.breakpoints.down("md")]: {
                "alignItems": "center",
                "flexDirection": "column",
                "justifyContent": "center",
                "paddingLeft": theme.spacing(5),
                "paddingRight": theme.spacing(5),
            },
            "position": "relative"

        },
        "content": {
            "width": 680,
            "maxWidth": "100%",
            [theme.breakpoints.down("mdPlus")]: {
                "marginTop": theme.spacing(6)
            },
            "display": "flex",
            "flexDirection": "column",
            [theme.breakpoints.down("md")]: {
                "alignItems": "center"
            }
        },
        "video": {

        },
        "surtitle": {
            "color": theme.palette.gold1.main,
            [theme.breakpoints.down("md")]: {
                "textAlign": "center"
            }
        },
        "textWrapper": {
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "gap": theme.spacing(4),
            "marginTop": theme.spacing(6)
        },
        "title": {
            [theme.breakpoints.down("md")]: {
                "textAlign": "center"
            }
        },
        "paragraph": {
            [theme.breakpoints.down("md")]: {
                "textAlign": "center"
            }

        },
        "decoSection": {
            "width": "100%",
            "height": theme.spacing(32),
            "overflow": "hidden",
            "background": theme.palette.patternBackground.main,
            "borderTop": "solid 2px",
            "borderBottom": "solid 2px",
            "borderColor": theme.palette.gold1.main,
            "position": "absolute",
            "bottom": theme.spacing(38),
            "zIndex": -1,
            "top": 80,
            "left": 0,
            [theme.breakpoints.down("mdPlus")]: {
                "opacity": 0
            }

        },
        "backgroundSvg": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"

        },
    })
})