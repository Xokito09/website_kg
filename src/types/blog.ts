/**
 * Blog post data shape — WP-B3a.
 *
 * The 22 migrated posts only ever had the "current" fields below. New posts
 * (and edited old ones) can now also carry the WP-B0 contract v1 fields,
 * written by scripts/blog-post-parts.mjs from content/blog/<slug>.post.json.
 * Those fields are OPTIONAL on the type on purpose: a field present on one
 * post and absent on another must stay a valid shape, not a compile error
 * (see the comment in scripts/build-blog.mjs this replaces).
 */

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogRelated {
  title: string;
  url: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  bio: string;
}

import type { CoverMotif } from "../lib/coverMotifs";

export interface BlogCover {
  eyebrow: string;
  title_short: string;
  motif: CoverMotif;
}

export interface BlogPostData {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  categories: string[];
  metaTitle: string;
  metaDescription: string;

  // New, optional — contract v1 (blog_post.schema.json), snake_case -> camelCase.
  faq?: BlogFaqItem[];
  related?: BlogRelated[];
  author?: BlogAuthor | null;
  keyTakeaways?: string[];
  listItems?: string[];
  cover?: BlogCover | null;
  readingTimeMin?: number | null;
  dateModified?: string | null;
  contractVersion?: number | null;
}
