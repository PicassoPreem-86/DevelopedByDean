import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import { useAssessment } from "../hooks/useAssessment";
import { apiEndpoints, postJson } from "../lib/api";

export function EmailCapturePage() {
  const navigate = useNavigate();
  const setLeadData = useAssessment((s) => s.setLeadData);
  const result = useAssessment((s) => s.result);
  const industry = useAssessment((s) => s.industry);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!result) {
    navigate("/assessment");
    return null;
  }

  function validateEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim()) { setError("Please enter your first name."); return; }
    if (!email.trim() || !validateEmail(email)) { setError("Please enter a valid email address."); return; }

    setIsSubmitting(true);

    setLeadData({
      firstName: firstName.trim(),
      email: email.trim(),
      companyName: companyName.trim() || undefined,
    });

    // Submit lead through the server-side capture endpoint
    if (result) {
      try {
        await postJson(apiEndpoints.assessment, {
          name: firstName.trim(),
          email: email.trim(),
          company: companyName.trim() || "Not provided",
          industry: industry || "Not provided",
          overall_score: result.overallScore,
          band: result.bandLabel,
          message: `Assessment completed. Score: ${result.overallScore}/100 (${result.bandLabel}). Categories: ${result.categoryScores.map((c) => `${c.label}: ${c.score}`).join(", ")}`,
        });
      } catch {
        // Silent fail — don't block the user from seeing results
      }
    }

    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);
    navigate("/assessment/results");
  }

  const inputClass = "w-full px-4 py-3.5 border-2 border-white/[0.08] bg-white/[0.03] rounded-xl text-[16px] sm:text-sm text-white placeholder:text-white/25 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all";

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ClipboardCheck size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-white mb-2">
            Your results are ready
          </h1>
          <p className="text-white/50 text-lg">
            Enter your details to see your personalized AI Readiness Report.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-white/40 uppercase tracking-wide mb-1.5">First name</label>
            <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white/40 uppercase tracking-wide mb-1.5">Work email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-xs font-semibold text-white/40 uppercase tracking-wide mb-1.5">Company name <span className="text-white/20">(optional)</span></label>
            <input id="companyName" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" className={inputClass} />
          </div>

          {error && <p className="text-amber-400 text-sm bg-amber-400/10 px-4 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-white px-8 py-4 text-base font-semibold rounded-xl hover:bg-accent-hover hover:shadow-glow transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Preparing your report..." : "See My Results"}
          </button>

          <p className="text-xs text-white/20 text-center">
            We'll send your full report to this email. No spam, ever.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
