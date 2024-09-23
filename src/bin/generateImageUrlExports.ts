import { generateMediaFile } from "./generateMediaFile";
import { join } from "path";

generateMediaFile({
	"acceptedFileExtensions": [".webp"],
	"mediaPath": join(__dirname, "..", "assets", "webp", "media", "gallery", "miniatures"),
	"generatedFilePath": join(__dirname, ".."),
	"generatedFileName": "generatedMiniatureWebpExports"
});

generateMediaFile({
	"acceptedFileExtensions": [".webp"],
	"mediaPath": join(__dirname, "..", "assets", "webp", "media", "gallery", "photos"),
	"generatedFilePath": join(__dirname, ".."),
	"generatedFileName": "generatedPhotoWebpExports"
});

generateMediaFile({
	"acceptedFileExtensions": [".jpg", ".jpeg"],
	"mediaPath": join(__dirname, "..", "assets", "jpg", "media", "gallery", "miniatures"),
	"generatedFilePath": join(__dirname, ".."),
	"generatedFileName": "generatedMiniatureJpgExports"
});

generateMediaFile({
	"acceptedFileExtensions": [".jpg", ".jpeg"],
	"mediaPath": join(__dirname, "..", "assets", "jpg", "media", "gallery", "photos"),
	"generatedFilePath": join(__dirname, ".."),
	"generatedFileName": "generatedPhotoJpgExports"
});


