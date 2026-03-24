import { motion } from "framer-motion";
import { UserCheck, Zap, MessageCircle, Target } from "lucide-react";

const reasons = [
  {
    icon: UserCheck,
    title: "You Work Directly With the Builder",
    description: "No account managers, no middlemen. You talk to the person designing and building your system.",
  },
  {
    icon: Zap,
    title: "No Bloated Agency Overhead",
    description: "You get senior-level work at a fraction of the cost. No layers of unnecessary markup.",
  },
  {
    icon: MessageCircle,
    title: "Fast Execution & Clear Communication",
    description: "I move quickly, communicate proactively, and deliver on time. No black boxes or ghosting.",
  },
  {
    icon: Target,
    title: "Systems Built Around Business Goals",
    description: "Everything I build is designed to drive revenue, save time, or remove bottlenecks — not just look good.",
  },
];

export function WhyHireMe() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">Why Me</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Why Clients Work With Me
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            Hiring a sharp solo expert is faster, more personal, and more effective than working with a bloated agency.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="group rounded-2xl border border-border-light bg-surface-light p-7 transition-all hover:shadow-card-hover hover:border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <reason.icon size={20} className="text-accent" />
              </div>
              <h3 className="mb-2 text-base font-bold text-content-primary">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-content-muted">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
