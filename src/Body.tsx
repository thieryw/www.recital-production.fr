import { Footer } from "Footer";
import { Header } from "Header"
import { tss } from "tss";

export const bodyId = "bodyId";

export function Body() {


    const {classes} = useStyles();


    return (
        <div id={bodyId} className={classes.root}>
            <Header

            />
            <Footer />


        </div>
    );

}

const useStyles = tss.create(() => {
    return ({
        "root": {
            "width": "100vw",
            "minHeight": "100vh",
            "maxWidth": "100vw",
            "boxSizing": "border-box",
            "display": "flex",
            "flexDirection": "column",
        }
    })
})
