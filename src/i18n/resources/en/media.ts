import type { TranslationMedia } from "../../types";

export const translation: TranslationMedia<"en"> = {
    "Media": {
        "heroTitle": "EN IMAGES",
        "videosSmallTitle": "Videos",
        "galleryImageAlt": ({ index }) => `Récital Production performing live — photo ${index}`
    }
}
