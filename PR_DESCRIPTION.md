# SEO: per-route metadata, structured data, sitemap/robots, www canonical

Optimises the site for search engines without changing the design or migrating
off Vite/GitHub Pages. The content layer was already keyword-aware; the issues
were technical. The biggest was an active bug.

## Highlights

- **Fixes the canonical bug.** Every route previously declared the homepage as
  its `<link rel="canonical">` (single shared `index.html` head), telling Google
  the inner pages were duplicates of `/`. Each route now has its own canonical.
- **Per-route, per-language metadata** — unique `<title>`, description, Open
  Graph and Twitter tags for `/`, `/prestations`, `/en-images`, `/contact`.
- **Structured data (schema.org)** on every page: `MusicGroup` + `LocalBusiness`
  + `WebSite`, plus a `FAQPage` on Prestations (rich-result eligible).
- **`sitemap.xml` + `robots.txt`** (previously missing), with hreflang
  alternates.
- **www/non-www consistency** — `VITE_SITE_URL` now matches the `www` CNAME, so
  the canonical no longer points at a URL that 301-redirects.
- `legal` is `noindex, follow`; the SPA `404.html` is `noindex, nofollow`.
- Fixed the favicon `type` mismatch (`image/svg+xml` declared on a `.ico`).

## How it works

- `src/seo/seoData.ts` — single source of truth (titles/descriptions per
  route+lang, schema.org graph, hreflang). Framework-agnostic so it is shared by
  the runtime hook and the build script.
- `src/seo/useSeo.ts` — runtime hook (called in `Body`) keeping the head correct
  during client-side navigation and the FR/EN toggle; also normalises hreflang
  into one clean set (fixes i18nifty's stale-on-navigation links).
- `src/bin/injectSeo.ts` — runs after `hack-gh-pages`, rewrites each route's
  static `<head>` and writes `sitemap.xml`. Wired into the `build` script.

## How to test

```bash
yarn build
npx serve dist           # or any static server
```

Then check:
- `dist/prestations.html`, `dist/contact.html`, etc. each have a unique
  `<title>` and a matching `<link rel="canonical">`.
- `dist/sitemap.xml` lists the four indexable routes.
- Paste a couple of pages into the Google Rich Results Test for the JSON-LD /
  FAQ validation.

Validated before commit: scripts transpile and run against a mock `dist`, all
JSON-LD parses, and the three new files pass `tsc` under the project's strict
settings (`noUnusedLocals` / `noUnusedParameters`).

## Known follow-ups (intentionally not in this PR)

- **Body prerender.** This PR makes the `<head>` fully static/correct per route;
  the body is still client-rendered. A headless-browser prerender (react-snap /
  Puppeteer) would put body content in the static HTML too, but it downloads
  Chromium from a host the CI network policy may block, so it needs validating
  separately.
- **English as a first-class indexable locale.** hreflang/sitemap point EN at
  `?lang=en`, but the language swap is client-side, so JS-less crawlers see FR at
  both URLs. Ranking EN separately would mean locale-prefixed routes (`/en/...`),
  a routing change worth deciding deliberately.

Unrelated: there's a leftover `console.log(theme.typography.h1)` in
`src/pages/home/Hero.tsx` styles — harmless, but easy to drop.
