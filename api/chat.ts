import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  CHAT_MAX_TOKENS,
  CHAT_MODEL,
  SYSTEM_PROMPT,
  sanitizeChatMessages,
} from "../shared/chatConfig";

// --- Rate limiting & CORS ---

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 15;
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

// --- Handler ---

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!hasAllowedOrigin(req)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (isRateLimited(getClientIdentifier(req))) {
    return res.status(429).json({ error: "Too many requests" });
  }

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({ error: "Chat is not configured" });
    }

    const messages = sanitizeChatMessages(req.body?.messages);

    if (!messages) {
      return res.status(400).json({ error: "Invalid messages payload" });
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: CHAT_MODEL,
      max_tokens: CHAT_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return res.status(200).json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
