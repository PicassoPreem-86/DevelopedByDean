import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Mic,
  Layout,
  Zap,
  AppWindow,
  MessageSquare,
  CalendarCheck,
  RefreshCw,
  Send,
  PhoneMissed,
  Clock,
  ClipboardList,
  TrendingDown,
  Phone,
  Wrench,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { FinalCTA } from "../sections/FinalCTA";
import { servicePages, industryPages } from "../data/seoPages";

/* ─── FAQ data ─── */
const faqs = [
  {
    question: "Do I need technical knowledge to work with you?",
    answer:
      "No. I handle all the technical work. You describe what your business needs, review progress, and give feedback. That\u2019s it.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most systems go live in 2\u20136 weeks depending on scope. We define the timeline together on the strategy call.",
  },
  {
    question: "What happens after my system launches?",
    answer:
      "I monitor performance, tune the AI, and optimize based on real data. You\u2019re not left with a system and no support.",
  },
  {
    question: "How is this different from hiring an agency?",
    answer:
      "You work directly with me \u2014 one person who builds, tests, and supports everything. No account managers, no handoffs, no surprise invoices.",
  },
  {
    question: "Can I start with one service and add more later?",
    answer:
      "Yes. Most clients start with the highest-impact system and expand once they see results.",
  },
  {
    question: "What does a strategy call look like?",
    answer:
      "A 20\u201330 minute conversation where we map your workflow, identify where leads or time are leaking, and define what to build first. No pitch deck, no pressure.",
  },
];

/* ─── FAQ structured data ─── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* ─── Service card icons (keyed by slug to prevent misalignment) ─── */
const serviceIconMap: Record<string, typeof Mic> = {
  "ai-voice-agents": Mic,
  "ai-websites": Layout,
  "workflow-automation": Zap,
  "lead-generation-systems": AppWindow,
  "ai-chatbot-development": MessageSquare,
  "ai-appointment-booking": CalendarCheck,
  "crm-automation": RefreshCw,
  "ai-follow-up-systems": Send,
};

/* ─── Pain points data ─── */
const painPoints = [
  {
    icon: PhoneMissed,
    label: "Missed Calls & Leads",
    description:
      "Every unanswered call is revenue walking out the door. After-hours, weekends, lunch breaks \u2014 leads don\u2019t wait.",
  },
  {
    icon: Clock,
    label: "Slow Follow-Up",
    description:
      "The average business takes 47 hours to respond to a lead. By then, your competitor already closed the deal.",
  },
  {
    icon: ClipboardList,
    label: "Manual Busywork",
    description:
      "Copy-pasting between tools, chasing invoices, updating spreadsheets \u2014 hours lost every week on tasks a system should handle.",
  },
  {
    icon: TrendingDown,
    label: "Weak Online Presence",
    description:
      "Your website looks like a brochure instead of a sales engine. Visitors leave without converting because nothing captures their attention.",
  },
];

/* ─── Process steps data ─── */
const processSteps = [
  {
    number: "01",
    title: "Discovery",
    icon: Phone,
    description:
      "We map your workflow, identify where leads leak, and define what to build first.",
  },
  {
    number: "02",
    title: "Build",
    icon: Wrench,
    description:
      "I design and build your system in 2\u20136 weeks with regular check-ins, not radio silence.",
  },
  {
    number: "03",
    title: "Launch",
    icon: Rocket,
    description:
      "Your system goes live with real monitoring. I tune performance based on actual data.",
  },
];

/* ─── Stats data ─── */
const stats = [
  { end: 15, prefix: "", suffix: "+", label: "Projects Delivered" },
  { end: 500, prefix: "", suffix: "+", label: "Hours Saved for Clients" },
  { end: 100, prefix: "", suffix: "%", label: "Client Satisfaction" },
  { end: 2, prefix: "<", suffix: " Weeks", label: "Avg Delivery Time" },
];

