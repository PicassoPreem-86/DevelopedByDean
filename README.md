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

Deployed automatically via Vercel. Push to `main` to deploy.
