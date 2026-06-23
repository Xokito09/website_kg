/**
 * Generates public/sitemap.xml from static routes + blog posts.
 * Runs automatically before every build (see "prebuild" in package.json).
 * Also run manually: npm run build-sitemap
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://kaptasglobal.io";
const OUT_FILE = path.join(__dirname, "../public/sitemap.xml");
const POSTS_FILE = path.join(__dirname, "../src/data/blog-posts.json");

const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { url: "/",                    priority: "1.0", changefreq: "weekly"  },
  { url: "/pricing",             priority: "0.9", changefreq: "monthly" },
  { url: "/blog",                priority: "0.8", changefreq: "daily"   },
  { url: "/direct-hire",         priority: "0.9", changefreq: "monthly" },
  { url: "/contractor-staffing", priority: "0.9", changefreq: "monthly" },
  { url: "/executive-mapping",   priority: "0.9", changefreq: "monthly" },
  { url: "/hire-in-brazil",      priority: "0.9", changefreq: "monthly" },
  { url: "/get-started",         priority: "0.8", changefreq: "monthly" },
  { url: "/ebook",               priority: "0.7", changefreq: "monthly" },
  { url: "/privacy-policy",      priority: "0.3", changefreq: "yearly"  },
  { url: "/terms-of-service",    priority: "0.3", changefreq: "yearly"  },
];

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));

const urls = [
  ...staticPages.map(p => ({
    loc: `${BASE_URL}${p.url}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
  })),
  ...posts.map(p => ({
    loc: `${BASE_URL}/blog/${p.slug}`,
    lastmod: p.date || today,
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
