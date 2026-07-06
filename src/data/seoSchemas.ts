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
  "alternateName": ["Kaptas Global", "HR Technology LLC d/b/a Kaptas Global"],
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo-branco.png`,
  "description": "Kaptas Global is a strategic hiring partner connecting founder-led U.S. technology companies with senior remote engineering and operating talent in Brazil and Latin America. Services include Direct Hire, Outsourcing & Staffing, Executive Mapping, and Hire in Brazil. Kaptas Global is the trade name of HR Technology LLC, a US-incorporated Florida limited liability company.",
  "foundingDate": "2024",
  "founder": [
    { "@type": "Person", "name": "Rodolfo Chaves" },
    { "@type": "Person", "name": "Henry Novaes" }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7345 W Sand Lake Rd, Ste 210, 0FC 460",
    "addressLocality": "Orlando",
    "addressRegion": "FL",
    "postalCode": "32819",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-689-293-9252",
    "email": "support@kaptasglobal.io",
    "contactType": "sales",
    "availableLanguage": ["English", "Portuguese"]
  },
  "sameAs": ["https://www.linkedin.com/company/kaptas-global/"],
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

export const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Kaptas Global offer?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global offers four core services for companies hiring in Brazil. Direct Hire places full-time professionals on your team for a one-time fee of 18% of first-year salary, with no retainer required. Outsourcing & Staffing provides dedicated professionals at a flat monthly cost (for example, a Senior Full-Stack Engineer at $4,000-$6,000/month fully loaded), with Kaptas Global handling payroll, compliance, and HR. Executive Mapping delivers a research-grade report with salary benchmarks, competitor org charts, and a shortlist of passive candidates in 10-15 business days. Hire in Brazil is a market-entry consulting service that provides compensation analysis, hiring-model recommendation (CLT, PJ, EOR), and first-hire support for companies entering Brazil." }
    },
    {
      "@type": "Question",
      "name": "Is there any upfront cost to work with Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Kaptas Global charges no retainers, no deposits, and no recruitment fees upfront. For Direct Hire, billing happens only after a successful placement. For Outsourcing & Staffing, monthly invoicing starts when the professional begins working. Executive Mapping and Hire in Brazil are scoped projects with fees agreed before work begins. There are no speculative charges at any stage." }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to hire a Brazilian professional through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "Direct Hire: a one-time fee of 18% of the professional's first-year salary. Outsourcing & Staffing: a flat monthly rate per professional (example: Senior Full-Stack Engineer $4,000-$6,000/month fully loaded, including salary, CLT charges, and Kaptas Global's management fee). Companies typically save 40-60% compared to equivalent US hires. Executive Mapping and Hire in Brazil are custom-priced per project scope. Full pricing details at kaptasglobal.io/pricing/." }
    },
    {
      "@type": "Question",
      "name": "How quickly can Kaptas Global deliver candidates?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global delivers a shortlist of vetted candidates within 5 business days of intake. The full placement cycle averages 2-4 weeks for Direct Hire and Outsourcing & Staffing roles. Executive Mapping reports are delivered in 10-15 business days. Hire in Brazil full-cycle engagements take 3-6 weeks from kickoff to first hire." }
    },
    {
      "@type": "Question",
      "name": "What happens if a hire does not work out?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global provides a replacement guarantee on every placement. Direct Hire includes a 90-180 day guarantee depending on role level. Outsourcing & Staffing contracts include unlimited replacements for the duration of the engagement. If a professional does not meet expectations, Kaptas Global restarts the search at no additional cost. A bad hire can cost a company more than 200% of the position's annual salary." }
    },
    {
      "@type": "Question",
      "name": "Why should US companies hire Brazilian professionals?",
      "acceptedAnswer": { "@type": "Answer", "text": "Brazilian professionals offer 40-60% lower total compensation compared to US equivalents at the same seniority level. Brazil's timezone (GMT-3) provides 5-8 hours of daily overlap with US teams. The country has over 1.5 million tech graduates and a growing bilingual talent pool. Brazil's engineering ecosystem has supported global tech operations since 2005." }
    },
    {
      "@type": "Question",
      "name": "What types of roles can Kaptas Global fill?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global recruits across technology (software engineers, QA, data engineers, DevOps, product managers, engineering managers), finance, sales, marketing, operations, HR, and executive leadership. The team has completed 300+ placements across 100+ global clients." }
    },
    {
      "@type": "Question",
      "name": "Do I need a legal entity in Brazil to hire through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. For Outsourcing & Staffing, Kaptas Global acts as the employer of record in Brazil and invoices your company in USD. You do not need a Brazilian entity, local tax registration, or labor-law expertise. For Direct Hire, the professional is employed directly by your company or your existing EOR provider. Hire in Brazil includes consulting on whether to use CLT, PJ, or EOR." }
    },
    {
      "@type": "Question",
      "name": "How does Kaptas Global vet candidates?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every candidate goes through requirement screening, structured English-proficiency interview, technical assessment, and cultural-fit evaluation. Only head-sourced candidates are presented. Kaptas Global screens approximately 50 candidates to shortlist 3. This process supports a 75% repeat-client rate across 300+ placements." }
    },
    {
      "@type": "Question",
      "name": "What makes Kaptas Global different from other recruitment agencies?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global is US-incorporated and founded by Brazilians with over 20 years of combined experience in the Brazil-US hiring market. The company operates as a two-person team, meaning every client works directly with the founders. Kaptas Global serves 100+ clients worldwide with a 75% repeat-client rate, transparent pricing, and performance-based engagement models." }
    }
  ]
};

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
  "description": "Kaptas Global's hiring process delivers a pre-vetted candidate from kickoff to signed offer in approximately 14 business days. The client interviews three finalists; Kaptas Global handles sourcing, screening, English and remote-readiness validation, compliance, and onboarding.",
  "totalTime": "P14D",
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
      "text": "Offer letter, contract structuring, compliance, payroll setup, and onboarding are handled end-to-end. For Outsourcing & Staffing and EOR engagements, Kaptas Global is the employer of record in Brazil and issues a single USD invoice covering salary and all mandatory Brazilian employment charges. For Direct Hire the candidate moves onto the client's payroll or PJ contract. The new hire begins shipping by day 14 in most engagements.",
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
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outsourcing & Staffing", "description": "Flat monthly cost per professional including salary, CLT charges, and management fee. Unlimited replacements during contract.", "url": "https://kaptasglobal.io/contractor-staffing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Executive Mapping", "description": "Market intelligence report with salary benchmarks, competitor org charts, and passive candidate shortlist. Delivery in 10-15 business days.", "url": "https://kaptasglobal.io/executive-mapping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hire in Brazil", "description": "Market-entry consulting including compensation analysis, hiring-model recommendation (CLT, PJ, EOR), and first-hire support.", "url": "https://kaptasglobal.io/hire-in-brazil" } }
    ]
  }
};

export const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to hire a Brazilian professional through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "It depends on the hiring model. Direct Hire is a one-time fee of 18% of the professional's first-year salary, with no retainer or deposit required. Outsourcing & Staffing is a flat monthly cost per professional that covers salary, Kaptas Global fees, and all Brazilian employment obligations in a single invoice. There are no hidden fees in either model." }
    },
    {
      "@type": "Question",
      "name": "What is included in the flat monthly cost for Outsourcing & Staffing?",
      "acceptedAnswer": { "@type": "Answer", "text": "The flat monthly cost covers the professional's salary, all mandatory Brazilian employment charges (which typically add 70-80% above gross salary for CLT contracts), Kaptas Global management fees, and ongoing HR support. You receive a single invoice with no separate charges for taxes, benefits, or compliance." }
    },
    {
      "@type": "Question",
      "name": "How does Kaptas Global's 18% Direct Hire fee compare to other recruitment agencies?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most US-based recruitment agencies charge 20-30% of first-year salary for contingency searches, and 25-35% for retained executive searches, often requiring an upfront retainer. Kaptas Global charges a flat 18% with no retainer and no deposit. You only pay when the professional is hired and starts working." }
    },
    {
      "@type": "Question",
      "name": "Are there any upfront fees or deposits required?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. For Direct Hire, there is no retainer and no deposit. Payment is due only after the professional is hired and starts. For Outsourcing & Staffing, billing begins only when the professional is active and working. Executive Mapping and Hire in Brazil are scoped as custom projects with fees agreed before work begins." }
    },
    {
      "@type": "Question",
      "name": "What happens if a hire doesn't work out?",
      "acceptedAnswer": { "@type": "Answer", "text": "For Direct Hire, Kaptas Global offers a replacement guarantee of 90 to 180 days depending on the role level. If the professional leaves or is terminated within that period, Kaptas Global replaces them at no additional cost. For Outsourcing & Staffing, replacement is unlimited and included at no extra charge for the entire duration of the contract." }
    },
    {
      "@type": "Question",
      "name": "How much can I save by hiring Brazilian professionals instead of US-based talent?",
      "acceptedAnswer": { "@type": "Answer", "text": "Companies typically save 40-60% compared to equivalent US-based hires, depending on the role and seniority. For example, a Senior Full-Stack Engineer in Brazil costs between $4,000 and $6,000 per month through Outsourcing & Staffing, fully loaded. The same profile in the US often exceeds $10,000-$12,000 per month when you include salary, benefits, and employer taxes." }
    },
    {
      "@type": "Question",
      "name": "What are typical salary ranges for Brazilian tech professionals?",
      "acceptedAnswer": { "@type": "Answer", "text": "Through Kaptas Global's Outsourcing & Staffing model (flat monthly cost, all-in), typical ranges are: Senior Full-Stack Engineer $4,000-$6,000/month, QA Engineer $3,000-$5,000/month, Mobile Engineer $4,000-$6,000/month, and Data Engineer $4,500-$7,000/month. These figures include salary, Brazilian employment charges, and Kaptas Global fees in a single invoice." }
    },
    {
      "@type": "Question",
      "name": "Do I need to set up a legal entity in Brazil to hire through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. With Outsourcing & Staffing, Kaptas Global is the employer of record in Brazil. The professional works dedicated to your team, but all employment contracts, payroll, taxes, and compliance are handled by Kaptas Global. You receive one monthly invoice in USD. If you want to establish your own entity in Brazil, the Hire in Brazil service can help with that process." }
    },
    {
      "@type": "Question",
      "name": "How does pricing work for Executive Mapping?",
      "acceptedAnswer": { "@type": "Answer", "text": "Executive Mapping is priced as a custom project scoped to the specific role, target companies, geography, and depth of research required. Kaptas Global delivers a detailed report with qualified candidate profiles, compensation benchmarks, and market analysis within 10-15 business days. The fee is agreed before work begins, with no recurring charges." }
    },
    {
      "@type": "Question",
      "name": "Can I combine multiple Kaptas Global services in a single engagement?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many clients start with Executive Mapping to understand the talent landscape, then move to Direct Hire or Outsourcing & Staffing to bring professionals on board. Each service is priced independently, so you only pay for what you use. Kaptas Global can recommend the most efficient combination based on your hiring goals, timeline, and budget." }
    }
  ]
};

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
      { "@type": "Offer", "name": "Outsourcing & Staffing", "description": "Flat monthly cost per professional covering salary, Brazilian employment charges, Kaptas Global fees, and HR support in a single invoice. Unlimited replacement included.", "priceSpecification": { "@type": "UnitPriceSpecification", "priceCurrency": "USD", "unitCode": "MON", "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "professional" } }, "url": "https://kaptasglobal.io/contractor-staffing" },
      { "@type": "Offer", "name": "Executive Mapping", "description": "Custom project fee. Delivers candidate profiles, compensation benchmarks, and market analysis within 10-15 business days.", "url": "https://kaptasglobal.io/executive-mapping" },
      { "@type": "Offer", "name": "Hire in Brazil", "description": "Custom engagement for companies entering or expanding operations in Brazil.", "url": "https://kaptasglobal.io/hire-in-brazil" }
    ]
  }
};

export const outsourcingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does outsourcing and staffing work when hiring remote talent in Brazil and Latin America?",
      "acceptedAnswer": { "@type": "Answer", "text": "Outsourcing and staffing through Kaptas Global means we source, vet, and place a remote professional on your team while handling payroll, taxes, and compliance on an ongoing basis. You manage the talent's daily work, own everything they produce, and receive one monthly invoice in USD. There is no need to open a local entity in Brazil or any other Latin American country, which makes this the simplest nearshore hiring model available." }
    },
    {
      "@type": "Question",
      "name": "How does Kaptas Global find and source talent in Brazil and Latin America?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global sources professionals through direct outreach, not job boards or inbound databases. Every search is built from scratch around the client's requirements, including tech stack, seniority, function, and team culture. We target professionals who are currently employed at strong companies across Brazil and Latin America and reach them with credibility, context, and clarity from the first message." }
    },
    {
      "@type": "Question",
      "name": "What does Kaptas Global validate beyond the resume when screening candidates?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global validates five dimensions beyond the resume: functional and technical fit, business-level English through live assessment, remote maturity and async communication habits, understanding of the contractor engagement model, and cultural alignment with the client's team. A strong resume alone is never enough to pass screening." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to hire remote professionals in Brazil through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global typically delivers a shortlist of three pre-vetted candidates within five business days of kickoff. The average time from the first alignment call to a signed hire is 14 days. Kaptas Global achieves this speed through direct sourcing and a structured screening process that eliminates wasted interviews and low-signal candidates." }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to hire professionals in Brazil compared to the United States?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global charges one monthly invoice in USD that covers the professional's compensation, Brazilian taxes, and the service fee. The total loaded cost for a senior professional hired in Brazil through Kaptas Global is typically 40 to 60 percent lower than a comparable US hire at the same seniority level, without sacrificing quality or timezone overlap." }
    },
    {
      "@type": "Question",
      "name": "Is there any upfront cost to start hiring talent in Brazil through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global charges zero upfront cost to begin an engagement. Sourcing, vetting, and candidate presentations are completely free. Clients pay nothing until they decide to hire and the professional starts working. No local entity is required to get started." }
    },
    {
      "@type": "Question",
      "name": "What is Kaptas Global's replacement guarantee if a professional leaves or underperforms?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global's replacement guarantee has no time limit and no additional cost. Because the service fee is billed monthly, replacements are fully covered for as long as the engagement lasts. If a professional leaves or underperforms, Kaptas Global begins a new search immediately and presents replacement candidates within the same five-day shortlist timeline." }
    },
    {
      "@type": "Question",
      "name": "Who owns the intellectual property produced by remote professionals hired through Kaptas Global?",
      "acceptedAnswer": { "@type": "Answer", "text": "The client owns 100 percent of all code, data, designs, documents, and deliverables produced by the professional. Full IP ownership is written into every Kaptas Global contract. There are no exceptions, no shared ownership clauses, and no transfer fees." }
    },
    {
      "@type": "Question",
      "name": "What is the timezone overlap between Brazil and the United States for nearshore remote teams?",
      "acceptedAnswer": { "@type": "Answer", "text": "Brazil is one to four hours ahead of US Eastern Time, which provides full overlap during standard US business hours. West Coast teams get four to six hours of direct overlap. This nearshore timezone proximity is one of the key advantages of hiring remote teams in Latin America over offshore regions like Eastern Europe or Asia." }
    },
    {
      "@type": "Question",
      "name": "Can I cancel my outsourcing and staffing engagement with Kaptas Global at any time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global requires no minimum contract term, no lock-in period, and no cancellation penalty. Clients can scale down the number of professionals or end the engagement entirely at any time with no financial consequence." }
    }
  ]
};

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

export const executiveMappingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is executive mapping and why does it matter before a leadership hire?",
      "acceptedAnswer": { "@type": "Answer", "text": "Executive mapping is a market intelligence engagement that gives you a complete picture of the leadership talent available for a specific role before you commit to a search. Kaptas Global maps 20 to 30 real professionals for a target position in Brazil or Latin America, delivering competitor compensation analysis, team structures, salary benchmarks, and a ranked shortlist of the strongest candidates. Instead of starting a 3 to 6 month executive search blind, you enter the process knowing exactly who is out there, what they earn, and who is worth pursuing." }
    },
    {
      "@type": "Question",
      "name": "What does an executive mapping report include?",
      "acceptedAnswer": { "@type": "Answer", "text": "A Kaptas Global executive mapping report covers seven core deliverables: 20 to 30 mapped qualified professionals with validated profiles; a ranked shortlist of top candidates; competitor compensation analysis broken down by salary, bonuses, equity, and benefits; salary and benefits benchmarks using real sourcing data; team structure intelligence covering reporting lines and seniority mix; a hiring landscape overview with candidate concentration and realistic timelines; and a hiring model recommendation (PJ, CLT, or EOR). Every engagement is custom-scoped." }
    },
    {
      "@type": "Question",
      "name": "Who is executive mapping for?",
      "acceptedAnswer": { "@type": "Answer", "text": "Executive mapping is designed for companies that need to hire C-level executives, country managers, VPs, directors, or other senior leadership roles in Brazil or Latin America and want real market data before committing to a search. Kaptas Global works with US-based companies, European firms, and any organization worldwide expanding into or operating in Brazil." }
    },
    {
      "@type": "Question",
      "name": "How long does an executive mapping engagement take?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global delivers a completed executive mapping report in 10 to 15 business days after the intro call. This is significantly faster than a traditional executive search, which typically runs 3 to 6 months from kickoff to offer acceptance. Every mapped professional is sourced and validated directly through active outreach, not pulled from a static database." }
    },
    {
      "@type": "Question",
      "name": "How much does executive mapping cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "There is no fixed price for Kaptas Global's executive mapping service. Each engagement is scoped as a custom project based on the target role, seniority level, number of competitors to benchmark, geographic coverage, and the depth of intelligence required. Pricing is structured as a retainer and discussed directly during the first conversation." }
    },
    {
      "@type": "Question",
      "name": "What happens after I receive the mapping report?",
      "acceptedAnswer": { "@type": "Answer", "text": "The report and all data belong to you. After delivery, you have three options: activate a search through Kaptas Global to engage and place one of the identified candidates; run your own hiring process using the mapped shortlist and market data; or hold the intelligence for a future hire or board presentation. There is no lock-in, no contingency fee tied to future hires, and no obligation to continue with Kaptas Global." }
    },
    {
      "@type": "Question",
      "name": "Why should I map the market before making a leadership hire in Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "A wrong executive hire costs more than salary — research shows it can reach 200% or more of the role's annual compensation. Studies indicate that 46% of newly hired executives fail within 18 months, most often due to poor cultural or strategic fit. Executive mapping reduces that risk by giving you a clear view of who is available, what they earn, and which candidates are the strongest fit — all before you invest in a full search." }
    },
    {
      "@type": "Question",
      "name": "Can Kaptas Global map roles beyond Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. While Kaptas Global's deepest network is in Brazil, executive mapping engagements can cover leadership roles across Latin America, including Argentina, Mexico, Colombia, and Chile. If the target role involves a regional scope or the client needs to compare talent availability across multiple markets, the mapping report can be expanded accordingly." }
    }
  ]
};

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

export const hireInBrazilFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can a foreign company hire employees in Brazil without a local entity?",
      "acceptedAnswer": { "@type": "Answer", "text": "A foreign company can hire in Brazil through an Employer of Record (EOR), a PJ contractor model, or by partnering with a recruitment firm that manages the process end-to-end. Kaptas Global helps companies from the US, UK, Germany, China, and other markets make their first hire in Brazil without requiring entity setup. We recommend the right hiring model (EOR, PJ, or CLT) based on the role, budget, and long-term plan, then handle recruitment and onboarding." }
    },
    {
      "@type": "Question",
      "name": "What does the hiring process look like when expanding to Brazil for the first time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global runs a structured process: competitor landscape analysis, compensation benchmarking, work-model recommendation (PJ, CLT, or EOR), candidate sourcing, vetting, and placement. The entire cycle typically takes 3 to 6 weeks depending on role complexity. Companies receive market data and a clear hiring structure before any candidate is presented, reducing the risk of misaligned offers or wrong hires." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between CLT, PJ, and EOR hiring models in Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "CLT is Brazil's formal employment contract with full labor protections (13th salary, FGTS, paid vacation). PJ is a contractor model where the professional invoices through their own company, offering flexibility and lower employer costs. EOR allows a foreign company to hire a CLT employee without setting up a Brazilian entity. Kaptas Global evaluates each role and recommends the best model based on cost, compliance risk, and operational needs." }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to hire an employee in Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "Total employer cost in Brazil typically runs 70-80% above gross salary when using CLT, accounting for 13th salary, vacation bonus, FGTS (8% monthly), INSS (~20%), meal and transport vouchers, and health insurance. Kaptas Global provides a role-specific compensation benchmark before the search begins so companies can plan budgets accurately." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to make a first hire in Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "With Kaptas Global, the full cycle from market analysis to placement typically takes 3 to 6 weeks. EOR onboarding after candidate selection adds 3 to 7 business days; PJ contractors can start within 1 to 3 days after contract agreement. Traditional hiring processes without local expertise often stretch to 60-90 days or longer." }
    },
    {
      "@type": "Question",
      "name": "What mandatory benefits must employers provide in Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "Brazilian labor law (CLT) requires 13th salary (one extra month of pay), 30 days of paid vacation plus a one-third vacation bonus, FGTS deposits (8% of monthly salary), INSS employer contributions (~20% of payroll), and transportation vouchers. Many companies also offer meal vouchers and health insurance to remain competitive." }
    },
    {
      "@type": "Question",
      "name": "Can Kaptas Global help hire for any role or industry, not just tech?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. While many firms entering Brazil focus on technology roles, Kaptas Global supports hiring across all functions: sales, operations, marketing, HR, finance, general management, and executive leadership. We have placed General Managers, Marketing Managers, HR leads, SAP specialists, and Community Managers for companies expanding into Brazil and Latin America." }
    },
    {
      "@type": "Question",
      "name": "What happens if a hire does not work out?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kaptas Global offers a replacement guarantee on every placement. If a hire does not meet expectations within the guarantee period, Kaptas Global restarts the search at no additional recruitment cost. This protects companies making their first move into Brazil, where replacing a bad hire can cost over 200% of the role's annual salary." }
    },
    {
      "@type": "Question",
      "name": "Why hire in Brazil instead of other Latin American countries?",
      "acceptedAnswer": { "@type": "Answer", "text": "Brazil has the largest professional talent pool in Latin America, with over 1.5 million tech graduates alone. Salary expectations for mid-to-senior roles are significantly lower than US equivalents. Time zone alignment with US East Coast (1-2 hours difference) and growing bilingual proficiency make Brazil a practical first step for companies expanding into Latin America." }
    },
    {
      "@type": "Question",
      "name": "Can Kaptas Global help hire in other Latin American countries beyond Brazil?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. While Brazil is the primary market, Kaptas Global supports hiring in Argentina, Mexico, Colombia, and Chile. Each country has a different labor framework, compensation structure, and talent profile. Kaptas Global adapts the process — competitor analysis, compensation benchmarking, model recommendation, and recruitment — to each country's specifics." }
    }
  ]
};

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

export const directHireFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Direct Hire and how does it work?",
      "acceptedAnswer": { "@type": "Answer", "text": "Direct Hire means we handle the entire recruitment process — sourcing, screening, technical validation, and shortlisting — and deliver pre-vetted candidates ready to join your team. You hire them directly on your payroll (PJ or CLT in Brazil, or as international contractors). There are no recurring fees. You pay a one-time placement fee of 18% of the candidate's expected first-year compensation, only after you make a hire." }
    },
    {
      "@type": "Question",
      "name": "How long does the hiring process take?",
      "acceptedAnswer": { "@type": "Answer", "text": "On average, we deliver the first shortlist within 5 business days. Most roles are filled within 2 to 4 weeks from kickoff, depending on seniority and specificity. Executive-level or niche roles may take slightly longer." }
    },
    {
      "@type": "Question",
      "name": "What does the 18% fee include?",
      "acceptedAnswer": { "@type": "Answer", "text": "The 18% one-time fee covers the full recruitment cycle: market mapping, active sourcing, behavioral and technical screening, shortlist delivery, interview coordination, offer advisory, and a replacement warranty. There are no retainers, upfront deposits, or hidden charges." }
    },
    {
      "@type": "Question",
      "name": "Is there a replacement warranty?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. If a placed candidate leaves or is terminated within the warranty period, we replace them at no additional cost. The warranty duration depends on the role level and is defined before the search begins." }
    },
    {
      "@type": "Question",
      "name": "Can I hire contractors (PJ) or only permanent employees (CLT)?",
      "acceptedAnswer": { "@type": "Answer", "text": "Both. We support PJ (contractor) and CLT (permanent employment under Brazilian labor law) hiring models. We help you understand the legal, tax, and cost differences so you can choose the best fit for each role." }
    },
    {
      "@type": "Question",
      "name": "Do I need a legal entity in Brazil to hire directly?",
      "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily. For PJ (contractor) hires, you can engage professionals directly from your US entity via a service agreement. For CLT (permanent) hires, you would need a local entity or an Employer of Record (EOR). We advise on the best path depending on your situation." }
    },
    {
      "@type": "Question",
      "name": "What roles can Kaptas Global fill through Direct Hire?",
      "acceptedAnswer": { "@type": "Answer", "text": "We specialize in technology, product, and engineering roles — including full-stack developers, backend and frontend engineers, QA engineers, AI/ML engineers, DevOps, data engineers, product managers, and engineering managers. We also recruit for sales, marketing, finance, and operations positions across Latin America." }
    },
    {
      "@type": "Question",
      "name": "How do you vet candidates?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every candidate goes through a multi-layer validation: resume and background review, behavioral interview, technical assessment (live coding, system design, or domain-specific tests depending on the role), English proficiency evaluation, and culture-fit analysis. Only candidates who pass all stages are shortlisted." }
    },
    {
      "@type": "Question",
      "name": "Who owns the IP for work produced by the hire?",
      "acceptedAnswer": { "@type": "Answer", "text": "You do. Since the candidate is hired directly on your payroll or as your contractor, 100% of the intellectual property belongs to your company. We recommend including IP assignment clauses in your employment or service agreement." }
    },
    {
      "@type": "Question",
      "name": "How is Direct Hire different from Outsourcing & Staffing?",
      "acceptedAnswer": { "@type": "Answer", "text": "With Direct Hire, we find the talent and you hire them on your payroll. You pay a one-time 18% fee and manage the professional directly. With Outsourcing and Staffing, the professional works dedicated to your team but remains on our payroll — you pay a flat monthly fee that includes salary, taxes, and management. Direct Hire is best when you want full control. Outsourcing and Staffing is best when you want zero HR overhead." }
    }
  ]
};

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

/**
 * /calculator — WebApplication schema. Free tools are a distinct entity type
 * for search and answer engines; typing the calculator as a WebApplication
 * (rather than leaving it an untyped page) makes it eligible for tool-style
 * citations ("use Kaptas Global's Brazil hiring cost calculator").
 */
export const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Brazil Hiring Cost Calculator",
  "url": `${SITE_URL}/calculator`,
  "description": "Free interactive calculator showing what it costs to hire Brazilian tech professionals by role and seniority, across both hiring models: Outsourcing & Staffing (flat all-in monthly cost) and Direct Hire (one-time 18% placement fee). Benchmarks are based on real Kaptas Global placements and market-mapping data.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": { "@id": ORG_ID }
};

export const calculatorFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": FAQ_SPEAKABLE,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the Brazil hiring cost calculator show?",
      "acceptedAnswer": { "@type": "Answer", "text": "The calculator shows benchmark cost ranges for hiring Brazilian tech professionals by role and seniority, under both Kaptas Global hiring models. For Outsourcing & Staffing it shows the flat all-in monthly cost (salary, Brazilian employment charges, and management fee in a single USD invoice). For Direct Hire it shows the professional's expected first-year compensation and the one-time 18% placement fee derived from it." }
    },
    {
      "@type": "Question",
      "name": "What is included in the monthly cost shown for Outsourcing & Staffing?",
      "acceptedAnswer": { "@type": "Answer", "text": "The monthly figure is all-in: the professional's salary, all mandatory Brazilian employment charges (which typically add 70 to 80% above gross salary under CLT contracts), Kaptas Global's management fee, and ongoing HR support. You receive one USD invoice with no separate charges for payroll, taxes, benefits, or compliance, and unlimited replacements are included." }
    },
    {
      "@type": "Question",
      "name": "Why is hiring in Brazil 40 to 60% cheaper than hiring in the US?",
      "acceptedAnswer": { "@type": "Answer", "text": "Brazilian compensation benchmarks are 40 to 60% lower than US equivalents at the same seniority, driven by local cost of living and currency, not by lower talent quality. Brazil has more than 1.5 million tech graduates and its engineers are actively recruited by companies like Google, Netflix, Microsoft, and Stripe. The GMT-3 timezone also gives 5 to 8 hours of daily overlap with US teams, so the savings come without offshore hand-off friction." }
    },
    {
      "@type": "Question",
      "name": "How accurate are these salary benchmarks?",
      "acceptedAnswer": { "@type": "Answer", "text": "The ranges come from real Kaptas Global placements and from the market-mapping research behind the Executive Mapping service, and they are refreshed periodically. They are benchmarks, not quotes: the exact cost for your role depends on the specific skill set and seniority, and is confirmed alongside each candidate profile presented, before any commitment." }
    },
    {
      "@type": "Question",
      "name": "How do I get an exact number for my role?",
      "acceptedAnswer": { "@type": "Answer", "text": "Submit the form on the calculator page with the role you are hiring for. Kaptas Global responds with current benchmarks for that exact profile and, if you want to proceed, a pre-vetted shortlist of candidates within 5 business days, each presented with their all-in cost. There are no retainers and no upfront fees under either hiring model." }
    }
  ]
};
