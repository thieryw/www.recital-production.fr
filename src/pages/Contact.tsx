import { declareComponentKeys } from "i18nifty";
import { memo } from "react";
import Typo from "@mui/material/Typography";
import { tss } from "tss";
import { useTranslation } from "i18n";
import { ReactSVG } from "react-svg";
import { LinkButton } from "components/LinkButton";
import instaSvg from "assets/svg/contact/Insta.svg";
import ytSvg from "assets/svg/contact/YT.svg";
import { PictureAnimator } from "components/PictureAnimator";
import jpg from "assets/jpg/home/en-images-1.jpg";
import webp from "assets/webp/home/en-images-1.webp";
import { ReviewWidget } from "components/ReviewWidget";



export const Contact = memo(() => {
    const { classes, theme } = useStyles();
    const { t } = useTranslation("Contact");
    return (
        <section className={classes.root}>
            {/*<ReactSVG
                src={roundTextSvg}
                className={classes.svgSmallScreen}
            />*/}
            <Typo className={classes.pageTitle} variant="h2">{t("collaborationText")}</Typo>
            <div className={classes.wrapper}>
                <PictureAnimator
                    className={classes.picture}
                    borderRadius=""
                    width={parseInt(theme.spacing(80))}
                    height={parseInt(theme.spacing(50))}
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
                    alt="quality section"

                />
                <div className={classes.contact}>
                    <Typo variant="h4">{t("contactTitle")}</Typo>
                    <a className={classes.email} href={`mailto:${t("email")}`}>
                        <Typo className={classes.emailText} variant="body1">{t("email")}</Typo>
                    </a>
                    <Typo className={classes.contactText} variant="body1">{t("contactText")}</Typo>
                    <LinkButton
                        href=""
                        label={t("referenceSite")}
                    />
                    <div className={classes.social}>
                        <a href="https://www.instagram.com/recital_production/" target="_blank">
                            <ReactSVG className={classes.socialSvg} src={instaSvg} />
                        </a>
                        <a href="https://www.youtube.com/@recitalproduction" target="_blank">
                            <ReactSVG className={classes.socialSvg} src={ytSvg} />
                        </a>

                    </div>
                </div>

            </div>
            <ReviewWidget />


        </section>
    )
});

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "paddingTop": theme.spacing(30),
            [theme.breakpoints.down("md")]: {
                "paddingTop": theme.spacing(40),
                "paddingBottom": theme.spacing(20)
            }

        },
        "pageTitle": {
            "width": 600,
            "textAlign": "center",
            "maxWidth": "90vw"
        },
        "wrapper": {
            "display": "flex",
            "alignItems": "center",
            "marginTop": theme.spacing(20),
            [theme.breakpoints.down("sm")]: {
                "flexDirection": "column"
            },
            "marginBottom": theme.spacing(20)
        },

        "picture": {
            "marginRight": theme.spacing(5),
            [theme.breakpoints.down("sm")]: {
                "marginRight": 0,
                "marginBottom": theme.spacing(14)
            }

        },
        "contact": {
            "position": "relative",
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "gap": theme.spacing(3),
            "paddingTop": theme.spacing(15),
            "marginLeft": theme.spacing(5),
            [theme.breakpoints.down("lg")]: {
                "marginLeft": 0,
            },
            [theme.breakpoints.down("md")]: {
                "paddingTop": 0,
                "justifyItems": "center",
                "gap": theme.spacing(5)
            }

        },
        "email": {
            "textDecoration": "none"
        },
        "emailText": {
            "color": theme.palette.gold1.main
        },
        "contactText": {
            "width": 219,
            [theme.breakpoints.down("md")]: {
                "textAlign": "center"
            }
        },
        "social": {
            "display": "grid",
            "gridTemplateColumns": "repeat(2, 50px)",
            "gap": theme.spacing(2),
            "marginTop": theme.spacing(2)
        },
        "socialSvg": {
            "& svg": {
                "width": 50
            }
        }
    })
})




export const { i18n } = declareComponentKeys<
    | "collaborationText"
    | "contactTitle"
    | "email"
    | "contactText"
    | "referenceSite"
    | "reviewText"
>()({ Contact });


export type I18n = typeof i18n;