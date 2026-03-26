import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
                {page.eyebrow}
              </p>
              <h1 className="max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                {page.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
                >
                  Schedule a Strategy Call <ArrowRight size={16} />
                </Link>
                <Link
                  to="/results"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  See Results
                </Link>
              </div>
            </div>

            <motion.aside
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">
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

      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="max-w-3xl text-lg leading-relaxed text-content-body">
                {page.description}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-content-muted">
                {page.intro === "Industry"
                  ? `This page is built around ${page.primaryKeyword} and related buyer-intent searches so potential clients can find a clear explanation of how the system works, who it is for, and what outcomes to expect.`
                  : `This service page is designed to rank for ${page.primaryKeyword} and connected searches while also making the offer, process, and expected outcomes easy to evaluate.`}
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-surface-light p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-content-muted">
                Related Searches
              </p>
              <ul className="mt-4 space-y-3 text-sm text-content-body">
                {page.secondaryKeywords.map((keyword) => (
                  <li key={keyword} className="rounded-xl bg-white px-4 py-3 shadow-sm">
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-3xl border border-border-light bg-surface-light p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Proof Approach
            </p>
            <h2 className="mt-4 text-2xl font-bold text-content-primary">
              Credibility built from execution, not fabricated logos
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-content-body">
              If public reviews or case studies are not available yet, the honest path is to show
              how the system works, how delivery is structured, and what success will be measured
              against before launch.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 text-sm leading-relaxed text-content-body">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Workflow mapping before production buildout starts</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed text-content-body">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Operational metrics defined before launch so value is measurable</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed text-content-body">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Implementation detail and technical depth instead of vague promises</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border-light bg-hero p-6 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={20} className="text-accent-light" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">
              This framework is ready for real proof as it arrives
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Once live projects are shipping, anonymized workflow notes, screen recordings,
              before-and-after process diagrams, and measurable outcomes can slot straight into
              these pages without rewriting the structure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Search-Focused FAQ
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
