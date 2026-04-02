import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, Layout, Zap, AppWindow, ChevronRight, CheckCircle2 } from "lucide-react";

const painPoints = [
  { text: "Missing calls and leads", solution: "I build AI voice agents that never miss an opportunity" },
  { text: "Low website conversion", solution: "I create AI-powered sites that sell and qualify around the clock" },
  { text: "Repetitive manual work", solution: "I automate the bottlenecks and give time back every week" },
  { text: "Weak follow-up systems", solution: "I build smarter lead handling and nurture flows that keep momentum moving" },
];

const services = [
  { title: "AI Voice Agents", description: "Answer calls, qualify leads, and book appointments", icon: Mic, href: "/services/ai-voice-agents" },
  { title: "AI Websites", description: "Turn traffic into qualified conversations", icon: Layout, href: "/services/ai-websites" },
  { title: "Workflow Automation", description: "Replace fragmented busywork with connected systems", icon: Zap, href: "/services/workflow-automation" },
  { title: "Lead Generation Systems", description: "Capture, score, route, and follow up automatically", icon: AppWindow, href: "/services/lead-generation-systems" },
];

export function PainSolution() {
  return (
    <section id="services" className="border-t border-border-light bg-white px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
                Why this matters
              </span>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
                Most businesses leak revenue through slow response, weak follow-up, and manual ops.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-content-body">
                The fix is not more tools. It is better systems around calls, websites, lead capture,
                routing, and workflow automation.
              </p>
            </motion.div>

            <div className="mt-10 space-y-4">
              {painPoints.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16, filter: "blur(2px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-500" />
                  <p className="text-[15px] leading-relaxed text-content-primary">
                    <span className="font-semibold">{item.text}</span>
                    <span className="mx-2 inline-block text-accent">&rarr;</span>
                    {item.solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-border-light bg-surface-light p-6 shadow-card">
              <h3 className="mb-6 text-lg font-bold text-content-primary">Core service areas</h3>
              <div className="space-y-1">
                {services.map((service, index) => (
                  <Link key={service.title} to={service.href} className="group block">
                    <motion.div
                      className="flex items-center gap-4 rounded-xl p-4 transition-all hover:bg-white hover:shadow-card"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.18 + index * 0.07 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <service.icon size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-content-primary">{service.title}</p>
                        <p className="text-xs text-content-muted">{service.description}</p>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-content-muted/40 transition-colors group-hover:text-accent" />
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
