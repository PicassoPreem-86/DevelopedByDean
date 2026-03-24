import { motion } from "framer-motion";
import { PhoneOff, Globe, Clock, MailX, Mic, Layout, Zap, AppWindow, ChevronRight } from "lucide-react";

const painPoints = [
  { pain: "Missing calls & leads", solution: "AI voice agents that answer, qualify, and book automatically", icon: PhoneOff, solutionIcon: Mic },
  { pain: "Weak website conversion", solution: "AI-powered sites and landing pages that convert more visitors", icon: Globe, solutionIcon: Layout },
  { pain: "Repetitive admin work", solution: "Automated workflows so your business runs faster", icon: Clock, solutionIcon: Zap },
  { pain: "No follow-up system", solution: "Smart lead workflows that nurture and close opportunities", icon: MailX, solutionIcon: AppWindow },
];

const services = [
  { title: "AI Voice Agents", description: "Answer calls, qualify leads, book appointments — automatically", icon: Mic },
  { title: "AI Websites & Landing Pages", description: "High-converting sites built to capture and convert", icon: Layout },
  { title: "Workflow Automation", description: "Eliminate manual tasks and connect your tools", icon: Zap },
  { title: "Custom Apps & Internal Tools", description: "Dashboards, portals, and systems built for your business", icon: AppWindow },
];

export function PainSolution() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
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
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">The Problem & Solution</span>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
                Most Businesses Are Leaving Money on the Table.{" "}
                <span className="text-accent">I Fix That With AI.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-content-body">
                If you're losing leads, wasting hours on manual work, or struggling to scale efficiently — I build systems that solve that.
              </p>
            </motion.div>

            <div className="mt-10 space-y-5">
              {painPoints.map((item, i) => (
                <motion.div
                  key={item.pain}
                  className="flex items-start gap-4 rounded-xl border border-border-light p-4 transition-all hover:shadow-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
                    <item.icon size={18} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-content-primary">{item.pain}</p>
                    <p className="text-sm text-content-muted">→ {item.solution}</p>
                  </div>
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
              <p className="text-sm font-semibold text-accent">The Outcome?</p>
              <p className="mt-1 text-sm text-content-body">
                More booked calls, better follow-up, higher conversions, and more time back — without hiring extra staff.
              </p>
            </motion.div>
          </div>

          {/* Right — What I Build card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-border-light bg-surface-light p-6 shadow-card">
              <h3 className="mb-6 text-lg font-bold text-content-primary">What I Build</h3>
              <div className="space-y-1">
                {services.map((service, i) => (
                  <motion.div
                    key={service.title}
                    className="group flex items-center gap-4 rounded-xl p-4 transition-all hover:bg-white hover:shadow-card cursor-pointer"
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
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
