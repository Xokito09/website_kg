import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, directHireFaqSchema, directHireServiceSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
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
import { TechMapBackground } from "../components/TechMapBackground";

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

export default function DirectHire() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { form: heroForm, handleChange: handleHeroChange, handleSubmit: handleHeroSubmit, isSubmitting: heroSubmitting, showModal: heroModal, setShowModal: setHeroModal, error: heroError, captcha: heroCaptcha } = useContactForm("Direct Hire — Hero", "dark");

  const faqs = [
    {
      q: "How does direct hire work when hiring remote talent in Brazil?",
      a: "Kaptas Global sources, screens, and presents a shortlist of pre-vetted candidates for your open role. You interview the finalists, choose who to hire, and bring them onto your own team. We charge a one-time finder's fee paid only after the professional starts. After placement, there are no ongoing fees, no middleman, and no dependency on Kaptas Global. You run the payroll, you manage the person, you own the relationship."
    },
    {
      q: "How long does it take to hire through Kaptas Global?",
      a: "Most clients receive a shortlist of 3 to 5 pre-vetted candidates within 5 business days. The average time from kickoff to signed hire is 14 days. For context, the industry average to hire a senior engineer is 35 to 45 days when recruiting internally, and up to 90 days for hard-to-fill roles."
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
      a: "Kaptas Global is a US-incorporated company founded by Brazilians with direct access to the Brazilian talent market. We headhunt employed professionals from top-tier companies rather than pulling from job boards or recycled databases. Every search is built around your specific stack, seniority level, and team culture. With over 300 placements, a 14-day average time to hire, and a replacement warranty on every placement, we operate as a strategic hiring partner, not a resume vendor."
    }
  ];

  return (
    <>
    <ThankYouModal isOpen={heroModal} onClose={() => setHeroModal(false)} />
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Direct Hire in Brazil — Kaptas Global | One-Time 18% Fee, No Retainer"
        description="Hire Brazilian professionals directly on your team. Pre-vetted shortlist in 5 days. 18% one-time fee, paid after hire. Replacement warranty included."
        keywords="direct hire brazil, hire developers brazil, one-time recruitment fee brazil, hire brazilian engineers, direct placement brazil, tech talent brazil, 18% hiring fee, pre-vetted developers brazil, replacement guarantee hiring, remote developers brazil"
        canonical="https://kaptasglobal.io/direct-hire"
        eyebrow="Direct Hire"
        ogTitle="Direct Hire in Brazil"
        ogSubtitle="One-time 18% fee, no retainer. 90-180 day replacement guarantee."
        schemas={[
          organizationSchema,
          directHireServiceSchema,
          directHireFaqSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Direct Hire", url: `${SITE_URL}/direct-hire` },
          ]),
        ]}
      />
      <AEOContent paragraph={AEO_PARAGRAPHS.directHire} label="Direct Hire service overview" />
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
              DIRECT HIRE
            </div>
            <h1 className="font-semibold tracking-tight leading-[1.1] mb-8">
              <span className="block mt-[6px] text-[30px] text-[#6a7282]">Hire remote Talent in Brazil</span>
              <span className="block mt-1 -mr-[500px] whitespace-nowrap text-[52px] text-white">
                We find the Talent
              </span>
              <span className="block mt-1 text-[52px] text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                You hire them directly
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light max-w-xl">
              Get a shortlist of vetted candidates in 5 business days. For contractor or permanent roles. One-time fee, paid only after you hire.
            </p>

            <div className="border-l-2 border-kaptas-purple/50 pl-5 max-w-xl mb-12 mt-[120px]">
              <p className="text-base text-gray-400 leading-relaxed font-light">
                Kaptas Global is a US-incorporated company founded by Brazilians. Every placement includes a 90 to 180-day replacement warranty.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-[50px] max-w-lg">
              {[
                "Vetted for your stack",
                "Zero cost until you hire",
                "Shortlist in 5 business days",
                "90-180 day replacement warranty"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium w-full">
                  <CheckCircle2 className="w-5 h-5 text-kaptas-green shrink-0" />
                  <span 
                    className="truncate"
                    style={i === 3 ? { paddingRight: '0px', paddingLeft: '1px', marginRight: '-20px' } : undefined}
                  >
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
                    <h3 className="text-2xl font-bold text-white -mt-[5px]">See your candidates</h3>
                  </div>
                  <form className="space-y-4 mt-1" onSubmit={handleHeroSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="hero-name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Name</label>
                        <input
                          type="text"
                          id="hero-name"
                          name="name"
                          value={heroForm.name}
                          onChange={handleHeroChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all placeholder:text-gray-400 mt-1"
                          placeholder="John Doe"
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
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hero-email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Work Email</label>
                      <input
                        type="email"
                        id="hero-email"
                        name="email"
                        value={heroForm.email}
                        onChange={handleHeroChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all placeholder:text-gray-400 mt-1"
                        placeholder="john@acmecorp.com"
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
                      {heroSubmitting ? "Sending..." : "Start for free"}
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

      {/* 2. The Arbitrage Advantage (Cost vs Team Size) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="px-6 md:px-12 max-w-7xl mx-auto w-full py-12 md:py-24 relative flex flex-col items-center"
      >
        {/* Top: Typography & Narrative (Centered) */}
        <div className="max-w-3xl text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]">
            Your open role <br />
            <span className="text-gray-500">Costs more than you think</span>
          </h2>
          <p className="relative text-lg md:text-xl leading-relaxed font-light text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af_35%,#e2e8f0_45%,#ffffff_50%,#e2e8f0_55%,#9ca3af_65%)] animate-shimmer">
            Same seniority and timezone. A fraction of the time and cost of doing it yourself.
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.5)_45%,#ffffff_50%,rgba(255,255,255,0.5)_55%,transparent_65%)] animate-shimmer blur-[6px] pointer-events-none"
              aria-hidden="true"
            >
              Same seniority and timezone. A fraction of the time and cost of doing it yourself.
            </span>
          </p>
        </div>

        {/* Bottom: Comparison Visual */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10"
        >
          
          {/* LEFT SIDE: HIRING ON YOUR OWN */}
          <motion.div variants={staggerItem} className="flex flex-col group">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5 hover:border-white/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-600 transition-all duration-500 group-hover:bg-gray-400"></div>
              
              <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Hiring on Your Own</h3>
                  <p className="text-sm text-gray-500">Internal recruitment</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6 py-4">
                {/* The search */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">The search</h4>
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded uppercase tracking-wider">Senior Engineer +8 years xp</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Time to hire</span>
                      <span className="text-white font-medium">45-90 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Candidates screened - job boards</span>
                      <span className="text-white font-medium">100+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Interviews conducted</span>
                      <span className="text-white font-medium">15-20</span>
                    </div>
                  </div>
                </div>

                {/* The cost */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">The cost</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Base salary (US)</span>
                      <span className="text-white font-medium text-sm">$160K-200K/yr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Taxes, benefits & equity</span>
                      <span className="text-white font-medium text-sm">$40K-60K/yr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Recruiting (recruiter, job boards, tools)</span>
                      <span className="text-white font-medium text-sm">$15K-30K</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-gray-300 text-sm font-medium">Total first-year cost</span>
                      <span className="text-white font-bold text-sm">$215K-290K</span>
                    </div>
                  </div>
                </div>

                {/* The risk */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">The risk</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">If you don't make a hire</span>
                      <span className="text-white font-medium text-sm text-right">You still paid for the search</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">If the hire doesn't work out</span>
                      <span className="text-white font-medium text-sm">Start over from zero</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Estimated loss from a bad hire</span>
                      <span className="text-white font-medium text-sm">$48K-60K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Replacement guarantee</span>
                      <span className="text-white font-medium text-sm">None</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-start">
                <span className="text-gray-400 text-sm mt-1">Outcome</span>
                <div className="flex flex-col items-end text-right">
                  <span className="text-white font-bold text-lg">1 hire, no guarantee</span>
                  <span className="text-white font-bold text-[15px]">Total first-year cost: $215K-$290K</span>
                  <span className="mt-2 text-xs px-3 py-1 border border-transparent opacity-0 select-none pointer-events-none" aria-hidden="true">Spacer</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center px-4">
              * US salary estimates for senior engineers (8+ yrs). US Dept. of Labor estimates the cost of a bad hire at 30% of annual salary.
            </div>
          </motion.div>

          {/* RIGHT SIDE: HIRING WITH KAPTAS */}
          <motion.div variants={staggerItem} className="flex flex-col group">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-kaptas-green/30 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(0,179,86,0.1)] h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,179,86,0.2)] hover:border-kaptas-green/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-kaptas-green shadow-[0_0_15px_#00B356] transition-all duration-500 group-hover:shadow-[0_0_25px_#00B356]"></div>
              
              <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    Hiring in Brazil <span className="text-[10px] bg-kaptas-green/20 text-kaptas-green px-2 py-0.5 rounded uppercase tracking-wider">Kaptas Global</span>
                  </h3>
                  <p className="text-sm text-gray-400">Strategic hiring partner</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6 py-4">
                {/* The search */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-xs font-bold text-kaptas-green/70 uppercase tracking-widest">The search</h4>
                    <span className="text-[10px] bg-kaptas-green/10 text-kaptas-green px-2 py-0.5 rounded uppercase tracking-wider">Senior Engineer +8 years xp</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Time to hire</span>
                      <span className="text-kaptas-green font-bold">14 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Candidates screened - Headhunted</span>
                      <span className="text-white font-medium">50+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Interviews you conduct</span>
                      <span className="text-kaptas-green font-bold">3 to 5 pre-vetted finalists</span>
                    </div>
                  </div>
                </div>

                {/* The cost */}
                <div>
                  <h4 className="text-xs font-bold text-kaptas-green/70 uppercase tracking-widest mb-3">The cost</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Base salary (Brazil)</span>
                      <span className="text-white font-medium text-sm">$60K-80K/yr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Taxes & benefits</span>
                      <span className="text-white font-medium text-sm">Already included</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Finder's fee (18% of annual salary)</span>
                      <span className="text-white font-medium text-sm text-right max-w-[150px]">$10.8K-14.4K</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-gray-300 text-sm font-medium">Total first-year cost</span>
                      <span className="text-kaptas-green font-bold text-sm">$70.8K-94.4K</span>
                    </div>
                  </div>
                </div>

                {/* The risk */}
                <div>
                  <h4 className="text-xs font-bold text-kaptas-green/70 uppercase tracking-widest mb-3">The risk</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">If you don't make a hire</span>
                      <span className="text-kaptas-green font-bold text-sm">Zero. You pay nothing.</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">If the hire doesn't work out</span>
                      <span className="text-kaptas-green font-bold text-sm">Replaced at no cost</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Estimated loss from a bad hire</span>
                      <span className="text-kaptas-green font-bold text-sm">$0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Replacement guarantee</span>
                      <span className="text-kaptas-green font-bold text-sm">90-180 days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-start">
                <span className="text-gray-400 text-sm mt-1">Outcome</span>
                <div className="flex flex-col items-end text-right">
                  <span className="text-kaptas-green font-bold text-lg">1 hire, vetted and validated</span>
                  <span className="text-white font-bold text-[14px]">Total first-year cost: $70K-$94K</span>
                  <span className="mt-2 text-xs font-bold bg-kaptas-green/10 border border-kaptas-green/20 text-kaptas-green px-3 py-1 rounded-full uppercase tracking-wider">Up to 67% less</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center px-4">
              * That is up to 67% lower than hiring the same seniority in the US, with zero risk if the hire does not work out.
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 3. Benefits / Why Us (Seamless execution) */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            What makes this different
          </h2>
          <p className="text-lg text-gray-400 font-light">Everything between "we need an engineer" and "they're shipping code."</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Your eyes in Brazil (Span 2) */}
          <div className="md:col-span-2 bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,_rgba(59,130,246,0.15),_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 text-kaptas-purple font-mono text-[10px] font-bold tracking-widest uppercase mb-4 bg-kaptas-purple/10 px-2.5 py-1 rounded-full border border-kaptas-purple/20">
                  <span className="w-1.5 h-1.5 bg-kaptas-purple rounded-full animate-pulse"></span>
                  Strategic Partner
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Your hiring shortcut in Brazil and Latin America</h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-xl font-light">
                  We know the market, the salaries, the talent pools, and the red flags. You skip months of trial and error and go straight to qualified finalists.
                </p>
              </div>
              
              {/* Abstract Visual */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 rounded-full ${i === 2 ? 'bg-kaptas-purple' : 'bg-white/20'}`}></div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-gray-500 tracking-widest">MARKET_INTELLIGENCE_ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Card 2: Same working hours */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-green/10">
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,_rgba(0,179,86,0.1),_transparent_60%)]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Same working hours</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  1-4h from EST. Your team works when you work. No async delays.
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

          {/* Card 3: Fluent English */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fluent English</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Every candidate is screened for business-level English before you meet them.
                </p>
              </div>
              
              <div className="mt-8 text-4xl font-black text-white/5 tracking-tighter group-hover:text-white/10 transition-colors">
                EN_US
              </div>
            </div>
          </div>

          {/* Card 4: Your team. Your payroll. Your terms. */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Your team. Your payroll. Your terms.</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  After placement, the professional joins your team directly. No ongoing fees, no intermediary, no lock-in. You run payroll, management, and operations on your terms.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>DIRECT_CONTRACT</span>
                  <span className="text-blue-500">● ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: You own everything */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-green/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kaptas-green/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">You own everything</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Code, data, IP, and deliverables. Full ownership. No exceptions.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border border-white/10 rounded-lg p-3 bg-white/5">
                <span className="text-[10px] font-mono text-gray-500 tracking-widest">IP_TRANSFER</span>
                <div className="w-8 h-4 bg-kaptas-green/20 rounded-full p-0.5 relative border border-kaptas-green/30">
                  <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-kaptas-green rounded-full shadow-[0_0_8px_rgba(0,179,86,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#lead-form" className="bg-kaptas-green text-[#111111] hover:bg-[#00994A] px-8 py-4 rounded-full font-bold transition-colors flex items-center gap-2">
            Start hiring in Brazil <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.section>





      {/* 4. Case Results */}
      <CaseResults />

      {/* 9. Form */}
      <div id="lead-form" className="w-full flex flex-col">
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <LeadGenerationForm
          source="Direct Hire — Bottom"
          headline="Let's Find Your Next Hire in Brazil."
          subtext="Get a shortlist of pre-vetted professionals ready to join your team. No ongoing fees, no middleman after the hire."
        />
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      {/* 10. FAQ */}
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
