/**
 * Shared plain-text helpers for the build scripts that consume
 * src/data/blog-posts.json (whose excerpt/content fields are HTML
 * exported from the old WordPress site).
 */

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
};

export function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

/** HTML → single-line plain text (tags stripped, entities decoded, whitespace collapsed). */
export function htmlToText(html) {
  return decodeEntities(
    String(html)
      .replace(/<[^>]*>/g, " ")
      // WordPress export artifact: literal "[&hellip;]" read-more marker
      .replace(/\[…\]|\[&hellip;\]/g, "…"),
  )
    .replace(/\[…\]/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate on a word boundary, appending … when cut. */
export function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Escape the five XML special characters (for RSS element content). */
export function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
