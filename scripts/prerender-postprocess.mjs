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
