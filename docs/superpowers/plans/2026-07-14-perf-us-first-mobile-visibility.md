# Performance Refactor + Mobile Visibility Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make kaptasglobal.io load fast for US users (and acceptably everywhere, including Argentina) and fix the mobile "invisible form / cut sections" bug — with zero visual/UI changes at rest.

**Architecture:** The site is a Vite + React SPA, prerendered to static HTML per-route by Puppeteer (`scripts/prerender.mjs`), served from Vercel's edge CDN. Nothing regional needs to change — US POPs already serve US users. The two root problems are (1) the prerendered HTML ships 32 elements with inline `opacity: 0` (framer-motion initial states snapshotted before animations complete), so the page is invisible until 302KB gz / 1.13MB of JS downloads, parses, and hydrates; and (2) that bundle is a monolith containing all 14 pages, the full blog content JSON (229KB of it), and the d3/map stack. We fix visibility at the prerender layer and cut the bundle with route/component splitting. Animations, layout, and all visuals stay byte-identical after hydration.

**Tech Stack:** Vite 6, React 18 (`hydrateRoot`), react-router-dom 7, motion 12 (framer-motion), react-simple-maps, puppeteer-core + @sparticuz/chromium (prerender), Vercel static hosting.

## Root-Cause Evidence (measured 2026-07-14 on production)

| Finding | Evidence |
|---|---|
| Page ships invisible | 28× `style="opacity: 0; transform: translateY(20px);"` + 4× `style="opacity: 0;"` in served homepage HTML (all sections incl. the lead-form wrapper) |
| Why: prerender snapshots too early | `prerender.mjs` waits `networkidle0 + 250ms`; `whileInView` reveals below Puppeteer's fold never fire; 250ms < 0.6–0.8s animation durations |
| Monolith bundle | Single `dist/assets/index-*.js` = 1,132,873 bytes raw / ~302KB gz; all 14 routes statically imported in `src/App.tsx` |
| Blog content in homepage bundle | `src/data/blog-posts.json` = 251KB, 92% of it is `content`; imported by `BlogInsights.tsx` (rendered on Home), `Blog.tsx`, `BlogPost.tsx` |
| Map stack + third-party fetch | `TechMapBackground.tsx` (react-simple-maps/d3) in main bundle; atlas JSON fetched from `cdn.jsdelivr.net` (extra DNS+TLS origin) |
| Font chain | `src/index.css:1` uses `@import url(fonts.googleapis…)` → serial chain CSS → font-CSS → woff2 |
| CSP noise | 6–7 POSTs to `/api/csp-report` per pageview (serverless invocations); waterfall shows `googleads.g.doubleclick.net` script not in `script-src` |
| Turnstile double-load | Prerender bakes the dynamically-injected Turnstile `<script>` tag into HTML (confirmed: 1 match in served homepage); client injects a second one → console warnings ×4, and Turnstile JS loads for every visitor immediately |
| Homepage totals | 43 requests, 513KB transferred, 1.49MB decoded; DOMContentLoaded 3.0s, load 5.4s from São Paulo on fast link |

**Why Argentina is slow and Brazil feels fine:** both are served from Vercel's `gru1` (São Paulo) POP; Argentina adds cross-border latency + congested international bandwidth, which multiplies against 513KB + a JS-gated blank page. The US is served from US POPs and is likely already OK — but the same payload cuts benefit US users most (fewer RTTs, faster hydration). There is no Vercel/regional setting to change; payload is the lever.

## Global Constraints

- **Zero UI change at rest:** after animations settle, rendered pixels must match production. Entrance animations keep playing exactly as today after hydration. Verified by before/after full-page screenshots (Task 0 harness).
- **No new npm dependencies, no paid services.** Tests use `node --test` (built-in). Bundle inspection uses build output sizes only.
- **Branch-only until approval:** all work on branch `perf/us-first-loading`; verify on the Vercel preview deployment; merge to `main` only after Rodolfo approves (Task 9 gate).
- **No copy changes, no brand/visual decisions** (kg-site-engineer scope rule).
- **Never re-add `https://cdn.jsdelivr.net` or other third-party origins;** we are removing one.
- **Local builds:** prerender needs local Chrome: `PUPPETEER_EXECUTABLE_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe"` (confirmed present).
- Commit messages explain reasoning (house rule). 1–3 commits per task is fine; each task ends committed.

## Expected Impact

| Change | Expected effect |
|---|---|
| Prerender visibility fix (Task 1) | Content readable before ANY JS runs — fixes the mobile bug and the perceived slowness everywhere; also an SEO/AEO win (crawlers no longer see opacity:0 content) |
| Blog index split (Task 3) + route splitting (Task 4) + map lazy (Task 5) | Homepage JS from ~302KB gz → target < 150KB gz |
| Self-host atlas (Task 5), font de-chain (Task 7) | −1 origin each; shorter critical path |
| CSP fix (Task 8) | −6 serverless invocations per pageview |

---

### Task 0: Branch + performance-audit harness + production baseline

**Files:**
- Create: `scripts/perf-audit.mjs`
- Create: `docs/perf/baseline/` (output artifacts)
- Modify: `package.json` (add `test` and `perf-audit` scripts)

