import { motion } from "framer-motion";
import type { CategoryScore } from "../../types/assessment";

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
}

export function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  return (
    <div className="space-y-4">
      {categoryScores.map((cs, index) => (
        <motion.div
          key={cs.category}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-white/70">{cs.label}</span>
            <span className="text-sm font-semibold text-white">{cs.score}</span>
          </div>
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${cs.score}%` }}
              transition={{ delay: 0.1 * index + 0.5, duration: 0.8, ease: "easeOut" }}
              style={{
                backgroundColor:
                  cs.score >= 75 ? "#10b981" : cs.score >= 50 ? "#4361EE" : cs.score >= 25 ? "#f59e0b" : "#ef4444",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
