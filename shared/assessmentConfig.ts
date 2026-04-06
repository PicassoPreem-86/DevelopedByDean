export type AssessmentLeadPayload = {
  name: string;
  email: string;
  company: string;
  industry: string;
  overall_score: number;
  band: string;
  message: string;
};

const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 4000;

function sanitizeField(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function sanitizeScore(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

export function sanitizeAssessmentLeadPayload(
  input: unknown
): AssessmentLeadPayload | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const payload = input as Record<string, unknown>;
  const overallScore = sanitizeScore(payload.overall_score);

  if (overallScore === null) {
    return null;
  }

  const sanitized: AssessmentLeadPayload = {
    name: sanitizeField(payload.name),
    email: sanitizeField(payload.email),
    company: sanitizeField(payload.company),
    industry: sanitizeField(payload.industry, 100),
    overall_score: overallScore,
    band: sanitizeField(payload.band, 100),
    message: sanitizeField(payload.message, MAX_MESSAGE_LENGTH),
  };

  if (!sanitized.name || !sanitized.email || !sanitized.band || !sanitized.message) {
    return null;
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email);

  if (!isValidEmail) {
    return null;
  }

  return sanitized;
}