**Interfaces:**
- Produces: `node scripts/perf-audit.mjs <url> <label>` → writes `docs/perf/<label>/metrics.json`, `desktop.png`, `mobile.png`, `nojs-desktop.png`, `nojs-mobile.png`. Every later task's verification uses this command. `metrics.json` shape: `{ url, viewports: { desktop|mobile: { timing, bytesByType, totalTransferKB, requestCount, hiddenSectionCount, cspViolations[], consoleErrors[] } }, nojs: { desktop|mobile: { visibleSectionCount, hiddenSectionCount, formVisible } } }`.

- [ ] **Step 1: Create branch**

```bash
cd /c/Users/rodol/Projects/kaptas-global
git checkout -b perf/us-first-loading
```

- [ ] **Step 2: Write `scripts/perf-audit.mjs`**

```js
/**
 * Performance + visual-regression audit harness.
 *
 * Usage: node scripts/perf-audit.mjs <url> <label>
 *   e.g. node scripts/perf-audit.mjs https://kaptasglobal.io baseline
 *
 * For each viewport (desktop 1440x900, mobile 375x812):
 *   1. JS-enabled pass: capture CSP violations (listener installed before any
 *      page script), navigation timing, per-type transfer bytes, count of
 *      sections stuck at computed opacity 0 AFTER a full scroll-through
 *      (reveal animations given time to settle), console errors, and a
 *      full-page screenshot.
 *   2. JS-DISABLED pass: proves content is server-visible. Counts visible vs
 *      hidden <section> elements and whether the #lead-form is visible.
 *
 * Output: docs/perf/<label>/{metrics.json, desktop.png, mobile.png,
 *         nojs-desktop.png, nojs-mobile.png}
 *
 * This is the regression gate for the perf refactor: the "zero UI change"
 * constraint is checked by comparing <label> screenshots against baseline,
 * and the mobile-visibility fix is proven by nojs formVisible=true and
 * hiddenSectionCount=0.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const [, , url, label] = process.argv;
if (!url || !label) {
  console.error("Usage: node scripts/perf-audit.mjs <url> <label>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../docs/perf", label);
await fs.mkdir(OUT_DIR, { recursive: true });

const executablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false },
  mobile: { width: 375, height: 812, isMobile: true, hasTouch: true },
};

const browser = await puppeteer.launch({ executablePath, headless: true });
const results = { url, capturedAt: new Date().toISOString(), viewports: {}, nojs: {} };

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1000)); // let 0.6-0.8s reveals finish
}

function sectionStats() {
  const sections = [...document.querySelectorAll("section")];
  const hidden = sections.filter((s) => {
    const cs = getComputedStyle(s);
    return cs.opacity === "0" || cs.display === "none" || cs.visibility === "hidden";
  });
  const form = document.getElementById("lead-form");
  const formVisible = !!form && (() => {
    let el = form;
    while (el) {
      const cs = getComputedStyle(el);
      if (cs.opacity === "0" || cs.display === "none" || cs.visibility === "hidden") return false;
      el = el.parentElement;
    }
    return form.getBoundingClientRect().height > 0;
  })();
  return { total: sections.length, hidden: hidden.length, formVisible };
}

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  // ---- JS-enabled pass ----
  const page = await browser.newPage();
  await page.setViewport(vp);
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
  await page.evaluateOnNewDocument(() => {
    window.__cspViolations = [];
    window.addEventListener("securitypolicyviolation", (e) => {
      window.__cspViolations.push({ directive: e.violatedDirective, blocked: (e.blockedURI || "").slice(0, 120) });
    });
  });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollThrough(page);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] ?? {};
    const res = performance.getEntriesByType("resource");
    const bytesByType = {};
    let total = nav.transferSize || 0;
    for (const r of res) {
      const t = r.initiatorType || "other";
      bytesByType[t] = (bytesByType[t] || 0) + (r.transferSize || 0);
      total += r.transferSize || 0;
    }
    return {
      timing: {
        ttfbMs: Math.round(nav.responseStart || 0),
        domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd || 0),
        loadMs: Math.round(nav.loadEventEnd || 0),
        htmlTransferKB: +((nav.transferSize || 0) / 1024).toFixed(1),
      },
      bytesByType: Object.fromEntries(Object.entries(bytesByType).map(([k, v]) => [k, +(v / 1024).toFixed(1)])),
      totalTransferKB: +(total / 1024).toFixed(1),
      requestCount: res.length + 1,
      cspViolations: window.__cspViolations,
    };
  });
  metrics.consoleErrors = consoleErrors;
  metrics.sections = await page.evaluate(sectionStats);
  results.viewports[name] = metrics;
  await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true });
  await page.close();

  // ---- JS-disabled pass (proves server-visible content) ----
  const nojsPage = await browser.newPage();
  await nojsPage.setViewport(vp);
  await nojsPage.setJavaScriptEnabled(false);
  await nojsPage.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  results.nojs[name] = await nojsPage.evaluate(sectionStats);
  await nojsPage.screenshot({ path: path.join(OUT_DIR, `nojs-${name}.png`), fullPage: true });
  await nojsPage.close();
}

await browser.close();
await fs.writeFile(path.join(OUT_DIR, "metrics.json"), JSON.stringify(results, null, 2));

console.log(`\n=== ${label} @ ${url} ===`);
for (const [name, m] of Object.entries(results.viewports)) {
  console.log(`${name}: total=${m.totalTransferKB}KB reqs=${m.requestCount} load=${m.timing.loadMs}ms ` +
    `hiddenSections=${m.sections.hidden}/${m.sections.total} formVisible=${m.sections.formVisible} ` +
    `cspViolations=${m.cspViolations.length} consoleErrors=${m.consoleErrors.length}`);
  console.log(`  no-JS: hiddenSections=${results.nojs[name].hidden}/${results.nojs[name].total} formVisible=${results.nojs[name].formVisible}`);
}
console.log(`Artifacts: docs/perf/${label}/`);
```

