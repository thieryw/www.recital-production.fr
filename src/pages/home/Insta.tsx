import insta1Jpg from "assets/jpg/home/insta-1.jpg";
import insta2Jpg from "assets/jpg/home/insta-2.jpg";
import insta3Jpg from "assets/jpg/home/insta-3.jpg";
import insta4Jpg from "assets/jpg/home/insta-4.jpg";
import insta1Webp from "assets/webp/home/insta-1.webp";
import insta2Webp from "assets/webp/home/insta-2.webp";
import insta3Webp from "assets/webp/home/insta-3.webp";
import insta4Webp from "assets/webp/home/insta-4.webp";
import profilJpg from "assets/jpg/home/insta-profil.jpg";
import profilWebp from "assets/webp/home/insta-profil.webp";
import { TextSection } from "components/TextSection";
import { useTranslation } from "i18n";
import { memo } from "react";
import { tss } from "tss";



const images = [
    {
        "jpg": insta1Jpg,
        "webp": insta1Webp
    },
    {
        "jpg": insta2Jpg,
        "webp": insta2Webp
    },
    {
        "jpg": insta3Jpg,
        "webp": insta3Webp
    },
    {
        "jpg": insta4Jpg,
        "webp": insta4Webp
    },
];


export const Insta = memo(() => {
    const { t } = useTranslation("Home");
    const { classes } = useStyles();
    return (
        <section className={classes.root}>
            <div className={classes.pictureWrapper}>
                {
                    images.map(({ jpg, webp }, index) => <picture key={index}>
                        <source srcSet={webp} type="image/webp" />
                        <source srcSet={jpg} type="image/jpeg" />
                        <img className={classes.image} src={webp} alt="instagram portrait" />
                    </picture>)
                }
                <div className={classes.insta}>
                    <picture className={classes.instaPicture}>
                        <source srcSet={profilWebp} type="image/webp" />
                        <source srcSet={profilJpg} type="image/jpeg" />
                        <img className={classes.instaImage} src={profilWebp} alt="instagram profil" />

                    </picture>

                </div>
            </div>
            <TextSection
                className={classes.textSection}
                surtitle={t("instaSurtitle")}
                title={t("instaTitle")}
                link={
                    {
                        "href": "https://www.instagram.com/recital_production/",
                        "label": t("instaButtonLabel"),
                        "target": "_blank"
                    }
                }

            />
        </section>
    )
})

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "marginTop": theme.spacing(22),
            "marginBottom": theme.spacing(22),
            "paddingLeft": theme.spacing(5),
            "paddingRight": theme.spacing(5),
            [theme.breakpoints.down("sm")]: {
                "flexDirection": "column-reverse",
                "alignItems": "flex-start"
            }
        },
        "pictureWrapper": {
            "display": "grid",
            "gridTemplateColumns": "repeat(2, 1fr)",
            "gap": theme.spacing(2),
            "width": 560,
            "maxWidth": "100%",
            "position": "relative",
            "marginRight": theme.spacing(9),
            [theme.breakpoints.down("sm")]: {
                "marginRight": 0,
            }
        },
        "image": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"
        },
        "insta": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
        },
        "instaPicture": {
            "width": "21%"

        },
        "instaImage": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"
        },
        "textSection": {
            "marginLeft": theme.spacing(9),
            [theme.breakpoints.down("sm")]: {
                "marginLeft": 0,
                "marginBottom": theme.spacing(8)

            }
        }

    })
})



