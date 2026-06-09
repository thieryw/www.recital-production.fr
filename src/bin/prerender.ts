/**
 * Body prerendering (static snapshot) — the LAST step of the build pipeline.
 *
 * Pipeline order:
 *   tsc -b
 *   vite build                  -> dist/index.html (empty <div id="root"></div>)
 *   hack-gh-pages src/router.ts -> copies index.html to one <path>.html per route
 *   vite-node injectSeo.ts      -> per-route <head> between the seo markers
 *   vite-node prerender.ts      -> THIS: fills each <div id="root"> with rendered HTML
 *
 * How it works: it serves the freshly-built `dist/` over a tiny local HTTP
 * server (mirroring GitHub Pages' clean-URL + SPA-fallback behaviour), opens
 * each route in headless Chrome, lets the real app render (so type-route,
 * tss-react/MUI, framer-motion, embla, etc. all run as normal client code),
 * scrolls the page to trigger IntersectionObserver / entrance animations, then
 * writes the rendered `#root` markup plus the Emotion critical CSS back into the
 * matching `dist/<file>.html`. The injected per-route <head> is left untouched.
 *
 * main.tsx uses `createRoot().render()` (not hydrateRoot), so on load React does
 * a fresh client render over the snapshot — no hydration-mismatch risk. The
 * snapshot's only job is to give crawlers and the pre-JS first paint real
 * content instead of an empty shell.
 *
 * Route list and file mapping come from `src/seo/seoData.ts` (ROUTE_META), the
 * same source of truth injectSeo.ts uses, so the two steps can never drift.
 *
 * Run standalone with `yarn prerender` (after a build) or as part of `build`.
 *
 * Env knobs:
 *   PRERENDER_SETTLE_MS  extra wait after scrolling (default 1500) — bump if
 *                        late framer-motion reveals are captured mid-animation.
 *   PRERENDER_REVEAL=0   disable forcing opacity:0 entrance elements visible.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import puppeteer from "puppeteer";
import type { Page } from "puppeteer";
import { ROUTE_META, type RouteName } from "../seo/seoData";
import { sanitizeBody, applyPrerender } from "./prerenderTransform";

const DIST = "dist";
const SETTLE_MS = Number(process.env.PRERENDER_SETTLE_MS ?? 1500);
const REVEAL = process.env.PRERENDER_REVEAL !== "0";
const NAV_TIMEOUT_MS = 45_000;

const MIME: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript",
    ".mjs": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".txt": "text/plain",
    ".xml": "application/xml",
    ".map": "application/json"
};

/* Local static server: GitHub Pages-like clean URLs + SPA fallback. */
function startServer(): Promise<{ origin: string; close: () => Promise<void> }> {
    const isFile = (p: string) => existsSync(p) && statSync(p).isFile();

    const server = createServer((req, res) => {
        try {
            const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
            const rel = urlPath.replace(/^\/+/, "");
            const candidates =
                rel === ""
                    ? ["index.html"]
                    : [rel, `${rel}.html`, join(rel, "index.html"), "index.html"];
            for (const c of candidates) {
                const file = join(DIST, c);
                if (isFile(file)) {
                    res.writeHead(200, {
                        "Content-Type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream"
                    });
                    res.end(readFileSync(file));
                    return;
                }
            }
            res.writeHead(404);
            res.end("not found");
        } catch (e) {
            res.writeHead(500);
            res.end(String(e));
        }
    });

    return new Promise(resolve => {
        server.listen(0, "127.0.0.1", () => {
            const { port } = server.address() as AddressInfo;
            resolve({
                origin: `http://127.0.0.1:${port}`,
                close: () => new Promise<void>(r => server.close(() => r()))
            });
        });
    });
}

