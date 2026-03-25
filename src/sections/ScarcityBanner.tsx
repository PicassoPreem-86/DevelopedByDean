import { motion } from "framer-motion";

export function ScarcityBanner() {
  return (
    <motion.section
      className="py-6 px-6 bg-hero"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-container flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white">
            Currently accepting 2 new clients for April
          </span>
        </div>
        <a
          href="#contact"
          className="text-sm font-semibold text-accent hover:text-accent-light transition-colors"
        >
          Claim your spot →
        </a>
      </div>
    </motion.section>
  );
}
