import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "../components/SEO";
import { servicePages } from "../data/seoPages";
import { FinalCTA } from "../sections/FinalCTA";

export function ServicesHubPage() {
  return (
    <>
      <SEO
        title="AI Services"
        description="AI services for businesses including voice agents, AI websites, lead generation systems, and workflow automation."
        path="/services"
      />
      <section className="bg-hero px-6 pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-container">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-light">
            Service Hub
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
            AI Services Built Around Growth, Conversion, and Operations
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Explore the core service lines I build for businesses that want more qualified leads,
            cleaner operations, and stronger automation across the customer journey.
          </p>
        </div>
      </section>
      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-5 lg:grid-cols-2">
          {servicePages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group rounded-3xl border border-border-light bg-surface-light p-7 transition-all hover:border-accent/25 hover:shadow-card-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {page.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-bold text-content-primary">{page.heroTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-content-body">{page.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                View page <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
