import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, Workflow } from "lucide-react";

const proofPillars = [
  {
    title: "Live Product Demo",
    description:
      "The site itself demonstrates live AI interaction, lead capture, routing, and search-focused architecture instead of relying on vague claims.",
    icon: ShieldCheck,
  },
  {
    title: "Direct Builder Access",
    description:
      "You work directly with the person designing the workflows, shipping the frontend, and wiring the automation layer rather than going through a sales stack.",
    icon: Wrench,
  },
  {
    title: "Operations-First Thinking",
    description:
      "The work is framed around response time, qualification, booking, handoff, and visibility so the build changes how the business runs, not just how it looks.",
    icon: Workflow,
  },
];

const deliveryStandards = [
  "Technical SEO foundations built into page structure and metadata",
  "Real workflow mapping before implementation starts",
  "Production hardening around contact, chat, and deployment flows",
  "Direct post-launch iteration based on actual behavior and performance",
  "Secure data handling with encrypted connections and environment-isolated keys",
  "Ongoing support SLA with defined response times after launch",
];

export function TrustEvidence() {
  return (
    <section className="bg-surface-light px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Honest Proof
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.8vw,2.8rem)] font-extrabold leading-tight text-content-primary">
              No fake reviews. No invented case studies. Just real build credibility.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-content-body">
              Until you have a larger public portfolio, the strongest trust signals are system quality,
              technical depth, clear process, and visible implementation detail.
            </p>

            <div className="mt-8 rounded-3xl border border-border-light bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-content-muted">
                Delivery standards
              </p>
              <ul className="mt-5 space-y-3">
                {deliveryStandards.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-content-body">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-5">
            {proofPillars.map((item, index) => (
              <motion.article
                key={item.title}
                className="rounded-3xl border border-border-light bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-content-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-content-body">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}

            <div className="rounded-3xl border border-border-light bg-hero p-6 text-white shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
                Best next step
              </p>
              <h3 className="mt-3 text-2xl font-bold">Turn future projects into proof assets.</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                The fastest way to build authority is to publish anonymized workflows, screen
                recordings, and implementation breakdowns as real projects ship.
              </p>
              <Link to="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Explore service pages <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
