import type { GenericTranslations } from "i18nifty";
import type { fallbackLanguage, Language } from "./i18n";


export type ComponentKeyHeader =
    | import("Header").I18n

export type ComponentKeyFooter =
    | import("Footer").I18n

export type ComponentKeyHome =
    | import("pages/home/Home").I18n

export type TranslationHeader<L extends Language> = GenericTranslations<
    ComponentKeyHeader,
    Language,
    typeof fallbackLanguage,
    L
>

export type TranslationFooter<L extends Language> = GenericTranslations<
    ComponentKeyFooter,
    Language,
    typeof fallbackLanguage,
    L
>

export type TranslationHome<L extends Language> = GenericTranslations<
    ComponentKeyHome,
    Language,
    typeof fallbackLanguage,
    L
>