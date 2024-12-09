import { memo, useEffect, useState, type ReactNode } from "react";
import { tss } from "tss";
import useCarousel from "embla-carousel-react";
import arrow from "assets/svg/small-arrow.svg";
import { SquareButton } from "components/SquareButton";
import { ReactSVG } from "react-svg";
import { useCallbackFactory } from "powerhooks";


export type SliderProps = {
    className?: string;
    slides: ReactNode[];

}


export const Slider = memo((props: SliderProps) => {
    const { slides, className } = props
    const { classes, cx } = useStyles(
        {
            "numberOfSlides": slides.length
        }
    );
    const [sliderRef, sliderApi] = useCarousel({
        "loop": true
    });
    const [currentSlide, setCurrentSlide] = useState(0)
    const navigate = useCallbackFactory((
        [direction]: ["prev" | "next"]
    ) => {
        if (sliderApi === undefined) {
            return;
        }
        switch (direction) {
            case "next": sliderApi.scrollNext(); return;
            case "prev": sliderApi.scrollPrev();
        }


    })
    useEffect(() => {
        if (sliderApi === undefined) {
            return;
        }
        sliderApi.on("select", () => {
            setCurrentSlide(sliderApi.selectedScrollSnap())
        })

    }, [sliderApi])
    return (
        <section className={cx(classes.root, className)}>
            <div ref={sliderRef} className={classes.viewport}>
                <div className={classes.container}>
                    {
                        slides.map((card, index) => <div style={{
                            "position": "relative",
                            "zIndex": currentSlide === index ? 1 : 0
                        }}
                            key={index}

                        >
                            {
                                card
                            }
                        </div>)
                    }

                </div>

            </div>
            <div className={classes.navigation}>
                <SquareButton
                    onClick={navigate("prev")}
                    variant="grey"
                    label={<ReactSVG className={classes.arrowLeft} src={arrow} />}
                />
                <SquareButton
                    onClick={navigate("next")}
                    variant="grey"
                    label={<ReactSVG className={classes.arrowRight} src={arrow} />}
                />

            </div>

        </section>
    )
})


const useStyles = tss
    .withParams<{numberOfSlides: number}>()
    .create(({ theme, numberOfSlides }) => {
    return ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "marginBottom": theme.spacing(30)
        },
        "viewport": {
            "userSelect": "none",
            "overflow": "hidden",
            "width": (360 * 4) + 80,
            "maxWidth": "100vw",
            "height": 360 * 1.5,
            "position": "relative"
        },
        "container": {
            "position": "relative",
            "top": "15%",
            "display": "grid",
            "gridTemplateColumns": `repeat(${numberOfSlides}, 1fr)`,
            "gap": theme.spacing(4),
            "paddingLeft": theme.spacing(4),
            "paddingRight": theme.spacing(4)
        },
        "card": {
            "maxWidth": "80vw"

        },
        "arrowLeft": {
            "transform": "rotate(-90deg)"

        },
        "arrowRight": {
            "transform": "rotate(90deg)"

        },
        "navigation": {
            "display": "flex",
            "marginTop": theme.spacing(7)

        }

    })
})