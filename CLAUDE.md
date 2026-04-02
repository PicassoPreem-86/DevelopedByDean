# DevelopedByDean

> This site is a live product demo. Every pixel, interaction, and system on it should prove that Dean builds world-class AI experiences. If the site itself isn't impressive, nothing else matters.

**Live:** https://developedbydean.ai
**Deploy:** Vercel auto-deploys on push to `main`

---

## What This Project Is

Personal brand + lead generation site for Dean Holland — solo AI developer & systems engineer who builds AI voice agents, websites, and automations for businesses. The site IS the portfolio. The chat widget IS the product demo. The conversion flow IS proof of what Dean delivers.

Every decision should reinforce: "This person clearly builds premium products."

## Tech Stack

- React 19 + TypeScript (strict mode, zero `any`)
- Tailwind CSS v3 with custom design tokens
- Framer Motion for animations
- Vite for dev/build
- pnpm for packages
- Vercel for hosting + serverless functions
- Claude Haiku for AI chat widget
- Web3Forms for lead capture

## Commands

```bash
pnpm dev        # Dev server (port 5173, auto-increments)
pnpm build      # TypeScript check + production build — must pass before pushing
pnpm test       # Vitest smoke tests — must pass before pushing
pnpm lint       # ESLint
```

## Project Structure

```
src/
├── sections/        # Full-width page sections (Hero, Navbar, Footer, Testimonials, etc.)
├── pages/           # Route-level pages (HomePage, FAQPage, ServicesHubPage, etc.)
├── components/      # Reusable components (SEO, ChatWidget, Breadcrumbs)
├── data/            # Static data arrays (seoPages.ts, foundingWallNotes.ts)
├── lib/             # Config re-exports
├── test/            # Smoke tests
├── App.tsx          # Router + Layout wrapper
└── main.tsx         # Entry point
shared/              # Config shared between frontend + API functions
api/                 # Vercel serverless functions (chat, contact, founding-wall)
public/              # Static assets (headshot, favicon)
docs/                # PRD and specs
```

## Architecture

- **Client-side SPA** — react-router-dom, no SSR
- **Programmatic SEO pages** — defined in `src/data/seoPages.ts`. Add an object to the array = new page with hero, FAQs, deliverables, process steps, cross-links, structured data
- **AI Chat** — lazy-loaded widget → `/api/chat` serverless → Claude Haiku. Lead data extracted from hidden `<!--LEAD:{}-->` tags in responses, auto-submitted to Web3Forms
- **Contact form** — 4 fields (name, email, phone, message), submits client-side to Web3Forms
- **Founding Wall** — disabled everywhere (App.tsx, Navbar, Footer, HomePage). Re-enable when Supabase is ready

---

## Design System — The Quality Bar

This site must feel like a **premium product**, not a developer side project. These are the rules:

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `accent` | `#4361EE` | Primary brand blue — NOT a Tailwind default |
| `accent-hover` | `#3A56D4` | Hover states |
| `accent-light` | `#7B93F5` | Light accents, badges on dark backgrounds |
| `hero` | `#0B0F19` | Dark section backgrounds |
| `surface-light` | `#F8FAFC` | Light section backgrounds |
| `content-primary` | `#0F172A` | Headings on light backgrounds |
| `content-body` | `#334155` | Body text on light backgrounds |
| `content-muted` | `#64748B` | Secondary text, labels |

Never use raw Tailwind color classes (`blue-500`, `gray-600`) on this project. Always use the design tokens above. The accent color was specifically chosen to NOT be recognizable as a framework default.

### Typography
- **Font:** Plus Jakarta Sans (loaded via Google Fonts)
- **Display heading (hero):** `text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight`
- **Section heading (h2):** `text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight`
- **Eyebrow labels:** `text-xs font-bold uppercase tracking-widest text-accent`
- Keep `clamp()` values consistent — don't invent new ones per section

### Spacing
- **Major sections:** `py-20 lg:py-28` — this is the standard, don't deviate
- **Minor strips** (TrustStrip, CertificationBar, ScarcityBanner): `py-5` to `py-8`
- **Container:** `max-w-container` (1200px) with `px-6`

### Cards & Surfaces
- Standard card: `rounded-2xl border border-border-light bg-white shadow-card`
- Hover state: `hover:shadow-card-hover` or `hover:border-accent/20`
- Dark cards: `rounded-xl border border-white/[0.08] bg-white/[0.03]`
- Never stack more than one border + shadow treatment

### Animations — Variety Is Mandatory
The site was specifically redesigned to break animation monotony. Follow these rules:

- **Never** use the same `initial → animate` pattern on consecutive sections
- Mix these entrance types:
  - `filter: "blur(6px)" → "blur(0px)"` (blur-in, used on hero text)
  - `scale: 0.96 → 1` (scale-in, used on testimonial cards, stats)
  - `x: -16 → 0` with blur (slide-blur, used on pain points)
  - `y: 24 → 0` with custom easing (standard slide, use sparingly)
