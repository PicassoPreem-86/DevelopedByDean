/**
 * Build-time sitemap generator. Reads the canonical route inventory from
 * `src/data/seoPages.ts` so we can never drift between routes and sitemap.
 *
 * Run via the `prebuild` npm script — emits `public/sitemap.xml` before Vite
 * copies it into the deploy artifact.
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { servicePages, industryPages } from "../src/data/seoPages.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const SITE_URL = "https://developedbydean.ai";

type Entry = { path: string; changefreq: string; priority: string };

const staticEntries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/industries", changefreq: "weekly", priority: "0.8" },
  { path: "/use-cases", changefreq: "monthly", priority: "0.8" },
  { path: "/results", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/assessment", changefreq: "monthly", priority: "0.7" },
];

const serviceEntries: Entry[] = servicePages.map((page) => ({
  path: page.path,
  changefreq: "weekly",
  priority: "0.9",
}));

const industryEntries: Entry[] = industryPages.map((page) => ({
  path: page.path,
  changefreq: "weekly",
  priority: "0.8",
}));

const entries = [...staticEntries, ...serviceEntries, ...industryEntries];

const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(projectRoot, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✓ wrote ${entries.length} URLs to ${outPath}`);
