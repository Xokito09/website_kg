/**
 * Crawler-view regression test.
 *
 * What it guards
 * The site is a Vite SPA prerendered by scripts/prerender.mjs. Two classes of
 * regression are invisible in a browser and silent in every other test:
 *
 *  1. A page stops being prerendered (added to the sitemap but not to the
 *     prerender route list), so crawlers that do not run JS get the empty
 *     shell while the sitemap keeps advertising the URL.
 *  2. Visible copy stops shipping in the static HTML. This happened on
 *     2026-09-22: every FAQ accordion mounted its answer panel conditionally,
 *     so the prerendered HTML carried the questions and the FAQPage JSON-LD
 *     but none of the answer text. A crawler saw structured data with nothing
 *     behind it, which is exactly the structured-data/visible-content
 *     mismatch Google penalises. The panels are now always in the DOM and
 *     collapsed with CSS; this test is what keeps them that way.
 *
 * It also pins the claims cleanup from the same day: the retired "14 days"
 * timeline, the false "CLT charges" composition of the Staffing fee, the
 * sr-only AEO block, meta keywords, and the removed /calculator page must not
 * come back through any surface.
 *
 * Skips (does not fail) when dist/ is absent, so `npm test` still works on a
 * clean checkout with no build. Run it alone with `npm run test:crawl`.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const DIST = path.join(REPO_ROOT, "dist");
const SITEMAP = path.join(REPO_ROOT, "public/sitemap.xml");

const NO_DIST = !fs.existsSync(DIST);
const SKIP = NO_DIST ? { skip: "dist/ not built — run `npm run build` first" } : {};

/** Minimal entity decode: the prerendered HTML escapes &, ', ", < and >. */
function decodeEntities(html) {
  return html
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** Everything a non-JS crawler can read: no <script> of any kind. */
function crawlerText(html) {
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  return decodeEntities(withoutScripts);
}

function readDist(relPath) {
  return fs.readFileSync(path.join(DIST, relPath), "utf-8");
}

/** Every .html file under dist/, recursively. */
function allDistHtml(dir = DIST, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) allDistHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

// ---------------------------------------------------------------------------
// 1. Every sitemap URL is actually prerendered
// ---------------------------------------------------------------------------
test("every sitemap URL has prerendered HTML in dist/", SKIP, () => {
  const xml = fs.readFileSync(SITEMAP, "utf-8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length > 0, "sitemap.xml has no <loc> entries");

  const missing = [];
  for (const loc of locs) {
    const pathname = new URL(loc).pathname.replace(/\/$/, "");
    const file = pathname === "" ? "index.html" : path.join(pathname.slice(1), "index.html");
    if (!fs.existsSync(path.join(DIST, file))) missing.push(`${loc} -> dist/${file}`);
  }
  assert.deepEqual(missing, [], `sitemap advertises URLs with no prerendered HTML:\n${missing.join("\n")}`);
});

// ---------------------------------------------------------------------------
// 2. Visible copy ships in the static HTML, outside every <script>
// ---------------------------------------------------------------------------
const ENTITY_ANSWER_OPENERS = {
  "/": "recruitment agency and strategic hiring partner",
  "/pricing": "recruitment agency and strategic hiring partner",
  "/direct-hire": "Direct Hire is Kaptas Global's placement service",
  "/contractor-staffing": "Outsourcing & Staffing places senior Brazilian",
  "/executive-mapping": "Executive Mapping is a standalone market-intelligence report",
  "/hire-in-brazil": "Hire in Brazil is Kaptas Global's market-entry service",
};

// Claims that must be readable without JS, per page.
const CLAIM_PHRASES = {
  "/": ["Up to 60% lower cost", "2 to 4 weeks"],
  "/pricing": [],
  "/direct-hire": ["2 to 4 weeks"],
  "/contractor-staffing": ["2 to 4 weeks"],
  "/executive-mapping": [],
  "/hire-in-brazil": [],
};

for (const [route, opener] of Object.entries(ENTITY_ANSWER_OPENERS)) {
  const file = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");

  test(`${route}: last FAQ answer is in the crawler-visible HTML`, SKIP, () => {
    const text = crawlerText(readDist(file));
    assert.ok(
      text.includes(opener),
      `${route}: "${opener}" is missing from the HTML once every <script> is stripped. ` +
        `The FAQ answer panel is probably being conditionally mounted again.`
    );
  });

  const claims = CLAIM_PHRASES[route];
  if (claims.length) {
    test(`${route}: canonical claims are in the crawler-visible HTML`, SKIP, () => {
      const text = crawlerText(readDist(file));
      for (const phrase of claims) {
        assert.ok(text.includes(phrase), `${route}: "${phrase}" missing from crawler-visible HTML`);
      }
    });
  }
}

// ---------------------------------------------------------------------------
// 3. Retired claims and removed surfaces must not come back
// ---------------------------------------------------------------------------
const FORBIDDEN = [
  { needle: "14 days", why: "retired timeline claim — canonical is '2 to 4 weeks'" },
  { needle: "day 14", why: "retired timeline claim — canonical is '2 to 4 weeks'" },
  { needle: "CLT charges", why: "Outsourcing & Staffing is a PJ engagement and carries no CLT charges" },
  { needle: 'sr-only" aria-label', why: "the sr-only AEO block was removed on purpose" },
  { needle: 'name="keywords"', why: "meta keywords support was removed" },
  { needle: 'href="/calculator', why: "/calculator was removed from the site" },
  { needle: "kaptasglobal.io/calculator", why: "/calculator was removed from the site" },
];

test("no retired claim or removed surface ships in any dist HTML", SKIP, () => {
  const offenders = [];
  for (const file of allDistHtml()) {
    const raw = fs.readFileSync(file, "utf-8");
    const text = decodeEntities(raw);
    for (const { needle, why } of FORBIDDEN) {
      if (text.includes(needle) || raw.includes(needle)) {
        offenders.push(`${path.relative(DIST, file)}: "${needle}" (${why})`);
      }
    }
  }
  assert.deepEqual(offenders, [], `forbidden strings found in built HTML:\n${offenders.join("\n")}`);
});
