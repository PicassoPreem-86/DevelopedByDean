import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contact" className="py-24 px-6 bg-hero">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight text-white">
            Ready to Get Ahead of<br />Your Competitors?
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-lg mx-auto">
            Let's build a custom AI system that helps you bring in more leads, save time, and grow faster.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Free 30-min strategy call", "No commitment needed", "Personalized recommendations"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-white/50">
                <CheckCircle2 size={14} className="text-accent" /> {item}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="mailto:hello@developedbydean.com"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow"
            >
              Book Your Free Call Now <ArrowRight size={16} />
            </a>
          </div>

          <p className="mt-4 text-sm text-white/30">Limited project slots available.</p>
        </motion.div>
      </div>
    </section>
  );
}
