import { memo, useRef, useState, useEffect } from "react";
import { tss } from "tss";
import Text from "@mui/material/Typography";
import starSvg from "assets/svg/star.svg";
import { animate } from "tools/animate";
import { useConstCallback, useCallbackFactory } from "powerhooks";
import { ReactSVG } from "react-svg";
import { SquareButton } from "./SquareButton";
import arrow from "assets/svg/small-arrow.svg";

export type CardSliderProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    cards: {
        title?: string;
        subtitle?: string;
        paragraph?: string;
        stars?: number;
        image?: {
            src: string;
            sources?: {
                srcSet: string | undefined;
                type: string | undefined;
            }[]
        }
    }[];

}


export const CardSlider = memo((props: CardSliderProps) => {
    const { className, cards } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { classes, cx, theme, windowInnerWidth } = useStyles({
        "classesOverrides": props.classes
    });


    useEffect(() => {

        (async () => {
            if (isTransitioning) {
                return;
            }
            setIsTransitioning(true);
            await new Promise<void>(resolve => setTimeout(resolve, 1500));
            setIsTransitioning(false);

        })()

    }, [currentIndex])

    const calculateVector = useConstCallback((
        index: number
    ): Parameters<typeof Card>["0"]["vector"] => {
        if (previousIndex === null) {
            if (currentIndex === index) {
                return "staticVisible";
            };
            return "staticHidden";
        }
        if (currentIndex === index && currentIndex < previousIndex) {
            return "comingFromTop";
        }
        if (currentIndex === index && currentIndex > previousIndex) {
            return "comingFromBottom";
        }
        if (previousIndex === index && currentIndex > previousIndex) {
            return "leavingToTop";
        }
        if (previousIndex !== index && currentIndex !== index) {
            return "staticHidden";
        }
        return "leavingToBottom";

    });

    const handleSlide = useCallbackFactory((
        [direction]: ["prev" | "next"]
    ) => {
        if (isTransitioning) {
            return;
        }
        setPreviousIndex(currentIndex);
        switch (direction) {
            case "next": setCurrentIndex(currentIndex === cards.length - 1 ? 0 : currentIndex + 1); break;
            case "prev": setCurrentIndex(currentIndex === 0 ? cards.length - 1 : currentIndex - 1); break;
        }

    })

    return <div className={cx(classes.root, className)}>
        <div className={classes.cardWrapper}>
            <div className={classes.cards}>
                {
                    cards.map((card, index) => <Card
                        classes={{
                            "cardNumber": classes.cardNumber,
                            "image": classes.cardImage,
                            "imageWrapper": classes.cardImageWrapper,
                            "paragraph": classes.cardParagraph,
                            "pictureWrapper": classes.cardPictureWrapper,
                            "root": classes.cardRoot,
                            "stars": classes.cardStars,
                            "subtitle": classes.cardSubtitle,
                            "subtitleWrapper": classes.cardSubtitleWrapper,
                            "textWrapper": classes.cardTextWrapper,
                            "title": classes.cardTitle,
                            "titleWrapper": classes.cardTitleWrapper
                        }}
                        key={index}
                        vector={calculateVector(index)}
                        isActive={currentIndex === index}
                        {...card}
                        cardNumber={index + 1}
                    />)
                }

            </div>
            {
                (() => {
                    if (windowInnerWidth < theme.breakpoints.values.sm) {
                        return undefined;
                    }
                    return <>
                        <div className={cx(classes.backgroundCard, classes.backgroundCard1)}></div>
                        <div className={cx(classes.backgroundCard, classes.backgroundCard2)}></div>
                    </>
                })()
            }

        </div>
        <div className={classes.buttonWrapper}>
            <SquareButton
                onClick={handleSlide("next")}
                variant="grey"
                label={<ReactSVG className={classes.arrowRight} src={arrow} />}
            />
            <SquareButton
                onClick={handleSlide("prev")}
                variant="grey"
                label={<ReactSVG className={classes.arrowLeft} src={arrow} />}
            />
        </div>

    </div>
})

