/**
 * Centralised, framework-agnostic SEO configuration.
 *
 * IMPORTANT: This module must stay free of any browser-only (`window`,
 * `document`, `navigator`) or React imports, and must NOT import from
 * `src/i18n` (i18nifty touches `window`/`navigator` at import time).
 * It is consumed BOTH by the runtime hook (`useSeo`, browser) AND by the
 * post-build script (`src/bin/injectSeo.ts`, Node via vite-node).
 */

export type Lang = "fr" | "en";
/** Logical page, shared across languages. */
export type Page = "home" | "services" | "musiqueMariage" | "media" | "contact" | "legal";
/** A concrete route = one page in one language. Must mirror `src/router.ts`. */
export type RouteName =
    | "home" | "services" | "musiqueMariage" | "media" | "contact" | "legal"
    | "homeEn" | "servicesEn" | "musiqueMariageEn" | "mediaEn" | "contactEn";

/** Canonical host. Must match `public/CNAME` (www) and `.env`'s VITE_SITE_URL. */
export const SITE_URL = "https://www.recital-production.fr";
export const SITE_NAME = "Récital Production";
export const OG_IMAGE_PATH = "/preview.jpg";
export const EMAIL = "recitalproduction@gmail.com";

export const SOCIAL_LINKS = [
    "https://www.instagram.com/recital_production/",
    "https://www.youtube.com/@recitalproduction"
];

/** Languages served. French is primary (the statically-rendered language). */
export const LANGUAGES: readonly Lang[] = ["fr", "en"];
export const PRIMARY_LANG: Lang = "fr";

export const OG_LOCALE: Record<Lang, string> = {
    "fr": "fr_FR",
    "en": "en_GB"
};

/**
 * Mirror of `src/router.ts` route paths AND of the per-route `.html` files
 * emitted by `github-pages-plugin-for-type-route` (it copies `index.html` to
 * `<path>.html` at the root of `dist`).
 *  - `path`  : the clean public URL path (what we use for canonical/sitemap)
 *  - `file`  : the file produced in `dist`
 *  - `index` : whether the page should be indexed by search engines
 */
export type RouteMeta = {
    /** Clean public URL path (used for canonical + sitemap). */
    path: string;
    /** File emitted in `dist` by github-pages-plugin-for-type-route. */
    file: string;
    /** Whether search engines should index the page. */
    index: boolean;
    /** Language this concrete route is served in. */
    lang: Lang;
    /** Logical page, shared across languages. */
    page: Page;
    /** RouteName of the same page in the other language (drives hreflang). */
    alternate?: RouteName;
};

/**
 * English lives at path-prefixed routes (`/en`, `/en/services`, …) rather than
 * `?lang=en`, because a query-string variant cannot be self-canonical on static
 * hosting and so never gets indexed as a distinct language. The home-en path is
 * `/en` (no trailing slash): the gh-pages plugin runs `path.relative` which
 * strips a trailing slash, so `/en` and the emitted file `en.html` stay aligned.
 */
export const ROUTE_META: Record<RouteName, RouteMeta> = {
    "home":       { "path": "/",            "file": "index.html",       "index": true,  "lang": "fr", "page": "home",     "alternate": "homeEn" },
    "services":   { "path": "/prestations", "file": "prestations.html", "index": true,  "lang": "fr", "page": "services", "alternate": "servicesEn" },
    "musiqueMariage":   { "path": "/musique-mariage", "file": "musique-mariage.html", "index": true, "lang": "fr", "page": "musiqueMariage", "alternate": "musiqueMariageEn" },
    "media":      { "path": "/en-images",   "file": "en-images.html",   "index": true,  "lang": "fr", "page": "media",    "alternate": "mediaEn" },
    "contact":    { "path": "/contact",     "file": "contact.html",     "index": true,  "lang": "fr", "page": "contact",  "alternate": "contactEn" },
    "legal":      { "path": "/legal",       "file": "legal.html",       "index": false, "lang": "fr", "page": "legal" },
    "homeEn":     { "path": "/en",          "file": "en.html",          "index": true,  "lang": "en", "page": "home",     "alternate": "home" },
    "servicesEn": { "path": "/en/services", "file": "en/services.html", "index": true,  "lang": "en", "page": "services", "alternate": "services" },
    "musiqueMariageEn": { "path": "/en/wedding-music", "file": "en/wedding-music.html", "index": true, "lang": "en", "page": "musiqueMariage", "alternate": "musiqueMariage" },
    "mediaEn":    { "path": "/en/gallery",  "file": "en/gallery.html",  "index": true,  "lang": "en", "page": "media",    "alternate": "media" },
    "contactEn":  { "path": "/en/contact",  "file": "en/contact.html",  "index": true,  "lang": "en", "page": "contact",  "alternate": "contact" }
};

