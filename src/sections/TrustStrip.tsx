import { motion } from "framer-motion";
import { Building2, Stethoscope, ShoppingBag, Users, Briefcase } from "lucide-react";

const clientTypes = [
  { icon: Building2, label: "Contractors" },
  { icon: Stethoscope, label: "Medical Clinics" },
  { icon: ShoppingBag, label: "Ecommerce Brands" },
  { icon: Users, label: "Agencies" },
  { icon: Briefcase, label: "Coaches & Consultants" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border-light bg-surface-light py-8 px-6">
      <div className="mx-auto max-w-container">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-content-muted">
          Trusted by service businesses, agencies, and founders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12">
          {clientTypes.map((type, i) => (
            <motion.div
              key={type.label}
              className="flex items-center gap-2.5 text-content-muted"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <type.icon size={20} strokeWidth={1.5} />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">{type.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
