import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Calendar, Play, Bot, Zap, BarChart3 } from "lucide-react";

const DEMO_VIDEO_URL = import.meta.env.VITE_DEMO_VIDEO_URL?.trim() || "";

export function Hero() {
  return (
    <section className="relative bg-hero overflow-hidden pt-28 pb-20 px-6">
      {/* Dot grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-accent/[0.07] blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Sparkles size={14} className="text-accent-light" />
              <span className="text-[13px] font-medium text-accent-light">
                Available for New Projects
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-white"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              I Help Businesses
              <br />
              Make More Money
              <br />
              <span className="bg-gradient-to-r from-accent-light via-accent to-accent-light bg-clip-text text-transparent">With AI</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              I'm Dean — a solo AI developer & systems engineer. I design and build custom AI-powered websites, voice agents, and automations that capture leads, close more sales, and save hours every day.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow"
              >
                <Calendar size={16} /> Book a Free Strategy Call <ArrowRight size={16} />
              </a>
              {DEMO_VIDEO_URL ? (
                <a
                  href={DEMO_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-content-primary hover:bg-white/90 transition-colors"
                >
                  <Play size={16} className="fill-content-primary" /> Watch a 2-Min Demo
                </a>
              ) : (
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-content-primary hover:bg-white/90 transition-colors"
                >
                  <Play size={16} className="fill-content-primary" /> See What I Build
                </a>
              )}
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap gap-3 sm:gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
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

          {/* Right — Dynamic portrait composition */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div
                className="absolute -inset-8 rounded-3xl bg-accent/10 blur-3xl"
                aria-hidden="true"
              />

              {/* Main portrait */}
              <div className="relative w-72 sm:w-80 lg:w-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-surface-dark shadow-2xl">
                <div className="overflow-hidden">
                  <img
                    src="/images/dean-headshot.jpg"
                    alt="Dean — AI Developer & Systems Engineer"
                    className="w-full h-auto"
                  />
                </div>
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-dark to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="text-sm font-bold text-white">Dean Holland</p>
                  <p className="text-xs text-white/50">AI Developer & Systems Engineer</p>
                </div>
              </div>

              {/* Floating stat cards — positioned outside the photo */}
              <motion.div
                className="absolute -left-6 -top-6 rounded-xl border border-white/[0.08] bg-hero/90 px-3.5 py-2.5 shadow-xl backdrop-blur-sm sm:-left-14 sm:-top-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                    <Bot size={15} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">AI Voice Agents</p>
                    <p className="text-[10px] text-white/40">24/7 call handling</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 -top-6 rounded-xl border border-white/[0.08] bg-hero/90 px-3.5 py-2.5 shadow-xl backdrop-blur-sm sm:-right-14 sm:-top-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                    <Zap size={15} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Automation</p>
                    <p className="text-[10px] text-white/40">500+ hours saved</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-4 rounded-xl border border-white/[0.08] bg-hero/90 px-3.5 py-2.5 shadow-xl backdrop-blur-sm sm:-bottom-4 sm:-right-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15">
                    <BarChart3 size={15} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">100% Satisfaction</p>
                    <p className="text-[10px] text-white/40">Every project delivered</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
