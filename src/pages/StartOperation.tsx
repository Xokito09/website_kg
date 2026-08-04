import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, hireInBrazilFaqSchema, hireInBrazilServiceSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";
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

export default function StartOperation() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { form: heroForm, handleChange: handleHeroChange, handleSubmit: handleHeroSubmit, isSubmitting: heroSubmitting, showModal: heroModal, setShowModal: setHeroModal, error: heroError, captcha: heroCaptcha } = useContactForm("Hire in Brazil — Hero", "dark");

  const faqs = [
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
    }
  ];

  return (
    <>
    <ThankYouModal isOpen={heroModal} onClose={() => setHeroModal(false)} />
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Hire in Brazil — Kaptas Global | Market Entry Recruitment & First Hires"
        description="Hire your first employees in Brazil without a local entity. Kaptas Global provides market analysis, compensation benchmarks, hiring-model consulting (CLT, PJ, EOR), and end-to-end recruitment for companies entering Brazil."
        keywords="hire in brazil, hire employees brazil, market entry brazil, first hire brazil, employer of record brazil, EOR brazil, CLT vs PJ brazil, hiring costs brazil, recruit in brazil, expand to brazil, kaptas global, nearshore hiring brazil, brazil talent acquisition, hire without entity brazil, latin america market entry"
        canonical="https://kaptasglobal.io/hire-in-brazil"
        eyebrow="Hire in Brazil"
        ogTitle="Market Entry & First Hires in Brazil"
        ogSubtitle="Compensation benchmarks, CLT/PJ/EOR consulting, end-to-end recruitment."
        schemas={[
          organizationSchema,
          hireInBrazilServiceSchema,
          hireInBrazilFaqSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Hire in Brazil", url: `${SITE_URL}/hire-in-brazil` },
          ]),
        ]}
      />
      <AEOContent paragraph={AEO_PARAGRAPHS.hireInBrazil} label="Hire in Brazil service overview" />
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
              HIRE IN BRAZIL
            </div>
            
            <h1 className="font-semibold tracking-tight leading-[1.1] mb-8">
              <span className="block mt-[6px] text-[30px] text-[#6a7282]">Market entry recruitment</span>
              <span className="block mt-1 -mr-[500px] whitespace-nowrap text-[52px] text-white">
                Hire in Brazil
              </span>
              <span className="block mt-1 text-[52px] text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                with the right partner
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light max-w-xl">
              From competitor analysis to compensation benchmarks to the actual hire. We guide your market entry and handle recruitment end to end.
            </p>

            <div className="border-l-2 border-kaptas-purple/50 pl-5 max-w-xl mb-12 mt-[120px]">
              <p className="text-base text-gray-400 leading-relaxed font-light">
                Kaptas Global is a US-incorporated company founded by Brazilians. Companies from the US, UK, Germany, China, and other markets trust us to make their first hire in Brazil.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-[50px] max-w-lg">
              {[
                "Market intel included",
                "EOR or direct recruitment",
                "No entity required",
                "90 to 180-day guarantee"
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
                    <h3 className="text-2xl font-bold text-white -mt-[5px]">Plan your first on-site hire</h3>
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

      {/* 2. Consultative Hiring Loop */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="px-6 md:px-12 max-w-7xl mx-auto w-full py-12 md:py-24 relative flex flex-col items-center"
      >
        <div className="max-w-3xl text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]">
            Market entry strategy <br />
            <span className="text-gray-500 text-[50px]">With data-backed hiring</span>
          </h2>
          <p className="relative text-[18px] leading-relaxed font-light text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af_35%,#e2e8f0_45%,#ffffff_50%,#e2e8f0_55%,#9ca3af_65%)] animate-shimmer">
            Strategic guidance, competitor mapping, and end-to-end recruitment in one motion.
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.5)_45%,#ffffff_50%,rgba(255,255,255,0.5)_55%,transparent_65%)] animate-shimmer blur-[6px] pointer-events-none"
              aria-hidden="true"
            >
              Strategic guidance, competitor mapping, and end-to-end recruitment in one motion.
            </span>
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full relative z-10"
        >
          <motion.div variants={staggerItem} className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl group hover:border-kaptas-green/30 transition-all duration-500">
            {/* Top Bar */}
            <div className="px-6 md:px-8 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-kaptas-green animate-pulse"></div>
                <span className="text-[10px] md:text-xs font-mono text-gray-400 tracking-widest">MARKET_INTELLIGENCE // ROLE: COUNTRY MANAGER_BR</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column: The Core Hire */}
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,179,86,0.03)_0%,transparent_70%)] pointer-events-none"></div>
                
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Base Compensation</h3>
                
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-light text-white">R$250k <span className="text-sm text-gray-500">($50k)</span></span>
                    <span className="text-[10px] text-gray-600 font-mono mb-1">TO</span>
                    <span className="text-2xl font-light text-white">R$350k <span className="text-sm text-gray-500">($70k)</span></span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                    <div className="absolute left-[20%] right-[15%] h-full bg-gradient-to-r from-kaptas-green/40 via-kaptas-green to-kaptas-green/40 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1.5">
                    <span>MIN / YR</span>
                    <span>MAX / YR</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Competitor Landscape</h3>
                    <span className="text-[10px] text-gray-500">5 Direct Competitors Mapped</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0A0A0A] bg-gray-800 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <span className="text-[9px] font-mono text-gray-400 relative z-10">C{i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Finalists Selected</h3>
                <div className="space-y-2">
                  {[
                    { name: "Rafael Silva", role: "Country Manager", prev: "Ex-Uber", exp: "12y exp", ask: "$65k" },
                    { name: "Mariana Costa", role: "Head of Latam", prev: "Ex-Rappi", exp: "10y exp", ask: "$68k" },
                    { name: "Thiago Mendes", role: "GM Brazil", prev: "Ex-WeWork", exp: "14y exp", ask: "$70k" }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-kaptas-green/10 flex items-center justify-center text-kaptas-green text-xs font-bold border border-kaptas-green/20">{c.name.charAt(0)}{c.name.split(' ')[1].charAt(0)}</div>
                        <div>
                          <div className="text-xs font-medium text-white">{c.name}</div>
                          <div className="text-[10px] text-gray-500 flex items-center gap-2">
                            <span>{c.role}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                            <span>{c.exp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-0.5 rounded border border-white/5">{c.prev}</span>
                        <span className="text-[10px] font-mono text-kaptas-green">{c.ask} ask</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: The Local Nuance */}
              <div className="p-6 lg:p-8 relative flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,67,197,0.03)_0%,transparent_70%)] pointer-events-none"></div>
                
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Mandatory Local Costs (EOR/CLT)</h3>
                
                <div className="space-y-0.5 flex-grow">
                  {[
                    { label: "Meal Voucher", value: "R$2,000 (~$400) / mo" },
                    { label: "Health Plan", value: "R$1,500 (~$300) / mo" },
                    { label: "13th Salary", value: "1 extra monthly salary / yr" },
                    { label: "Vacation", value: "30 days + 1/3 monthly salary bonus" },
                    { label: "FGTS (Severance)", value: "8% of monthly salary" },
                    { label: "INSS (Social Security)", value: "Varies by salary tier" },
                    { label: "Income Tax (IRRF)", value: "Varies by salary tier" },
                    { label: "Mobility", value: "Based on LATAM travel" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 group/item">
                      <span className="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors">{item.label}</span>
                      <span className="text-xs font-medium text-white text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <strong className="text-white font-medium">Brazilian labor law is complex.</strong> We help you navigate the bureaucracy, structure the most efficient offer, and ensure total compliance so you can focus on scaling.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="px-6 md:px-8 py-5 border-t border-white/10 bg-gradient-to-r from-kaptas-green/5 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-sm text-gray-300 font-light">
                <strong className="text-white font-medium">Structure Defined.</strong> EOR Model Selected. Commencing Headhunting.
              </span>
              <div className="flex items-center gap-2 bg-kaptas-green/10 border border-kaptas-green/20 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-kaptas-green animate-pulse"></div>
                <span className="text-[10px] font-mono font-bold text-kaptas-green tracking-wider">ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 3. Benefits / Why Us */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Your local operating partner
          </h2>
          <p className="text-lg text-gray-400 font-light">We know the market. We'll help you navigate the complexities of hiring in Brazil.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Your local operating partner */}
          <div className="md:col-span-2 bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-purple/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-purple/10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,_rgba(125,67,197,0.15),_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 text-kaptas-purple font-mono text-[10px] font-bold tracking-widest uppercase mb-4 bg-kaptas-purple/10 px-2.5 py-1 rounded-full border border-kaptas-purple/20">
                  <span className="w-1.5 h-1.5 bg-kaptas-purple rounded-full animate-pulse"></span>
                  Strategic Partner
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">The blueprint for your first local hire</h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-xl font-light">
                  We map competitors, benchmark compensation, and define the optimal hiring structure while we headhunt your foundational team. Whether you use your own EOR provider or partner with us, our primary focus is securing the exact talent you need to scale.
                </p>
              </div>
              
              {/* Abstract Visual */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 rounded-full ${i === 2 ? 'bg-kaptas-purple' : 'bg-white/20'}`}></div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-gray-500 tracking-widest">STRATEGY_AND_EXECUTION</div>
              </div>
            </div>
          </div>

          {/* Card 2: Same working hours */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-green/10">
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,_rgba(0,179,86,0.1),_transparent_60%)]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">90 to 180-day guarantee</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  We eliminate the risk of entering a new market. If a hire doesn't work out within the first 90 to 180 days, we execute a full replacement search at absolutely no additional cost.
                </p>
              </div>
              
              {/* Guarantee Visual */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between border border-white/10 rounded-lg p-3 bg-white/5">
                  <span className="text-[10px] font-mono text-gray-500 tracking-widest">REPLACEMENT_FEE</span>
                  <span className="text-[10px] font-mono text-kaptas-green font-bold">$0.00</span>
                </div>
                <div className="flex items-center justify-between border border-kaptas-green/30 rounded-lg p-3 bg-kaptas-green/5">
                  <span className="text-[10px] font-mono text-kaptas-green tracking-widest">GUARANTEE_PERIOD</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-kaptas-green">ACTIVE</span>
                    <div className="w-2 h-2 bg-kaptas-green rounded-full shadow-[0_0_8px_rgba(0,179,86,0.8)] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Fluent English */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Local market mastery</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Brazilian labor law (CLT) is notoriously complex. We navigate the mandatory benefits, 13th salaries, and severance rules to protect your operation.
                </p>
              </div>
              
              <div className="mt-8 text-3xl font-black text-white/5 tracking-tighter group-hover:text-white/10 transition-colors">
                BR_COMPLIANCE
              </div>
            </div>
          </div>

          {/* Card 4: No entity required */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Foundational hires</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  We specialize in the critical first hires, Country Managers, GMs, and Head of Sales, who will build and scale your physical presence in the Brazilian market.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>LEADERSHIP_NODE</span>
                  <span className="text-blue-500">● SECURED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: End-to-end compliance */}
          <div className="bg-[#0A0A0A] p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-kaptas-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kaptas-green/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kaptas-green/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Physical & On-site focus</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Unlike our remote staffing services, this is built for companies establishing a physical footprint or local market presence in Brazil.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border border-white/10 rounded-lg p-3 bg-white/5">
                <span className="text-[10px] font-mono text-gray-500 tracking-widest">ON_SITE_BR</span>
                <div className="w-8 h-4 bg-kaptas-green/20 rounded-full p-0.5 relative border border-kaptas-green/30">
                  <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-kaptas-green rounded-full shadow-[0_0_8px_rgba(0,179,86,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#lead-form" className="bg-kaptas-green text-[#111111] hover:bg-[#00994A] px-8 py-4 rounded-full font-bold transition-colors flex items-center gap-2">
            Plan your market entry <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.section>

      {/* 4. Case Results */}
      <CaseResults 
        title="Results from companies entering Brazil"
        subtitle="Real outcomes from companies that hired their first local teams through Kaptas Global."
        badges={[
          "MARKET ENTRY EXPERTISE",
          "FIRST HIRE TO FULL TEAM",
          "GLOBAL COMPANIES SERVED"
        ]}
        cases={[
          {
            tag: "Case 01 // MARKET ENTRY",
            metricPrefix: "0 → ",
            metric: "5",
            title: "First hires in a new market",
            description: "A Chinese oil company needed to build their entire Brazil operation from scratch. No local knowledge, no network, no compensation benchmarks. We mapped the market, defined the hiring structure, and placed five key roles including General Manager, Marketing Manager, and HR. Every hire came with the local network needed to generate new business from day one.",
            colorClass: "bg-kaptas-green",
            glowClass: "bg-kaptas-green/5"
          },
          {
            tag: "Case 02 // SPEED",
            metric: "30",
            metricSuffix: " days",
            title: "Full team migrated",
            description: "A global food and beverage company needed to relocate part of their tech operation to Brazil. SAP specialists, management roles, and technical positions. We sourced, vetted, and placed the entire team in one month.",
            colorClass: "bg-kaptas-purple",
            glowClass: "bg-kaptas-purple/10"
          },
          {
            tag: "Case 03 // MARKET ACCESS",
            metric: "1",
            metricSuffix: " hire",
            title: "Instant market entry",
            description: "A cryptocurrency company needed a Community Manager with deep knowledge of the Brazilian and Latin American market. We found a professional with the exact network and local credibility to accelerate their regional expansion.",
            colorClass: "bg-blue-500",
            glowClass: "bg-blue-500/5"
          }
        ]}
      />

      {/* 9. Form */}
      <div id="lead-form" className="w-full flex flex-col">
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <LeadGenerationForm
          source="Hire in Brazil — Bottom"
          headline={<>Let's make your first hire <span className="font-semibold text-[#111111]">in Brazil.</span></>}
          subtext="Get a shortlist of pre-vetted foundational leaders ready to scale your presence. No ongoing fees, no middleman after the hire."
        />
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      {/* 10. FAQ */}
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-3xl mx-auto w-full mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">Everything you need to know about starting your operation in Brazil.</p>
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
