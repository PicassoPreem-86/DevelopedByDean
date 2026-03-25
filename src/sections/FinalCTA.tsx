import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function FinalCTA() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border-light bg-white px-4 py-3 text-sm text-content-primary placeholder:text-content-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <section id="contact" className="py-20 lg:py-28 px-6 bg-surface-light">
      <div className="mx-auto max-w-container">
        <motion.div
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 rounded-2xl p-8 lg:p-14 shadow-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Copy + Calendly link */}
            <div>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
                Ready to Get Ahead of Your Competitors?
              </h2>
              <p className="mt-4 text-lg text-content-body">
                Let's build your custom AI system and start driving more leads, sales, and free time — starting now.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Free 30-min strategy call",
                  "No commitment needed",
                  "Personalized plan for your business",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-content-body">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-xs text-content-muted">🔥 Spots filling up — let's talk ASAP!</p>
            </div>

            {/* Right — Contact form */}
            <div>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-content-primary">Message received!</h3>
                    <p className="mt-2 text-sm text-content-muted max-w-xs">
                      I'll review your project details and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                        What do you need?
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="" disabled>Select a project type</option>
                        <option value="AI Voice Agent">AI Voice Agent</option>
                        <option value="Website / Landing Page">Website / Landing Page</option>
                        <option value="Workflow Automation">Workflow Automation</option>
                        <option value="Custom App / Tool">Custom App / Tool</option>
                        <option value="Not Sure Yet">Not Sure Yet</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                        Tell me about your project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="What are you trying to build or improve?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again or book a call directly.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
