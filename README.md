# DevelopedByDean

Personal brand website for Dean Holland — solo AI developer & systems builder.

**Live:** [developedbydean.vercel.app](https://developedbydean.vercel.app)

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
pnpm preview    # Preview production build
```

## Environment Variables

Create a `.env.local` for local development and configure the same values in Vercel for production:

```bash
ANTHROPIC_API_KEY=...
ALLOWED_ORIGINS=https://developedbydean.vercel.app,https://www.developedbydean.com
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your_real_form_id
VITE_LINKEDIN_URL=https://linkedin.com/in/your-profile
VITE_X_URL=https://x.com/your-handle
VITE_GITHUB_URL=https://github.com/your-handle
```

If `VITE_CONTACT_FORM_ENDPOINT` is omitted, the contact form falls back to opening a pre-filled email to `hello@developedbydean.com`.

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

Deployed automatically via Vercel. Push to `main` to deploy, and make sure the environment variables above are set in the project settings before promoting to production.
