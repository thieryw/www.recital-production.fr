import { createRouter, defineRoute } from "type-route";
import { makeThisModuleAnExecutableRouteLister } from "github-pages-plugin-for-type-route";
import type { RouterOpts } from "type-route";

const opts: RouterOpts = {
	"scrollToTop": true
}

const publicUrl = import.meta.env.BASE_URL;


export const routeDefs = {
	"home": defineRoute(publicUrl),
    "services": defineRoute(publicUrl + "prestations"),
    "musiqueMariage": defineRoute(publicUrl + "musique-mariage"),
    "bordeaux": defineRoute(publicUrl + "musique-mariage/bordeaux"),
    "media": defineRoute(publicUrl + "en-images"),
    "contact": defineRoute(publicUrl + "contact"),
	"legal": defineRoute(publicUrl + "legal"),
    "repertoire": defineRoute(publicUrl + "repertoire"),
    // English (path-prefixed) mirror routes. Language is derived from the route
    // (see src/seo/localized.ts); the page→component mapping lives in Body.tsx.
    // home-en is "/en" (no trailing slash) to stay aligned with the emitted
    // file "en.html" — see the note in src/seo/seoData.ts.
    "homeEn": defineRoute(publicUrl + "en"),
    "servicesEn": defineRoute(publicUrl + "en/services"),
    "musiqueMariageEn": defineRoute(publicUrl + "en/wedding-music"),
    "bordeauxEn": defineRoute(publicUrl + "en/wedding-music/bordeaux"),
    "mediaEn": defineRoute(publicUrl + "en/gallery"),
    "contactEn": defineRoute(publicUrl + "en/contact"),
};


makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, routes, useRoute, session } = createRouter(opts,
	routeDefs
);
