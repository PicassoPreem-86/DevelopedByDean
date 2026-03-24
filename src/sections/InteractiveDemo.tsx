import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Recommendation {
  type: string;
  approach: string;
  components: string[];
  timeline: string;
}

function getRecommendation(input: string): Recommendation {
  const lower = input.toLowerCase();

  if (
    lower.includes("website") ||
    lower.includes("landing") ||
    lower.includes("redesign") ||
    lower.includes("site")
  ) {
    return {
      type: "Custom Website",
      approach:
        "A conversion-optimized, bespoke website built with modern frameworks and tailored to your brand's positioning.",
      components: [
        "Custom design system",
        "Responsive engineering",
        "Performance optimization",
        "SEO foundation",
        "Analytics integration",
      ],
      timeline: "3–5 weeks",
    };
  }

  if (
    lower.includes("ai") ||
    lower.includes("agent") ||
    lower.includes("chatbot") ||
    lower.includes("assistant") ||
    lower.includes("support")
  ) {
    return {
      type: "AI Agent System",
      approach:
        "A purpose-built AI agent designed to handle customer interactions, qualify leads, and escalate intelligently.",
      components: [
        "Conversational AI design",
        "Knowledge base integration",
        "Escalation workflows",
        "Analytics dashboard",
        "Continuous learning loop",
      ],
      timeline: "4–6 weeks",
    };
  }

  if (
    lower.includes("voice") ||
    lower.includes("phone") ||
    lower.includes("call")
  ) {
    return {
      type: "Voice Agent",
      approach:
        "A natural voice AI system for phone-based customer interactions — booking, qualifying, and routing.",
      components: [
        "Voice flow design",
        "Natural language processing",
        "CRM integration",
        "Call analytics",
        "Fallback routing",
      ],
      timeline: "4–6 weeks",
    };
  }

  if (
    lower.includes("automat") ||
    lower.includes("workflow") ||
    lower.includes("process") ||
    lower.includes("integrat")
  ) {
    return {
      type: "Workflow Automation",
      approach:
        "Connected automation that eliminates manual processes and keeps your systems synchronized.",
      components: [
        "Process mapping",
        "API integrations",
        "Error handling",
        "Monitoring dashboard",
        "Documentation",
      ],
      timeline: "2–4 weeks",
    };
  }

  return {
    type: "Custom Digital Solution",
    approach:
      "A tailored solution combining web engineering and intelligent automation, scoped to your specific business needs.",
    components: [
      "Discovery & scoping",
      "Architecture design",
      "Custom development",
      "Testing & QA",
      "Deployment & support",
    ],
    timeline: "3–6 weeks",
  };
}

export function InteractiveDemo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsTyping(true);
    setResult(null);

    setTimeout(() => {
      setResult(getRecommendation(input));
      setIsTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    inputRef.current?.focus();
  };

  return (
    <section className="relative py-32 px-6 bg-bg-primary">
      <div className="mx-auto max-w-container">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-8 bg-accent" />
          <span className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Interactive
          </span>
        </div>

        <div className="mb-16 max-w-2xl">
          <h2
            className="mb-4 font-display font-light tracking-[-0.01em] text-text-primary"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Tell me what you're building.
          </h2>
          <p className="text-lg text-text-secondary font-body">
            Describe your project or business challenge, and I'll outline what a
            solution could look like.
          </p>
        </div>

        {/* Interactive module */}
        <div className="mx-auto max-w-3xl border border-divider bg-bg-surface">
          {/* Terminal-style header */}
          <div className="flex items-center justify-between border-b border-divider px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent/60" />
              <span className="font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                Project Scope
              </span>
            </div>
            {result && (
              <button
                onClick={handleReset}
                className="font-display text-xs tracking-[0.1em] uppercase text-text-secondary hover:text-accent transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="border-b border-divider p-6">
            <label className="mb-3 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
              What are you trying to build?
            </label>
            <div className="flex gap-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., A website for my consulting firm, An AI chatbot for customer support..."
                className="flex-1 bg-transparent text-text-primary font-body text-lg placeholder:text-text-secondary/30 focus:outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="font-display text-xs tracking-[0.1em] uppercase text-accent hover:text-accent-hover transition-colors disabled:opacity-30"
              >
                {isTyping ? "Analyzing..." : "Scope It"}
              </button>
            </div>
          </form>

          {/* Results area */}
          <div className="p-6 min-h-[200px]">
            <AnimatePresence mode="wait">
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary font-body">
                    Scoping your project...
                  </span>
                </motion.div>
              )}

              {result && !isTyping && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <span className="font-display text-xs tracking-[0.1em] uppercase text-accent">
                      Recommended Approach
                    </span>
                    <h3 className="mt-2 font-display text-xl font-light text-text-primary">
                      {result.type}
                    </h3>
                    <p className="mt-2 text-text-secondary font-body leading-relaxed">
                      {result.approach}
                    </p>
                  </div>

                  <div className="border-t border-divider pt-6">
                    <span className="font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                      Key Components
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.components.map((comp, i) => (
                        <motion.span
                          key={comp}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="border border-divider px-3 py-1.5 font-display text-xs tracking-[0.05em] text-text-secondary"
                        >
                          {comp}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-divider pt-6">
                    <div>
                      <span className="font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
                        Estimated Timeline
                      </span>
                      <p className="mt-1 font-display text-lg text-text-primary">
                        {result.timeline}
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className="font-display text-xs tracking-[0.1em] uppercase text-accent hover:text-accent-hover transition-colors"
                    >
                      Let's discuss this →
                    </a>
                  </div>
                </motion.div>
              )}

              {!result && !isTyping && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-[200px] items-center justify-center"
                >
                  <p className="text-sm text-text-secondary/40 font-display tracking-[0.05em]">
                    Your project scope will appear here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
