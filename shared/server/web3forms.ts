import type { AssessmentLeadPayload } from "../assessmentConfig";
import type { ContactPayload } from "../contactConfig";
import type { FoundingWallPayload } from "../foundingWallConfig";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

type Web3FormsValue = string | number;
type Web3FormsSubmission = Record<string, Web3FormsValue>;

export function buildContactSubmission(
  payload: ContactPayload
): Web3FormsSubmission {
  return {
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
  };
}

export function buildFoundingWallSubmission(
  payload: FoundingWallPayload
): Web3FormsSubmission {
  return {
    subject: `New Founding Wall note from ${payload.name}`,
    from_name: "DevelopedByDean Founding Wall",
    name: payload.name,
    tag: payload.tag,
    city: payload.city || "Not provided",
    message: payload.message,
  };
}

export function buildAssessmentSubmission(
  payload: AssessmentLeadPayload
): Web3FormsSubmission {
  return {
    subject: `[AI Assessment] ${payload.name} - Score: ${payload.overall_score}/100`,
    from_name: "DevelopedByDean AI Assessment",
    name: payload.name,
    email: payload.email,
    company: payload.company || "Not provided",
    industry: payload.industry || "Not provided",
    overall_score: payload.overall_score,
    band: payload.band,
    message: payload.message,
  };
}

export async function submitToWeb3Forms(
  accessKey: string,
  submission: Web3FormsSubmission
) {
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      ...submission,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}
