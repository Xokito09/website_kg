import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIndex } from "./build-blog-index.mjs";

test("index strips content and keeps all metadata fields in order", () => {
  const posts = [
    { id: 1, slug: "a", date: "2026-01-01", title: "T", excerpt: "E", content: "<p>huge</p>", featured_image: "/x.webp", categories: ["c"] },
  ];
  const index = buildIndex(posts);
  assert.equal(index.length, 1);
  assert.deepEqual(index[0], { id: 1, slug: "a", date: "2026-01-01", title: "T", excerpt: "E", featured_image: "/x.webp", categories: ["c"] });
  assert.equal("content" in index[0], false);
});
