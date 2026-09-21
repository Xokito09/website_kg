/**
 * WP-B3a/B3b demo helper — NOT part of the product pipeline, NOT committed with
 * real post data. Creates throwaway post(s) from the WP-B0 golden fixture so
 * the blog post molde (single ~820px column, key takeaways, FAQ, author,
 * related, structured data, WP-B3b: illustrated automatic cover) can be
 * reviewed against real, full-contract posts.
 *
 * Usage (from the site repo root, worktree kg-blog-molde):
 *   node scripts/blog-molde-demo.mjs           # 1 demo post (WP-B3a review)
 *   node scripts/blog-molde-demo.mjs --covers  # 6 demo posts, one per cover
 *                                               # motif (WP-B3b review)
 *   npm run dev                                # then open http://localhost:3000/blog/<slug>
 *   node scripts/blog-molde-demo.mjs --clean   # remove ALL demo files, restore
 *                                               # blog-posts.json + blog-index.json
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { COVER_MOTIFS } from "../src/lib/coverMotifs.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(REPO_ROOT, "content/blog");
const FIXTURE = path.join(__dirname, "fixtures/blog_golden_final.post.json");

const clean = process.argv.includes("--clean");
const covers = process.argv.includes("--covers");
const golden = JSON.parse(fs.readFileSync(FIXTURE, "utf-8"));

const SINGLE_SLUG = "molde-demo";
// One demo slug per motif, no featured_image, so PostCover always renders the
// illustrated cover (decision 2) for every one of the six closed types.
const COVER_SLUGS = COVER_MOTIFS.map((motif) => `molde-demo-cover-${motif}`);

function demoPaths(slug) {
  return {
    md: path.join(CONTENT_DIR, `${slug}.md`),
    postJson: path.join(CONTENT_DIR, `${slug}.post.json`),
  };
}

function removeDemo(slug) {
  const { md, postJson } = demoPaths(slug);
  for (const p of [md, postJson]) {
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`🧹 removed ${path.relative(REPO_ROOT, p)}`);
    }
  }
}

if (clean) {
  for (const slug of [SINGLE_SLUG, ...COVER_SLUGS]) removeDemo(slug);
  execSync("git checkout -- src/data/blog-posts.json src/data/blog-index.json", {
    cwd: REPO_ROOT,
    stdio: "inherit",
  });
  console.log("🧹 restored src/data/blog-posts.json + blog-index.json from git");
  process.exit(0);
}

function writeDemo(slug, overrides = {}) {
  const { md, postJson } = demoPaths(slug);
  const title = overrides.title ?? golden.title;
  // Frontmatter matches the demo slug (never the golden fixture's real slug)
  // so it never collides with the real post once it ships. featured_image
  // omitted on purpose — decision 2 needs `cover` to win with nothing to fall
  // back to.
  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, "'")}"`,
    `slug: ${slug}`,
    `date: "${golden.date}"`,
    `excerpt: "${golden.excerpt.replace(/"/g, "'")}"`,
    `categories: ["${golden.categories[0] || "Blog"}"]`,
    "---",
    "",
  ].join("\n");

  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(md, frontmatter + golden.body_md, "utf-8");

  const partsOverrides = overrides.cover ? { cover: overrides.cover } : {};
  fs.writeFileSync(postJson, JSON.stringify({ ...golden, ...partsOverrides, slug }, null, 2), "utf-8");
  console.log(`✅ wrote ${path.relative(REPO_ROOT, md)} + ${path.relative(REPO_ROOT, postJson)}`);
}

if (covers) {
  COVER_MOTIFS.forEach((motif, i) => {
    writeDemo(COVER_SLUGS[i], {
      title: `Cover demo: ${motif}`,
      cover: { eyebrow: `Demo — ${motif}`, title_short: `${motif} cover demo`, motif },
    });
  });
} else {
  writeDemo(SINGLE_SLUG);
}

execSync("node scripts/build-blog.mjs", { cwd: REPO_ROOT, stdio: "inherit" });
execSync("node scripts/build-blog-index.mjs", { cwd: REPO_ROOT, stdio: "inherit" });

if (covers) {
  console.log("\n👉 npm run dev, then open one per motif:");
  for (const slug of COVER_SLUGS) console.log(`   http://localhost:3000/blog/${slug}`);
  console.log("   card versions: http://localhost:3000/blog");
} else {
  console.log(`\n👉 npm run dev, then open http://localhost:3000/blog/${SINGLE_SLUG}`);
}
console.log("   when done: node scripts/blog-molde-demo.mjs --clean");
