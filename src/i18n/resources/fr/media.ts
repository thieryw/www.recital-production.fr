import type { TranslationMedia } from "../../types";

export const translation: TranslationMedia<"fr"> = {
    "Media": {
        "heroTitle": "EN IMAGES",
        "videosSmallTitle": "Vidéos",
        "galleryImageAlt": ({ index }) => `Récital Production en représentation — photo ${index}`
    }
}
