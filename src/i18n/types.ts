import type { GenericTranslations } from "i18nifty";
import type { fallbackLanguage, Language } from "./i18n";


export type ComponentKeyHeader =
    | import("Header").I18n

export type ComponentKeyFooter =
    | import("Footer").I18n

export type ComponentKeyHome =
    | import("pages/home").I18n

export type ComponentKeyServices =
    | import("pages/services").I18n

export type ComponentKeyMedia =
    | import("pages/Media").I18n

export type ComponentKeyContact = 
    | import("pages/Contact").I18n


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

export type TranslationServices<L extends Language> = GenericTranslations<
    ComponentKeyServices,
    Language,
    typeof fallbackLanguage,
    L
>

export type TranslationMedia<L extends Language> = GenericTranslations<
    ComponentKeyMedia,
    Language,
    typeof fallbackLanguage,
    L
>

export type TranslationContact<L extends Language> = GenericTranslations<
    ComponentKeyContact,
    Language,
    typeof fallbackLanguage,
    L
>