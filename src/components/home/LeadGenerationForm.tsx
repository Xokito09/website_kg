import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeIn } from "./animations";
import { useContactForm } from "../../hooks/useContactForm";
import { ThankYouModal } from "../ThankYouModal";

// Componente de formulário de geração de leads
export function LeadGenerationForm({
  headline,
  subtext,
  steps,
  trustSignals,
  ctaText,
  source
}: {
  headline?: React.ReactNode,
  subtext?: React.ReactNode,
  steps?: { number: string | number, title: React.ReactNode, desc: React.ReactNode }[],
  trustSignals?: React.ReactNode[],
  ctaText?: string,
  source?: string;
}) {
  const { form, handleChange, handleSubmit, isSubmitting, showModal, setShowModal, error, captcha } = useContactForm(source || "Home", "light");

  return (
    <>
    <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />
    {/* Height is content-driven with symmetric padding. The previous fixed
        h-[680px] + overflow-hidden clipped the stacked mobile layout (~1,370px
        of content in a 680px box) — the entire form card sat below the clip
        edge and was invisible on mobile, and the desktop card touched the
        section's bottom edge with no framing. */}
    <div className="w-full bg-[#F9FAFB] py-[80px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-kaptas-green/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
      
      <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Copy */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-kaptas-green"></div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Start Here</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111] mb-6">
              {headline || (
                <>
                  Let's build your <span className="font-semibold text-[#111111]">hiring strategy for Brazil</span>
                </>
              )}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {subtext || "The role you've been trying to fill for months? We can close it in 14 days."}
            </p>
            
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-4">After you book:</h3>
              <div className="space-y-4">
                {(steps || [
                  { number: "1", title: "Intro call.", desc: "Service models, budget, and positions." },
                  { number: "2", title: "Alignment.", desc: "Candidate profile, stack, and priorities." },
                  { number: "3", title: "Candidates in 5 days.", desc: "Pre-vetted, headhunted profiles." }
                ]).map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-kaptas-green/10 text-kaptas-green flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{step.number}</div>
                    <p className="text-sm text-gray-600"><span className="font-semibold text-[#111111]">{step.title}</span> {step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
              {(trustSignals || [
                "Zero cost to interview",
                "Headhunted profiles, not job board applicants",
                "No commitment required"
              ]).map((signal, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-kaptas-green" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
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
            <div className="relative rounded-3xl p-[1px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gray-200/60">
              {/* Line 1 (Blue/Green) */}
              <div className="absolute inset-[-100%] animate-[spin_12s_linear_infinite]">
                <div className="w-full h-full animate-pulse bg-[conic-gradient(from_0deg,transparent_0_120deg,#0047FF1A_200deg,#0047FF_280deg,#00B356_360deg)]" style={{ animationDuration: '7s' }}></div>
              </div>
              {/* Line 2 (Green/Yellow) */}
              <div className="absolute inset-[-100%] animate-[spin_17s_linear_infinite]">
                <div className="w-full h-full animate-pulse bg-[conic-gradient(from_0deg,transparent_0_120deg,#00B3561A_200deg,#00B356_260deg,#E8B923_310deg,#E8B923_360deg)]" style={{ animationDuration: '11s' }}></div>
              </div>
              
              {/* Inner Form Container */}
              <div className="bg-white rounded-[23px] p-8 md:p-10 relative z-10 h-full w-full">
                <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="lg-name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                  <input type="text" id="lg-name" name="name" value={form.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-kaptas-green/20 focus:border-kaptas-green transition-all" placeholder="First and Last name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lg-company" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</label>
                  <input type="text" id="lg-company" name="company" value={form.company} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-kaptas-green/20 focus:border-kaptas-green transition-all" placeholder="Your company name" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="lg-email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Work Email</label>
                <input type="email" id="lg-email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-kaptas-green/20 focus:border-kaptas-green transition-all" placeholder="Your work email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lg-message" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">How can we help?</label>
                <textarea id="lg-message" name="message" value={form.message} onChange={handleChange} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-kaptas-green/20 focus:border-kaptas-green transition-all resize-none" placeholder="Tell us about your hiring needs, timeline, or any specific challenges..." />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {captcha}
              <button type="submit" disabled={isSubmitting} className="w-full bg-[#111111] text-white font-semibold rounded-xl px-6 py-4 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? "Sending..." : (ctaText || "Start for free")}
                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
    </>
  );
}
