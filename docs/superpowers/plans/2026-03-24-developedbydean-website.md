# DevelopedByDean Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium single-page portfolio/agency website for DevelopedByDean — a developer selling custom websites and AI solutions.

**Architecture:** Single-page React app with 8 sections (Nav, Hero, Services, Portfolio, About, Process, Contact, Footer). No routing — smooth scroll navigation. GSAP for scroll-driven animations, Framer Motion for UI micro-interactions. Static site with Formspree for contact form. Deployed to Vercel.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v3 (pinned), GSAP + ScrollTrigger, Framer Motion, Lucide React, Lenis (smooth scroll), Formspree, pnpm

**Spec:** `docs/superpowers/specs/2026-03-24-developedbydean-website-design.md`

---

## File Map

```
src/
├── components/
│   ├── Button.tsx              # Primary/secondary/ghost button variants
│   ├── SectionHeading.tsx      # Reusable section title + subtitle
│   ├── ServiceCard.tsx         # Bento grid card for services
│   ├── ProjectCard.tsx         # Portfolio project card
│   ├── ProjectModal.tsx        # Full-screen project detail modal
│   ├── ProcessStep.tsx         # Single process timeline step
│   ├── MobileMenu.tsx          # Slide-in mobile nav
│   └── GrainOverlay.tsx        # SVG noise texture overlay
├── sections/
│   ├── Navbar.tsx              # Fixed navigation bar
│   ├── Hero.tsx                # Hero with animated gradient bg
│   ├── Services.tsx            # "What I Build" bento grid
│   ├── Portfolio.tsx           # "Selected Work" project grid
│   ├── About.tsx               # Bio + photo + certs
│   ├── Process.tsx             # "How We Get There" timeline
│   ├── Contact.tsx             # Contact form + Formspree
│   └── Footer.tsx              # Minimal footer
├── hooks/
│   ├── useScrollSpy.ts         # Track active section for nav highlights
│   └── useGsapReveal.ts       # Reusable GSAP scroll reveal hook
├── data/
│   ├── nav.ts                  # Shared nav links array
│   ├── services.ts             # Service card content + icons
│   ├── projects.ts             # Portfolio placeholder data
│   └── process.ts              # Process step content
├── types/
│   └── index.ts                # Shared TypeScript types
├── App.tsx                     # Root component, section composition
├── main.tsx                    # Entry point + Lenis setup
└── index.css                   # Tailwind directives + custom properties + grain + gradient keyframes
public/
└── images/
    └── placeholder-project.jpg # (generated placeholder)
tailwind.config.ts              # Extended theme: colors, fonts, spacing
index.html                      # Meta tags, OG tags, font links
vite.config.ts                  # Vite config
```

---

## Visual Identity (Frontend Design Skill)

**Aesthetic:** "Midnight Luxe" — premium tech brand after dark. Blue-tinted blacks for depth, violet-to-cyan gradient as the signature accent, grain texture for analog warmth.

**Fonts:**
- Display: Syne (Google Fonts) — geometric, experimental, bold character
- Body: DM Sans (Google Fonts) — clean, warm, readable

**Colors (CSS custom properties):**
```
--bg-primary: #050508
--bg-secondary: #0c0c14
--bg-card: #12121e
--bg-card-hover: #1a1a2e
--border: #1e1e30
--border-hover: #2e2e48
--text-primary: #ededf0
--text-secondary: #6b6b80
--accent-violet: #7c3aed
--accent-cyan: #06b6d4
--accent-rose: #f43f5e (CTA hover states)
```

**Signature gradient:** `linear-gradient(135deg, #7c3aed, #6366f1, #06b6d4)`

**Effects:**
- SVG noise/grain overlay at 3-5% opacity across entire page
- Animated gradient mesh in hero (CSS keyframes, not canvas)
- Glassmorphism cards: `backdrop-blur + bg-opacity + subtle border`
- Inner glow on card hover via `box-shadow: inset`
- `prefers-reduced-motion` disables all animations

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tailwind.config.ts`, `index.html`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`

- [ ] **Step 1: Scaffold Vite + React + TypeScript project**

```bash
cd /Users/preem/Desktop/DevelopedByDean
pnpm create vite . --template react-ts
```

If the directory is not empty, move existing files aside or use `--force`. The existing `docs/` and `COMPETITIVE-RESEARCH.md` should be preserved.

