import { motion } from "framer-motion";
import { memo } from "react";
import Typo from "@mui/material/Typography";
import { tss } from "tss";
import { useTranslation } from "i18n";
import card1Jpg from "assets/jpg/services/particuliers.jpg";
import card2Jpg from "assets/jpg/services/communes.jpg";
import card3Jpg from "assets/jpg/services/entreprises.jpg";
import card1Webp from "assets/webp/services/particuliers.webp";
import card2Webp from "assets/webp/services/communes.webp";
import card3Webp from "assets/webp/services/entreprises.webp";
import { LinkButton } from "components/LinkButton";
import { routes } from "router";


export const Hero = memo(() => {
    const { t } = useTranslation("Services");
    const { classes } = useStyles();
    return (
        <section className={classes.root}>
            <div style={{"overflow": "hidden"}}>
                <motion.div
                    initial={{
                        "y": "100%"
                    }}
                    animate={{
                        "y": 0
                    }}
                    transition={{
                        "ease": "easeOut",
                        "duration": 0.8
                    }}
                >
                    <Typo variant="h1">{t("heroTitle")}</Typo>
                </motion.div>

            </div>

            <motion.div
                className={classes.paragraphWrapper}
                initial={{
                    "opacity": 0
                }}
                animate={{
                    "opacity": 1
                }}
                transition={{
                    "ease": "easeOut",
                    "duration": 0.8,
                    "delay": 1
                }}
            >
                <Typo className={classes.paragraph} variant="body1">{t("heroParagraph")}</Typo>
            </motion.div>
            <div className={classes.cardSection}>
                {
                    [
                        {
                            "jpg": card1Jpg,
                            "webp": card1Webp,
                            "title": t("heroCardTitle1")
                        },
                        {
                            "jpg": card2Jpg,
                            "webp": card2Webp,
                            "title": t("heroCardTitle2")
                        },
                        {
                            "jpg": card3Jpg,
                            "webp": card3Webp,
                            "title": t("heroCardTitle3")
                        },

                    ].map(({jpg, title, webp}) => <div 
                        className={classes.card} 
                        key={title}
                    >
                        <picture>
                            <source srcSet={webp} type="image/webp"/>
                            <source srcSet={jpg} type="image/jpeg" />
                            <img style={{
                                "width": "100%",
                                "height": "100%",
                                "objectFit": "cover"
                            }} src={webp} alt={title} />
                        </picture>
                        <div className={classes.cardTextWrapper}>
                            <Typo className={classes.cardTitle} variant="h2">{title}</Typo>
                            <LinkButton 
                                {
                                    ...routes.contact().link
                                }
                                label={t("contact")}
                            />


                        </div>
                    </div>)
                }



            </div>
        </section>
    )
});

const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "position": "relative",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "paddingTop": theme.spacing(34),
            "marginBottom": theme.spacing(34),
            "paddingLeft": theme.spacing(4),
            "paddingRight": theme.spacing(4),

        },
        "paragraphWrapper": {
            "width": 525,
            "maxWidth": "100%",
            "marginTop": theme.spacing(4),
            "marginBottom": theme.spacing(14)
        },
        "paragraph": {
            "textAlign": "center"
        },
        "cardSection": {
            "display": "flex",
            "flexWrap": "wrap",
            "justifyContent": "center",
            "width": "100%"



        },
        "card": {
            "position": "relative",
            ...(()=>{
                const value = theme.spacing(1);
                return {
                    "marginLeft": value,
                    "marginRight": value,
                    "marginTop": value,
                    "marginBottom": value
                }
            })(),
            "width": 440,
            "maxWidth": "100%"

        },
        "cardTextWrapper": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "flex-end",
            "paddingBottom": theme.spacing(8),
            "boxSizing": "border-box",
            ...(()=>{
                const value = theme.spacing(3);
                return {
                    "paddingLeft": value,
                    "paddingRight": value
                }
            })()
        },
        "cardTitle": {
            "marginBottom": theme.spacing(5),
            "color": theme.palette.white.main

        }
    })

})