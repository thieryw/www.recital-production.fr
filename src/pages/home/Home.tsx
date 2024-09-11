import { memo } from "react";
import { declareComponentKeys } from "i18n";
import { Hero } from "./Hero";


export const Home = memo(() => {
    return (
        <div>
            <Hero />
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