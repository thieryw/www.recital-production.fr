import { memo } from "react";
import { ArtGallery } from "react-art-gallery";
import { files as jpgMin } from "generatedMiniatureJpgExports";
import { files as webpMin } from "generatedMiniatureWebpExports";
import { files as jpgPhotos } from "generatedPhotoJpgExports";
import { files as webpPhotos } from "generatedPhotoWebpExports";
import { tss } from "tss";



export const Media = memo(() => {

    const { classes } = useStyles();
    return (
        <div className={classes.root}>
            <ArtGallery
                className={classes.gallery}
                thumbNailAlinement="vertical"
                columnCountForVerticalAlinement={3}
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
        </div>
    )

})


const useStyles = tss.create(({ theme }) => {
    return ({
        "root": {
            "paddingTop": theme.spacing(33),
            "display": "flex",
            "justifyContent": "center"

        },
        "gallery": {
            "width": 1100,
            "maxWidth": "100%"
        },
    })
})