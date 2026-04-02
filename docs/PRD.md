# Product Requirements Document — DevelopedByDean

## Vision

DevelopedByDean.ai is the personal brand website and lead generation system for Dean Holland, a solo AI developer and systems engineer. The site itself serves as a live product demo — showcasing the same AI-powered experiences, automation, and conversion systems that Dean builds for clients.

## Target Users

1. **Small business owners** (contractors, HVAC, plumbing, cleaning) — missing calls, need AI phone agents and lead capture
2. **Medical/aesthetic clinics** — want more consultation bookings, better intake automation
3. **Law firms** — need faster intake, qualification, and follow-up
4. **Agencies & coaches** — looking for workflow automation and AI-powered websites
5. **Founders** — evaluating AI solutions, comparing solo dev vs. agency

## Core Features

### Live AI Chat Widget
- Claude Haiku-powered conversational assistant ("DeanAI")
- Nudge sequence: first bubble at 3s, second at 15s
- Quick reply buttons for common intents
- Lead capture flow: collects name, email, phone, business, location, preferred date/time, challenge
- Hidden `<!--LEAD:{}-->` tag extraction, submitted to Web3Forms
- Lazy-loaded for performance

### Contact Form (FinalCTA)
- 4-field simplified form: name, email, phone, message
- Submits to Web3Forms
- Pricing anchor: "Projects start at $2,500"
- Success state with confirmation message

### Homepage Sections (in order)
1. **Hero** — headline, sub-copy, dual CTAs, headshot with gradient overlay
2. **Certification Bar** — Anthropic Certified AI Developer badge
3. **Trust Strip** — industry icons (Contractors, Medical, Ecommerce, Agencies, Coaches)
4. **Stats Bar** — animated count-up metrics
5. **Pain/Solution** — problem agitation + 4 service cards linking to service pages
6. **Testimonials** — 3 client testimonial cards with star ratings and industry tags
7. **Process Steps** — 3-step "How It Works" with scroll-linked progress line
8. **Trust Evidence** — proof pillars + delivery standards list
9. **Scarcity Banner** — dynamic month, green pulse dot, "accepting 2 new clients"
10. **Final CTA** — contact form with pricing anchor

### SEO Landing Pages
- **4 service pages:** AI Voice Agents, AI Websites, Workflow Automation, Lead Generation Systems
- **3 industry pages:** Home Services, Med Spas, Law Firms
- Each page has: hero, ideal-for list, outcomes, deliverables, process steps, FAQs, cross-links
- Defined in `src/data/seoPages.ts` — add a new entry to create a new page
- Breadcrumbs and structured data on all pages

### Hub Pages
- `/services` — grid of all service pages
- `/industries` — grid of all industry pages

### Standalone Pages
- `/use-cases` — use case examples
- `/results` — results/ROI framing (transparency note about early stage)
- `/process` — detailed process breakdown
- `/faq` — accordion FAQ with 6 questions

### Navigation
- Floating navbar with backdrop blur, scroll-responsive opacity
- Mobile fullscreen menu with staggered animation
- Footer with nav links, contact email, social links, phone (when configured)

## Current State

### Shipped
- Full homepage with all 10 sections
- AI chat widget with lead capture
- 7 SEO landing pages (4 service + 3 industry)
- Simplified contact form with pricing anchor
- Custom accent color (#4361EE)
- Dynamic scarcity banner (auto-updates month)
- Anthropic certification bar
- Responsive design (mobile + desktop)
- CI/CD via GitHub Actions + Vercel auto-deploy
- Structured data (JSON-LD)
- Open Graph + Twitter meta tags

### Not Yet Shipped
- Real client testimonials (currently placeholder)
- Demo video (env var ready: `VITE_DEMO_VIDEO_URL`)
- Phone number in footer (env var ready: `VITE_PHONE`)
- Founding Wall guestbook (disabled, waiting for Supabase)

## Roadmap

### Near Term
- **Real testimonials** — replace 3 placeholder testimonials with actual client quotes
- **Demo video** — record Loom walkthrough, set `VITE_DEMO_VIDEO_URL` in Vercel
- **Phone number** — set `VITE_PHONE` in Vercel
- **Calendly integration** — replace manual form scheduling with embedded Calendly

### Medium Term
- **Founding Wall** — Supabase-backed guestbook at `/founding-wall` with moderation
- **Case studies** — anonymized project breakdowns with before/after metrics
- **Portfolio section** — screenshots/recordings of delivered projects
- **Blog/content** — SEO-driven content marketing

### Long Term
- **Client portal** — project status, deliverables, communication
- **AI voice agent demo** — embeddable phone demo visitors can call
- **ROI calculator** — interactive tool estimating AI impact for different business types
- **Admin dashboard** — internal tool for managing leads, content, analytics
