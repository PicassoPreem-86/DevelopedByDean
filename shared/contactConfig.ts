export const CONTACT_REQUIRED_FIELDS = ["name", "email", "message"] as const;
export const CONTACT_MAX_FIELD_LENGTH = 500;
export const CONTACT_MAX_MESSAGE_LENGTH = 4000;

export type ContactPayload = {
  name: string;
  business: string;
  email: string;
  phone: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
};

function sanitizeField(value: unknown, maxLength = CONTACT_MAX_FIELD_LENGTH) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export function sanitizeContactPayload(input: unknown): ContactPayload | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const payload = input as Record<string, unknown>;
  const sanitized: ContactPayload = {
    name: sanitizeField(payload.name),
    business: sanitizeField(payload.business),
    email: sanitizeField(payload.email),
    phone: sanitizeField(payload.phone),
    location: sanitizeField(payload.location),
    preferred_date: sanitizeField(payload.preferred_date, 50),
    preferred_time: sanitizeField(payload.preferred_time, 50),
    message: sanitizeField(payload.message, CONTACT_MAX_MESSAGE_LENGTH),
  };

  for (const field of CONTACT_REQUIRED_FIELDS) {
    if (!sanitized[field]) {
      return null;
    }
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email);

  if (!isValidEmail) {
    return null;
  }

  return sanitized;
}