const useStyles = tss.withName("CardSlider").create(({ theme }) => {
    return ({
        "root": {
            "display": "flex",
            "position": "relative",
            [theme.breakpoints.down("sm")]: {
                "flexDirection": "column-reverse",
                "alignItems": "center"
            }

        },
        "cardWrapper": {
            "display": "grid",
            "position": "relative",
            [theme.breakpoints.up("sm")]: {
                "maxWidth": 461,
            }

        },
        "cards": {
            "backgroundColor": theme.palette.white.main,
            "display": "grid",
            "gridColumn": 1,
            "gridRow": 1,
            "position": "relative",
            "zIndex": 200,

        },
        "arrowLeft": {
            "transform": "rotate(-90deg)"

        },
        "arrowRight": {
            "transform": "rotate(90deg)"

        },
        "backgroundCard": {
            "gridColumn": 1,
            "gridRow": 1,
            "boxShadow": "0px 2px 20px 2px rgba(0, 0, 0, 0.1)",
            "backgroundColor": theme.palette.white.main
        },
        "backgroundCard1": {
            "transform": "translateX(20px) scale(0.96)"

        },
        "backgroundCard2": {
            "transform": "translateX(10px) scale(0.98)"

        },
        "buttonWrapper": {
            "marginTop": 190,
            "marginLeft": 130,
            [theme.breakpoints.down("sm")]: {
                "display": "flex",
                "flexDirection": "row-reverse",
                "justifyContent": "center",
                "marginTop": 0,
                "marginLeft": 0,
                "marginBottom": theme.spacing(8)

            }
        },
        "cardNumber": {},
        "cardImage": {},
        "cardImageWrapper": {},
        "cardParagraph": {},
        "cardPictureWrapper": {},
        "cardRoot": {},
        "cardStars": {},
        "cardSubtitle": {},
        "cardSubtitleWrapper": {},
        "cardTitle": {},
        "cardTitleWrapper": {},
        "cardTextWrapper": {},
    })
})


