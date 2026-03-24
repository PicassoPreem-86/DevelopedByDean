# DevelopedByDean — Portfolio & Agency Website Design Spec

**Date:** 2026-03-24
**Status:** Approved
**Type:** New Project — Single-Page Portfolio/Agency Website

---

## 1. Overview

### Brand
- **Name:** DevelopedByDean
- **Positioning:** Full-service digital partner — premium websites + intelligent AI solutions
- **Target audience:** Wide net — small business owners, startups, mid-size businesses. Anyone who needs a website, AI agents, voice agents, or automation.
- **Tone:** Professional but approachable, benefits-focused, confident without being arrogant

### Core Value Proposition
"Your business needs more than a website — it needs one that works for you." DevelopedByDean bridges the gap between web presence and AI automation. Most agencies do one or the other. Dean does both.

---

## 2. Visual Identity

### Color System
- **Base:** Dark mode primary — deep charcoal/near-black (#0a0a0a range)
- **Accent:** Vibrant gradient (electric blue to purple direction — finalized during build)
- **Text:** White primary, muted gray secondary
- **Cards/Surfaces:** Slightly elevated dark tones with subtle borders
- **Glow effects:** Accent color used for hover states and emphasis

### Typography
- **Display font:** Syne (Google Fonts) — geometric, experimental, bold character for headlines
- **Body font:** DM Sans (Google Fonts) — clean, warm, readable for body text
- Oversized bold headlines for impact
- Clean body text with generous line-height for readability
- "DevelopedByDean" wordmark: "Dean" subtly differentiated via weight or accent color

*Note: Originally spec'd as Inter. Upgraded to Syne + DM Sans during implementation planning per frontend-design skill guidelines — Inter is too generic for a premium brand site.*

### Animation & Motion
- **GSAP ScrollTrigger:** Scroll-driven animations for section reveals, staggered card entries, timeline progression
- **Framer Motion:** UI micro-interactions — hover states, button feedback, card transitions
- **Hero background:** CSS-based animated gradient (not canvas/WebGL for performance). Static gradient fallback on reduced-motion or low-end mobile.
- **Nav:** Glassmorphism blur effect on scroll
- **Cards:** Hover lift + border glow
- **Process timeline:** Sequential step animation on scroll

### Design Principles
- Dark, modern, premium feel — not a template
- Structured maximalism — bold but organized
- Every animation serves a purpose (guides attention, provides feedback)
- Mobile-responsive by default
- Performance-conscious — animations should not compromise load times

### Accessibility
- Respect `prefers-reduced-motion` media query (disable/simplify all animations)
- All interactive elements keyboard-navigable with visible focus states
- Semantic HTML throughout (nav, main, section, footer)
- Form inputs have associated labels
- Color contrast meets WCAG AA minimum (4.5:1 for body text)
- Images have alt text

### SEO
- Page title: "DevelopedByDean | Custom Websites & AI Solutions"
- Meta description targeting primary keywords
- Open Graph tags for social sharing (title, description, image)
- Semantic HTML (header, nav, main, section, footer)

### Responsive Breakpoints
- Use Tailwind default breakpoints
- Tablet (768-1023px): follows mobile layout with wider spacing
- Desktop (1024px+): full layout

### Icons
- Use Lucide icon set (SVGs) styled to match accent color
- Custom illustrations can replace these later

---

## 3. Page Structure

Single-page site with smooth scroll navigation. No multi-page routing.

### Section 1: Navigation & Header

**Layout:** Fixed top bar, full-width

**Elements:**
- Logo: "DevelopedByDean" wordmark (left-aligned), "Dean" accented
- Nav links: Services | Portfolio | About | Contact
- CTA button: "Get In Touch" (right-aligned, accent-colored)
- Mobile: Hamburger menu — slides in from right, full-height overlay with backdrop blur, includes "Get In Touch" CTA, closes on X button, backdrop click, or nav link click

**Behavior:**
- Sticky on scroll
- Background transitions from transparent to glassmorphism blur on scroll
- CTA always visible regardless of scroll position

### Section 2: Hero

**Layout:** Full-viewport height, centered content

**Elements:**
- Headline: Outcome-driven, oversized bold text with gradient effect on key words
  - Direction: "Your Business Deserves More Than a Website. It Deserves One That Works For You."
- Subheadline: Single positioning line
  - Direction: "I build premium websites and intelligent AI solutions that grow your business on autopilot."
- Single CTA button: "Let's Talk" (scrolls to contact section)
- Background: CSS-based animated gradient — alive but not distracting. No canvas/WebGL.
- Trust strip: Horizontal row of AI certification badges below the CTA. At launch, display certs only. Client logos added as they become available. If fewer than 3 items, omit the strip entirely rather than displaying a sparse row.

**No stock photos, no hero image, no multiple CTAs.**

### Section 3: Services — "What I Build"

**Layout:** Bento grid — asymmetric card layout

**Track 1 — Websites (2 cards):**
1. **Custom Websites** — "Designed from scratch to convert visitors into customers. Fast, responsive, and built to grow with you."
2. **Web Applications** — "Interactive tools, dashboards, and platforms tailored to how your business operates."

**Track 2 — AI Solutions (3 cards):**
3. **AI Agents** — "Custom assistants that handle customer questions, qualify leads, and support your team 24/7."
4. **Voice Agents** — "AI-powered phone systems that book appointments, answer FAQs, and never put anyone on hold."
5. **AI Workflows & Automation** — "Eliminate repetitive tasks. Connect your tools and let AI handle the busywork."

**Per card:**
- Lucide SVG icon, styled in accent color
- Service name (bold)
- One-line benefit statement
- Hover: slight lift + accent border glow

**Below grid:** "Not sure what you need? Let's figure it out together." + soft secondary CTA to contact

### Section 4: Portfolio — "Selected Work"

**Layout:** 2-column staggered grid (desktop), single column (mobile)

**Per project card:**
- Full-width screenshot/mockup image
- Project name
- One-line description (what + who)
- Tags: "Website" / "AI Agent" / "Automation" etc.
- Hover: slight image zoom + overlay with "View Project"

**Click-through detail view (full-screen modal overlay with close button, not a separate route):**
- The challenge / client need
- What was built
- Results & metrics (when available)
- Tech used
- Screenshot gallery
- Close via X button, Escape key, or backdrop click

**Capacity:** 3-6 projects. Starts with 2-3 placeholder cards styled as intentional teasers — dark overlay with "Case Study Coming Soon" text. Looks designed, not empty.

**Below grid:** "More projects in the pipeline. Let's make yours next." + CTA to contact

### Section 5: About — "The Person Behind the Code"

**Layout:** Split — text left, photo right (desktop). Stacked on mobile.

**Content:**
- 2-3 short paragraphs, conversational and confident
- Emphasizes the bridge between technical expertise and business understanding
- Ends with a personal, memorable touch
- No resume-style bullet points

**Photo area:**
- Placeholder for professional headshot
- Styled with subtle border or accent glow treatment

**Certifications:**
- Below about text or beside photo
- AI certifications as clean badge icons, horizontal row
- 3-5 badges max
- Hover/tooltip shows certification name

**Slightly lighter dark background for visual separation from adjacent sections.**

### Section 6: Process — "How We Get There"

**Layout:** Horizontal stepped layout (desktop), vertical timeline (mobile)

**4 steps:**
1. **Discovery** — "We talk about your business, your goals, and what's not working. No jargon, no pressure."
2. **Strategy & Design** — "I map out the solution — what to build, how it works, and what results to expect."
3. **Build & Test** — "I design and develop everything, testing thoroughly before you see it. No half-baked demos."
4. **Launch & Support** — "We go live. I stick around to make sure everything runs smoothly and performs."

**Visual treatment:**
- Numbered cards/nodes connected by animated line/path
- Steps animate in sequentially on scroll (GSAP ScrollTrigger)
- Active/hover state highlights with accent color

**Below steps:** "From first call to live product, most projects launch in 2-4 weeks."

### Section 7: Contact — "Let's Build Something"

**Layout:** Full-width, dark background with subtle gradient shift

**Subline:** "Tell me about your project and I'll get back to you within 24 hours."

**Form fields (4):**
1. Name (text input)
2. Email (email input)
3. Project type (dropdown: Website / AI Agent / Voice Agent / AI Automation / Not Sure Yet)
4. Message (textarea: "Tell me a bit about what you need")

**Submit button:** "Send It" — accent-colored, loading state on submit

**Below form:**
- Email address as fallback
- Social icon row (GitHub, LinkedIn, X/Twitter — as applicable)

**No map, no phone number, no physical address.**

### Section 8: Footer

**Minimal footer below contact:**
- Copyright: " 2026 DevelopedByDean"
- Social icon links (GitHub, LinkedIn, X/Twitter)
- "Back to top" button (smooth scrolls to hero)

---

## 4. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Scroll animations | GSAP + ScrollTrigger |
| UI transitions | Framer Motion |
| Smooth scrolling | Lenis (if needed) |
| Form backend | Formspree (free tier, POST endpoint, no SDK needed) |
| Deployment | Vercel |
| Package manager | pnpm |

### Project Structure
```
src/
├── components/     # Reusable UI (Button, Card, Nav, etc.)
├── sections/       # Page sections (Hero, Services, Portfolio, etc.)
├── hooks/          # Custom hooks (useScrollAnimation, etc.)
├── utils/          # Helper functions
├── types/          # TypeScript types
├── styles/         # Global styles, Tailwind config
├── assets/         # Icons, images, placeholder assets
└── App.tsx         # Main app, section composition
public/
├── fonts/
└── images/
```

---

## 5. What's Explicitly NOT Included

These are intentional omissions, not oversights:

- **No pricing page** — use contact form to qualify leads
- **No blog** — can be added later for SEO
- **No live chatbot demo** — can be added later as a differentiator
- **No testimonials section** — will be added when client testimonials are collected. Future placement: inline between Portfolio and About sections.
- **No FAQ section** — can be added later between Process and Contact to handle pricing/timeline objections
- **No metrics/stats section** — can be added later once real project data exists (projects completed, client satisfaction, etc.)
- **No multi-page routing** — single-page smooth scroll
- **No dark/light mode toggle** — dark mode only (matches brand and audience expectations)
- **No backend** — static site, form submits to Formspree
- **No 404 page in v1** — uses Vercel default; custom branded 404 can be added later

---

## 6. Content Requirements (From User)

These items are needed from Dean to complete the site:

- [ ] Professional headshot photo
- [ ] AI certification badge images / details
- [ ] 2-3 real project screenshots + descriptions (when ready)
- [ ] Social media profile links
- [ ] Contact email address
- [ ] Short bio (2-3 paragraphs) or notes for Claude to draft one
- [ ] Any client testimonials (when available)

Placeholder content will be used until these are provided.

---

## 7. Success Criteria

The site is done when:
- All 8 sections are built and functional (Nav, Hero, Services, Portfolio, About, Process, Contact, Footer)
- Scroll animations work smoothly on desktop and mobile
- Contact form submits successfully
- Site is responsive across breakpoints (mobile, tablet, desktop)
- Lighthouse performance score > 90
- Deployed live on Vercel
- `pnpm dev` runs without errors
