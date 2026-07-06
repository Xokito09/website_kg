/**
 * Generates public/rss.xml — a real RSS 2.0 feed for the blog.
 *
 * Why: /feed and /rss previously just 301'd to /blog (WordPress-era cleanup),
 * which threw away a discovery surface. A real feed lets crawlers, aggregators,
 * and AI systems detect new posts the moment they ship instead of waiting for
 * a sitemap recrawl. The vercel.json feed redirects now point here.
 *
 * Runs automatically before every build (see "prebuild" in package.json).
 * Also run manually: npm run build-rss
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { htmlToText, truncate, escapeXml } from "./text-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://kaptasglobal.io";
const POSTS_FILE = path.join(__dirname, "../src/data/blog-posts.json");
const OUT_FILE = path.join(__dirname, "../public/rss.xml");

const posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));

// Noon UTC keeps the calendar date stable in every timezone a reader renders it in.
const toPubDate = (isoDate) => new Date(`${isoDate}T12:00:00Z`).toUTCString();

const items = [...posts]
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
  .map((p) => {
    const url = `${BASE_URL}/blog/${p.slug}`;
    const description = truncate(htmlToText(p.excerpt || p.content || ""), 400);
    return `    <item>
      <title>${escapeXml(htmlToText(p.title))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toPubDate(p.date)}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kaptas Global Blog</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Guides on hiring senior remote engineering talent in Brazil: salaries, hiring models (CLT, PJ, EOR), compliance, and building US-Brazil remote teams.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(OUT_FILE, xml, "utf-8");
console.log(`✅ rss.xml generated — ${posts.length} items`);
