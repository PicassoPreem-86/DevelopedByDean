import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sanitizeContactPayload } from "../shared/contactConfig";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getAllowedOrigins(req: VercelRequest) {
  const configuredOrigins = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];
  const host = req.headers.host;

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

function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

  if (!origin) {
    return;
  }

  if (getAllowedOrigins(req).includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
}

function hasAllowedOrigin(req: VercelRequest) {
  const origin = req.headers.origin;

  if (!origin) {
    return true;
  }

  return getAllowedOrigins(req).includes(origin);
}

function getClientIdentifier(req: VercelRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor[0]) {
    return forwardedFor[0];
  }

  return req.headers["x-real-ip"] ?? "unknown";
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (!hasAllowedOrigin(req)) return res.status(403).json({ error: "Origin not allowed" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (isRateLimited(getClientIdentifier(req))) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    return res.status(503).json({ error: "Contact form is not configured" });
  }

  const sanitized = sanitizeContactPayload(req.body);
  if (!sanitized) {
    return res.status(400).json({ error: "Invalid contact form payload" });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New strategy call request from ${sanitized.name}`,
        from_name: "DevelopedByDean Website",
        name: sanitized.name,
        business: sanitized.business || "Not provided",
        email: sanitized.email,
        phone: sanitized.phone || "Not provided",
        location: sanitized.location || "Not provided",
        preferred_date: sanitized.preferred_date || "Not provided",
        preferred_time: sanitized.preferred_time || "Not provided",
        message: sanitized.message,
      }),
    });

    if (!response.ok) {
      console.error("Web3Forms error:", await response.text());
      return res.status(500).json({ error: "Failed to send message" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
