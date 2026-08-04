import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
import { AEO_PARAGRAPHS } from "../data/aeoContent";
import blogPosts from "../data/blog-index.json";
import { formatDateShort } from "../lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as any },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Hiring Strategy": "kaptas-green",
  "Market Insights": "kaptas-purple",
  "Compliance": "blue-500",
  "Team Building": "orange-500",
  "Salary & Costs": "yellow-400",
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] || "kaptas-green";
}

export default function Blog() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Blog — Kaptas Global | Insights on Hiring in Brazil & Latin America"
        description="Actionable advice for startup founders and engineering leaders hiring in Brazil. Salary guides, hiring models, market insights, and compliance tips."
        keywords="hiring in brazil blog, nearshore hiring insights, brazil developer salary, latam hiring guide, kaptas global blog"
        canonical="https://kaptasglobal.io/blog"
        eyebrow="Blog"
        ogTitle="Insights on Hiring in Brazil & LatAm"
        ogSubtitle="Salary guides, hiring models, market insights, compliance tips. For founders and engineering leaders."
        schemas={[
          organizationSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Blog", url: `${SITE_URL}/blog` },
          ]),
        ]}
      />
      <AEOContent paragraph={AEO_PARAGRAPHS.blog} label="Kaptas Global blog overview" />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" as any }}
        className="pt-32 lg:pt-48 px-6 md:px-12 max-w-7xl mx-auto w-full text-center relative"
      >
        <h1 className="-mt-[100px] text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto text-white">
          Insights on hiring <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-yellow-400">
            in Brazil
          </span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400 max-w-2xl mx-auto mb-4">
          Actionable advice for startup founders and engineering leaders.
        </p>
        <p className="text-sm text-gray-500 font-mono">{posts.length} articles</p>
      </motion.section>

      {/* Blog Grid */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="-mt-[70px] px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const category = post.categories[0] || "Blog";
            const color = getCategoryColor(category);
            const plainExcerpt = post.excerpt
              .replace(/<[^>]+>/g, "")
              .replace(/\[&hellip;\]|\[&#8230;\]/g, "…")
              .trim();
            const dateFormatted = formatDateShort(post.date);

            return (
              <motion.article
                key={post.id}
                variants={staggerItem}
                className="group relative bg-[#0A0A0A] border border-white/10 hover:border-white/30 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500"
              >
                {post.featured_image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500 font-mono">{dateFormatted}</span>
                  </div>
                  <h2
                    className="text-xl font-semibold mb-4 text-white group-hover:text-kaptas-green transition-colors duration-300 leading-snug"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <p className="text-gray-400 mb-8 flex-1 leading-relaxed text-sm line-clamp-3">
                    {plainExcerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center text-sm font-medium text-white group-hover:text-kaptas-green transition-colors mt-auto"
                  >
                    Read article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* Newsletter CTA */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-kaptas-green/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative bg-[#0A0A0A] rounded-[2rem] p-10 md:p-16 border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none"></div>
          {/* Was a newsletter signup. Removed 2026-08-04: there is no newsletter
              — the form only emailed Rodolfo via Web3Forms, and "Join 2,000+
              founders" promised a subscription nothing delivered. It was also
              permanently unsubmittable (useContactForm requires `name`; the form
              was email-only, so every submit died on "Please fill in your name
              and email."). Replaced with the same end-of-post CTA already used in
              BlogPost.tsx, which points at the working /get-started form. */}
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
              Ready to hire in Brazil?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Pre-vetted shortlist in 5 days. Zero upfront cost.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto shrink-0">
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-kaptas-green text-kaptas-black px-8 py-3.5 rounded-full font-semibold text-sm hover:brightness-90 transition-all whitespace-nowrap group"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
    </>
  );
}
