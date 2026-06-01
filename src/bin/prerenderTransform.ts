/**
 * Pure, browser-free HTML transforms used by the prerender step.
 * Kept separate from `prerender.ts` (which imports puppeteer and runs on load)
 * so these can be imported and unit-tested without launching a browser.
 */

export const ROOT_DIV = /<div id="root">\s*<\/div>/;

/**
 * Removes content from a captured `#root` innerHTML that must NOT be written to
 * the static file: <script> tags (avoid double execution before React mounts)
 * and any Emotion <style> tags that leaked into the body (we re-inject CSS into
 * <head> ourselves).
 */
export function sanitizeBody(html: string): string {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style data-emotion[\s\S]*?<\/style>/gi, "");
}

/**
 * Writes the rendered body and critical CSS into a built HTML document.
 *  - fills the (empty) `<div id="root"></div>` with `body`
 *  - injects `css` as a single <style data-prerender-emotion> just before </head>
 *  - leaves the `<!-- seo:start --> … <!-- seo:end -->` head block untouched
 * Returns the html unchanged (with ok:false) if the empty root div is not found,
 * so a bad match can never silently corrupt a file.
 */
export function applyPrerender(
    html: string,
    body: string,
    css: string
): { html: string; ok: boolean } {
    if (!ROOT_DIV.test(html)) {
        return { html, ok: false };
    }
    let out = html.replace(ROOT_DIV, `<div id="root">${body}</div>`);

    out = out.replace(/\s*<style data-prerender-emotion>[\s\S]*?<\/style>/gi, "");
    if (css) {
        out = out.replace(
            /<\/head>/i,
            `    <style data-prerender-emotion>${css}</style>\n  </head>`
        );
    }
    return { html: out, ok: true };
}
