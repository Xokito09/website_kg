import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, FileText, Clock, DollarSign, Users, Globe } from "lucide-react";
import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL, ORG_ID } from "../data/seoSchemas";
import { AEO_PARAGRAPHS } from "../data/aeoContent";
import { TurnstileWidget, getCaptchaToken, resetCaptcha } from "../components/TurnstileWidget";

/**
 * The ebook is hosted on Gamma (not a downloadable PDF). After a successful
 * form submission, we open this URL in a new tab — preserving the Kaptas
 * Global page for follow-up CTAs while delivering the gated resource.
 * If you change the canonical hosting (e.g. move to a self-hosted page),
 * only this constant needs to change.
 */
const EBOOK_URL = "https://ebook-22gajw1.gamma.site/";
const EBOOK_TITLE = "The Smart Guide to Hiring Brazilian Engineers";
const EBOOK_SUBTITLE = "A founder's playbook for hiring senior remote engineering talent in Brazil — costs, contract models, vetting, and the operational reality of running a nearshore engineering team in 2026.";

const valueProps = [
  { icon: DollarSign, text: "What a senior Brazilian engineer actually costs in 2026 — loaded cost, not just gross salary" },
  { icon: FileText, text: "CLT vs PJ vs EOR — choosing the right contract model for your stage" },
  { icon: Users, text: "How to evaluate technical depth and business English beyond the resume" },
  { icon: Globe, text: "Time zone, async communication, and remote-readiness — what to expect day-to-day" },
  { icon: Clock, text: "The 5 most common pitfalls on a first Brazilian hire — and how to avoid them" },
];

const ebookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": EBOOK_TITLE,
  "url": `${SITE_URL}/ebook`,
  "description": EBOOK_SUBTITLE,
  "inLanguage": "en-US",
  "bookFormat": "https://schema.org/EBook",
  "publisher": { "@id": ORG_ID },
  "author": { "@id": ORG_ID },
  "isAccessibleForFree": false,
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": `${SITE_URL}/ebook`,
    "eligibleRegion": { "@type": "Place", "name": "Worldwide" }
  }
};

const ebookBreadcrumb = buildBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Ebook", url: `${SITE_URL}/ebook` },
]);

