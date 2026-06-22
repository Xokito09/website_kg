import { useEffect, useRef } from "react";

/**
 * hCaptcha spam protection for the Web3Forms lead forms.
 *
 * Why: the Web3Forms access key (VITE_WEB3FORMS_KEY) is public (it ships in the
 * client bundle), so anyone can POST straight to api.web3forms.com/submit with a
 * script — no browser, no page load. That is exactly how the site started
 * receiving spam/phishing "leads" (and why those submissions never showed up in
 * GA4 or Clarity — there was no browser session). A honeypot does NOT stop that:
 * a direct-API bot just omits the hidden field. A captcha does: Web3Forms rejects
 * any submission whose `h-captcha-response` token is missing or invalid, and a
 * bot cannot produce a valid token without solving the challenge in a real browser.
 *
 * Keyless by design: `50b2fe65-b00b-4b9e-ad62-3ba471098be2` is Web3Forms' shared
 * hCaptcha sitekey — they validate it server-side with their own secret, so no
 * hCaptcha/Cloudflare account is needed. (To drop friction further we can later
 * swap to Cloudflare Turnstile, which needs our own sitekey + secret in the
 * Web3Forms dashboard.)
 *
 * The script is blocked during the Puppeteer prerender (scripts/prerender.mjs)
 * so the widget never bakes into the static HTML — it renders client-side only.
 */
const WEB3FORMS_HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
const HCAPTCHA_SCRIPT = "https://js.hcaptcha.com/1/api.js?render=explicit";

type HCaptchaApi = {
  render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string;
  getResponse: (id?: string) => string;
  reset: (id?: string) => void;
};

declare global {
  interface Window {
    hcaptcha?: HCaptchaApi;
  }
}

/** Read the current token at submit time. One widget per page, so the default
 *  (first) widget is the right one. Empty string when not yet solved. */
export function getHCaptchaToken(): string {
  if (typeof window === "undefined" || !window.hcaptcha) return "";
  try {
    return window.hcaptcha.getResponse() || "";
  } catch {
    return "";
  }
}

/** Tokens are single-use — reset after every submit attempt so a retry gets a
 *  fresh challenge. */
export function resetHCaptcha(): void {
  if (typeof window === "undefined" || !window.hcaptcha) return;
  try {
    window.hcaptcha.reset();
  } catch {
    /* widget not rendered yet — nothing to reset */
  }
}

let scriptPromise: Promise<void> | null = null;
function loadHCaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hcaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve) => {
    const s = document.createElement("script");
    s.src = HCAPTCHA_SCRIPT;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function HCaptchaWidget({ theme = "light" }: { theme?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadHCaptcha().then(() => {
      if (cancelled || rendered.current) return;
      const el = ref.current;
      // childElementCount guard avoids a double-render under React StrictMode.
      if (!el || !window.hcaptcha || el.childElementCount > 0) return;
      rendered.current = true;
      window.hcaptcha.render(el, { sitekey: WEB3FORMS_HCAPTCHA_SITEKEY, theme });
    });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  return <div ref={ref} className="h-captcha" />;
}
