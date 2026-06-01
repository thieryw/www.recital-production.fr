import { Footer } from "Footer";
import { Header } from "Header"
import { tss } from "tss";
import { Home } from "pages/home";
import { useRoute } from "router";
import { lazy, Suspense, useEffect } from "react";
import { initGA, trackPage } from "analytics";
import { session } from "./router";
import { useSeo } from "seo/useSeo";

// Home stays eager (it's the most common landing page and LCP-critical).
// The heavier inner pages — Media pulls in the gallery + YouTube embeds — are
// code-split so they don't ship in the initial bundle on every visit.
const Services = lazy(() => import("pages/services").then(m => ({ default: m.Services })));
const Media = lazy(() => import("pages/Media").then(m => ({ default: m.Media })));
const Contact = lazy(() => import("pages/Contact").then(m => ({ default: m.Contact })));

export const bodyId = "bodyId";

export function Body() {


    const { classes } = useStyles();
    const route = useRoute();

    useSeo();

    useEffect(() => {
        initGA(); // Start GA4

        // Track initial pageview
        trackPage(window.location.pathname);

        // Track future route changes
        const unsubscribe = session.listen((route) => {
            trackPage(route.href);
        });

        return () => unsubscribe();
    }, []);



    return (
        <div id={bodyId} className={classes.root}>
            <Header />
            <div>
                <Suspense fallback={null}>
                    {route.name === "home" && <Home />}
                    {route.name === "services" && <Services />}
                    {route.name === "media" && <Media />}
                    {route.name === "contact" && <Contact />}
                </Suspense>
            </div>
            <Footer />


        </div>
    );

}

const useStyles = tss.create(() => {
    return ({
        "root": {
            "minHeight": "100vh",
            "display": "flex",
            "flexDirection": "column",
            "overflow": "hidden",
            "position": "relative"

        }
    })
})
