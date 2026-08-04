import { SEO } from "../components/SEO";
import { useContactForm } from "../hooks/useContactForm";
import { ThankYouModal } from "../components/ThankYouModal";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { HowItWorks } from "../components/home/HowItWorks";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";

/**
 * /get-started — a focused conversion landing page.
 *
 * Structure is cloned from the service-page hero (see src/pages/DirectHire.tsx)
 * so it is visually indistinguishable from a service page: it renders inside
 * the standard site <Layout> (full header/nav + site footer), uses the same
 * two-column hero (left copy + right dark form card with the green glow
 * border), the same pill badge, the same green-gradient headline, and the
 * same trust-checkmark row.
 *
 * The hero form is the same inline form section the service pages use — its
 * own useContactForm instance, which fires the same lead_form_submit ->
 * GA4 generate_lead event as every other form on the site. form_source is
 * derived from the pathname in useContactForm, so it reports as "get-started".
 */
export default function GetStarted() {
  const {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    showModal,
    setShowModal,
    error,
    captcha,
  } = useContactForm("Get Started — Hero", "dark");

  return (
    <>
      <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className="flex flex-col gap-32 pb-24">
        <SEO
          title="Get Started | Kaptas Global"
          description="We source, screen, and validate senior remote talent in Brazil, aligned with your time zone, fully compliant, with no local entity required."
          canonical="https://kaptasglobal.io/get-started"
          eyebrow="Get Started"
          ogTitle="Hire Brazilian talent"
          ogSubtitle="Tell us what you're hiring for and we'll come back with a tailored shortlist."
          schemas={[
            organizationSchema,
            buildBreadcrumbSchema([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Get Started", url: `${SITE_URL}/get-started` },
            ]),
          ]}
        />

        {/* 1. Hero — cloned from the service-page hero structure */}
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

              <h1 className="font-semibold tracking-tight leading-[1.1] mb-8 text-[40px] md:text-[52px] text-white">
                Hire{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                  Brazilian talent
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light max-w-xl">
                We source, screen, and validate senior remote talent in Brazil, aligned with your time zone, fully compliant, with no local entity required.
              </p>

              <div className="border-l-2 border-kaptas-purple/50 pl-5 max-w-xl mb-12 mt-[40px]">
                <p className="text-base text-gray-400 leading-relaxed font-light">
                  Kaptas Global is a US-incorporated company founded by Brazilians. Companies from the US, UK, Germany, China, and other markets trust us to make their first hire in Brazil.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-[50px] max-w-lg">
                {[
                  "Senior, fully vetted talent",
                  "Aligned with your U.S. time zone",
                  "Compliant setup, no local entity",
                  "Curated shortlist in days",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium w-full">
                    <CheckCircle2 className="w-5 h-5 text-kaptas-green shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Lead Generation Form — same dark card + green glow as the service hero */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                x: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-full max-w-[500px] mx-auto mt-12 lg:mt-0 lg:-mt-[30px]"
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
                      <h3 className="text-2xl font-bold text-white -mt-[5px]">Get your shortlist</h3>
                      <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                        Tell us what you're hiring for and we'll come back with a tailored shortlist.
                      </p>
                    </div>
                    <form className="space-y-4 mt-1" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="hero-name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mt-0 mb-[6px]">Name</label>
                          <input
                            type="text"
                            id="hero-name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
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
                            value={form.company}
                            onChange={handleChange}
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
                          value={form.email}
                          onChange={handleChange}
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
                          value={form.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kaptas-green focus:border-kaptas-green transition-all resize-none placeholder:text-gray-400 mt-1"
                          placeholder="Tell us about your hiring needs..."
                        ></textarea>
                      </div>

                      {error && <p className="text-red-400 text-sm">{error}</p>}
                      {/* Required: the form cannot submit without a Turnstile
                          token, and this node is what produces it. Omitting it is
                          what made this form permanently unsubmittable from
                          2026-06-23 to 2026-08-03. */}
                      {captcha}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-kaptas-green text-[#111111] font-semibold text-sm rounded-lg px-6 py-3.5 hover:bg-[#00994A] transition-all flex items-center justify-center gap-2 group mt-[25px] shadow-[0_0_20px_rgba(0,179,86,0.15)] hover:shadow-[0_0_25px_rgba(0,179,86,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Get my shortlist"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </button>
                      <p className="text-xs text-gray-400 text-center mt-3">
                        No upfront cost. I reply personally, and fast.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 2. How it works — reuse the exact homepage "From kickoff to hire
            in 14 days" 4-step timeline so it is visually identical. */}
        <HowItWorks />

        {/*
          FUTURE SOFT CTA SLOT — "get the benchmark"
          Placeholder only. Do not build the benchmark here.
          When ready, replace the hidden block below with the soft CTA.
        */}
        <div data-slot="benchmark-soft-cta" hidden></div>
      </div>
    </>
  );
}
