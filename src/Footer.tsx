import { memo, useMemo } from "react";
import { declareComponentKeys, useTranslation } from "i18n"
import { Footer as FooterComponent } from "components/Footer";
import { useRoute } from "router";
import { linkTo, langOf, routeNameForPage } from "seo/localized";
import { tss } from "tss";
import instaSvg from "assets/svg/Insta.svg";
import ytSvg from "assets/svg/YT.svg";
import Typo from "@mui/material/Typography";
import logoSvg from "assets/svg/footerLogo.svg";
import { EMAIL, MINUTE_CONCERTS_URL } from "seo/seoData";


export const Footer = memo(() => {

    const { t } = useTranslation("Footer");
    const route = useRoute();
    const lang = langOf(route.name);

    const links = useMemo((): {
        href: string;
        onClick?: () => void;
        label: string;
        routeName?: string;
        isSpecial?: boolean;
    }[] => {
        return [
            { "label": t("link0"), ...linkTo("home", lang), "routeName": routeNameForPage("home", lang) },
            { "label": t("link1"), ...linkTo("services", lang), "routeName": routeNameForPage("services", lang) },
            { "label": t("link4"), ...linkTo("musiqueMariage", lang), "routeName": routeNameForPage("musiqueMariage", lang) },
            { "label": t("linkMinuteConcerts"), "href": lang === "en" ? `${MINUTE_CONCERTS_URL}/en.html` : `${MINUTE_CONCERTS_URL}/`, "isSpecial": true },
            { "label": t("link2"), ...linkTo("media", lang), "routeName": routeNameForPage("media", lang) },
            { "label": t("link3"), ...linkTo("contact", lang), "routeName": routeNameForPage("contact", lang) },
        ]

    }, [lang, t])


    const { classes, cx } = useStyles();

    return <FooterComponent
        className={classes.root}
        links={links}
        logo={logoSvg}
        langSwitchLabel={t("langSwitchLabel")}
        brandLine={t("brandLine")}
        activeLinkLabel={links.find(({ routeName }) => routeName === route.name)?.label}
        socialLinks={[
            {
                "href": "https://www.instagram.com/recital_production/",
                "iconUrl": instaSvg,
            },
            {
                "href": "https://www.youtube.com/@recitalproduction",
                "iconUrl": ytSvg
            }
        ]}
        bottomDiv={<div className={classes.bottomDiv}>
            <a className={classes.bdLine} href={`mailto:${EMAIL}`}><Typo className={cx(classes.linkLabel, classes.text, classes.email)} variant="body2">{EMAIL}</Typo></a>
            <Typo className={classes.divider} variant="body2">/</Typo>
            <a className={classes.bdLine} {...linkTo("legal", lang)}><Typo className={cx(classes.linkLabel, classes.text)} variant="body2">{t("legalLinkLabel")}</Typo></a>
            <Typo className={classes.divider} variant="body2">/</Typo>
            <Typo className={cx(classes.bdLine, classes.text)} variant="body2">{t("copyRight")}</Typo>
            <Typo className={classes.divider} variant="body2">/</Typo>
            <div className={cx(classes.designer, classes.bdLine)}>
                <Typo className={classes.text} variant="body2">{t("designed")}</Typo>
                <a target="_blank" className={classes.ideaArt} href="https://dribbble.com/IdeaArt"><Typo className={cx(classes.linkLabel)} variant="body2">{t("designer")}</Typo></a>
            </div>

        </div>}




    />
})

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "marginTop": "auto"

        },
        "bottomDiv": {
            "display": "flex",
            "& a": {
                "textDecoration": "none"
            },
            "opacity": 0.5,
            "minWidth": 0,
            "maxWidth": "100%",
            [theme.breakpoints.down("lg")]: {
                "flexDirection": "column",

            }
        },
        "email": {
            "overflowWrap": "anywhere"
        },
        "designer": {
            "display": "flex",
            "alignItems": "center",
            [theme.breakpoints.down("sm")]: {
                "justifyContent": "center"
            }

        },
        "linkLabel": {
            "textDecoration": "underline",
            "color": theme.palette.gold1.main,
            "letterSpacing": "0rem"
        },
        "bdLine": {
            [theme.breakpoints.down("lg")]: {
                "marginBottom": theme.spacing(2)

            }
        },
        "ideaArt": {
            "marginLeft": theme.spacing(1),
            "& > p": {
                "fontWeight": "bold"
            }
        },
        "text": {
            "textTransform": "uppercase",
            "letterSpacing": "0.05em",
            "fontWeight": "bold",
            [theme.breakpoints.down("sm")]: {
                "textAlign": "center"
            }

        },
        "divider": {
            "letterSpacing": 0,
            "marginLeft": theme.spacing(4),
            "marginRight": theme.spacing(4),
            [theme.breakpoints.down("lg")]: {
                "display": "none"
            }
        }
    })
})

export const { i18n } = declareComponentKeys<
    | "link0"
    | "link1"
    | "link2"
    | "link3"
    | "link4"
    | "linkMinuteConcerts"
    | "legalLinkLabel"
    | "copyRight"
    | "designed"
    | "designer"
    | "langSwitchLabel"
    | "brandLine"
>()({ Footer })

export type I18n = typeof i18n