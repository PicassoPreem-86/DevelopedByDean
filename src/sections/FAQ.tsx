import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How much does this cost?",
    a: "Every project is custom, so pricing depends on scope and complexity. Most projects range from $3K–$15K. I'll give you a clear, transparent quote after our free strategy call — no hidden fees, no surprises.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects launch within 2–6 weeks depending on complexity. I'll give you an honest timeline upfront and keep you updated with regular progress check-ins throughout.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "Not at all. I handle all the technical work end-to-end. You just need to know your business and your goals — I'll translate that into a working system you can actually use.",
  },
  {
    q: "What if I'm not sure what I need yet?",
    a: "That's exactly what the free strategy call is for. I'll help you identify where AI and automation can have the biggest impact on your business, and we'll go from there.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. After launch, I offer maintenance and optimization packages to make sure your systems keep performing. I don't just build and disappear — I'm invested in your results.",
  },
  {
    q: "What makes you different from an agency?",
    a: "You work directly with me — the person designing and building your system. No account managers, no layers of overhead, no miscommunication. It's faster, more personal, and you get senior-level work at a fraction of agency cost.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-20 lg:py-28 px-6 bg-white">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
            FAQ
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Common Questions
          </h2>
          <p className="mt-3 text-lg text-content-muted">
            Answers to the things people usually ask before getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-border-light bg-surface-light overflow-hidden transition-all hover:shadow-card"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-[15px] font-semibold text-content-primary pr-4">{faq.q}</span>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                    openIndex === i
                      ? "bg-accent text-white"
                      : "bg-border-light text-content-muted"
                  }`}
                >
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-content-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
