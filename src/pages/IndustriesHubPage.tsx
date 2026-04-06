import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "../components/SEO";
import { industryPages } from "../data/seoPages";
import { FinalCTA } from "../sections/FinalCTA";

export function IndustriesHubPage() {
  return (
    <>
      <SEO
        title="AI by Industry"
        description="AI solutions by industry for home services, med spas, law firms, real estate, dental practices, insurance agencies, auto dealerships, and fitness studios."
        path="/industries"
      />
      <section className="bg-hero px-6 pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-container">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-light">
            Industry Hub
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
            AI Systems Tailored to How Specific Businesses Actually Operate
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            These pages break down how AI voice agents, lead capture, websites, and automation
            apply to real business models and buyer journeys.
          </p>
        </div>
      </section>
      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-container gap-5 lg:grid-cols-3">
          {industryPages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group rounded-3xl border border-border-light bg-surface-light p-7 transition-all hover:border-accent/25 hover:shadow-card-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {page.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-bold text-content-primary">{page.title}</h2>
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
