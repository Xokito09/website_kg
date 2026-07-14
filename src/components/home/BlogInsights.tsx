import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { fadeIn, staggerContainer, staggerItem } from "./animations";
import blogPosts from "../../data/blog-index.json";
import { formatDateShort } from "../../lib/utils";

const ACCENT_COLORS = ["kaptas-green", "kaptas-purple", "neon-blue"];

export function BlogInsights() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full pt-[100px] mb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-kaptas-purple"></div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Insights</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            The Brazil Playbook
          </h2>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Strategic insights on building, scaling, and managing tech teams in Brazil.
          </p>
        </div>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-kaptas-purple transition-colors group shrink-0">
          View all articles
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      >
        {latest.map((post, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
          const category = post.categories[0] || "Blog";
          const plainExcerpt = post.excerpt
            .replace(/<[^>]+>/g, "")
            .replace(/\[&hellip;\]|\[&#8230;\]/g, "…")
            .trim();

          return (
            <motion.div key={post.id} variants={staggerItem} className="group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/10] bg-[#111111] rounded-2xl mb-6 overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-colors">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br from-${color}/10 to-transparent flex items-center justify-center`}>
                      <span className="text-gray-600 font-mono text-sm">Kaptas Global</span>
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-mono text-${color} uppercase tracking-wider`}>{category}</span>
                  <span className="text-gray-600 text-xs">•</span>
                  <span className="text-gray-500 text-xs">{formatDateShort(post.date)}</span>
                </div>
                <h3
                  className={`text-xl font-semibold text-white mb-3 group-hover:text-${color} transition-colors`}
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {plainExcerpt}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
