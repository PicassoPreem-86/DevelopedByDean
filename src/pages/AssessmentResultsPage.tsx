import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useAssessment } from "../hooks/useAssessment";
import { SCORE_BANDS } from "../types/assessment";
import { ScoreGauge } from "../components/assessment/ScoreGauge";
import { CategoryBreakdown } from "../components/assessment/CategoryBreakdown";
import { IndustryBenchmark } from "../components/assessment/IndustryBenchmark";

const INDUSTRY_LABELS: Record<string, string> = {
  legal: "Legal",
  accounting: "Accounting & Finance",
  healthcare: "Healthcare",
  construction: "Construction & Trades",
  "professional-services": "Professional Services",
  retail: "Retail & E-commerce",
  "marketing-agency": "Marketing & Agency",
  other: "Small Business",
};

export function AssessmentResultsPage() {
  const navigate = useNavigate();
  const result = useAssessment((s) => s.result);
  const industry = useAssessment((s) => s.industry);
  const leadData = useAssessment((s) => s.leadData);
  const reset = useAssessment((s) => s.reset);

  if (!result || !industry) {
    navigate("/");
    return null;
  }

  const bandInfo = SCORE_BANDS[result.band];
  const industryLabel = INDUSTRY_LABELS[industry] ?? "your industry";
  const firstName = leadData.firstName || "there";

  return (
    <div className="min-h-screen bg-hero">
      {/* Header */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
            DevelopedByDean
          </Link>
          <button
            onClick={() => { reset(); navigate("/assessment"); }}
            className="text-sm text-white/40 hover:text-white/70 font-medium transition-colors"
          >
            Retake assessment
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-white mb-3">
            {firstName}, here's where you stand.
          </h1>
          <p className="text-lg text-white/50">{bandInfo.description}</p>
        </motion.div>

        {/* Score Gauge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex justify-center mb-16">
          <ScoreGauge score={result.overallScore} band={result.band} bandLabel={result.bandLabel} />
        </motion.div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="mb-16">
          <h2 className="text-xl font-bold text-white mb-2">The breakdown</h2>
          <p className="text-white/50 mb-8">How you scored across the five areas that determine AI readiness.</p>
          <CategoryBreakdown categoryScores={result.categoryScores} />
        </motion.div>

        {/* Industry Benchmark */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="mb-20">
          <IndustryBenchmark userScore={result.overallScore} benchmarkScore={result.industryBenchmark} industryLabel={industryLabel} />
        </motion.div>

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="mb-16">
            <h2 className="text-xl font-bold text-white mb-2">Top recommendations</h2>
            <p className="text-white/50 mb-6">Based on your weakest areas, here's where to focus first.</p>
            <div className="space-y-4">
              {result.recommendations.map((rec, i) => (
                <div key={rec.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">{i + 1}</span>
                    <div>
                      <h3 className="text-base font-bold text-white">{rec.title}</h3>
                      <p className="mt-1 text-sm text-white/50 leading-relaxed">{rec.description}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/40">
                        <span>Saves: {rec.estimatedTimeSaved}</span>
                        <span>Cost: {rec.estimatedCost}</span>
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${rec.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400" : rec.difficulty === "medium" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>
                          {rec.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Wins */}
        {result.quickWins.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="mb-20">
            <h2 className="text-xl font-bold text-white mb-2">Quick wins</h2>
            <p className="text-white/50 mb-6">Start here — low effort, high impact.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {result.quickWins.map((qw) => (
                <div key={qw.id} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5">
                  <h3 className="text-sm font-bold text-emerald-400 mb-1">{qw.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{qw.description}</p>
                  <div className="mt-3 flex gap-3 text-xs text-white/40">
                    <span>Saves: {qw.estimatedTimeSaved}</span>
                    <span>Cost: {qw.estimatedCost}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="border-t border-white/[0.06] pt-16 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Now you know where you stand.</h2>
          <p className="text-lg text-white/50 mb-8 max-w-xl leading-relaxed">
            Want to know what to do about it — what's worth investing in, what to skip, and where to start? Let's walk through your results together.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 text-base font-semibold rounded-xl hover:bg-accent-hover hover:shadow-glow transition-all duration-150"
          >
            <Calendar size={18} /> Book a Free Strategy Call <ArrowRight size={16} />
          </Link>
          <p className="text-sm text-white/30 mt-4">30 minutes. No pitch. Just a conversation about your results.</p>
        </motion.div>

        <div className="text-center py-8 text-xs text-white/40 border-t border-white/[0.06]">
          <p>Your data is private and never shared.</p>
        </div>
      </div>
    </div>
  );
}
