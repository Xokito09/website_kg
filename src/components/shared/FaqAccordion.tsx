import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

export interface FaqAccordionItem {
  q: string;
  a: string;
}

/**
 * Shared FAQ accordion markup — extracted from PricingFAQ (WP-B3a) so the
 * blog post page can reuse the exact same visual without duplicating it.
 * PricingFAQ keeps its own heading/intro/section wrapper and just renders
 * this for the list; the markup and classes below are unchanged from the
 * original PricingFAQ implementation.
 */
export function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
            >
              <span className="text-lg font-medium text-white group-hover:text-kaptas-green transition-colors pr-8">
                {faq.q}
              </span>
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-kaptas-green group-hover:bg-kaptas-green/10 transition-all">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed text-base" data-speakable="true">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
