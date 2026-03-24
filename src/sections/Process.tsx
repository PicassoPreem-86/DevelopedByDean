import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stages = [
  {
    num: "01",
    title: "Strategy",
    description:
      "We define the problem, the audience, and the path. No assumptions — just sharp alignment on what success looks like.",
  },
  {
    num: "02",
    title: "Structure",
    description:
      "Architecture, systems design, and interaction planning. Every decision mapped before a single line of code.",
  },
  {
    num: "03",
    title: "Build",
    description:
      "Precision engineering with modern tools. Clean code, intentional design, rigorous testing at every stage.",
  },
  {
    num: "04",
    title: "Launch & Iterate",
    description:
      "Deployment, monitoring, and refinement. The work doesn't end at launch — it evolves with your business.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const triggers: ScrollTrigger[] = [];

    stages.forEach((_, i) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: () =>
          `top+=${i * (section.offsetHeight / stages.length)} top`,
        end: () =>
          `top+=${(i + 1) * (section.offsetHeight / stages.length)} top`,
        onEnter: () => setActiveStage(i),
        onEnterBack: () => setActiveStage(i),
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-bg-primary"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-container px-6">
          {/* Section label */}
          <div className="mb-16 flex items-center gap-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Process
            </span>
          </div>

          <div className="grid gap-20 lg:grid-cols-2">
            {/* Left — stage list */}
            <div>
              <div className="flex flex-col gap-6">
                {stages.map((stage, i) => (
                  <button
                    key={stage.num}
                    onClick={() => setActiveStage(i)}
                    className={`flex items-center gap-6 text-left transition-all duration-500 ${
                      i === activeStage
                        ? "opacity-100"
                        : "opacity-20 hover:opacity-40"
                    }`}
                  >
                    <span
                      className={`font-display text-sm transition-colors duration-500 ${
                        i === activeStage ? "text-accent" : "text-text-secondary"
                      }`}
                    >
                      {stage.num}
                    </span>
                    <span
                      className={`font-display font-light tracking-[-0.01em] transition-colors duration-500 ${
                        i === activeStage
                          ? "text-text-primary"
                          : "text-text-secondary"
                      }`}
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                    >
                      {stage.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right — active stage detail */}
            <div className="flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-display text-6xl font-bold text-white/[0.04]">
                      {stages[activeStage].num}
                    </span>
                  </div>
                  <h3 className="mb-4 font-display text-2xl font-light text-text-primary">
                    {stages[activeStage].title}
                  </h3>
                  <p className="max-w-md text-lg leading-relaxed text-text-secondary font-body">
                    {stages[activeStage].description}
                  </p>
                  <div className="mt-8 h-px w-16 bg-accent/40" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
