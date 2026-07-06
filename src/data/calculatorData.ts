/**
 * calculatorData — the single source of truth for /calculator benchmarks.
 *
 * HOW TO FILL THIS FILE (Rodolfo):
 * Every role has three seniority levels; every level has three numbers, all
 * optional. Fill what you have, leave the rest as null — the page renders a
 * "benchmarks being finalized" state for null entries and shows real numbers
 * the moment a value lands here. No other file needs to change.
 *
 *   staffingMonthlyUsd    — Outsourcing & Staffing: flat ALL-IN monthly cost
 *                           (salary + CLT charges + Kaptas Global fee), USD.
 *   directHireAnnualUsd   — Direct Hire: the professional's expected
 *                           first-year annual compensation, USD. The page
 *                           derives the one-time 18% fee from this.
 *   usEquivalentAnnualUsd — comparable US annual compensation for the same
 *                           role/seniority. Powers the computed savings %.
 *                           While null, the page falls back to the published
 *                           "40 to 60%" site-wide claim.
 *
 * Example of a fully-filled level:
 *   senior: {
 *     staffingMonthlyUsd:    { min: 4000, max: 6000 },
 *     directHireAnnualUsd:   { min: 48000, max: 72000 },
 *     usEquivalentAnnualUsd: { min: 130000, max: 180000 },
 *   },
 *
 * The four Senior staffing ranges already filled below are the ones publicly
 * listed on /pricing since launch — they are NOT new numbers. When you update
 * benchmarks, set BENCHMARKS_LAST_UPDATED so the page shows freshness (good
 * for SEO/AEO trust signals).
 */

export type Seniority = "mid" | "senior" | "lead";
export type EngagementModel = "staffing" | "directHire";

export interface UsdRange {
  min: number;
  max: number;
}

export interface LevelBenchmark {
  staffingMonthlyUsd: UsdRange | null;
  directHireAnnualUsd: UsdRange | null;
  usEquivalentAnnualUsd: UsdRange | null;
}

export interface CalculatorRole {
  id: string;
  title: string;
  category: "Engineering" | "Data & AI" | "Quality & DevOps" | "Product & Leadership";
  levels: Record<Seniority, LevelBenchmark | null>;
}

/** ISO date (YYYY-MM-DD) of the last benchmark refresh; null hides the line. */
export const BENCHMARKS_LAST_UPDATED: string | null = null;

export const SENIORITY_LABELS: Record<Seniority, string> = {
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead / Staff",
};

export const ENGAGEMENT_LABELS: Record<EngagementModel, string> = {
  staffing: "Outsourcing & Staffing",
  directHire: "Direct Hire",
};

export const DIRECT_HIRE_FEE_RATE = 0.18;

const EMPTY_LEVELS: Record<Seniority, LevelBenchmark | null> = {
  mid: null,
  senior: null,
  lead: null,
};

export const CALCULATOR_ROLES: CalculatorRole[] = [
  {
    id: "full-stack-engineer",
    title: "Full-Stack Engineer",
    category: "Engineering",
    levels: {
      mid: null,
      // Published on /pricing since launch ("Senior Full-stack Engineer $4k - $6k/month")
      senior: {
        staffingMonthlyUsd: { min: 4000, max: 6000 },
        directHireAnnualUsd: null,
        usEquivalentAnnualUsd: null,
      },
      lead: null,
    },
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    category: "Engineering",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    category: "Engineering",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "mobile-engineer",
    title: "Mobile Engineer",
    category: "Engineering",
    levels: {
      mid: null,
      // Published on /pricing since launch ("Mobile Engineer $4k - $6k/month")
      senior: {
        staffingMonthlyUsd: { min: 4000, max: 6000 },
        directHireAnnualUsd: null,
        usEquivalentAnnualUsd: null,
      },
      lead: null,
    },
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Data & AI",
    levels: {
      mid: null,
      // Published on /pricing since launch ("Data Engineer $4.5k - $7k/month")
      senior: {
        staffingMonthlyUsd: { min: 4500, max: 7000 },
        directHireAnnualUsd: null,
        usEquivalentAnnualUsd: null,
      },
      lead: null,
    },
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "ml-engineer",
    title: "ML / AI Engineer",
    category: "Data & AI",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    category: "Quality & DevOps",
    levels: {
      mid: null,
      // Published on /pricing since launch ("QA Engineer $3k - $5k/month")
      senior: {
        staffingMonthlyUsd: { min: 3000, max: 5000 },
        directHireAnnualUsd: null,
        usEquivalentAnnualUsd: null,
      },
      lead: null,
    },
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Quality & DevOps",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Product & Leadership",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "tech-lead",
    title: "Tech Lead",
    category: "Product & Leadership",
    levels: { ...EMPTY_LEVELS },
  },
  {
    id: "engineering-manager",
    title: "Engineering Manager",
    category: "Product & Leadership",
    levels: { ...EMPTY_LEVELS },
  },
];

export const ROLE_CATEGORIES: CalculatorRole["category"][] = [
  "Engineering",
  "Data & AI",
  "Quality & DevOps",
  "Product & Leadership",
];

/** "$4,000" — plain USD, no cents. */
export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

/** "$4,000 to $6,000" */
export function formatUsdRange(range: UsdRange): string {
  return `${formatUsd(range.min)} to ${formatUsd(range.max)}`;
}

/** The one-time Direct Hire fee range derived from an annual compensation range. */
export function directHireFeeRange(annual: UsdRange): UsdRange {
  return {
    min: Math.round(annual.min * DIRECT_HIRE_FEE_RATE),
    max: Math.round(annual.max * DIRECT_HIRE_FEE_RATE),
  };
}

/**
 * Savings vs the US equivalent, computed midpoint-to-midpoint and rounded to
 * the nearest 5%. Returns null when either side is missing — callers fall
 * back to the published site-wide "40 to 60%" claim.
 */
export function computeSavingsPct(
  brazilAnnual: UsdRange | null,
  usAnnual: UsdRange | null,
): number | null {
  if (!brazilAnnual || !usAnnual) return null;
  const brMid = (brazilAnnual.min + brazilAnnual.max) / 2;
  const usMid = (usAnnual.min + usAnnual.max) / 2;
  if (usMid <= 0 || brMid >= usMid) return null;
  return Math.round(((1 - brMid / usMid) * 100) / 5) * 5;
}

/** Annualized staffing cost (monthly x 12) for savings comparisons. */
export function annualizeStaffing(monthly: UsdRange): UsdRange {
  return { min: monthly.min * 12, max: monthly.max * 12 };
}
