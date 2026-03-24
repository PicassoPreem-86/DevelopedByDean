import { motion } from "framer-motion";
import { PhoneCall, TrendingUp, Clock, DollarSign, Star, Quote } from "lucide-react";

const results = [
  { icon: PhoneCall, metric: "+40–60%", label: "More Booked Calls", description: "AI voice agents and smart lead capture fill your calendar." },
  { icon: TrendingUp, metric: "2–5x", label: "Increase in Sales", description: "Better systems mean more leads convert to paying customers." },
  { icon: Clock, metric: "20–40 hrs", label: "Saved Weekly", description: "Automations handle the repetitive work your team shouldn't do." },
  { icon: DollarSign, metric: "3–10x", label: "ROI in Month One", description: "Systems that pay for themselves from the first month." },
];

export function Results() {
  return (
    <section id="results" className="py-24 px-6 bg-surface-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">Proven Impact</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Real Businesses. Real Results.
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            Here's the kind of impact my clients typically see after I build the right system.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item, i) => (
            <motion.div
              key={item.label}
              className="group rounded-2xl border border-border-light bg-white p-6 transition-all hover:shadow-card-hover hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <item.icon size={20} className="text-accent" />
              </div>
              <p className="text-3xl font-extrabold text-content-primary">{item.metric}</p>
              <p className="mt-1 text-sm font-semibold text-content-primary">{item.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-content-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 rounded-2xl border border-border-light bg-white p-8 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Quote size={32} className="text-accent/20 shrink-0" />
            <div>
              <p className="text-lg font-medium leading-relaxed text-content-primary italic">
                "You built us an AI system that feels like having a full sales team running in the background. Our lead response time went from hours to seconds."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">JR</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-content-primary">Jake R.</p>
                  <p className="text-xs text-content-muted">Home Services Business Owner</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
