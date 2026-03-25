import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Clock, PhoneCall, TrendingUp } from "lucide-react";

export function ROICalculator() {
  const [leads, setLeads] = useState(100);
  const [manualHours, setManualHours] = useState(20);
  const [missedCalls, setMissedCalls] = useState(30);

  const additionalRevenue = Math.round(missedCalls * 0.3 * 500);
  const hoursSaved = Math.round(manualHours * 0.7);
  const additionalLeads = Math.round(leads * 0.4);
  const monthlySavings = hoursSaved * 50;

  return (
    <section className="py-20 lg:py-28 px-6 bg-white">
      <div className="mx-auto max-w-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
            <Calculator size={14} /> ROI Calculator
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            How Much Could AI Save Your Business?
          </h2>
          <p className="mt-3 text-lg text-content-muted max-w-xl mx-auto">
            Adjust the sliders to see your projected impact.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-4xl rounded-2xl border border-border-light bg-surface-light p-8 lg:p-10 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left — Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-content-primary">
                    Monthly website leads
                  </label>
                  <span className="text-sm font-bold text-accent">{leads}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-border-light accent-accent cursor-pointer"
                  aria-label="Monthly website leads"
                />
                <div className="flex justify-between mt-1 text-xs text-content-muted">
                  <span>10</span>
                  <span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-content-primary">
                    Hours spent on manual work / week
                  </label>
                  <span className="text-sm font-bold text-accent">{manualHours}hrs</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-border-light accent-accent cursor-pointer"
                  aria-label="Hours spent on manual work per week"
                />
                <div className="flex justify-between mt-1 text-xs text-content-muted">
                  <span>5hrs</span>
                  <span>60hrs</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-content-primary">
                    Missed or unanswered calls / month
                  </label>
                  <span className="text-sm font-bold text-accent">{missedCalls}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={missedCalls}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-border-light accent-accent cursor-pointer"
                  aria-label="Missed or unanswered calls per month"
                />
                <div className="flex justify-between mt-1 text-xs text-content-muted">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Right — Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border-light bg-white p-5 text-center">
                <DollarSign size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-2xl font-extrabold text-content-primary">
                  ${additionalRevenue.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-content-muted">Potential revenue recovered / mo</p>
              </div>
              <div className="rounded-xl border border-border-light bg-white p-5 text-center">
                <Clock size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-2xl font-extrabold text-content-primary">{hoursSaved}hrs</p>
                <p className="mt-1 text-xs text-content-muted">Hours saved weekly</p>
              </div>
              <div className="rounded-xl border border-border-light bg-white p-5 text-center">
                <PhoneCall size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-2xl font-extrabold text-content-primary">+{additionalLeads}</p>
                <p className="mt-1 text-xs text-content-muted">Additional leads / mo</p>
              </div>
              <div className="rounded-xl border border-border-light bg-white p-5 text-center">
                <TrendingUp size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-2xl font-extrabold text-content-primary">
                  ${monthlySavings.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-content-muted">Monthly labor savings</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center border-t border-border-light pt-6">
            <p className="text-sm text-content-muted mb-3">
              Want to see how these numbers apply to your specific business?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow"
            >
              Get Your Custom Estimate
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
