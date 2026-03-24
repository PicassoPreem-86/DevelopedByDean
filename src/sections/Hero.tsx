import { motion } from "framer-motion";
import { ArrowDown, Award } from "lucide-react";
import { Button } from "../components/Button";

export function Hero() {
  return (
    <section id="hero" className="hero-gradient relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          className="mb-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-violet"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Websites & AI Solutions
        </motion.p>
        <motion.h1
          className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your Business Deserves More Than a Website.{" "}
          <span className="gradient-text">It Deserves One That Works For You.</span>
        </motion.h1>
        <motion.p
          className="mt-8 text-lg text-text-secondary md:text-xl lg:text-2xl max-w-2xl mx-auto font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          I build premium websites and intelligent AI solutions that grow your business on autopilot.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button href="#contact" size="lg">Let's Talk</Button>
        </motion.div>
        {/* Trust strip — certification badges */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {["AI Certification 1", "AI Certification 2", "AI Certification 3"].map((cert) => (
            <div key={cert} className="flex items-center gap-2 rounded-full border border-border/50 bg-bg-card/50 px-4 py-2 text-xs text-text-secondary">
              <Award size={14} className="text-accent-violet" />
              {cert}
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5, duration: 0.6 }, y: { delay: 1.5, duration: 2, repeat: Infinity } }}
      >
        <ArrowDown size={20} className="text-text-secondary" />
      </motion.div>
    </section>
  );
}
