import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function ScarcityBanner() {
  // Compute on each render so a long-open tab or cached bundle never shows the wrong month.
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  return (
    <motion.section
      className="py-6 px-6 bg-hero"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto max-w-container flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white">
            Currently accepting 2 new clients for {currentMonth}
          </span>
        </div>
        <Link
          to="/#contact"
          className="text-sm font-semibold text-accent hover:text-accent-light transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-hero rounded"
        >
          Claim your spot &rarr;
        </Link>
      </div>
    </motion.section>
  );
}
