import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const gridLines = gridLinesRef.current;
    if (!section || !headline || !gridLines) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(headline, { y: -100, opacity: 0.3, scale: 0.95, ease: "none" }, 0);
    tl.to(gridLines, { opacity: 0.15, ease: "none" }, 0);

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Architectural grid lines in hero */}
      <div ref={gridLinesRef} className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true">
        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-white/10"
            style={{ top: `${(i + 1) * 12.5}%` }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8 + i * 0.05, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
        {/* Vertical lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: `${(i + 1) * 16.66}%` }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 1.0 + i * 0.05, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </div>

      <div ref={headlineRef} className="relative z-20 mx-auto max-w-container px-6 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-12 bg-accent" />
            <span className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Custom Websites & AI Systems
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.02em] text-text-primary"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              I design and build
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.02em] text-text-primary"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              custom websites <span className="text-accent">&</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.02em] text-text-primary"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              AI systems for
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.02em] text-accent"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              businesses that scale.
            </motion.h1>
          </div>

          {/* Subtext + CTAs */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-start gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticButton href="#contact" variant="primary">
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5"/></svg>
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View Selected Work
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom info bar */}
        <motion.div
          className="absolute bottom-8 left-6 right-6 flex items-end justify-between text-xs text-text-secondary font-display tracking-[0.1em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <span>Based in the US</span>
          <span>Available for Projects</span>
          <span className="hidden sm:block">Scroll to Explore</span>
        </motion.div>
      </div>
    </section>
  );
}
