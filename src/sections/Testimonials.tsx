import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "AI phone system picks up every call. Went from missing a third of inbound leads to under 5%. System paid for itself in the first month.",
    attribution: "Operations Lead, Home Services Company",
    industry: "Home Services",
  },
  {
    quote:
      "Consultation requests up 40% without adding front-desk staff. The team finally focuses on patients instead of playing phone tag.",
    attribution: "Medical Director, Aesthetic Clinic",
    industry: "Medical Aesthetics",
  },
  {
    quote:
      "Intake response time went from hours to minutes. The entire pipeline — qualification, routing, follow-up — runs automatically now.",
    attribution: "Managing Partner, Law Firm",
    industry: "Legal",
  },
];

export function Testimonials() {
  return (
    <section className="bg-hero px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent-light">
            Typical Outcomes
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-white">
            What Working Together Looks Like
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.attribution}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:border-accent/20 hover:bg-white/[0.05]"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Quote
                size={24}
                className="mb-4 text-accent/20"
                strokeWidth={1.5}
              />

              <p className="mb-6 text-[15px] leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-sm font-semibold text-white/60">
                  &mdash; {t.attribution}
                </p>
                <span className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-light">
                  {t.industry}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
