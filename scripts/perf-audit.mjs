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
