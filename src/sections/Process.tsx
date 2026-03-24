import { motion } from "framer-motion";
import { Phone, FileText, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { num: "01", icon: Phone, title: "Free Strategy Call", description: "We talk about your business, your challenges, and where AI can make the biggest impact." },
  { num: "02", icon: FileText, title: "Custom Plan", description: "I create a tailored proposal with clear scope, timeline, and expected outcomes." },
  { num: "03", icon: Rocket, title: "Build & Launch", description: "I design, build, and deploy your system — keeping you in the loop the entire time." },
  { num: "04", icon: BarChart3, title: "Optimize & Scale", description: "We monitor performance, refine the system, and scale what's working." },
];

export function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-surface-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">How It Works</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Simple, Fast, Personal.
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            I keep the process straightforward so you can move quickly and get results.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative rounded-2xl border border-border-light bg-white p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border-light lg:block" aria-hidden="true" />
              )}

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                <step.icon size={24} className="text-accent" />
              </div>
              <span className="mb-2 block text-xs font-bold text-accent">{step.num}</span>
              <h3 className="mb-2 text-base font-bold text-content-primary">{step.title}</h3>
              <p className="text-sm leading-relaxed text-content-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
