import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useDomRect } from "powerhooks/useDomRect";
import { useConstCallback } from "powerhooks/useConstCallback";
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
import backgroundSvg from "assets/svg/marble-long-2.svg";
import backgroundSmallSvg from "assets/svg/marble-mobile.svg";


export const Hero = memo(() => {
    const { t } = useTranslation("Services");
    const { classes } = useStyles();
    return (
        <section className={classes.root}>
            <div style={{ "overflow": "hidden" }}>
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
                            "title": t("heroCardTitle1"),
                            "contentTitle": t("individualTitle"),
                            "contentBulletPointsTitle": t("individualSubtitle1"),
                            "contentParagraphTitle": t("individualSubtitle2"),
                            "bulletPoints": [
                                t("individualBulletPoint1"),
                                t("individualBulletPoint2"),
                                t("individualBulletPoint3"),
                                t("individualBulletPoint4"),
                                t("individualBulletPoint5"),
                                t("individualBulletPoint6"),
                            ],
                            "contentParagraph": t("individualParagraph")
                        },
                        {
                            "jpg": card2Jpg,
                            "webp": card2Webp,
                            "title": t("heroCardTitle2"),
                            "contentTitle": t("communeTitle"),
                            "contentBulletPointsTitle": t("communeSubtitle1"),
                            "contentParagraphTitle": t("communeSubtitle2"),
                            "bulletPoints": [
                                t("communeBulletPoint1"),
                                t("communeBulletPoint2"),
                                t("communeBulletPoint3"),
                                t("communeBulletPoint4"),
                                t("communeBulletPoint5"),
                                t("communeBulletPoint6"),
                            ],
                            "contentParagraph": t("communeParagraph")
                        },
                        {
                            "jpg": card3Jpg,
                            "webp": card3Webp,
                            "title": t("heroCardTitle3"),
                            "contentTitle": t("companyTitle"),
                            "contentBulletPointsTitle": t("companySubtitle1"),
                            "contentParagraphTitle": t("companySubtitle2"),
                            "bulletPoints": [
                                t("companyBulletPoint1"),
                                t("companyBulletPoint2"),
                                t("companyBulletPoint3"),
                                t("companyBulletPoint4"),
                                t("companyBulletPoint5"),
                            ],
                            "contentParagraph": t("companyParagraph")
                        },

                    ].map(({ jpg, title, webp, bulletPoints, contentBulletPointsTitle, contentParagraph, contentParagraphTitle, contentTitle }, index) => <Card
                        button={{
                            ...routes.contact().link,
                            "label": t("contact")
                        }}
                        jpgSrc={jpg}
                        webpSrc={webp}
                        title={title}
                        key={title}
                        moreButtonLabel={t("more")}
                        lessButtonLabel={t("less")}
                        bulletPoints={bulletPoints}
                        contentBulletPointTitle={contentBulletPointsTitle}
                        contentParagraphTitle={contentParagraphTitle}
                        contentTitle={contentTitle}
                        contentParagraph={contentParagraph}
                        isOpen={index === 0}

                    />)
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
            "width": "100vw",
            "position": "relative",
            "left": -theme.spacing(4),
            ...(() => {
                const value = `solid ${theme.palette.gold1.main} 4px`;
                return {
                    "borderTop": value,
                    "borderBottom": value
                }
            })()



        },
    })

});