const { Card } = (() => {
    type CardProps = CardSliderProps["cards"][number] &
    {
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
        cardNumber: number;
        isActive: boolean;
        vector: "comingFromTop" | "comingFromBottom" | "leavingToTop" | "leavingToBottom" | "staticHidden" | "staticVisible";
    }
    const Card = memo((props: CardProps) => {
        const { className, cardNumber, paragraph, stars, subtitle, title, isActive, vector, image } = props;

        const starArrayRef = useRef((new Array(stars)).fill(undefined));
        const { classes, theme, cx, windowInnerWidth } = useStyles({
            isActive,
            vector,
            "hasImage": image !== undefined,
            "classesOverrides": props.classes
        });

        return <div className={cx(classes.root, className)}>
            {
                (() => {
                    if (windowInnerWidth < theme.breakpoints.values.sm) {
                        return undefined;
                    }
                    return <Text className={classes.cardNumber} variant="body2">0{cardNumber}.</Text>
                })()
            }
            {
                image !== undefined &&
                <div className={classes.imageWrapper}>
                    <div className={classes.pictureWrapper}>
                        <picture>
                            {
                                image.sources !== undefined &&
                                image.sources.map(({ srcSet, type }) => <source
                                    key={srcSet}
                                    srcSet={srcSet}
                                    type={type}
                                />)
                            }
                            <img className={classes.image} src={image.src} alt="card illustration" />
                        </picture>

                    </div>

                </div>


            }
            {
                (() => {
                    if (image !== undefined) {
                        return <div className={classes.textWrapper}>

                            {
                                (title !== undefined || subtitle !== undefined) &&
                                <div className={classes.titlesWrapper}>
                                    {
                                        title !== undefined &&
                                        <div className={classes.titleWrapper}>
                                            <Text className={classes.title} variant="h4">{title}</Text>

                                        </div>
                                    }
                                    {
                                        subtitle !== undefined &&
                                        <div className={classes.subtitleWrapper}>
                                            <Text className={classes.subtitle} variant="body1">{subtitle}</Text>
                                        </div>
                                    }

                                </div>
                            }
                            {
                                paragraph !== undefined &&
                                <Text className={classes.paragraph} variant="body1">{paragraph}</Text>
                            }
                            {
                                stars !== undefined &&
                                <div className={classes.stars}>
                                    {
                                        starArrayRef.current.map((_star, index) => <ReactSVG key={index} src={starSvg} />)
                                    }
                                </div>
                            }
                        </div>
                    }
                    return <>
                        {
                            (title !== undefined || subtitle !== undefined) &&
                            <div className={classes.titlesWrapper}>
                                {
                                    title !== undefined &&
                                    <div className={classes.titleWrapper}>
                                        <Text className={classes.title} variant="h4">{title}</Text>

                                    </div>
                                }
                                {
                                    subtitle !== undefined &&
                                    <div className={classes.subtitleWrapper}>
                                        <Text className={classes.subtitle} variant="body1">{subtitle}</Text>
                                    </div>
                                }

                            </div>
                        }
                        {
                            paragraph !== undefined &&
                            <Text className={classes.paragraph} variant="body1">{paragraph}</Text>
                        }
                        {
                            stars !== undefined &&
                            <div className={classes.stars}>
                                {
                                    starArrayRef.current.map((_star, index) => <ReactSVG key={index} src={starSvg} />)
                                }
                            </div>
                        }
                    </>
                })()
            }
        </div>
    });

    const useStyles = tss.withParams<{ isActive: boolean; vector: CardProps["vector"]; hasImage: boolean; }>().create(({ isActive, vector, theme, hasImage, windowInnerWidth }) => {
        return ({
            "root": {
                "gridColumn": 1,
                "zIndex": 200,
                "gridRow": 1,
                "display": "flex",
                //"justifyContent": "space-between",
                "flexDirection": "column",
                "pointerEvents": isActive ? "none" : undefined,
                ...(() => {
                    if (hasImage) {
                        return {};
                    }
                    if (windowInnerWidth < theme.breakpoints.values.sm) {
                        const value = 25;

                        return {
                            "alignItems": "center",
                            "paddingLeft": value,
                            "paddingRight": value,
                            "paddingTop": 55,
                            "paddingBottom": 70,
                        }

                    }
                    return {
                        ...(() => {
                            const value = 65;
                            return {
                                "paddingLeft": value,
                                "paddingRight": value
                            }

                        })(),
                        "paddingTop": 98,
                        "paddingBottom": 132,

                    }

                })(),
                "boxShadow": "0px 2px 20px 2px rgba(0, 0, 0, 0.1)",

            },
            "paragraph": {
                "transition": "opacity 500ms",
                "transitionDelay": isActive ? "800ms" : undefined,
                "opacity": isActive ? 1 : 0,
                "marginBottom": 40,
                [theme.breakpoints.down("sm")]: {

                    "textAlign": "center"
                }

            },
            "imageWrapper": {

                "overflow": "hidden",
                "justifySelf": "flex-start"
            },
            "textWrapper": {
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "space-between",
                "alignItems": "center",
                ...(() => {
                    if (!hasImage) {
                        return {};
                    }
                    const value = 30;
                    return {

                        "paddingTop": value,
                        "paddingBottom": value,
                        "paddingLeft": value,
                        "paddingRight": value
                    }
                })()

            },
            "pictureWrapper": {
                ...animate({
                    vector,
                    "comingInDuration": 600
                })

            },
            "image": {
                "width": "100%",
                "objectFit": "cover",
                "display": "block"

            },
            "cardNumber": {
                "opacity": isActive ? 1 : 0,
                "marginBottom": 65

            },
            "titlesWrapper": {
                "marginBottom": 40

            },
            "titleWrapper": {
                "overflow": "hidden",
                "marginBottom": 20,

            },
            "subtitleWrapper": {
                "overflow": "hidden"

            },
            "stars": {
                "display": "flex",
                "transition": "opacity 500ms",
                "transitionDelay": isActive ? "1200ms" : undefined,
                "opacity": isActive ? 1 : 0,
            },
            "title": {
                ...animate({
                    vector,
                    "comingInDelay": 500
                }),

                [theme.breakpoints.down("sm")]: {

                    "textAlign": "center"
                }

            },
            "subtitle": {
                "color": theme.palette.gold1.main,
                ...animate({
                    vector,
                    "comingInDelay": 800
                }),
                [theme.breakpoints.down("sm")]: {

                    "textAlign": "center"
                }
            }
        })
    })

    return { Card }
})()