/** Per-page, per-language <title> and meta description. */
export const SEO_BY_ROUTE: Record<Page, Record<Lang, { title: string; description: string }>> = {
    "home": {
        "fr": {
            "title": "Récital Production – Musiciens pour mariages & événements à Bordeaux",
            "description":
                "Musique classique et pop live pour mariages, cérémonies et événements privés à Bordeaux, en Gironde et dans tout le Sud-Ouest. Duo, trio et quatuor à cordes."
        },
        "en": {
            "title": "Récital Production – Live Musicians for Weddings & Events in Bordeaux",
            "description":
                "Elegant live classical and pop music for weddings, ceremonies and private events in Bordeaux, Gironde and across South-West France."
        }
    },
    "services": {
        "fr": {
            "title": "Prestations musicales – Mariages, cocktails & concerts | Récital Production",
            "description":
                "Quatuor à cordes, duo piano-voix, violon-piano… Des prestations musicales sur mesure pour particuliers, communes et entreprises en Nouvelle-Aquitaine."
        },
        "en": {
            "title": "Music Services – Weddings, Cocktails & Concerts | Récital Production",
            "description":
                "String quartet, piano-voice and violin-piano duos and more. Bespoke live music for individuals, towns and companies across New Aquitaine."
        }
    },
    "musiqueMariage": {
        "fr": {
            "title": "Musique de mariage à Bordeaux & dans le Sud-Ouest | Récital Production",
            "description":
                "Musiciens de mariage formés en conservatoire : quatuor à cordes, duos et solistes pour votre cérémonie et votre cocktail à Bordeaux, en Gironde, au Cap-Ferret, à Arcachon et en Dordogne."
        },
        "en": {
            "title": "Wedding Music in Bordeaux & South-West France | Récital Production",
            "description":
                "Conservatoire-trained wedding musicians — string quartet, duos and soloists for your ceremony and cocktail hour in Bordeaux, Cap-Ferret, Arcachon and the Dordogne."
        }
    },
    "media": {
        "fr": {
            "title": "En images – Photos & vidéos de nos prestations | Récital Production",
            "description":
                "Découvrez en images et en vidéos les prestations musicales de Récital Production lors de mariages, cocktails et concerts."
        },
        "en": {
            "title": "In Pictures – Photos & Videos of Our Performances | Récital Production",
            "description":
                "Browse photos and videos of Récital Production's live performances at weddings, cocktail parties and concerts."
        }
    },
    "contact": {
        "fr": {
            "title": "Contact & devis – Récital Production",
            "description":
                "Contactez Récital Production pour un devis personnalisé : musique live pour mariages, cérémonies et événements à Bordeaux et en Gironde."
        },
        "en": {
            "title": "Contact & Quote – Récital Production",
            "description":
                "Get in touch with Récital Production for a tailored quote: live music for weddings, ceremonies and events in Bordeaux and Gironde."
        }
    },
    "legal": {
        "fr": {
            "title": "Mentions légales – Récital Production",
            "description": "Mentions légales du site Récital Production."
        },
        "en": {
            "title": "Legal Notice – Récital Production",
            "description": "Legal notice for the Récital Production website."
        }
    }
};

