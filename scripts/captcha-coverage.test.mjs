/**
 * Build guard: every lead form must render the captcha node it depends on.
 *
 * WHY THIS EXISTS
 * A form cannot submit without a Cloudflare Turnstile token. The token is
 * produced by a widget that has to be rendered inside the form. Nothing enforced
 * that, so src/pages/GetStarted.tsx shipped on 2026-06-23 with the form but
 * without the widget: every submission on /get-started — the main paid + CTA
 * landing page — died on "Please complete the verification below." for 6 weeks,
 * with no widget on screen for the visitor to complete. Silent, and invisible in
 * GA4, because lead_form_submit only fires AFTER a successful POST.
 *
 * THE INVARIANT (post-2026-08-04 refactor)
 * The captcha is owned by the hooks, which hand the caller a `captcha` node:
 *
 *   useContactForm(source, theme) -> { ..., captcha }   // contact forms
 *   useTurnstile(theme)           -> { captcha, ... }   // Ebook's own handler
 *
 * A file that calls either hook must bind that node AND render it in its JSX.
 * Holding the hook without rendering its node is exactly the /get-started bug.
 *
 * This is a static check, deliberately: it costs nothing, runs in `npm test`,
 * and would have caught the original bug on the commit that introduced it. The
 * runtime half of the net lives in useContactForm — a `form_blocked` dataLayer
 * event with reason=captcha_missing, so the same class of failure is visible in
 * GA4 on day one instead of after six weeks.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("../src/", import.meta.url));

// Files that legitimately reference the hooks without rendering a form.
const NOT_CONSUMERS = new Set([
  "hooks/useContactForm.ts",        // defines the wrapper; renders nothing
  "components/TurnstileWidget.tsx", // defines useTurnstile itself
]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.includes(".test.")) out.push(full);
  }
  return out;
}

/** @returns {{file: string, hook: string, problem: string}[]} */
function findOffenders() {
  const offenders = [];
  let consumers = 0;

  for (const file of walk(SRC)) {
    const rel = relative(SRC, file).replace(/\\/g, "/");
    if (NOT_CONSUMERS.has(rel)) continue;
    const src = readFileSync(file, "utf8");

    if (/\buseContactForm\s*\(/.test(src)) {
      consumers++;
      // `captcha: heroCaptcha` (renamed) or a bare `captcha` in the destructure.
      const renamed = src.match(/\bcaptcha\s*:\s*(\w+)/);
      const bound = renamed ? renamed[1] : (/\bcaptcha\b/.test(src) ? "captcha" : null);
      if (!bound) {
        offenders.push({ file: rel, hook: "useContactForm", problem: "never destructures `captcha`" });
      } else if (!new RegExp(`\\{\\s*${bound}\\s*\\}`).test(src)) {
        offenders.push({ file: rel, hook: "useContactForm", problem: `binds \`${bound}\` but never renders {${bound}}` });
      }
    }

    if (/\buseTurnstile\s*\(/.test(src)) {
      consumers++;
      if (!/\.captcha\s*\}/.test(src) && !/\bcaptcha\s*\}/.test(src)) {
        offenders.push({ file: rel, hook: "useTurnstile", problem: "never renders the `captcha` node" });
      }
    }
  }
  return { offenders, consumers };
}

test("every form hook consumer renders its captcha node", () => {
  const { offenders, consumers } = findOffenders();

  // Sanity: the check must actually be looking at something. If a refactor
  // renames the hooks, this fails loudly instead of silently passing on zero.
  assert.ok(
    consumers >= 6,
    `captcha-coverage found only ${consumers} form consumer(s) — the scan is ` +
      `probably broken, not the codebase.`,
  );

  assert.deepEqual(
    offenders,
    [],
    `These files hold a form hook but never render its captcha node. Their submit ` +
      `button is DEAD — no Turnstile token can exist, so every submission is ` +
      `rejected:\n  ` +
      offenders.map((o) => `${o.file} (${o.hook}): ${o.problem}`).join("\n  "),
  );
});

test("GetStarted renders its captcha (the 2026-06-23 regression)", () => {
  const src = readFileSync(join(SRC, "pages/GetStarted.tsx"), "utf8");
  assert.match(src, /\{\s*captcha\s*\}/, "/get-started lost its captcha node again");
});

test("no form reaches the module-global captcha API that caused the outage", () => {
  // getCaptchaToken/resetCaptcha were module-scoped: one shared token for every
  // form on the page. That let a form silently succeed on a token minted by a
  // DIFFERENT form, and a reset in one wipe the other's. Both are gone; this
  // keeps them gone.
  const revived = walk(SRC)
    .filter((f) => /\b(getCaptchaToken|resetCaptcha)\b/.test(readFileSync(f, "utf8")))
    .map((f) => relative(SRC, f).replace(/\\/g, "/"));
  assert.deepEqual(
    revived,
    [],
    `Module-global captcha state is back in:\n  ${revived.join("\n  ")}\n` +
      `Use the per-instance useTurnstile()/useContactForm() captcha instead.`,
  );
});
