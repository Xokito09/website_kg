import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, executiveMappingFaqSchema, executiveMappingServiceSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
import { AEO_PARAGRAPHS } from "../data/aeoContent";
import { useState } from "react";
import { useContactForm } from "../hooks/useContactForm";
import { ThankYouModal } from "../components/ThankYouModal";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Search, Users, Globe, FileText, Zap, DollarSign, Target, Filter, Code2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LeadGenerationForm } from "../components/home/LeadGenerationForm";
import { SocialProof } from "../components/home/SocialProof";
import { CaseResults } from "../components/home/CaseResults";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as any }
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
};

export default function ExecutiveMapping() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { form: heroForm, handleChange: handleHeroChange, handleSubmit: handleHeroSubmit, isSubmitting: heroSubmitting, showModal: heroModal, setShowModal: setHeroModal, error: heroError, captcha: heroCaptcha } = useContactForm("Executive Mapping — Hero", "dark");

  const faqs = [
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
    }
  ];

  return (
    <>
    <ThankYouModal isOpen={heroModal} onClose={() => setHeroModal(false)} />
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Executive Mapping in Brazil and Latin America | Talent Intelligence | Kaptas Global"
        description="Kaptas Global maps 20-30 leadership professionals for your target role in Brazil and Latin America. Competitor compensation analysis, team structures, salary benchmarks, and a ranked shortlist of top candidates. Delivered in 10-15 business days."
        keywords="executive mapping Brazil, executive talent mapping Latin America, leadership hiring Brazil, competitor compensation analysis Brazil, C-level salary benchmarks Brazil, talent intelligence Brazil, hire country manager Brazil, executive search Brazil, Kaptas Global, talent mapping Latin America"
        canonical="https://kaptasglobal.io/executive-mapping"
        eyebrow="Executive Mapping"
        ogTitle="Map the Leadership Market in Brazil"
        ogSubtitle="Competitor comp, team structures, ranked shortlist. 10-15 business days."
        schemas={[
          organizationSchema,
          executiveMappingServiceSchema,
          executiveMappingFaqSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Executive Mapping", url: `${SITE_URL}/executive-mapping` },
          ]),
        ]}
      />
      <AEOContent paragraph={AEO_PARAGRAPHS.executiveMapping} label="Executive Mapping service overview" />
      {/* 1. Hero with Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-[85vh] flex items-start pt-32 md:pt-40 px-6 md:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_top_right,_#0047FF33,transparent_80%)] blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as any }}
            className="max-w-3xl -mt-[80px]"
          >
            <div className="inline-flex items-center gap-2 bg-kaptas-green/10 text-kaptas-green px-4 py-2 rounded-sm text-xs font-bold border border-kaptas-green/20 mb-8 tracking-widest uppercase backdrop-blur-md">
              <span className="w-2 h-2 bg-kaptas-green rounded-full animate-pulse"></span>
              EXECUTIVE MAPPING
            </div>
            <h1 className="font-semibold tracking-tight leading-[1.1] mb-8">
              <span className="block mt-[6px] text-[30px] text-[#6a7282]">Executive talent intel in Brazil</span>
              <span className="block mt-1 -mr-[500px] whitespace-nowrap text-[52px] text-white">
                Know the market
              </span>
              <span className="block mt-1 text-[52px] text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                before making a move
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light max-w-xl">
              We map 20-30 professionals for your target role. Competitor analysis, compensation benchmarks, and top candidates identified.
            </p>

            <div className="border-l-2 border-kaptas-purple/50 pl-5 max-w-xl mb-12 mt-[120px]">
              <p className="text-base text-gray-400 leading-relaxed font-light">
                Kaptas Global is a US-incorporated company founded by Brazilians. Every mapping engagement is built from scratch using real market intelligence, not recycled reports.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-[50px] max-w-2xl">
              {[
                "20-30 professionals mapped per role",
                "Competitor compensation analysis",
                "Top candidates identified",
                "Delivered in 10-15 business days"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium w-full">
                  <CheckCircle2 className="w-5 h-5 text-kaptas-green shrink-0" />
                  <span>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Lead Generation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" },
              x: { duration: 0.8, delay: 0.4, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-full max-w-[500px] mx-auto mt-12 lg:mt-0 -mt-[30px]"
          >
            <div className="relative group">
              {/* Glow Effect Layer */}
              <div className="absolute -inset-[1px] rounded-3xl overflow-hidden blur-md opacity-60 pointer-events-none">
                {/* Line 1 (Blue/Green) */}
                <div className="absolute inset-[-100%] animate-[spin_12s_linear_infinite]">
                  <div className="w-full h-full animate-pulse bg-[conic-gradient(from_0deg,transparent_0_120deg,#0047FF1A_200deg,#0047FF_280deg,#00B356_360deg)]" style={{ animationDuration: '7s' }}></div>
                </div>
                {/* Line 2 (Green/Yellow) */}
                <div className="absolute inset-[-100%] animate-[spin_17s_linear_infinite]">
                  <div className="w-full h-full animate-pulse bg-[conic-gradient(from_0deg,transparent_0_120deg,#00B3561A_200deg,#00B356_260deg,#E8B923_310deg,#E8B923_360deg)]" style={{ animationDuration: '11s' }}></div>
                </div>
              </div>

              {/* Main Form Layer */}
              <div className="relative rounded-3xl p-[1px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gray-200/10">
                {/* Line 1 (Blue/Green) */}
                <div className="absolute inset-[-100%] animate-[spin_12s_linear_infinite]">
                  <div className="w-full h-full animate-pulse bg-[conic-gradient(from_0deg,transparent_0_120deg,#0047FF1A_200deg,#0047FF_280deg,#00B356_360deg)]" style={{ animationDuration: '7s' }}></div>
                </div>
                {/* Line 2 (Green/Yellow) */}
                <div className="absolute inset-[-100%] animate-[spin_17s_linear_infinite]">
                  <div className="w-full h-full animate-pulse bg-[conic-gradient(from_0deg,transparent_0_120deg,#00B3561A_200deg,#00B356_260deg,#E8B923_310deg,#E8B923_360deg)]" style={{ animationDuration: '11s' }}></div>
                </div>
                
                {/* Inner Form Container */}
                <div className="bg-[#111111] rounded-[23px] p-8 md:p-10 relative z-10 h-full w-full">
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold text-white -mt-[5px]">Get your market intel</h3>
                  </div>
                  <form className="space-y-4 mt-1" onSubmit={handleHeroSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="hero-name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Name <span aria-hidden="true" className="text-kaptas-green">*</span></label>
                        <input
                          type="text"
                          id="hero-name"
                          name="name"
                          value={heroForm.name}
                          onChange={handleHeroChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all placeholder:text-gray-400 mt-1"
                          placeholder="First and Last name"
                        />
                      </div>
                      <div>
                        <label htmlFor="hero-company" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Company Name</label>
                        <input
                          type="text"
                          id="hero-company"
                          name="company"
                          value={heroForm.company}
                          onChange={handleHeroChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg pr-4 pl-[17px] py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all placeholder:text-gray-400 mt-1"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hero-email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Work Email <span aria-hidden="true" className="text-kaptas-green">*</span></label>
                      <input
                        type="email"
                        id="hero-email"
                        name="email"
                        value={heroForm.email}
                        onChange={handleHeroChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all placeholder:text-gray-400 mt-1"
                        placeholder="Your work email"
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-comment" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">How can we help?</label>
                      <textarea
                        id="hero-comment"
                        name="message"
                        value={heroForm.message}
                        onChange={handleHeroChange}
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all resize-none placeholder:text-gray-400 mt-1"
                        placeholder="Tell us about your hiring needs..."
                      ></textarea>
                    </div>

                    {heroError && <p className="text-red-400 text-sm">{heroError}</p>}
                    {heroCaptcha}
                    <button
                      type="submit"
                      disabled={heroSubmitting}
                      className="w-full bg-kaptas-green text-[#111111] font-semibold text-sm rounded-lg px-6 py-3.5 hover:bg-[#00994A] transition-all flex items-center justify-center gap-2 group mt-[25px] shadow-[0_0_20px_rgba(0,179,86,0.15)] hover:shadow-[0_0_25px_rgba(0,179,86,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {heroSubmitting ? "Sending..." : "Book a call"}
                      {!heroSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full py-16 relative z-10 flex flex-col items-center"
      >
        {/* Separator Line */}
        <div className="w-full max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 -mt-[90px] relative z-10"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            <div className="flex flex-col items-center text-center">
              <span className="text-[40px] leading-[48px] font-semibold text-kaptas-green mb-2 tracking-tight">20+</span>
              <span className="text-base font-medium text-gray-300 mb-1">Years</span>
              <span className="text-gray-500 text-xs uppercase tracking-wider">Combined experience in<br />Brazil's tech market</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[40px] leading-[48px] font-semibold text-kaptas-green mb-2 tracking-tight">100+</span>
              <span className="text-base font-medium text-gray-300 mb-1">Clients</span>
              <span className="text-gray-500 text-xs uppercase tracking-wider">US and global<br />companies served</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[40px] leading-[48px] font-semibold text-kaptas-green mb-2 tracking-tight">300+</span>
              <span className="text-base font-medium text-gray-300 mb-1">Placements</span>
              <span className="text-gray-500 text-xs uppercase tracking-wider">Engineers and specialists<br />hired and placed</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[40px] leading-[48px] font-semibold text-kaptas-green mb-2 tracking-tight">75%</span>
              <span className="text-base font-medium text-gray-300 mb-1">Rate</span>
              <span className="text-gray-500 text-xs uppercase tracking-wider">Placement on<br />presented finalists</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Clients / Social Proof */}
      <div className="-mt-[50px] relative z-10">
        {/* <SocialProof /> */}
      </div>

      {/* 2. Mapping Report Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="px-6 md:px-12 max-w-7xl mx-auto w-full py-12 md:py-24 relative flex flex-col items-center"
      >
        {/* Top: Typography & Narrative */}
        <div className="max-w-3xl text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]">
            It's not about candidates <br />
            <span className="text-gray-500">It's about strategy</span>
          </h2>
          <p className="relative text-lg md:text-xl leading-relaxed font-light text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af_35%,#e2e8f0_45%,#ffffff_50%,#e2e8f0_55%,#9ca3af_65%)] animate-shimmer">
            We show you the market so you make a data-driven call
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.5)_45%,#ffffff_50%,rgba(255,255,255,0.5)_55%,transparent_65%)] animate-shimmer blur-[6px] pointer-events-none"
              aria-hidden="true"
            >
              We show you the market so you make a data-driven call
            </span>
          </p>
        </div>

        {/* Part 1: Candidate mapping preview */}
        <div className="w-full relative z-10 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Candidate mapping preview</h3>
            <div className="text-sm font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Role mapped: Country Manager, Brazil
            </div>
          </div>

          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400 min-w-[1100px]">
                <thead className="text-xs text-gray-500 uppercase bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Candidate</th>
                    <th className="px-5 py-4 font-semibold">Role & Industry</th>
                    <th className="px-5 py-4 font-semibold">YoE</th>
                    <th className="px-5 py-4 font-semibold">Base</th>
                    <th className="px-5 py-4 font-semibold">Comp Package</th>
                    <th className="px-5 py-4 font-semibold">Team Managed</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: "Ricardo Almeida", role: "Country Manager", industry: "Consumer goods", yoe: 19, salary: "$92K", comp: "2x bonus + company car + profit sharing", team: "64 employees, 6 direct reports", availability: "Open to conversations", fit: 5 },
                    { name: "Fernanda Lopes", role: "Head of LATAM Ops", industry: "SaaS / B2B", yoe: 15, salary: "$85K", comp: "3x bonus + stock options (4-yr vest)", team: "38 employees, 5 direct reports", availability: "Actively exploring", fit: 5 },
                    { name: "Bruno Carvalho", role: "General Manager, Brazil", industry: "Logistics / Supply chain", yoe: 17, salary: "$78K", comp: "2x bonus + company car + fuel allowance", team: "72 employees, 4 direct reports", availability: "Passive, reachable", fit: 4 },
                    { name: "Daniela Ribeiro", role: "VP of Business Dev", industry: "Fintech", yoe: 13, salary: "$72K", comp: "2.5x bonus + stock options + health premium", team: "22 employees, 3 direct reports", availability: "Open to conversations", fit: 3, blurred: true },
                    { name: "Marcos Teixeira", role: "Dir. of Commercial Strategy", industry: "Retail / E-commerce", yoe: 21, salary: "$98K", comp: "4x bonus + RSUs + company car", team: "85 employees, 8 direct reports", availability: "Not actively looking", fit: 4, blurred: true },
                  ].map((c, i) => (
                    <tr key={i} className={`group transition-colors hover:bg-white/[0.02] ${c.blurred ? 'blur-[4px] opacity-40 select-none' : ''}`}>
                      <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{c.name}</td>
                      <td className="px-5 py-4">
                        <span className="text-gray-300 block font-medium whitespace-nowrap">{c.role}</span>
                        <span className="text-gray-600 text-xs mt-0.5 block whitespace-nowrap">{c.industry}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">{c.yoe}</td>
                      <td className="px-5 py-4 text-white font-medium whitespace-nowrap">{c.salary}</td>
                      <td className="px-5 py-4 text-xs leading-relaxed max-w-[220px]">{c.comp}</td>
                      <td className="px-5 py-4 text-xs leading-relaxed max-w-[200px]">{c.team}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 text-gray-300 border border-white/10">
                          {c.availability}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-kaptas-green tracking-widest text-lg whitespace-nowrap">
                        {'★'.repeat(c.fit)}{'☆'.repeat(5-c.fit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white/5 border-t border-white/10 px-6 py-3 text-xs text-gray-500 text-center font-medium">
              5 of 24 professionals mapped for this role
            </div>
          </div>
        </div>

        {/* Part 2: Market intelligence snapshot */}
        <div className="w-full relative z-10">
          <h3 className="text-xl font-bold text-white mb-6">Market intelligence snapshot</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Block 1: Compensation */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Compensation
              </div>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Role</span> <span className="text-white font-medium">Country Manager, Brazil</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Market</span> <span className="text-white">Consumer goods, SaaS, Fintech, Logistics, Retail</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Base salary range</span> <span className="text-white font-medium text-base">$72,000 - $98,000/yr</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Most common bonus structure</span> <span className="text-white">2x to 4x base salary tied to revenue or EBITDA targets</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Equity/stock</span> <span className="text-white">Offered by 40% of mapped companies (mostly SaaS and Fintech)</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Additional benefits</span> <span className="text-white">Company car (60% of roles), international health plan (85%), annual travel budget (35%), relocation support (15%)</span></li>
                <li className="pt-4 mt-2 border-t border-white/10">
                  <span className="text-kaptas-purple font-semibold text-xs uppercase tracking-wider block mb-1">Key insight</span>
                  <span className="text-white font-medium">Candidates currently receiving stock options require 15-25% higher base offers from companies that don't offer equity.</span>
                </li>
              </ul>
            </div>

            {/* Block 2: Team Structure */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                Team Structure
              </div>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Typically reports to</span> <span className="text-white font-medium">CEO, COO, or VP of International</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Direct reports</span> <span className="text-white">3-8 depending on company size and stage</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Average local team size</span> <span className="text-white font-medium text-base">22-85 employees</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Common org model</span> <span className="text-white">Full P&L ownership with regional autonomy on hiring, budget, and vendor contracts</span></li>
                <li className="pt-4 mt-2 border-t border-white/10">
                  <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider block mb-1">Industry variance</span>
                  <span className="text-white">SaaS companies run leaner (20-40 people, flat structure); consumer goods and logistics run deeper (60-85 people, layered hierarchy).</span>
                </li>
              </ul>
            </div>

            {/* Block 3: Landscape */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                Landscape
              </div>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Highest concentration</span> <span className="text-white">São Paulo (58%), Rio de Janeiro (18%), Remote/flexible (14%), Other capitals (10%)</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Market competitiveness</span> <span className="text-white font-medium">High. Professionals at this level change roles every 3-4 years</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Best sourcing window</span> <span className="text-white">Q1 (post-bonus) and early Q4 (pre-budget planning)</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Language</span> <span className="text-white">92% fluent English, 35% also speak Spanish</span></li>
                <li className="pt-4 mt-2 border-t border-white/10">
                  <span className="text-gray-500 font-semibold text-xs uppercase tracking-wider block mb-1">Biggest competitor for talent</span>
                  <span className="text-white">Multinational consumer goods and fintech companies offering aggressive retention packages.</span>
                </li>
              </ul>
            </div>

            {/* Block 4: Recommendation */}
            <div className="bg-[#111111] border border-white/10 border-l-4 border-l-kaptas-green rounded-3xl p-8 shadow-[0_0_30px_rgba(0,179,86,0.05)]">
              <div className="text-[10px] font-bold tracking-widest text-kaptas-green uppercase mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-kaptas-green animate-pulse"></div>
                Kaptas Global Recommendation
              </div>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Recommended hiring model</span> <span className="text-white font-medium">CLT (full employment) due to P&L responsibility, team management, and legal representation</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Recommended package to attract top 3</span> <span className="text-kaptas-green font-bold text-base">$88,000-$98,000 base + 2.5x-3x bonus + company car or equivalent allowance</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Estimated time to close</span> <span className="text-white">25-35 days from search activation</span></li>
                <li className="flex flex-col gap-1"><span className="text-gray-500 text-xs uppercase tracking-wider">Confidence level</span> <span className="text-white font-medium">High (6 of 24 rated 4+ stars, 2 rated 5 stars)</span></li>
                <li className="pt-4 mt-2 border-t border-white/10">
                  <span className="text-kaptas-green font-semibold text-xs uppercase tracking-wider block mb-1">Key insight</span>
                  <span className="text-white">Candidates from consumer goods and logistics show higher openness to new roles than SaaS/fintech candidates, who tend to have stronger retention packages with unvested equity acting as a golden handcuff.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-600 max-w-3xl mx-auto leading-relaxed">
              * This is a sample based on a real engagement structure. Your report is built from scratch for your specific role, market, and competitors. No templates, no recycled data.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. Benefits / Why Us (What makes this different) */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why map before you hire
          </h2>
          <p className="text-lg text-gray-400 font-light">The stakes are higher and the cost of a wrong hire is measured in quarters, not weeks</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Span 2 */}
          <div className="md:col-span-2 bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,_rgba(59,130,246,0.15),_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 text-kaptas-purple font-mono text-[10px] font-bold tracking-widest uppercase mb-4 bg-kaptas-purple/10 px-2.5 py-1 rounded-full border border-kaptas-purple/20">
                  <span className="w-1.5 h-1.5 bg-kaptas-purple rounded-full animate-pulse"></span>
                  STRATEGIC PARTNER
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Built from scratch, tailored to your strategy</h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-xl font-light">
                  We don't build generic industry reports. Every mapping engagement is a custom, targeted deep-dive into your specific competitors and the exact leadership profile you need to hire in Brazil or Latin America. You receive 20-30 mapped professionals with our recommendation of who to pursue first.
                </p>
              </div>
              
              {/* Abstract Visual */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 rounded-full ${i === 2 ? 'bg-kaptas-purple' : 'bg-white/20'}`}></div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-gray-500 tracking-widest">DATA_EXTRACTION</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-green/10">
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,_rgba(0,179,86,0.1),_transparent_60%)]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Aligned with your operation</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  We target executives who already work in your timezone, operate in your industry, and have the network you need. So you can hit the ground running.
                </p>
              </div>
              
              {/* Schedule Visual */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-[10px] font-mono text-gray-500 w-6">US</div>
                  <div className="flex-1 grid grid-cols-8 gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={`us-${i}`} className={`h-2 rounded-sm ${i > 1 && i < 7 ? 'bg-white/30' : 'bg-white/5'}`}></div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[10px] font-mono text-kaptas-green w-6">BR</div>
                  <div className="flex-1 grid grid-cols-8 gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={`br-${i}`} className={`h-2 rounded-sm ${i > 2 ? 'bg-kaptas-green shadow-[0_0_8px_rgba(0,179,86,0.4)]' : 'bg-white/5'}`}></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-gray-600 mt-1 px-9">
                  <span>9AM</span>
                  <span>1PM</span>
                  <span>5PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Know your competitors</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Reduce risks by understanding the market. See how competitors in Brazil and Latin America structure their teams, what they pay their leadership, and where their gaps are.
                </p>
              </div>
              
              <div className="mt-8 text-4xl font-black text-white/5 tracking-tighter group-hover:text-white/10 transition-colors">
                100% YOURS
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time market data</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  We bypass outdated salary surveys. Our compensation benchmarks come directly from live conversations with executives currently in the Brazilian and Latin American market.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>LIVE_INSIGHTS</span>
                  <span className="text-blue-500">● ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-green/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kaptas-green/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready for execution</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  We don't just give you a spreadsheet. We deliver 20-30 mapped professionals with a validated shortlist of top-tier candidates, ready for you to interview and hire immediately.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border border-white/10 rounded-lg p-3 bg-white/5">
                <span className="text-[10px] font-mono text-gray-500 tracking-widest">ACTIONABLE_PIPELINE</span>
                <div className="w-8 h-4 bg-kaptas-green/20 rounded-full p-0.5 relative border border-kaptas-green/30">
                  <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-kaptas-green rounded-full shadow-[0_0_8px_rgba(0,179,86,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#lead-form" className="bg-kaptas-green text-[#111111] hover:bg-[#00994A] px-8 py-4 rounded-full font-bold transition-colors flex items-center gap-2">
            Start your mapping <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.section>

      {/* 9. Form */}
      <div id="lead-form" className="w-full flex flex-col">
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <LeadGenerationForm
          source="Executive Mapping — Bottom"
          headline={<>Know the market, <br /><span className="font-semibold text-[#111111]">find the right leader</span></>}
          subtext="Describe the role and we'll map the market for you."
          steps={[
            { number: "1", title: "Intro call.", desc: "Project scope, role, and competitors to benchmark." },
            { number: "2", title: "Mapping.", desc: "We source and rank 20-30 professionals for your target role." },
            { number: "3", title: "Report delivered.", desc: "Full market intelligence and a shortlist ready to activate." }
          ]}
          trustSignals={[
            "Competitors benchmarked",
            "Real compensation data",
            "Top candidates ranked"
          ]}
          ctaText="Book a call"
        />
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      {/* 10. FAQ */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-3xl mx-auto w-full mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">Everything you need to know about our executive mapping process.</p>
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
                  {faq.q}
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
                    <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed" data-speakable="true">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
    </>
  );
}
