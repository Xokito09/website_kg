import { useEffect, useRef, useState } from "react";
import { useTurnstile } from "../components/TurnstileWidget";

interface FormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

type DataLayerWindow = { dataLayer?: Array<Record<string, unknown>> };

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

// Derived from the current pathname so it stays correct wherever this hook is
// reused, without the caller having to update the `source` prop.
function currentFormSource(): string {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname;
  return path === "/" ? "home" : (path.split("/").filter(Boolean)[0] || "home");
}

export function useContactForm(source: string, captchaTheme: "light" | "dark" | "auto" = "light") {
  // The captcha is OWNED by this hook, not bolted on by the page. Callers get a
  // `captcha` node back and must render it inside the form — see the header of
  // components/TurnstileWidget.tsx for the /get-started outage that motivated it.
  const turnstile = useTurnstile(captchaTheme);
  const [form, setForm] = useState<FormData>({ name: "", company: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // --- Field-level abandonment tracking ---
  // No PII: we record field NAMES the visitor touched + a count, never any value
  // they typed (see Memory anti-pattern #9 — capturing partial PII before submit).
  // State lives in refs so the unmount / pagehide listeners read current values
  // without re-binding on every keystroke. `form_abandon` fires at most once, and
  // only when the visitor started filling the form (>=1 field touched) but never
  // submitted — turning the silent form_start -> generate_lead drop-off into a
  // measurable "they bail at field X" signal.
  const touchedRef = useRef<Set<string>>(new Set());
  const lastFieldRef = useRef<string>("");
  const submittedRef = useRef(false);
  const abandonFiredRef = useRef(false);

  function fireAbandonIfStarted() {
    if (abandonFiredRef.current || submittedRef.current) return;
    if (touchedRef.current.size === 0) return;
    abandonFiredRef.current = true;
    pushDataLayer({
      event: "form_abandon",
      form_source: currentFormSource(),
      form_type: "contact",
      last_field: lastFieldRef.current,
      fields_touched: touchedRef.current.size,
      reached_email: touchedRef.current.has("email"),
    });
  }

  useEffect(() => {
    // visibilitychange (hidden) catches tab close / switch / mobile backgrounding;
    // pagehide catches real unload + external navigation (bfcache-safe). The effect
    // cleanup catches SPA route changes (React Router unmount) — the main path for
    // a visitor navigating away internally without submitting.
    const onVisibility = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") return;
      fireAbandonIfStarted();
    };
    const onPageHide = () => fireAbandonIfStarted();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      fireAbandonIfStarted();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name;
    if (field) {
      touchedRef.current.add(field);
      lastFieldRef.current = field;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please fill in your name and email.");
      return;
    }
    const captchaToken = turnstile.getToken();
    if (!captchaToken) {
      // Two very different situations, and conflating them is what let the
      // /get-started outage hide for 6 weeks:
      //
      //   captcha_missing  — the page never rendered `captcha`. A wiring bug on
      //                      our side. The visitor CANNOT fix it, so don't tell
      //                      them to "complete the verification" that isn't on
      //                      screen — give them a way to reach us instead.
      //   captcha_unsolved — the widget is there and simply hasn't resolved yet
      //                      (slow network, expired token, visitor hasn't
      //                      clicked). Asking them to complete it is correct.
      //
      // Either way, emit form_blocked so a dead form is VISIBLE in GA4 on day
      // one. lead_form_submit only fires after a successful POST, so without
      // this a form that can never submit produces no signal at all.
      const missing = !turnstile.isMounted();
      pushDataLayer({
        event: "form_blocked",
        reason: missing ? "captcha_missing" : "captcha_unsolved",
        form_source: currentFormSource(),
        form_type: "contact",
      });
      if (missing) {
        if (import.meta.env.DEV) {
          console.error(
            "[useContactForm] This form never rendered the `captcha` node returned by " +
              "useContactForm(), so no Turnstile token can exist and the form can never " +
              "be submitted. Render {captcha} inside the <form>.",
          );
        }
        setError("Something went wrong on our side. Please email rodolfo@kaptasglobal.io and we'll pick it up right away.");
      } else {
        setError("Please complete the verification below.");
      }
      return;
    }
    setIsSubmitting(true);
    setError("");
    const pageUrl = typeof window !== "undefined" ? window.location.href : source;
    // Same page, minus the query string. `pageUrl` keeps the full href (utm
    // params and all) for `page_url` -> gtm_inbound_leads; the subject line
    // gets the trimmed form so a lead arriving from a campaign doesn't ship a
    // 200-character subject that Gmail truncates before the company name.
    const conversionUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : source;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "cf-turnstile-response": captchaToken,
          // Web3Forms gives the POST payload precedence over the dashboard's
          // "Email Subject" field, so THIS string is what lands in the inbox —
          // the dashboard value is inert. Company is an optional field, so fall
          // back to the person's name; without the fallback a blank company
          // ships a subject that trails off after the colon.
          subject: `New lead WEBSITE: ${form.company.trim() || form.name.trim()} (${conversionUrl})`,
          from_name: "Kaptas Global Website",
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
          page_url: pageUrl,
          form_source: currentFormSource(),
          form_type: "contact",
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Mark submitted BEFORE the success push so the abandonment listeners
        // (which may fire on the post-submit navigation) stay silent.
        submittedRef.current = true;
        // GA4 lead conversion via GTM dataLayer.
        pushDataLayer({
          event: "lead_form_submit",
          form_source: currentFormSource(),
          form_type: "contact",
        });

        setShowModal(true);
        setForm({ name: "", company: "", email: "", message: "" });
      } else {
        setError(data.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
      turnstile.reset();
    }
  }

  return {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    showModal,
    setShowModal,
    error,
    /** MUST be rendered inside the <form>. Without it the form cannot submit. */
    captcha: turnstile.captcha,
  };
}
