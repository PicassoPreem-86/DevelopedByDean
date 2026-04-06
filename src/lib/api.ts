export const apiEndpoints = {
  chat: "/api/chat",
  contact: import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() || "/api/contact",
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
