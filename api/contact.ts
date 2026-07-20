/**
 * /api/contact — server-side proxy for the lead + ebook forms.
 *
 * Why this exists
 * The Web3Forms access key used to ship in the client bundle (public), so anyone
 * could POST straight to api.web3forms.com with a script — no browser — which is
 * how the site started receiving phishing/spam "leads" (and why they never showed
 * up in GA4/Clarity: no browser, no JS tracking). This proxy fixes it at the root:
 *
 *   1. The access key now lives ONLY in a server env var (WEB3FORMS_ACCESS_KEY),
 *      never in the client bundle — so it can't be scraped and reused.
 *   2. Every submission must carry a valid Cloudflare Turnstile token, verified
 *      here server-side with TURNSTILE_SECRET before anything is forwarded.
 *
 * A bot can't mint a valid Turnstile token without solving the challenge in a
 * real browser, and it no longer has the key to reach Web3Forms directly.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   TURNSTILE_SECRET      — Cloudflare Turnstile secret key
 *   WEB3FORMS_ACCESS_KEY  — the Web3Forms form access key (moved off the client)
 *
 * The browser posts the normal Web3Forms field set PLUS `cf-turnstile-response`
 * to this endpoint (same origin) instead of to api.web3forms.com.
 */

import { neon } from "@neondatabase/serverless";

export const config = { runtime: "edge" };

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const WEB3FORMS_SUBMIT = "https://api.web3forms.com/submit";

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

// Fail-open visibility layer: after the email is sent, best-effort-record the
// lead in Neon (gtm_inbound_leads) so it shows in the LDR /inbound panel. This
// NEVER affects the email or the visitor — any failure (no URL, timeout, driver
// error) is swallowed. Web3Forms (the email) stays the durable system of record.
// Uses an INSERT-only, single-table Neon role (INBOUND_DB_URL), server-side only.
async function captureLead(fields: Record<string, unknown>): Promise<void> {
  const url = process.env.INBOUND_DB_URL;
  if (!url) return;
  const str = (v: unknown) => (v === undefined || v === null || v === "" ? null : String(v));
  try {
    const sql = neon(url);
    const insert = sql`
      INSERT INTO gtm_inbound_leads (name, company, email, message, page_url, form_source, form_type)
      VALUES (${str(fields.name) ?? ""}, ${str(fields.company)}, ${str(fields.email) ?? ""},
              ${str(fields.message)}, ${str(fields.page_url)}, ${str(fields.form_source)},
              ${str(fields.form_type)})`;
    const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 2000));
    await Promise.race([insert, timeout]);
  } catch {
    // swallow — email already sent; the row is best-effort visibility only.
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ success: false, message: "Method not allowed" }, 405);
  }

  const secret = process.env.TURNSTILE_SECRET;
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!secret || !accessKey) {
    return json(
      { success: false, message: "The form is temporarily unavailable. Please email us at rodolfo@kaptasglobal.io." },
      500,
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ success: false, message: "Invalid request." }, 400);
  }

  const token = (payload["cf-turnstile-response"] || payload["token"]) as string | undefined;
  if (!token) {
    return json({ success: false, message: "Please complete the verification and try again." }, 400);
  }

  // 1) Verify the Turnstile token server-side.
  try {
    const verifyRes = await fetch(TURNSTILE_VERIFY, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "",
      }),
    });
    const verify = (await verifyRes.json()) as { success?: boolean };
    if (!verify.success) {
      return json({ success: false, message: "Verification failed. Please try again." }, 400);
    }
  } catch {
    return json({ success: false, message: "Could not verify the request. Please try again." }, 502);
  }

  // 2) Forward to Web3Forms with the SERVER-held access key. Never trust the
  //    client for the key or the token — strip them before forwarding.
  const fields: Record<string, unknown> = { ...payload };
  delete fields["cf-turnstile-response"];
  delete fields["token"];
  delete fields["access_key"];

  try {
    const wfRes = await fetch(WEB3FORMS_SUBMIT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...fields }),
    });
    const data = await wfRes.json();
    // Best-effort capture only on a confirmed successful send (fail-open inside).
    if (wfRes.ok && (data as { success?: boolean })?.success) {
      await captureLead(fields);
    }
    return json(data, wfRes.status);
  } catch {
    return json({ success: false, message: "Could not send your message. Please email us at rodolfo@kaptasglobal.io." }, 502);
  }
}
