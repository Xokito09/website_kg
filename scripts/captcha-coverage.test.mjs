/**
 * Build guard: every lead form must ship the captcha widget it depends on.
 *
 * WHY THIS EXISTS
 * `useContactForm` refuses to submit unless `getCaptchaToken()` returns a token,
 * but the token is produced by a SEPARATE component (`<TurnstileWidget />`) that
 * each page has to remember to render. Nothing enforced the pairing, so
 * src/pages/GetStarted.tsx shipped on 2026-06-23 with the form but without the
 * widget: every submission on /get-started — the main paid + CTA landing page —
 * died on "Please complete the verification below." for 6 weeks, with no widget
 * on screen for the visitor to complete. Silent, invisible in GA4 (the
 * lead_form_submit event only fires AFTER a successful POST), 100% lead loss.
 *
 * THE INVARIANT
 * A file that calls useContactForm(...) must ALSO render, in the same file,
 * either <TurnstileWidget /> or <LeadGenerationForm /> (which renders the widget
 * itself). The token lives in module scope, so one widget anywhere in the mounted
 * tree satisfies every form on that page.
 *
 * This is a static check, deliberately: it costs nothing, runs in `npm test`, and
 * would have caught the bug on the commit that introduced it.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("../src/", import.meta.url));

/**
 * Known violations, each with the reason it is not simply fixed. An entry here is
 * DEBT, not an exemption — it must carry an owner-facing reason and be removed,
 * not grown. Adding a new entry instead of rendering the widget is a bug.
 */
const KNOWN_BROKEN = new Map([
  [
    "pages/Blog.tsx",
    "Blog newsletter form (form_type contact, email-only). Dead for a second, " +
      "independent reason: useContactForm hard-requires `name` and this form has " +
      "no name field, so it fails on 'Please fill in your name and email.' before " +
      "the captcha is ever consulted. Fixing it needs a product/design call from " +
      "Rodolfo (add a name field + widget, or drop the form) — see the 2026-08-03 " +
      "captcha-coverage fix. Do not silently paper over it.",
  ],
]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.endsWith(".test.tsx")) out.push(full);
  }
  return out;
}

function collectFormFiles() {
  const offenders = [];
  const covered = [];
  for (const file of walk(SRC)) {
    const src = readFileSync(file, "utf8");
    // The hook's own definition isn't a consumer.
    if (file.endsWith("useContactForm.ts")) continue;
    if (!/\buseContactForm\s*\(/.test(src)) continue;
    const rel = relative(SRC, file).replace(/\\/g, "/");
    const hasWidget = /<TurnstileWidget\b/.test(src) || /<LeadGenerationForm\b/.test(src);
    (hasWidget ? covered : offenders).push(rel);
  }
  return { offenders, covered };
}

test("every useContactForm consumer renders a captcha widget", () => {
  const { offenders, covered } = collectFormFiles();

  // Sanity: the check must actually be looking at something.
  assert.ok(
    covered.length + offenders.length >= 5,
    `captcha-coverage found only ${covered.length + offenders.length} form file(s) — ` +
      `the scan is probably broken, not the codebase.`,
  );

  const unexpected = offenders.filter((f) => !KNOWN_BROKEN.has(f));
  assert.deepEqual(
    unexpected,
    [],
    `These files call useContactForm() but never render <TurnstileWidget /> (or ` +
      `<LeadGenerationForm />, which renders it). Their submit button is DEAD — ` +
      `getCaptchaToken() returns "" and the visitor sees "Please complete the ` +
      `verification below." with no widget to complete:\n  ` +
      unexpected.join("\n  "),
  );
});

test("KNOWN_BROKEN entries are still broken (stale-debt check)", () => {
  const { offenders } = collectFormFiles();
  const stale = [...KNOWN_BROKEN.keys()].filter((f) => !offenders.includes(f));
  assert.deepEqual(
    stale,
    [],
    `Fixed — now remove these from KNOWN_BROKEN in scripts/captcha-coverage.test.mjs:\n  ` +
      stale.join("\n  "),
  );
});

test("GetStarted keeps its widget (the 2026-06-23 regression)", () => {
  const src = readFileSync(join(SRC, "pages/GetStarted.tsx"), "utf8");
  assert.match(src, /<TurnstileWidget\b/, "/get-started lost its Turnstile widget again");
});
