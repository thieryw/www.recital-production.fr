import { memo, useMemo } from "react";
import { declareComponentKeys, useTranslation } from "i18n"
import { Header as HeaderComponent } from "components/Header";
import { useRoute } from "router";
import { linkTo, langOf, pageOf, routeNameForPage } from "seo/localized";
import type { Page } from "seo/seoData";
import logoSvg from "assets/svg/logoHeader.svg";
import logoDarkSvg from "assets/svg/logoHeaderDark.svg";
import { ReactSVG } from "react-svg";
import { tss } from "tss";
import instaSvg from "assets/svg/Insta.svg";
import ytSvg from "assets/svg/YT.svg";
import Typo from "@mui/material/Typography";


export const Header = memo(() => {

    const { t } = useTranslation("Header");
    const route = useRoute();
    const lang = langOf(route.name);
    const currentPage = pageOf(route.name);

    const links = useMemo((): {
        href: string;
        onClick?: () => void;
        label: string;
        routeName: string;
        page: Page;
    }[] => {
        return [
            { "label": t("link0"), ...linkTo("home", lang), "routeName": routeNameForPage("home", lang), "page": "home" },
            { "label": t("link1"), ...linkTo("services", lang), "routeName": routeNameForPage("services", lang), "page": "services" },
            { "label": t("link4"), ...linkTo("musiqueMariage", lang), "routeName": routeNameForPage("musiqueMariage", lang), "page": "musiqueMariage" },
            { "label": t("link2"), ...linkTo("media", lang), "routeName": routeNameForPage("media", lang), "page": "media" },
            { "label": t("link3"), ...linkTo("contact", lang), "routeName": routeNameForPage("contact", lang), "page": "contact" },
        ]

    }, [lang, t])


    const { classes, windowInnerWidth, theme } = useStyles();

    return <HeaderComponent
        activeLinkLabel={links.find(({ routeName }) => routeName === route.name)?.label}
        links={windowInnerWidth >= theme.breakpoints.values.sm ? links.filter((link) => link.page !== "home") : links}
        logo={<a className={classes.logoWrapper} {...linkTo("home", lang)}><ReactSVG className={classes.logo} src={currentPage === "home" ? logoDarkSvg : logoSvg} /></a>}
        isDark={currentPage === "home"}
        mobile={{
            "logoOpen": <a className={classes.logoWrapper} {...linkTo("home", lang)}><ReactSVG className={classes.logo} src={logoDarkSvg} /></a>,
            "logoClosed": <a className={classes.logoWrapper} {...linkTo("home", lang)}><ReactSVG className={classes.logo} src={currentPage === "home" ? logoDarkSvg : logoSvg} /></a>,
            "socialLinks": [
                {
                    "iconUrl": instaSvg,
                    "href": "https://www.instagram.com/recital_production/"
                },
                {
                    "iconUrl": ytSvg,
                    "href": ""
                }
            ],
            "bottomDiv": <div className={classes.bottomDiv}>
                <a className={classes.bdLine} {...linkTo("legal", lang)}><Typo className={classes.linkLabel} variant="button">{t("legalLinkLabel")}</Typo></a>
                <Typo className={classes.bdLine} variant="button">{t("copyRight")}</Typo>
                <div className={classes.designer}>
                    <Typo variant="button">{t("designed")}</Typo>
                    <a className={classes.ideaArt} href="https://dribbble.com/IdeaArt"><Typo className={classes.linkLabel} variant="body1">{t("designer")}</Typo></a>
                </div>

            </div>

        }}


    />
})

const useStyles = tss.create(({ theme }) => {
    return ({
        "logoWrapper": {},
        "logo": {
            "& svg": {
                "width": theme.spacing(23),
                "minWidth": 150
            }
        },
        "bottomDiv": {
            "display": "flex",
            "flexDirection": "column",
            "& a": {
                "textDecoration": "none"
            },
            "opacity": 0.5
        },
        "designer": {
            "display": "flex",
            "alignItems": "center"

        },
        "linkLabel": {
            "textDecoration": "underline",
            "color": theme.palette.gold1.main
        },
        "bdLine": {
            "marginBottom": theme.spacing(3)
        },
        "ideaArt": {
            "marginLeft": theme.spacing(2),
            "& > p": {
                "fontWeight": "bold"
            }
        }
    })
})

export const { i18n } = declareComponentKeys<
    | "title"
    | "link0"
    | "link1"
    | "link2"
    | "link3"
    | "link4"
    | "legalLinkLabel"
    | "copyRight"
    | "designed"
    | "designer"
>()({ Header })

export type I18n = typeof i18n