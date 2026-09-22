/**
 * faqs.ts — the visible FAQ copy for every page that has an accordion.
 *
 * Why it lives here and not next to each accordion:
 * every one of these answers has to appear twice — once in the accordion a
 * visitor reads, once in the FAQPage schema an answer engine parses. They used
 * to be written out separately, and they drifted: on 2026-09-22 the Home
 * schema claimed "Kaptas Global charges no retainers, no deposits, and no
 * recruitment fees upfront" while the visible answer said "there is no
 * retainer and no deposit", and four pages had schema questions that were not
 * on the page at all. Structured data that does not match the visible page is
 * the thing Google's own guidance calls out, and an answer engine quoting a
 * sentence a prospect cannot find on the page is worse than no schema.
 *
 * Now both read this file: the accordion renders it, and buildFaqSchema() in
 * seoSchemas.ts derives the FAQPage from the same array. The visible text is
 * the truth; the schema follows it by construction and cannot diverge.
 *
 * Entity answers (the last item of each array) come from entityFaq.ts and are
 * two paragraphs split with "\n\n" — FaqAnswer renders the split, the schema
 * carries it literally.
 *
 * Copy is owned by kg-cmo. Editing an answer here changes the page and the
 * structured data together, which is the point.
 */

import { ENTITY_FAQ } from "./entityFaq";
import { STAFFING_COST_COMPOSITION } from "./claims";

export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQS: FaqItem[] = [
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

export const PRICING_FAQS: FaqItem[] = [
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
    a: `The flat monthly cost covers ${STAFFING_COST_COMPOSITION}. You receive one USD invoice with no separate charges for payroll, taxes, benefits, or compliance, and unlimited replacements are included. For example, a Senior Full-stack Engineer in Brazil ranges from $4k to $6k per month, all-in.`
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
  },
  {
    q: ENTITY_FAQ.pricing.q,
    a: ENTITY_FAQ.pricing.a,
  }
];

export const DIRECT_HIRE_FAQS: FaqItem[] = [
  {
    q: "How does direct hire work when hiring remote talent in Brazil?",
    a: "Kaptas Global sources, screens, and presents a shortlist of pre-vetted candidates for your open role. You interview the finalists, choose who to hire, and bring them onto your own team. We charge a one-time finder's fee paid only after the professional starts. After placement, there are no ongoing fees, no middleman, and no dependency on Kaptas Global. You run the payroll, you manage the person, you own the relationship."
  },
  {
    q: "How long does it take to hire through Kaptas Global?",
    a: "Most clients receive a shortlist of 3 to 5 pre-vetted candidates within 5 business days. Most hires close within 2 to 4 weeks of kickoff. For context, the industry average to hire a senior engineer is 35 to 45 days when recruiting internally, and up to 90 days for hard-to-fill roles."
  },
  {
    q: "How much does direct hire cost, and when do I pay?",
    a: "Kaptas Global charges a one-time finder's fee of 18% of the candidate's annual salary. There is no upfront payment. You pay nothing until the professional starts working. If you interview our candidates and decide not to hire, the cost is zero."
  },
  {
    q: "What happens if the hire does not work out?",
    a: "Every placement through Kaptas Global includes a 90 to 180-day replacement warranty at no additional cost. If the professional leaves or underperforms during the warranty period, we restart the search and present new candidates within the same 5-day shortlist timeline. The U.S. Department of Labor estimates a bad hire costs roughly 30% of annual salary. Our warranty exists to eliminate that risk."
  },
  {
    q: "Can I hire as a contractor or for a permanent role?",
    a: "Both. Kaptas Global supports contractor (PJ) and permanent (CLT) placements in Brazil. Most US companies hire Brazilian professionals as independent contractors, which avoids the need for a local entity. We help you choose the right structure based on your needs and walk you through the differences."
  },
  {
    q: "Do I need to open a company in Brazil to hire directly?",
    a: "No. Most clients hire Brazilian professionals as independent contractors without a local entity. The professional invoices your company directly, and you pay in USD or BRL depending on your preference. If you prefer a formal employment relationship, an Employer of Record (EOR) can handle local compliance on your behalf. Kaptas Global advises on the best path but does not act as an EOR."
  },
  {
    q: "How does Kaptas Global vet candidates before I interview them?",
    a: "We evaluate every candidate across five dimensions: technical and functional fit for your stack, business-level English through a live assessment, remote work maturity, understanding of the contractor model, and cultural alignment with your team. Only candidates who pass all five are presented. You interview finalists, not raw applicants."
  },
  {
    q: "Who owns the intellectual property after a direct hire placement?",
    a: "You do. Since the professional joins your team directly, all code, data, designs, and deliverables belong to your company. Kaptas Global recommends including IP assignment clauses in your contract with the hire, and we can share templates that our clients use."
  },
  {
    q: "What is the timezone overlap between Brazil and the United States?",
    a: "Brazil is 1 to 4 hours ahead of US Eastern Time, depending on the region. Teams on the East Coast get near-full overlap. West Coast teams typically share 4 to 6 hours of synchronous working time, which is enough for daily standups, code reviews, and real-time collaboration without overnight handoffs."
  },
  {
    q: "What makes Kaptas Global different from other recruitment firms hiring in Brazil?",
    a: "Kaptas Global is a US-incorporated company founded by Brazilians with direct access to the Brazilian talent market. We headhunt employed professionals from top-tier companies rather than pulling from job boards or recycled databases. Every search is built around your specific stack, seniority level, and team culture. With over 300 placements, a 2 to 4 week average time to hire, and a replacement warranty on every placement, we operate as a strategic hiring partner, not a resume vendor."
  },
  {
    q: ENTITY_FAQ.directHire.q,
    a: ENTITY_FAQ.directHire.a,
  }
];

