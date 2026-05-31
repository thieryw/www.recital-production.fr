/**
 * Post-build SEO injection.
 *
 * Runs AFTER `vite build` and AFTER `hack-gh-pages` (which copies index.html to
 * one `<path>.html` file per route at the root of `dist`). For each route it
 * replaces the content between the `<!-- seo:start -->` / `<!-- seo:end -->`
 * markers with route-specific, statically-rendered head tags (title,
 * description, canonical, robots, hreflang, Open Graph, Twitter, JSON-LD), then
 * writes `sitemap.xml`.
 *
 * Run with: `vite-node src/bin/injectSeo.ts`
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
    ROUTE_META,
    PRIMARY_LANG,
    SITE_URL,
    absUrl,
    buildAlternates,
    renderHeadTags,
    renderHeadTagsRaw404,
    type RouteName
} from "../seo/seoData";

const DIST = "dist";
const START = "<!-- seo:start -->";
const END = "<!-- seo:end -->";

function injectInto(file: string, headHtml: string): boolean {
    const path = join(DIST, file);
    if (!existsSync(path)) {
        console.warn(`[injectSeo] skip (not found): ${path}`);
        return false;
    }
    const html = readFileSync(path, "utf8");
    const startIdx = html.indexOf(START);
    const endIdx = html.indexOf(END);
    if (startIdx === -1 || endIdx === -1) {
        console.warn(`[injectSeo] markers not found in ${path}; left unchanged.`);
        return false;
    }
    const before = html.slice(0, startIdx + START.length);
    const after = html.slice(endIdx);
    const next = `${before}\n    ${headHtml}\n    ${after}`;
    writeFileSync(path, next, "utf8");
    console.log(`[injectSeo] injected: ${path}`);
    return true;
}

/* Inject every route file. */
(Object.keys(ROUTE_META) as RouteName[]).forEach(routeName => {
    injectInto(ROUTE_META[routeName].file, renderHeadTags(routeName, PRIMARY_LANG));
});

/* 404.html: keep the SPA shell but make it noindex. */
injectInto("404.html", renderHeadTagsRaw404());

/* Build sitemap.xml from the indexable routes. */
const lastmod = new Date().toISOString().slice(0, 10);
const urls = (Object.keys(ROUTE_META) as RouteName[])
    .filter(name => ROUTE_META[name].index)
    .map(name => {
        const path = ROUTE_META[name].path;
        const alternates = buildAlternates(path)
            .map(
                a =>
                    `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`
            )
            .join("\n");
        return [
            "  <url>",
            `    <loc>${absUrl(path)}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            alternates,
            "  </url>"
        ].join("\n");
    })
    .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf8");
console.log(`[injectSeo] wrote ${join(DIST, "sitemap.xml")} (host: ${SITE_URL})`);
