import { declareComponentKeys } from "i18nifty";
import { memo } from "react";
import { FAQSection } from "./FAQSection";
import { Hero } from "./Hero";
import { Quality } from "./Quality";




export const Services = memo(() => {
    return (
        <div>
            <Hero />
            <Quality />
            <FAQSection />

        </div>
    )
})

export const { i18n } = declareComponentKeys<
    | "heroTitle"
    | "heroParagraph"
    | "heroCardTitle1"
    | "heroCardTitle2"
    | "heroCardTitle3"
    | "contact"
    | "qualityTitle"
    | "qualityParagraph"
    | "qualityCardTitle1"
    | "qualityCardParagraph1"
    | "qualityCardTitle2"
    | "qualityCardParagraph2"
    | "qualityCardTitle3"
    | "qualityCardParagraph3"
    | "qualityButtonLabel"
    | "faqSectionTitle"
    | "faq1"
    | "response1"
    | "faq2"
    | "response2"
    | "faq3"
    | "response3"
    | "faq4"
    | "response4"
>()({ Services });

export type I18n = typeof i18n;