- [ ] **Step 2: Install Tailwind CSS v3 (pinned to avoid v4 breaking changes)**

```bash
pnpm add -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p --ts
```

- [ ] **Step 3: Install core dependencies**

```bash
pnpm add framer-motion gsap lucide-react lenis
```

- [ ] **Step 4: Install dev dependencies**

```bash
pnpm add -D @types/node
```

- [ ] **Step 5: Verify dev server starts**

```bash
pnpm dev
```

Expected: Vite dev server running on localhost:5173 (or next available port). Default Vite + React page renders.

- [ ] **Step 6: Create directory structure**

```bash
mkdir -p src/{components,sections,hooks,data,types,assets}
mkdir -p public/images
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite + react + typescript project with dependencies"
```

---

## Task 2: Theme System, Global Styles & Fonts

**Files:**
- Modify: `index.html` (add Google Fonts links + meta tags)
- Modify: `tailwind.config.ts` (extend theme)
- Modify: `src/index.css` (custom properties, base styles, gradient keyframes, grain)
- Create: `src/components/GrainOverlay.tsx`

- [ ] **Step 1: Add Google Fonts and meta tags to index.html**

In `index.html`, add inside `<head>`:

```html
<title>DevelopedByDean | Custom Websites & AI Solutions</title>
<meta name="description" content="Premium custom websites and intelligent AI solutions that grow your business on autopilot. AI agents, voice agents, and workflow automation." />
<meta property="og:title" content="DevelopedByDean | Custom Websites & AI Solutions" />
<meta property="og:description" content="Premium custom websites and intelligent AI solutions that grow your business on autopilot." />
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-image.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Configure Tailwind theme**

`tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#050508",
          secondary: "#0c0c14",
          card: "#12121e",
          "card-hover": "#1a1a2e",
        },
        border: {
          DEFAULT: "#1e1e30",
          hover: "#2e2e48",
        },
        text: {
          primary: "#ededf0",
          secondary: "#6b6b80",
        },
        accent: {
          violet: "#7c3aed",
          cyan: "#06b6d4",
          rose: "#f43f5e",
        },
      },
      backgroundImage: {
        "gradient-accent":
          "linear-gradient(135deg, #7c3aed, #6366f1, #06b6d4)",
        "gradient-accent-hover":
          "linear-gradient(135deg, #8b5cf6, #7c3aed, #0891b2)",
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 3: Write global styles in index.css**

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: auto; /* Lenis handles smooth scroll */
    font-family: "DM Sans", sans-serif;
    background-color: #050508;
    color: #ededf0;
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: rgba(124, 58, 237, 0.3);
    color: #ededf0;
  }
}

