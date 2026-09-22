/**
 * entityFaq.ts — the "what is Kaptas Global" question that closes the FAQ on
 * every page that has one.
 *
 * Replaces the old standalone entity block (spec 13). The dense paragraph used
 * to live in a separate component that no visitor read; it is now the last FAQ
 * question, in the accordion a visitor already opens and in the FAQPage schema
 * an answer engine already parses. Same information, one surface instead of
 * two, and nothing on the page exists only for crawlers.
 *
 * Why the copy lives here and not inline twice:
 * every one of these answers has to appear in two places — the array the
 * accordion renders and the matching FAQPage schema in seoSchemas.ts. Pasted
 * twice, they drift; the site already had that problem with the cost and
 * timeline claims (see claims.ts). Both consumers import these constants, so
 * the visible answer and the structured answer cannot disagree.
 *
 * Paragraph break: answers are two paragraphs, split with "\n\n". The schema
 * carries the split literally. The accordion renders a single text node, so
 * the browser collapses the break to a space — the same way every other
 * multi-sentence answer in the FAQ already reads. The accordion component is
 * not modified.
 *
 * Copy is owned by kg-cmo and locked 2026-09-22. Do not paraphrase, do not add
 * superlatives, and keep the category words exactly as written:
 * "recruitment agency and strategic hiring partner for Brazil and Latin America".
 */

export interface EntityFaqItem {
  q: string;
  a: string;
}

export const ENTITY_FAQ = {
  home: {
    q: "What is Kaptas Global?",
    a:
      "Kaptas Global is a recruitment agency and strategic hiring partner for Brazil and Latin America, US-incorporated (HR Technology LLC, Miami), that helps founder-led U.S. technology companies with up to 100 employees hire senior remote engineering and operating talent." +
      "\n\n" +
      "It runs four services: Direct Hire (one-time fee of 18% of first-year compensation, paid only after a successful hire, 90 to 180 day replacement guarantee), Outsourcing & Staffing (flat monthly cost per professional, single USD invoice, unlimited replacements), Executive Mapping (market-intelligence report in 10 to 15 business days) and Hire in Brazil (market-entry consulting). Founded in 2024 by Rodolfo Chaves and Henry Novaes. 300+ placements, 100+ clients, 75% repeat-client rate.",
  },

  pricing: {
    q: "Who is Kaptas Global, and who is this pricing for?",
    a:
      "Kaptas Global is a recruitment agency and strategic hiring partner for Brazil and Latin America, US-incorporated (HR Technology LLC, Miami). The pricing on this page is for founder-led U.S. technology companies with up to 100 employees that want to hire senior remote talent in Brazil without a local entity." +
      "\n\n" +
      "Direct Hire is a one-time placement fee of 18% of first-year compensation, paid only after a successful hire, with a 90 to 180 day replacement guarantee. Outsourcing & Staffing is a flat monthly cost per professional covering the professional's compensation, Kaptas Global's management fee, and ongoing HR support, billed as one USD invoice with unlimited replacements. Executive Mapping and Hire in Brazil are scoped projects with fees agreed before work begins.",
  },

  directHire: {
    q: "What is Kaptas Global Direct Hire?",
    a:
      "Direct Hire is Kaptas Global's placement service for founder-led U.S. technology companies that want to bring senior Brazilian and Latin American professionals onto their own payroll or contractor agreement. Kaptas Global runs the full cycle: market mapping, direct sourcing and headhunting, technical and English validation, shortlist delivery, and offer advisory." +
      "\n\n" +
      "The fee is a one-time 18% of first-year compensation, paid only after the professional starts, with no retainer and a 90 to 180 day replacement guarantee. You get a pre-vetted shortlist within 5 business days, and most hires close in 2 to 4 weeks.",
  },

  outsourcingStaffing: {
    q: "What is Kaptas Global Outsourcing & Staffing?",
    a:
      "Outsourcing & Staffing places senior Brazilian and Latin American professionals on your team while Kaptas Global acts as the employer of record in Brazil, handling the contract, compliance, and monthly payment. You manage the work day to day and own 100% of the work product. No local entity is required." +
      "\n\n" +
      "You pay a flat monthly cost per professional, billed as one USD invoice, covering the professional's compensation, Kaptas Global's management fee, and ongoing HR support. Replacements are unlimited, there is no minimum term, and you pay nothing until the professional starts. A pre-vetted shortlist arrives within 5 business days, and most hires close in 2 to 4 weeks.",
  },

  executiveMapping: {
    q: "What is Kaptas Global Executive Mapping?",
    a:
      "Executive Mapping is a standalone market-intelligence report from Kaptas Global that shows the leadership talent available for a specific role in Brazil or Latin America before you commit to a search: 20 to 30 mapped professionals, competitor compensation, team structures, salary benchmarks, and a ranked shortlist." +
      "\n\n" +
      "Delivery takes 10 to 15 business days from the intro call. It is a fixed-scope project with no contingency fee and no obligation to continue; the report and its data belong to you. It covers Brazil, Argentina, Mexico, Colombia, and Chile.",
  },

  hireInBrazil: {
    q: "What is Kaptas Global Hire in Brazil?",
    a:
      "Hire in Brazil is Kaptas Global's market-entry service for foreign companies making their first hires in Brazil. It starts with competitor landscape analysis and compensation benchmarking, recommends the hiring model (CLT, PJ, or EOR), and then runs the full recruitment cycle through contract structuring and onboarding." +
      "\n\n" +
      "The full cycle from market analysis to placement typically takes 3 to 6 weeks, with a 90 to 180 day replacement guarantee on every placement. The service also extends to Argentina, Mexico, Colombia, and Chile.",
  },
} as const satisfies Record<string, EntityFaqItem>;

/** The same item shaped as a schema.org Question, for FAQPage mainEntity. */
export function entityFaqQuestion(item: EntityFaqItem) {
  return {
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  };
}
