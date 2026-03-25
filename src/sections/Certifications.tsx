import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "March 2026",
    verifyUrl: "https://verify.skilljar.com/c/aidd94qcm2f2",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "March 2026",
    verifyUrl: "https://verify.skilljar.com/c/9ajs3gyvetbf",
  },
  {
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "March 2026",
    verifyUrl: "https://verify.skilljar.com/c/u55arn2xvr72",
  },
];

function AnthropicLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.47-3.976H5.69l-1.461 3.976H.667l6.902-16.96zm1.04 3.79L5.2 13.545h4.847L7.61 7.311z" />
    </svg>
  );
}

export function Certifications() {
  return (
    <section className="py-16 lg:py-20 px-6 bg-white border-t border-border-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
            <Award size={14} /> Certified
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-content-primary">
            Anthropic Certified AI Developer
          </h2>
          <p className="mt-2 text-sm text-content-muted max-w-lg mx-auto">
            Verified certifications from the makers of Claude AI.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {certs.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border-light bg-surface-light p-5 transition-all hover:shadow-card-hover hover:border-accent/20"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                  <Award size={18} className="text-accent" />
                </div>
                <ExternalLink
                  size={14}
                  className="text-content-muted/30 group-hover:text-accent transition-colors mt-1"
                />
              </div>
              <h3 className="text-[14px] font-bold text-content-primary leading-snug mb-2">
                {cert.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-content-muted">
                <span className="flex items-center gap-1.5 text-content-muted/70">
                  <AnthropicLogo /> {cert.issuer}
                </span>
                <span className="text-content-muted/30">&bull;</span>
                <span>{cert.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
