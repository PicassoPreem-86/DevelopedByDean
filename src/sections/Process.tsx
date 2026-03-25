import { motion } from "framer-motion";
import { Phone, FileText, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { num: "1", icon: Phone, title: "Free Strategy Call", description: "We'll hop on a 30-min call to talk about your business & goals." },
  { num: "2", icon: FileText, title: "Custom Plan", description: "I'll show you exactly what AI system will make you the most money." },
  { num: "3", icon: Rocket, title: "Build & Launch", description: "I build everything for you — fast & done-for-you." },
  { num: "4", icon: BarChart3, title: "Optimize & Scale", description: "We track results & scale what's working." },
];

export function Process() {
  return (
    <section id="process" className="py-20 lg:py-28 px-6 bg-white">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">HOW IT WORKS</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Simple, Fast, Personal.
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            I've made the process easy — so you get results without the stress.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative rounded-2xl border border-border-light bg-white p-4 sm:p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {/* Dotted connector between steps */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden w-6 border-t-2 border-dashed border-slate-300 lg:block" aria-hidden="true" />
              )}

              {/* Icon circle with number badge */}
              <div className="relative mx-auto mb-4 h-14 w-14">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <step.icon size={24} className="text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-accent text-xs font-bold text-accent">
                  {step.num}
                </span>
              </div>

              <h3 className="mb-2 text-base font-bold text-content-primary">{step.title}</h3>
              <p className="text-sm leading-relaxed text-content-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
