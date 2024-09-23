import { memo, useState, useEffect } from "react";
import { tss } from "tss";
import Text from "@mui/material/Typography";
import { animate } from "tools/animate";
import { useConstCallback, useCallbackFactory } from "powerhooks";
import { ReactSVG } from "react-svg";
import { SquareButton } from "./SquareButton";
import arrow from "assets/svg/small-arrow.svg";
import { Video as VideoComponent } from "components/Video";

export type VideoSliderProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    rgbaFilter?: string;
    videos: {
        title?: string;
        subtitle?: string;
        paragraph?: string;
        image: {
            src: string;
            sources?: {
                srcSet: string | undefined;
                type: string | undefined;
            }[]
        };
        id: string;

    }[];

}


export const VideoSlider = memo((props: VideoSliderProps) => {
    const { className, videos, rgbaFilter } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { classes, cx } = useStyles({
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
    ): Parameters<typeof Video>["0"]["vector"] => {
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
            case "next": setCurrentIndex(currentIndex === videos.length - 1 ? 0 : currentIndex + 1); break;
            case "prev": setCurrentIndex(currentIndex === 0 ? videos.length - 1 : currentIndex - 1); break;
        }

    })

    return <div className={cx(classes.root, className)}>
        <div className={classes.cardWrapper}>
            <div className={classes.cards}>
                {
                    videos.map((video, index) => <Video
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
                            "titleWrapper": classes.cardTitleWrapper,
                            "videoComponent": classes.cardVideoComponent
                        }}
                        key={index}
                        vector={calculateVector(index)}
                        isActive={currentIndex === index}
                        {...video}
                        rgbaFilter={rgbaFilter}

                    />)
                }

            </div>

        </div>
        <div className={classes.buttonWrapper}>
            <SquareButton
                onClick={handleSlide("prev")}
                variant="grey"
                label={<ReactSVG className={classes.arrowLeft} src={arrow} />}
            />
            <SquareButton
                onClick={handleSlide("next")}
                variant="grey"
                label={<ReactSVG className={classes.arrowRight} src={arrow} />}
            />
        </div>

    </div>
})

const useStyles = tss.withName("VideoSlider").create(() => {
    return ({
        "root": {
            "display": "flex",
            "position": "relative",
            "flexDirection": "column",

        },
        "cardWrapper": {
            "display": "grid",
            "position": "relative",

        },
        "cards": {
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
        "buttonWrapper": {
            "display": "flex"
            /*[theme.breakpoints.down("sm")]: {
                "display": "flex",
                "flexDirection": "row-reverse",
                "justifyContent": "center",
                "marginTop": 0,
                "marginLeft": 0,
                "marginBottom": theme.spacing(8)

            }*/
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
        "cardVideoComponent": {}
    })
})


const { Video } = (() => {
    type VideoProps = VideoSliderProps["videos"][number] &
    {
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
        isActive: boolean;
        vector: "comingFromTop" | "comingFromBottom" | "leavingToTop" | "leavingToBottom" | "staticHidden" | "staticVisible";
        rgbaFilter?: string;
    }
    const Video = memo((props: VideoProps) => {
        const { className, paragraph, subtitle, title, isActive, vector, image, id, rgbaFilter } = props;

        //const starArrayRef = useRef((new Array(stars)).fill(undefined));
        const { classes, cx } = useStyles({
            isActive,
            vector,
            "hasImage": image !== undefined,
            "classesOverrides": props.classes
        });

        return <div className={cx(classes.root, className)}>
            {
                image !== undefined &&
                <div className={classes.imageWrapper}>
                    <div className={classes.pictureWrapper}>
                        <VideoComponent
                            src={image.src}
                            sources={image.sources}
                            width={673}
                            height={448}
                            borderRadius=""
                            videoId={id}
                            isAnimated={false}
                            rgbaFilter={rgbaFilter}
                            className={classes.videoComponent}

                        />

                    </div>

                </div>


            }
            <div className={classes.textWrapper}>

                {
                    (title !== undefined || subtitle !== undefined) &&
                    <div className={classes.titlesWrapper}>
                        {
                            title !== undefined &&
                            <div className={classes.titleWrapper}>
                                <Text className={classes.title} variant="h3">{title}</Text>

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
            </div>
        </div>
    });

    const useStyles = tss.withParams<{ isActive: boolean; vector: VideoProps["vector"]; hasImage: boolean; }>().create(({ isActive, vector, theme, hasImage, windowInnerWidth }) => {
        return ({
            "root": {
                "gridColumn": 1,
                "position": "relative",
                "gridRow": 1,
                "display": "flex",
                "flexDirection": "column",
                "pointerEvents": !isActive ? "none" : undefined,
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
                "justifySelf": "flex-start",
                "position": "relative"
            },
            "textWrapper": {
                "marginTop": theme.spacing(6),
                "marginBottom": theme.spacing(7)
                /*"display": "flex",
                "flexDirection": "column",
                "justifyContent": "space-between",*/

                //"alignItems": "center",
                /*...(() => {
                    if (!hasImage) {
                        return {};
                    }
                    const value = 30;
                    return {

                        "paddingTop": value,
                        "paddingBottom": value,
                    }
                })()*/

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

            },
            "titleWrapper": {
                "overflow": "hidden",

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

                /*[theme.breakpoints.down("sm")]: {

                    "textAlign": "center"
                }*/

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
            },
            "videoComponent": {}
        })
    })

    return { Video }
})()