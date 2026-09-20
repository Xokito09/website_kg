/**
 * WP-B3a demo helper — NOT part of the product pipeline, NOT committed with real
 * post data. Creates a throwaway post (content/blog/molde-demo.md +
 * content/blog/molde-demo.post.json) from the WP-B0 golden fixture so the new
 * blog post molde (single ~820px column, key takeaways, FAQ, author, related,
 * structured data) can be reviewed against a real, full-contract post.
 *
 * Usage (from the site repo root, worktree kg-blog-molde):
 *   node scripts/blog-molde-demo.mjs           # create the demo post + rebuild blog-posts.json
 *   npm run dev                                # open http://localhost:3000/blog/5-best-tech-recruitment-agencies-brazil-2026
 *   node scripts/blog-molde-demo.mjs --clean   # remove the demo files, restore blog-posts.json
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(REPO_ROOT, "content/blog");
const FIXTURE = path.join(__dirname, "fixtures/blog_golden_final.post.json");
const OUT_FILE = path.join(REPO_ROOT, "src/data/blog-posts.json");

const clean = process.argv.includes("--clean");
const golden = JSON.parse(fs.readFileSync(FIXTURE, "utf-8"));
const DEMO_SLUG = "molde-demo";
const mdPath = path.join(CONTENT_DIR, `${DEMO_SLUG}.md`);
const postJsonPath = path.join(CONTENT_DIR, `${DEMO_SLUG}.post.json`);

if (clean) {
  for (const p of [mdPath, postJsonPath]) {
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`🧹 removed ${path.relative(REPO_ROOT, p)}`);
    }
  }
  execSync("git checkout -- src/data/blog-posts.json", { cwd: REPO_ROOT, stdio: "inherit" });
  console.log("🧹 restored src/data/blog-posts.json from git");
  process.exit(0);
}

// Frontmatter matches the demo slug (not the golden fixture's real slug) so it
// never collides with the real post once it ships.
const frontmatter = [
  "---",
  `title: "${golden.title.replace(/"/g, "'")}"`,
  `slug: ${DEMO_SLUG}`,
  `date: "${golden.date}"`,
  `excerpt: "${golden.excerpt.replace(/"/g, "'")}"`,
  `categories: ["${golden.categories[0] || "Blog"}"]`,
  "---",
  "",
].join("\n");

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.writeFileSync(mdPath, frontmatter + golden.body_md, "utf-8");

// .post.json ships the contract-v1 parts alongside the .md, keyed to the same
// demo slug — this is what readPostParts (scripts/blog-post-parts.mjs) reads.
fs.writeFileSync(postJsonPath, JSON.stringify({ ...golden, slug: DEMO_SLUG }, null, 2), "utf-8");
console.log(`✅ wrote ${path.relative(REPO_ROOT, mdPath)} + ${path.relative(REPO_ROOT, postJsonPath)}`);

execSync("node scripts/build-blog.mjs", { cwd: REPO_ROOT, stdio: "inherit" });
console.log(`\n👉 npm run dev, then open http://localhost:3000/blog/${DEMO_SLUG}`);
console.log("   when done: node scripts/blog-molde-demo.mjs --clean");
