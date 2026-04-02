import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dean built us an AI phone system that picks up every call. We went from missing a third of our inbound leads to under 5%. Paid for itself in the first month.",
    name: "Sarah M.",
    title: "Owner",
    company: "Cascade Plumbing & HVAC",
    industry: "Home Services",
  },
  {
    quote:
      "The AI booking system increased our consultation requests by 40% without adding front-desk staff. Our team finally focuses on patients instead of playing phone tag.",
    name: "Dr. James K.",
    title: "Medical Director",
    company: "Vitality Med Spa",
    industry: "Medical Aesthetics",
  },
  {
    quote:
      "Our intake response time went from hours to minutes. Dean automated the entire pipeline — qualification, routing, follow-up. Exactly what we needed.",
    name: "Rachel T.",
    title: "Managing Partner",
    company: "Hartwell Legal Group",
    industry: "Legal",
  },
];

export function Testimonials() {
  return (
    <section className="bg-hero px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent-light">
            Client Results
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-white">
            What Business Owners Are Saying
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:border-accent/20 hover:bg-white/[0.05]"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
            >
              <Quote
                size={24}
                className="mb-4 text-accent/20"
                strokeWidth={1.5}
              />

              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-[15px] leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/40">
                  {t.title}, {t.company}
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
