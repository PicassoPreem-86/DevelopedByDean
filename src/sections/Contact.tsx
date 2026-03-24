import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterXIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
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
              { label: "GitHub", icon: GithubIcon, href: "https://github.com" },
              { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
              { label: "X / Twitter", icon: TwitterXIcon, href: "https://x.com" },
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
