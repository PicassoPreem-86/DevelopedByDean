import { motion } from "framer-motion";
import { Bot, PhoneCall, LayoutDashboard, ArrowUpRight } from "lucide-react";

const useCases = [
  {
    icon: Bot,
    title: "AI Lead Capture System",
    description: "Capture website leads automatically, qualify them instantly, and push them into your CRM — so no opportunity slips through the cracks.",
    tags: ["Lead Gen", "AI Agent", "CRM Integration"],
  },
  {
    icon: PhoneCall,
    title: "AI Call Answering & Booking",
    description: "Never miss a call again. An AI voice agent answers, qualifies the caller, and books appointments directly into your calendar.",
    tags: ["Voice AI", "Scheduling", "24/7 Coverage"],
  },
  {
    icon: LayoutDashboard,
    title: "Internal Workflow Automation",
    description: "Connect your tools, automate repetitive tasks, and build custom dashboards — so your team can focus on high-value work.",
    tags: ["Automation", "Dashboard", "Integrations"],
  },
];

export function UseCases() {
  return (
    <section id="work" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">Solutions</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            What I Can Help You Build
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            Every system is custom-built around your business goals — not pulled from a template.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="group relative rounded-2xl border border-border-light bg-surface-light p-7 transition-all hover:shadow-card-hover hover:border-accent/20 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <uc.icon size={22} className="text-accent" />
                </div>
                <ArrowUpRight size={18} className="text-content-muted/30 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-content-primary">{uc.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-content-muted">{uc.description}</p>
              <div className="flex flex-wrap gap-2">
                {uc.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-accent/5 px-3 py-1 text-xs font-medium text-accent">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
