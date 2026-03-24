import { motion } from "framer-motion";
import type { Service } from "../types";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <motion.div
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-bg-card p-8 transition-all duration-500 hover:border-border-hover hover:bg-bg-card-hover hover:shadow-[0_0_40px_rgba(124,58,237,0.08)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))" }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-xl bg-accent-violet/10 p-3">
          <Icon size={24} className="text-accent-violet" />
        </div>
        <h3 className="mb-3 font-display text-xl font-bold text-text-primary">{service.title}</h3>
        <p className="text-text-secondary font-body leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}
