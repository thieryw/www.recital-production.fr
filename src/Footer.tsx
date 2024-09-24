import { memo, useMemo } from "react";
import { declareComponentKeys, useLang, useTranslation } from "i18n"
import { Footer as FooterComponent } from "components/Footer";
import { routes, useRoute } from "router";
import { tss } from "tss";
import instaSvg from "assets/svg/Insta.svg";
import ytSvg from "assets/svg/YT.svg";
import Typo from "@mui/material/Typography";
import logoSvg from "assets/svg/footerLogo.svg";


export const Footer = memo(() => {

    const { t } = useTranslation("Footer");
    const { lang } = useLang();
    const route = useRoute();

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


    const { classes, cx } = useStyles();

    return <FooterComponent
        className={classes.root}
        links={links}
        logo={logoSvg}
        activeLinkLabel={links.find(({ routeName }) => routeName === route.name)?.label}
        socialLinks={[
            {
                "href": "https://www.instagram.com/recital_production/",
                "iconUrl": instaSvg,
            },
            {
                "href": "",
                "iconUrl": ytSvg
            }
        ]}
        bottomDiv={<div className={classes.bottomDiv}>
            <a className={classes.bdLine} {...routes.legal().link}><Typo className={cx(classes.linkLabel, classes.text)} variant="body2">{t("legalLinkLabel")}</Typo></a>
            <Typo className={classes.divider} variant="body2">/</Typo>
            <Typo className={cx(classes.bdLine, classes.text)} variant="body2">{t("copyRight")}</Typo>
            <Typo className={classes.divider} variant="body2">/</Typo>
            <div className={cx(classes.designer, classes.bdLine)}>
                <Typo className={classes.text} variant="body2">{t("designed")}</Typo>
                <a className={classes.ideaArt} href="https://dribbble.com/IdeaArt"><Typo className={cx(classes.linkLabel)} variant="body2">{t("designer")}</Typo></a>
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
            [theme.breakpoints.down("lg")]: {
                "flexDirection": "column",

            }
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
    | "legalLinkLabel"
    | "copyRight"
    | "designed"
    | "designer"
>()({ Footer })

export type I18n = typeof i18n