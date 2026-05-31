import { useEffect } from "react";
import { useRoute } from "router";
import { useLang } from "i18n";
import {
    SEO_BY_ROUTE,
    ROUTE_META,
    OG_LOCALE,
    SITE_NAME,
    absUrl,
    buildAlternates,
    type Lang,
    type RouteName
} from "./seoData";

function setMetaByName(name: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (el === null) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
    if (el === null) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function setCanonical(href: string) {
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (el === null) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

/**
 * Rewrites the full set of hreflang alternates for the current path.
 * This both fixes i18nifty's links (which are computed once at page load and
 * become stale on SPA navigation) and removes any duplicates, leaving a single
 * clean, route-aware set.
 */
function setAlternates(path: string) {
    document.head
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach(node => node.parentNode?.removeChild(node));

    buildAlternates(path).forEach(({ hreflang, href }) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", hreflang);
        link.setAttribute("href", href);
        document.head.appendChild(link);
    });
}

/**
 * Keeps document metadata in sync with the active route and language.
 * The statically injected head (see src/bin/injectSeo.ts) covers crawlers that
 * don't run JS; this hook covers client-side navigation and the FR/EN toggle.
 */
export function useSeo() {
    const route = useRoute();
    const { lang } = useLang();

    useEffect(() => {
        const routeName = (
            route.name !== false && route.name in ROUTE_META ? route.name : "home"
        ) as RouteName;

        const isIndexable = route.name !== false && ROUTE_META[routeName].index;
        const seo = SEO_BY_ROUTE[routeName][lang as Lang];
        const canonical = absUrl(ROUTE_META[routeName].path);
        const ogImage = absUrl("/preview.jpg");

        document.title = seo.title;
        document.documentElement.setAttribute("lang", lang);

        setMetaByName("description", seo.description);
        setMetaByName("robots", isIndexable ? "index, follow" : "noindex, follow");
        setCanonical(canonical);

        setMetaByProperty("og:type", "website");
        setMetaByProperty("og:site_name", SITE_NAME);
        setMetaByProperty("og:title", seo.title);
        setMetaByProperty("og:description", seo.description);
        setMetaByProperty("og:url", canonical);
        setMetaByProperty("og:image", ogImage);
        setMetaByProperty("og:locale", OG_LOCALE[lang as Lang]);

        setMetaByName("twitter:card", "summary_large_image");
        setMetaByName("twitter:title", seo.title);
        setMetaByName("twitter:description", seo.description);
        setMetaByName("twitter:image", ogImage);

        setAlternates(ROUTE_META[routeName].path);
    }, [route.name, lang]);
}