- [ ] **Step 3: Add npm scripts**

In `package.json` `"scripts"`, add:

```json
"perf-audit": "node scripts/perf-audit.mjs",
"test": "node --test scripts/"
```

- [ ] **Step 4: Run baseline against production**

```bash
cd /c/Users/rodol/Projects/kaptas-global
node scripts/perf-audit.mjs https://kaptasglobal.io baseline
```

Expected output (approximately — this documents the CURRENT broken state):
- desktop/mobile: `total≈500KB`, `hiddenSections` low after scroll-through on desktop (animations run), possibly >0 on mobile
- **no-JS: `hiddenSections` ≈ 10+/14 and `formVisible=false`** ← this is the bug, captured as a failing baseline
- `cspViolations` ≥ 1 — record the exact `directive`/`blocked` values in `metrics.json`; Task 8 consumes them.

- [ ] **Step 5: Commit**

```bash
git add scripts/perf-audit.mjs package.json docs/perf/baseline/
git commit -m "perf: add audit harness + production baseline

Captures per-viewport transfer bytes, timing, CSP violations, and
JS-disabled visibility (sections + lead form). The no-JS pass documents
the bug this branch fixes: prerendered HTML ships with framer-motion
initial opacity:0 baked in, so content is invisible until full hydration."
```

---

### Task 1: Prerender visibility fix (the mobile bug root cause)

**Files:**
- Create: `scripts/prerender-postprocess.mjs`
- Create: `scripts/prerender-postprocess.test.mjs`
- Modify: `scripts/prerender.mjs` (scroll-through before snapshot; post-process + assert before write)

**Interfaces:**
- Produces: `stripMotionArtifacts(html: string): string` and `assertNoHiddenContent(html: string, route: string): void` (throws on baked `opacity: 0`). Used only by `prerender.mjs`.

- [ ] **Step 1: Write the failing test** — `scripts/prerender-postprocess.test.mjs`

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { stripMotionArtifacts, assertNoHiddenContent } from "./prerender-postprocess.mjs";

test("strips framer-motion initial opacity/translate inline styles", () => {
  const html =
    `<section class="px-6" style="opacity: 0; transform: translateY(20px);">A</section>` +
    `<div class="grid" style="opacity: 0;">B</div>` +
    `<section style="opacity: 0; transform: translateY(30px);">C</section>`;
  const out = stripMotionArtifacts(html);
  assert.equal(out.includes("opacity: 0"), false);
  assert.equal(out.includes(">A</section>"), true); // content untouched
  assert.equal(out.includes(`class="grid"`), true);
});

test("leaves unrelated inline styles alone", () => {
  const html = `<div style="opacity: 1; transform: none;">x</div><iframe style="display:none;visibility:hidden"></iframe>`;
  assert.equal(stripMotionArtifacts(html), html);
});

test("strips baked Turnstile script tag", () => {
  const html = `<head><script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script></head>`;
  assert.equal(stripMotionArtifacts(html).includes("challenges.cloudflare.com"), false);
});