- **Hover micro-interactions:** cards should respond — `whileHover={{ x: 4 }}` on service cards, `hover:shadow-card-hover` on trust evidence
- **Scroll-linked animation:** ProcessSteps has a scroll-progress line via `useScroll` — use this pattern for any future timeline/progress sections
- **Easing:** prefer `[0.25, 0.46, 0.45, 0.94]` (custom ease-out) over Framer defaults
- **Speed:** hero entrance should complete within 500ms. No section should take >600ms to fully reveal

### Mobile
- All layouts must be responsive. Use `flex-col sm:flex-row`, `grid-cols-1 lg:grid-cols-2` etc.
- Chat widget: handles `safe-area-inset-bottom`, uses `16px` input font (prevents iOS zoom)
- Test that touch targets are at least 44px
- Mobile nav: fullscreen overlay with staggered link entrances

---

## Conversion Architecture

The homepage is a persuasion sequence. The order matters:

1. **Hero** — hook + credibility (Anthropic certified) + dual CTA
2. **CertificationBar** — hard proof of technical credibility
3. **TrustStrip** — industry social proof
4. **StatsBar** — quantified credibility
5. **PainSolution** — problem agitation → service menu
6. **Testimonials** — peer proof (replace placeholders with real quotes ASAP)
7. **ProcessSteps** — demystify the buying process
8. **TrustEvidence** — delivery standards + proof pillars
9. **ScarcityBanner** — urgency (auto-updates month via `new Date()`)
10. **FinalCTA** — simplified form + pricing anchor ($2,500)

**Do not reorder sections** without understanding the persuasion flow. Each section addresses a specific buyer objection in sequence.

### CTAs
- Primary: "Book a Free Strategy Call" — accent button with calendar icon
- Secondary: "Watch a 2-Min Demo" (when `VITE_DEMO_VIDEO_URL` is set) or "See What I Build"
- Navbar CTA: "Book a Free Call →"
- Every CTA points to `#contact` or a service page — never to a dead end

### Lead Capture
Two paths:
1. **Contact form** — direct, 4 fields, goes to Web3Forms inbox
2. **Chat widget** — conversational, collects info through dialogue, extracts via `<!--LEAD:{}-->` tags

Both feed into the same Web3Forms inbox for Dean to follow up.

---

## Copy & Voice

- **Tone:** direct, confident, no-bullshit. Not corporate, not casual-bro.
- **Positioning:** "I help businesses make more money with AI" — benefits first, tech second
- **Differentiator:** "You work directly with me — no agency middlemen"
- **Never** use jargon without immediately explaining the business value
- **Pain points speak to:** missed calls, slow follow-up, manual ops, weak conversion
- **Arrow character:** use `→` (HTML entity `&rarr;`) — never literal `->` in visible UI

---

## Environment Variables

**Required (Vercel):**
```
ANTHROPIC_API_KEY          # Claude API for chat widget
WEB3FORMS_KEY              # Server-side form handler
VITE_WEB3FORMS_KEY         # Client-side chat lead capture
```

**Optional (Vercel):**
```
VITE_DEMO_VIDEO_URL        # Enables "Watch Demo" button in hero
VITE_PHONE                 # Shows phone number in footer
VITE_LINKEDIN_URL          # Footer social link
VITE_X_URL                 # Footer social link
VITE_GITHUB_URL            # Footer social link
VITE_GOOGLE_SITE_VERIFICATION
VITE_BING_SITE_VERIFICATION
```

When adding a new env var, tell Dean: the exact variable name, where to add it (Vercel project settings), and where to get the value.

---

## Adding New Pages

### New SEO Landing Page (service or industry)
1. Add an entry to `servicePages` or `industryPages` in `src/data/seoPages.ts`
2. Fill all fields: slug, path, title, metaTitle, description, heroTitle, heroDescription, primaryKeyword, secondaryKeywords, idealFor, outcomes, deliverables, process, faqs, links
3. The route is auto-registered in `App.tsx` — no router changes needed
4. Cross-link from existing pages

### New Homepage Section
1. Create component in `src/sections/`
2. Import and place in `src/pages/HomePage.tsx` in the correct persuasion-flow position
3. Match the design system (spacing, typography, color tokens, animation variety)

---

## Testing

- **Vitest** + React Testing Library + jsdom
- 2 known failures: FoundingWall smoke tests (feature disabled) — ignore these
- Run `pnpm build && pnpm test` before every push
- After UI changes: visually verify on the live site

## Git Workflow

- Commit after each working change — don't batch unrelated features
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Push to `main` = auto-deploy to production
- CI: GitHub Actions runs lint + test + build on every push/PR

## Disabled Features

These are commented out and should not be re-enabled without explicit instruction:
- **Founding Wall** — route, nav link, footer link, homepage teaser all commented out
- **SeoClusters section** — removed from homepage (still exists as component for hub pages)
- **TechStack section** — removed from homepage (still exists as component)

---

## What "Done" Looks Like

A task is complete when:
- The feature works end-to-end
- `pnpm build` passes
- `pnpm test` passes (ignoring known FoundingWall failures)
- It looks premium — proper spacing, alignment, animation, responsive
- Edge cases and error states are handled
- The exact command or URL to verify is provided