/** Services FAQ, used to emit FAQPage structured data. Keep in sync with the services i18n resources. */
export const SERVICES_FAQ: Record<Lang, { question: string; answer: string }[]> = {
    "fr": [
        {
            "question": "Puis-je choisir une musique ?",
            "answer":
                "Oui ! Les musiciens peuvent jouer votre musique préférée, il suffit de nous transmettre votre liste de souhait."
        },
        {
            "question": "Dois-je m'occuper du matériel ?",
            "answer":
                "Non, inutile de vous encombrer les bras ou l'esprit : le matériel est pris en charge par les musiciens."
        },
        {
            "question": "Que dois-je faire ?",
            "answer":
                "Nous communiquer la date et le lieu de votre événement ainsi que vos souhaits particuliers, nous nous occupons de vous faire l'offre la plus adaptée."
        },
        {
            "question": "Où pouvez-vous intervenir ?",
            "answer": "Bordeaux, Gironde, Sud-Ouest."
        }
    ],
    "en": [
        {
            "question": "Can I choose the music?",
            "answer": "Yes, the musicians can play your favourite music, just send us your wish list."
        },
        {
            "question": "Do I have to provide the equipment?",
            "answer": "No, the equipment is provided by the musicians."
        },
        {
            "question": "What must I do?",
            "answer":
                "Let us know the date and place of your event as well as any particular requirements you may have, and we will make you the most suitable offer."
        },
        {
            "question": "Where do we play?",
            "answer": "South-western France, including Bordeaux and Gironde."
        }
    ]
};

const AREA_SERVED = ["Bordeaux", "Gironde", "Nouvelle-Aquitaine", "Paris", "Sud-Ouest de la France"];

