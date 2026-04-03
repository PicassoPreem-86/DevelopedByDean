# Services Hub Page Redesign

**Date:** 2026-04-02
**Status:** Approved design, pending implementation
**Page:** `/services` (ServicesHubPage.tsx)

---

## Goal

Transform the `/services` hub from a minimal index page into a high-converting, SEO-optimized pillar page that ranks for "AI services for businesses," educates SMB visitors, and drives them toward a strategy call. The page should feel premium, not cluttered — every section earns its place by either building trust, answering an objection, or creating a conversion opportunity.

## Research-Backed Principles

1. **Pillar/cluster SEO architecture** — The hub is the pillar page linking down to 4 service pages and 3 industry pages. Clustered content gets 3.2x more AI search citations than standalone pages. The hub needs substantial unique body copy (2,000-2,500 words) to rank independently.
2. **SMB buyer psychology** — Small business owners buy outcomes (revenue, time savings), not technology. They need to trust the person, understand the process, and see relevance to their industry. Biggest objection is unfamiliarity with AI, not distrust.
3. **No dead ends** — Every scroll depth has a CTA or a next action. Internal links appear in body copy (not just navigation) for stronger SEO authority passing.
4. **Animation variety** — No two consecutive sections use the same entrance animation pattern. Mix blur-in, scale-in, slide-blur, and scroll-linked animations.

---

## Page Structure (8 Sections)

### Section 1: Hero (dark bg — `bg-hero`)

- **Eyebrow:** `text-xs font-bold uppercase tracking-widest text-accent-light` — "AI Services for Growing Businesses"
- **Headline:** "Stop Losing Revenue to Slow Response, Weak Follow-Up, and Manual Operations"
  - Typography: `text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-white`
- **Subhead:** 2 sentences positioning Dean as the expert. Emphasizes direct collaboration ("You work directly with me — no agency layers, no handoffs"). White/70 text.
- **CTA:** "Book a Free Strategy Call" — accent button with calendar icon, links to `#contact`
- **Spacing:** `pb-16 pt-28 lg:pb-24 lg:pt-36 px-6`
- **Animation:** `filter: "blur(6px)" → "blur(0px)"` on headline (blur-in, matches homepage hero)
- **Container:** `max-w-container` (1200px)

### Section 2: Pain Points Strip (light bg — `bg-surface-light`)

- **Intro paragraph:** ~100 words of problem-framing copy above the cards. Speaks to the business owner's daily reality — missed calls, slow response, manual data entry, leads going cold. Natural keyword usage.
- **4 horizontal cards** in a single row (stacks 2x2 on tablet, 1-col on mobile):
  - Each card: Lucide icon (PhoneMissed, Clock, ClipboardList, TrendingDown) + bold problem label + 1-sentence description
  - Card style: `rounded-xl bg-white border border-border-light p-5` — no click target, informational only
- **Spacing:** `py-16 lg:py-20 px-6`
- **Animation:** Staggered slide-blur entrance (`x: -16, filter: "blur(2px)"` → clear), 80ms stagger between cards

### Section 3: Services Grid (white bg)

- **Eyebrow:** "What I Build"
- **Headline:** "Four Core Systems That Drive Revenue, Save Time, and Scale Operations"
- **Intro paragraph:** ~150 words positioning the four services as an integrated system. This is the primary SEO body copy. Natural usage of target keywords: "AI services for businesses," "AI automation," "AI voice agents," "AI website development," "workflow automation," "lead generation systems." Written in Dean's voice — direct, benefit-first, no jargon.
- **4 cards** in 2x2 grid (`grid-cols-1 lg:grid-cols-2 gap-5`):
  - **Icon:** Reuse existing icons from PainSolution (Mic, Layout, Zap, AppWindow) in accent-colored rounded container
  - **Service title:** `text-xl font-bold text-content-primary`
  - **Description:** 1 sentence from `seoPages.ts` heroDescription (shortened)
  - **3 outcome bullets:** Pulled from `seoPages.ts` outcomes array, each with accent arrow icon
  - **CTA link:** "Learn more →" with `text-accent font-semibold`, links to individual service page
  - **Card style:** `rounded-2xl border border-border-light bg-surface-light p-7 shadow-card` with `hover:shadow-card-hover hover:border-accent/20` transition
  - **Hover interaction:** `whileHover={{ y: -2 }}` subtle lift
