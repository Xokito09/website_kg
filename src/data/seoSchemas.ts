import {
  HOME_FAQS,
  PRICING_FAQS,
  DIRECT_HIRE_FAQS,
  OUTSOURCING_FAQS,
  EXECUTIVE_MAPPING_FAQS,
  HIRE_IN_BRAZIL_FAQS,
  type FaqItem,
} from "./faqs";

/**
 * Schema identifiers — used to cross-link schemas across pages.
 * Google and LLM-based crawlers use `@id` to merge schemas referencing the
 * same entity instead of duplicating the data on every page.
 */
export const SITE_URL = "https://kaptasglobal.io";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  "name": "Kaptas Global",
  "legalName": "HR Technology LLC",
  "alternateName": ["Kaptas Global", "HR Technology LLC d/b/a Kaptas Global", "K Global"],
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo-branco.png`,
  "description": "Kaptas Global is a strategic hiring partner connecting founder-led U.S. technology companies with senior remote engineering and operating talent in Brazil and Latin America. Services include Direct Hire, Outsourcing & Staffing, Executive Mapping, and Hire in Brazil. Kaptas Global is the trade name of HR Technology LLC, a US-incorporated Florida limited liability company.",
  "foundingDate": "2024",
  "founder": [
    {
      "@type": "Person",
      "name": "Rodolfo Chaves",
      "jobTitle": "Co-Founder",
      "sameAs": ["https://www.linkedin.com/in/rodolfoch"]
    },
    {
      "@type": "Person",
      "name": "Henry Novaes",
      "jobTitle": "Co-Founder",
      "sameAs": ["https://www.linkedin.com/in/henry-novaes/"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "801 Brickell Ave, 8th Floor",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "postalCode": "33131",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-689-293-9252",
    "email": "support@kaptasglobal.io",
    "contactType": "sales",
    "availableLanguage": ["English", "Portuguese"]
  },
  // Entity-verification anchors. An Organization with a single sameAs is a
  // name; one that resolves across independent third-party profiles is an
  // entity a search or answer engine can reconcile.
  "sameAs": [
    "https://www.linkedin.com/company/kglobal-talent",
    "https://clutch.co/profile/kaptas-global",
    "https://www.g2.com/sellers/kaptas-global",
    "https://www.trustpilot.com/review/kaptasglobal.io"
  ],
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "knowsAbout": [
    "Hiring developers in Brazil",
    "Outsourcing and staffing Brazilian professionals",
    "Direct hire recruitment Brazil to US",
    "Employer of record Brazil",
    "CLT vs PJ hiring models in Brazil",
    "Nearshore software development Brazil",
    "Remote teams Brazil for US companies",
    "Executive mapping and talent intelligence",
    "Cost to hire software engineers in Brazil",
    "Brazil tech talent market",
    "Recruitment pricing and fee structures for Latin America",
    "Cost comparison US vs Brazilian talent",
    "Market entry hiring strategy for Brazil",
    "Hire in Brazil consulting",
    "Brazilian labor law compliance for foreign companies",
    "Payroll management Brazil",
    "Latin America nearshore hiring"
  ]
};

/**
 * Speakable specification — applied to every FAQPage schema below.
 * Tells voice assistants and AI answer engines (Google Assistant, ChatGPT
 * voice, Perplexity, Gemini, Google AI Overviews) which DOM nodes contain
 * the canonical answer text. The CSS selector matches the data-speakable
 * attribute we set on the answer <div> inside every FAQ accordion.
 */
const FAQ_SPEAKABLE = {
  "@type": "SpeakableSpecification",
  "cssSelector": ["[data-speakable]"]
} as const;

/**
 * buildFaqSchema — derives a FAQPage from the visible FAQ array.
 *
 * The FAQPage answers used to be written out by hand, separately from the
 * accordion copy, and they drifted. On 2026-09-22 the Home schema told answer
 * engines "Kaptas Global charges no retainers, no deposits, and no recruitment
 * fees upfront" while the page said "there is no retainer and no deposit", and
 * four pages carried schema questions that were nowhere on the page. Google's
 * structured-data policy is explicit that FAQPage content must be visible on
 * the page, and an engine quoting a sentence a prospect cannot find is worse
 * than shipping no schema at all.
 *
 * The visible array is now the only source. Pass it in, get the FAQPage out;
 * the two cannot diverge because there is only one copy of the text. Answers
 * keep their "\n\n" paragraph splits verbatim — the schema is plain text, and
 * FaqAnswer renders the same string as paragraphs on the page.
 */
export function buildFaqSchema(items: FaqItem[], opts: { speakable?: boolean } = {}) {
  const { speakable = true } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(speakable ? { "speakable": FAQ_SPEAKABLE } : {}),
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };
}

export const homeFaqSchema = buildFaqSchema(HOME_FAQS);

/**
 * HowTo schema for Kaptas Global's 4-step hiring process.
 * Targets high-intent queries like "how to hire developers in brazil",
 * "how does nearshore hiring work", "kaptas global hiring process".
 * Google can render this as a step-by-step rich result in SERP; LLMs use
 * the structured steps as canonical answer content when asked how the
 * service works. Step text is richer here than in the visible card copy
 * because schema extraction is text-only and benefits from full context.
 */
export const homeHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to hire senior Brazilian engineers through Kaptas Global",
  "description": "Kaptas Global's hiring process delivers a pre-vetted candidate from kickoff to signed offer in 2 to 4 weeks. The client interviews three finalists; Kaptas Global handles sourcing, screening, English and remote-readiness validation, compliance, and onboarding.",
  "totalTime": "P4W",
  "inLanguage": "en-US",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Strategic Alignment",
      "text": "Kaptas Global runs an intake call with the founder, CTO, or hiring manager to map the technical stack, seniority level, engineering culture, and product roadmap. The search is calibrated to the specific requirements, and the engagement model is confirmed — Direct Hire (one-time placement fee), Outsourcing & Staffing (flat monthly cost with payroll and Brazilian compliance handled), Executive Mapping (research-first), or Hire in Brazil (market-entry consulting).",
      "url": "https://kaptasglobal.io/#how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Sourcing and Vetting",
      "text": "Kaptas Global directly sources and headhunts candidates from target companies — not from inbound databases. Each candidate is screened on technical depth, behavioral fit, business-level English fluency, remote-readiness and async communication, and cultural alignment with the client team. Three finalists are presented for typical engineering roles; for leadership searches the shortlist depth follows the engagement scope.",
      "url": "https://kaptasglobal.io/#how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Client Interviews",
      "text": "The client interviews only the pre-vetted finalists. Kaptas Global coordinates scheduling, live technical assessments, system-design rounds, and reference checks. The client's existing interview loop is preserved; Kaptas Global plugs in around it rather than replacing it.",
      "url": "https://kaptasglobal.io/#how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Hire and Onboard",
      "text": "Offer letter, contract structuring, compliance, payroll setup, and onboarding are handled end-to-end. For Outsourcing & Staffing and EOR engagements, Kaptas Global is the employer of record in Brazil and issues a single USD invoice covering the professional's compensation and Kaptas Global's management fee. For Direct Hire the candidate moves onto the client's payroll or PJ contract. The new hire typically starts within 2 to 4 weeks of kickoff.",
      "url": "https://kaptasglobal.io/#how-it-works"
    }
  ]
};

export const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Recruitment and Staffing",
  "provider": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kaptas Global Hiring Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Direct Hire", "description": "One-time placement fee of 18% of first-year salary. No retainer. 90-180 day replacement guarantee.", "url": "https://kaptasglobal.io/direct-hire" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outsourcing & Staffing", "description": "Flat monthly cost per professional including the professional's compensation and Kaptas Global's management fee, billed as a single USD invoice. Unlimited replacements during contract.", "url": "https://kaptasglobal.io/contractor-staffing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Executive Mapping", "description": "Market intelligence report with salary benchmarks, competitor org charts, and passive candidate shortlist. Delivery in 10-15 business days.", "url": "https://kaptasglobal.io/executive-mapping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hire in Brazil", "description": "Market-entry consulting including compensation analysis, hiring-model recommendation (CLT, PJ, EOR), and first-hire support.", "url": "https://kaptasglobal.io/hire-in-brazil" } }
    ]
  }
};

export const pricingFaqSchema = buildFaqSchema(PRICING_FAQS);

export const pricingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Recruitment and Staffing Services",
  "provider": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kaptas Global Hiring Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Direct Hire", "description": "One-time recruitment fee of 18% of the professional's first-year salary. No retainer, no deposit. Includes a 90-180 day replacement guarantee.", "price": "18%", "priceCurrency": "USD", "url": "https://kaptasglobal.io/direct-hire" },
      { "@type": "Offer", "name": "Outsourcing & Staffing", "description": "Flat monthly cost per professional covering the professional's compensation, Kaptas Global's management fee, and ongoing HR support in a single invoice. Unlimited replacement included.", "priceSpecification": { "@type": "UnitPriceSpecification", "priceCurrency": "USD", "unitCode": "MON", "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "professional" } }, "url": "https://kaptasglobal.io/contractor-staffing" },
      { "@type": "Offer", "name": "Executive Mapping", "description": "Custom project fee. Delivers candidate profiles, compensation benchmarks, and market analysis within 10-15 business days.", "url": "https://kaptasglobal.io/executive-mapping" },
      { "@type": "Offer", "name": "Hire in Brazil", "description": "Custom engagement for companies entering or expanding operations in Brazil.", "url": "https://kaptasglobal.io/hire-in-brazil" }
    ]
  }
};

export const outsourcingFaqSchema = buildFaqSchema(OUTSOURCING_FAQS);

export const outsourcingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Outsourcing and Staffing in Brazil and Latin America",
  "description": "Kaptas Global sources, vets, and places remote professionals from Brazil and Latin America on client teams worldwide. Kaptas Global handles payroll, taxes, compliance, and contract structuring. Clients manage the talent directly, own all intellectual property, and pay one monthly invoice in USD with zero upfront cost. No local entity required.",
  "provider": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "serviceType": "Outsourcing and Staffing",
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Outsourcing and Staffing Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remote Engineer Staffing in Brazil", "description": "Kaptas Global places pre-vetted senior engineers from Brazil on client teams with full payroll, compliance, and IP ownership handled." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remote Operations and Finance Staffing in Brazil", "description": "Kaptas Global places pre-vetted finance, operations, marketing, and design professionals from Brazil on client teams with full payroll and compliance handled." } }
    ]
  },
  "url": "https://kaptasglobal.io/contractor-staffing",
  "potentialAction": { "@type": "Action", "name": "Start for free", "target": "https://kaptasglobal.io/contractor-staffing#form" }
};

export const executiveMappingFaqSchema = buildFaqSchema(EXECUTIVE_MAPPING_FAQS);

export const executiveMappingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Executive Mapping in Brazil and Latin America",
  "description": "Kaptas Global's Executive Mapping service maps 20 to 30 leadership professionals for a target role in Brazil and Latin America, delivering competitor compensation analysis, team structure intelligence, salary benchmarks, and a ranked shortlist of top candidates. Delivered in 10 to 15 business days.",
  "provider": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "serviceType": "Executive Talent Mapping",
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "Brazil" },
    { "@type": "Country", "name": "Argentina" },
    { "@type": "Country", "name": "Mexico" },
    { "@type": "Country", "name": "Colombia" },
    { "@type": "Country", "name": "Chile" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Executive Mapping Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Executive Talent Mapping for Brazil", "description": "Maps 20 to 30 leadership professionals for a target role in Brazil, including competitor compensation analysis, team structure intelligence, and a ranked shortlist." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Executive Talent Mapping for Latin America", "description": "Maps leadership professionals across Latin America for C-level, VP, director, and country manager roles, with salary benchmarks, competitor analysis, and hiring model recommendations." } }
    ]
  },
  "url": "https://kaptasglobal.io/executive-mapping",
  "potentialAction": { "@type": "Action", "name": "Book a call", "target": "https://kaptasglobal.io/executive-mapping#form" }
};

export const hireInBrazilFaqSchema = buildFaqSchema(HIRE_IN_BRAZIL_FAQS);

export const hireInBrazilServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Market Entry Recruitment in Brazil",
  "name": "Hire in Brazil",
  "description": "End-to-end recruitment service for companies making their first hires in Brazil. Includes competitor landscape analysis, compensation benchmarking, hiring-model consulting (CLT, PJ, or EOR), candidate sourcing, vetting, and placement. No local entity required.",
  "provider": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hire in Brazil — Key Deliverables",
    "itemListElement": [
      { "@type": "Offer", "name": "Market Intelligence Report", "description": "Competitor landscape analysis, compensation benchmarks, and hiring-model recommendation (CLT, PJ, or EOR) for the target role and geography in Brazil." },
      { "@type": "Offer", "name": "End-to-End Recruitment", "description": "Candidate sourcing, vetting, English assessment, cultural fit evaluation, and placement. Full cycle typically completed in 3 to 6 weeks." },
      { "@type": "Offer", "name": "Replacement Guarantee", "description": "90 to 180-day replacement guarantee depending on role level. If a hire does not work out within the guarantee period, Kaptas Global restarts the search at no additional cost." }
    ]
  },
  "url": "https://kaptasglobal.io/hire-in-brazil",
  "potentialAction": { "@type": "Action", "name": "Plan your first hire", "target": "https://kaptasglobal.io/hire-in-brazil#form" }
};

export const directHireFaqSchema = buildFaqSchema(DIRECT_HIRE_FAQS);

export const directHireServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Direct Hire in Brazil",
  "description": "End-to-end recruitment service to hire Brazilian professionals directly on your team. One-time 18% placement fee. Pre-vetted shortlist in 5 days. Replacement warranty included.",
  "provider": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "serviceType": "Direct Hire Recruitment",
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Direct Hire Plans",
    "itemListElement": [
      { "@type": "Offer", "name": "Direct Hire - Contractor (PJ)", "description": "One-time 18% placement fee. Candidate joins your team as an independent contractor (PJ) in Brazil. Includes full vetting, shortlisting, and replacement warranty.", "priceCurrency": "USD", "price": "18% of first-year compensation", "eligibleRegion": { "@type": "Place", "name": "Worldwide" } },
      { "@type": "Offer", "name": "Direct Hire - Permanent (CLT)", "description": "One-time 18% placement fee. Candidate is hired as a permanent employee (CLT) under Brazilian labor law. Includes full vetting, shortlisting, and replacement warranty.", "priceCurrency": "USD", "price": "18% of first-year compensation", "eligibleRegion": { "@type": "Place", "name": "Worldwide" } }
    ]
  },
  "url": "https://kaptasglobal.io/direct-hire",
  "potentialAction": { "@type": "Action", "name": "Start for free", "target": "https://kaptasglobal.io/direct-hire#form" }
};

/**
 * WebSite schema — emitted only on the home page.
 * Declares the domain as a single coherent web entity that LLMs and Google
 * can associate with the Organization via the shared @id graph.
 * Search action intentionally omitted: there is no real on-site search yet,
 * and a fake SearchAction misleads structured-data consumers.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "url": SITE_URL,
  "name": "Kaptas Global",
  "alternateName": ["HR Technology LLC d/b/a Kaptas Global"],
  "description": "Strategic hiring partner connecting founder-led U.S. technology companies with senior remote engineering and operating talent in Brazil and Latin America.",
  "publisher": { "@id": ORG_ID },
  "inLanguage": "en-US",
  "copyrightYear": 2024,
  "copyrightHolder": { "@id": ORG_ID }
};

/**
 * BreadcrumbList builder — emit on every page except the home.
 * Items must be ordered from the site root to the current page.
 * Visible breadcrumbs are not required by Google for valid rich results,
 * but a future visual implementation must match this schema exactly.
 *
 * Usage:
 *   const crumbs = buildBreadcrumbSchema([
 *     { name: "Home", url: SITE_URL },
 *     { name: "Direct Hire", url: `${SITE_URL}/direct-hire` },
 *   ]);
 */
export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
