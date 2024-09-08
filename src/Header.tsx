import { memo, useMemo } from "react";
import { declareComponentKeys, useLang, useTranslation } from "i18n"
import { Header as HeaderComponent } from "components/Header";
import { routes, useRoute } from "router";
import logoSvg from "assets/svg/logoHeader.svg";
import logoDarkSvg from "assets/svg/logoHeaderDark.svg";
import { ReactSVG } from "react-svg";
import { tss } from "tss";


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


    const { classes } = useStyles();

    return <HeaderComponent
        activeLinkLabel={links.find(({ routeName }) => routeName === route.name)?.label}
        links={links}
        logo={<a className={classes.logoWrapper} {...routes.home().link}><ReactSVG className={classes.logo} src={route.name === "home" ? logoDarkSvg : logoSvg} /></a>}
        isDark={route.name === "home"}
        mobile={{
            "logoOpen": <a className={classes.logoWrapper} {...routes.home().link}><ReactSVG className={classes.logo} src={logoDarkSvg} /></a>,
            "logoClosed": <a className={classes.logoWrapper} {...routes.home().link}><ReactSVG className={classes.logo} src={route.name === "home" ? logoDarkSvg : logoSvg} /></a>

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
        }
    })
})

export const { i18n } = declareComponentKeys<
    | "title"
    | "link1"
    | "link2"
    | "link3"
>()({ Header })

export type I18n = typeof i18n