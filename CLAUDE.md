# DevelopedByDean

Personal brand website for Dean Holland — solo AI developer & systems engineer.

**Live site:** https://developedbydean.ai
**Repo:** GitHub (deployed via Vercel on push to `main`)

## Tech Stack

- React 19 + TypeScript (strict)
- Tailwind CSS v3
- Framer Motion (animations)
- Vite (dev/build)
- Plus Jakarta Sans (Google Fonts)
- pnpm (package manager)

## Commands

```bash
pnpm dev        # Dev server (default port 5173, auto-increments)
pnpm build      # TypeScript check + Vite production build
pnpm test       # Vitest (run once)
pnpm lint       # ESLint
pnpm preview    # Preview production build locally
```

## Project Structure

```
src/
├── sections/        # Page-level sections (Hero, Navbar, Footer, Testimonials, etc.)
├── pages/           # Route pages (HomePage, FAQPage, ServicesHubPage, etc.)
├── components/      # Reusable components (SEO, ChatWidget, Breadcrumbs, StructuredData)
├── data/            # Static data (seoPages.ts, foundingWallNotes.ts)
├── lib/             # Config re-exports (chatConfig.ts)
├── test/            # Vitest smoke tests
├── App.tsx          # Router + Layout
└── main.tsx         # Entry point
shared/              # Config shared between frontend and API (chatConfig, contactConfig, siteConfig)
api/                 # Vercel serverless functions (chat.ts, contact.ts, founding-wall.ts)
public/              # Static assets (images, favicon)
```

## Key Architecture Decisions

- **Client-side SPA** — no SSR. All routing via react-router-dom.
- **Programmatic SEO pages** — service and industry landing pages generated from `src/data/seoPages.ts` array. Add a new entry to add a new page.
- **AI Chat Widget** — lazy-loaded, powered by Claude Haiku via `/api/chat` serverless function. Lead capture via hidden `<!--LEAD:{}-->` tags in AI responses, submitted to Web3Forms.
- **Contact form** — submits directly to Web3Forms (client-side). Simplified to 4 fields: name, email, phone, message.
- **Founding Wall** — currently disabled (commented out in App.tsx, Navbar, Footer, HomePage). Waiting for Supabase integration.

## Environment Variables

**Required in Vercel:**
```
ANTHROPIC_API_KEY          # Powers the AI chat widget
WEB3FORMS_KEY              # Server-side form submissions
VITE_WEB3FORMS_KEY         # Client-side chat lead capture
```

**Optional:**
```
VITE_DEMO_VIDEO_URL        # Loom/YouTube URL — enables "Watch Demo" hero button
VITE_PHONE                 # Phone number — shows in footer
VITE_LINKEDIN_URL          # Social link
VITE_X_URL                 # Social link
VITE_GITHUB_URL            # Social link
VITE_GOOGLE_SITE_VERIFICATION
VITE_BING_SITE_VERIFICATION
```

## Design System

- **Accent color:** `#4361EE` (custom — not a Tailwind default)
- **Dark sections:** `bg-hero` (#0B0F19)
- **Light sections:** `bg-surface-light` (#F8FAFC) or `bg-white`
- **Font:** Plus Jakarta Sans
- **Max width:** 1200px (`max-w-container`)
- **Shadows:** `shadow-card`, `shadow-card-hover`, `shadow-glow`

## Conventions

- Animations: Framer Motion with varied patterns (blur-in, scale, stagger). Avoid uniform `opacity+y` on every section.
- Section padding: `py-20 lg:py-28` for major sections.
- Headlines use responsive `clamp()` values: `text-[clamp(1.75rem,3.5vw,2.5rem)]` for h2s.
- No `any` types. No unused imports. No console.logs in production code.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

## Testing

- Vitest + React Testing Library + jsdom
- 2 known failures: FoundingWall tests (feature is disabled — ignore these)
- Run `pnpm test` before pushing

## Deployment

- Auto-deploys on push to `main` via Vercel
- Canonical domain: `https://developedbydean.ai`
- CI: GitHub Actions runs lint, test, build on PRs and pushes to main
