import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { readPostParts, mergeParts, emptyParts } from "./blog-post-parts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.join(__dirname, "fixtures");
const GOLDEN_SLUG = "blog_golden_final";

test("readPostParts returns null when there is no .post.json", () => {
  const parts = readPostParts(FIXTURES_DIR, "no-such-slug");
  assert.equal(parts, null);
});

test("mergeParts fills every new field empty when there is no .post.json", () => {
  const basePost = { id: 1, slug: "old-post", date: "2026-01-01", title: "Old" };
  const merged = mergeParts(basePost, null);

  assert.deepEqual(merged.faq, []);
  assert.deepEqual(merged.related, []);
  assert.equal(merged.author, null);
  assert.deepEqual(merged.keyTakeaways, []);
  assert.deepEqual(merged.listItems, []);
  assert.equal(merged.cover, null);
  assert.equal(merged.readingTimeMin, null);
  assert.equal(merged.contractVersion, null);
  // base fields survive untouched
  assert.equal(merged.title, "Old");
});

test("readPostParts throws when contract_version is not 1", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-post-parts-"));
  fs.writeFileSync(
    path.join(tmpDir, "bad-contract.post.json"),
    JSON.stringify({ contract_version: 2, faq: [] }),
    "utf-8"
  );
  assert.throws(() => readPostParts(tmpDir, "bad-contract"), /contract_version/);
});

test("readPostParts reads the WP-B0 golden fixture and converts faq intact", () => {
  const parts = readPostParts(FIXTURES_DIR, GOLDEN_SLUG);
  assert.ok(parts, "expected parts to be read from the golden fixture");

  const rawGolden = JSON.parse(
    fs.readFileSync(path.join(FIXTURES_DIR, `${GOLDEN_SLUG}.post.json`), "utf-8")
  );

  assert.deepEqual(parts.faq, rawGolden.faq);
  assert.equal(parts.faq[0].q, rawGolden.faq[0].q);
  assert.equal(parts.faq[0].a, rawGolden.faq[0].a);
  assert.deepEqual(parts.related, rawGolden.related);
  assert.deepEqual(parts.author, rawGolden.author);
  assert.deepEqual(parts.cover, rawGolden.cover);
  assert.deepEqual(parts.keyTakeaways, rawGolden.key_takeaways);
  assert.deepEqual(parts.listItems, rawGolden.list_items);
  assert.equal(parts.readingTimeMin, rawGolden.reading_time_min);
  assert.equal(parts.contractVersion, 1);
});

test("mergeParts carries the golden fixture parts onto a base post", () => {
  const parts = readPostParts(FIXTURES_DIR, GOLDEN_SLUG);
  const basePost = { id: 99, slug: "5-best-tech-recruitment-agencies-brazil-2026", date: "2026-09-17" };
  const merged = mergeParts(basePost, parts, { dateModified: "2026-09-17" });

  assert.equal(merged.faq.length, 4);
  assert.equal(merged.author.name, "Rodolfo Chaves");
  assert.equal(merged.dateModified, "2026-09-17");
  assert.equal(merged.contractVersion, 1);
});

test("readPostParts keeps a valid cover.motif as-is", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-post-parts-"));
  fs.writeFileSync(
    path.join(tmpDir, "with-cover.post.json"),
    JSON.stringify({ contract_version: 1, cover: { eyebrow: "E", title_short: "T", motif: "map" } }),
    "utf-8"
  );
  const parts = readPostParts(tmpDir, "with-cover");
  assert.deepEqual(parts.cover, { eyebrow: "E", title_short: "T", motif: "map" });
});

test("readPostParts falls back an unknown cover.motif to guide, never throws", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-post-parts-"));
  fs.writeFileSync(
    path.join(tmpDir, "bad-motif.post.json"),
    JSON.stringify({ contract_version: 1, cover: { eyebrow: "E", title_short: "T", motif: "not-a-real-type" } }),
    "utf-8"
  );
  const parts = readPostParts(tmpDir, "bad-motif");
  assert.equal(parts.cover.motif, "guide");
});

test("readPostParts leaves cover null when the post has none", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-post-parts-"));
  fs.writeFileSync(
    path.join(tmpDir, "no-cover.post.json"),
    JSON.stringify({ contract_version: 1 }),
    "utf-8"
  );
  const parts = readPostParts(tmpDir, "no-cover");
  assert.equal(parts.cover, null);
});

test("emptyParts matches the shape mergeParts falls back to", () => {
  const merged = mergeParts({ id: 1 }, null);
  const empty = emptyParts();
  assert.deepEqual(merged.faq, empty.faq);
  assert.deepEqual(merged.related, empty.related);
  assert.equal(merged.author, empty.author);
});
