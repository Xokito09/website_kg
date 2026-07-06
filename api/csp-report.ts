/**
 * /api/csp-report — collector + reader for Content-Security-Policy violations.
 *
 * The site ships CSP in Report-Only mode (vercel.json) while we observe what
 * a real enforced policy would break. Browsers POST violation reports here;
 * without this endpoint the reports would only ever appear in visitors'
 * devtools consoles, i.e. we'd be flying blind. Same Upstash KV + per-day
 * aggregation pattern as middleware.ts / llm-bot-stats.ts.
 *
 *   POST  — browser-sent violation report. Accepts both the legacy
 *           application/csp-report shape ({"csp-report": {...}}) and the
 *           Reporting API shape (array of {type:"csp-violation", body:{...}}).
 *           Aggregated as counters per "directive → blocked origin"; no IPs,
 *           no UAs, no full URLs stored.
 *   GET   — aggregate summary, ?days=7 (1..30). This is what kg-site-engineer
 *           reads before deciding the policy is safe to enforce.
 *
 * Abuse posture: the endpoint is necessarily unauthenticated (browsers call
 * it), so each day's hash is capped at MAX_FIELDS_PER_DAY distinct keys and
 * every key is truncated — a flood can inflate counters but not KV memory.
 */

import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

const RETENTION_SECONDS = 60 * 60 * 24 * 60; // 60 days, same as llm bot stats
const MAX_FIELDS_PER_DAY = 300;
const MAX_KEY_LENGTH = 120;
const MAX_BODY_BYTES = 32_768;
const READ_MAX_DAYS = 30;

function dayKey(offsetDaysBack: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDaysBack);
  return d.toISOString().slice(0, 10);
}

function kvClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** "https://evil.example/x/y?z" → "https://evil.example"; keywords pass through. */
function blockedOrigin(blockedUri: string): string {
  if (!blockedUri) return "(empty)";
  if (!blockedUri.includes("://")) return blockedUri; // "inline", "eval", "data", ...
  try {
    return new URL(blockedUri).origin;
  } catch {
    return blockedUri.slice(0, 40);
  }
}

interface Violation {
  directive: string;
  blocked: string;
}

function parseViolations(body: unknown): Violation[] {
  const out: Violation[] = [];
  const push = (v: Record<string, unknown> | undefined | null) => {
    if (!v || typeof v !== "object") return;
    const directive =
      (v["effective-directive"] as string) ||
      (v["effectiveDirective"] as string) ||
      (v["violated-directive"] as string) ||
      (v["violatedDirective"] as string) ||
      "unknown";
    const blocked =
      (v["blocked-uri"] as string) ?? (v["blockedURL"] as string) ?? (v["blockedURI"] as string) ?? "";
    out.push({ directive, blocked: blockedOrigin(blocked) });
  };

  if (Array.isArray(body)) {
    // Reporting API: [{ type: "csp-violation", body: {...} }, ...]
    for (const report of body) {
      if (report && typeof report === "object" && (report as Record<string, unknown>).body) {
        push((report as Record<string, unknown>).body as Record<string, unknown>);
      }
    }
  } else if (body && typeof body === "object") {
    const legacy = (body as Record<string, unknown>)["csp-report"];
    push((legacy as Record<string, unknown>) || (body as Record<string, unknown>));
  }
  return out;
}

async function handlePost(req: Request): Promise<Response> {
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return new Response(null, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }

  const violations = parseViolations(body).slice(0, 20);
  const kv = kvClient();
  if (kv && violations.length > 0) {
    const key = `csp:violations:${dayKey(0)}`;
    try {
      const fieldCount = await kv.hlen(key);
      if (fieldCount < MAX_FIELDS_PER_DAY) {
        const pipe = kv.pipeline();
        for (const v of violations) {
          const field = `${v.directive} → ${v.blocked}`.slice(0, MAX_KEY_LENGTH);
          pipe.hincrby(key, field, 1);
        }
        pipe.expire(key, RETENTION_SECONDS);
        await pipe.exec();
      }
    } catch {
      // Reporting must never throw back at the browser.
    }
  }
  // 204 regardless — the browser fires-and-forgets these.
  return new Response(null, { status: 204 });
}

async function handleGet(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const rawDays = parseInt(url.searchParams.get("days") || "7", 10);
  const days = Number.isFinite(rawDays) ? Math.min(Math.max(rawDays, 1), READ_MAX_DAYS) : 7;

  const warnings: string[] = [];
  const totals: Record<string, number> = {};
  const byDay: Record<string, number> = {};

  const kv = kvClient();
  if (!kv) {
    warnings.push("Vercel KV not provisioned — reports are accepted but not persisted.");
  } else {
    try {
      const dates: string[] = [];
      for (let i = 0; i < days; i++) dates.push(dayKey(i));
      const pipe = kv.pipeline();
      for (const date of dates) pipe.hgetall(`csp:violations:${date}`);
      const results = (await pipe.exec()) as (Record<string, unknown> | null)[];

      for (let i = 0; i < dates.length; i++) {
        const day = results[i];
        let dayTotal = 0;
        if (day && typeof day === "object") {
          for (const [field, rawCount] of Object.entries(day)) {
            const n = Number(rawCount) || 0;
            totals[field] = (totals[field] || 0) + n;
            dayTotal += n;
          }
        }
        byDay[dates[i]] = dayTotal;
      }
    } catch (err) {
      warnings.push(`KV read error: ${(err as Error).message}`);
    }
  }

  const violations = Object.entries(totals)
    .map(([violation, count]) => ({ violation, count }))
    .sort((a, b) => b.count - a.count);

  return new Response(
    JSON.stringify(
      {
        range: { from: dayKey(days - 1), to: dayKey(0), days },
        total: violations.reduce((a, v) => a + v.count, 0),
        violations,
        by_day: byDay,
        warnings,
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=60, s-maxage=300",
        "x-robots-tag": "noindex, nofollow",
      },
    },
  );
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "POST") return handlePost(req);
  if (req.method === "GET") return handleGet(req);
  return new Response(null, { status: 405 });
}