interface FormState {
  name: string;
  email: string;
  company: string;
  role: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", company: "", role: "" };

export default function Ebook() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role) {
      setError("Please fill in all fields so we can deliver the guide.");
      return;
    }
    const captchaToken = getCaptchaToken();
    if (!captchaToken) {
      setError("Please complete the verification below.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "cf-turnstile-response": captchaToken,
          subject: `Ebook download — ${form.name} (${form.role} at ${form.company})`,
          from_name: "Kaptas Global Website — Ebook",
          source: "Ebook — The Smart Guide to Hiring Brazilian Engineers",
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          page_url: typeof window !== "undefined" ? window.location.href : `${SITE_URL}/ebook`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // GA4 lead conversion via GTM dataLayer. Same shape as the contact
        // form (useContactForm.ts) so GTM only needs one tag + trigger.
        // form_type='ebook' lets GA4 separate top-of-funnel lead magnet
        // captures from bottom-of-funnel book-a-call submissions.
        if (typeof window !== "undefined") {
          const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({
            event: "lead_form_submit",
            form_source: "ebook",
            form_type: "ebook",
          });
        }

        setDownloaded(true);
        // Open the hosted ebook in a new tab. window.open right after the
        // awaited fetch can be popup-blocker-flagged in some browsers; the
        // visible "Open the guide" button in the thank-you state is the
        // reliable fallback if the tab does not appear.
        window.open(EBOOK_URL, "_blank", "noopener,noreferrer");
      } else {
        setError(data.message || "Something went wrong. Please email us at support@kaptasglobal.io and we will send the guide.");
      }
    } catch {
      setError("Network error. Please check your connection and try again, or email support@kaptasglobal.io.");
    } finally {
      setIsSubmitting(false);
      resetCaptcha();
    }
  }

  return (
    <>
      <SEO
        title="The Smart Guide to Hiring Brazilian Engineers — Free Guide | Kaptas Global"
        description="Free interactive guide for founders and CTOs hiring senior remote engineers in Brazil. Costs, contract models (CLT, PJ, EOR), vetting, time zone reality, common pitfalls. 2026 edition."
        keywords="hiring brazilian engineers guide, hire brazil developers ebook, CLT PJ EOR guide, nearshore brazil hiring guide, brazilian developer salary guide, kaptas global ebook"
        canonical="https://kaptasglobal.io/ebook"
        eyebrow="Free Guide"
        ogTitle="The Smart Guide to Hiring Brazilian Engineers"
        ogSubtitle="Costs, contract models, vetting, time zones, pitfalls. 2026 edition. Free for founders and CTOs."
        schemas={[organizationSchema, ebookSchema, ebookBreadcrumb]}
      />

      <AEOContent paragraph={AEO_PARAGRAPHS.ebook} label="Hiring Brazilian Engineers guide overview" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as any }}
        className="relative pt-8 lg:pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_top_right,_#0047FF22,transparent_70%)] blur-[120px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Typography cover (placeholder until real cover image is ready) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: -6 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" as any }}
            className="relative mx-auto lg:mx-0 [perspective:1500px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[280px] sm:w-[340px] aspect-[3/4] rounded-r-2xl rounded-l-md overflow-hidden border border-white/10 shadow-[20px_30px_80px_-20px_rgba(0,0,0,0.8),_4px_4px_0_rgba(255,255,255,0.04)]" style={{ transform: "rotateY(-6deg)" }}>
              {/* Backgrounds layered */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#050505]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-kaptas-green)_0%,transparent_45%)] opacity-20"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-kaptas-purple)_0%,transparent_55%)] opacity-15"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {/* Spine accent */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-kaptas-green via-kaptas-purple to-kaptas-green"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col p-7 sm:p-9">
                {/* Top: badge */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded border border-kaptas-green/40 bg-kaptas-green/10 flex items-center justify-center">
                    <BookOpen className="w-3 h-3 text-kaptas-green" strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-kaptas-green">
                    Free Guide · 2026 Edition
                  </span>
                </div>

                {/* Middle: title */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 mb-3">The Smart Guide to</p>
                  <h2 className="text-[34px] sm:text-[42px] font-extrabold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-3">
                    Hiring Brazilian Engineers
                  </h2>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-kaptas-green to-kaptas-purple mb-3"></div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[240px]">
                    A founder's playbook for senior remote engineering hires.
                  </p>
                </div>

                {/* Bottom: brand */}
                <div className="flex items-end justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                    Kaptas Global
                  </span>
                  <span className="text-[10px] font-mono text-gray-600">kaptasglobal.io</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Headline + value props + form (or thank-you state) */}
          <div className="max-w-xl w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-kaptas-green backdrop-blur-sm">
                <BookOpen className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Free Ebook
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white">
              The Smart Guide to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                Hiring Brazilian Engineers
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed font-light">
              {EBOOK_SUBTITLE}
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {valueProps.map((vp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <vp.icon className="w-4 h-4 mt-0.5 text-kaptas-green shrink-0" strokeWidth={2} />
                  <span>{vp.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Form vs Thank-you state */}
            {!downloaded ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 border border-white/10 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Get the guide
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    autoComplete="name"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-kaptas-green focus:bg-white/10 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Work email"
                    autoComplete="email"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-kaptas-green focus:bg-white/10 transition"
                  />
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company"
                    autoComplete="organization"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-kaptas-green focus:bg-white/10 transition"
                  />
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Your role (e.g. CTO, Founder)"
                    autoComplete="organization-title"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-kaptas-green focus:bg-white/10 transition"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 mt-1" role="alert">{error}</p>
                )}

                <div className="mt-1">
                  <TurnstileWidget theme="dark" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 bg-kaptas-green text-kaptas-black px-5 py-3 rounded-lg border border-kaptas-green text-sm font-semibold hover:brightness-90 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_18px_var(--color-kaptas-green)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Opening your guide…" : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Get the guide
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  We use your details to unlock the guide and the occasional follow-up if relevant.
                  See our <Link to="/privacy-policy" className="underline hover:text-kaptas-green">Privacy Policy</Link>.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-7 border border-kaptas-green/30 bg-kaptas-green/[0.05] rounded-2xl backdrop-blur-sm"
              >
                <div className="flex items-start gap-3 mb-5">
                  <CheckCircle2 className="w-6 h-6 text-kaptas-green shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <h2 className="text-white font-bold text-lg mb-1">Your guide is ready</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      The guide opens in a new tab. If it did not open automatically, use the button below.
                    </p>
                  </div>
                </div>
                <a
                  href={EBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-kaptas-green text-kaptas-black px-5 py-3 rounded-lg border border-kaptas-green text-sm font-semibold hover:brightness-90 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-[0_0_18px_var(--color-kaptas-green)]"
                >
                  Open the guide
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">While you have a moment:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/pricing"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition"
                    >
                      See pricing
                    </Link>
                    <Link
                      to="/direct-hire"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition"
                    >
                      Direct Hire
                    </Link>
                    <Link
                      to="/contractor-staffing"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition"
                    >
                      Outsourcing & Staffing
                    </Link>
                    <Link
                      to="/blog"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition"
                    >
                      Read the blog
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom secondary CTA */}
        <div className="mt-24 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 font-semibold">
            Ready to skip the guide and talk to someone?
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            See pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>
    </>
  );
}