@layer components {
  .gradient-text {
    background: linear-gradient(135deg, #7c3aed, #6366f1, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass {
    background: rgba(12, 12, 20, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(30, 30, 48, 0.5);
  }

  .glow-border {
    position: relative;
  }

  .glow-border::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 1px;
  }

  .glow-border:hover::after {
    opacity: 1;
  }
}

/* Hero gradient mesh animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-gradient {
  background: linear-gradient(
    -45deg,
    #050508,
    #1a0533,
    #0c1a3a,
    #051a2a,
    #050508
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

/* Global focus-visible styles for accessibility */
:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .hero-gradient {
    animation: none;
    background: #050508;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Create GrainOverlay component**

`src/components/GrainOverlay.tsx`:

```tsx
export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 5: Update App.tsx with GrainOverlay and basic structure**

`src/App.tsx`:

```tsx
import { GrainOverlay } from "./components/GrainOverlay";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <main className="relative">
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="font-display text-5xl font-bold gradient-text">
            DevelopedByDean
          </h1>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 6: Update main.tsx with Lenis smooth scrolling**

`src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import App from "./App";
import "./index.css";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 7: Verify — run dev server, confirm fonts load and gradient text renders**

```bash
pnpm dev
```

Expected: "DevelopedByDean" displays centered in Syne font with violet-to-cyan gradient text on deep dark background. Subtle grain texture visible on close inspection. Smooth scrolling active.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add theme system, fonts, global styles, grain overlay, and smooth scrolling"
```

---

## Task 3: Shared Types & Data Files

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/services.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/process.ts`

- [ ] **Step 1: Define shared types**

`src/types/index.ts`:

```typescript
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  track: "websites" | "ai";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  challenge: string;
  solution: string;
  results: string;
  techUsed: string[];
  screenshots: string[];
  isPlaceholder: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}
```

- [ ] **Step 2: Create services data**

`src/data/services.ts`:

```typescript
import {
  Globe,
  LayoutDashboard,
  Bot,
  Phone,
  Workflow,
} from "lucide-react";
import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "custom-websites",
    title: "Custom Websites",
    description:
      "Designed from scratch to convert visitors into customers. Fast, responsive, and built to grow with you.",
    icon: Globe,
    track: "websites",
  },
  {
    id: "web-applications",
    title: "Web Applications",
    description:
      "Interactive tools, dashboards, and platforms tailored to how your business operates.",
    icon: LayoutDashboard,
    track: "websites",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description:
      "Custom assistants that handle customer questions, qualify leads, and support your team 24/7.",
    icon: Bot,
    track: "ai",
  },
  {
    id: "voice-agents",
    title: "Voice Agents",
    description:
      "AI-powered phone systems that book appointments, answer FAQs, and never put anyone on hold.",
    icon: Phone,
    track: "ai",
  },
  {
    id: "ai-workflows",
    title: "AI Workflows & Automation",
    description:
      "Eliminate repetitive tasks. Connect your tools and let AI handle the busywork.",
    icon: Workflow,
    track: "ai",
  },
];
```

- [ ] **Step 3: Create projects placeholder data**

`src/data/projects.ts`:

```typescript
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Alpha",
    description: "E-commerce platform for a luxury retail brand",
    tags: ["Website", "AI Agent"],
    image: "/images/placeholder-project.jpg",
    challenge: "The client needed a modern e-commerce experience with AI-powered product recommendations.",
    solution: "Built a custom storefront with integrated AI assistant for personalized shopping.",
    results: "Case study coming soon.",
    techUsed: ["React", "TypeScript", "Tailwind", "AI Integration"],
    screenshots: [],
    isPlaceholder: true,
  },
  {
    id: "project-2",
    title: "Project Beta",
    description: "AI-powered customer support system for a SaaS company",
    tags: ["AI Agent", "Automation"],
    image: "/images/placeholder-project.jpg",
    challenge: "Support team overwhelmed with repetitive tickets, response times growing.",
    solution: "Deployed an AI agent that handles tier-1 support and escalates complex issues to humans.",
    results: "Case study coming soon.",
    techUsed: ["Voice AI", "Workflow Automation", "API Integration"],
    screenshots: [],
    isPlaceholder: true,
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "Business automation suite for a growing agency",
    tags: ["Website", "Automation"],
    image: "/images/placeholder-project.jpg",
    challenge: "Manual processes consuming 30+ hours per week across the team.",
    solution: "Built a custom dashboard with automated workflows connecting their existing tools.",
    results: "Case study coming soon.",
    techUsed: ["React", "AI Workflows", "API Integration"],
    screenshots: [],
    isPlaceholder: true,
  },
];
```

- [ ] **Step 4: Create shared nav links data**

`src/data/nav.ts`:

```typescript
import type { NavLink } from "../types";

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
```

- [ ] **Step 5: Create process steps data**

`src/data/process.ts`:

```typescript
import type { ProcessStep } from "../types";

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We talk about your business, your goals, and what's not working. No jargon, no pressure.",
  },
  {
    id: 2,
    title: "Strategy & Design",
    description:
      "I map out the solution — what to build, how it works, and what results to expect.",
  },
  {
    id: 3,
    title: "Build & Test",
    description:
      "I design and develop everything, testing thoroughly before you see it. No half-baked demos.",
  },
  {
    id: 4,
    title: "Launch & Support",
    description:
      "We go live. I stick around to make sure everything runs smoothly and performs.",
  },
];
```

- [ ] **Step 6: Commit**

```bash
git add src/types/ src/data/
git commit -m "feat: add shared types and data files for services, projects, process, and nav"
```

---

## Task 4: Reusable Components (Button, SectionHeading)

**Files:**
- Create: `src/components/Button.tsx`
- Create: `src/components/SectionHeading.tsx`

- [ ] **Step 1: Build Button component**

`src/components/Button.tsx`:

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-gradient-accent text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-[1.02]",
  secondary:
    "border border-border hover:border-accent-violet text-text-primary hover:text-white",
  ghost:
    "text-text-secondary hover:text-text-primary",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  className = "",
  onClick,
  type,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: Build SectionHeading component**

`src/components/SectionHeading.tsx`:

```tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="font-display text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-text-secondary md:text-xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify — temporarily render buttons in App.tsx**

