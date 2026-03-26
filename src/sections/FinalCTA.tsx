import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { CONTACT_EMAIL } from "../../shared/siteConfig";

type FormStatus = "idle" | "submitting" | "success" | "error";

const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() || "/api/contact";

export function FinalCTA() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    location: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", business: "", email: "", phone: "", location: "", preferred_date: "", preferred_time: "", message: "" });
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
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 rounded-2xl p-5 sm:p-8 lg:p-14 shadow-card"
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
                  "Schedule a free strategy call",
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
                    <h3 className="text-xl font-bold text-content-primary">Request received!</h3>
                    <p className="mt-2 text-sm text-content-muted max-w-xs">
                      I'll review your details and confirm your call time within 24 hours.
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
                        <label htmlFor="business" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                          Business Name
                        </label>
                        <input
                          type="text"
                          id="business"
                          name="business"
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          placeholder="Your company"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
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
                    </div>

                    <div>
                      <label htmlFor="location" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                        City / State
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Austin, TX"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="preferred_date" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="preferred_date"
                          name="preferred_date"
                          value={formData.preferred_date}
                          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="preferred_time" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                          Preferred Time
                        </label>
                        <select
                          id="preferred_time"
                          name="preferred_time"
                          value={formData.preferred_time}
                          onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                          className={inputClass}
                        >
                          <option value="">Select a time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-content-muted uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="What challenges is your business facing right now?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500">
                        Something went wrong. Please try again or email{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
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
                          <Send size={16} /> Schedule My Call
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