export const OUTSOURCING_FAQS: FaqItem[] = [
  {
    q: "How does outsourcing and staffing work when hiring remote talent in Brazil and Latin America?",
    a: "Outsourcing and staffing through Kaptas Global means we source, vet, and place a remote professional on your team while handling payroll, taxes, and compliance on an ongoing basis. You manage the talent's daily work, own everything they produce, and receive one monthly invoice in USD. There is no need to open a local entity in Brazil or any other Latin American country, which makes this the simplest nearshore hiring model available. This model works for engineering, finance, operations, design, and any other function where remote collaboration is viable."
  },
  {
    q: "How does Kaptas Global find and source talent in Brazil and Latin America?",
    a: "Kaptas Global sources professionals through direct outreach, not job boards or inbound databases. Every search is built from scratch around the client's requirements, including tech stack, seniority, function, and team culture. We target professionals who are currently employed at strong companies across Brazil and Latin America and reach them with credibility, context, and clarity from the first message. No profiles are recycled between searches. Being a US company founded by Brazilians gives Kaptas Global native access to local networks, cultural nuance, and market intelligence that foreign agencies cannot replicate."
  },
  {
    q: "What does Kaptas Global validate beyond the resume when screening candidates from Brazil and Latin America?",
    a: "Kaptas Global validates five dimensions beyond the resume before presenting any candidate: functional and technical fit for the client's specific needs, business-level English through live assessment, remote maturity and async communication habits, understanding of the contractor engagement model, and cultural alignment with the client's team. A strong resume alone is never enough to pass screening. Kaptas Global only presents candidates who have been validated across all five dimensions, regardless of whether the role is in engineering, finance, design, or operations."
  },
  {
    q: "How long does it take to hire remote professionals in Brazil or Latin America through Kaptas Global?",
    a: "Kaptas Global typically delivers a shortlist of three pre-vetted candidates within five business days of kickoff. Most hires close within 2 to 4 weeks of the first alignment call. Kaptas Global achieves this speed through direct sourcing and a structured screening process that eliminates wasted interviews and low-signal candidates."
  },
  {
    q: "How much does it cost to hire professionals in Brazil compared to the United States?",
    a: "Kaptas Global charges one monthly invoice in USD that covers the professional's compensation, Brazilian taxes, and the service fee. There are no hidden charges, no setup fees, and no currency conversion on the client's side. The total loaded cost for a senior professional hired in Brazil through Kaptas Global is typically up to 60 percent lower than a comparable US hire at the same seniority level, without sacrificing quality or timezone overlap. A detailed salary comparison by role and seniority is available on the cost comparison section of this page."
  },
  {
    q: "Is there any upfront cost to start hiring talent in Brazil through Kaptas Global?",
    a: "Kaptas Global charges zero upfront cost to begin an engagement. Sourcing, vetting, and candidate presentations are completely free. Clients pay nothing until they decide to hire and the professional starts working. This zero-risk model applies to every engagement regardless of the number of roles or the function being hired, and no local entity is required to get started."
  },
  {
    q: "What is Kaptas Global's replacement guarantee if a professional leaves or underperforms?",
    a: "Kaptas Global's replacement guarantee has no time limit and no additional cost. Because the service fee is billed monthly, replacements are fully covered for as long as the engagement lasts. If a professional leaves or underperforms, Kaptas Global begins a new search immediately and presents replacement candidates within the same five-day shortlist timeline. There is no additional placement fee and no gap in coverage."
  },
  {
    q: "Who owns the intellectual property and code produced by remote professionals hired through Kaptas Global?",
    a: "The client owns 100 percent of all code, data, designs, documents, and deliverables produced by the professional hired through Kaptas Global. Full IP ownership and code ownership are written into every Kaptas Global contract. There are no exceptions, no shared ownership clauses, and no transfer fees. The talent works under the client's direction, and everything they build belongs to the client from day one."
  },
  {
    q: "What is the timezone overlap between Brazil, Latin America, and the United States for nearshore remote teams?",
    a: "Brazil is one to four hours ahead of US Eastern Time, which provides full overlap during standard US business hours. Professionals hired through Kaptas Global in Brazil and across Latin America join standups, sprint reviews, syncs, and collaborative sessions on the client's regular schedule. West Coast teams get four to six hours of direct overlap, which is enough for full synchronous collaboration without overnight handoffs. This nearshore timezone proximity is one of the key advantages of hiring remote teams in Latin America over offshore regions like Eastern Europe or Asia."
  },
  {
    q: "Can I cancel my outsourcing and staffing engagement with Kaptas Global at any time?",
    a: "Kaptas Global requires no minimum contract term, no lock-in period, and no cancellation penalty. Clients can scale down the number of professionals or end the engagement entirely at any time with no financial consequence. There is no long-term commitment required to work with Kaptas Global."
  },
  {
    q: ENTITY_FAQ.outsourcingStaffing.q,
    a: ENTITY_FAQ.outsourcingStaffing.a,
  }
];

