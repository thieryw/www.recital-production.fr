import { useTranslation } from "i18n";
import { memo, useEffect, useState } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography";
import card1Svg from "assets/svg/icons/4-evenement.svg";
import card2Svg from "assets/svg/icons/5-gironde.svg";
import card3Svg from "assets/svg/icons/6-carte.svg";
import jpg from "assets/jpg/services/flexibilité.jpg";
import webp from "assets/webp/services/flexibilité.webp";
import { PictureAnimator } from "components/PictureAnimator";
import { Card } from "components/Card";
import { useCallbackFactory } from "powerhooks";
import { useInView } from "react-intersection-observer";
import { useAnimation, type Variant } from "framer-motion";
import { motion } from "framer-motion";

type CardIndex = 1 | 2 | 3 | undefined;

const titleVariants: Record<string, Variant> = {
    "hidden": {
        "y": "130%",
    },
    "visible": {
        "y": 0,
        "transition": {
            "ease": "easeOut",
            "duration": 0.8,
            "delay": 0.8
        }
    },
};
const paragraphVariants: Record<string, Variant> = {
    "hidden": {
        "opacity": 0
    },
    "visible": {
        "opacity": 1,
        "transition": {
            "ease": "easeOut",
            "duration": 0.8,
            "delay": 1.8
        }
    },
};

export const Flexibility = memo(() => {

    const { t } = useTranslation("Services");
    const { classes, cx } = useStyles()
    const [activeIndex, setActiveIndex] = useState<CardIndex>(undefined)

    const handleCardHover = useCallbackFactory((
        [index]: [CardIndex]
    ) => {
        setActiveIndex(index);

    })

    const [ref, inView] = useInView({ "triggerOnce": true, "threshold": 1 });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }

    }, [inView, controls])
    return (
        <section className={classes.root}>
            <div ref={ref} className={cx(classes.textSection, classes.grid)}>
                <div className={classes.titleWrapper}>
                    <motion.div
                        variants={titleVariants}
                        animate={controls}
                        initial="hidden"
                    >
                        <Typo variant="h3">{t("flexibilityTitle")}</Typo>
                    </motion.div>
                </div>
                <motion.div
                    variants={paragraphVariants}
                    animate={controls}
                    initial="hidden"
                >
                    <Typo className={classes.paragraph} variant="body1">{t("flexibilityParagraph")}</Typo>
                </motion.div>

            </div>

            <div className={cx(classes.pictureAndCard, classes.grid)}>
                <PictureAnimator 
                    className={classes.picture}
                    alt="danseur"
                    width={282}
                    height={606}
                    borderRadius=""
                    src={webp}
                    sources={[
                        {
                            "srcSet": webp,
                            "type": "image/webp"
                        },
                        {
                            "srcSet": jpg,
                            "type": "image/jpeg"
                        }
                    ]}
                />
                <div className={classes.cardWrapper}>
                    {
                        [
                            {
                                "logoSrc": card1Svg,
                                "title": t("flexibilityCardTitle1"),
                                "paragraph": t("flexibilityCardParagraph1")
                            },
                            {
                                "logoSrc": card2Svg,
                                "title": t("flexibilityCardTitle2"),
                                "paragraph": t("flexibilityCardParagraph2")
                            },
                            {
                                "logoSrc": card3Svg,
                                "title": t("flexibilityCardTitle3"),
                                "paragraph": t("flexibilityCardParagraph3")
                            }

                        ].map((card, index) => <div
                            onMouseEnter={handleCardHover(index as CardIndex)}
                            onMouseLeave={handleCardHover(undefined)}
                            key={card.title}
                        ><Card
                                {...card}
                                variant="horizontal"
                                isSelected={activeIndex === index}
                            /></div>)
                    }

                </div>


            </div>

        </section>
    )
});


const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "marginBottom": theme.spacing(22),
            "paddingLeft": theme.spacing(5),
            "paddingRight": theme.spacing(5)
        },
        "textSection": {
            "marginBottom": theme.spacing(19)
        },
        "titleWrapper": {
            "overflow": "hidden",
            [theme.breakpoints.down("md")]: {
                "marginBottom": theme.spacing(6)
            }
        },
        "paragraph": {
            [theme.breakpoints.down("md")]: {
                "textAlign": "center"
            }

        },
        "pictureAndCard": {

        },
        "picture": {
            "marginBottom": theme.spacing(15)

        },
        "grid": {
            "display": "grid",
            "gridTemplateColumns": `${parseInt(theme.spacing(19)) + 282}px ${theme.spacing(74)}`,
            [theme.breakpoints.down("md")]: {
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "width": 500,
                "maxWidth": "100%"
            }

        },
        "cardWrapper": {
            "display": "grid",
            "gridTemplateColumns": "1fr",
            "gap": theme.spacing(8)
        }
    })
})