- **Spacing:** `py-20 lg:py-28 px-6`
- **Animation:** Scale-in (`scale: 0.96 → 1, opacity: 0 → 1`), 100ms stagger between cards

### Section 4: How It Works (white bg, `border-t border-border-light`)

- **Eyebrow:** "How It Works"
- **Headline:** "From First Call to Live System in Three Steps"
- **3 columns** (`grid-cols-1 lg:grid-cols-3 gap-6`):
  1. **Discovery** (Phone icon) — "We map your workflow, identify where leads leak, and define what to build first."
  2. **Build** (Wrench icon) — "I design and build your system in 2-6 weeks with regular check-ins, not radio silence."
  3. **Launch** (Rocket icon) — "Your system goes live with real monitoring. I tune performance based on actual data."
- Each step: numbered badge (01/02/03) in accent, icon in accent square, title, 1-2 sentence description
- **Scroll-linked connector line** between steps on desktop (reuse `useScroll`/`useTransform` pattern from ProcessSteps)
- **Spacing:** `py-20 lg:py-28 px-6`
- **Animation:** Slide-up with custom easing `[0.25, 0.46, 0.45, 0.94]`, 150ms stagger

### Section 5: Industry Fit (dark bg — `bg-hero`)

- **Eyebrow:** `text-accent-light` — "Built for Your Industry"
- **Headline:** "AI Systems Designed Around How Your Business Actually Runs" — white text
- **Subhead:** 1 sentence — "Whether you run a service business, medical practice, or professional firm, the systems are built around your specific workflow."
- **3 cards** (`grid-cols-1 lg:grid-cols-3 gap-5`):
  - Each card: dark card style (`rounded-xl border border-white/[0.08] bg-white/[0.03] p-6`)
  - Industry name as title
  - 1-line description from `industryPages` data
  - "See how →" link with accent-light color, links to industry page path
  - Hover: `border-accent/30` transition
