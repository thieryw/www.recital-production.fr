import { declareComponentKeys } from "i18nifty";
import { memo } from "react";
import { FAQSection } from "./FAQSection";
import { Hero } from "./Hero";
import { Quality } from "./Quality";
import { Flexibility } from "./Flexibility";




export const Services = memo(() => {
    return (
        <div>
            <Hero />
            <Quality />
            <Flexibility />
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
    | "flexibilityTitle"
    | "flexibilityParagraph"
    | "flexibilityCardTitle1"
    | "flexibilityCardParagraph1"
    | "flexibilityCardTitle2"
    | "flexibilityCardParagraph2"
    | "flexibilityCardTitle3"
    | "flexibilityCardParagraph3"
>()({ Services });

export type I18n = typeof i18n;