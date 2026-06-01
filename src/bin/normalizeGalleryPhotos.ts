/**
 * Normalizes gallery *source* photos before the webp conversion step.
 *
 * Why this exists:
 *  `format-images` is a format converter, not a resizer — it will happily turn
 *  a 7436×5078 / 18 MB JPEG into an 8 MB webp. Lightbox photos never need more
 *  than ~2048px on the long edge, so we cap dimensions + quality at the source.
 *  Run this BEFORE `format-images` in postinstall: the webp step then inherits
 *  the already-small sources and produces small webps for free.
 *
 * Idempotent by design: a photo is only rewritten if its long edge exceeds
 * MAX_EDGE or its file size exceeds SIZE_BUDGET. Images that are already
 * web-sized are left byte-for-byte untouched, so reinstalls don't churn git
 * or slowly degrade quality through repeated re-encodes.
 *
 * Note on masters: this overwrites in place (standard for a web asset folder
 * tracked in git, not a photo archive). Keep your full-res originals elsewhere.
 * If you'd rather preserve them in-repo, set KEEP_ORIGINALS=1 and they'll be
 * copied to a sibling `_originals/` dir (which you should .gitignore) before the
 * first rewrite.
 */

import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const PHOTOS_DIR = join(__dirname, "..", "assets", "jpg", "media", "gallery", "photos");
const MAX_EDGE = 2048;
const JPEG_QUALITY = 82;
const SIZE_BUDGET = 1_000_000; // 1 MB — anything heavier gets re-encoded even if dims are fine
const KEEP_ORIGINALS = process.env.KEEP_ORIGINALS === "1";
const JPEG_EXTS = new Set([".jpg", ".jpeg"]);

async function run(): Promise<void> {
	const files = readdirSync(PHOTOS_DIR).filter(f => JPEG_EXTS.has(extname(f).toLowerCase()));
	const originalsDir = join(PHOTOS_DIR, "_originals");

	let touched = 0;
	let bytesBefore = 0;
	let bytesAfter = 0;

	for (const file of files) {
		const path = join(PHOTOS_DIR, file);
		const sizeBefore = statSync(path).size;
		const { width = 0, height = 0 } = await sharp(path).metadata();
		const longEdge = Math.max(width, height);

		const needsWork = longEdge > MAX_EDGE || sizeBefore > SIZE_BUDGET;
		if (!needsWork) {
			continue;
		}

		if (KEEP_ORIGINALS) {
			if (!existsSync(originalsDir)) {
				mkdirSync(originalsDir);
			}
			const backup = join(originalsDir, file);
			if (!existsSync(backup)) {
				copyFileSync(path, backup);
			}
		}

		// sharp can't read+write the same file in one pipeline, so buffer first.
		const buffer = await sharp(path)
			.rotate() // bake in EXIF orientation before stripping metadata
			.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
			.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
			.toBuffer();

		await sharp(buffer).toFile(path);

		const sizeAfter = statSync(path).size;
		bytesBefore += sizeBefore;
		bytesAfter += sizeAfter;
		touched++;
		console.log(
			`  ${basename(file).padEnd(12)} ${width}×${height} ${(sizeBefore / 1e6).toFixed(1)}MB ` +
			`→ ≤${MAX_EDGE}px ${(sizeAfter / 1e6).toFixed(2)}MB`
		);
	}

	if (touched === 0) {
		console.log("normalizeGalleryPhotos: nothing to do (all photos already within budget).");
		return;
	}
	console.log(
		`normalizeGalleryPhotos: rewrote ${touched} file(s), ` +
		`${(bytesBefore / 1e6).toFixed(1)}MB → ${(bytesAfter / 1e6).toFixed(1)}MB ` +
		`(−${(100 * (bytesBefore - bytesAfter) / bytesBefore).toFixed(0)}%).`
	);
}

run().catch(err => {
	console.error("normalizeGalleryPhotos failed:", err);
	process.exit(1);
});
