import { memo } from "react";
import { declareComponentKeys } from "i18n";
import { Hero } from "./Hero";
import { Services } from "./Services";


export const Home = memo(() => {
    return (
        <div>
            <Hero />
            <Services />
        </div>
    )
})

export const { i18n } = declareComponentKeys<
    | "heroTitleLine1"
    | "heroTitleLine2"
    | "heroTitleLine3"
    | "heroParagraph"
    | "servicesSurtitle"
    | "servicesTitle"
    | "servicesParagraph"
    | "servicesButtonLabel"
>()({ Home });

export type I18n = typeof i18n;