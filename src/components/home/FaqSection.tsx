import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fadeIn } from "./animations";
import { SHORTLIST, TIME_TO_HIRE_WINDOW } from "../../data/claims";

// Componente de FAQ
export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do you vet candidates?",
      answer: "We run a rigorous 4-step process: initial screening, cultural fit assessment, technical validation (often involving live coding or take-home assignments tailored to your stack), and English proficiency testing. We only present candidates who pass all stages."
    },
    {
      question: "What is the typical time-to-hire?",
      answer: `Our typical time-to-hire is ${TIME_TO_HIRE_WINDOW} from the kickoff call to the accepted offer, with ${SHORTLIST}. We maintain an active network of passive candidates, allowing us to move much faster than traditional recruiting methods.`
    },
    {
      question: "Do you handle payroll and compliance?",
      answer: "Yes. Depending on the model you choose (Staffing/EOR), we can handle all local compliance, payroll, benefits administration, and taxes, allowing you to focus purely on managing the talent."
    },
    {
      question: "What happens if a hire doesn't work out?",
      answer: "We offer a 90-day replacement guarantee. If the candidate is not a fit within the first three months, we will run a new search and replace them at no additional cost."
    },
    {
      question: "Are the engineers fluent in English?",
      answer: "Absolutely. We only work with candidates who have advanced or fluent English proficiency, ensuring seamless communication with your US-based team."
    }
  ];

  return (
    <motion.section {...fadeIn} className="px-6 md:px-12 max-w-3xl mx-auto w-full mb-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400">Everything you need to know about hiring with Kaptas Global.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
              openFaq === i ? 'bg-[#111111] border-white/20' : 'bg-transparent border-white/5 hover:border-white/10'
            }`}
          >
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={`font-medium transition-colors ${openFaq === i ? 'text-white' : 'text-gray-300'}`}>
                {faq.question}
              </span>
              <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                openFaq === i ? 'bg-white/10 text-white' : 'bg-transparent text-gray-500'
              }`}>
                {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
