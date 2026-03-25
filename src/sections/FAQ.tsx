import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "How does pricing work?",
    a: "Every project is scoped individually based on your goals and what we're building together. After our free strategy call, I'll send you a clear, transparent proposal — no vague estimates, no surprise invoices.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects launch within 2–6 weeks depending on complexity. I'll give you an honest timeline upfront and keep you updated with regular check-ins so you always know where things stand.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "Not at all. I handle everything from strategy to deployment. You bring the business knowledge and goals — I'll translate that into a working system you can actually use and understand.",
  },
  {
    q: "What if I'm not sure what I need yet?",
    a: "That's exactly what the free strategy call is for. Most clients come in with a rough idea. I'll help you identify where AI and automation can make the biggest impact and map out the smartest path forward.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Absolutely. I offer ongoing maintenance and optimization to make sure your systems keep performing. I'm invested in your long-term results — I don't just build and disappear.",
  },
  {
    q: "What makes you different from hiring an agency?",
    a: "You work directly with me — the person designing and building your system. No account managers, no handoffs, no miscommunication. It's faster, more personal, and you get senior-level execution without the agency markup.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-20 lg:py-28 px-6 bg-hero">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
            <MessageCircle size={14} /> Questions & Answers
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-white">
            Everything You Need to Know
          </h2>
          <p className="mt-3 text-lg text-white/50 max-w-lg mx-auto">
            Straightforward answers — no jargon, no runaround.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? "border-accent/30 bg-white/[0.07] shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                  : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05]"
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-4 sm:p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="flex items-center gap-4">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors duration-300 ${
                    openIndex === i ? "bg-accent text-white" : "bg-white/[0.06] text-white/30"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-semibold text-white">{faq.q}</span>
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 ml-4"
                >
                  <ChevronDown size={18} className={`transition-colors duration-300 ${openIndex === i ? "text-accent" : "text-white/20"}`} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-4 pb-4 pl-4 sm:px-6 sm:pb-6 sm:pl-[4.5rem]">
                      <p className="text-sm leading-relaxed text-white/50">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm text-white/30">
            Still have questions?{" "}
            <a href="#contact" className="text-accent hover:text-accent-light transition-colors font-medium">
              Let's talk →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
