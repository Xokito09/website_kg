/**
 * Emit src/data/blog-index.json — blog-posts.json minus the `content` field.
 *
 * Why: blog-posts.json is 251KB and 92% of it is post content. It was
 * imported by BlogInsights (rendered on the HOMEPAGE) and Blog (listing),
 * which pulled the entire blog corpus into the main JS bundle for every
 * visitor. Listings only need metadata; only BlogPost needs content, and
 * route-splitting confines that import to the BlogPost chunk.
 *
 * Runs in prebuild after build-blog.mjs; output is committed so local dev
 * works without running the chain.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function buildIndex(posts) {
  return posts.map(({ content, ...meta }) => meta);
}

// Only execute when run directly (not when imported by the test).
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const SRC = path.join(__dirname, "../src/data/blog-posts.json");
  const OUT = path.join(__dirname, "../src/data/blog-index.json");
  const posts = JSON.parse(await fs.readFile(SRC, "utf-8"));
  const index = buildIndex(posts);
  await fs.writeFile(OUT, JSON.stringify(index, null, 2), "utf-8");
  console.log(
    `✅ blog-index.json: ${index.length} posts, ` +
    `${(JSON.stringify(index).length / 1024).toFixed(1)}KB ` +
    `(full corpus: ${(JSON.stringify(posts).length / 1024).toFixed(1)}KB)`
  );
}
