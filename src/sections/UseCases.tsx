import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageSquare, Mail, CalendarCheck, FileText, Users,
  ShoppingCart, BarChart3, Globe, Bot, Mic, Database,
  Bell, CreditCard, Search, Workflow, ArrowRight, ChevronDown,
  type LucideIcon,
} from "lucide-react";

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
}

const categories = ["All", "Voice & Phone", "Lead Generation", "Automation", "Websites & Apps", "Customer Experience"];

const useCases: UseCase[] = [
  // Voice & Phone
  { icon: Phone, title: "Inbound Call Answering Agent", description: "AI answers your business calls 24/7, qualifies callers, answers FAQs, and books appointments — even after hours.", category: "Voice & Phone" },
  { icon: Mic, title: "Outbound Sales Call Agent", description: "AI calls your leads, delivers a personalized pitch, handles objections, and books qualified prospects on your calendar.", category: "Voice & Phone" },
  { icon: CalendarCheck, title: "Appointment Booking Agent", description: "Handles scheduling over the phone — checks availability, confirms slots, sends reminders, and reschedules no-shows.", category: "Voice & Phone" },
  { icon: Bell, title: "Reminder & Follow-Up Call Agent", description: "Automated calls to remind clients about appointments, payments, renewals, or upcoming deadlines.", category: "Voice & Phone" },

  // Lead Generation
  { icon: MessageSquare, title: "Website Chatbot for Lead Capture", description: "AI chatbot engages visitors, asks qualifying questions, collects contact info, and pushes leads to your CRM in real time.", category: "Lead Generation" },
  { icon: Globe, title: "AI-Powered Landing Pages", description: "High-converting landing pages with smart forms, dynamic content, and instant lead routing based on visitor behavior.", category: "Lead Generation" },
  { icon: Search, title: "Lead Scoring & Qualification System", description: "Automatically scores incoming leads based on fit, urgency, and behavior — so your team only talks to the best ones.", category: "Lead Generation" },
  { icon: Mail, title: "Automated Email Nurture Sequences", description: "AI-written, personalized email flows that warm leads, handle objections, and drive them toward booking or buying.", category: "Lead Generation" },

  // Automation
  { icon: Workflow, title: "CRM Automation & Data Sync", description: "Connect your tools so leads, deals, and client data flow automatically between your CRM, email, calendar, and invoicing.", category: "Automation" },
  { icon: FileText, title: "Invoice & Payment Automation", description: "Auto-generate invoices, send payment reminders, and sync transactions — no more chasing payments manually.", category: "Automation" },
  { icon: Database, title: "Data Entry & Document Processing", description: "AI extracts data from forms, PDFs, emails, and uploads — then organizes it in your systems without manual input.", category: "Automation" },
  { icon: Users, title: "Client Onboarding Automation", description: "Automated welcome emails, intake forms, contract signing, and account setup — new clients onboarded in minutes, not days.", category: "Automation" },

  // Websites & Apps
  { icon: Globe, title: "Custom Business Websites", description: "Fast, modern, mobile-first websites designed to convert visitors into customers — not just look pretty.", category: "Websites & Apps" },
  { icon: BarChart3, title: "Internal Dashboards & Portals", description: "Custom dashboards that give you real-time visibility into leads, revenue, team performance, and client status.", category: "Websites & Apps" },
  { icon: CreditCard, title: "Client Portals & Booking Systems", description: "Branded portals where clients can book, pay, upload documents, track progress, and communicate — all in one place.", category: "Websites & Apps" },
  { icon: ShoppingCart, title: "Ecommerce & Product Pages", description: "Online stores and product pages with AI-powered recommendations, abandoned cart recovery, and conversion optimization.", category: "Websites & Apps" },

  // Customer Experience
  { icon: Bot, title: "AI Customer Support Agent", description: "Handles tier-1 support questions instantly — product info, order status, troubleshooting — and escalates complex issues to humans.", category: "Customer Experience" },
  { icon: MessageSquare, title: "Review & Reputation Management", description: "Automatically request reviews after purchases, respond to feedback, and monitor your online reputation across platforms.", category: "Customer Experience" },
  { icon: Bell, title: "Smart Notification System", description: "Trigger personalized SMS, email, or push notifications based on customer behavior — purchases, inactivity, milestones.", category: "Customer Experience" },
  { icon: Mail, title: "Abandoned Cart & Re-Engagement Flows", description: "Win back lost customers with automated sequences triggered by cart abandonment, lapsed visits, or expired subscriptions.", category: "Customer Experience" },
];

export function UseCases() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCategory === "All" ? useCases : useCases.filter((uc) => uc.category === activeCategory);
  const visible = showAll ? filtered : filtered.slice(0, 9);
  const hasMore = filtered.length > 9 && !showAll;

  return (
    <section id="use-cases" className="pt-28 pb-20 lg:pt-36 lg:pb-28 px-6 bg-white">
      <div className="mx-auto max-w-container">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent">
            Use Cases
          </span>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-content-primary">
            Everything I Can Build for You
          </h1>
          <p className="mt-3 text-lg text-content-muted max-w-2xl mx-auto">
            From voice agents to full websites — here's the complete list of AI systems, automations, and tools I deliver.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`rounded-full px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-md"
                  : "bg-surface-light border border-border-light text-content-muted hover:text-content-primary hover:border-accent/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {visible.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="group rounded-2xl border border-border-light bg-surface-light p-6 transition-all duration-300 hover:shadow-card-hover hover:border-accent/20"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                    <uc.icon size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] sm:text-[15px] font-bold text-content-primary mb-1.5">{uc.title}</h3>
                    <p className="text-sm leading-relaxed text-content-muted">{uc.description}</p>
                    <span className="mt-3 inline-block rounded-full bg-accent/[0.06] px-3 py-0.5 text-[11px] font-semibold text-accent">
                      {uc.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show more */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-light px-6 py-2.5 text-sm font-semibold text-content-muted hover:text-content-primary hover:border-accent/30 transition-all"
            >
              Show all {filtered.length} use cases <ChevronDown size={14} />
            </button>
          </div>
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-sm text-content-muted mb-3">
            Need something custom? I build solutions tailored to your exact workflow.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            Let's talk about what you need <ArrowRight size={14} />
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="rounded-full border border-border-light bg-surface-light px-4 py-2 text-xs font-semibold text-content-primary hover:border-accent/30"
            >
              Browse AI services
            </Link>
            <Link
              to="/industries"
              className="rounded-full border border-border-light bg-surface-light px-4 py-2 text-xs font-semibold text-content-primary hover:border-accent/30"
            >
              Browse industry pages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
