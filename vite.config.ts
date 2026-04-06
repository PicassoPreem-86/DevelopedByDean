import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  processAssessmentRequest,
  processChatRequest,
  processContactRequest,
  processFoundingWallRequest,
} from "./shared/server/routeHandlers";
import { createJsonPostRoute } from "./shared/server/viteJsonRoute";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "api-chat-dev",
      configureServer(server) {
        const routes = [
          {
            path: "/api/chat",
            handler: (body: unknown) =>
              processChatRequest(body, process.env.ANTHROPIC_API_KEY),
          },
          {
            path: "/api/contact",
            handler: (body: unknown) =>
              processContactRequest(body, process.env.WEB3FORMS_KEY),
          },
          {
            path: "/api/founding-wall",
            handler: (body: unknown) =>
              processFoundingWallRequest(body, process.env.WEB3FORMS_KEY),
          },
          {
            path: "/api/assessment",
            handler: (body: unknown) =>
              processAssessmentRequest(body, process.env.WEB3FORMS_KEY),
          },
        ] as const;

        for (const route of routes) {
          server.middlewares.use(route.path, createJsonPostRoute(route.handler));
        }
      },
    },
  ],
});
