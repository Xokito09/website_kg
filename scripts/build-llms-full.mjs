/**
 * Generates public/llms-full.txt from content/llms-full-core.md + blog-posts.json.
 *
 * Why: llms-full.txt used to be fully hand-maintained and went stale the moment
 * a blog post shipped (it was still saying "Generated 2026-05-20" in July). The
 * hand-written company/services/FAQ copy stays human-owned in
 * content/llms-full-core.md; this script only stamps the generation date and
 * rebuilds the blog index from src/data/blog-posts.json, so the file is fresh
 * on every build with zero manual upkeep.
 *
 * Runs automatically before every build (see "prebuild" in package.json).
 * Also run manually: npm run build-llms-full
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { htmlToText, truncate } from "./text-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://kaptasglobal.io";
const CORE_FILE = path.join(__dirname, "../content/llms-full-core.md");
const POSTS_FILE = path.join(__dirname, "../src/data/blog-posts.json");
const OUT_FILE = path.join(__dirname, "../public/llms-full.txt");

const core = fs.readFileSync(CORE_FILE, "utf-8");
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));

const index = [...posts]
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
  .map((p) => {
    const abstract = truncate(htmlToText(p.excerpt || p.content || ""), 300);
    const dated = p.date ? ` (${p.date})` : "";
    return `- **[${htmlToText(p.title)}](${BASE_URL}/blog/${p.slug})**${dated}: ${abstract}`;
  })
  .join("\n");

const today = new Date().toISOString().slice(0, 10);
const output = core
  .replace("{{GENERATED_DATE}}", today)
  .replace("{{BLOG_INDEX}}", index);

if (output.includes("{{")) {
  throw new Error("llms-full: unreplaced template placeholder — check content/llms-full-core.md");
}

fs.writeFileSync(OUT_FILE, output, "utf-8");
console.log(`✅ llms-full.txt generated — ${posts.length} blog posts indexed, dated ${today}`);
