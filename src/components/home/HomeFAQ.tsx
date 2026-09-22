import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FaqAnswer } from "../shared/FaqAnswer";
import { HOME_FAQS } from "../../data/faqs";

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about partnering with Kaptas Global.</p>
        </div>
        
        <div className="space-y-4">
          {HOME_FAQS.map((faq, index) => {
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
                {/* Always in the DOM, collapsed with max-height instead of being
                    unmounted. Conditional mounting meant the prerendered HTML carried the
                    questions and the FAQPage JSON-LD but none of the answer text: a
                    crawler that does not run JS saw structured data with nothing behind
                    it. The collapse is pure CSS, so there is no inline style for the
                    prerender postprocess to strip and no opacity:0 for its hidden-content
                    guard to flag. max-height, not the grid 0fr/1fr trick: Chrome does not
                    interpolate fr tracks here, so the panel stayed at 0 when opened. The
                    1000px cap is comfortably above the tallest answer. */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOpen ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed text-base" data-speakable="true">
                    <FaqAnswer text={faq.a} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
