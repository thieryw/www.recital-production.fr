import { memo, useEffect, useState } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography";
import { useTranslation } from "i18n";
import card1svg from "assets/svg/icons/1-repertoire.svg";
import card2svg from "assets/svg/icons/2-talents.svg";
import card3svg from "assets/svg/icons/3-accompagnement.svg";
import { Card } from "components/Card";
import { useCallbackFactory, useDomRect } from "powerhooks";
import { LinkButton } from "components/LinkButton";
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

export const Quality = memo(() => {
    const { t } = useTranslation("Services");
    const [activeIndex, setActiveIndex] = useState<CardIndex>(undefined)
    const { ref: cardsRef, domRect: { width } } = useDomRect();
    const [ref, inView] = useInView({ "triggerOnce": true, "threshold": 1 });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }

    }, [inView, controls])

    const handleCardHover = useCallbackFactory((
        [index]: [CardIndex]
    ) => {
        setActiveIndex(index);

    })
    const { classes } = useStyles({
        width
    });
    return (
        <section className={classes.root}>
            <div ref={ref} className={classes.textWrapper}>
                <div className={classes.titleWrapper}>
                    <motion.div
                        variants={titleVariants}
                        animate={controls}
                        initial="hidden"
                    >
                        <Typo className={classes.title} variant="h3">{t("qualityTitle")}</Typo>
                    </motion.div>
                </div>
                <motion.div
                    variants={paragraphVariants}
                    animate={controls}
                    initial="hidden"
                >
                    <Typo className={classes.paragraph} variant="body1">{t("qualityParagraph")}</Typo>
                </motion.div>
            </div>
            <div
                ref={cardsRef}
                className={classes.cardWrapper}
            >
                {
                    [
                        {
                            "title": t("qualityCardTitle1"),
                            "paragraph": t("qualityCardParagraph1"),
                            "logoSrc": card1svg

                        },
                        {
                            "title": t("qualityCardTitle2"),
                            "paragraph": t("qualityCardParagraph2"),
                            "logoSrc": card2svg

                        },
                        {
                            "title": t("qualityCardTitle3"),
                            "paragraph": t("qualityCardParagraph3"),
                            "logoSrc": card3svg

                        }

                    ].map((card, index) => <div
                        style={{
                            "position": "relative",
                            "zIndex": activeIndex === index ? 1 : 0
                        }}
                        onMouseEnter={handleCardHover(index as CardIndex)}
                        onMouseLeave={handleCardHover(undefined)}
                        key={index}
                    >
                        <Card
                            className={classes.card}
                            {...card}
                            key={index}
                            width={360}
                            height={460}
                            isSelected={activeIndex === index}
                        /></div>)

                }
            </div>
            {/*<div className={classes.buttonWrapper}></div>*/}
            <LinkButton
                href=""
                label={t("qualityButtonLabel")}

            />
        </section>
    )
})

const useStyles = tss.withParams<{ width: number }>().create(({ theme, width }) => {
    return ({
        "root": {
            "width": "100%",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "marginBottom": theme.spacing(23),
            "paddingLeft": theme.spacing(4),
            "paddingRight": theme.spacing(4),
            "boxSizing": "border-box"
        },
        "textWrapper": {
            "paddingLeft": theme.spacing(1),
            "paddingRight": theme.spacing(1),
            "boxSizing": "border-box",
            "display": "grid",
            "gridTemplateColumns": "1fr 1fr",
            "marginBottom": theme.spacing(23),
            width,
            [theme.breakpoints.down("mdPlus")]: {
                "display": "flex",
                "justifyContent": "center"

            },
            [theme.breakpoints.down("md")]: {
                "flexDirection": "column",
                "alignItems": "center",
            }

        },
        "titleWrapper": {
            "overflow": "hidden",
            [theme.breakpoints.down("md")]: {
                "marginBottom": theme.spacing(6)
            }

        },
        "title": {
            [theme.breakpoints.down("mdPlus")]: {
                "marginRight": theme.spacing(5)

            },
            [theme.breakpoints.down("md")]: {
                "marginRight": 0,
                "textAlign": "center",

            }

        },
        "paragraph": {
            [theme.breakpoints.down("mdPlus")]: {
                "width": 400,
                "maxWidth": "100%",
                "marginLeft": theme.spacing(5)

            },
            [theme.breakpoints.down("md")]: {
                "marginLeft": 0,
                "textAlign": "center",
                "width": "100%"

            }

        },
        "cardWrapper": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "flexWrap": "wrap",
            "position": "relative",
            "marginBottom": theme.spacing(19),
        },
        "card": {
            ...(() => {
                const value = theme.spacing(1);
                return {
                    "marginTop": value,
                    "marginBottom": value,
                    "marginLeft": value,
                    "marginRight": value,
                    [theme.breakpoints.down("sm")]: {
                        "marginLeft": 0,
                        "marginRight": 0
                    }
                }
            })(),
            "maxWidth": "90vw"
        },
        "buttonWrapper": {}
    })
})