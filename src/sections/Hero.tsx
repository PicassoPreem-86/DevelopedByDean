import { motion } from "framer-motion";
import { Star, Sparkles, ArrowRight, CheckCircle2, Calendar, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-hero overflow-hidden pt-28 pb-16 px-6">
      {/* Dot grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles size={14} className="text-accent-light" />
              <span className="text-[13px] font-medium text-accent-light">
                Available for New Projects
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I Help Businesses
              <br />
              Make More Money
              <br />
              <span className="text-accent">With AI</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              I'm Dean — a solo AI developer & systems builder. I design and build custom AI-powered websites, voice agents, and automations that capture leads, close more sales, and save hours every day.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow"
              >
                <Calendar size={16} /> Book a Free Strategy Call <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-content-primary hover:bg-white/90 transition-colors"
              >
                <PlayCircle size={16} /> See How I Can Help
              </a>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {["Free 30-min call", "No pressure", "Personalized loom video"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-[13px] text-white/40"
                  >
                    <CheckCircle2 size={14} className="text-accent/60" /> {item}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right — Portrait card */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div
                className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl"
                aria-hidden="true"
              />

              {/* Main card */}
              <div className="relative w-72 sm:w-80 overflow-hidden rounded-2xl border border-white/10 bg-surface-dark">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/dean-headshot.jpg"
                    alt="Dean — AI Developer & Systems Builder"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating badge — reviews */}
              <div className="absolute -left-6 top-12 hidden lg:block rounded-xl bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 shadow-lg">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold text-white">
                  5.0 Client Rating
                </p>
              </div>

              {/* Floating badge — worldwide clients */}
              <div className="absolute -right-4 bottom-16 hidden lg:block rounded-xl bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold text-white mb-2">Serving Clients Worldwide</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["#3B82F6","#10B981","#F59E0B","#8B5CF6"].map((c, i) => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-surface-dark" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-white">5.0</span>
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />)}</div>
                    <span className="text-[10px] text-white/50">(28+ reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
