import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contact" className="py-20 lg:py-28 px-6 bg-surface-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 rounded-2xl p-10 lg:p-14 shadow-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left — Copy */}
            <div>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
                Ready to Get Ahead of Your Competitors?
              </h2>
              <p className="mt-4 text-lg text-content-body">
                Let's build your custom AI system and start driving more leads, sales, and free time — starting now.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Free 30-min strategy call",
                  "No commitment needed",
                  "Personalized plan for your business",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-content-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex flex-col items-center lg:items-end gap-3">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-10 py-4.5 text-lg font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow"
              >
                <Calendar size={18} /> Book Your Free Call Now
              </a>
              <p className="text-sm text-content-muted">🔥 Spots filling up — let's talk ASAP!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
