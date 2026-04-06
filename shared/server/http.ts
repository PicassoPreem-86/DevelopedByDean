type HeaderValue = string | string[] | undefined;

type RequestLike = {
  headers: Record<string, HeaderValue>;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
};

function getHeaderValue(value: HeaderValue) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value[0]) {
    return value[0];
  }

  return undefined;
}

export function getAllowedOrigins(req: RequestLike) {
  const configuredOrigins = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];
  const host = getHeaderValue(req.headers.host);

  if (host) {
    configuredOrigins.push(`https://${host}`);
    configuredOrigins.push(`http://${host}`);
  }

  if (process.env.VERCEL_URL) {
    configuredOrigins.push(`https://${process.env.VERCEL_URL}`);
  }

  configuredOrigins.push("http://localhost:5173");
  configuredOrigins.push("http://127.0.0.1:5173");

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
  const origin = getHeaderValue(req.headers.origin);

  if (!origin) {
    return true;
  }

  return getAllowedOrigins(req).includes(origin);
}

export function getClientIdentifier(req: RequestLike) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor[0]) {
    return forwardedFor[0];
  }

  return getHeaderValue(req.headers["x-real-ip"]) ?? "unknown";
}

export function createRateLimiter({
  windowMs,
  maxRequests,
}: {
  windowMs: number;
  maxRequests: number;
}) {
  const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

  return (clientId: string) => {
    const now = Date.now();
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
