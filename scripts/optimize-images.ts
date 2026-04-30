/**
 * One-shot image optimizer. Reads source JPEGs/PNGs from `public/images/` and
 * emits AVIF + WebP siblings beside them. The Hero `<picture>` element prefers
 * those modern formats and falls back to the original JPEG for old browsers.
 *
 * Run manually via `pnpm tsx scripts/optimize-images.ts` whenever the source
 * art changes — outputs are committed binaries, not generated at build time.
 */

import { readdir, stat } from "node:fs/promises";
import { resolve, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = resolve(__dirname, "../public/images");

const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function main() {
  const entries = await readdir(imagesDir);
  const sources = entries.filter((name) =>
    SOURCE_EXTENSIONS.has(extname(name).toLowerCase())
  );

  if (sources.length === 0) {
    console.log("no source images to optimize");
    return;
  }

  for (const name of sources) {
    const sourcePath = resolve(imagesDir, name);
    const baseName = name.replace(/\.[^.]+$/, "");
    const webpPath = resolve(imagesDir, `${baseName}.webp`);
    const avifPath = resolve(imagesDir, `${baseName}.avif`);

    const meta = await sharp(sourcePath).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const sourceSize = (await stat(sourcePath)).size;

    await sharp(sourcePath)
      .resize({ width: Math.min(width, 800), withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(webpPath);

    await sharp(sourcePath)
      .resize({ width: Math.min(width, 800), withoutEnlargement: true })
      .avif({ quality: 60, effort: 5 })
      .toFile(avifPath);

    const webpSize = (await stat(webpPath)).size;
    const avifSize = (await stat(avifPath)).size;

    const fmt = (n: number) => `${(n / 1024).toFixed(1)} KB`;
    console.log(
      `${name} (${width}×${height}, ${fmt(sourceSize)}) → ` +
        `${baseName}.webp ${fmt(webpSize)} | ${baseName}.avif ${fmt(avifSize)}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
