import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { Award } from "lucide-react";

const certifications = [
  { name: "AI Certification", icon: Award },
  { name: "AI Certification", icon: Award },
  { name: "AI Certification", icon: Award },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 bg-bg-primary">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading title="The Person Behind the Code" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary font-body">
              <p>I'm Dean — a developer who believes your digital presence should do more than just exist. It should work as hard as you do.</p>
              <p>I bridge the gap between beautiful design and intelligent technology. Whether you need a website that converts or an AI agent that handles your busywork, I build solutions that make a real difference to your bottom line.</p>
              <p>No jargon. No over-promising. Just clean, effective digital products that help your business grow.</p>
            </div>
            <div className="mt-10">
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">Certifications</h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, i) => (
                  <motion.div key={i} className="group relative flex items-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-3 transition-colors hover:border-border-hover" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} title={cert.name}>
                    <cert.icon size={18} className="text-accent-violet" />
                    <span className="text-sm text-text-secondary">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div className="flex justify-center lg:justify-end" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-accent opacity-20 blur-sm" aria-hidden="true" />
              <div className="relative aspect-[3/4] w-72 sm:w-80 overflow-hidden rounded-2xl border border-border bg-bg-card">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-4xl text-text-secondary/30">D</div>
                    <div className="text-sm text-text-secondary/50">Photo coming soon</div>
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
