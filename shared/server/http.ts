type HeaderValue = string | string[] | undefined;

type RequestLike = {
  headers: Record<string, HeaderValue>;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
};

const DEFAULT_PRODUCTION_ORIGINS = [
  "https://developedbydean.ai",
  "https://www.developedbydean.ai",
];

const DEV_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function getHeaderValue(value: HeaderValue) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value[0]) {
    return value[0];
  }

  return undefined;
}

// `req` retained on the signature for backward compatibility with existing callers
// even though host-header reflection has been removed for security.
export function getAllowedOrigins(_req?: RequestLike) {
  void _req;
  const configuredOrigins = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [...DEFAULT_PRODUCTION_ORIGINS];

  if (process.env.VERCEL_URL) {
    configuredOrigins.push(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.NODE_ENV !== "production") {
    configuredOrigins.push(...DEV_ORIGINS);
  }

  return [...new Set(configuredOrigins)];
}

export function setCorsHeaders(req: RequestLike, res: ResponseLike) {
  const origin = getHeaderValue(req.headers.origin);

  if (!origin) {
    return;
  }

  if (getAllowedOrigins(req).includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
}

export function hasAllowedOrigin(req: RequestLike) {
  const allowed = getAllowedOrigins(req);
  const origin = getHeaderValue(req.headers.origin);

  if (origin) {
    return allowed.includes(origin);
  }

  // No Origin header (curl, server-to-server, some same-origin navigations).
  // Fall back to Referer so the SPA's own fetches still work, but reject
  // requests that present neither header.
  const referer = getHeaderValue(req.headers.referer);
  if (!referer) {
    return false;
  }

  try {
    return allowed.includes(new URL(referer).origin);
  } catch {
    return false;
  }
}

export function getClientIdentifier(req: RequestLike) {
  // Vercel's edge sets x-real-ip authoritatively — clients cannot spoof it.
  // Prefer it over x-forwarded-for, whose leftmost entry is client-controllable.
  const realIp = getHeaderValue(req.headers["x-real-ip"]);
  if (realIp) {
    return realIp;
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const chain = typeof forwardedFor === "string"
    ? forwardedFor
    : Array.isArray(forwardedFor)
      ? forwardedFor.join(",")
      : "";

  if (chain) {
    // Use the rightmost entry — that's the one our trusted proxy added.
    const parts = chain.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }

  return "unknown";
}

export function createRateLimiter({
  windowMs,
  maxRequests,
}: {
  windowMs: number;
  maxRequests: number;
}) {
  const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
  let checkCount = 0;

  return (clientId: string) => {
    const now = Date.now();

    // Periodically evict expired entries so the map can't grow unboundedly
    // across warm Vercel invocations.
    checkCount += 1;
    if (checkCount % 100 === 0 || rateLimitStore.size > 1000) {
      for (const [key, value] of rateLimitStore) {
        if (value.resetAt <= now) {
          rateLimitStore.delete(key);
        }
      }
    }

    const entry = rateLimitStore.get(clientId);

    if (!entry || entry.resetAt <= now) {
      rateLimitStore.set(clientId, {
        count: 1,
        resetAt: now + windowMs,
      });
      return false;
    }

    if (entry.count >= maxRequests) {
      return true;
    }

    entry.count += 1;
    return false;
  };
}