test("assertNoHiddenContent throws when opacity:0 remains", () => {
  assert.throws(() => assertNoHiddenContent(`<div style="opacity: 0;">x</div>`, "/"));
  assert.doesNotThrow(() => assertNoHiddenContent(`<div style="opacity: 1;">x</div>`, "/"));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/prerender-postprocess.test.mjs`
Expected: FAIL — `Cannot find module ... prerender-postprocess.mjs`

- [ ] **Step 3: Implement `scripts/prerender-postprocess.mjs`**

```js
/**
 * Post-processing for prerendered HTML.
 *
 * Why: framer-motion elements are snapshotted by Puppeteer with their
 * INITIAL animation state as inline styles (`opacity: 0; transform:
 * translateY(Npx);`). Shipping that means every visitor stares at a blank
 * page until 300KB+ of JS downloads, parses, and hydrates — the direct
 * cause of the "form not showing / sections cut" mobile bug, and a drag
 * on every slow connection. Stripping the initial styles makes the static
 * HTML fully readable pre-hydration; on hydration framer-motion re-applies
 * its initial state and plays the same entrance animations as before, so
 * the settled UI is pixel-identical.
 *
 * Also strips the Turnstile <script> tag that TurnstileWidget injects at
 * runtime — Puppeteer bakes it into <head>, which (a) makes every visitor
 * download Turnstile immediately even though it's only needed at the lead
 * form, and (b) causes the client-side loader to inject a duplicate
 * ("Turnstile already has been loaded" console warning).
 */

// Matches exactly the two inline-style shapes framer-motion writes for
// unfired whileInView/stagger elements. Deliberately anchored to
// `opacity: 0;` so settled elements (`opacity: 1`) are never touched.
const MOTION_INITIAL_STYLE =
  / style="opacity: 0;(?: transform: translate[XY]\(-?\d+(?:\.\d+)?px\);)?"/g;

const BAKED_TURNSTILE_SCRIPT =
  /<script[^>]*src="https:\/\/challenges\.cloudflare\.com\/turnstile[^"]*"[^>]*><\/script>/g;

export function stripMotionArtifacts(html) {
  return html.replace(MOTION_INITIAL_STYLE, "").replace(BAKED_TURNSTILE_SCRIPT, "");
}

/** Build-time guard: fail the build if hidden content would ship. */
export function assertNoHiddenContent(html, route) {
  const remaining = html.match(/ style="opacity: 0[;"]/g);
  if (remaining) {
    throw new Error(
      `${route}: ${remaining.length} element(s) still ship with inline opacity:0 ` +
      `after post-processing — a new animation initial-style shape was added. ` +
      `Update MOTION_INITIAL_STYLE in scripts/prerender-postprocess.mjs.`
    );
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/prerender-postprocess.test.mjs`
Expected: PASS (4 tests)

- [ ] **Step 5: Wire into `scripts/prerender.mjs`**

Add import at top (after the puppeteer imports):

```js
import { stripMotionArtifacts, assertNoHiddenContent } from "./prerender-postprocess.mjs";
```

In the main route loop, replace:

```js
    // Helmet is async; give React a tick to flush the head changes and any
    // motion components to render their initial frame.
    await new Promise((r) => setTimeout(r, 250));

    const html = await page.content();
```

with:

```js
    // Helmet is async; give React a tick to flush the head changes and any
    // motion components to render their initial frame.
    await new Promise((r) => setTimeout(r, 250));

    // Scroll through the full page so every whileInView reveal fires, then
    // wait out the longest entrance animation (0.8s). This bakes the
    // SETTLED state (opacity:1) instead of the initial hidden state.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 900));

    const html = stripMotionArtifacts(await page.content());
    assertNoHiddenContent(html, route);
```

Apply the same replacement in the 404 block (it has the identical `250ms wait → page.content()` sequence; use `"/404.html"` as the route argument).

- [ ] **Step 6: Full local build + verify**

```bash
cd /c/Users/rodol/Projects/kaptas-global
PUPPETEER_EXECUTABLE_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe" npm run build
grep -c 'style="opacity: 0' dist/index.html || echo "CLEAN"
grep -c 'challenges.cloudflare.com/turnstile' dist/index.html || echo "CLEAN"
```

Expected: build succeeds, both greps print `CLEAN` (zero matches). Spot-check one more route: `grep -c 'style="opacity: 0' dist/direct-hire/index.html || echo "CLEAN"` → `CLEAN`.

- [ ] **Step 7: Commit**

```bash
git add scripts/prerender-postprocess.mjs scripts/prerender-postprocess.test.mjs scripts/prerender.mjs
git commit -m "fix(prerender): ship visible HTML — strip motion initial styles + baked Turnstile tag

Root cause of the mobile 'form not showing / sections cut' bug: Puppeteer
snapshots framer-motion elements in their initial opacity:0 state (below-fold
whileInView never fires in the prerender viewport; 250ms wait < 600-800ms
animation durations), so 32 elements including the lead-form section shipped
invisible, gated on full JS hydration. Now we scroll the page to settle all
reveals, strip any remaining initial styles, and fail the build if hidden
content would ship. Hydration replays the same entrance animations, so the
settled UI is unchanged."
```

---

### Task 2: Turnstile loader — reuse existing script tag

**Files:**
- Modify: `src/components/TurnstileWidget.tsx:58-72` (the `loadTurnstile` function)

**Interfaces:**
- Consumes/Produces: `loadTurnstile(): Promise<void>` — same signature, now duplicate-safe. (Task 1 already stops the tag being baked; this guard makes the loader robust regardless.)

- [ ] **Step 1: Replace `loadTurnstile` implementation**

```ts
let scriptPromise: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve) => {
    // Reuse a tag that already exists (e.g., injected by an earlier mount or
    // baked into prerendered HTML) instead of adding a duplicate — Turnstile
    // logs "already has been loaded" warnings on double-injection.
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      // The load event may have fired before we attached — poll as fallback.
      const poll = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(poll);
          resolve();
        }
      }, 50);
      window.setTimeout(() => window.clearInterval(poll), 10000);
      return;
    }
    const s = document.createElement("script");
    s.src = TURNSTILE_SCRIPT;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
  return scriptPromise;
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run lint`
Expected: exit 0, no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TurnstileWidget.tsx
git commit -m "fix(turnstile): reuse existing script tag instead of double-injecting

Eliminates the 'Turnstile already has been loaded' console warnings seen
in production (4x per pageview) — the prerender baked the injected tag
into HTML and the client loader added a second copy."
```

