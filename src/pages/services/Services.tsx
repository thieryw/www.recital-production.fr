import { declareComponentKeys } from "i18nifty";
import { memo } from "react";
import { FAQSection } from "./FAQSection";
import { Hero } from "./Hero";
import { Quality } from "./Quality";
import { Flexibility } from "./Flexibility";
import { Example } from "./Example";
import { Duo } from "./Duo";
import { Reviews } from "pages/home/Reviews";
import { useContext } from "theme";




export const Services = memo(() => {
    const { theme } = useContext();
    return (
        <div>
            <Hero />
            <Quality />
            <Flexibility />
            <Example />
            <Duo />
            <FAQSection />
            <div style={{
                "marginTop": theme.spacing(22),
                "marginBottom": theme.spacing(22)
            }}>

                <Reviews />
            </div>

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
    | "exampleSurtitle"
    | "exampleTitle"
    | "exampleParagraph"
    | "exampleSectionTitle"
>()({ Services });

export type I18n = typeof i18n;