/**
 * Converts content/blog/*.md files into src/data/blog-posts.json
 * Runs automatically before every build (see "prebuild" in package.json)
 * Also run manually: npm run build-blog
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";
import { readPostParts, mergeParts } from "./blog-post-parts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../content/blog");
const OUT_FILE = path.join(__dirname, "../src/data/blog-posts.json");
const today = () => new Date().toISOString().slice(0, 10);

// Load existing migrated posts (from WordPress)
let existing = [];
if (fs.existsSync(OUT_FILE)) {
  existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf-8"));
}
const existingSlugs = new Set(existing.map((p) => p.slug));

// Read all .md files from content/blog/
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

if (files.length === 0) {
  console.log("📝 No markdown posts found in content/blog/ — nothing to add.");
  process.exit(0);
}

const newPosts = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  // Derive slug from filename if not set in frontmatter
  const slug = data.slug || file.replace(/\.md$/, "");

  // Contract v1 parts from content/blog/<slug>.post.json, if it ships one.
  // Throws (breaking the build) when the file exists but contract_version !== 1 —
  // see scripts/blog-post-parts.mjs.
  const parts = readPostParts(CONTENT_DIR, slug);

  if (existingSlugs.has(slug)) {
    // Update existing post content
    const idx = existing.findIndex((p) => p.slug === slug);
    const newContent = marked.parse(content);
    const contentChanged = existing[idx].content !== newContent;
    existing[idx] = mergeParts(
      {
        ...existing[idx],
        title: data.title || existing[idx].title,
        excerpt: data.excerpt || existing[idx].excerpt,
        date: data.date ? String(data.date).slice(0, 10) : existing[idx].date,
        categories: data.categories ? (Array.isArray(data.categories) ? data.categories : [data.categories]) : existing[idx].categories,
        featured_image: data.featured_image || existing[idx].featured_image,
        content: newContent,
        // Written SERP metadata. Falls back to whatever is already in the JSON, so
        // a markdown edit never silently wipes a meta written directly there.
        metaTitle: data.metaTitle ?? existing[idx].metaTitle ?? "",
        metaDescription: data.metaDescription ?? existing[idx].metaDescription ?? "",
      },
      parts,
      { dateModified: contentChanged ? today() : (existing[idx].dateModified ?? null) }
    );
    console.log(`✏️  Updated: ${slug}`);
  } else {
    // New post
    const postDate = data.date ? String(data.date).slice(0, 10) : today();
    newPosts.push(
      mergeParts(
        {
          id: Date.now() + Math.floor(Math.random() * 1000),
          slug,
          date: postDate,
          title: data.title || slug,
          excerpt: data.excerpt ? `<p>${data.excerpt}</p>` : `<p>${content.slice(0, 200)}...</p>`,
          content: marked.parse(content),
          featured_image: data.featured_image || "",
          categories: data.categories
            ? Array.isArray(data.categories) ? data.categories : [data.categories]
            : ["Blog"],
          // ALWAYS emit these two keys, even empty. blog-posts.json is imported as a
          // typed literal in BlogPost.tsx — an entry missing them makes the array a
          // union and `post.metaTitle` a compile error, so a new markdown post would
          // break the build. Empty string means "fall back to the derived title/meta".
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
        },
        parts,
        // New post: dateModified starts equal to date, per WP-B3a decision.
        { dateModified: postDate }
      )
    );
    console.log(`✅ Added: ${slug}`);
  }
}

// Merge and sort by date (newest first)
const merged = [...existing, ...newPosts].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

fs.writeFileSync(OUT_FILE, JSON.stringify(merged, null, 2), "utf-8");
console.log(`\n📚 blog-posts.json updated — ${merged.length} total posts.`);
