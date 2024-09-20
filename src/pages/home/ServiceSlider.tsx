import { useTranslation } from "i18n";
import { memo, useEffect, useState } from "react";
import { tss } from "tss";
import { Card } from "components/Card";
import slide1Svg from "assets/svg/icons/1-repertoire.svg"
import slide2Svg from "assets/svg/icons/2-talents.svg"
import slide3Svg from "assets/svg/icons/3-accompagnement.svg"
import slide4Svg from "assets/svg/icons/4-evenement.svg"
import slide5Svg from "assets/svg/icons/5-gironde.svg"
import useCarousel from "embla-carousel-react";
import arrow from "assets/svg/small-arrow.svg";
import { SquareButton } from "components/SquareButton";
import { ReactSVG } from "react-svg";
import { useCallbackFactory } from "powerhooks";




export const ServiceSlider = memo(() => {
    const { classes } = useStyles();
    const { t } = useTranslation("Home");
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
        <section className={classes.root}>
            <div ref={sliderRef} className={classes.viewport}>
                <div className={classes.container}>
                    {
                        [
                            {
                                "title": t("slide1"),
                                "logoSrc": slide1Svg
                            },
                            {
                                "title": t("slide2"),
                                "logoSrc": slide2Svg
                            },
                            {
                                "title": t("slide3"),
                                "logoSrc": slide3Svg
                            },
                            {
                                "title": t("slide4"),
                                "logoSrc": slide4Svg
                            },
                            {
                                "title": t("slide5"),
                                "logoSrc": slide5Svg
                            },
                        ].map((card, index) => <div style={{
                            "position": "relative",
                            "zIndex": currentSlide === index ? 1 : 0
                        }}
                            key={card.title}

                        >
                            <Card
                                {...card}
                                width={360}
                                height={360}
                                isSelected={index === currentSlide}
                                className={classes.card}


                            />
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


const useStyles = tss.create(({ theme }) => {
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
            "gridTemplateColumns": "repeat(5, 1fr)",
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