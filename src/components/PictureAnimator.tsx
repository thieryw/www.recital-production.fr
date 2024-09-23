import { memo, useEffect, useState } from "react";
import { tss } from "tss";
import { useInView } from "react-intersection-observer";


export type PictureAnimatorProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    src: string;
    sources?: {srcSet?: string; type?: string}[];
    alt?: string;
    animationDelay?: number;
    width: number;
    height: number;
    borderRadius: string;
    rgbaFilter?: string;
}

export const PictureAnimator = memo((props: PictureAnimatorProps) => {
    const { className, src, sources, alt, animationDelay = 0, width, height, borderRadius, rgbaFilter } = props;
    const [ref, inView] = useInView({ "triggerOnce": true, "threshold": 0.4 })
    const [isImageVisible, setIsImageVisible] = useState(inView);


    useEffect(() => {
        if (inView) {
            setIsImageVisible(true)
        }

    }, [inView])

    const { classes, cx } = useStyles({
        "inView": isImageVisible,
        "classesOverrides": props.classes,
        animationDelay,
        width,
        height,
        borderRadius,
        rgbaFilter
    });

    return <div ref={ref} className={cx(classes.root, className)}>

        <div className={classes.animatedDiv}>
            <picture>
                {
                    sources?.map((source, index) => <source key={index} {...source} />)
                }
                <img className={classes.image} /*ref={imageRef}*/ src={src} alt={alt} />

            </picture>

        </div>
        <div className={classes.background}>

        </div>
    </div>

})

const useStyles = tss.withParams<
    {
        inView: boolean;
        animationDelay: number;
        width: number;
        height: number;
        borderRadius: string;
        rgbaFilter: string | undefined;
    }
>().create(({rgbaFilter, inView, animationDelay, borderRadius, height: _height, width: _width, windowInnerWidth, theme }) => {

    const width = windowInnerWidth < theme.breakpoints.values.sm ? "100vw" : _width;
    const height = windowInnerWidth < theme.breakpoints.values.sm ? `${_height / (_width / 100)}vw` : _height;


    return ({
        "root": {
            "position": "relative",

            "minWidth": width,
            height,
            borderRadius,
            "overflow": "hidden",
            "maxWidth": "100%",
            ...(() => {
                if (typeof width !== "number" || typeof height !== "number") {
                    return;

                }
                return {
                    "minHeight": `${height / width}vw`,

                }
            })(),
        },
        "animatedDiv": {

            "position": "absolute",
            "whiteSpace": "nowrap",
            "width": inView ? width : 0,
            "transition": "width 1000ms",
            "transitionDelay": `${animationDelay}ms`,
            "overflow": "hidden",
            height
        },
        "background": {
            "position": "absolute",
            "top": 0,
            "left": 0,
            height,
            "width": inView ? width : 0,
            "transition": "width 1000ms",
            "backgroundColor": rgbaFilter
        },
        "image": {
            "transform": `scale(${inView ? 1 : 1.2})`,
            "transition": "transform 1000ms",
            "transitionDelay": `${animationDelay}ms`,
            "width": width,
            "height": height,
            ...(() => {
                if (typeof width !== "number" || typeof height !== "number") {
                    return;

                }
                return {
                    "minHeight": `${height / width}vw`,

                }
            })(),
            "objectFit": "cover"
        }
    })
})