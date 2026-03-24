import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-bg-primary">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-2xl">
        <SectionHeading title="Let's Build Something" subtitle="Tell me about your project and I'll get back to you within 24 hours." />
        {status === "success" ? (
          <motion.div className="rounded-2xl border border-accent-cyan/30 bg-accent-cyan/5 p-10 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle size={48} className="mx-auto mb-4 text-accent-cyan" />
            <h3 className="mb-2 font-display text-2xl font-bold text-text-primary">Message Sent</h3>
            <p className="text-text-secondary">Thanks for reaching out. I'll be in touch soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">Name</label>
              <input type="text" id="name" name="name" required className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary/40 transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">Email</label>
              <input type="email" id="email" name="email" required className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary/40 transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-text-secondary">Project Type</label>
              <select id="projectType" name="projectType" required className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet appearance-none" defaultValue="">
                <option value="" disabled>Select a project type</option>
                <option value="Website">Website</option>
                <option value="AI Agent">AI Agent</option>
                <option value="Voice Agent">Voice Agent</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-secondary">Message</label>
              <textarea id="message" name="message" required rows={5} className="w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary/40 transition-colors focus:border-accent-violet focus:outline-none focus:ring-1 focus:ring-accent-violet resize-none" placeholder="Tell me a bit about what you need" />
            </div>
            {status === "error" && (
              <div className="flex items-center gap-2 text-accent-rose text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please try again or email me directly.
              </div>
            )}
            <motion.button type="submit" disabled={status === "submitting"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent px-8 py-4 font-display text-lg font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-60 disabled:cursor-not-allowed" whileTap={{ scale: 0.98 }}>
              {status === "submitting" ? (
                <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />Sending...</>
              ) : (
                <>Send It <Send size={18} /></>
              )}
            </motion.button>
          </form>
        )}
        <div className="mt-12 text-center">
          <p className="text-sm text-text-secondary">Or email me directly at{" "}
            <a href="mailto:hello@developedbydean.com" className="text-accent-violet hover:text-accent-cyan transition-colors">hello@developedbydean.com</a>
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {[
              { label: "GitHub", icon: Github, href: "https://github.com" },
              { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
              { label: "X / Twitter", icon: Twitter, href: "https://x.com" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary" aria-label={link.label}>
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