export const EXECUTIVE_MAPPING_FAQS: FaqItem[] = [
 { 
    q: "What is executive mapping and why does it matter before a leadership hire?", 
    a: "Executive mapping is a market intelligence engagement that gives you a complete picture of the leadership talent available for a specific role before you commit to a search. Kaptas Global maps 20 to 30 real professionals for a target position in Brazil or Latin America, delivering competitor compensation analysis, team structures, salary benchmarks, and a ranked shortlist of the strongest candidates. It matters because at the leadership level, hiring without data leads to misaligned offers, missed candidates, and costly wrong hires. Instead of starting a 3 to 6 month executive search blind, you enter the process knowing exactly who is out there, what they earn, and who is worth pursuing. The mapping report is a standalone product. You receive the full intelligence, own everything, and decide what to do next." 
  },
  { 
    q: "What does an executive mapping report include?", 
    a: "A Kaptas Global executive mapping report covers seven core deliverables, each tailored to the client's specific role, industry, and competitive landscape. First, we map 20 to 30 qualified professionals currently holding the target role or an adjacent one in Brazil or Latin America, with validated profiles including company, seniority, experience, and estimated compensation. Second, we identify the top candidates and rank them based on experience depth, leadership scope, cultural fit, and availability. The report also includes competitor compensation analysis broken down by salary, bonuses, equity, and benefits across company sizes and stages; salary and benefits benchmarks for the specific role using real sourcing data, not surveys; team structure intelligence covering reporting lines, team size, and seniority mix at comparable organizations; a hiring landscape overview with candidate concentration by city, industry competitiveness, and realistic hiring timelines; and a hiring model recommendation, whether PJ contractor, CLT permanent, or EOR, based on the client's structure and goals. Every engagement is custom-scoped. There are no template reports." 
  },
  { 
    q: "Who is executive mapping for?", 
    a: "Executive mapping is designed for companies that need to hire C-level executives, country managers, VPs, directors, or other senior leadership roles in Brazil or Latin America and want real market data before committing to a search. Kaptas Global works with US-based companies, European firms, and any organization worldwide that is expanding into or operating in Brazil and needs to understand the leadership talent landscape. Typical clients include companies opening a Brazil operation for the first time, boards evaluating compensation for an incoming executive, and leadership teams benchmarking their structure against competitors. If the role carries strategic weight and the cost of a wrong hire is measured in quarters rather than weeks, executive mapping is the right starting point." 
  },
  { 
    q: "How long does an executive mapping engagement take?", 
    a: "Kaptas Global delivers a completed executive mapping report in 10 to 15 business days after the intro call. This is significantly faster than a traditional executive search, which typically runs 3 to 6 months from kickoff to offer acceptance. The timeline reflects the depth of the work: every mapped professional is sourced and validated directly through active outreach, not pulled from a static database. Kaptas Global analyses competitor structures, verifies compensation data, and ranks candidates before delivering the final report. The intro call typically covers the target role, seniority level, key competitors to benchmark, and any specific intelligence questions the client needs answered." 
  },
  { 
    q: "How much does executive mapping cost?", 
    a: "There is no fixed price for Kaptas Global's executive mapping service. Each engagement is scoped as a custom project based on the target role, seniority level, number of competitors to benchmark, geographic coverage, and the depth of intelligence required. After the intro call, Kaptas Global builds a tailored proposal that reflects exactly what the client needs, with no unnecessary steps or inflated scope. Pricing is structured as a retainer and discussed directly during the first conversation." 
  },
  { 
    q: "What happens after I receive the mapping report?", 
    a: "The report and all data belong to you. Kaptas Global transfers full ownership of the candidate profiles, compensation benchmarks, team structure analysis, and strategic recommendations. After delivery, you have three options: activate a search through Kaptas Global to engage and place one of the identified candidates; run your own hiring process using the mapped shortlist and market data; or hold the intelligence for a future hire, internal benchmarking, or board presentation. There is no lock-in, no contingency fee tied to future hires, and no obligation to continue with Kaptas Global beyond the mapping engagement." 
  },
  { 
    q: "Why should I map the market before making a leadership hire in Brazil?", 
    a: "A wrong executive hire costs more than salary. Research shows it can reach 200% or more of the role's annual compensation when factoring in lost productivity, team disruption, strategic delays, and the cost of restarting the search. Studies also indicate that 46% of newly hired executives fail within 18 months, most often due to poor cultural or strategic fit rather than lack of technical ability. Executive mapping reduces that risk by giving you a clear view of who is available, what they earn, how competitor teams are structured, and which candidates are the strongest fit for your specific context, all before you invest in a full search. Kaptas Global's mapping provides competitive intelligence delivered as a standalone product in 10 to 15 business days." 
  },
  { 
    q: "Can Kaptas Global map roles beyond Brazil?", 
    a: "Yes. While Kaptas Global's deepest network and sourcing capability is in Brazil, executive mapping engagements can cover leadership roles across Latin America, including Argentina, Mexico, Colombia, and Chile. If the target role involves a regional scope or the client needs to compare talent availability across multiple markets, the mapping report can be expanded accordingly. The scope, timeline, and pricing are adjusted during the intro call based on the number of markets and the complexity of the role." 
  },
  {
    q: ENTITY_FAQ.executiveMapping.q,
    a: ENTITY_FAQ.executiveMapping.a,
  }
];

