import { declareComponentKeys } from "i18nifty";
import { memo } from "react";
import { FAQSection } from "./FAQSection";




export const Services = memo(() => {
    return (
        <div style={{
            "paddingTop": 400
        }}>
            <FAQSection />

        </div>
    )
})

export const { i18n } = declareComponentKeys<
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