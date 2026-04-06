import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createRateLimiter,
  getClientIdentifier,
  hasAllowedOrigin,
  setCorsHeaders,
} from "../shared/server/http";
import { processContactRequest } from "../shared/server/routeHandlers";

const isRateLimited = createRateLimiter({
  windowMs: 60_000,
  maxRequests: 8,
});

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

  const result = await processContactRequest(req.body, process.env.WEB3FORMS_KEY);
  return res.status(result.status).json(result.body);
}
