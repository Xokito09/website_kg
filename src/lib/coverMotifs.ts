/**
 * WP-B3b — closed list of automatic cover illustration types ("motifs").
 *
 * Single source of truth: BlogCover.motif (src/types/blog.ts), the SVG picker
 * (components/blog/CoverArt.tsx) and the .post.json reader
 * (scripts/blog-post-parts.mjs) all read this list so the six types never
 * drift out of sync. Node (v22.6+/24) strips this file's type-only syntax at
 * import time, so the plain-JS build script can `import` it directly with no
 * new dependency and no build step.
 *
 * Missing or unknown motif -> DEFAULT_COVER_MOTIF ("guide"), per spec 13 §9
 * risk 3 ("o molde tem que aceitar post sem... capa; usa a capa automática
 * pelo título").
 */

export const COVER_MOTIFS = [
  "comparison",
  "list",
  "cost",
  "guide",
  "map",
  "news",
] as const;

export type CoverMotif = (typeof COVER_MOTIFS)[number];

export const DEFAULT_COVER_MOTIF: CoverMotif = "guide";

export function isCoverMotif(value: unknown): value is CoverMotif {
  return typeof value === "string" && (COVER_MOTIFS as readonly string[]).includes(value);
}

/** Normalizes any input to a valid CoverMotif, falling back to the default. */
export function toCoverMotif(value: unknown): CoverMotif {
  return isCoverMotif(value) ? value : DEFAULT_COVER_MOTIF;
}

/** English, one line per motif — used as the cover's aria-label. */
export const COVER_MOTIF_LABELS: Record<CoverMotif, string> = {
  comparison: "five profiles compared side by side, one highlighted",
  list: "a numbered ranking of three to five lines, one highlighted",
  cost: "two bars comparing cost and salary, with a dollar sign",
  guide: "a step-by-step path of connected stages, the last one marked done",
  map: "two points, the US and Brazil, linked by an arc, with a clock",
  news: "a document with an alert seal marking a rule change or news",
};
