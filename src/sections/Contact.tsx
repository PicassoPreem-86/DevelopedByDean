import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { MagneticButton } from "../components/MagneticButton";

type Step = 0 | 1 | 2 | 3 | 4;

const serviceOptions = ["Website", "AI Agent", "Voice Agent", "Automation", "Not Sure Yet"];
const timelineOptions = ["ASAP", "1–2 Months", "3+ Months", "Flexible"];

const slideTransition: Transition = {
  duration: 0.5,
  ease: [0.76, 0, 0.24, 1],
};

export function Contact() {
  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState({
    project: "",
    service: "",
    timeline: "",
    name: "",
    email: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, 4) as Step);

  const handleSubmit = async () => {
    next();
  };

  const slideProps = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: slideTransition,
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-bg-primary">
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-divider" />

      <div className="mx-auto max-w-container">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-8 bg-accent" />
          <span className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Start a Project
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — headline */}
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.01em] text-text-primary leading-[1.15]">
              Let's build something
              <br />
              <span className="text-accent">better.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-text-secondary font-body leading-relaxed">
              Tell me about your project. I'll get back to you within 24 hours
              with a clear next step.
            </p>

            {/* Progress indicator */}
            <div className="mt-12 flex items-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-0.5 transition-all duration-500 ${
                    i <= step ? "w-8 bg-accent" : "w-4 bg-divider"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — steps */}
          <div className="flex items-center min-h-[320px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" {...slideProps} className="w-full">
                  <label className="mb-4 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                    What are you building?
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) =>
                      setFormData({ ...formData, project: e.target.value })
                    }
                    placeholder="Describe your project or idea..."
                    className="w-full border-b border-divider bg-transparent pb-4 text-xl text-text-primary font-body placeholder:text-text-secondary/30 focus:border-accent focus:outline-none transition-colors"
                    onKeyDown={(e) =>
                      e.key === "Enter" && formData.project.trim() && next()
                    }
                  />
                  <div className="mt-6">
                    <MagneticButton
                      onClick={next}
                      variant="outline"
                      className={
                        !formData.project.trim()
                          ? "opacity-30 pointer-events-none"
                          : ""
                      }
                    >
                      Continue
                    </MagneticButton>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" {...slideProps} className="w-full">
                  <label className="mb-6 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                    What do you need help with?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {serviceOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, service: option });
                          setTimeout(next, 300);
                        }}
                        className={`border px-6 py-3 font-display text-sm tracking-[0.05em] transition-all duration-300 ${
                          formData.service === option
                            ? "border-accent bg-accent text-bg-primary"
                            : "border-divider text-text-secondary hover:border-accent hover:text-accent"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" {...slideProps} className="w-full">
                  <label className="mb-6 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                    What's your timeline?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {timelineOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, timeline: option });
                          setTimeout(next, 300);
                        }}
                        className={`border px-6 py-3 font-display text-sm tracking-[0.05em] transition-all duration-300 ${
                          formData.timeline === option
                            ? "border-accent bg-accent text-bg-primary"
                            : "border-divider text-text-secondary hover:border-accent hover:text-accent"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  {...slideProps}
                  className="w-full space-y-6"
                >
                  <label className="mb-4 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                    How should I reach you?
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="w-full border-b border-divider bg-transparent pb-4 text-lg text-text-primary font-body placeholder:text-text-secondary/30 focus:border-accent focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full border-b border-divider bg-transparent pb-4 text-lg text-text-primary font-body placeholder:text-text-secondary/30 focus:border-accent focus:outline-none transition-colors"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      formData.email.trim() &&
                      handleSubmit()
                    }
                  />
                  <MagneticButton
                    onClick={handleSubmit}
                    variant="primary"
                    className={
                      !formData.name.trim() || !formData.email.trim()
                        ? "opacity-30 pointer-events-none"
                        : ""
                    }
                  >
                    Send It
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M1 13L13 1M13 1H3M13 1V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </MagneticButton>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  {...slideProps}
                  className="w-full text-center"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-accent">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10L8 14L16 6"
                        stroke="#C7A97B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-light text-text-primary">
                    Message received.
                  </h3>
                  <p className="text-text-secondary font-body">
                    I'll review your project details and get back to you within
                    24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Direct contact fallback */}
        <div className="mt-20 border-t border-divider pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-text-secondary font-body">
            Prefer email? Reach me directly at{" "}
            <a
              href="mailto:hello@developedbydean.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              hello@developedbydean.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
