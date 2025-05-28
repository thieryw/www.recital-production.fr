import { memo } from "react";
import { declareComponentKeys } from "i18n";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Quality } from "./Quality";
import { ServiceSlider } from "./ServiceSlider";
import { Media } from "./Media";
import { Reviews } from "./Reviews";
import { Insta } from "./Insta";


export const Home = memo(() => {
    return (
        <div>
            <Hero />
            <Services />
            <Quality />
            <ServiceSlider />
            <Media />
            <Reviews />
            <Insta />
        </div>
    )
})

export const { i18n } = declareComponentKeys<
    | "heroTitleLine1"
    | "heroTitleLine2"
    | "heroTitleLine3"
    | "heroHiddenTitle"
    | "heroParagraph"
    | "servicesSurtitle"
    | "servicesTitle"
    | "servicesParagraph"
    | "servicesButtonLabel"
    | "qualityTitle1"
    | "qualityTitle2"
    | "qualityParagraph"
    | "qualityButtonLabel"
    | "qualityPictureDesc"
    | "slide1"
    | "slide2"
    | "slide3"
    | "slide4"
    | "slide5"
    | "mediaSurtitle"
    | "mediaTitle"
    | "mediaButtonLabel"
    | "mediaAltImage1"
    | "mediaAltImage2"
    | "reviewsSurtitle"
    | "reviewsTitle"
    | "reviewsParagraph"
    | "reviewsLinkLabel"
    | "instaSurtitle"
    | "instaTitle"
    | "instaButtonLabel"
>()({ Home });

export type I18n = typeof i18n;