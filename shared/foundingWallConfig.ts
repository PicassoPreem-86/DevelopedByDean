export type FoundingWallPayload = {
  name: string;
  message: string;
  tag: string;
  city: string;
};

const MAX_FIELD_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 220;

function sanitizeField(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export function sanitizeFoundingWallPayload(
  input: unknown
): FoundingWallPayload | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const payload = input as Record<string, unknown>;
  const sanitized: FoundingWallPayload = {
    name: sanitizeField(payload.name, 40),
    message: sanitizeField(payload.message, MAX_MESSAGE_LENGTH),
    tag: sanitizeField(payload.tag, 30),
    city: sanitizeField(payload.city, 50),
  };

  if (!sanitized.name || !sanitized.message || !sanitized.tag) {
    return null;
  }

  return sanitized;
}
