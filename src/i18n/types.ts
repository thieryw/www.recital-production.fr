import type { GenericTranslations } from "i18nifty";
import type { fallbackLanguage, Language } from "./i18n";


export type ComponentKeyHeader = 
    | import("Header").I18n


export type TranslationHeader<L extends Language> = GenericTranslations<
    ComponentKeyHeader,
    Language,
    typeof fallbackLanguage,
    L
>