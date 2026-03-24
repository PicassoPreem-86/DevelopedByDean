import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "How much does this cost?", a: "Every project is custom, so pricing depends on scope. Most projects range from $3K–$15K. I'll give you a clear quote after our free strategy call — no surprises." },
  { q: "How long does a project take?", a: "Most projects launch within 2–6 weeks depending on complexity. I'll give you an honest timeline upfront and keep you updated throughout." },
  { q: "Do I need to be technical?", a: "Not at all. I handle all the technical work. You just need to know your business and your goals — I'll translate that into a working system." },
  { q: "What if I'm not sure what I need?", a: "That's exactly what the free strategy call is for. I'll help you identify where AI and automation can have the biggest impact on your business." },
  { q: "Do you offer ongoing support?", a: "Yes. After launch, I offer maintenance and optimization packages so your systems keep performing. I don't just build and disappear." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24 px-6 bg-surface-light">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">FAQ</span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Common Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-border-light bg-white overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="text-[15px] font-semibold text-content-primary pr-4">{faq.q}</span>
                {openIndex === i ? <Minus size={18} className="text-accent shrink-0" /> : <Plus size={18} className="text-content-muted shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
