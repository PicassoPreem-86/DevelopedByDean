import { motion } from "framer-motion";
import { PhoneCall, TrendingUp, Clock, DollarSign } from "lucide-react";

const results = [
  { icon: PhoneCall, metric: "+40–60%", label: "More Booked Calls", description: "From AI voice agents & lead capture systems" },
  { icon: TrendingUp, metric: "2–5x", label: "Increase in Sales", description: "With AI-powered websites & follow-ups" },
  { icon: Clock, metric: "20–40 hrs", label: "Saved Weekly", description: "Through automation & AI workflows" },
  { icon: DollarSign, metric: "3–10x", label: "ROI in Month One", description: "Most clients break even fast" },
];

export function Results() {
  return (
    <section id="results" className="py-20 lg:py-28 px-6 bg-surface-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">RESULTS I DELIVER</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Real Businesses. Real Results.
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            Here's what my clients typically see after I build their AI system:
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item, i) => (
            <motion.div
              key={item.label}
              className="group rounded-2xl border border-blue-100/50 bg-blue-50/50 p-6 text-center transition-all hover:shadow-card-hover hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <item.icon size={20} className="text-accent" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-accent">{item.metric}</p>
              <p className="mt-1 text-sm font-semibold text-content-primary">{item.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-content-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 rounded-2xl border border-border-light bg-white p-6 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Avatar */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-sm font-bold text-accent">JR</span>
            </div>
            {/* Quote */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-relaxed text-content-primary italic">
                "You built us an AI system that feels like having a full sales team on autopilot."
              </p>
              <p className="mt-1 text-xs text-content-muted">— Jake R., Home Services Business Owner</p>
            </div>
            {/* Badge */}
            <div className="shrink-0 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 flex items-center gap-1">
              <span className="text-xs font-semibold text-accent">↑ 187% more leads</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
