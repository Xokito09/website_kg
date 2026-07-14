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
