import { motion } from "framer-motion";

const tools = [
  { name: "OpenAI", logo: "AI" },
  { name: "Anthropic", logo: "A" },
  { name: "React", logo: "⚛" },
  { name: "Next.js", logo: "N" },
  { name: "Twilio", logo: "T" },
  { name: "Make", logo: "M" },
  { name: "n8n", logo: "n8n" },
  { name: "Vercel", logo: "▲" },
  { name: "Supabase", logo: "S" },
  { name: "Stripe", logo: "$" },
];

export function TechStack() {
  return (
    <section className="py-12 px-6 bg-surface-light border-y border-border-light">
      <div className="mx-auto max-w-container">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-content-muted">
          Built with industry-leading tools &amp; platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="flex items-center gap-2 text-content-muted/60 hover:text-content-muted transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-border-light text-xs font-bold text-content-muted shadow-sm">
                {tool.logo}
              </span>
              <span className="text-sm font-medium hidden sm:block">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
