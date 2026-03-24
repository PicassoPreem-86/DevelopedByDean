import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "gsap/ScrollTrigger";

const capabilities = [
  {
    num: "01",
    title: "Custom Websites",
    description:
      "Fast, tailored, conversion-focused sites designed to reflect your brand and move your business forward.",
  },
  {
    num: "02",
    title: "AI Agents",
    description:
      "Purpose-built AI systems that answer, route, assist, and execute — 24 hours a day, without the overhead.",
  },
  {
    num: "03",
    title: "Voice Agents",
    description:
      "Natural voice experiences that handle calls, qualify leads, and create better customer touchpoints.",
  },
  {
    num: "04",
    title: "Workflow Automation",
    description:
      "Connected systems that eliminate repetitive work and keep your business moving without manual intervention.",
  },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Slight delay to let Lenis and layout settle
    const ctx = gsap.context(() => {
      const getTotal = () => track.scrollWidth - window.innerWidth;

      const anim = gsap.to(track, {
        x: () => -getTotal(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTotal()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden bg-bg-primary"
      style={{ height: "400vh" }}
    >
      {/* Section label — fixed inside the sticky viewport */}
      <div className="pointer-events-none absolute left-6 top-8 z-20 flex items-center gap-4">
        <div className="h-px w-8 bg-accent" />
        <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Capabilities
        </span>
      </div>

      {/* Scroll progress indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2">
        {capabilities.map((_, i) => (
          <div
            key={i}
            className="h-px w-6 bg-white/20"
            aria-hidden="true"
          />
        ))}
      </div>

      <div
        ref={trackRef}
        className="flex h-screen items-center"
        style={{ width: `${capabilities.length * 100}vw` }}
      >
        {capabilities.map((cap, i) => (
          <div
            key={cap.num}
            className="relative flex h-full w-screen shrink-0 items-center px-6 sm:px-12 lg:px-24"
          >
            {/* Vertical divider — not on first panel */}
            {i > 0 && (
              <div className="absolute bottom-[15%] left-0 top-[15%] w-px bg-divider" />
            )}

            {/* Large background number */}
            <div
              className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 select-none font-display font-bold leading-none text-white"
              style={{
                fontSize: "clamp(8rem, 20vw, 16rem)",
                opacity: 0.03,
              }}
              aria-hidden="true"
            >
              {cap.num}
            </div>

            {/* Panel content */}
            <div className="relative z-10 max-w-xl">
              {/* Eyebrow row */}
              <div className="mb-6 flex items-center gap-3">
                <span className="font-display text-sm text-accent">
                  {cap.num}
                </span>
                <div className="h-px w-12 bg-accent/40" />
              </div>

              {/* Title */}
              <h3
                className="mb-6 font-display font-light uppercase tracking-[-0.01em] text-text-primary"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {cap.title}
              </h3>

              {/* Description */}
              <p className="max-w-md font-body text-lg leading-relaxed text-text-secondary">
                {cap.description}
              </p>

              {/* Gold diamond separator */}
              <div className="mt-10 flex items-center gap-3">
                <div
                  className="h-2 w-2 rotate-45 bg-accent/60"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
