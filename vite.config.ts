import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  CHAT_MAX_TOKENS,
  CHAT_MODEL,
  SYSTEM_PROMPT,
  sanitizeChatMessages,
} from "./src/lib/chatConfig";

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
      },
    },
  ],
});
