import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  CHAT_MAX_TOKENS,
  CHAT_MODEL,
  SYSTEM_PROMPT,
  sanitizeChatMessages,
} from "./shared/chatConfig";
import { sanitizeContactPayload } from "./shared/contactConfig";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "api-chat-dev",
      configureServer(server) {
        server.middlewares.use("/api/chat", async (req, res, next) => {
          if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method !== "POST") {
            next();
            return;
          }

          let body = "";
          for await (const chunk of req) {
            body += chunk;
          }

          try {
            if (!process.env.ANTHROPIC_API_KEY) {
              res.statusCode = 503;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Chat is not configured" }));
              return;
            }

            const messages = sanitizeChatMessages(JSON.parse(body).messages);

            if (!messages) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid messages payload" }));
              return;
            }

            const { default: Anthropic } = await import("@anthropic-ai/sdk");

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
              response.content[0].type === "text"
                ? response.content[0].text
                : "";

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: text }));
          } catch (error) {
            console.error("Chat API error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Something went wrong" }));
          }
        });
        server.middlewares.use("/api/contact", async (req, res, next) => {
          if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method !== "POST") {
            next();
            return;
          }

          let body = "";
          for await (const chunk of req) {
            body += chunk;
          }

          try {
            const accessKey = process.env.WEB3FORMS_KEY;

            if (!accessKey) {
              res.statusCode = 503;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Contact form is not configured" }));
              return;
            }

            const payload = sanitizeContactPayload(JSON.parse(body));

            if (!payload) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid contact form payload" }));
              return;
            }

            const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                access_key: accessKey,
                subject: `New strategy call request from ${payload.name}`,
                from_name: "DevelopedByDean Website",
                name: payload.name,
                business: payload.business || "Not provided",
                email: payload.email,
                phone: payload.phone || "Not provided",
                location: payload.location || "Not provided",
                preferred_date: payload.preferred_date || "Not provided",
                preferred_time: payload.preferred_time || "Not provided",
                message: payload.message,
              }),
            });

            if (!response.ok) {
              console.error("Contact API error:", await response.text());
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to send message" }));
              return;
            }

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            console.error("Contact API error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Something went wrong" }));
          }
        });
      },
    },
  ],
});
