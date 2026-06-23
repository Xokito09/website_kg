import { useEffect, useRef, useState } from "react";
import { getCaptchaToken, resetCaptcha } from "../components/TurnstileWidget";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

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

export function useContactForm(source: string) {
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
    const captchaToken = getCaptchaToken();
    if (!captchaToken) {
      setError("Please complete the verification below.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    const pageUrl = typeof window !== "undefined" ? window.location.href : source;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          "cf-turnstile-response": captchaToken,
          subject: `New inquiry from ${form.name} at ${form.company} — ${pageUrl}`,
          from_name: "Kaptas Global Website",
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
          page_url: pageUrl,
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
      resetCaptcha();
    }
  }

  return { form, handleChange, handleSubmit, isSubmitting, showModal, setShowModal, error };
}
