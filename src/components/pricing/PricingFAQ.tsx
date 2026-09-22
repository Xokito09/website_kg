import { FaqAccordion } from "../shared/FaqAccordion";

const faqs = [
  {
    q: "Are there any upfront fees?",
    a: "No. Kaptas Global does not charge upfront fees for Direct Hire or Outsourcing & Staffing. Payment happens only after a successful placement or as part of the agreed monthly invoice. Over 300 placements have been delivered this way. Executive Mapping and Hire in Brazil are custom projects with pricing defined before work begins."
  },
  {
    q: "How is the 18% Direct Hire fee calculated?",
    a: "Kaptas Global charges 18% of the hired professional's first-year annual salary as a one-time placement fee. Payment is due after the candidate accepts the offer and starts. There is no retainer, no deposit, and no cost if the search does not result in a hire."
  },
  {
    q: "What exactly is included in the Outsourcing & Staffing monthly cost?",
    a: "Kaptas Global charges one flat amount per professional per month. It covers the candidate's full compensation and all service fees. There are no separate invoices for payroll, compliance, taxes, or administration. For example, a Senior Full-stack Engineer in Brazil ranges from $4k to $6k per month, all-in."
  },
  {
    q: "How does 18% compare to other recruitment agencies?",
    a: "US-based recruitment agencies typically charge 20-30% of first-year salary for contingency placements and 25-35% for retained searches. Kaptas Global charges 18% with no retainer, a 90 to 180-day replacement guarantee, and access to Brazil's talent market where salary benchmarks are up to 60% lower than US equivalents. The total cost to hire in Brazil through Kaptas is a fraction of a comparable US search."
  },
  {
    q: "What does the replacement guarantee cover?",
    a: "For Direct Hire, if the professional leaves or does not meet expectations within 90 to 180 days (defined in your agreement), Kaptas Global restarts the search and places a replacement at no additional cost. For Outsourcing & Staffing, replacements are unlimited and included as part of the ongoing service. This applies to all placements regardless of role or seniority."
  },
  {
    q: "Can I switch from Outsourcing & Staffing to Direct Hire?",
    a: "Yes. Kaptas Global helps transition contractor relationships into permanent roles when needed. This includes adjusting the hiring model, compensation structure, and compliance requirements. Over 30% of long-term Outsourcing clients have converted at least one professional to a Direct Hire arrangement."
  },
  {
    q: "How are Outsourcing & Staffing monthly costs determined for each role?",
    a: "Kaptas Global determines the monthly cost based on role type, seniority, and required skill set. When a candidate profile is presented, the all-in cost is included alongside qualifications and experience. Current ranges for common roles: QA Engineer $3k-$5k/month, Senior Full-stack Engineer $4k-$6k/month, Data Engineer $4.5k-$7k/month."
  },
  {
    q: "What if I need to scale or reduce my team?",
    a: "Kaptas Global supports flexible team sizing. For Outsourcing & Staffing, professionals can be added or removed as needs change with no long-term contracts or penalties. For Direct Hire, each placement is an independent engagement with no volume commitments. Many clients start with one hire and scale to 5-10 professionals within the first year."
  },
  {
    q: "How is Executive Mapping and Hire in Brazil priced?",
    a: "Kaptas Global scopes both as custom projects. Executive Mapping pricing depends on role seniority, number of competitors to analyze, geographic coverage, and depth of intelligence, with reports typically delivered in 10-15 business days. Hire in Brazil is scoped to the number of roles, market analysis complexity, and hiring-model consulting involved. Both include a detailed proposal with clear deliverables before any work starts."
  },
  {
    q: "Is there a minimum number of hires required?",
    a: "No. Kaptas Global works with companies hiring a single professional or building a full team. There is no minimum volume, no long-term contract, and no commitment beyond the specific engagement. Over 75% of clients return to hire again after their first placement."
  }
];

export function PricingFAQ() {
  return (
    <section className="bg-[#111111] py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about our pricing and models.</p>
        </div>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