async function snapshotRoute(
    page: Page,
    origin: string,
    path: string
): Promise<{ body: string; css: string }> {
    await page.goto(`${origin}${path === "/" ? "/" : path}`, {
        waitUntil: "load",
        timeout: NAV_TIMEOUT_MS
    });

    // Wait for the React app to actually mount something into #root.
    await page.waitForFunction(
        () => {
            const r = document.getElementById("root");
            return !!r && r.childElementCount > 0;
        },
        { timeout: NAV_TIMEOUT_MS }
    );

    // Wait for web fonts so font-dependent layout is settled.
    await page.evaluate(async () => {
        try {
            await (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts?.ready;
        } catch {
            /* no-op */
        }
    });

    // Scroll the whole page so IntersectionObserver / framer-motion reveals fire.
    await page.evaluate(
        () =>
            new Promise<void>(resolve => {
                let y = 0;
                const step = () => {
                    const max = document.body.scrollHeight;
                    window.scrollTo(0, y);
                    y += Math.max(240, window.innerHeight * 0.8);
                    if (y < max + window.innerHeight) {
                        setTimeout(step, 120);
                    } else {
                        window.scrollTo(0, 0);
                        resolve();
                    }
                };
                step();
            })
    );

    // Let late entrance animations finish.
    await new Promise(r => setTimeout(r, SETTLE_MS));

    // Force entrance elements still at opacity:0 to be visible, so the static
    // HTML isn't blank before JS takes over. (Text is in the DOM either way; this
    // is purely about the pre-hydration paint.) Toggle off with PRERENDER_REVEAL=0.
    if (REVEAL) {
        await page.evaluate(() => {
            document.querySelectorAll<HTMLElement>('#root [style*="opacity"]').forEach(el => {
                if (el.style.opacity === "0" || el.style.opacity === "0.0") {
                    el.style.opacity = "1";
                    el.style.transform = "none";
                }
            });
        });
    }

    const body = await page.evaluate(() => document.getElementById("root")!.innerHTML);

    // Emotion (tss-react/MUI) uses insertRule in production, so style tags carry
    // empty text — read the live CSSOM instead and serialise the rules.
    const css = await page.evaluate(() => {
        let out = "";
        for (const sheet of Array.from(document.styleSheets)) {
            const node = sheet.ownerNode as Element | null;
            if (node && node.tagName === "STYLE" && node.hasAttribute("data-emotion")) {
                try {
                    for (const rule of Array.from(sheet.cssRules)) {
                        out += rule.cssText;
                    }
                } catch {
                    /* cross-origin sheet — skip */
                }
            }
        }
        return out;
    });

    return { body, css };
}

async function main(): Promise<void> {
    if (!existsSync(join(DIST, "index.html"))) {
        throw new Error(`[prerender] ${DIST}/index.html not found — run "vite build" first.`);
    }

    const { origin, close } = await startServer();
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
    });

    let failures = 0;
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 900 });

        for (const name of Object.keys(ROUTE_META) as RouteName[]) {
            const { path, file, prerender } = ROUTE_META[name];
            if (prerender === false) {
                console.log(`[prerender] skip ${name}: prerender disabled`);
                continue;
            }
            const target = join(DIST, file);
            if (!existsSync(target)) {
                console.warn(`[prerender] skip ${name}: ${target} not found`);
                continue;
            }
            try {
                const { body, css } = await snapshotRoute(page, origin, path);
                const { html, ok } = applyPrerender(readFileSync(target, "utf8"), sanitizeBody(body), css);
                if (!ok) {
                    failures++;
                    console.warn(`[prerender] ${file}: empty <div id="root"> not found; left unchanged`);
                    continue;
                }
                writeFileSync(target, html, "utf8");
                console.log(
                    `[prerender] ${name.padEnd(9)} -> ${file.padEnd(18)} ` +
                        `body ${(body.length / 1024).toFixed(1)}kB / css ${(css.length / 1024).toFixed(1)}kB`
                );
            } catch (e) {
                failures++;
                console.error(`[prerender] FAILED ${name} (${path}): ${e instanceof Error ? e.message : e}`);
            }
        }
    } finally {
        await browser.close();
        await close();
    }

    if (failures > 0) {
        console.error(`[prerender] completed with ${failures} failure(s).`);
        process.exit(1);
    }
    console.log("[prerender] done.");
}

// Runs on load (same pattern as injectSeo.ts) — vite-node executes this module
// as the build step. main() exits the process with code 1 on failure.
main().catch(err => {
    console.error(err);
    process.exit(1);
});
