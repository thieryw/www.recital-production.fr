import { createI18nApi, declareComponentKeys } from "i18nifty";
import type { ComponentKeyHeader} from "./types";
import {translation as headerFr} from "./resources/fr/header";
import { translation as headerEn } from "./resources/en/header";
import type { ComponentKeyFooter } from "./types";
import { translation as footerFr } from "./resources/fr/footer";
import { translation as footerEn } from "./resources/en/footer";
export { declareComponentKeys };


//List the languages you with to support
export const languages = ["fr", "en"] as const;

//If the user's browser language doesn't match any 
//of the languages above specify the language to fallback to:  
export const fallbackLanguage = "fr";

export type Language = "fr" | "en";

export type LocalizedString = Parameters<typeof resolveLocalizedString>[0];

export const {
	useTranslation,
	resolveLocalizedString,
	useLang,
	$lang,
	useResolveLocalizedString,
	/** For use outside of React */
	getTranslation
} = createI18nApi<
	ComponentKeyHeader |
	ComponentKeyFooter

>()(
	{
		languages,
		fallbackLanguage
	},
	{
		/* spell-checker: disable */
		"fr": {
			"Header": headerFr.Header,
			"Footer": footerFr.Footer

		},
		"en": {
			"Header": headerEn.Header,
			"Footer": footerEn.Footer

		}
		/* spell-checker: enable */
	}
);