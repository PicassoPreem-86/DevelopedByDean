import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageSquare, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SeoLandingStructuredData } from "../components/SeoLandingStructuredData";
import type { SeoPageDefinition } from "../data/seoPages";
import { FinalCTA } from "../sections/FinalCTA";

interface SeoLandingPageProps {
  page: SeoPageDefinition;
}

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: page.intro, href: page.path.split("/").slice(0, 2).join("/") || "/" },
    { label: page.title },
  ];

  const tldrText =
    page.tldr ??
    `${page.title} is a service from DevelopedByDean for ${
      page.idealFor[0]?.toLowerCase() ?? "businesses"
    }. ${page.heroDescription}`;

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.description}
        path={page.path}
        keywords={[page.primaryKeyword, ...page.secondaryKeywords]}
      />
      <SeoLandingStructuredData page={page} />

      <section className="relative overflow-hidden bg-hero px-6 pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative mx-auto max-w-container">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="grid gap-10 lg:grid-cols-[1.4fr,0.9fr] lg:items-start">
            <div>
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {page.eyebrow}
              </motion.p>
              <motion.h1
                className="max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {page.heroTitle}
              </motion.h1>
              <motion.p
                className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {page.heroDescription}
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
                >
                  Schedule a Strategy Call <ArrowRight size={16} />
                </a>
                <a
                  href="#see-the-work"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  See Results
                </a>
              </motion.div>
            </div>

            <motion.aside
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                Best Fit
              </p>
              <ul className="mt-4 space-y-3">
                {page.idealFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-light" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="bg-surface-light px-6 py-10 lg:py-12">
        <div className="mx-auto max-w-container">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            In short
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-content-body">
            {tldrText}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-container">
          <p className="max-w-3xl text-lg leading-relaxed text-content-body">
            {page.description}
          </p>
        </div>
      </section>

      <section className="bg-surface-light px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border-light bg-white p-6">
            <h2 className="text-lg font-bold text-content-primary">What This Helps You Achieve</h2>
            <ul className="mt-5 space-y-3">
              {page.outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-content-body">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border-light bg-white p-6">
            <h2 className="text-lg font-bold text-content-primary">What I Build</h2>
            <ul className="mt-5 space-y-3">
              {page.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-content-body">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border-light bg-white p-6">
            <h2 className="text-lg font-bold text-content-primary">How Engagements Usually Run</h2>
            <ol className="mt-5 space-y-3">
              {page.process.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-content-body">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Assessment CTA Banner */}
      <section className="bg-white px-6 py-10 lg:py-14">
        <div className="mx-auto max-w-container">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-accent/10 bg-accent/[0.03] p-6 text-center sm:flex-row sm:text-left lg:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
              <ClipboardCheck size={22} className="text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-content-primary">Not sure where to start?</h2>
              <p className="mt-1 text-sm leading-relaxed text-content-body">
                Take the free AI Readiness Assessment to find out which systems would have the biggest impact on your business.
              </p>
            </div>
            <Link
              to="/assessment"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
            >
              Take the Assessment <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Demo Proof */}
      <section id="see-the-work" className="bg-surface-light px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-3xl border border-border-light bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              See the Work
            </p>
            <h2 className="mt-4 text-2xl font-bold text-content-primary">
              This site is the proof.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-content-body">
              The AI chat assistant in the corner, the SEO architecture powering this page, the lead capture
              system, the conversion flow &mdash; I designed and built every piece of it. Try the chat widget
              yourself and see what an AI-powered system actually feels like.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 text-sm leading-relaxed text-content-body">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Live AI chat trained on real business context</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed text-content-body">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Automated lead capture and routing built into the conversation</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed text-content-body">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>SEO-optimized page architecture generating organic traffic right now</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border-light bg-hero p-6 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <MessageSquare size={20} className="text-accent-light" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">
              Try the AI assistant right now.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Open the chat widget in the bottom corner and ask anything about my services.
              That&rsquo;s the same type of system I build for clients &mdash; qualified lead capture,
              smart routing, and real answers, running 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Common Questions
            </p>
            <div className="mt-6 space-y-4">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-border-light bg-surface-light p-6">
                  <h2 className="text-lg font-bold text-content-primary">{faq.question}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-content-body">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-border-light bg-surface-light p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-content-muted">
              Keep Exploring
            </p>
            <div className="mt-5 space-y-3">
              {page.links.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-border-light bg-white px-4 py-4 text-sm font-semibold text-content-primary transition-all hover:border-accent/30 hover:shadow-card"
                >
                  <span>{item.label}</span>
                  <ArrowRight size={15} className="text-content-muted transition-colors group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
