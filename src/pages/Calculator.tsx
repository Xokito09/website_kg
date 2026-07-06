/**
 * /calculator — Brazil Hiring Cost Calculator.
 *
 * Interactive structure is complete; the numbers live in ONE file
 * (src/data/calculatorData.ts) so filling in benchmarks later requires no
 * changes here. Levels without data render a "benchmarks being finalized"
 * state that routes the visitor to the lead form — the page converts even
 * while partially filled.
 *
 * The slug was deliberately kept redirect-free since the WP migration
 * (Memory anti-pattern #5) precisely so this page could ship clean.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { SEO } from "../components/SEO";
import { AEOContent } from "../components/AEOContent";
import {
  organizationSchema,
  calculatorSchema,
  calculatorFaqSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "../data/seoSchemas";
import { AEO_PARAGRAPHS } from "../data/aeoContent";
import {
  CALCULATOR_ROLES,
  ROLE_CATEGORIES,
  SENIORITY_LABELS,
  ENGAGEMENT_LABELS,
  BENCHMARKS_LAST_UPDATED,
  formatUsdRange,
  directHireFeeRange,
  computeSavingsPct,
  annualizeStaffing,
  type Seniority,
  type EngagementModel,
} from "../data/calculatorData";
import { formatDateLong } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Plus, Minus } from "lucide-react";
import { LeadGenerationForm } from "../components/home/LeadGenerationForm";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
};

const calculatorBreadcrumb = buildBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Calculator", url: `${SITE_URL}/calculator` },
]);

type DataLayerWindow = { dataLayer?: Array<Record<string, unknown>> };

// One event + parameters, never per-selection event names (Memory anti-pattern #1).
// Inert until a GTM tag subscribes to it — wiring the GA4 tag is a separate,
// deliberate step so the container never receives events nobody asked for.
function pushCalculatorInteraction(role: string, seniority: string, engagement: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "calculator_interaction",
    calc_role: role,
    calc_seniority: seniority,
    calc_engagement: engagement,
  });
}

function scrollToLeadForm() {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
}

// FAQ copy mirrors calculatorFaqSchema in seoSchemas.ts — keep both in sync.
const faqs = [
  {
    q: "What does the Brazil hiring cost calculator show?",
    a: "The calculator shows benchmark cost ranges for hiring Brazilian tech professionals by role and seniority, under both Kaptas Global hiring models. For Outsourcing & Staffing it shows the flat all-in monthly cost (salary, Brazilian employment charges, and management fee in a single USD invoice). For Direct Hire it shows the professional's expected first-year compensation and the one-time 18% placement fee derived from it.",
  },
  {
    q: "What is included in the monthly cost shown for Outsourcing & Staffing?",
    a: "The monthly figure is all-in: the professional's salary, all mandatory Brazilian employment charges (which typically add 70 to 80% above gross salary under CLT contracts), Kaptas Global's management fee, and ongoing HR support. You receive one USD invoice with no separate charges for payroll, taxes, benefits, or compliance, and unlimited replacements are included.",
  },
  {
    q: "Why is hiring in Brazil 40 to 60% cheaper than hiring in the US?",
    a: "Brazilian compensation benchmarks are 40 to 60% lower than US equivalents at the same seniority, driven by local cost of living and currency, not by lower talent quality. Brazil has more than 1.5 million tech graduates and its engineers are actively recruited by companies like Google, Netflix, Microsoft, and Stripe. The GMT-3 timezone also gives 5 to 8 hours of daily overlap with US teams, so the savings come without offshore hand-off friction.",
  },
  {
    q: "How accurate are these salary benchmarks?",
    a: "The ranges come from real Kaptas Global placements and from the market-mapping research behind the Executive Mapping service, and they are refreshed periodically. They are benchmarks, not quotes: the exact cost for your role depends on the specific skill set and seniority, and is confirmed alongside each candidate profile presented, before any commitment.",
  },
  {
    q: "How do I get an exact number for my role?",
    a: "Submit the form on this page with the role you are hiring for. Kaptas Global responds with current benchmarks for that exact profile and, if you want to proceed, a pre-vetted shortlist of candidates within 5 business days, each presented with their all-in cost. There are no retainers and no upfront fees under either hiring model.",
  },
];

function CalculatorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="bg-[#111111] py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">How the calculator works and where the numbers come from.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span className="text-lg font-medium text-white group-hover:text-kaptas-green transition-colors pr-8">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-kaptas-green group-hover:bg-kaptas-green/10 transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed text-base" data-speakable="true">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Crawler-readable benchmark index. Renders ONLY levels that have data, as
 * plain sentences inside an sr-only block — it grows automatically as
 * calculatorData.ts is filled, keeping the page's machine-readable surface in
 * lockstep with what visitors see.
 */
