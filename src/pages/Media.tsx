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
/*import { SmallTitle } from "components/SmallTitle";
import backgroundSvg from "assets/svg/marble-large.svg";
import { Slider } from "components/Slider";
import Youtube from "react-youtube";*/


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
            {/*<div className={classes.videos}>
                <div className={classes.decoSection}>
                    <img className={classes.backgroundSvg} src={backgroundSvg} alt="background" />

                </div>
                <SmallTitle
                    description={t("videosSmallTitle")}
                    className={classes.smallTitle}

                />
                <Slider 
                    className={classes.slider}
                    slides={[
                        "m4KVytsPdGY",
                        "s9kxlnvclpA",
                        "GF64sBI2fVQ",
                        "Vd8apnl8m-g",
                        "qD7evQDFDQM",
                        "pSFHL-vbZxc",
                        "J6RVeWH_n-s"
                    ].map(id => <Youtube 
                            key={id}
                            videoId={id}
                            className={classes.video}
                    />)}
                />

            </div>*/}
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
            "paddingRight": theme.spacing(5),
            "paddingBottom": theme.spacing(20)
        },
        "slider": {

        },
        "videos": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "width": "100%",
            "justifyContent": "space-between",
            "marginTop": theme.spacing(30),
            "paddingLeft": theme.spacing(5),
            "paddingRight": theme.spacing(5),
            "boxSizing": "border-box",
            "position": "relative",
            "marginBottom": theme.spacing(24),
            [theme.breakpoints.down("mdPlus")]: {
                "flexDirection": "column"
            },
            [theme.breakpoints.down("md")]: {
                "paddingLeft": 0,
                "paddingRight": 0

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
        },
        "video": {
            "& iframe": {
                "width": 500,
                "height": 360,
                "maxWidth": "96vw",
                "border": "none"
            }
        }
    })
})


export const { i18n } = declareComponentKeys<
    | "heroTitle"
    | "videosSmallTitle"
>()({ Media })

export type I18n = typeof i18n;