/* ─── CountUp component ─── */
function CountUp({ end, prefix, suffix }: { end: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const steps = 40;
    const increment = end / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   ServicesHubPage
   ═══════════════════════════════════════════════ */

export function ServicesHubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <>
      <SEO
        title="AI Services for Businesses — Voice Agents, Websites, Automation"
        description="Custom AI services for small businesses: voice agents, websites, workflow automation, and lead generation systems. Work directly with a certified AI developer."
        path="/services"
        keywords={[
          "AI services for businesses",
          "AI automation consultant",
          "AI voice agent development",
          "AI website development",
          "business workflow automation",
          "AI lead generation systems",
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Section 1: Hero ── */}
      <section className="bg-hero px-6 pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-container">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest text-accent-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            AI Services for Growing Businesses
          </motion.p>
          <motion.h1
            className="mt-4 max-w-4xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stop Losing Revenue to Slow Response, Weak Follow-Up, and Manual Operations
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build AI systems that answer calls, convert website visitors, automate operations, and
            generate qualified leads — so your business grows without adding headcount. You work
            directly with me — no agency layers, no handoffs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-glow"
            >
              <Calendar size={16} />
              Book a Free Strategy Call
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Pain Points Strip ── */}
      <section className="bg-surface-light px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-container">
          <motion.p
            className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-content-body"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            Most small businesses lose revenue every day to problems they already know exist but
            haven't fixed yet. Inbound calls go unanswered after hours. Leads go cold because
            follow-up takes too long. Teams waste hours every week on repetitive admin that a system
            should handle. Your website collects visits but doesn't convert them into customers.
            These aren't technology problems — they're system problems. And they have system-level
            fixes that work around the clock without adding headcount or complexity.
          </motion.p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.label}
                className="rounded-xl border border-border-light bg-white p-5"
                initial={{ opacity: 0, x: -16, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <point.icon size={18} className="text-accent" />
                </div>
                <p className="text-sm font-bold text-content-primary">{point.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-content-muted">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Services Grid ── */}
      <section className="bg-white px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-container">
          <motion.div
            className="mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
              What I Build
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
              AI Systems That Drive Revenue, Save Time, and Scale Operations
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-content-body">
              Every business I work with gets a system built around their specific workflow — not a
              template, not a demo, not a proof of concept. These are production-grade{" "}
              <Link to="/services/ai-voice-agents" className="font-medium text-accent hover:underline">
                AI voice agents
              </Link>
              ,{" "}
              <Link to="/services/ai-chatbot-development" className="font-medium text-accent hover:underline">
                chatbots
              </Link>
              ,{" "}
              <Link to="/services/ai-websites" className="font-medium text-accent hover:underline">
                conversion-focused websites
              </Link>
              ,{" "}
              <Link to="/services/workflow-automation" className="font-medium text-accent hover:underline">
                workflow automations
              </Link>
              ,{" "}
              <Link to="/services/crm-automation" className="font-medium text-accent hover:underline">
                CRM automation
              </Link>
              ,{" "}
              <Link to="/services/ai-appointment-booking" className="font-medium text-accent hover:underline">
                booking systems
              </Link>
              ,{" "}
              <Link to="/services/ai-follow-up-systems" className="font-medium text-accent hover:underline">
                follow-up automation
              </Link>
              , and{" "}
              <Link to="/services/lead-generation-systems" className="font-medium text-accent hover:underline">
                lead generation systems
              </Link>{" "}
              designed to make money, save time, and run without constant attention. I handle
              strategy, development, integration, and optimization — you stay focused on running your
              business.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-2">
            {servicePages.map((page, i) => {
              const Icon = serviceIconMap[page.slug] ?? AppWindow;
              return (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.45,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={page.path}
                    className="group block rounded-2xl border border-border-light bg-surface-light p-7 shadow-card transition-all hover:border-accent/20 hover:shadow-card-hover"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-content-primary">{page.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-content-body">
                      {page.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {page.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2 text-sm text-content-muted"
                        >
                          <ArrowRight
                            size={12}
                            className="mt-1 shrink-0 text-accent"
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-block text-sm font-semibold text-accent">
                      Learn more &rarr;
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: How It Works ── */}
      <section
        ref={processRef}
        className="border-t border-border-light bg-white px-6 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-container">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
              How It Works
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
              From First Call to Live System in Three Steps
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-content-body">
              No bloated timelines, no mystery process. Here is exactly how we go from conversation
              to a system that runs.
            </p>
          </motion.div>

          <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
            {/* Scroll-linked connector line — desktop only */}
            <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-[2px] bg-border-light lg:block">
              <motion.div
                className="h-full origin-left bg-accent"
                style={{ width: lineWidth }}
              />
            </div>

            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                    <step.icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                      Step {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-content-primary">{step.title}</h3>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-content-body">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Industry Fit ── */}
      <section className="bg-hero px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-container">
          <motion.div
            className="mb-12 max-w-2xl"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent-light">
              Built for Your Industry
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-white">
              AI Systems Designed Around How Your Business Actually Runs
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              Whether you run a service business, medical practice, dealership, fitness studio, or
              professional firm, the systems are built around your specific workflow — not a
              one-size-fits-all template.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {industryPages.map((page, i) => (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <Link
                  to={page.path}
                  className="group block rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all hover:border-accent/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
                    {page.eyebrow}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-white">{page.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{page.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent-light">
                    See how &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Stats Strip ── */}
      <section className="bg-surface-light px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.45,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <p className="text-2xl font-extrabold text-accent sm:text-3xl lg:text-4xl">
                  <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs text-content-muted sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: FAQ ── */}
      <section className="bg-white px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-container">
          <motion.div
            className="mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
              Common Questions
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight text-content-primary">
              What Business Owners Ask Before Getting Started
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.question}
                  className="rounded-xl border border-border-light bg-surface-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <button
                    id={`faq-question-${i}`}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="pr-4 text-[15px] font-semibold text-content-primary">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown size={18} className="text-content-muted" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-content-body">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 8: Final CTA ── */}
      <FinalCTA />
    </>
  );
}