---

### Task 3: Blog index split — stop shipping full blog content on Home/Blog

**Files:**
- Create: `scripts/build-blog-index.mjs`
- Create: `src/data/blog-index.json` (generated, committed)
- Modify: `package.json:8` (prebuild chain)
- Modify: `src/components/home/BlogInsights.tsx` (import specifier only)
- Modify: `src/pages/Blog.tsx` (import specifier only)

**Interfaces:**
- Produces: `src/data/blog-index.json` — same array/order as `blog-posts.json`, each item = `{ id, slug, date, title, excerpt, featured_image, categories }` (everything except `content`). ~20KB vs 251KB.
- `src/pages/BlogPost.tsx` intentionally KEEPS importing `blog-posts.json` — after Task 4 route-splits it, the full content lives only in the BlogPost lazy chunk.

- [ ] **Step 1: Write the failing test** — append to a new file `scripts/build-blog-index.test.mjs`

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIndex } from "./build-blog-index.mjs";

test("index strips content and keeps all metadata fields in order", () => {
  const posts = [
    { id: 1, slug: "a", date: "2026-01-01", title: "T", excerpt: "E", content: "<p>huge</p>", featured_image: "/x.webp", categories: ["c"] },
  ];
  const index = buildIndex(posts);
  assert.equal(index.length, 1);
  assert.deepEqual(index[0], { id: 1, slug: "a", date: "2026-01-01", title: "T", excerpt: "E", featured_image: "/x.webp", categories: ["c"] });
  assert.equal("content" in index[0], false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/build-blog-index.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `scripts/build-blog-index.mjs`**

```js
/**
 * Emit src/data/blog-index.json — blog-posts.json minus the `content` field.
 *
 * Why: blog-posts.json is 251KB and 92% of it is post content. It was
 * imported by BlogInsights (rendered on the HOMEPAGE) and Blog (listing),
 * which pulled the entire blog corpus into the main JS bundle for every
 * visitor. Listings only need metadata; only BlogPost needs content, and
 * route-splitting confines that import to the BlogPost chunk.
 *
 * Runs in prebuild after build-blog.mjs; output is committed so local dev
 * works without running the chain.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function buildIndex(posts) {
  return posts.map(({ content, ...meta }) => meta);
}

// Only execute when run directly (not when imported by the test).
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const SRC = path.join(__dirname, "../src/data/blog-posts.json");
  const OUT = path.join(__dirname, "../src/data/blog-index.json");
  const posts = JSON.parse(await fs.readFile(SRC, "utf-8"));
  const index = buildIndex(posts);
  await fs.writeFile(OUT, JSON.stringify(index, null, 2), "utf-8");
  console.log(
    `✅ blog-index.json: ${index.length} posts, ` +
    `${(JSON.stringify(index).length / 1024).toFixed(1)}KB ` +
    `(full corpus: ${(JSON.stringify(posts).length / 1024).toFixed(1)}KB)`
  );
}
```

- [ ] **Step 4: Run test to verify it passes, then generate the file**

```bash
node --test scripts/build-blog-index.test.mjs   # expected: PASS
node scripts/build-blog-index.mjs               # expected: ✅ blog-index.json: 22 posts, ~20KB (full corpus: 245KB)
```

- [ ] **Step 5: Chain into prebuild** — in `package.json`, change the `prebuild` line to:

```json
"prebuild": "node scripts/build-blog.mjs && node scripts/build-blog-index.mjs && node scripts/build-sitemap.mjs && node scripts/build-llms-full.mjs && node scripts/build-rss.mjs",
```

- [ ] **Step 6: Swap imports in the two listing consumers**

In `src/components/home/BlogInsights.tsx`: change the import specifier `"../../data/blog-posts.json"` → `"../../data/blog-index.json"` (keep the imported name identical).
In `src/pages/Blog.tsx`: change `"../data/blog-posts.json"` → `"../data/blog-index.json"` (keep the imported name identical).
Do NOT touch `src/pages/BlogPost.tsx`.
(If either file's actual relative path differs, match whatever path its current blog-posts.json import uses — only the filename changes.)

- [ ] **Step 7: Verify**

```bash
npm run lint                                    # expected: exit 0 — proves neither consumer accessed .content
grep -rn "blog-posts.json" src/ | grep -v BlogPost.tsx   # expected: no output
```

- [ ] **Step 8: Commit**

```bash
git add scripts/build-blog-index.mjs scripts/build-blog-index.test.mjs src/data/blog-index.json package.json src/components/home/BlogInsights.tsx src/pages/Blog.tsx
git commit -m "perf: blog listings consume 20KB metadata index, not the 251KB corpus

blog-posts.json (92% post content) was imported by the homepage via
BlogInsights, shipping the entire blog inside the main bundle. Listings
only need metadata; BlogPost keeps the full import and Task-4 route
splitting confines it to the BlogPost chunk."
```

---

### Task 4: Route-level code splitting

**Files:**
- Modify: `src/App.tsx` (full rewrite below)

**Interfaces:**
- Consumes: React 18 `hydrateRoot` semantics — during hydration, a suspended lazy route keeps the existing server HTML in place (no fallback flash). Combined with Task 1, users see full content while the route chunk loads.
- Produces: per-page chunks in `dist/assets/`. `Home` stays EAGER (it is the primary landing page; an extra hop there would hurt the main conversion path).

- [ ] **Step 1: Rewrite `src/App.tsx`**

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Route-level code splitting: every non-Home page loads as its own chunk.
// Home stays eager — it is the primary landing/conversion page and must not
// pay an extra network hop. During hydration React 18 keeps the prerendered
// HTML in place while a lazy chunk loads (fallback only shows on client-side
// navigations, which resolve from the edge cache in ~1 RTT).
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const DirectHire = lazy(() => import("./pages/DirectHire"));
const ContractorStaffing = lazy(() => import("./pages/ContractorStaffing"));
const ExecutiveMapping = lazy(() => import("./pages/ExecutiveMapping"));
const StartOperation = lazy(() => import("./pages/StartOperation"));
const Ebook = lazy(() => import("./pages/Ebook"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Calculator = lazy(() => import("./pages/Calculator"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="direct-hire" element={<DirectHire />} />
            <Route path="contractor-staffing" element={<ContractorStaffing />} />
            <Route path="executive-mapping" element={<ExecutiveMapping />} />
            <Route path="hire-in-brazil" element={<StartOperation />} />
            {/* Focused conversion landing page — rendered inside <Layout> like
                the service pages, so it shares the standard header/nav + footer
                and is visually indistinguishable from a service page. */}
            <Route path="get-started" element={<GetStarted />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="ebook" element={<Ebook />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Build and inspect chunks**

```bash
npm run lint
PUPPETEER_EXECUTABLE_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe" npm run build
ls -la dist/assets/
```

Expected: `lint` exit 0. Build output shows one chunk per lazy page plus the main `index-*.js`. The main chunk raw size drops from 1,132,873 bytes to well under 800KB (Task 5 and the blog split account for the rest). A `BlogPost-*.js` chunk of roughly 250KB+ exists (it owns the blog corpus now). Prerender still passes for ALL routes (Puppeteer loads lazy chunks fine via `networkidle0`) and the Task 1 assertion still holds for every route.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "perf: route-level code splitting — 13 lazy page chunks, Home eager

The 1.13MB monolith carried all 14 pages for every visitor. Home stays
eager to keep the primary landing path free of an extra hop; hydration
keeps prerendered HTML visible while lazy chunks resolve."
```

---

### Task 5: Isolate the map — lazy component + self-hosted atlas

**Files:**
- Create: `public/data/countries-110m.json` (vendored)
- Modify: `src/components/home/Hero.tsx` (lazy import)
- Modify: `src/components/TechMapBackground.tsx:5` (geoUrl)
- Modify: `vercel.json` (remove jsdelivr from CSP connect-src)

**Interfaces:**
- Consumes: `TechMapBackground` named export (unchanged component).
- Produces: map stack (react-simple-maps + d3) moves into a lazy chunk loaded only where the Hero renders; atlas served first-party from `/data/countries-110m.json`.

- [ ] **Step 1: Vendor the atlas file**

```bash
mkdir -p public/data
curl -sSL --ssl-no-revoke https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json -o public/data/countries-110m.json
node -e "const j=require('./public/data/countries-110m.json'); console.log('type:', j.type, 'objects:', Object.keys(j.objects))"
```

Expected: `type: Topology objects: [ 'countries', 'land' ]` (validates the download isn't an error page).

- [ ] **Step 2: Point the map at the local copy** — in `src/components/TechMapBackground.tsx`, replace:

```ts
// Using a reliable CDN for the world map TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
```

with:

```ts
// Self-hosted (public/data/) — same world-atlas@2 file, served from our own
// edge cache instead of a third-party CDN (saves a DNS+TLS round trip and
// removes the jsdelivr dependency/CSP entry).
const geoUrl = "/data/countries-110m.json";
```

- [ ] **Step 3: Lazy-load the map in `src/components/home/Hero.tsx`** — replace:

```tsx
import { TechMapBackground } from "../TechMapBackground";
```

with:

```tsx
import { lazy, Suspense } from "react";

// Lazy: pulls react-simple-maps + d3 out of the critical bundle. The map is
// a decorative background that already appeared late (its TopoJSON is
// fetched at runtime), so deferring the JS does not change the experience.
const TechMapBackground = lazy(() =>
  import("../TechMapBackground").then((m) => ({ default: m.TechMapBackground }))
);
```

(Merge the `lazy, Suspense` names into the existing `react` import that already has `useState, useEffect`.)

And in the JSX replace `<TechMapBackground />` with:

```tsx
<Suspense fallback={null}>
  <TechMapBackground />
</Suspense>
```

- [ ] **Step 4: Remove jsdelivr from CSP** — in `vercel.json`, in the `Content-Security-Policy-Report-Only` header value, change `connect-src` by deleting ` https://cdn.jsdelivr.net` (single occurrence). Nothing else in the policy changes.

- [ ] **Step 5: Build + verify**

```bash
npm run lint
PUPPETEER_EXECUTABLE_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe" npm run build
ls dist/assets/ | grep -i "TechMap\|maps"
grep -c "cdn.jsdelivr.net" dist/index.html vercel.json || echo CLEAN
```

Expected: a separate `TechMapBackground-*.js` chunk exists; no jsdelivr references remain; prerender passes.

- [ ] **Step 6: Commit**

```bash
git add public/data/countries-110m.json src/components/home/Hero.tsx src/components/TechMapBackground.tsx vercel.json
git commit -m "perf: lazy-load hero map + self-host world atlas

react-simple-maps/d3 leave the critical bundle; the TopoJSON now serves
from our own edge instead of cdn.jsdelivr.net (one fewer third-party
origin, CSP entry removed)."
```

---

### Task 6: Vendor chunking for long-term caching

**Files:**
- Modify: `vite.config.ts` (add `build.rollupOptions.output.manualChunks`)

- [ ] **Step 1: Add manualChunks** — in `vite.config.ts`, add a `build` key to the config object:

```ts
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendors from app code so a content deploy
        // doesn't invalidate the visitor's cached React/motion bytes.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion": ["motion"],
        },
      },
    },
  },
```

- [ ] **Step 2: Build + record sizes**

```bash
PUPPETEER_EXECUTABLE_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe" npm run build
ls -la dist/assets/*.js
```

Expected: `react-vendor-*.js`, `motion-*.js`, a much smaller `index-*.js`, page chunks, map chunk. Record all sizes in the commit message. Prerender passes.

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "perf: split react/motion vendor chunks for cache stability

<paste the dist/assets ls output here — before: index-*.js 1,132,873 bytes>"
```

---

### Task 7: Un-chain the Google Fonts request

**Files:**
- Modify: `src/index.css:1` (remove the `@import`)
- Modify: `index.html` (add preconnect + stylesheet links in `<head>`)

- [ ] **Step 1: Remove `@import`** — delete line 1 of `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

- [ ] **Step 2: Add links to `index.html`** — immediately after the `<meta name="viewport" ...>` line, add:

```html
    <!-- Inter font: loaded via <link> instead of a CSS @import so the browser
         discovers it in parallel with the stylesheet instead of serially
         after it (saves one full round trip on the critical path). Same URL,
         same font files — zero visual change. -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" />
```

- [ ] **Step 3: Verify locally**

```bash
npm run dev
```

Open http://localhost:3000 in the Browser pane; confirm computed `font-family` on `body` still resolves to Inter (DevTools/`javascript_tool`: `getComputedStyle(document.body).fontFamily`). Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "perf: load Inter via parallel <link> instead of serial CSS @import"
```

---

### Task 8: Fix CSP Report-Only violations (kill 6+ serverless POSTs per pageview)

**Files:**
- Modify: `vercel.json` (CSP header value)

**Interfaces:**
- Consumes: `docs/perf/baseline/metrics.json` → `viewports.*.cspViolations` (captured by Task 0) — the authoritative list of violated directives/URIs.

- [ ] **Step 1: Read the captured violations**

```bash
node -e "const m=require('./docs/perf/baseline/metrics.json'); for (const [v,d] of Object.entries(m.viewports)) console.log(v, JSON.stringify(d.cspViolations, null, 1))"
```

Expected (from the production waterfall): `script-src-elem` violations for `https://googleads.g.doubleclick.net` (the GTM-injected Google Ads viewthrough script) and possibly `https://www.googleadservices.com`.

- [ ] **Step 2: Update the policy** — in `vercel.json`'s `Content-Security-Policy-Report-Only` value, extend `script-src` with exactly the origins captured in Step 1. For the expected case, change:

```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://snap.licdn.com https://challenges.cloudflare.com;
```

to:

```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.clarity.ms https://scripts.clarity.ms https://snap.licdn.com https://challenges.cloudflare.com;
```

If Step 1 shows violations in OTHER directives (e.g., `connect-src` for a Google Ads ping), add those exact origins to those exact directives — never widen beyond what the report shows, and never add wildcard origins.

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "fix(csp): allow GTM-injected Google Ads script origins

Production fired 6-7 report-only violation POSTs per pageview (each one a
serverless invocation). Origins added are exactly those in the captured
violation reports (docs/perf/baseline/metrics.json) - all GTM-managed
Google Ads endpoints."
```

Note: this is Report-Only, so the change carries zero break risk; verification happens on the preview deploy in Task 9 (`cspViolations` must be `[]`).

---

### Task 9: Preview verification + rollout gate

**Files:**
- Create: `docs/perf/preview/` (audit artifacts)

- [ ] **Step 1: Push the branch**

```bash
git push -u origin perf/us-first-loading
```

- [ ] **Step 2: Get the preview URL** — Vercel auto-builds the branch. Use the Vercel MCP tools (`list_deployments` for project `prj_17dbcP9UlTl09JMj5bypMFmMvAe7`, team `team_LcSpk5SBc3WXakBMwzi1bg5u`) to find the deployment for this branch; wait for state `READY`; note its `*.vercel.app` preview URL. If the build FAILS, read `get_deployment_build_logs`, fix, push again.

- [ ] **Step 3: Run the audit against the preview**

```bash
node scripts/perf-audit.mjs https://<preview-url> preview
```

- [ ] **Step 4: Acceptance checklist** — compare `docs/perf/preview/metrics.json` against `docs/perf/baseline/metrics.json`. ALL must hold:

| # | Check | Pass condition |
|---|---|---|
| 1 | **Mobile bug fixed (the point of this branch)** | no-JS pass: `hiddenSections = 0` and `formVisible = true` on BOTH viewports |
| 2 | JS-enabled visibility | `hiddenSections = 0` after scroll-through, both viewports |
| 3 | Bundle cut | homepage `script` bytes < 150KB (baseline ≈ 305KB) |
| 4 | Total cut | homepage `totalTransferKB` < 350 (baseline ≈ 513) |
| 5 | Zero UI change | `preview/desktop.png` + `preview/mobile.png` visually match `baseline/*.png` (open side by side; layout, colors, spacing, imagery identical — only allowed difference: content visible where baseline was blank) |
| 6 | CSP quiet | `cspViolations = []` both viewports |
| 7 | No regressions | `consoleErrors = []`; no Turnstile double-load warning |
| 8 | Third-party removed | no `cdn.jsdelivr.net` request in preview waterfall |
| 9 | All routes prerendered | build log shows `✓` for every route (Task 1 assertion passed for all) |
| 10 | Form works | open preview in Browser pane, mobile viewport: scroll to `#lead-form`, confirm the form renders and the Turnstile widget appears. Do NOT submit. |

Note for check 5: preview HTML carries `X-Robots-Tag: noindex` via vercel.json host gating — expected, ignore.

- [ ] **Step 5: STOP — present results to Rodolfo**

Report the checklist table with actual numbers + the four screenshots. **Do not merge without explicit approval.** (House rule: this is an architecture-affecting change — B-mode approval gate.)

- [ ] **Step 6 (after approval): Merge + deploy + live verification**

```bash
git checkout main && git merge --no-ff perf/us-first-loading -m "perf: US-first loading refactor + mobile visibility fix (see branch commits)"
git push origin main
```

Wait for the production deployment to be `READY` (Vercel MCP), then:

```bash
node scripts/perf-audit.mjs https://kaptasglobal.io production-after
```

Re-run the Step 4 checklist against `production-after`. Then commit the artifacts:

```bash
git add docs/perf/
git commit -m "docs: post-deploy perf audit artifacts" && git push
```

- [ ] **Step 7: Session close-out** — update the Notion Memory page (session log + new anti-pattern: "never let prerender bake framer-motion initial styles — assertion now enforces it"), write a Decisions Log entry (architecture changed: code splitting + prerender post-processing), and mark any related task Done.

---

## Explicitly Out of Scope (flag before ever doing)

- **Self-hosting the Inter font files** — bigger win than Task 7 but changes asset origin; propose separately (B-mode).
- **Trimming the 520KB prerendered HTML** (43 inline SVGs, AEO blocks) — the AEO/SEO content is intentional strategy (kg-cmo owns it); touching it risks rankings for marginal byte savings.
- **`logo-branco.png` → SVG** — brand asset swap needs visual approval.
- **Vercel Speed Insights** for real per-country field data — paid surface, needs Rodolfo's sign-off.
- **`loading="lazy"` on below-fold blog images** — safe and cheap; fold into a future pass.
- **Removing the unused `motion` import in `TechMapBackground.tsx`** — cosmetic; touch only if editing that file again.

## Risk Register

| Risk | Mitigation |
|---|---|
| Strip-regex misses a new animation style shape in a future page | `assertNoHiddenContent` fails the BUILD, not the user |
| Hydration mismatch from stripped inline styles | framer-motion owns those styles client-side and re-applies them on mount regardless of server markup; React does not diff `style` attrs it's about to overwrite. Verified by checklist items 2, 5, 7 |
| Lazy route flashes blank on client-side nav | `fallback={null}` + edge-cached chunks (~1 RTT); acceptable; if noticeable, a follow-up can add per-route `<Suspense>` boundaries |
| Prerender scroll-through inflates build time | ~1.7s × 34 routes ≈ +60s build — acceptable on Vercel's 45-min limit |
| Baked-HTML drift breaking hydration for lazy routes | Puppeteer renders the SAME lazy-loaded tree (networkidle0 waits for chunks), so prerendered HTML still matches |
| Third-party script integrity (SRI) | Not applicable to the externals we keep: Google Fonts CSS varies per user-agent (a fixed hash breaks it) and GTM/Turnstile are vendor-rotated scripts with no published hashes. This branch takes the stronger path — removing a third-party origin outright (jsdelivr → self-hosted atlas) and never adding new ones (Global Constraints) |
