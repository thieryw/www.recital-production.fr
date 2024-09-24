import { declareComponentKeys } from "i18nifty";
import { memo } from "react";
import Typo from "@mui/material/Typography";
import { tss } from "tss";
import { useTranslation } from "i18n";
import roundTextSvg from "assets/svg/contact/rounded-text.svg";
import { ReactSVG } from "react-svg";
import { LinkButton } from "components/LinkButton";
import instaSvg from "assets/svg/contact/Insta.svg";
import ytSvg from "assets/svg/contact/YT.svg";
import { keyframes } from "tss-react";



export const Contact = memo(() => {
    const { classes } = useStyles();
    const { t } = useTranslation("Contact");
    return (
        <section className={classes.root}>
            <ReactSVG
                src={roundTextSvg}
                className={classes.svgSmallScreen}
            />

            <div className={classes.collaboration}>
                <ReactSVG
                    src={roundTextSvg}
                    className={classes.svg}
                />
                <Typo className={classes.collaborationText} variant="body1">{t("collaborationText")}</Typo>
            </div>
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
                    <a>
                        <ReactSVG className={classes.socialSvg} src={ytSvg} />
                    </a>

                </div>
            </div>

        </section>
    )
});

const useStyles = tss.create(({ theme }) => {
    const myAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
    return ({
        "root": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            [theme.breakpoints.down("md")]: {
                "height": 800,
                "paddingTop": theme.spacing(40),
                "paddingBottom": theme.spacing(20)
            }

        },
        "collaboration": {
            "position": "relative",
            "minWidth": 923,
            "minHeight": 923,
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "right": 100,
            "top": 286,
            "marginRight": theme.spacing(5),
            [theme.breakpoints.down("lg")]: {
                "minWidth": 700,
                "minHeight": 700,
                "marginRight": 0
            },
            [theme.breakpoints.down("md")]: {
                "display": "none"
            }


        },
        "collaborationText": {
            "width": 186,
            [theme.breakpoints.down("md")]: {
                "width": 240,
                "textAlign": "center",
                "maxWidth": "95%"
            }

        },
        "svg": {
            "& svg": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": "100%",
                "objectFit": "cover",
                "animation": `${myAnimation} 30s infinite linear`
            }
        },

        "svgSmallScreen": {
            "& svg": {
                "position": "absolute",
                "top": theme.spacing(40),
                "left": "calc(50% - 400px)",
                "width": 800,
                "height": 800,
                "animation": `${myAnimation} 30s infinite linear`,
                "fill": theme.palette.patternBackground.main

            },
            [theme.breakpoints.up("md")]: {
                "display": "none"
            }
        },

        "contact": {
            "position": "relative",
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "gap": theme.spacing(3),
            "paddingTop": theme.spacing(30),
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
>()({ Contact });


export type I18n = typeof i18n;