import type { VercelRequest, VercelResponse } from "@vercel/node";

const REQUIRED_FIELDS = ["name", "email", "message"] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin;
  if (origin) {
    const host = req.headers.host;
    const allowed = [
      `https://${host}`,
      `http://${host}`,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ].filter(Boolean);

    if (allowed.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    return res.status(503).json({ error: "Contact form is not configured" });
  }

  const { name, business, email, phone, location, preferred_date, preferred_time, message } = req.body ?? {};

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    const val = req.body?.[field];
    if (typeof val !== "string" || !val.trim()) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New strategy call request from ${name}`,
        from_name: "DevelopedByDean Website",
        name,
        business: business || "Not provided",
        email,
        phone: phone || "Not provided",
        location: location || "Not provided",
        preferred_date: preferred_date || "Not provided",
        preferred_time: preferred_time || "Not provided",
        message,
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
