import { memo } from "react";
import { declareComponentKeys } from "i18n";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Quality } from "./Quality";
import { ServiceSlider } from "./ServiceSlider";


export const Home = memo(() => {
    return (
        <div>
            <Hero />
            <Services />
            <Quality />
            <ServiceSlider />
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
    | "qualityTitle1"
    | "qualityTitle2"
    | "qualityParagraph"
    | "qualityButtonLabel"
    | "slide1"
    | "slide2"
    | "slide3"
    | "slide4"
    | "slide5"
>()({ Home });

export type I18n = typeof i18n;