export const HIRE_IN_BRAZIL_FAQS: FaqItem[] = [
 { 
    q: "How can a foreign company hire employees in Brazil without a local entity?", 
    a: "A foreign company can hire in Brazil through an Employer of Record (EOR), a PJ contractor model, or by partnering with a recruitment firm that manages the process end-to-end. Kaptas Global helps companies from the US, UK, Germany, China, and other markets make their first hire in Brazil without requiring entity setup. We recommend the right hiring model (EOR, PJ, or CLT) based on the role, budget, and long-term plan, then handle recruitment and onboarding. The same approach applies to other Latin American markets when expansion goes beyond Brazil." 
  },
  { 
    q: "What does the hiring process look like when expanding to Brazil for the first time?", 
    a: "Kaptas Global runs a structured process: competitor landscape analysis, compensation benchmarking, work-model recommendation (PJ, CLT, or EOR), candidate sourcing, vetting, and placement. The entire cycle typically takes 3 to 6 weeks depending on role complexity. Companies receive market data and a clear hiring structure before any candidate is presented, reducing the risk of misaligned offers or wrong hires. For companies entering Latin America, Brazil is often the first and largest market, and this process sets the foundation for scaling to other countries." 
  },
  { 
    q: "What is the difference between CLT, PJ, and EOR hiring models in Brazil?", 
    a: "CLT is Brazil's formal employment contract with full labor protections (13th salary, FGTS, paid vacation). PJ is a contractor model where the professional invoices through their own company, offering flexibility and lower employer costs. EOR allows a foreign company to hire a CLT employee without setting up a Brazilian entity. Kaptas Global evaluates each role and recommends the best model based on cost, compliance risk, and operational needs. A detailed comparison is available at kaptasglobal.io/blog/hiring-models-brazil-pj-vs-clt/." 
  },
  { 
    q: "How much does it cost to hire an employee in Brazil?", 
    a: "Total employer cost in Brazil typically runs 70-80% above gross salary when using CLT, accounting for 13th salary, vacation bonus, FGTS (8% monthly), INSS (~20%), meal and transport vouchers, and health insurance. Under PJ or EOR models, cost structures differ significantly. Kaptas Global provides a role-specific compensation benchmark before the search begins so companies can plan budgets accurately, not based on generic ranges." 
  },
  { 
    q: "How long does it take to make a first hire in Brazil?", 
    a: "With Kaptas Global, the full cycle from market analysis to placement typically takes 3 to 6 weeks. EOR onboarding after candidate selection adds 3 to 7 business days; PJ contractors can start within 1 to 3 days after contract agreement. Traditional hiring processes without local expertise often stretch to 60-90 days or longer. The difference is having market data, compensation benchmarks, and a vetted candidate pipeline ready before the search starts." 
  },
  { 
    q: "What mandatory benefits must employers provide in Brazil?", 
    a: "Brazilian labor law (CLT) requires 13th salary (one extra month of pay, split into two installments), 30 days of paid vacation plus a one-third vacation bonus, FGTS deposits (8% of monthly salary), INSS employer contributions (~20% of payroll), and transportation vouchers. Many companies also offer meal vouchers and health insurance to remain competitive. Kaptas Global benchmarks benefit packages against local competitors so offers attract the right talent without overspending." 
  },
  { 
    q: "Can Kaptas Global help hire for any role or industry, not just tech?", 
    a: "Yes. While many firms entering Brazil and Latin America focus on technology roles, Kaptas Global supports hiring across all functions: sales, operations, marketing, HR, finance, general management, and executive leadership. We have placed General Managers, Marketing Managers, HR leads, SAP specialists, and Community Managers for companies expanding into the Brazilian and broader Latin American markets. The process adapts to the role, not the other way around." 
  },
  { 
    q: "What happens if a hire does not work out?", 
    a: "Kaptas Global offers a replacement guarantee on every placement. If a hire does not meet expectations within the guarantee period, we restart the search at no additional recruitment cost. This protects companies making their first move into Brazil, where replacing a bad hire can cost over 200% of the role's annual salary when factoring lost productivity, severance, and restart time." 
  },
  { 
    q: "Why hire in Brazil instead of other Latin American countries?", 
    a: "Brazil has the largest professional talent pool in Latin America, with over 1.5 million tech graduates alone and deep executive pipelines in cities like Sao Paulo, Curitiba, and Belo Horizonte. Salary expectations for mid-to-senior roles are significantly lower than US equivalents while maintaining strong technical and business competency. Time zone alignment with US East Coast (1-2 hours difference) and growing bilingual proficiency make Brazil a practical first step for companies expanding into Latin America. Kaptas Global operates across Brazil and can extend searches to Argentina, Mexico, Colombia, and Chile when needed." 
  },
  { 
    q: "Can Kaptas Global help hire in other Latin American countries beyond Brazil?", 
    a: "Yes. While Brazil is the primary market and where Kaptas Global has the deepest network, we support hiring in Argentina, Mexico, Colombia, and Chile. Each country has a different labor framework, compensation structure, and talent profile. Companies expanding across Latin America often start with Brazil as the largest and most strategic market, then scale to neighboring countries. Kaptas Global adapts the process (competitor analysis, compensation benchmarking, model recommendation, and recruitment) to each country's specifics." 
  },
  {
    q: ENTITY_FAQ.hireInBrazil.q,
    a: ENTITY_FAQ.hireInBrazil.a,
  }
];
