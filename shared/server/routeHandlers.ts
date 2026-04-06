import Anthropic from "@anthropic-ai/sdk";
import {
  CHAT_MAX_TOKENS,
  CHAT_MODEL,
  SYSTEM_PROMPT,
  sanitizeChatMessages,
} from "../chatConfig";
import {
  sanitizeAssessmentLeadPayload,
  type AssessmentLeadPayload,
} from "../assessmentConfig";
import {
  sanitizeContactPayload,
  type ContactPayload,
} from "../contactConfig";
import {
  sanitizeFoundingWallPayload,
  type FoundingWallPayload,
} from "../foundingWallConfig";
import {
  buildAssessmentSubmission,
  buildContactSubmission,
  buildFoundingWallSubmission,
  submitToWeb3Forms,
} from "./web3forms";

export type JsonResult = {
  status: number;
  body: Record<string, unknown>;
};

function getMessagesFromBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return null;
  }

  return sanitizeChatMessages((body as Record<string, unknown>).messages);
}

async function forwardLead(
  accessKey: string,
  payload: ContactPayload | FoundingWallPayload | AssessmentLeadPayload,
  label: string
) {
  try {
    if ("overall_score" in payload) {
      await submitToWeb3Forms(accessKey, buildAssessmentSubmission(payload));
    } else if ("tag" in payload) {
      await submitToWeb3Forms(accessKey, buildFoundingWallSubmission(payload));
    } else {
      await submitToWeb3Forms(accessKey, buildContactSubmission(payload));
    }

    return { status: 200, body: { success: true } } satisfies JsonResult;
  } catch (error) {
    console.error(`${label} error:`, error);
    return { status: 500, body: { error: "Something went wrong" } } satisfies JsonResult;
  }
}

export async function processChatRequest(
  body: unknown,
  anthropicApiKey = process.env.ANTHROPIC_API_KEY
) {
  if (!anthropicApiKey) {
    return { status: 503, body: { error: "Chat is not configured" } } satisfies JsonResult;
  }

  const messages = getMessagesFromBody(body);

  if (!messages) {
    return { status: 400, body: { error: "Invalid messages payload" } } satisfies JsonResult;
  }

  try {
    const client = new Anthropic({ apiKey: anthropicApiKey });
    const response = await client.messages.create({
      model: CHAT_MODEL,
      max_tokens: CHAT_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    return { status: 200, body: { message: text } } satisfies JsonResult;
  } catch (error) {
    console.error("Chat API error:", error);
    return { status: 500, body: { error: "Something went wrong" } } satisfies JsonResult;
  }
}

export async function processContactRequest(
  body: unknown,
  accessKey = process.env.WEB3FORMS_KEY
) {
  if (!accessKey) {
    return {
      status: 503,
      body: { error: "Contact form is not configured" },
    } satisfies JsonResult;
  }

  const payload = sanitizeContactPayload(body);

  if (!payload) {
    return {
      status: 400,
      body: { error: "Invalid contact form payload" },
    } satisfies JsonResult;
  }

  return forwardLead(accessKey, payload, "Contact API");
}

export async function processFoundingWallRequest(
  body: unknown,
  accessKey = process.env.WEB3FORMS_KEY
) {
  if (!accessKey) {
    return {
      status: 503,
      body: { error: "Founding Wall is not configured" },
    } satisfies JsonResult;
  }

  const payload = sanitizeFoundingWallPayload(body);

  if (!payload) {
    return {
      status: 400,
      body: { error: "Invalid founding wall payload" },
    } satisfies JsonResult;
  }

  return forwardLead(accessKey, payload, "Founding Wall API");
}

export async function processAssessmentRequest(
  body: unknown,
  accessKey = process.env.WEB3FORMS_KEY
) {
  if (!accessKey) {
    return {
      status: 503,
      body: { error: "Assessment capture is not configured" },
    } satisfies JsonResult;
  }

  const payload = sanitizeAssessmentLeadPayload(body);

  if (!payload) {
    return {
      status: 400,
      body: { error: "Invalid assessment payload" },
    } satisfies JsonResult;
  }

  return forwardLead(accessKey, payload, "Assessment API");
}
