import { memo } from "react";
import { ArtGallery } from "react-art-gallery";
import { files as jpgMin } from "generatedMiniatureJpgExports";
import { files as webpMin } from "generatedMiniatureWebpExports";
import { files as jpgPhotos } from "generatedPhotoJpgExports";
import { files as webpPhotos } from "generatedPhotoWebpExports";
import { tss } from "tss";
import Typo from "@mui/material/Typography";
import { declareComponentKeys } from "i18nifty";
import { useTranslation } from "i18n";
import { VideoSlider } from "components/VideoSlider";
import { SmallTitle } from "components/SmallTitle";
import backgroundSvg from "assets/svg/marble-large.svg";
import zephyrJpg from  "assets/jpg/media/zephyr-video.jpg";
import zephyrWebp from  "assets/webp/media/zephyr-video.webp";


export const Media = memo(() => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation("Media");
    return (
        <div className={classes.root}>
            <Typo className={classes.heroTitle} variant="h1">{t("heroTitle")}</Typo>
            <ArtGallery
                className={classes.gallery}
                thumbNailAlinement="vertical"
                columnCountForVerticalAlinement={3}
                breakpointsForColumns={{
                    "xl": theme.breakpoints.values.xl,
                    "md": theme.breakpoints.values.md,
                    "xs": theme.breakpoints.values.xs
                }}
                images={webpMin.files.map((file, index) => {
                    return {
                        "thumbNail": {
                            "src": file.url,
                            "sources": [
                                {
                                    "srcSet": file.url,
                                    "type": "image/wbep"
                                },
                                {
                                    "srcSet": jpgMin.files[index].url,
                                    "type": "image/jpeg"
                                }
                            ]
                        },
                        "lightBox": {
                            "src": webpPhotos.files[index].url,
                            "sources": [
                                {
                                    "srcSet": webpPhotos.files[index].url,
                                    "type": "image/webp"
                                },
                                {
                                    "srcSet": jpgPhotos.files[index].url,
                                    "type": "image/jpeg"
                                }
                            ]
                        }

                    }
                })}

            />
            <div className={classes.videos}>
                <div className={classes.decoSection}>
                    <img className={classes.backgroundSvg} src={backgroundSvg} alt="background" />

                </div>
                <SmallTitle
                    description={t("videosSmallTitle")}
                    className={classes.smallTitle}

                />
                <VideoSlider
                    rgbaFilter="rgba(0, 0, 0, 0.5)"
                    videos={[
                        {
                            "id": "Chw4LtjoQS0",
                            "image": {
                                "src": zephyrWebp,
                                "sources": [
                                    {
                                        "srcSet": zephyrWebp,
                                        "type": "image/webp"
                                    },
                                    {
                                        "srcSet": zephyrJpg,
                                        "type": "image/jpeg"
                                    },
                                ]
                            },
                            "title": "Duo Zéphir",
                        },
                        {
                            "id": "Chw4LtjoQS0",
                            "image": {
                                "src": zephyrWebp,
                                "sources": [
                                    {
                                        "srcSet": zephyrWebp,
                                        "type": "image/webp"
                                    },
                                    {
                                        "srcSet": zephyrJpg,
                                        "type": "image/jpeg"
                                    },
                                ]
                            },
                            "title": "Duo Zéphir",
                        },
                        {
                            "id": "Chw4LtjoQS0",
                            "image": {
                                "src": zephyrWebp,
                                "sources": [
                                    {
                                        "srcSet": zephyrWebp,
                                        "type": "image/webp"
                                    },
                                    {
                                        "srcSet": zephyrJpg,
                                        "type": "image/jpeg"
                                    },
                                ]
                            },
                            "title": "Duo Zéphir",
                        },
                    ]}
                    classes={{
                        "cardVideoComponent": classes.cardVideoComponent
                    }}
                />

            </div>
        </div>
    )

})


const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "paddingTop": theme.spacing(33),
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "position": "relative"

        },
        "heroTitle": {
            "textAlign": "center",
            "marginBottom": theme.spacing(16)

        },
        "gallery": {
            "width": 1100,
            "maxWidth": "100%",
            "paddingLeft": theme.spacing(5),
            "paddingRight": theme.spacing(5)
        },
        "videos": {
            "display": "flex",
            "alignItems": "flex-start",
            "width": "100%",
            "justifyContent": "space-between",
            "marginTop": theme.spacing(30),
            "paddingLeft": theme.spacing(13),
            "paddingRight": theme.spacing(24),
            "boxSizing": "border-box",
            "position": "relative",
            "marginBottom": theme.spacing(24),
            [theme.breakpoints.down("mdPlus")]: {
                "flexDirection": "column"
            },
            [theme.breakpoints.down("md")]: {
                "paddingLeft": theme.spacing(5),
                "paddingRight": theme.spacing(5)

            },
        },
        "smallTitle": {
            [theme.breakpoints.down("mdPlus")]: {
                "marginBottom": theme.spacing(7)
            },
        },
        "decoSection": {
            "width": "100%",
            "height": theme.spacing(32),
            "overflow": "hidden",
            "background": theme.palette.patternBackground.main,
            "borderTop": "solid 2px",
            "borderBottom": "solid 2px",
            "borderColor": theme.palette.gold1.main,
            "position": "absolute",
            "bottom": theme.spacing(38),
            "zIndex": -1,
            "top": 80,
            "left": 0,
            [theme.breakpoints.down("mdPlus")]: {
                "opacity": 0
            }

        },
        "backgroundSvg": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover"

        },
        "cardVideoComponent": {
            "maxWidth": `calc(100vw - ${2 * parseInt(theme.spacing(5))}px) !important`,
        }
    })
})


export const { i18n } = declareComponentKeys<
    | "heroTitle"
    | "videosSmallTitle"
>()({ Media })

export type I18n = typeof i18n;