function BenchmarkIndexForCrawlers() {
  const sentences: string[] = [];
  for (const role of CALCULATOR_ROLES) {
    for (const seniority of Object.keys(role.levels) as Seniority[]) {
      const level = role.levels[seniority];
      if (!level) continue;
      const parts: string[] = [];
      if (level.staffingMonthlyUsd) {
        parts.push(
          `${formatUsdRange(level.staffingMonthlyUsd)} per month all-in under Outsourcing & Staffing`,
        );
      }
      if (level.directHireAnnualUsd) {
        parts.push(
          `${formatUsdRange(level.directHireAnnualUsd)} first-year compensation under Direct Hire (one-time 18% placement fee)`,
        );
      }
      if (parts.length > 0) {
        sentences.push(
          `${SENIORITY_LABELS[seniority]} ${role.title} in Brazil: ${parts.join("; ")}.`,
        );
      }
    }
  }
  if (sentences.length === 0) return null;
  return (
    <section className="sr-only" aria-label="Current benchmark index">
      <h2>Brazil hiring cost benchmarks currently published in this calculator</h2>
      <p>{sentences.join(" ")}</p>
    </section>
  );
}

export default function Calculator() {
  const [roleId, setRoleId] = useState<string>(CALCULATOR_ROLES[0].id);
  const [seniority, setSeniority] = useState<Seniority>("senior");
  const [engagement, setEngagement] = useState<EngagementModel>("staffing");

  const role = useMemo(
    () => CALCULATOR_ROLES.find((r) => r.id === roleId) ?? CALCULATOR_ROLES[0],
    [roleId],
  );
  const benchmark = role.levels[seniority];

  // Track selection changes (not the initial render) with one unified event.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    pushCalculatorInteraction(role.id, seniority, engagement);
  }, [role.id, seniority, engagement]);

  const staffingRange = benchmark?.staffingMonthlyUsd ?? null;
  const directHireRange = benchmark?.directHireAnnualUsd ?? null;
  const activeRange = engagement === "staffing" ? staffingRange : directHireRange;

  const savingsPct = computeSavingsPct(
    engagement === "staffing"
      ? staffingRange && annualizeStaffing(staffingRange)
      : directHireRange,
    benchmark?.usEquivalentAnnualUsd ?? null,
  );

  return (
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Brazil Hiring Cost Calculator — Kaptas Global | Salaries by Role & Seniority"
        description="Free calculator: what it costs to hire Brazilian tech talent by role and seniority. All-in monthly cost for Outsourcing & Staffing, or first-year compensation plus one-time 18% fee for Direct Hire. No retainers."
        keywords="brazil hiring cost calculator, brazilian developer salary calculator, cost to hire software engineer brazil, brazil salary benchmarks tech, nearshore hiring cost calculator, hire developers brazil cost, outsourcing brazil monthly cost, brazil vs us developer salary"
        canonical="https://kaptasglobal.io/calculator"
        eyebrow="Calculator"
        ogTitle="Brazil Hiring Cost Calculator"
        ogSubtitle="What senior Brazilian tech talent actually costs, by role and seniority. Free, no email required."
        schemas={[organizationSchema, calculatorSchema, calculatorFaqSchema, calculatorBreadcrumb]}
      />
      <AEOContent paragraph={AEO_PARAGRAPHS.calculator} label="Calculator overview" />

      <div>
        {/* 1. Hero — same composition as /pricing */}
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
                  What hiring in Brazil
                </span>
                <span className="block mt-2 text-[48px] md:text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
                  actually costs
                </span>
              </h1>

              <p className="relative text-xl md:text-2xl leading-relaxed font-light text-transparent bg-clip-text bg-[linear-gradient(110deg,#9ca3af_35%,#e2e8f0_45%,#ffffff_50%,#e2e8f0_55%,#9ca3af_65%)] animate-shimmer max-w-2xl text-center">
                Pick a role and seniority. See the all-in number.
                <span
                  className="absolute inset-0 text-transparent bg-clip-text bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.5)_45%,#ffffff_50%,rgba(255,255,255,0.5)_55%,transparent_65%)] animate-shimmer blur-[6px] pointer-events-none"
                  aria-hidden="true"
                >
                  Pick a role and seniority. See the all-in number.
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. The calculator card */}
        <motion.section
          {...fadeIn}
          className="px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20 -mt-24 lg:-mt-48"
        >
          <div className="group relative bg-[#0047FF]/20 rounded-[2rem] p-[1px] overflow-hidden mt-[60px]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0047FF]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="relative bg-[#0A0A0A] rounded-[calc(2rem-1px)] p-6 md:p-10 z-10">
              <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-12">
                {/* Left: role picker */}
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                    1 · Choose a role
                  </div>
                  <div className="space-y-6">
                    {ROLE_CATEGORIES.map((category) => (
                      <div key={category}>
                        <div className="text-xs text-gray-500 mb-2">{category}</div>
                        <div className="flex flex-wrap gap-2">
                          {CALCULATOR_ROLES.filter((r) => r.category === category).map((r) => {
                            const active = r.id === role.id;
                            return (
                              <button
                                key={r.id}
                                onClick={() => setRoleId(r.id)}
                                aria-pressed={active}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                                  active
                                    ? "bg-kaptas-green/10 border-kaptas-green/50 text-white"
                                    : "bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-white"
                                }`}
                              >
                                {r.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: seniority + model + result */}
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 mb-8">
                    <div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                        2 · Seniority
                      </div>
                      <div className="inline-flex bg-white/[0.03] border border-white/10 rounded-xl p-1">
                        {(Object.keys(SENIORITY_LABELS) as Seniority[]).map((level) => (
                          <button
                            key={level}
                            onClick={() => setSeniority(level)}
                            aria-pressed={seniority === level}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              seniority === level
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                            }`}
                          >
                            {SENIORITY_LABELS[level]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                        3 · Hiring model
                      </div>
                      <div className="inline-flex bg-white/[0.03] border border-white/10 rounded-xl p-1">
                        {(Object.keys(ENGAGEMENT_LABELS) as EngagementModel[]).map((model) => (
                          <button
                            key={model}
                            onClick={() => setEngagement(model)}
                            aria-pressed={engagement === model}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              engagement === model
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                            }`}
                          >
                            {ENGAGEMENT_LABELS[model]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Result panel */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex-1 flex flex-col">
                    <div className="text-sm text-gray-400 mb-2">
                      {SENIORITY_LABELS[seniority]} {role.title} · {ENGAGEMENT_LABELS[engagement]}
                    </div>

                    {activeRange ? (
                      <>
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-[#00d26a] tracking-tight">
                            {formatUsdRange(activeRange)}
                          </span>
                          <span className="text-base text-gray-400 font-light">
                            {engagement === "staffing" ? "/month, all-in" : "first-year compensation"}
                          </span>
                        </div>

                        {engagement === "directHire" && directHireRange && (
                          <div className="text-gray-300 mb-6">
                            One-time placement fee (18%):{" "}
                            <span className="font-mono text-white">
                              {formatUsdRange(directHireFeeRange(directHireRange))}
                            </span>
                            , paid only after a successful hire.
                          </div>
                        )}

                        <div className="mb-8">
                          <span className="inline-flex items-center gap-2 bg-kaptas-green/10 border border-kaptas-green/30 rounded-full px-4 py-1.5 text-sm text-kaptas-green font-medium">
                            {savingsPct !== null
                              ? `${savingsPct}% below comparable US hires`
                              : "Typically 40 to 60% below comparable US hires"}
                          </span>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {(engagement === "staffing"
                            ? [
                                "One monthly USD invoice: salary, compliance, and payroll included",
                                "No Brazilian entity required",
                                "Unlimited replacement at no cost",
                                "Every candidate interviewed by a founder",
                              ]
                            : [
                                "Pay only after a successful hire, no retainer",
                                "90 to 180-day replacement guarantee",
                                "Shortlist of vetted candidates within 5 business days",
                                "Every candidate interviewed by a founder",
                              ]
                          ).map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-1">
                                <CheckCircle2 className="w-4 h-4 text-kaptas-green/70 shrink-0" strokeWidth={1.5} />
                              </div>
                              <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col justify-center py-6">
                        <div className="text-2xl md:text-3xl font-medium text-white mb-3">
                          Benchmarks for this profile are being finalized
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-8 max-w-xl">
                          We keep every published range tied to real placements and current
                          market-mapping data. Ask below and we'll send the current numbers for a{" "}
                          {SENIORITY_LABELS[seniority].toLowerCase()} {role.title} directly.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={scrollToLeadForm}
                      className="inline-flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-xl text-white font-medium transition-all group/btn mt-auto"
                    >
                      <span>
                        {activeRange
                          ? `Get a shortlist for this role`
                          : `Request current benchmarks for this role`}
                      </span>
                      <ArrowRight className="w-5 h-5 text-kaptas-green group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    Benchmarks are based on real Kaptas Global placements and market-mapping
                    research; the exact cost for your role is confirmed alongside each candidate
                    profile presented.
                    {BENCHMARKS_LAST_UPDATED && (
                      <> Last updated {formatDateLong(BENCHMARKS_LAST_UPDATED)}.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <BenchmarkIndexForCrawlers />

      {/* Lead form — same wrapper convention as /pricing */}
      <div id="lead-form" className="w-full flex flex-col">
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <LeadGenerationForm
          headline={
            <>
              Get exact numbers for <span className="font-semibold text-[#111111]">your role</span>
            </>
          }
          subtext="Tell us what you're hiring for and we'll reply with current benchmarks and a tailored shortlist proposal."
          ctaText="Start for free"
        />
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      <CalculatorFAQ />
    </div>
  );
}