const { Card } = (() => {
    type CardProps = {
        jpgSrc: string;
        webpSrc: string;
        title: string;
        moreButtonLabel: string;
        lessButtonLabel: string;
        button: {
            onClick?: () => void;
            label: string;
            href: string;
        };
        contentTitle: string;
        contentBulletPointTitle: string;
        contentParagraphTitle: string;
        contentParagraph: string;
        bulletPoints: string[];
        isOpen: boolean;
    };

    const Card = memo((props: CardProps) => {
        const {
            jpgSrc,
            title,
            webpSrc,
            button,
            lessButtonLabel,
            moreButtonLabel,
            bulletPoints,
            contentBulletPointTitle,
            contentParagraph, 
            contentParagraphTitle,
            isOpen


        } = props;

        const { domRect: { height }, ref } = useDomRect();

        const [isActive, setIsActive] = useState(isOpen);

        const toggleIsActive = useConstCallback(() => {
            setIsActive(!isActive);
        });
        const { classes, windowInnerWidth, theme } = useStyles({
            height,
            isActive
        });
        return <div className={classes.root}>
            <div
                className={classes.card}
                onClick={toggleIsActive}
            >
                <img className={classes.backgroundSvg} src={windowInnerWidth < theme.breakpoints.values.sm ? backgroundSmallSvg : backgroundSvg} alt="Footer background svg" />
                <div className={classes.cardTextWrapper}>
                    <Typo className={classes.cardTitle} variant="h2">{title}</Typo>
                    <LinkButton
                        label={isActive ? lessButtonLabel : moreButtonLabel}
                    />
                </div>
            </div>
            <div className={classes.cardContentWrapper}>
                <div ref={ref} className={classes.cardContent}>
                    <div className={classes.paragraphWrapper}>
                        <Typo className={classes.paragraphTitle} variant="h2">
                            {contentParagraphTitle}
                        </Typo>
                        <Typo className={classes.paragraph} variant="body1">{contentParagraph}</Typo>
                    </div>
                    <div className={classes.bulletPointsWrapper}>
                        <picture>
                            <source srcSet={webpSrc} type="image/webp" />
                            <source srcSet={jpgSrc} type="image/jpeg" />
                            <img className={classes.image} src={webpSrc} alt={title} />
                        </picture>
                        <div className={classes.bulletPointsInner}>
                            <Typo className={classes.bulletPointsTitle} variant="h2">{contentBulletPointTitle}</Typo>
                            <ul className={classes.bulletPoints}>
                                {
                                    bulletPoints.map(bulletPoint => <li key={bulletPoint}><Typo className={classes.bulletPointText} variant="body1">
                                        {bulletPoint}

                                    </Typo></li>)
                                }
                            </ul>
                            <LinkButton 
                                {...button}
                            />

                        </div>
                    </div>


                </div>

            </div>

        </div>
    })

    const useStyles = tss
        .withParams<{ isActive: boolean; height: number }>()
        .create(({ theme, isActive, height }) => {
            return ({
                "root": {
                    "position": "relative",
                    ...(() => {
                        const value = `solid ${theme.palette.gold1.main} 4px`;
                        return {
                            "borderTop": value,
                            "borderBottom": value
                        }
                    })(),

                },
                "card": {
                    "background": theme.palette.footerDark.main,
                    "cursor": "pointer",
                    "position": "relative",
                    "paddingLeft": theme.spacing(6),
                    "paddingRight": theme.spacing(6),
                    "paddingTop": theme.spacing(7),
                    "paddingBottom": theme.spacing(7),

                },
                "cardContentWrapper": {
                    "height": isActive ? height : 0,
                    "overflow": "hidden",
                    "transition": "height 600ms",
                    "paddingLeft": theme.spacing(4),
                    "paddingRight": theme.spacing(4)

                },
                "cardContent": {
                    "width": "100%",
                    "position": "relative",
                },
                "cardTextWrapper": {
                    "display": "flex",
                    "justifyContent": "space-between",
                    "alignItems": "center",
                    [theme.breakpoints.down("sm")]: {
                        "flexDirection": "column"
                    }
                },
                "cardTitle": {
                    "color": theme.palette.white.main,
                    [theme.breakpoints.down("sm")]: {
                        "marginBottom": theme.spacing(3)
                    }

                },
                "backgroundSvg": {
                    "position": "absolute",
                    "top": 0,
                    "left": 0,
                    "width": "100%"

                },
                "paragraphWrapper": {
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "paddingTop": theme.spacing(10),
                    "paddingBottom": theme.spacing(10),
                },
                "bulletPointsWrapper": {
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "center",
                    "paddingBottom": theme.spacing(10),
                    [theme.breakpoints.down("sm")]: {
                        "flexDirection": "column"

                    }
                },
                "bulletPointsInner": {
                    "marginLeft": theme.spacing(6),
                    "maxWidth": 600,
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "flex-start",
                    [theme.breakpoints.down("sm")]: {
                        "alignItems": "center",
                        "marginLeft": 0

                    }
                },
                "bulletPoints": {
                    "display": "grid",
                    "gridTemplateColumns": "1fr",
                    "gap": theme.spacing(2),
                    "marginBottom": theme.spacing(5),
                    "paddingInlineStart": 20,
                    [theme.breakpoints.down("sm")]: {
                        "justifyItems": "center",
                        "paddingInlineStart": 0,
                        "listStyleType": "none"
                    }
                },
                "bulletPointText": {
                    [theme.breakpoints.down("sm")]: {
                        "textAlign": "center"
                    }

                },
                "bulletPointsTitle": {
                    "marginBottom": theme.spacing(4),
                    [theme.breakpoints.down("sm")]: {
                        "textAlign": "center"
                    }
                },
                "image": {
                    "marginRight": theme.spacing(6),
                    "maxWidth": "100%",
                    "height": "auto",
                    "minWidth": 250,
                    [theme.breakpoints.down("sm")]: {
                        "marginRight": 0,
                        "marginBottom": theme.spacing(10)

                    }
                },
                "paragraphTitle": {
                    "textAlign": "center",
                    "maxWidth": 600,
                    "marginBottom": theme.spacing(6)
                },
                "paragraph": {
                    "textAlign": "center",
                    "maxWidth": 700
                }

            })

        })

    return { Card }
})() 