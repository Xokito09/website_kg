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

export const config = { runtime: "edge" };

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const WEB3FORMS_SUBMIT = "https://api.web3forms.com/submit";

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
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
    return json(data, wfRes.status);
  } catch {
    return json({ success: false, message: "Could not send your message. Please email us at rodolfo@kaptasglobal.io." }, 502);
  }
}
