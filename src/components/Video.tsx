import { memo, useState, useEffect, useRef } from "react";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { tss } from "tss";
import { PictureAnimator } from "components/PictureAnimator";
import type { PictureAnimatorProps } from "components/PictureAnimator";
import { ReactSVG } from "react-svg";
import playIconSvg from "assets/svg/icons/play-icon.svg";
import ClearIcon from '@mui/icons-material/Clear';
import Youtube from "react-youtube";
import type { YouTubeProps } from "react-youtube/dist/YouTube";


const transitionTime = 500;

export type VideoProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    videoId: string;
    rgbaFilter?: string;
} & Omit<PictureAnimatorProps, "className" | "classes">


export const Video = memo((props: VideoProps) => {
    const {
        borderRadius,
        height,
        videoId,
        src,
        width,
        alt,
        animationDelay,
        className,
        sources,
        rgbaFilter
    } = props;


    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [zIndex, setZIndex] = useState<number | undefined>(undefined);

    const toggleLightBox = useCallbackFactory((
        [isOpen]: [boolean]
    ) => {
        setIsLightBoxOpen(isOpen)
    })

    useEffect(() => {
        if (!isLightBoxOpen) {
            return;
        }

        function handleEscape(e: KeyboardEvent) {
            if (e.code !== "Escape") {
                return;
            }

            setIsLightBoxOpen(false);
        }

        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);

    }, [isLightBoxOpen])

    useEffect(() => {
        (async () => {
            if (isLightBoxOpen) {
                setZIndex(5000);
                return;
            }

            await new Promise<void>(resolve => setTimeout(resolve, transitionTime))
            setZIndex(undefined);
        })()

    }, [isLightBoxOpen])

    const playerRef = useRef<any>(null);

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
    };


    function handleVideo(state: "play" | "pause", playerRef: any) {
        if (playerRef.current === null) {
            return;
        };

        switch (state) {
            case "pause": playerRef.current.pauseVideo(); return;
            case "play": playerRef.current.playVideo();
        };

    }

    useEffect(()=>{
        if(playerRef.current === null){
            return;
        }

        if(isLightBoxOpen){
            handleVideo("play", playerRef);
            return;
        }
        handleVideo("pause", playerRef);

    }, [isLightBoxOpen, playerRef.current])



    const { cx, classes } = useStyles({
        "classesOverrides": props.classes,
        isLightBoxOpen,
        zIndex,
    });
    return <div style={{
        width,
        height,
        "maxWidth": "100vw",
        "maxHeight": `${(height / width) * 100}vw`
    }} className={cx(classes.root, className)}>
        <div className={classes.inner}>

            <PictureAnimator
                src={src}
                sources={sources}
                width={width}
                height={height}
                borderRadius={borderRadius}
                alt={alt}
                animationDelay={animationDelay}
                rgbaFilter={rgbaFilter}
            />
            <div className={classes.clickableWrapper}>
                <ReactSVG
                    onClick={toggleLightBox(true)}
                    src={playIconSvg}
                    className={classes.playIcon}
                />
            </div>
        </div>
        <div className={classes.lightBox}>
            <div onClick={toggleLightBox(false)}>
                <ClearIcon className={classes.closeIcon} />
            </div>
            {/*<iframe
                className={classes.iframe}
                src={iframeUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            >
            </iframe>*/}
            <Youtube
                className={classes.iframe}
                videoId={videoId}
                onReady={onReady}

            />

        </div>



    </div>
});

const useStyles = tss.withName("Video").withParams<{ isLightBoxOpen: boolean; zIndex: number | undefined}>().create(({ theme, isLightBoxOpen, zIndex }) => {
    return ({
        "root": {
            "position": "relative",

        },
        "inner": {
            "position": "relative",
        },
        "clickableWrapper": {
            "position": "absolute",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "width": "100%",
            "height": "100%",
            "top": 0,
            "left": 0
        },
        "playIcon": {
            "position": "relative",
            "& svg": {
                "fill": theme.palette.white.main,
                "transition": "fill 600ms, transform 600ms",
                "width": theme.spacing(15),
                "height": theme.spacing(15)
            },
            ":hover": {
                "& svg": {
                    "fill": theme.palette.gold2.main,
                    "transform": "scale(1.02)",
                },
                "cursor": "pointer"


            }
        },
        "lightBox": {
            "position": "fixed",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "top": 0,
            "left": 0,
            "width": "100vw",
            "height": "100vh",
            "background": "rgba(0, 0, 0, 0.92)",
            "opacity": isLightBoxOpen ? 1 : 0,
            "transform": isLightBoxOpen ? undefined : "scale(0.7)",
            "transition": `opacity ${transitionTime}ms, transform ${transitionTime}ms`,
            "pointerEvents": isLightBoxOpen ? undefined : "none",
            zIndex,
            ...(() => {
                const value = theme.spacing(5);
                return {
                    "paddingRight": value,
                    "paddingLeft": value,
                }
            })(),
            "boxSizing": "border-box"
        },
        "closeIcon": {
            "position": "absolute",
            "top": theme.spacing(11),
            "right": theme.spacing(11),
            "width": theme.spacing(8),
            "height": theme.spacing(8),
            "fill": "white",
            "transition": "fill 600ms, transform 600ms",
            ":hover": {
                "fill": theme.palette.gold2.main,
                "transform": "scale(1.1) rotate(360deg)",
                "cursor": "pointer"


            }

        },
        "iframe": {
            "& iframe": {
                "maxWidth": "100vw",
                "width": theme.spacing(100),
                "height": theme.spacing(50),
                "border": "none",

            }
        }

    })
});