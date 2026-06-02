/**
 * Runtime glue between type-route's concrete (per-language) routes and the
 * app's logical pages. Keeps the FR/EN mirror-route bookkeeping in one spot so
 * components can think in terms of `{ page, lang }` instead of nine route names.
 *
 * Browser-only (imports `router`, which pulls in type-route). Never import this
 * from the build scripts — they consume the framework-free `seoData` directly.
 */
import { routes } from "router";
import { ROUTE_META, type RouteName, type Page, type Lang } from "./seoData";

type RouteFn = () => {
    link: { href: string; onClick: (event?: unknown) => void };
    href: string;
    push: () => void;
};
const routeTable = routes as unknown as Record<RouteName, RouteFn>;

/** `${page}:${lang}` -> RouteName, built once from ROUTE_META. */
const byPageLang: Partial<Record<string, RouteName>> = {};
(Object.keys(ROUTE_META) as RouteName[]).forEach(name => {
    const { page, lang } = ROUTE_META[name];
    byPageLang[`${page}:${lang}`] = name;
});

/** The active route's logical page (undefined when no route matches). */
export function pageOf(routeName: string | false): Page | undefined {
    if (routeName === false) {
        return undefined;
    }
    return ROUTE_META[routeName as RouteName]?.page;
}

/** The active route's language (falls back to French). */
export function langOf(routeName: string | false): Lang {
    if (routeName === false) {
        return "fr";
    }
    return ROUTE_META[routeName as RouteName]?.lang ?? "fr";
}

/** RouteName for a page in a language, falling back to the French route. */
export function routeNameForPage(page: Page, lang: Lang): RouteName {
    return byPageLang[`${page}:${lang}`] ?? byPageLang[`${page}:fr`] ?? "home";
}

/** type-route `.link` (`{ href, onClick }`) for a page in a language. */
export function linkTo(page: Page, lang: Lang) {
    return routeTable[routeNameForPage(page, lang)]().link;
}

/**
 * Navigate to the current page in the other language (used by the FR/EN
 * toggle). Setting i18nifty's language is left to the route-sync effect in
 * Body.tsx, so language always follows the URL.
 */
export function pushToAlternateLang(routeName: string | false): void {
    const current = routeName === false ? "home" : (routeName as RouteName);
    const target = ROUTE_META[current]?.alternate ?? current;
    routeTable[target]().push();
}
