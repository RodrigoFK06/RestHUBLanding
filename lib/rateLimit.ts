type Hit = { count: number; reset: number };

const buckets = new Map<string, Hit>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

/**
 * Sliding window rate limiter (in-memory). Suficiente para una sola
 * instancia / dev. En producción multi-instancia, reemplazar por Upstash
 * o Vercel KV.
 */
export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.reset <= now) {
    buckets.set(key, { count: 1, reset: now + opts.windowMs });
    return { ok: true, remaining: opts.limit - 1, retryAfterSec: 0 };
  }

  if (entry.count >= opts.limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((entry.reset - now) / 1000),
    };
  }

  entry.count += 1;
  return { ok: true, remaining: opts.limit - entry.count, retryAfterSec: 0 };
}

export function clientIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown"
  );
}
