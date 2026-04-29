// Only honor a custom contact endpoint when it's a relative path on this origin.
// Prevents an env-tampering footgun where lead data would post to an external URL.
const rawContactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim();
const contactEndpoint = rawContactEndpoint && rawContactEndpoint.startsWith("/")
  ? rawContactEndpoint
  : "/api/contact";

export const apiEndpoints = {
  chat: "/api/chat",
  contact: contactEndpoint,
  foundingWall: "/api/founding-wall",
  assessment: "/api/assessment",
} as const;

export function postJson(url: string, body: unknown) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
