import { useCallback, useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile spam protection for the lead forms.
 *
 * Turnstile "Managed" mode is a fast checkmark or fully invisible for almost
 * every real visitor — no puzzles — so it stops the direct-API spam/phishing
 * POST without adding friction to scarce, high-value US leads.
 *
 * The widget is only the CLIENT half. The SERVER half is api/contact.ts, which
 * verifies `cf-turnstile-response` against TURNSTILE_SECRET before forwarding
 * anything to Web3Forms. A bot can't mint a valid token without solving the
 * challenge in a real browser.
 *
 * Sitekey is public (it ships in the bundle by design). The Secret lives only in
 * the Vercel env, never here. The script is blocked during the Puppeteer
 * prerender (scripts/prerender.mjs) so it never bakes into static HTML.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS A HOOK AND NOT A FREE-STANDING COMPONENT (rewritten 2026-08-04)
 * ---------------------------------------------------------------------------
 * The previous version kept the token in MODULE scope (`let currentToken`) and
 * exposed a `<TurnstileWidget />` that any page could forget to render. That
 * produced two production failures:
 *
 *   1. A form whose page never rendered the widget was permanently
 *      unsubmittable, and said "Please complete the verification below." with
 *      no widget on screen to complete. /get-started shipped that way on
 *      2026-06-23 and stayed broken for 6 weeks — silently, because the
 *      lead_form_submit event only fires AFTER a successful POST.
 *   2. Because the token was global, a form could quietly SUCCEED on a token
 *      minted by a different form elsewhere on the page (the service pages'
 *      hero forms did exactly this, borrowing from <LeadGenerationForm />).
 *      "Works" and "correct" were not the same thing, and a reset in one form
 *      wiped the other's token.
 *
 * Now: one widget per form instance, token in a ref scoped to that instance,
 * and the container element is handed back as `captcha` so a consumer cannot
 * obtain a token pipeline without also being given the node to render. The
 * remaining gap — rendering the hook but not its `captcha` node — is caught by
 * scripts/captcha-coverage.test.mjs at build time and reported as a
 * `form_blocked` dataLayer event at runtime (see useContactForm).
 */
const TURNSTILE_SITEKEY = "0x4AAAAAADp1rVQq3dUPyoMH";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

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
      // Poll until the existing tag's script initializes window.turnstile.
      // (Its load event may have fired before we attached anything, so a
      // poll is the only race-free signal.)
      const poll = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(poll);
          resolve();
        }
      }, 50);
      window.setTimeout(() => {
        if (!window.turnstile) {
          // Tag is stuck or blocked: settle the promise (callers already
          // no-op when window.turnstile is absent) and drop the cache so a
          // future call can retry with a fresh tag.
          window.clearInterval(poll);
          scriptPromise = null;
          resolve();
        }
      }, 10000);
      return;
    }
    const s = document.createElement("script");
    s.src = TURNSTILE_SCRIPT;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null; // allow retry on a later call
      resolve();
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export type Turnstile = {
  /** Render this inside the <form>. Without it there is no widget and no token. */
  captcha: React.ReactNode;
  /** Current token for THIS form. Empty until the challenge resolves. */
  getToken: () => string;
  /**
   * Whether `captcha` is actually mounted in the DOM. False means the consumer
   * never rendered it — a wiring bug, not a visitor who hasn't solved it yet.
   * Lets the caller tell those two cases apart instead of blaming the visitor.
   */
  isMounted: () => boolean;
  /** Tokens are single-use — reset after every submit attempt. */
  reset: () => void;
};

export function useTurnstile(theme: "light" | "dark" | "auto" = "light"): Turnstile {
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef("");
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile().then(() => {
      if (cancelled) return;
      const el = containerRef.current;
      // childElementCount guard avoids a double-render under React StrictMode.
      if (!el || !window.turnstile || el.childElementCount > 0) return;
      widgetIdRef.current = window.turnstile.render(el, {
        sitekey: TURNSTILE_SITEKEY,
        theme,
        // Pin English. Turnstile defaults to "auto" = the VISITOR's browser
        // locale, so a pt-BR browser renders "Sucesso!" inside an otherwise
        // fully-English page (confirmed on production 2026-08-04). Rendering in
        // the visitor's locale is the exact complaint that motivated dropping
        // hCaptcha for Turnstile in the first place (see fec68b2) — Turnstile
        // just inherited the same default. The site and the ICP are US English.
        language: "en",
        callback: (token: string) => {
          tokenRef.current = token;
        },
        "expired-callback": () => {
          tokenRef.current = "";
        },
        "error-callback": () => {
          tokenRef.current = "";
        },
      });
    });
    return () => {
      cancelled = true;
      // Explicitly de-register on unmount. Without this an SPA route change
      // leaves Turnstile holding a widget whose container is detached, which is
      // the source of the "[Cloudflare Turnstile] Cannot find Widget ...,
      // consider using turnstile.remove() to clean up a widget" console warning.
      const id = widgetIdRef.current;
      widgetIdRef.current = null;
      tokenRef.current = "";
      try {
        if (id && window.turnstile?.remove) window.turnstile.remove(id);
      } catch {
        /* already gone — nothing to clean up */
      }
    };
  }, [theme]);

  const reset = useCallback(() => {
    tokenRef.current = "";
    try {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      /* widget not rendered yet — nothing to reset */
    }
  }, []);

  return {
    // The Turnstile "normal" widget is a FIXED 300x65px iframe in a 71px-tall
    // wrapper, and it can't be made smaller through the API (the only other
    // sizes are "compact", which is TALLER at 150x140, and "flexible", which
    // still floors at 300px wide). Two problems it caused, both fixed by one
    // scale:
    //
    //   - Desktop: it added ~87px to the hero form card, which Rodolfo flagged
    //     as visibly out of proportion with the hero copy column.
    //   - Mobile: at a 375px viewport the form card is only ~261px wide inside
    //     its padding, so a 300px widget overflowed by ~39px and was silently
    //     clipped by the section's `overflow-hidden`.
    //
    // 0.7 renders it at 210x45 — comfortably inside the 261px mobile card, so
    // one scale covers every breakpoint (no `sm:` variant needed) — and the
    // negative margin reclaims the 21px of layout box the transform leaves
    // behind, since `transform` doesn't affect layout height. Using a margin
    // rather than a fixed height means an expanded interactive challenge can
    // still grow without overlapping the submit button.
    captcha: <div ref={containerRef} className="origin-top-left scale-[0.7] -mb-[21px]" />,
    getToken: () => tokenRef.current,
    isMounted: () => containerRef.current !== null,
    reset,
  };
}