- **Spacing:** `py-20 lg:py-28 px-6`
- **Animation:** Blur-in with stagger (contrasts with previous section's slide-up)

### Section 6: Stats Strip (light bg — `bg-surface-light`)

- **Inline stats strip** (not reusing StatsBar component directly, to avoid two consecutive dark sections with Industry above)
- 4 stats in horizontal row: 15+ Projects Delivered, 500+ Hours Saved, 100% Client Satisfaction, <2 Weeks Avg Delivery
- Style: `bg-surface-light`, accent-colored numbers (`text-accent font-extrabold`), `text-content-muted` labels
- CountUp animation on scroll intersection (reuse CountUp logic from StatsBar)
- **Spacing:** `py-16 lg:py-20 px-6`

### Section 7: FAQ (white bg — `bg-white`)

- **Eyebrow:** "Common Questions"
- **Headline:** "What Business Owners Ask Before Getting Started"
- **6 questions** in accordion format:
  1. **"Do I need technical knowledge to work with you?"**
     → "No. I handle all the technical work. You describe what your business needs, review progress, and give feedback. That's it."
  2. **"How long does a typical project take?"**
     → "Most systems go live in 2-6 weeks depending on scope. We define the timeline together on the strategy call."
  3. **"What happens after my system launches?"**
     → "I monitor performance, tune the AI, and optimize based on real data. You're not left with a system and no support."
  4. **"How is this different from hiring an agency?"**
     → "You work directly with me — one person who builds, tests, and supports everything. No account managers, no handoffs, no surprise invoices."
  5. **"Can I start with one service and add more later?"**
     → "Yes. Most clients start with the highest-impact system and expand once they see results."
  6. **"What does a strategy call look like?"**
     → "A 20-30 minute conversation where we map your workflow, identify where leads or time are leaking, and define what to build first. No pitch deck, no pressure."
- **Accordion implementation:** Framer Motion `AnimatePresence` with height animation on expand/collapse. One open at a time.
- **Structured data:** FAQ JSON-LD schema in the page's SEO component for rich snippets
- **Spacing:** `py-20 lg:py-28 px-6`
- **Animation:** Fade-in on section entrance, smooth expand/collapse on interaction

### Section 8: FinalCTA

- **Reuse existing `FinalCTA` component** unchanged
- Contact form with 5 fields (name, email, phone, website, message)
- Light bg (`bg-surface-light`)

---

## SEO Strategy

### Meta Tags
- **Title:** "AI Services for Businesses — Voice Agents, Websites, Automation | DevelopedByDean"
- **Description:** "Custom AI services for small businesses: voice agents, websites, workflow automation, and lead generation systems. Work directly with a certified AI developer."
- **Canonical:** `https://developedbydean.ai/services`

### Target Keywords
- **Primary:** "AI services for businesses"
- **Secondary:** "AI automation consultant," "AI voice agent development," "AI website development," "business workflow automation," "AI lead generation systems"
- Keywords appear naturally in hero, pain strip intro, services grid intro, and FAQ answers

### Internal Linking
- **Hub → Service pages:** 4 links via service cards (Section 3)
- **Hub → Industry pages:** 3 links via industry cards (Section 5)
- **Body copy links:** 2-3 contextual links woven into the services grid intro paragraph pointing to individual service pages
- **Service pages → Hub:** Already linked via breadcrumbs and navigation
- **Cross-links between service pages:** Already exist in `seoPages.ts` links arrays

### Structured Data
- FAQ JSON-LD for Section 7 (6 questions)
- Service schema (Organization + Service type) on the page

### Estimated Content
- ~2,000-2,500 words of unique, indexable content across all sections
- Hero (~50 words) + Pain strip (~150 words) + Services grid (~350 words) + How it works (~200 words) + Industry (~150 words) + FAQ (~600 words) + CTA copy (~50 words) + body copy in between sections

---

## Components

### New Components
- **`ServicesHubPage.tsx`** — Complete rewrite of existing file. All sections live in this one page component (no need for separate section files since these sections are hub-specific, not reused elsewhere).

### Reused Components
- **`FinalCTA`** — imported from `src/sections/FinalCTA.tsx`, used as-is
- **`SEO`** — imported from `src/components/SEO.tsx`, updated meta tags
- **CountUp logic** — extracted/reused from `src/sections/StatsBar.tsx` for the inline stats strip

### Data Sources
- **`servicePages`** from `src/data/seoPages.ts` — card titles, descriptions, outcomes, paths
- **`industryPages`** from `src/data/seoPages.ts` — industry card titles, descriptions, paths

---

## Animation Summary (Variety Check)

| Section | Entrance Type | Details |
|---------|--------------|---------|
| 1. Hero | Blur-in | `filter: blur(6px) → blur(0px)` |
| 2. Pain Strip | Slide-blur | `x: -16, blur(2px) → clear`, staggered |
| 3. Services Grid | Scale-in | `scale: 0.96 → 1`, staggered |
| 4. How It Works | Slide-up | `y: 24 → 0`, custom easing, scroll-linked line |
| 5. Industry Fit | Blur-in | `filter: blur(4px) → blur(0px)`, staggered |
| 6. Stats Strip | Scale-in | CountUp + `scale: 0.9 → 1` on each stat |
| 7. FAQ | Fade-in | Section fade, accordion expand/collapse |
| 8. FinalCTA | Slide-up | Existing `y: 30 → 0` animation |

No two consecutive sections share the same animation type.

---

## What's NOT Included (Intentional)

- **Testimonials section** — Not adding here to avoid clutter. Social proof is handled by StatsBar. When real testimonials are ready, they can be added between Industry and StatsBar.
- **Pricing details** — Only the $2,500 anchor in FinalCTA. No pricing grid — strategy call is the conversion event.
- **Case studies** — Not yet available. When ready, add between Services Grid and How It Works.
- **Blog/content section** — Out of scope. Future consideration for the pillar/cluster model.
