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
export type RouteName = "home" | "services" | "media" | "contact" | "legal";

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
export const ROUTE_META: Record<
    RouteName,
    { path: string; file: string; index: boolean }
> = {
    "home": { "path": "/", "file": "index.html", "index": true },
    "services": { "path": "/prestations", "file": "prestations.html", "index": true },
    "media": { "path": "/en-images", "file": "en-images.html", "index": true },
    "contact": { "path": "/contact", "file": "contact.html", "index": true },
    "legal": { "path": "/legal", "file": "legal.html", "index": false }
};

/** Per-route, per-language <title> and meta description. */
export const SEO_BY_ROUTE: Record<RouteName, Record<Lang, { title: string; description: string }>> = {
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
 * hreflang alternates for a given path.
 * French is the default/primary language served at the clean URL; English is
 * reachable via the `?lang=en` search param (handled by i18nifty at runtime).
 */
export function buildAlternates(path: string): { hreflang: string; href: string }[] {
    const clean = absUrl(path);
    return [
        { "hreflang": "fr", "href": clean },
        { "hreflang": "en", "href": `${clean}${clean.includes("?") ? "&" : "?"}lang=en` },
        { "hreflang": "x-default", "href": clean }
    ];
}

/** Structured data (schema.org) graph for a given route + language. */
export function buildJsonLd(routeName: RouteName, lang: Lang): object {
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

    if (routeName === "services") {
        graph.push({
            "@type": "FAQPage",
            "@id": `${absUrl(ROUTE_META.services.path)}#faq`,
            "mainEntity": SERVICES_FAQ[lang].map(({ question, answer }) => ({
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
 * (between the `<!-- seo:start -->` / `<!-- seo:end -->` markers in index.html).
 * `lang` defaults to the primary (statically rendered) language.
 */
export function renderHeadTags(routeName: RouteName, lang: Lang = PRIMARY_LANG): string {
    const meta = ROUTE_META[routeName];
    const seo = SEO_BY_ROUTE[routeName][lang];
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
        ...buildAlternates(meta.path).map(
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
        `<script type="application/ld+json">${JSON.stringify(buildJsonLd(routeName, lang))}</script>`
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
