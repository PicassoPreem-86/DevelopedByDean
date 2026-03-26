import { motion } from "framer-motion";
import { Mic, Layout, Zap, AppWindow, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const painPoints = [
  { text: "Missing calls & leads", solution: "I build AI voice agents that never miss an opportunity" },
  { text: "Low website conversions", solution: "I create AI-powered websites that sell for you 24/7" },
  { text: "Repetitive manual work", solution: "I automate it and give you hours back every week" },
  { text: "No follow-up systems", solution: "I build smart AI systems that nurture & close leads" },
];

const services = [
  { title: "AI Voice Agents", description: "Answer calls, book appointments, qualify leads", icon: Mic, href: "/services/ai-voice-agents" },
  { title: "AI Websites & Landing Pages", description: "Convert visitors into customers on autopilot", icon: Layout, href: "/services/ai-websites" },
  { title: "Workflow Automation", description: "Replace manual tasks & save 20+ hours/week", icon: Zap, href: "/services/workflow-automation" },
  { title: "Custom AI Apps & Tools", description: "Dashboards, CRMs, internal tools, & more", icon: AppWindow, href: "/services/lead-generation-systems" },
];

export function PainSolution() {
  return (
    <section id="services" className="py-20 lg:py-28 px-6 bg-white border-t border-border-light">
      <div className="mx-auto max-w-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — Pain + Solution */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">WHY WORK WITH ME?</span>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
                Most Businesses Are Leaving Money on the Table.
                <br />
                I Fix That With AI.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-content-body">
                If you're losing leads, wasting time on manual work, or struggling to scale — AI can change that fast.
              </p>
            </motion.div>

            <div className="mt-10 space-y-4">
              {painPoints.map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-[15px] text-content-primary leading-relaxed">
                    <span className="font-semibold">{item.text}</span>
                    {" → "}
                    {item.solution}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Outcome box */}
            <motion.div
              className="mt-8 rounded-xl bg-accent/5 border border-accent/10 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
                The result?
              </p>
              <p className="mt-1 text-sm text-content-body font-medium">
                More booked calls, more sales, and more free time — without hiring more staff.
              </p>
            </motion.div>
          </div>

          {/* Right — What I Can Do For You card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-border-light bg-surface-light p-6 shadow-card">
              <h3 className="mb-6 text-lg font-bold text-content-primary">What I Can Do For You</h3>
              <div className="space-y-1">
                {services.map((service, i) => (
                  <Link
                    key={service.title}
                    to={service.href}
                    className="group block"
                  >
                    <motion.div
                      className="flex items-center gap-4 rounded-xl p-4 transition-all hover:bg-white hover:shadow-card cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <service.icon size={18} className="text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-content-primary">{service.title}</p>
                        <p className="text-xs text-content-muted">{service.description}</p>
                      </div>
                      <ChevronRight size={16} className="text-content-muted/40 group-hover:text-accent transition-colors shrink-0" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
