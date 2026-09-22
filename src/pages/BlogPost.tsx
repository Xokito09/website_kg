import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
import { AEO_PARAGRAPHS } from "../data/aeoContent";
import blogPostsRaw from "../data/blog-posts.json";
import { formatDateLong } from "../lib/utils";
import type { BlogPostData } from "../types/blog";
import { PostKeyTakeaways } from "../components/blog/PostKeyTakeaways";
import { PostFaq } from "../components/blog/PostFaq";
import { PostRelated } from "../components/blog/PostRelated";
import { PostAuthor } from "../components/blog/PostAuthor";
import { PostCover } from "../components/blog/PostCover";

// blog-posts.json mixes 22 old posts (no contract-v1 fields) with newer ones that
// do carry them (see src/types/blog.ts): the new fields are OPTIONAL on the type
// on purpose, so this cast never turns the array into a brittle union.
const blogPosts = blogPostsRaw as BlogPostData[];

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "...",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
};

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => NAMED_ENTITIES[name] ?? match);
}

function stripHtml(input: string): string {
  return decodeHtmlEntities(input.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const category = post.categories[0] || "Blog";
  const dateFormatted = formatDateLong(post.date);

  const plainTitle = stripHtml(post.title);
  const plainExcerpt = stripHtml(post.excerpt).replace(/\[\.\.\.\]$/, "").trim();

  // SERP metadata, written per post (blog-posts.json: metaTitle / metaDescription).
  // Both fall back to today's derived behaviour when empty, so the 22 posts that
  // have no written meta are untouched.
  //
  // metaTitle REPLACES the whole <title> — it is NOT suffixed with
  // " | Kaptas Global Blog". That suffix costs 23 characters, and Google truncates
  // around 60: a 54-char written title plus the suffix renders as 77 and the
  // differentiator gets cut, which is the exact failure this change exists to fix.
  const metaTitle = post.metaTitle?.trim() || `${plainTitle} | Kaptas Global Blog`;
  const metaDescription = post.metaDescription?.trim() || plainExcerpt.slice(0, 160);

  // AEO block for this post: lead with the article's own title + excerpt
  // (per-post context so the 22 posts don't all ship an identical sr-only
  // block), then the shared blog/company overview that gives answer engines
  // the Kaptas entity + contact context the article body lacks.
  const aeoParagraph =
    `${plainTitle} — a Kaptas Global blog article.${plainExcerpt ? ` ${plainExcerpt}` : ""} ` +
    AEO_PARAGRAPHS.blog;

  const keyTakeaways = post.keyTakeaways ?? [];
  const faqItems = post.faq ?? [];
  const relatedItems = post.related ?? [];
  const dateModified = post.dateModified || post.date;

  // Person when the post carries a contract-v1 author, Organization otherwise
  // (the 22 old posts, and any new one without an author block).
  const authorSchema = post.author
    ? { "@type": "Person", "name": post.author.name, "jobTitle": post.author.role, "description": post.author.bio }
    : { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": plainTitle,
    "description": plainExcerpt,
    "datePublished": post.date,
    "dateModified": dateModified,
    "image": post.featured_image || "https://kaptasglobal.io/logo-branco.png",
    "author": authorSchema,
    "publisher": { "@type": "Organization", "name": "Kaptas Global", "logo": { "@type": "ImageObject", "url": "https://kaptasglobal.io/logo-branco.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    "url": `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: plainTitle, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  const faqSchema = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      }
    : null;

  const itemListItems = post.listItems ?? [];
  const itemListSchema = itemListItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": itemListItems.map((name, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": name,
        })),
      }
    : null;

  const schemas = [organizationSchema, articleSchema, breadcrumbSchema, faqSchema, itemListSchema].filter(
    (schema): schema is NonNullable<typeof schema> => schema !== null
  );

  return (
    <div className="flex flex-col pb-24">
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={`https://kaptasglobal.io/blog/${post.slug}`}
        eyebrow="Blog"
        ogTitle={plainTitle}
        ogSubtitle={metaDescription.slice(0, 140)}
        ogType="article"
        preloadImage={post.featured_image || undefined}
        schemas={schemas}
      />

      <AEOContent paragraph={aeoParagraph} label="Kaptas Global blog article overview" />

      {/* Hero — single ~820px column, same side borders as content and CTA below */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-36 px-6 md:px-12 max-w-[916px] mx-auto w-full"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {category}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-500 font-mono">
            <Calendar className="w-3.5 h-3.5" /> {dateFormatted}
          </span>
        </div>

        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-8"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <PostKeyTakeaways items={keyTakeaways} />

        {post.cover ? (
          // WP-B3b: illustrated automatic cover (spec 13 §9) — takes priority
          // over featured_image per decision 2.
          <PostCover cover={post.cover} fallbackTitle={plainTitle} fallbackEyebrow={category} />
        ) : post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            // LCP optimization for blog post heroes — diagnosed 2026-05-22:
            // this image is the LCP element on every blog post. Without these
            // attributes the browser deferred the fetch until after CSS/JS
            // parsing (~520 ms load delay on mobile / Slow 4G). Paired with
            // the <link rel="preload"> in SEO.tsx (driven by preloadImage),
            // this brings the image to highest priority from the first byte.
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full rounded-2xl object-cover max-h-[480px] mt-10 mb-12 border border-white/10"
          />
        ) : (
          // Neither cover nor featured_image: automatic cover from the title
          // and the default motif (spec 13 §9 risk 3).
          <PostCover cover={null} fallbackTitle={plainTitle} fallbackEyebrow={category} />
        )}
      </motion.section>

      {/* Content — 18px body, justified + hyphenated from md up, tables scroll inside their own box */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-6 md:px-12 max-w-[916px] mx-auto w-full"
      >
        <article
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-[26px] prose-h2:mt-[68px] prose-h2:mb-[22px]
            prose-h3:text-xl prose-h3:mt-9 prose-h3:mb-[14px]
            prose-p:text-[18px] prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            md:prose-p:text-justify md:prose-p:[hyphens:auto]
            prose-a:text-kaptas-green prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-[18px]
            prose-li:mb-2
            prose-img:rounded-xl prose-img:border prose-img:border-white/10
            prose-blockquote:border-l-kaptas-green prose-blockquote:text-gray-400
            prose-code:text-kaptas-green prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-table:block prose-table:overflow-x-auto prose-table:border prose-table:border-white/10 prose-table:rounded-xl
            prose-th:px-4 prose-td:px-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <PostFaq items={faqItems} />
        <PostAuthor author={post.author as NonNullable<typeof post.author>} />
      </motion.section>

      {/* Related reading + bottom CTA — same ~820px column, no source table, no competitor links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 max-w-[916px] mx-auto w-full mt-20"
      >
        <PostRelated items={relatedItems} />

        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Ready to hire in Brazil?</h3>
            <p className="text-gray-400 text-sm">Pre-vetted shortlist in 5 days. Zero upfront cost.</p>
          </div>
          <Link
            to="/get-started"
            className="bg-kaptas-green text-kaptas-black px-8 py-3 rounded-full font-semibold text-sm hover:brightness-90 transition-all whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
