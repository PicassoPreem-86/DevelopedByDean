import type { IncomingMessage, ServerResponse } from "node:http";
import type { JsonResult } from "./routeHandlers";

type NextFn = () => void;
type JsonRouteHandler = (body: unknown) => Promise<JsonResult>;

async function readJsonBody(req: IncomingMessage) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  if (!body) {
    return {};
  }

  return JSON.parse(body) as unknown;
}

function sendJson(
  res: ServerResponse<IncomingMessage>,
  status: number,
  body: Record<string, unknown>
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function createJsonPostRoute(handler: JsonRouteHandler) {
  return async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: NextFn
  ) => {
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

    try {
      const body = await readJsonBody(req);
      const result = await handler(body);
      sendJson(res, result.status, result.body);
    } catch (error) {
      if (error instanceof SyntaxError) {
        sendJson(res, 400, { error: "Invalid JSON payload" });
        return;
      }

      console.error("Dev API route error:", error);
      sendJson(res, 500, { error: "Something went wrong" });
    }
  };
}
