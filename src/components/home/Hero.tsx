import { ArrowRight, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, lazy, Suspense } from "react";
import { staggerContainer, staggerItem } from "./animations";

// Lazy: pulls react-simple-maps + d3 out of the critical bundle. The map is
// a decorative background that already appeared late (its TopoJSON is
// fetched at runtime), so deferring the JS does not change the experience.
const TechMapBackground = lazy(() =>
  import("../TechMapBackground").then((m) => ({ default: m.TechMapBackground }))
);

const words = ["Talent", "Developers", "Executives", "AI Engineers", "for Sales", "for Marketing", "QA Engineers"];

// Componente da seção Hero (Principal)
export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" as any }}
      className="relative pt-12 lg:pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full min-h-[75vh] flex items-center"
    >
      <Suspense fallback={null}>
        <TechMapBackground />
      </Suspense>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_top_right,_#0047FF33,transparent_80%)] blur-[120px] pointer-events-none"></div>
      <div className="max-w-3xl lg:max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          <span className="md:whitespace-nowrap flex flex-wrap items-center gap-x-3">
            Hire 
            <span className="inline-grid overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="col-start-1 row-start-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-bold leading-tight"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
            in Brazil
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-light">
          Reduce your engineering burn by 60% and keep shipping with senior talent in your timezone.
        </p>
        
        <div className="flex flex-col items-start gap-5 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="#lead-form"
              className="bg-kaptas-green text-kaptas-black px-5 py-2.5 rounded-lg border border-kaptas-green text-sm font-semibold hover:brightness-90 transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_var(--color-kaptas-green)] w-fit"
            >
              See how hiring in Brazil would work for your team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-2 bg-kaptas-green/10 border border-kaptas-green/30 text-kaptas-green px-3 py-1.5 rounded-sm text-sm font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              Zero cost to interview
            </div>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              You only pay when you successfully hire.
            </p>
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-8 sm:gap-16 mt-16 pt-10 border-t border-white/10"
        >
          <motion.div variants={staggerItem} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-kaptas-green backdrop-blur-sm">
              <TrendingDown className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-base text-white mb-0.5">50%+ Cost Reduction</h3>
              <p className="text-gray-400 text-sm">Compared to US engineering hires</p>
            </div>
          </motion.div>
          <motion.div variants={staggerItem} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-kaptas-purple backdrop-blur-sm">
              <Zap className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-base text-white mb-0.5">Real-time collaboration</h3>
              <p className="text-gray-400 text-sm">Full overlap with US time zones</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
