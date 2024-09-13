import { memo } from "react";
import { tss } from "tss";
import { keyframes } from "tss-react";
import type { ReactNode } from "react";


export type AnimatedBannerProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    isPlaying?: boolean;
    slides: ReactNode[]
}

export const AnimatedBanner = memo((props: AnimatedBannerProps) => {

    const { slides, className, isPlaying = true } = props;
    const { classes, cx } = useStyles({ isPlaying, "classesOverrides": props.classes });


    return <div className={cx(classes.root, className)}>
        {
            Array.from({ "length": 6 }).map((_, index) => <div key={index} className={classes.logoSlider}>
                {
                    slides.map((slide, index) => <div key={index} className={classes.slide}>{slide}</div> )}
            </div>)
        }

    </div>
})


const useStyles = tss.withName("AnimatedBanner").withParams<{ isPlaying: boolean }>().create(({ theme, isPlaying }) => {
    const gap = theme.spacing(10);

    return ({
        "root": {
            "overflow": "hidden",
            "display": "flex",

        },
        "logoSlider": {
            "display": "flex",
            "alignItems": "center",
            "animation": !isPlaying ? "none" : `${keyframes`
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(-100%);
            }
            `} 30s infinite linear`,
        },
        "slide": {
            "marginLeft": gap,
            "marginRight": gap

        }


    })
})