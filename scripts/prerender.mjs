/**
 * Pre-render every static route to HTML at build time using Puppeteer.
 *
 * Why this exists
 * The site is a Vite + React SPA. Without pre-rendering, the HTML Vercel
 * serves is a 475-byte shell with an empty <div id="root">. All schemas,
 * meta tags, OG/Twitter tags, and AEO content are injected by JavaScript
 * after hydration. Crawlers that do not execute JavaScript — LinkedIn,
 * Twitter, Slack, WhatsApp, Facebook, many AI crawlers — see only the
 * shell, so social previews and AI-citation surfaces are broken.
 *
 * What this does
 *  1. Starts a local static file server pointing at dist/
 *  2. Launches headless Chromium via Puppeteer
 *  3. For each route (the seven static pages, /ebook, the two legal
 *     pages, /blog, and every individual blog post), navigates to the
 *     route in Puppeteer and waits for the React tree to finish rendering
 *  4. Snapshots the full DOM (head + body) and writes it to dist/<route>/index.html
 *  5. Vercel's filesystem precedence then serves that pre-rendered HTML
 *     for the route. React then hydrates over it on the client for
 *     interactivity, exactly like a normal SSR/SSG site.
 *
 * Tracking pixels (LinkedIn, Apollo) are blocked at the Puppeteer
 * network layer so the prerender run does not pollute audience data.
 */

import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { stripMotionArtifacts, assertNoHiddenContent } from "./prerender-postprocess.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "../dist");
const POSTS_FILE = path.join(__dirname, "../src/data/blog-posts.json");
const PORT = 4173;

const STATIC_ROUTES = [
  "/",
  "/pricing",
  "/blog",
  "/direct-hire",
  "/contractor-staffing",
  "/executive-mapping",
  "/hire-in-brazil",
  "/get-started",
  "/ebook",
  "/privacy-policy",
  "/terms-of-service",
];

const posts = JSON.parse(await fs.readFile(POSTS_FILE, "utf-8"));
const BLOG_ROUTES = posts.map((p) => `/blog/${p.slug}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES];

// Read the empty shell so the SPA fallback always uses it (not whatever
// we have just written to disk for a more-specific route).
const SHELL_HTML = await fs.readFile(path.join(DIST_DIR, "index.html"), "utf-8");

// MIME types we need to serve from the local static server.
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    const filePath = path.join(DIST_DIR, url.pathname === "/" ? "/index.html" : url.pathname);
    if (existsSync(filePath) && (await fs.stat(filePath)).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
      res.end(await fs.readFile(filePath));
      return;
    }
    // SPA fallback — serve the shell HTML so React Router can take over.
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(SHELL_HTML);
  } catch (err) {
    res.statusCode = 500;
    res.end(String(err));
  }
});

await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));

// @sparticuz/chromium bundles a Linux Chromium with the shared libraries
// (libnspr4, libnss3, etc.) that Vercel's build environment is missing.
// Locally on Windows / macOS dev machines, fall back to system Chrome via
// PUPPETEER_EXECUTABLE_PATH or skip the prerender step entirely.
let executablePath;
try {
  executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
    ?? (await chromium.executablePath());
} catch (err) {
  if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
    console.warn(
      `⚠️  Chromium not available on this platform (${process.platform}). ` +
      `Set PUPPETEER_EXECUTABLE_PATH to a local Chrome to run prerender ` +
      `locally, or push to Vercel where the bundled Linux Chromium works.`
    );
    server.close();
    process.exit(0);
  }
  throw err;
}

const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath,
  headless: true,
});

/**
 * Settle the page's animations and capture clean HTML.
 *
 * 1. Scroll through the full page so every whileInView reveal fires.
 * 2. Freeze all pending JS timers so nothing re-triggers mid-capture
 *    (e.g. the Hero word rotator swaps its AnimatePresence word every 3s
 *    with a 0.4s blur transition — an unlucky snapshot would bake a
 *    half-faded, blurred headline word that no opacity:0 regex catches).
 * 3. Wait out the longest entrance animation (0.8s) so every in-flight
 *    transition completes. This bakes the SETTLED state (opacity:1)
 *    instead of the initial hidden state.
 * 4. Strip any remaining motion initial styles and fail the build if
 *    hidden content would still ship.
 */
async function settleAndCapture(page, route) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => {
    // Freeze JS-driven animation loops (e.g. the Hero word rotator) so the
    // snapshot is deterministic: any in-flight transition completes during
    // the settle wait below and nothing re-fires mid-capture.
    let id = window.setTimeout(() => {}, 0);
    while (id--) { window.clearTimeout(id); window.clearInterval(id); }
  });
  await new Promise((r) => setTimeout(r, 900));

  const html = stripMotionArtifacts(await page.content());
  assertNoHiddenContent(html, route);
  return html;
}

console.log(`📸 Pre-rendering ${ALL_ROUTES.length} routes...`);

let failures = 0;

for (const route of ALL_ROUTES) {
  const page = await browser.newPage();

  // Block third-party tracking and external decorative assets so the
  // prerender does not pollute LinkedIn / Apollo audiences and is faster.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    const blocked =
      url.includes("apollo.io") ||
      url.includes("snap.licdn.com") ||
      url.includes("px.ads.linkedin.com") ||
      url.includes("googletagmanager.com") ||
      url.includes("google-analytics.com") ||
      url.includes("challenges.cloudflare.com") ||
      url.includes("grainy-gradients.vercel.app");
    if (blocked) return req.abort();
    req.continue();
  });

  try {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Helmet is async; give React a tick to flush the head changes and any
    // motion components to render their initial frame.
    await new Promise((r) => setTimeout(r, 250));

    const html = await settleAndCapture(page, route);

    const isRoot = route === "/";
    const outDir = isRoot ? DIST_DIR : path.join(DIST_DIR, route);
    const outFile = path.join(outDir, "index.html");
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, html, "utf-8");

    console.log(`  ✓ ${route}`);
  } catch (err) {
    failures += 1;
    console.error(`  ✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

// Pre-render the NotFound page as dist/404.html so Vercel serves a real
// HTTP 404 (with the styled React 404 content) for unmatched routes.
// Puppeteer reaches it by visiting any URL that has no static file — the
// local SPA fallback serves the shell HTML, React Router matches `*`, and
// NotFound renders.
{
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    const blocked =
      url.includes("apollo.io") ||
      url.includes("snap.licdn.com") ||
      url.includes("px.ads.linkedin.com") ||
      url.includes("googletagmanager.com") ||
      url.includes("google-analytics.com") ||
      url.includes("challenges.cloudflare.com") ||
      url.includes("grainy-gradients.vercel.app");
    if (blocked) return req.abort();
    req.continue();
  });
  try {
    await page.goto(`http://127.0.0.1:${PORT}/__not_found_prerender__`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 250));

    const html = await settleAndCapture(page, "/404.html");
    await fs.writeFile(path.join(DIST_DIR, "404.html"), html, "utf-8");
    console.log(`  ✓ /404.html`);
  } catch (err) {
    failures += 1;
    console.error(`  ✗ /404.html — ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

if (failures > 0) {
  console.error(`❌ ${failures} route(s) failed to pre-render — see above`);
  process.exit(1);
}

console.log(`✅ Pre-rendered ${ALL_ROUTES.length + 1} routes to dist/`);
