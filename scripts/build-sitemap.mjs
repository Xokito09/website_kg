/**
 * Generates public/sitemap.xml from static routes + blog posts.
 * Runs automatically before every build (see "prebuild" in package.json).
 * Also run manually: npm run build-sitemap
 *
 * lastmod policy (2026-09-22):
 * Every static page used to be stamped with today's date on every build. A
 * sitemap where all twelve URLs change their lastmod on every deploy carries
 * no information, and Google learns to ignore the field entirely — which is
 * exactly the signal we want it to trust when a page really does change.
 * Static pages now take lastmod from the last commit that touched the page
 * file, so a page that has not changed in four months says so. /blog is the
 * exception: it is an index that changes whenever any post ships, so it keeps
 * the build date. `today` remains the fallback when git is unavailable (e.g.
 * a source tarball build).
 */

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const BASE_URL = "https://kaptasglobal.io";
const OUT_FILE = path.join(__dirname, "../public/sitemap.xml");
const POSTS_FILE = path.join(__dirname, "../src/data/blog-posts.json");

const today = new Date().toISOString().slice(0, 10);

/** Last commit date (YYYY-MM-DD) for a repo-relative file, or null. */
function lastCommitDate(relPath) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", relPath], {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

// `source` is the page file whose commit date drives lastmod.
// `source: null` means "use the build date" (indexes that change with content).
const staticPages = [
  { url: "/",                    priority: "1.0", changefreq: "weekly",  source: "src/pages/Home.tsx" },
  { url: "/pricing",             priority: "0.9", changefreq: "monthly", source: "src/pages/Pricing.tsx" },
  { url: "/blog",                priority: "0.8", changefreq: "daily",   source: null },
  { url: "/direct-hire",         priority: "0.9", changefreq: "monthly", source: "src/pages/DirectHire.tsx" },
  { url: "/contractor-staffing", priority: "0.9", changefreq: "monthly", source: "src/pages/ContractorStaffing.tsx" },
  { url: "/executive-mapping",   priority: "0.9", changefreq: "monthly", source: "src/pages/ExecutiveMapping.tsx" },
  { url: "/hire-in-brazil",      priority: "0.9", changefreq: "monthly", source: "src/pages/StartOperation.tsx" },
  { url: "/get-started",         priority: "0.8", changefreq: "monthly", source: "src/pages/GetStarted.tsx" },
  { url: "/ebook",               priority: "0.7", changefreq: "monthly", source: "src/pages/Ebook.tsx" },
  { url: "/privacy-policy",      priority: "0.3", changefreq: "yearly",  source: "src/pages/PrivacyPolicy.tsx" },
  { url: "/terms-of-service",    priority: "0.3", changefreq: "yearly",  source: "src/pages/TermsOfService.tsx" },
];

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));

const urls = [
  ...staticPages.map(p => ({
    loc: `${BASE_URL}${p.url}`,
    lastmod: (p.source && lastCommitDate(p.source)) || today,
    changefreq: p.changefreq,
    priority: p.priority,
  })),
  ...posts.map(p => ({
    loc: `${BASE_URL}/blog/${p.slug}`,
    // An edited post is a changed page: dateModified wins over the original
    // publication date when the post carries one.
    lastmod: p.dateModified || p.date || today,
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(OUT_FILE, xml, "utf-8");
console.log(`✅ sitemap.xml generated — ${urls.length} URLs`);
