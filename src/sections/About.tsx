import { motion } from "framer-motion";

const principles = [
  { label: "Custom over canned", detail: "Every build is original" },
  { label: "Precision over noise", detail: "Intentional decisions only" },
  { label: "Systems over surface", detail: "Built for real business use" },
  { label: "Outcomes over aesthetics", detail: "Design that converts" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 bg-bg-surface">
      <div className="mx-auto max-w-container">
        {/* Section label */}
        <div className="mb-20 flex items-center gap-4">
          <div className="h-px w-8 bg-accent" />
          <span className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent">
            About
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — bold statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2
              className="font-display font-light leading-[1.15] tracking-[-0.01em] text-text-primary"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              I build digital systems
              <br />
              with the precision of
              <br />
              <span className="text-accent">architecture</span> and the
              <br />
              intelligence of{" "}
              <span className="text-accent">engineering.</span>
            </h2>
          </motion.div>

          {/* Right — bio + principles */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary font-body">
              <p>
                I'm Dean — a developer and systems builder focused on creating
                custom digital experiences that work as hard as the businesses
                they serve.
              </p>
              <p>
                Every project I take on is built from scratch. No templates, no
                shortcuts, no generic solutions. I work directly with founders
                and teams to design and engineer websites, AI agents, and
                automation systems that solve real problems and drive measurable
                outcomes.
              </p>
              <p>
                My approach is simple: understand the business deeply, design
                with precision, build with rigor, and deliver something that
                genuinely moves the needle.
              </p>
            </div>

            {/* Principles grid */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-divider pt-12">
              {principles.map((principle, i) => (
                <motion.div
                  key={principle.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * i,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <h4 className="font-display text-sm font-medium text-text-primary">
                    {principle.label}
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary">
                    {principle.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
