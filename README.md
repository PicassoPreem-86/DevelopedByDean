# DevelopedByDean

Personal brand website for Dean Holland — solo AI developer & systems builder.

**Canonical:** [developedbydean.ai](https://developedbydean.ai)

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v3
- Framer Motion
- Vite
- Deployed on Vercel

## Development

```bash
pnpm install
pnpm dev        # Start dev server at localhost:5173
pnpm build      # Production build
pnpm test       # Unit and smoke tests
pnpm test:e2e   # Playwright end-to-end smoke tests
pnpm preview    # Preview production build
```

## Environment Variables

Create a `.env.local` for local development and configure the same values in Vercel for production:

```bash
ANTHROPIC_API_KEY=...
ALLOWED_ORIGINS=https://developedbydean.ai,https://www.developedbydean.ai,https://developedbydean.vercel.app
WEB3FORMS_KEY=...
VITE_CONTACT_FORM_ENDPOINT=/api/contact
VITE_LINKEDIN_URL=https://linkedin.com/in/your-profile
VITE_X_URL=https://x.com/your-handle
VITE_GITHUB_URL=https://github.com/your-handle
VITE_GOOGLE_SITE_VERIFICATION=...
VITE_BING_SITE_VERIFICATION=...
```

`VITE_CONTACT_FORM_ENDPOINT` should stay pointed at `/api/contact` unless you intentionally replace the built-in form handler.
Set the verification values once you have Google Search Console and Bing Webmaster Tools connected.
All lead capture flows submit through the server-side `/api/*` handlers and use `WEB3FORMS_KEY` there.
The Founding Wall submission flow also uses `WEB3FORMS_KEY` and sends notes to your moderation inbox.

## Founding Wall

The launch guestbook lives at `/founding-wall`.

- Visitors can submit a short note for moderation.
- Approved notes are displayed from [foundingWallNotes.ts](/Users/preem/Desktop/DevelopedByDean/src/data/foundingWallNotes.ts).
- To publish a note, copy it from your moderation inbox into that file and redeploy.

## Project Structure

```
src/
├── sections/        # Page sections (Navbar, Hero, TrustStrip, etc.)
├── App.tsx          # Root component — assembles all sections
├── main.tsx         # Entry point
└── index.css        # Global styles + Tailwind
public/
├── images/          # Static images (headshot)
└── favicon.svg      # Site favicon
```

## Deployment

Deployed automatically via Vercel. Push to `main` to deploy, make sure the environment variables above are set in the project settings, and keep the canonical domain configured as `https://developedbydean.ai`.

## CI

GitHub Actions now runs `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` on every pull request plus pushes to `main` and `master`.
