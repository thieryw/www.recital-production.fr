import jpg1 from "assets/jpg/services/img-1.jpg";
import jpg2 from "assets/jpg/services/img-2.jpg";
import webp1 from "assets/webp/services/img-1.webp";
import webp2 from "assets/webp/services/img-2.webp";
import { useDomRect } from "powerhooks";
import { memo } from "react";
import { tss } from "tss";

import backgroundSvg from "assets/svg/marble-large.svg";


export const Duo = memo(() => {
    const {ref: refImg2, domRect: {width: img2Width, height: img2Height}} = useDomRect();
    const { classes } = useStyles(
        {
            img2Width,
            img2Height
        }
    );
    return (
        <section className={classes.root}>
            <div className={classes.pictures}>
                <picture className={classes.picture1}>
                    <source srcSet={webp1} type="image/webp" />
                    <source srcSet={jpg1} type="image/jpeg" />
                    <img className={classes.img1} src={webp1} alt="Duo" />
                </picture>
                <picture ref={refImg2} className={classes.picture2}>
                    <source srcSet={webp2} type="image/webp" />
                    <source srcSet={jpg2} type="image/jpeg" />
                    <img className={classes.img2} src={webp2} alt="Duo" />
                </picture>

            </div>
            <div className={classes.decoSection}>
                <img className={classes.backgroundSvg} src={backgroundSvg} alt="background" />

            </div>
        </section>
    )
})



const useStyles = tss.withParams<{ img2Width: number; img2Height: number; }>().create(({ theme, img2Width, img2Height }) => {
    return ({
        "root": {
            [theme.breakpoints.down("sm")]: {
                "marginBottom": theme.spacing(21)
            }
        },
        "pictures": {
            "display": "flex",


        },
        "picture1": {
            "width": 877,
            "maxWidth": "100%",
            "position": "relative",
            "left": (img2Width / 100) * 19,
            [theme.breakpoints.down("sm")]: {
                "left": 0
            }

        },
        "picture2": {
            "width": 392,
            "maxWidth": "50%",
            "position": "relative",
            "right": (img2Width / 100) * 19,
            "top": (img2Height / 100) * 36,
            [theme.breakpoints.down("sm")]: {
                "display": "none"
            }
        },
        "img1": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"
        },
        "img2": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"

        },
        "decoSection": {
            "width": "100%",
            "height": theme.spacing(62),
            "overflow": "hidden",
            "background": theme.palette.patternBackground.main,
            "borderTop": "solid 2px",
            "borderBottom": "solid 2px",
            "borderColor": theme.palette.gold1.main,
            "position": "relative",
            "bottom": theme.spacing(18),
            "zIndex": -1,
            [theme.breakpoints.down("sm")]: {
                "display": "none"
            }

        },
        "backgroundSvg": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"

        },
    })

})