Add to App.tsx temporarily to verify all 3 button variants render correctly with proper styling.

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.tsx src/components/SectionHeading.tsx
git commit -m "feat: add reusable Button and SectionHeading components"
```

---

## Task 5: Navbar + Mobile Menu

**Files:**
- Create: `src/sections/Navbar.tsx`
- Create: `src/components/MobileMenu.tsx`
- Create: `src/hooks/useScrollSpy.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build useScrollSpy hook**

`src/hooks/useScrollSpy.ts`:

```typescript
import { useEffect, useState } from "react";

const SECTIONS = ["services", "portfolio", "about", "contact"];

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
```

- [ ] **Step 2: Build MobileMenu component**

`src/components/MobileMenu.tsx`:

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./Button";
import { navLinks } from "../data/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-bg-secondary/95 backdrop-blur-xl border-l border-border p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="mb-12 self-end p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`font-display text-2xl font-semibold transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "gradient-text"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-auto">
              <Button href="#contact" size="lg" className="w-full" onClick={onClose}>
                Get In Touch
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Build Navbar section**

`src/sections/Navbar.tsx`:

```tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "../components/Button";
import { MobileMenu } from "../components/MobileMenu";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { navLinks } from "../data/nav";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-display text-xl font-bold text-text-primary">
            DevelopedBy<span className="gradient-text">Dean</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button href="#contact" size="sm" className="hidden lg:inline-flex">
              Get In Touch
            </Button>
            <button
              className="p-2 text-text-secondary hover:text-text-primary transition-colors lg:hidden"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
```

- [ ] **Step 4: Add Navbar to App.tsx**

Update `src/App.tsx` to import and render `<Navbar />` above `<main>`.

- [ ] **Step 5: Verify — nav renders, glassmorphism activates on scroll, mobile menu opens/closes**

```bash
pnpm dev
```

Expected: Fixed nav with "DevelopedByDean" wordmark, nav links hidden on mobile, hamburger button visible. Scrolling triggers glass effect. Mobile menu slides in from right with backdrop blur.

- [ ] **Step 6: Commit**

```bash
git add src/sections/Navbar.tsx src/components/MobileMenu.tsx src/hooks/useScrollSpy.ts src/App.tsx
git commit -m "feat: add navbar with glassmorphism, scroll spy, and mobile menu"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/sections/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build Hero section**

`src/sections/Hero.tsx`:

```tsx
import { motion } from "framer-motion";
import { ArrowDown, Award } from "lucide-react";
import { Button } from "../components/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-gradient relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Radial glow behind content */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          className="mb-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-violet"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Websites & AI Solutions
        </motion.p>

        <motion.h1
          className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your Business Deserves More Than a Website.{" "}
          <span className="gradient-text">
            It Deserves One That Works For You.
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 text-lg text-text-secondary md:text-xl lg:text-2xl max-w-2xl mx-auto font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          I build premium websites and intelligent AI solutions that grow your
          business on autopilot.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button href="#contact" size="lg">
            Let's Talk
          </Button>
        </motion.div>

        {/* Trust strip — certification badges. Only render if 3+ items */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {[
            "AI Certification 1",
            "AI Certification 2",
            "AI Certification 3",
          ].length >= 3 && (
            <>
              {["AI Certification 1", "AI Certification 2", "AI Certification 3"].map(
                (cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 rounded-full border border-border/50 bg-bg-card/50 px-4 py-2 text-xs text-text-secondary"
                  >
                    <Award size={14} className="text-accent-violet" />
                    {cert}
                  </div>
                )
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { delay: 1.5, duration: 2, repeat: Infinity },
        }}
      >
        <ArrowDown size={20} className="text-text-secondary" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to App.tsx**

```tsx
import { GrainOverlay } from "./components/GrainOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify — hero renders full-viewport with animated gradient, staggered text entrance, scroll indicator bouncing**

```bash
pnpm dev
```

