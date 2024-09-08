import { memo, useMemo } from "react";
import { declareComponentKeys, useLang, useTranslation } from "i18n"
import { Header as HeaderComponent } from "components/Header";
import { routes, useRoute } from "router";
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
    const { lang } = useLang();

    const links = useMemo((): {
        href: string;
        onClick?: () => void;
        label: string;
        routeName: string;
    }[] => {
        return [
            {
                "label": t("link0"),
                ...routes.home().link,
                "routeName": routes.home().name
            },
            {
                "label": t("link1"),
                ...routes.services().link,
                "routeName": routes.services().name
            },
            {
                "label": t("link2"),
                ...routes.media().link,
                "routeName": routes.media().name
            },
            {
                "label": t("link3"),
                ...routes.contact().link,
                "routeName": routes.contact().name
            },

        ]

    }, [lang])


    const { classes, windowInnerWidth, theme } = useStyles();

    return <HeaderComponent
        activeLinkLabel={links.find(({ routeName }) => routeName === route.name)?.label}
        links={windowInnerWidth >= theme.breakpoints.values.sm ? links.filter((link) => link.routeName !== "home") : links}
        logo={<a className={classes.logoWrapper} {...routes.home().link}><ReactSVG className={classes.logo} src={route.name === "home" ? logoDarkSvg : logoSvg} /></a>}
        isDark={route.name === "home"}
        mobile={{
            "logoOpen": <a className={classes.logoWrapper} {...routes.home().link}><ReactSVG className={classes.logo} src={logoDarkSvg} /></a>,
            "logoClosed": <a className={classes.logoWrapper} {...routes.home().link}><ReactSVG className={classes.logo} src={route.name === "home" ? logoDarkSvg : logoSvg} /></a>,
            "socialLinks": [
                {
                    "iconUrl": instaSvg,
                    "href": ""
                },
                {
                    "iconUrl": ytSvg,
                    "href": ""
                }
            ],
            "bottomDiv": <div className={classes.bottomDiv}>
                <a className={classes.bdLine} {...routes.legal().link}><Typo className={classes.linkLabel} variant="button">{t("legalLinkLabel")}</Typo></a>
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
    | "legalLinkLabel"
    | "copyRight"
    | "designed"
    | "designer"
>()({ Header })

export type I18n = typeof i18n