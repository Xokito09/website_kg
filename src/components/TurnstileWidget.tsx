import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile spam protection for the Web3Forms lead forms.
 *
 * Replaces hCaptcha (which showed image puzzles + rendered in the visitor's
 * locale). Turnstile "Managed" mode is a fast checkmark or fully invisible for
 * almost every real visitor — no puzzles — so it stops the direct-API spam/
 * phishing POST without adding friction to scarce, high-value US leads.
 *
 * Same enforcement model as before: the widget is only the CLIENT half. The
 * SERVER half is the Web3Forms dashboard (Settings -> Security -> Captcha
 * Protection = Turnstile + the Secret Key). Web3Forms then rejects any
 * submission whose `cf-turnstile-response` token is missing or invalid; a bot
 * can't mint a valid token without solving the challenge in a real browser.
 *
 * Sitekey is public (it ships in the bundle by design). The Secret lives only
 * in the Web3Forms dashboard, never here. The script is blocked during the
 * Puppeteer prerender (scripts/prerender.mjs) so it never bakes into static HTML.
 */
const TURNSTILE_SITEKEY = "0x4AAAAAADp1rVQq3dUPyoMH";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Module-scoped: one widget per page. The render callback writes the token here;
// the submit handler reads it via getCaptchaToken().
let currentToken = "";
let currentWidgetId: string | null = null;

/** Read the current token at submit time. Empty until the challenge resolves. */
export function getCaptchaToken(): string {
  return currentToken || "";
}

/** Tokens are single-use — reset after every submit attempt so a retry gets a
 *  fresh one. */
export function resetCaptcha(): void {
  currentToken = "";
  try {
    if (typeof window !== "undefined" && window.turnstile && currentWidgetId) {
      window.turnstile.reset(currentWidgetId);
    }
  } catch {
    /* widget not rendered yet — nothing to reset */
  }
}

let scriptPromise: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve) => {
    const s = document.createElement("script");
    s.src = TURNSTILE_SCRIPT;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function TurnstileWidget({ theme = "light" }: { theme?: "light" | "dark" | "auto" }) {
  const ref = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile().then(() => {
      if (cancelled || rendered.current) return;
      const el = ref.current;
      // childElementCount guard avoids a double-render under React StrictMode.
      if (!el || !window.turnstile || el.childElementCount > 0) return;
      rendered.current = true;
      currentWidgetId = window.turnstile.render(el, {
        sitekey: TURNSTILE_SITEKEY,
        theme,
        callback: (token: string) => {
          currentToken = token;
        },
        "expired-callback": () => {
          currentToken = "";
        },
        "error-callback": () => {
          currentToken = "";
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  return <div ref={ref} />;
}
