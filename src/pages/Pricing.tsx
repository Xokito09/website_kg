import { SEO } from "../components/SEO";
import { organizationSchema, pricingFaqSchema, pricingServiceSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { LeadGenerationForm } from "../components/home/LeadGenerationForm";
import { SocialProof } from "../components/home/SocialProof";
import { CaseResults, defaultCases } from "../components/home/CaseResults";
import { PricingFAQ } from "../components/pricing/PricingFAQ";

const pricingCases = [
  defaultCases[0],
  {
    tag: "Case 02 // Market Entry",
    metricPrefix: "0→",
    metric: "5",
    title: "First hires in a new market",
    description: "A Chinese oil company needed to build their entire Brazil operation from scratch. No local knowledge, no network, no compensation benchmarks. We mapped the market, defined the hiring structure, and placed five key roles including General Manager, Marketing Manager, and HR. Every hire came with the local network needed to generate new business from day one.",
    colorClass: "bg-kaptas-purple",
    glowClass: "bg-neon-blue/10"
  },
  defaultCases[2]
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
};

const pricingBreadcrumb = buildBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Pricing", url: `${SITE_URL}/pricing` },
]);

export default function Pricing() {
  return (
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Pricing — Kaptas Global | Hire Brazilian Talent at 18% or Flat Monthly Cost"
        description="Transparent pricing for hiring Brazilian professionals. Direct Hire at 18% one-time fee, Outsourcing & Staffing at a flat monthly cost. No retainers, no hidden fees. Replacement guarantee included."
        canonical="https://kaptasglobal.io/pricing"
        eyebrow="Pricing"
        ogTitle="Transparent Pricing for Hiring in Brazil"
        ogSubtitle="Direct Hire 18% one-time. Outsourcing flat monthly. No retainers. No hidden fees."
        schemas={[organizationSchema, pricingServiceSchema, pricingFaqSchema, pricingBreadcrumb]}
      />
      <div>
        {/* 1. Hero */}
        <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 px-6 md:px-12 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_top_right,_#0047FF33,transparent_80%)] blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
              className="flex flex-col items-center -mt-[120px]"
            >
              <h1 className="font-semibold tracking-tight leading-[1.1] mb-8 mt-10">
                <span className="block text-[48px] md:text-[64px] text-white">
                  Know exactly what you pay
                </span>
                <span className="block mt-2 text-[48px] md:text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                  before you hire
                </span>
              </h1>
              
              <p className="relative text-xl md:text-2xl leading-relaxed font-light text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af_35%,#e2e8f0_45%,#ffffff_50%,#e2e8f0_55%,#9ca3af_65%)] animate-shimmer max-w-2xl text-center">
                No upfront or hidden costs. Your trusted partner in Brazil.
                <span 
                  className="absolute inset-0 text-transparent bg-clip-text bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.5)_45%,#ffffff_50%,rgba(255,255,255,0.5)_55%,transparent_65%)] animate-shimmer blur-[6px] pointer-events-none"
                  aria-hidden="true"
                >
                  No upfront or hidden costs. Your trusted partner in Brazil.
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Two pricing cards */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20 -mt-24 lg:-mt-48"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 mt-[60px]">
          {/* Outsourcing & Staffing */}
          <motion.div 
            variants={staggerItem}
            className="group relative bg-[#0047FF]/20 rounded-[2rem] p-[1px] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,71,255,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0047FF]/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700" style={{ backgroundSize: '200% 100%' }}></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0047FF]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0047FF]/15 transition-colors duration-700 pointer-events-none"></div>
            
            <div className="relative bg-[#0A0A0A] rounded-[calc(2rem-1px)] p-8 md:p-10 h-full flex flex-col z-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">Outsourcing & Staffing</h2>
              </div>
              
              <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-white/10">
                <span className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-[#00d26a] tracking-tight">Flat</span>
                <span className="text-base text-gray-400 font-light">monthly cost</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "One monthly cost including salary and fees",
                  "Full-time contractors integrated into your team",
                  "Unlimited replacement at no cost",
                  "Every candidate interviewed by a founder"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="w-4 h-4 text-kaptas-green/70 shrink-0" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">EXAMPLES</div>
                <div className="space-y-3">
                  {[
                    { role: "Senior Full-stack Engineer", cost: "$4k - $6k/month" },
                    { role: "QA Engineer", cost: "$3k - $5k/month" },
                    { role: "Mobile Engineer", cost: "$4k - $6k/month" },
                    { role: "Data Engineer", cost: "$4.5k - $7k/month" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-400">{item.role}</span>
                      <span className="font-mono text-white">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link to="/contractor-staffing" className="inline-flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-xl text-white font-medium transition-all group/btn">
                <span>Learn more about Staffing</span>
                <ArrowRight className="w-5 h-5 text-kaptas-green group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Direct Hire */}
          <motion.div 
            variants={staggerItem}
            className="group relative bg-kaptas-purple/20 rounded-[2rem] p-[1px] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(232,185,35,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-kaptas-purple/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700" style={{ backgroundSize: '200% 100%' }}></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kaptas-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 group-hover:bg-kaptas-purple/15 transition-colors duration-700 pointer-events-none"></div>
            
            <div className="relative bg-[#0A0A0A] rounded-[calc(2rem-1px)] p-8 md:p-10 h-full flex flex-col z-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">Direct Hire</h2>
              </div>
              
              <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-white/10">
                <span className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-[#00d26a] tracking-tight">18%</span>
                <span className="text-base text-gray-400 font-light">one-time fee</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Pay only after a successful hire",
                  "90 to 180-day replacement at no cost",
                  "Full candidate vetting and screening",
                  "Every candidate interviewed by a founder"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="w-4 h-4 text-kaptas-green/70 shrink-0" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">WHAT'S INCLUDED</div>
                <ul className="space-y-3">
                  {[
                    "Dedicated search for your role",
                    "English proficiency screening",
                    "Technical and cultural-fit evaluation",
                    "Shortlist delivered within 5 days",
                    "Onboarding support after placement"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link to="/direct-hire" className="inline-flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-xl text-white font-medium transition-all group/btn">
                <span>Learn more about Direct Hire</span>
                <ArrowRight className="w-5 h-5 text-kaptas-green group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
      </div>

      {/* 5. Stats strip + Logo bar */}
      {/* <SocialProof /> */}

      {/* 3. Tailored services */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full relative">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-kaptas-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-10 md:p-16 overflow-hidden">
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none"></div>
          
          <div className="mb-16 max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">Need market intelligence or help entering Brazil?</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Executive Mapping and Hire in Brazil are scoped as custom projects. Pricing depends on role complexity, competitor coverage, geographic reach, and depth of analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {/* Executive Mapping */}
            <div className="group relative bg-white/[0.02] border border-white/5 hover:border-kaptas-purple/30 rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.04]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-kaptas-purple/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-kaptas-purple transition-colors duration-300">Executive Mapping</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                  Custom project. 20-30 leadership profiles, compensation benchmarks, competitor analysis, and a ranked shortlist delivered in 10-15 business days.
                </p>
                <Link to="/executive-mapping" className="inline-flex items-center gap-2 text-white font-medium hover:text-kaptas-purple transition-colors group/link text-sm uppercase tracking-wider">
                  Request a proposal <ChevronRight className="w-4 h-4 text-kaptas-purple group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Hire in Brazil */}
            <div className="group relative bg-white/[0.02] border border-white/5 hover:border-[#0047FF]/30 rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.04]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0047FF]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#0047FF] transition-colors duration-300">Hire in Brazil</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                  Custom engagement. Competitor landscape, compensation benchmarking, hiring-model recommendation, and end-to-end recruitment for your first local hire.
                </p>
                <Link to="/hire-in-brazil" className="inline-flex items-center gap-2 text-white font-medium hover:text-[#0047FF] transition-colors group/link text-sm uppercase tracking-wider">
                  Request a proposal <ChevronRight className="w-4 h-4 text-[#0047FF] group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case Results */}
      <div className="text-white w-full relative z-10">
        <CaseResults cases={pricingCases} />
      </div>

      {/* 6. Form */}
      <div id="lead-form" className="w-full flex flex-col">
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <LeadGenerationForm 
          headline={<>Let's build your <span className="font-semibold text-[#111111]">hiring strategy</span> for Brazil</>}
          subtext="Let us know what you need, and we'll get back to you with a tailored proposal."
          ctaText="Start for free"
        />
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      {/* 7. FAQ */}
      <PricingFAQ />
    </div>
  );
}
