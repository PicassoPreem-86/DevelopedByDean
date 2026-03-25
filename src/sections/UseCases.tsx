import { motion } from "framer-motion";
import { Hammer, Heart, Home, ShoppingCart, Scale, Dumbbell, ArrowRight } from "lucide-react";

const useCases = [
  {
    icon: Hammer,
    industry: "Roofing Company",
    solution: "AI voice agent that answers after-hours calls, qualifies leads, and books roof inspections — automatically.",
    outcome: "Never miss a storm-season lead again. Clients booked 24/7 without hiring a receptionist.",
    tags: ["Voice Agent", "Lead Capture"],
  },
  {
    icon: Heart,
    industry: "Med Spa & Dental Clinics",
    solution: "Automated appointment reminders, an AI chatbot for FAQs, and smart rebooking flows for no-shows.",
    outcome: "35% fewer no-shows. Front desk spends less time on the phone and more time with patients.",
    tags: ["Automation", "AI Chatbot"],
  },
  {
    icon: Home,
    industry: "Real Estate Agents",
    solution: "AI-powered lead capture website that qualifies buyers, scores urgency, and syncs directly to your CRM.",
    outcome: "Only talk to serious buyers. Every lead pre-qualified before it hits your inbox.",
    tags: ["Website", "Lead Capture"],
  },
  {
    icon: ShoppingCart,
    industry: "Ecommerce Brands",
    solution: "AI-driven abandoned cart recovery with personalized follow-up emails and SMS sequences.",
    outcome: "Recover 15–25% of abandoned carts on autopilot. More revenue from traffic you already have.",
    tags: ["Automation", "AI Workflows"],
  },
  {
    icon: Scale,
    industry: "Law Firms",
    solution: "Client intake automation with AI that pre-screens cases, collects documents, and routes qualified leads.",
    outcome: "Stop wasting consultations on bad-fit cases. Only meet with clients worth your time.",
    tags: ["Automation", "AI Agent"],
  },
  {
    icon: Dumbbell,
    industry: "Fitness Studios & Gyms",
    solution: "AI voice agent for class bookings plus automated follow-up sequences for trial members.",
    outcome: "Convert more trial members to paying clients with zero manual follow-up.",
    tags: ["Voice Agent", "Automation"],
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 lg:py-28 px-6 bg-white">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
            Use Cases
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            AI That Works for Real Businesses
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-2xl mx-auto">
            Here's how AI systems can transform everyday businesses — no matter your industry.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.industry}
              className="group relative rounded-2xl border border-border-light bg-surface-light p-7 transition-all duration-300 hover:shadow-card-hover hover:border-accent/20 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {/* Top row — icon + industry */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <uc.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-base font-bold text-content-primary">{uc.industry}</h3>
              </div>

              {/* Solution */}
              <p className="text-sm leading-relaxed text-content-body mb-4">
                {uc.solution}
              </p>

              {/* Outcome */}
              <div className="rounded-lg bg-accent/[0.04] border border-accent/10 p-3 mb-5">
                <p className="text-xs font-semibold text-accent mb-0.5">The Result</p>
                <p className="text-xs leading-relaxed text-content-muted">{uc.outcome}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {uc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white border border-border-light px-3 py-1 text-[11px] font-semibold text-content-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm text-content-muted mb-3">
            Don't see your industry? I build custom solutions for any business.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            Tell me about your business <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
