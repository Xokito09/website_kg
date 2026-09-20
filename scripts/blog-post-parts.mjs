/**
 * Pure functions for the WP-B0 -> WP-B3a contract: reads content/blog/<slug>.post.json
 * (contract v1, snake_case) and merges its fields into a blog-posts.json entry
 * (camelCase). Extracted out of build-blog.mjs so the logic is testable without
 * touching the filesystem beyond a single readFileSync.
 *
 * Contract: content/blog/<slug>.post.json ships alongside <slug>.md and carries a
 * top-level `contract_version` key together with the parts (title, faq, author, ...).
 * `blog_post.schema.json` itself does not require `contract_version` as an instance
 * property (it is metadata ON the schema file, not IN the post) — the Python side
 * writes `contract_version: 1` at the top of the .post.json regardless, and the site
 * enforces it here so a new/renamed field never silently disappears from a post.
 */

import fs from "fs";
import path from "path";

/** Empty shape for every new (optional) field, used when there is no .post.json. */
export function emptyParts() {
  return {
    faq: [],
    related: [],
    author: null,
    keyTakeaways: [],
    listItems: [],
    cover: null,
    readingTimeMin: null,
    contractVersion: null,
  };
}

/**
 * Reads content/blog/<slug>.post.json if it exists and converts it to the
 * camelCase shape used on the site. Returns null when the file does not exist
 * (caller then falls back to emptyParts()). Throws when contract_version is not 1
 * — on purpose: a silent skip here would mean a new contract field ships to no
 * post at all with no error anywhere.
 */
export function readPostParts(contentDir, slug) {
  const partsPath = path.join(contentDir, `${slug}.post.json`);
  if (!fs.existsSync(partsPath)) {
    return null;
  }

  const raw = JSON.parse(fs.readFileSync(partsPath, "utf-8"));

  if (raw.contract_version !== 1) {
    throw new Error(
      `${slug}.post.json: expected contract_version 1, got ${JSON.stringify(raw.contract_version)}. ` +
        `Fix the writer or bump this reader — a silently-ignored contract change is worse than a broken build.`
    );
  }

  return {
    faq: Array.isArray(raw.faq) ? raw.faq : [],
    related: Array.isArray(raw.related) ? raw.related : [],
    author: raw.author ?? null,
    keyTakeaways: Array.isArray(raw.key_takeaways) ? raw.key_takeaways : [],
    listItems: Array.isArray(raw.list_items) ? raw.list_items : [],
    cover: raw.cover ?? null,
    readingTimeMin: typeof raw.reading_time_min === "number" ? raw.reading_time_min : null,
    contractVersion: raw.contract_version,
  };
}

/**
 * Merges `parts` (from readPostParts, or null) onto `basePost`. Always sets every
 * new field explicitly — [] / null, never "leave whatever was there" — because the
 * orchestrator decision is: no .post.json this run means empty new fields, for a
 * brand new post AND for an update of an existing one alike.
 *
 * `dateModified` is passed in separately because it depends on build-time context
 * (is this post new, did the rendered content actually change) that this module
 * has no business knowing about.
 */
export function mergeParts(basePost, parts, { dateModified = null } = {}) {
  const p = parts ?? emptyParts();
  return {
    ...basePost,
    faq: p.faq,
    related: p.related,
    author: p.author,
    keyTakeaways: p.keyTakeaways,
    listItems: p.listItems,
    cover: p.cover,
    readingTimeMin: p.readingTimeMin,
    contractVersion: p.contractVersion,
    dateModified,
  };
}
