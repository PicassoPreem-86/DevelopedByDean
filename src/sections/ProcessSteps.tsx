import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, Wrench, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Strategy Call",
    description:
      "We talk through your business, where leads are leaking, and what AI can realistically fix. You leave with a clear plan — even if we never work together.",
    icon: Phone,
    outcomes: ["Pain points mapped", "Opportunities ranked", "Clear scope defined"],
  },
  {
    number: "02",
    title: "Custom Build",
    description:
      "I design and build your system in 2-6 weeks — voice agents, website, automations, whatever the plan calls for. You get regular check-ins, not radio silence.",
    icon: Wrench,
    outcomes: ["Built around your workflow", "Tested before launch", "No templates"],
  },
  {
    number: "03",
    title: "Launch & Optimize",
    description:
      "Your system goes live with real monitoring. I track performance, tune the AI, and tighten the workflow based on actual data — not guesswork.",
    icon: Rocket,
    outcomes: ["Live performance tracking", "Ongoing optimization", "Direct support"],
  },
];

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white px-6 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, x: -16, filter: "blur(2px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
            How It Works
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
            From First Call to Live System in Three Steps
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-content-body">
            No bloated timelines, no mystery process. Here is exactly how we go
            from conversation to a system that runs.
          </p>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
          {/* Scroll-linked connector line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-[2px] bg-border-light lg:block">
            <motion.div
              className="h-full bg-accent origin-left"
              style={{ width: lineHeight }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Step number circle */}
              <div className="relative z-10 mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                  <step.icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    Step {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-content-primary">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="mb-5 text-[15px] leading-relaxed text-content-body">
                {step.description}
              </p>

              <ul className="space-y-2">
                {step.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-center gap-2 text-sm text-content-muted"
                  >
                    <ArrowRight size={12} className="shrink-0 text-accent" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
