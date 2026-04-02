import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function CertificationBar() {
  return (
    <motion.section
      className="border-y border-border-light bg-white px-6 py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="mx-auto flex max-w-container flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
            <Shield size={18} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-bold text-content-primary">
              Anthropic Certified AI Developer
            </p>
            <p className="text-xs text-content-muted">
              Verified expertise in Claude AI systems
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
