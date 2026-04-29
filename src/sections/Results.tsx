import { motion } from "framer-motion";
import { PhoneCall, TrendingUp, Clock, DollarSign } from "lucide-react";

const results = [
  { icon: PhoneCall, metric: "Faster", label: "Lead Response", description: "Voice agents and smarter intake reduce missed opportunities" },
  { icon: TrendingUp, metric: "Higher", label: "Conversion Lift", description: "Better routing, follow-up, and positioning improve the ceiling" },
  { icon: Clock, metric: "Less", label: "Manual Work", description: "Automation removes repetitive admin and fragmented handoffs" },
  { icon: DollarSign, metric: "Clearer", label: "Revenue Visibility", description: "Tracking and CRM flow make performance easier to manage" },
];

const evidenceCards = [
  {
    title: "Real Systems, Live Right Now",
    description:
      "This site runs AI chat, automated lead capture, SEO architecture, and serverless API routes — all designed and built by me. The work speaks for itself.",
  },
  {
    title: "Measurement From Day One",
    description:
      "Every system launches with measurable checkpoints: response time, booked calls, lead routing quality, and workflow completion visibility.",
  },
  {
    title: "Built for Your Workflow",
    description:
      "Each engagement starts by mapping the exact bottleneck, then designing the system around the specific improvement path that matters to your business.",
  },
];

export function Results() {
  return (
    <section id="results" className="pt-28 pb-20 lg:pt-36 lg:pb-28 px-6 bg-surface-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">RESULTS I DELIVER</span>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            What These Systems Are Built to Improve
          </h1>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            Every system I build targets specific operational metrics. Here are the outcomes
            these builds are engineered to move.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item, i) => (
            <motion.div
              key={item.label}
              className="group rounded-2xl border border-accent/15 bg-accent/[0.04] p-6 text-center transition-all hover:shadow-card-hover hover:-translate-y-1 hover:border-accent/30"
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

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {evidenceCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="rounded-2xl border border-border-light bg-white p-6 shadow-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + index * 0.08, duration: 0.4 }}
            >
              <h2 className="text-lg font-bold text-content-primary">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-content-body">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
