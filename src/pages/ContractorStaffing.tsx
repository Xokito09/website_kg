import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, outsourcingFaqSchema, outsourcingServiceSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
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

export default function ContractorStaffing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { form: heroForm, handleChange: handleHeroChange, handleSubmit: handleHeroSubmit, isSubmitting: heroSubmitting, showModal: heroModal, setShowModal: setHeroModal, error: heroError, captcha: heroCaptcha } = useContactForm("Outsourcing & Staffing — Hero", "dark");

  const faqs = [
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
      a: "Kaptas Global typically delivers a shortlist of three pre-vetted candidates within five business days of kickoff. The average time from the first alignment call to a signed hire is 14 days. Kaptas Global achieves this speed through direct sourcing and a structured screening process that eliminates wasted interviews and low-signal candidates."
    },
    {
      q: "How much does it cost to hire professionals in Brazil compared to the United States?",
      a: "Kaptas Global charges one monthly invoice in USD that covers the professional's compensation, Brazilian taxes, and the service fee. There are no hidden charges, no setup fees, and no currency conversion on the client's side. The total loaded cost for a senior professional hired in Brazil through Kaptas Global is typically 40 to 60 percent lower than a comparable US hire at the same seniority level, without sacrificing quality or timezone overlap. A detailed salary comparison by role and seniority is available on the cost comparison section of this page."
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
    }
  ];

  return (
    <>
    <ThankYouModal isOpen={heroModal} onClose={() => setHeroModal(false)} />
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Outsourcing & Staffing in Brazil and Latin America | Hire Remote Talent | Kaptas Global"
        description="Kaptas Global helps US companies hire senior remote professionals in Brazil and Latin America. We handle sourcing, payroll, and compliance. Zero upfront cost. 14-day average time to hire. Full IP ownership. One monthly invoice in USD."
        keywords="outsourcing staffing Brazil, hire remote talent Latin America, nearshore hiring Brazil, contractor payroll Brazil, hire engineers Brazil, Kaptas Global, nearshore staffing, remote professionals Latin America, IP ownership contractor Brazil"
        canonical="https://kaptasglobal.io/contractor-staffing"
        eyebrow="Outsourcing & Staffing"
        ogTitle="Senior Remote Talent from Brazil"
        ogSubtitle="Flat monthly cost per pro. Sourcing, payroll, compliance handled. USD invoice."
        schemas={[
          organizationSchema,
          outsourcingServiceSchema,
          outsourcingFaqSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Outsourcing & Staffing", url: `${SITE_URL}/contractor-staffing` },
          ]),
        ]}
      />
      <AEOContent paragraph={AEO_PARAGRAPHS.outsourcingStaffing} label="Outsourcing & Staffing service overview" />
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
              Outsourcing & Staffing
            </div>
            <h1 className="font-semibold tracking-tight leading-[1.1] mb-8">
              <span className="block mt-[6px] text-[30px] text-[#6a7282]">Hire Engineers from Brazil</span>
              <span className="block mt-1 -mr-[500px] whitespace-nowrap text-[52px] text-white">
                We Source and Run Payroll
              </span>
              <span className="block mt-1 text-[52px] text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                You Run the Team
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light max-w-xl">
              Test the process, meet the engineers, and pay only if you hire. If anyone ever leaves, we replace them on us.
            </p>

            <div className="border-l-2 border-kaptas-purple/50 pl-5 max-w-xl mb-12 mt-[120px]">
              <p className="text-base text-gray-400 leading-relaxed font-light">
                We are US-incorporated, so there are no foreign contracts, no currency risk, and no surprises, just one monthly invoice in USD.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-[50px] max-w-lg">
              {[
                "Same working hours",
                "Zero upfront cost",
                "Replacements always covered",
                "Highly qualified talent"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium w-full">
                  <CheckCircle2 className="w-5 h-5 text-kaptas-green shrink-0" />
                  <span className="truncate">{text}</span>
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
                      <label htmlFor="hero-email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Work Email</label>
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
            Same budget <br />
            <span className="text-gray-500">Double output</span>
          </h2>
          <p className="relative text-lg md:text-xl leading-relaxed font-light text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af_35%,#e2e8f0_45%,#ffffff_50%,#e2e8f0_55%,#9ca3af_65%)] animate-shimmer">
            You get the exact same seniority and skill level, but you ship twice as fast.
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.5)_45%,#ffffff_50%,rgba(255,255,255,0.5)_55%,transparent_65%)] animate-shimmer blur-[6px] pointer-events-none"
              aria-hidden="true"
            >
              You get the exact same seniority and skill level, but you ship twice as fast.
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
          
          {/* LEFT SIDE: US TEAM */}
          <motion.div variants={staggerItem} className="flex flex-col group">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5 hover:border-white/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-600 transition-all duration-500 group-hover:bg-gray-400"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">North America e Europe Teams</h3>
                  <p className="text-sm text-gray-500">Standard local hiring</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">$45,000<span className="text-sm text-gray-500 font-medium">/mo</span></div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Est. Burn Rate*</div>
                </div>
              </div>

              {/* US Org Chart */}
              <div className="flex-1 flex flex-col items-center justify-center py-8">
                {/* Manager */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <span className="text-gray-400 font-bold text-base">US</span>
                  </div>
                  <div className="text-white font-bold text-base">Sarah</div>
                  <div className="text-gray-500 text-sm">Engineering Manager</div>
                </div>

                {/* Org Chart Lines */}
                <div className="w-full max-w-[280px] mx-auto h-8 relative my-2">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <line x1="50%" y1="0" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <line x1="16.66%" y1="50%" x2="83.33%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <line x1="16.66%" y1="50%" x2="16.66%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <line x1="83.33%" y1="50%" x2="83.33%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Reports (1 Row of 3) */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-[320px] mx-auto z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                      <span className="text-gray-400 font-bold text-sm">US</span>
                    </div>
                    <div className="text-gray-300 font-bold text-sm">Frontend</div>
                    <div className="text-gray-500 text-xs mt-0.5">8+ Years</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                      <span className="text-gray-400 font-bold text-sm">US</span>
                    </div>
                    <div className="text-gray-300 font-bold text-sm">Senior Dev</div>
                    <div className="text-gray-500 text-xs mt-0.5">10+ Years</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                      <span className="text-gray-400 font-bold text-sm">US</span>
                    </div>
                    <div className="text-gray-300 font-bold text-sm">Backend</div>
                    <div className="text-gray-500 text-xs mt-0.5">9+ Years</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Team Size</span>
                <span className="text-white font-bold text-lg">3 Engineers</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center px-4">
              * Cost estimated for salary only. Real costs are higher due to taxes and benefits.
            </div>
          </motion.div>

          {/* RIGHT SIDE: BR TEAM */}
          <motion.div variants={staggerItem} className="flex flex-col group">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-kaptas-green/30 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(0,179,86,0.1)] h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,179,86,0.2)] hover:border-kaptas-green/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-kaptas-green shadow-[0_0_15px_#00B356] transition-all duration-500 group-hover:shadow-[0_0_25px_#00B356]"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    Brazil Team <span className="text-[10px] bg-kaptas-green/20 text-kaptas-green px-2 py-0.5 rounded uppercase tracking-wider">Kaptas Global</span>
                  </h3>
                  <p className="text-sm text-gray-400">Strategic execution partner</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-kaptas-green">$45,000<span className="text-sm text-kaptas-green/60 font-medium">/mo</span></div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Est. Burn Rate*</div>
                </div>
              </div>

              {/* BR Org Chart */}
              <div className="flex-1 flex flex-col items-center justify-center py-4">
                {/* Manager (US) */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <span className="text-gray-400 font-bold text-base">US</span>
                  </div>
                  <div className="text-white font-bold text-base">Sarah</div>
                  <div className="text-gray-500 text-sm">Engineering Manager</div>
                </div>

                {/* Org Chart Lines (To 6 reports) */}
                <div className="w-full max-w-[400px] mx-auto h-8 relative my-2">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <line x1="50%" y1="0" x2="50%" y2="50%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    
                    {/* Horizontal line spanning 6 items */}
                    <line x1="8.33%" y1="50%" x2="91.66%" y2="50%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    
                    {/* Vertical drops */}
                    <line x1="8.33%" y1="50%" x2="8.33%" y2="100%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    <line x1="25%" y1="50%" x2="25%" y2="100%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    <line x1="41.66%" y1="50%" x2="41.66%" y2="100%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    <line x1="58.33%" y1="50%" x2="58.33%" y2="100%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    <line x1="75%" y1="50%" x2="75%" y2="100%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                    <line x1="91.66%" y1="50%" x2="91.66%" y2="100%" stroke="rgba(0,179,86,0.3)" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Reports (1 Row of 6) */}
                <div className="grid grid-cols-6 gap-1 md:gap-3 w-full max-w-[480px] mx-auto z-10">
                  {/* The Original 3 */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111111] border border-kaptas-green/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,179,86,0.1)]">
                      <span className="text-white font-bold text-xs md:text-sm">BR</span>
                    </div>
                    <div className="text-white font-bold text-[10px] md:text-xs text-center leading-tight">Frontend</div>
                    <div className="text-gray-400 text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap">8+ Years</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111111] border border-kaptas-green/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,179,86,0.1)]">
                      <span className="text-white font-bold text-xs md:text-sm">BR</span>
                    </div>
                    <div className="text-white font-bold text-[10px] md:text-xs text-center leading-tight">Senior Dev</div>
                    <div className="text-gray-400 text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap">10+ Years</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111111] border border-kaptas-green/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,179,86,0.1)]">
                      <span className="text-white font-bold text-xs md:text-sm">BR</span>
                    </div>
                    <div className="text-white font-bold text-[10px] md:text-xs text-center leading-tight">Backend</div>
                    <div className="text-gray-400 text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap">9+ Years</div>
                  </div>
                  {/* The 3 New Additions */}
                  <div className="flex flex-col items-center relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-kaptas-purple rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111111] border border-kaptas-purple/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(125,67,197,0.2)]">
                      <span className="text-white font-bold text-xs md:text-sm">BR</span>
                    </div>
                    <div className="text-kaptas-purple font-bold text-[10px] md:text-xs text-center leading-tight">QA Eng.</div>
                    <div className="text-kaptas-purple/70 text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap">7+ Years</div>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-kaptas-purple rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111111] border border-kaptas-purple/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(125,67,197,0.2)]">
                      <span className="text-white font-bold text-xs md:text-sm">BR</span>
                    </div>
                    <div className="text-kaptas-purple font-bold text-[10px] md:text-xs text-center leading-tight">Architect</div>
                    <div className="text-kaptas-purple/70 text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap">12+ Years</div>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-kaptas-purple rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111111] border border-kaptas-purple/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(125,67,197,0.2)]">
                      <span className="text-white font-bold text-xs md:text-sm">BR</span>
                    </div>
                    <div className="text-kaptas-purple font-bold text-[10px] md:text-xs text-center leading-tight">DevOps</div>
                    <div className="text-kaptas-purple/70 text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap">8+ Years</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Team Size</span>
                <span className="text-kaptas-green font-bold text-lg">6 Engineers (2x Velocity)</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center px-4">
              * All-in costs including salary and fees.
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
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Your eyes in Brazil</h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-xl font-light">
                  Entering a new market is easier with a partner already on the ground. We handle the local complexity so you can hire with confidence, not guesswork.
                </p>
              </div>
              
              {/* Abstract Visual */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 rounded-full ${i === 2 ? 'bg-kaptas-purple' : 'bg-white/20'}`}></div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-gray-500 tracking-widest">LOCAL_PRESENCE_ACTIVE</div>
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

          {/* Card 4: Payroll & compliance covered */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Payroll & compliance</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  One monthly invoice. Contracts, taxes, and Brazilian labor compliance handled.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col gap-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-kaptas-green rounded-full"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-gray-500">
                  <span>COMPLIANCE</span>
                  <span className="text-kaptas-green">100% SECURE</span>
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
            Start building your team <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.section>





      {/* 4. Case Results */}
      <CaseResults />

      {/* 9. Form */}
      <div id="lead-form" className="w-full flex flex-col">
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <LeadGenerationForm source="Outsourcing & Staffing — Bottom" />
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