Expected: Full-screen hero with shifting gradient background, "DevelopedByDean" wordmark gradient text, staggered fade-in animations, bouncing arrow at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx src/App.tsx
git commit -m "feat: add hero section with animated gradient background and entrance animations"
```

---

## Task 7: Services Section (Bento Grid)

**Files:**
- Create: `src/components/ServiceCard.tsx`
- Create: `src/sections/Services.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build ServiceCard component**

`src/components/ServiceCard.tsx`:

```tsx
import { motion } from "framer-motion";
import type { Service } from "../types";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-8 transition-all duration-500 hover:border-border-hover hover:bg-bg-card-hover hover:shadow-[0_0_40px_rgba(124,58,237,0.08)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-xl bg-accent-violet/10 p-3">
          <Icon size={24} className="text-accent-violet" />
        </div>

        <h3 className="mb-3 font-display text-xl font-bold text-text-primary">
          {service.title}
        </h3>

        <p className="text-text-secondary font-body leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Build Services section with bento grid**

`src/sections/Services.tsx`:

```tsx
import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/ServiceCard";
import { Button } from "../components/Button";
import { services } from "../data/services";

export function Services() {
  const websiteServices = services.filter((s) => s.track === "websites");
  const aiServices = services.filter((s) => s.track === "ai");

  return (
    <section id="services" className="relative py-32 px-6 bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="What I Build" />

        {/* Bento grid — asymmetric layout */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Website services — span 2 cols on large */}
          {websiteServices.map((service, i) => (
            <div key={service.id} className={i === 0 ? "lg:col-span-2" : ""}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}

          {/* AI services — 3 cards in remaining space */}
          {aiServices.map((service, i) => (
            <div key={service.id}>
              <ServiceCard service={service} index={i + websiteServices.length} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-text-secondary">
            Not sure what you need? Let's figure it out together.
          </p>
          <Button href="#contact" variant="secondary">
            Let's Chat
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add Services to App.tsx**

Add `<Services />` after `<Hero />` in App.tsx.

- [ ] **Step 4: Verify — bento grid renders with 5 cards, hover effects work, icons display**

```bash
pnpm dev
```

Expected: Asymmetric grid — first card spans 2 columns on desktop. Cards have violet icon badges, hover glow effect, smooth fade-in on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServiceCard.tsx src/sections/Services.tsx src/App.tsx
git commit -m "feat: add services section with bento grid layout and hover effects"
```

---

## Task 8: Portfolio Section + Project Modal

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectModal.tsx`
- Create: `src/sections/Portfolio.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build ProjectCard component**

`src/components/ProjectCard.tsx`:

```tsx
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View project: ${project.title}`}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
        {project.isPlaceholder ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-2 font-display text-lg font-semibold text-text-secondary">
                {project.title}
              </div>
              <div className="text-sm text-text-secondary/60">
                Case Study Coming Soon
              </div>
            </div>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-accent-violet/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-bg-primary/80 px-4 py-2 font-display text-sm font-semibold text-text-primary backdrop-blur-sm">
            View Project <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-text-secondary">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Build ProjectModal component**

`src/components/ProjectModal.tsx`:

```tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-bg-secondary p-6 sm:p-10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-text-secondary hover:bg-bg-card hover:text-text-primary transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-violet/10 px-3 py-1 text-xs font-semibold text-accent-violet"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mb-2 font-display text-3xl font-bold text-text-primary sm:text-4xl">
              {project.title}
            </h2>

            <p className="mb-8 text-lg text-text-secondary">
              {project.description}
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">
                  The Challenge
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">
                  The Solution
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">
                  Results
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.results}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">
                  Tech Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Screenshot gallery — only render if screenshots exist */}
              {project.screenshots.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">
                    Gallery
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.screenshots.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="rounded-lg border border-border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Build Portfolio section**

`src/sections/Portfolio.tsx`:

```tsx
import { useState, useCallback } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Button } from "../components/Button";
import { projects } from "../data/projects";
import type { Project } from "../types";

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="portfolio" className="relative py-32 px-6 bg-bg-secondary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Selected Work" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.id} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <ProjectCard
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-text-secondary">
            More projects in the pipeline. Let's make yours next.
          </p>
          <Button href="#contact" variant="secondary">
            Start a Project
          </Button>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
}
```

- [ ] **Step 4: Add Portfolio to App.tsx**

Add `<Portfolio />` after `<Services />`.

- [ ] **Step 5: Verify — project cards render, placeholder treatment visible, click opens modal, Escape/backdrop closes it**

```bash
pnpm dev
```

Expected: 2-column grid with 3 project cards showing "Case Study Coming Soon" treatment. Clicking a card opens a full-screen modal with project details. Modal closes on X, Escape, or backdrop click.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectModal.tsx src/sections/Portfolio.tsx src/App.tsx
git commit -m "feat: add portfolio section with project cards and detail modal"
```

---

## Task 9: About Section

**Files:**
- Create: `src/sections/About.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build About section**

`src/sections/About.tsx`:

```tsx
import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { Award } from "lucide-react";

const certifications = [
  { name: "AI Certification", icon: Award },
  { name: "AI Certification", icon: Award },
  { name: "AI Certification", icon: Award },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 bg-bg-primary">
      {/* Slightly lighter overlay for visual separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading title="The Person Behind the Code" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary font-body">
              <p>
                I'm Dean — a developer who believes your digital presence should
                do more than just exist. It should work as hard as you do.
              </p>
              <p>
                I bridge the gap between beautiful design and intelligent
                technology. Whether you need a website that converts or an AI
                agent that handles your busywork, I build solutions that make a
                real difference to your bottom line.
              </p>
              <p>
                No jargon. No over-promising. Just clean, effective digital
                products that help your business grow.
              </p>
            </div>

            {/* Certifications */}
            <div className="mt-10">
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    className="group relative flex items-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-3 transition-colors hover:border-border-hover"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    title={cert.name}
                  >
                    <cert.icon size={18} className="text-accent-violet" />
                    <span className="text-sm text-text-secondary">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Photo side */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-accent opacity-20 blur-sm" aria-hidden="true" />
              <div className="relative aspect-[3/4] w-72 sm:w-80 overflow-hidden rounded-2xl border border-border bg-bg-card">
                {/* Placeholder for headshot */}
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-4xl text-text-secondary/30">D</div>
                    <div className="text-sm text-text-secondary/50">
                      Photo coming soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add About to App.tsx**

Add `<About />` after `<Portfolio />`.

- [ ] **Step 3: Verify — split layout renders, certifications badges display, photo placeholder looks intentional**

```bash
pnpm dev
```

Expected: Text on left, photo placeholder on right (desktop). Certifications show as icon + text badges. Gradient glow behind photo placeholder.

- [ ] **Step 4: Commit**

```bash
git add src/sections/About.tsx src/App.tsx
git commit -m "feat: add about section with bio, certifications, and photo placeholder"
```

---

## Task 10: Process Section (Timeline)

**Files:**
- Create: `src/components/ProcessStep.tsx`
- Create: `src/sections/Process.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build ProcessStep component**

`src/components/ProcessStep.tsx`:

```tsx
import { motion } from "framer-motion";
import type { ProcessStep as ProcessStepType } from "../types";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  return (
    <motion.div
      className="relative flex gap-6 pb-12 last:pb-0 lg:flex-col lg:text-center lg:gap-4 lg:pb-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Connector line — vertical on mobile, horizontal on desktop */}
      {!isLast && (
        <>
          {/* Mobile: vertical line */}
          <div
            className="absolute left-5 top-12 h-full w-px bg-gradient-to-b from-accent-violet/50 to-transparent lg:hidden"
            aria-hidden="true"
          />
          {/* Desktop: horizontal line */}
          <div
            className="absolute left-[calc(50%+24px)] top-5 hidden h-px w-full bg-gradient-to-r from-accent-violet/50 to-transparent lg:block"
            aria-hidden="true"
          />
        </>
      )}

      {/* Step number */}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-violet/30 bg-bg-card font-display text-sm font-bold text-accent-violet lg:mx-auto">
        {step.id}
      </div>

      {/* Content */}
      <div>
        <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
          {step.title}
        </h3>
        <p className="text-text-secondary font-body leading-relaxed max-w-xs lg:mx-auto">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Build Process section**

`src/sections/Process.tsx`:

```tsx
import { SectionHeading } from "../components/SectionHeading";
import { ProcessStep } from "../components/ProcessStep";
import { processSteps } from "../data/process";

export function Process() {
  return (
    <section id="process" className="relative py-32 px-6 bg-bg-secondary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="How We Get There" />

        {/* Mobile: vertical timeline. Desktop: horizontal 4-column */}
        <div className="grid gap-0 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={i}
              isLast={i === processSteps.length - 1}
            />
          ))}
        </div>

        <p className="mt-16 text-center text-lg text-text-secondary">
          From first call to live product, most projects launch in 2-4 weeks.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add Process to App.tsx**

Add `<Process />` after `<About />`.

- [ ] **Step 4: Verify — 4 steps render horizontally on desktop, vertically on mobile, connector lines visible**

```bash
pnpm dev
```

Expected: Numbered steps connected by gradient lines. Horizontal layout on desktop, vertical timeline on mobile. Steps fade in sequentially on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProcessStep.tsx src/sections/Process.tsx src/App.tsx
git commit -m "feat: add process section with responsive timeline layout"
```

---

## Task 11: Contact Section (Form + Formspree)

**Files:**
- Create: `src/sections/Contact.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build Contact section with form**

`src/sections/Contact.tsx`:

```tsx
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-bg-primary">
      {/* Gradient shift at top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="Let's Build Something"
          subtitle="Tell me about your project and I'll get back to you within 24 hours."
        />

        {status === "success" ? (
          <motion.div
            className="rounded-2xl border border-accent-cyan/30 bg-accent-cyan/5 p-10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={48} className="mx-auto mb-4 text-accent-cyan" />
            <h3 className="mb-2 font-display text-2xl font-bold text-text-primary">
              Message Sent
            </h3>
            <p className="text-text-secondary">
              Thanks for reaching out. I'll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary/40 transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary/40 transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-text-secondary">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet appearance-none"
                defaultValue=""
              >
                <option value="" disabled>Select a project type</option>
                <option value="Website">Website</option>
                <option value="AI Agent">AI Agent</option>
                <option value="Voice Agent">Voice Agent</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-secondary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary/40 transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet resize-none"
                placeholder="Tell me a bit about what you need"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-accent-rose text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent px-8 py-4 font-display text-lg font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {status === "submitting" ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  Send It <Send size={18} />
                </>
              )}
            </motion.button>
          </form>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-text-secondary">Or email me directly at{" "}
            <a
              href="mailto:hello@developedbydean.com"
              className="text-accent-violet hover:text-accent-cyan transition-colors"
            >
              hello@developedbydean.com
            </a>
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {[
              { label: "GitHub", icon: Github, href: "https://github.com" },
              { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
              { label: "X / Twitter", icon: Twitter, href: "https://x.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Note:** Replace `YOUR_FORM_ID` with the actual Formspree form ID and `hello@developedbydean.com` with the real email. These are placeholders.

- [ ] **Step 2: Add Contact to App.tsx**

Add `<Contact />` after `<Process />`.

- [ ] **Step 3: Verify — form renders, validation works (required fields), dropdown options display, submit shows loading state**

```bash
pnpm dev
```

Expected: Centered form with 4 fields, accent-colored focus states, "Send It" button with gradient. Submitting without required fields shows browser validation. Submit button shows spinner during submission. Error state shows red alert.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Contact.tsx src/App.tsx
git commit -m "feat: add contact section with form, validation, and Formspree integration"
```

---

## Task 12: Footer

**Files:**
- Create: `src/sections/Footer.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build Footer section**

`src/sections/Footer.tsx`:

```tsx
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "X / Twitter", icon: Twitter, href: "https://x.com" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-bg-primary px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} DevelopedByDean
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
          Back to top
        </button>
      </div>
    </footer>
  );
}
```

**Note:** Replace social link `href` values with real profile URLs.

- [ ] **Step 2: Add Footer to App.tsx (outside `<main>`, inside fragment)**

- [ ] **Step 3: Verify — footer renders with copyright, social icons, back-to-top scrolls to hero**

```bash
pnpm dev
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/Footer.tsx src/App.tsx
git commit -m "feat: add footer with social links and back-to-top button"
```

---

## Task 13: GSAP Scroll Reveal Animations

**Files:**
- Create: `src/hooks/useGsapReveal.ts`
- Modify: `src/main.tsx` (register GSAP plugin)
- Modify: `src/App.tsx` (add reveal classes to section wrappers)

- [ ] **Step 1: Register GSAP ScrollTrigger in main.tsx**

Add to `src/main.tsx` before the render call:

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Connect Lenis to GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

Then remove the manual RAF loop from `main.tsx` — delete these exact lines:

```typescript
// DELETE THESE LINES:
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

GSAP ticker now drives Lenis instead.

- [ ] **Step 2: Build useGsapReveal hook**

`src/hooks/useGsapReveal.ts`:

```typescript
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const children = el.querySelectorAll("[data-reveal]");

    gsap.fromTo(
      children.length > 0 ? children : el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
```

- [ ] **Step 3: Wire useGsapReveal into section components**

Add the hook to sections that don't already have Framer Motion entrance animations. The SectionHeading is a good candidate — it appears in every section:

In `src/components/SectionHeading.tsx`, import and apply the hook:

```tsx
import { useGsapReveal } from "../hooks/useGsapReveal";

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  const ref = useGsapReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 data-reveal className="font-display text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className={`mt-4 max-w-2xl text-lg text-text-secondary md:text-xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

Note: Sections like Hero, Services, and Portfolio already have their own Framer Motion `whileInView` animations on individual elements, so the hook is only needed on components that don't have scroll-triggered animations yet.

- [ ] **Step 4: Verify — smooth scroll works via GSAP ticker, SectionHeadings reveal on scroll, no double-animation conflicts**

```bash
pnpm dev
```

Expected: Smooth scrolling driven by Lenis + GSAP. Section headings fade in and slide up when scrolled into view. Animations respect `prefers-reduced-motion`. No jank from conflicting GSAP + Framer Motion animations.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useGsapReveal.ts src/main.tsx src/components/SectionHeading.tsx
git commit -m "feat: add GSAP ScrollTrigger integration with Lenis and scroll reveal hook"
```

---

## Task 14: Final Assembly & Polish

**Files:**
- Modify: `src/App.tsx` (final assembly with all sections)
- Modify: Various sections for polish

- [ ] **Step 1: Assemble final App.tsx with all sections**

`src/App.tsx`:

```tsx
import { GrainOverlay } from "./components/GrainOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Portfolio } from "./sections/Portfolio";
import { About } from "./sections/About";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Full walkthrough — scroll through every section, verify transitions, test mobile menu, click project cards, submit form**

```bash
pnpm dev
```

Verify every item from the spec's success criteria:
- All 8 sections built and functional
- Scroll animations smooth on desktop and mobile
- Contact form shows proper states (idle, submitting, success, error)
- Responsive across mobile, tablet, desktop
- Mobile menu opens/closes properly
- Project modal opens/closes (X, Escape, backdrop)
- Nav glassmorphism activates on scroll
- Active nav link highlights correctly

- [ ] **Step 3: Run build to check for TypeScript errors**

```bash
pnpm build
```

Expected: Clean build with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: assemble all sections and final polish"
```

---

## Task 15: Deploy to Vercel

**Files:**
- No new files

- [ ] **Step 1: Verify build succeeds**

```bash
pnpm build && pnpm preview
```

Preview the production build locally. Verify everything works.

- [ ] **Step 2: Deploy**

Deploy to Vercel via CLI or connect to GitHub. User to confirm deployment method.

```bash
npx vercel
```

- [ ] **Step 3: Verify live site loads and all sections function correctly**

- [ ] **Step 4: Commit any deployment config changes**

```bash
git add -A
git commit -m "chore: configure vercel deployment"
```

---

## Placeholder Content to Replace

After the site is live, the following items need real content:

| Item | Current State | File to Edit |
|------|--------------|-------------|
| Formspree ID | `YOUR_FORM_ID` | `src/sections/Contact.tsx` |
| Email address | `hello@developedbydean.com` | `src/sections/Contact.tsx` |
| Social links | Generic URLs | `src/sections/Footer.tsx` |
| Headshot photo | "D" placeholder | `src/sections/About.tsx` |
| Certifications | Generic "AI Certification" x3 | `src/sections/About.tsx` |
| Portfolio projects | 3 placeholder projects | `src/data/projects.ts` |
| Bio text | Draft copy | `src/sections/About.tsx` |
| OG image | Missing | `public/og-image.jpg` + `index.html` |
