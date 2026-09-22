import { FaqAccordion } from "../shared/FaqAccordion";
import { PRICING_FAQS } from "../../data/faqs";

export function PricingFAQ() {
  return (
    <section className="bg-[#111111] py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about our pricing and models.</p>
        </div>

        <FaqAccordion items={PRICING_FAQS} />
      </div>
    </section>
  );
}
