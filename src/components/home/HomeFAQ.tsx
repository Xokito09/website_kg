import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { ENTITY_FAQ } from "../../data/entityFaq";

const faqs = [
  {
    q: "What services does Kaptas Global offer?",
    a: "Kaptas Global offers four hiring services for companies building teams with Brazilian professionals. Direct Hire places full-time employees for a one-time fee of 18% of first-year salary, with no retainer or deposit. Outsourcing & Staffing provides dedicated professionals at a flat monthly cost that covers the professional's compensation, Kaptas Global's management fee, and ongoing HR support in a single invoice. Executive Mapping delivers a research-backed report with candidate profiles, compensation benchmarks, and competitor analysis within 10 to 15 business days. Hire in Brazil is a custom engagement for companies entering the Brazilian market for the first time, covering hiring-model consulting (CLT, PJ, or EOR), market intelligence, and end-to-end recruitment."
  },
  {
    q: "Is there any upfront cost to work with Kaptas Global?",
    a: "No. For Direct Hire, there is no retainer and no deposit. You pay only after the professional is hired and starts working. For Outsourcing & Staffing, billing begins only when the professional is active on your team. Executive Mapping and Hire in Brazil are scoped as custom projects with fees agreed before work begins, but no speculative charges. Kaptas Global operates on a performance-based model across all services."
  },
  {
    q: "How much does it cost to hire a Brazilian professional?",
    a: "It depends on the model. Direct Hire is 18% of the professional's first-year salary, paid once. Outsourcing & Staffing is a flat monthly cost per professional (for reference, a Senior Full-Stack Engineer typically ranges from $4,000 to $6,000/month fully loaded). Companies typically save up to 60% compared to equivalent US-based hires. Kaptas Global provides role-specific cost projections before the search begins so you can plan budgets with precision, not generic estimates."
  },
  {
    q: "How quickly can Kaptas Global deliver candidates?",
    a: "For Direct Hire and Outsourcing & Staffing, Kaptas Global delivers a shortlist of pre-vetted, headhunted candidates within 5 business days of the intake call. The full placement cycle, from kickoff to hire, typically takes 2 to 4 weeks depending on role complexity. Executive Mapping reports are delivered in 10 to 15 business days. For Hire in Brazil (market entry), the full cycle from market analysis to first placement takes 3 to 6 weeks."
  },
  {
    q: "What happens if a hire does not work out?",
    a: "Kaptas Global includes a replacement guarantee on every placement. For Direct Hire, the guarantee covers 90 to 180 days depending on role level. If the professional leaves or is terminated within that period, Kaptas Global restarts the search at no additional cost. For Outsourcing & Staffing, replacement is unlimited for the entire duration of the contract. This matters because a bad hire can cost over 200% of the role's annual salary when factoring lost productivity, severance, and restart time."
  },
  {
    q: "Why hire Brazilian professionals instead of US-based talent?",
    a: "Three practical reasons. Cost: companies save up to 60% on total compensation while accessing senior-level talent. Time zone: Brazil overlaps 5 to 8 hours with US business hours (1 hour from EST, 4 from PST), enabling real-time collaboration without async delays. Talent depth: Brazil has over 1.5 million tech graduates, the largest IT community in Latin America, and growing bilingual proficiency. Kaptas Global vets every candidate for English fluency, technical skills, and cultural fit before presenting them to your team."
  },
  {
    q: "What types of roles can Kaptas Global fill?",
    a: "Kaptas Global places professionals across technology, finance, sales, marketing, operations, HR, and executive leadership. Common roles include Software Engineers (backend, frontend, full-stack, mobile), QA Engineers, Data Engineers, Product Managers, DevOps/SRE, as well as Country Managers, General Managers, Head of Sales, Marketing Managers, and HR leads. The process adapts to the role, not the other way around."
  },
  {
    q: "Do I need a legal entity in Brazil to hire through Kaptas Global?",
    a: "No. With Outsourcing & Staffing, Kaptas Global acts as the employer of record in Brazil. The professional works dedicated to your team, but all employment contracts, payroll, taxes, and compliance are handled by Kaptas Global. You receive one monthly invoice in USD. For Direct Hire, the professional joins your company directly (you or your EOR provider handle the employment relationship). For companies that want to establish their own entity in Brazil, the Hire in Brazil service provides guidance on the best structure."
  },
  {
    q: "How does Kaptas Global vet candidates?",
    a: "Every candidate goes through a multi-step process: profile screening against your specific requirements, English proficiency interview, technical assessment by Kaptas Global specialists in the relevant stack, and cultural fit evaluation. Only candidates who pass all stages are presented. Kaptas Global does not source from job boards or databases. Every profile is headhunted and individually evaluated. This process supports the company's 75% repeat-client rate across 300+ placements."
  },
  {
    q: "What makes Kaptas Global different from other recruitment agencies?",
    a: "Kaptas Global is a US-incorporated company founded by Brazilians with over 20 years of combined experience in Brazil's tech and professional market. The team of two means every engagement is handled directly by the founders, with no account managers or layers in between. Kaptas Global serves 100+ clients across the US, UK, Germany, China, and other markets. The operational model is built around quality, efficiency, and cost reduction: transparent pricing, no hidden fees, replacement guarantees on every placement, and a 75% repeat-client rate that reflects consistent delivery."
  },
  {
    q: ENTITY_FAQ.home.q,
    a: ENTITY_FAQ.home.a,
  }
];

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
          {faqs.map((faq, index) => {
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
      </div>
    </section>
  );
}
