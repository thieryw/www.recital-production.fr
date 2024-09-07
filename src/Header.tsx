import { memo, useRef } from "react";
import { declareComponentKeys, useTranslation } from "i18n"
import { Header as HeaderComponent } from "components/Header";
import { routes, useRoute } from "router";


export const Header = memo(() => {

    const { t } = useTranslation("Header");
    const route = useRoute();
    const linksRef = useRef<{
        href: string;
        onClick?: () => void;
        label: string;
        routeName: string;
    }[]>([
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

    ]);
    return <HeaderComponent
        activeLinkLabel={linksRef.current.find(({ routeName }) => routeName === route.name)?.label}
        links={linksRef.current}
        logo={<div></div>}

    />
})

export const { i18n } = declareComponentKeys<
    | "title"
    | "link1"
    | "link2"
    | "link3"
>()({ Header })

export type I18n = typeof i18n