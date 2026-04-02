import { motion } from "framer-motion";

interface IndustryBenchmarkProps {
  userScore: number;
  benchmarkScore: number;
  industryLabel: string;
}

export function IndustryBenchmark({ userScore, benchmarkScore, industryLabel }: IndustryBenchmarkProps) {
  const diff = userScore - benchmarkScore;
  const isAbove = diff > 0;
  const isEqual = diff === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">You vs. Your Industry</h3>
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-white/60">Your score</span>
            <span className="text-sm font-bold text-white">{userScore}</span>
          </div>
          <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div className="h-full bg-accent rounded-full" initial={{ width: 0 }} animate={{ width: `${userScore}%` }} transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-white/60">{industryLabel} average</span>
            <span className="text-sm font-bold text-white/50">{benchmarkScore}</span>
          </div>
          <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div className="h-full bg-white/20 rounded-full" initial={{ width: 0 }} animate={{ width: `${benchmarkScore}%` }} transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/50">
        {isEqual
          ? `You're right at the average for ${industryLabel} businesses.`
          : isAbove
            ? `You're ${diff} points above the ${industryLabel} average \u2014 you have a head start.`
            : `You're ${Math.abs(diff)} points below the ${industryLabel} average \u2014 there's significant room to gain a competitive edge.`}
      </p>
    </motion.div>
  );
}