/** Wedding-hub FAQ, used to emit FAQPage structured data. Keep in sync with the musiqueMariage i18n resources. */
export const WEDDING_FAQ: Record<Lang, { question: string; answer: string }[]> = {
    "fr": [
        {
            "question": "Pouvons-nous choisir nos morceaux ?",
            "answer":
                "Oui. Vous nous transmettez votre liste de souhaits (entrée, signature, sortie) et nos musiciens les arrangent et les interprètent en live."
        },
        {
            "question": "Vous déplacez-vous en dehors de Bordeaux ?",
            "answer": "Oui, nos formations couvrent tout le Sud-Ouest, dont la Dordogne, le Cap-Ferret et Arcachon."
        },
        {
            "question": "Faut-il prévoir du matériel ?",
            "answer":
                "Non. Pupitres, partitions et, si besoin, une sonorisation discrète sont pris en charge par nos musiciens."
        }
    ],
    "en": [
        {
            "question": "Can we choose our own music?",
            "answer": "Yes. Send us your wish list (entrance, signing, exit) and our musicians will arrange and perform it live."
        },
        {
            "question": "Do you travel outside Bordeaux?",
            "answer": "Yes, our line-ups cover the whole of South-West France, including the Dordogne, Cap-Ferret and Arcachon."
        },
        {
            "question": "Do we need to provide equipment?",
            "answer": "No. Music stands, scores and, where needed, discreet amplification are all handled by our musicians."
        }
    ]
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

export function absUrl(path: string): string {
    if (path === "/") {
        return `${SITE_URL}/`;
    }
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** HTML-attribute escaping for values we inject into the static head. */
export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/**
 * Reciprocal hreflang alternates for a concrete route.
 * Both the FR and EN page emit the identical cluster (fr → FR url, en → EN url,
 * x-default → FR url), and every target is the self-canonical URL of a real
 * page — which is what makes Google honour the annotation. Single-language
 * pages (e.g. legal) get no cluster.
 */
export function buildAlternates(routeName: RouteName): { hreflang: string; href: string }[] {
    const meta = ROUTE_META[routeName];
    if (meta.alternate === undefined) {
        return [];
    }
    const alt = ROUTE_META[meta.alternate];
    const frPath = meta.lang === "fr" ? meta.path : alt.path;
    const enPath = meta.lang === "en" ? meta.path : alt.path;
    return [
        { "hreflang": "fr", "href": absUrl(frPath) },
        { "hreflang": "en", "href": absUrl(enPath) },
        { "hreflang": "x-default", "href": absUrl(frPath) }
    ];
}

/** Structured data (schema.org) graph for a concrete route. */
export function buildJsonLd(routeName: RouteName): object {
    const meta = ROUTE_META[routeName];
    const lang = meta.lang;
    const page = meta.page;

    const organization = {
        "@type": ["MusicGroup", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "url": `${SITE_URL}/`,
        "image": absUrl(OG_IMAGE_PATH),
        "logo": absUrl(OG_IMAGE_PATH),
        "email": EMAIL,
        "description": SEO_BY_ROUTE.home[lang].description,
        "genre": ["Classical", "Pop", "Jazz"],
        "areaServed": AREA_SERVED.map(name => ({ "@type": "AdministrativeArea", "name": name })),
        "sameAs": SOCIAL_LINKS
    };

    const website = {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": `${SITE_URL}/`,
        "name": SITE_NAME,
        "inLanguage": lang,
        "publisher": { "@id": `${SITE_URL}/#organization` }
    };

    const graph: object[] = [organization, website];

    if (page === "services") {
        graph.push({
            "@type": "FAQPage",
            "@id": `${absUrl(meta.path)}#faq`,
            "mainEntity": SERVICES_FAQ[lang].map(({ question, answer }) => ({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": { "@type": "Answer", "text": answer }
            }))
        });
    }

    if (page === "musiqueMariage") {
        graph.push({
            "@type": "FAQPage",
            "@id": `${absUrl(meta.path)}#faq`,
            "mainEntity": WEDDING_FAQ[lang].map(({ question, answer }) => ({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": { "@type": "Answer", "text": answer }
            }))
        });
    }

    return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * Renders the full block of head tags injected statically at build time
 * (between the `<!-- seo:start -->` / `<!-- seo:end -->` markers).
 * The language is the route's OWN language, so each emitted file (FR or EN) is
 * self-canonical and described in its own language.
 */
export function renderHeadTags(routeName: RouteName): string {
    const meta = ROUTE_META[routeName];
    const lang = meta.lang;
    const seo = SEO_BY_ROUTE[meta.page][lang];
    const canonical = absUrl(meta.path);
    const ogImage = absUrl(OG_IMAGE_PATH);
    const robots = meta.index ? "index, follow" : "noindex, follow";
    const t = escapeHtml(seo.title);
    const d = escapeHtml(seo.description);

    const lines = [
        `<title>${t}</title>`,
        `<meta name="description" content="${d}">`,
        `<link rel="canonical" href="${canonical}">`,
        `<meta name="robots" content="${robots}">`,
        ...buildAlternates(routeName).map(
            a => `<link rel="alternate" hreflang="${a.hreflang}" href="${escapeHtml(a.href)}">`
        ),
        `<meta property="og:type" content="website">`,
        `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">`,
        `<meta property="og:title" content="${t}">`,
        `<meta property="og:description" content="${d}">`,
        `<meta property="og:url" content="${canonical}">`,
        `<meta property="og:image" content="${ogImage}">`,
        `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
        ...LANGUAGES.filter(l => l !== lang).map(
            l => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`
        ),
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${t}">`,
        `<meta name="twitter:description" content="${d}">`,
        `<meta name="twitter:image" content="${ogImage}">`,
        `<script type="application/ld+json">${JSON.stringify(buildJsonLd(routeName))}</script>`
    ];

    return lines.join("\n    ");
}

/** Head tags for the SPA fallback (404.html): minimal and never indexed. */
export function renderHeadTagsRaw404(lang: Lang = PRIMARY_LANG): string {
    const seo = SEO_BY_ROUTE.home[lang];
    return [
        `<title>${escapeHtml(seo.title)}</title>`,
        `<meta name="description" content="${escapeHtml(seo.description)}">`,
        `<meta name="robots" content="noindex, nofollow">`,
        `<meta property="og:title" content="${escapeHtml(seo.title)}">`,
        `<meta property="og:image" content="${absUrl(OG_IMAGE_PATH)}">`
    ].join("\n    ");
}
