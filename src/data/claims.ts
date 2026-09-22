/**
 * claims.ts — canonical values for every public claim the site makes.
 *
 * Single source of truth. Before this file existed the same claim shipped in
 * six different shapes ("50%+", "40-60%", "up to 67%", "14 days", "day 14",
 * "1 to 70 employees", "1-100 employees") across TSX copy, JSON-LD schemas,
 * llms.txt and the AEO paragraphs. Answer engines quote whichever variant they
 * happen to crawl, so an inconsistent claim is not a cosmetic problem: it is a
 * trust problem the moment a prospect compares two answers.
 *
 * Rules:
 * 1. Never hard-code a cost, timeline, ICP-size, guarantee or fee string in a
 *    component or schema. Import it from here.
 * 2. The cost claim is a single number ("up to 60%"), never a range. Case-study
 *    figures (e.g. the 55% in the home AEO paragraph) are outcomes of a real
 *    placement, not claims, and stay as written.
 * 3. CLT_LOAD is educational only (Hire in Brazil page, blog). It must never
 *    appear in an Outsourcing & Staffing price breakdown: that engagement is a
 *    PJ contract and carries no CLT charges.
 * 4. Markdown/txt surfaces (content/llms-full-core.md, public/llms.txt) cannot
 *    import TypeScript. They are edited by hand to these exact strings.
 *
 * Locked by Rodolfo 2026-09-22 (site consistency and trust spec).
 */

/** Full cost claim, for sentences that state the claim outright. */
export const COST_CLAIM = "up to 60% lower cost than equivalent U.S. hires";

/** Hero badges and short labels. */
export const COST_CLAIM_SHORT = "Up to 60% lower cost";

/** Shortlist promise. */
export const SHORTLIST = "a pre-vetted shortlist within 5 business days";

/** Time-to-hire promise. Replaces every "14 days" / "day 14" / "14-day". */
export const TIME_TO_HIRE = "most hires close in 2 to 4 weeks";

/** ICP company size. Replaces "1 to 70 employees" and "1-100 employees". */
export const ICP_SIZE = "up to 100 employees";

/** CLT employer load. Educational only — never part of a Staffing price. */
export const CLT_LOAD = "70 to 80% above gross salary";

/** Direct Hire replacement guarantee. */
export const GUARANTEE = "90 to 180 day replacement guarantee";

/** Direct Hire fee. */
export const FEE = "one-time placement fee of 18% of first-year compensation";

/* ------------------------------------------------------------------ */
/* Fragments — the same canonical values, shaped for mid-sentence use. */
/* ------------------------------------------------------------------ */

/** The savings figure on its own. Always a single number. */
export const COST_SAVINGS = "up to 60%";

/** The time-to-hire window on its own. */
export const TIME_TO_HIRE_WINDOW = "2 to 4 weeks";

/** The shortlist window on its own. */
export const SHORTLIST_WINDOW = "5 business days";

/**
 * What the Outsourcing & Staffing monthly fee is actually made of.
 * Outsourcing & Staffing is a PJ contractor engagement, so the fee contains no
 * CLT charges and no "mandatory Brazilian employment charges". The site keeps
 * the familiar term "employer of record" because that is what clients search
 * for; only the composition of the fee is stated accurately.
 */
export const STAFFING_COST_COMPOSITION =
  "the professional's compensation, Kaptas Global's management fee, and ongoing HR support";
