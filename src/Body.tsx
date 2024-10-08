import { Footer } from "Footer";
import { Header } from "Header"
import { tss } from "tss";
import { Home } from "pages/home";
import { useRoute } from "router";
import { Services } from "pages/services";
import { Media } from "pages/Media";
import { Contact } from "pages/Contact";

export const bodyId = "bodyId";

export function Body() {


    const { classes } = useStyles();
    const route = useRoute();


    return (
        <div id={bodyId} className={classes.root}>
            <Header />
            <div>
                {route.name === "home" && <Home />}
                {route.name === "services" && <Services />}
                {route.name === "media" && <Media />}
                {route.name === "contact" && <Contact />}
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
