import { memo } from "react";
import { declareComponentKeys } from "i18n";
import { Hero } from "./Hero";
import { useRoute } from "router";


export const Home = memo(() => {
    const route = useRoute();
    return (
        <div>
            {route.name === "home" && <Hero />}
        </div>
    )
})

export const { i18n } = declareComponentKeys<
    | "heroTitleLine1"
    | "heroTitleLine2"
    | "heroTitleLine3"
    | "heroParagraph"
>()({ Home });

export type I18n = typeof i18n;