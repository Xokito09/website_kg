import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
import { AEO_PARAGRAPHS } from "../data/aeoContent";
import blogPosts from "../data/blog-posts.json";
import { formatDateLong } from "../lib/utils";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": plainTitle,
    "description": plainExcerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "image": post.featured_image || "https://kaptasglobal.io/logo-branco.png",
    "author": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
    "publisher": { "@type": "Organization", "name": "Kaptas Global", "logo": { "@type": "ImageObject", "url": "https://kaptasglobal.io/logo-branco.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    "url": `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: plainTitle, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

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
        schemas={[organizationSchema, articleSchema, breadcrumbSchema]}
      />

      <AEOContent paragraph={aeoParagraph} label="Kaptas Global blog article overview" />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-36 px-6 md:px-12 max-w-4xl mx-auto w-full"
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

        {post.featured_image && (
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
            className="w-full rounded-2xl object-cover max-h-[480px] mb-12 border border-white/10"
          />
        )}
      </motion.section>

      {/* Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-6 md:px-12 max-w-4xl mx-auto w-full"
      >
        <article
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-kaptas-green prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:mb-2
            prose-img:rounded-xl prose-img:border prose-img:border-white/10
            prose-blockquote:border-l-kaptas-green prose-blockquote:text-gray-400
            prose-code:text-kaptas-green prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 max-w-4xl mx-auto w-full mt-20"
      >
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
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
