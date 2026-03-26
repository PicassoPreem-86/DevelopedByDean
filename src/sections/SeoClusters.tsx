import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { industryPages, servicePages } from "../data/seoPages";

export function SeoClusters() {
  return (
    <section className="bg-white px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Explore by Intent
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.8vw,2.8rem)] font-extrabold leading-tight text-content-primary">
              Service Pages and Industry Pages Built for Search Intent
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-content-body">
              If you are evaluating specific AI services or trying to solve a problem inside a
              particular business model, start with the pages below. They are built to answer
              the actual buyer questions behind the search.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-border-light bg-surface-light p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-content-muted">
                Services
              </p>
              <div className="mt-5 space-y-3">
                {servicePages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="group flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-content-primary shadow-sm transition-all hover:shadow-card"
                  >
                    <span>{page.title}</span>
                    <ArrowRight size={15} className="text-content-muted group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border-light bg-surface-light p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-content-muted">
                Industries
              </p>
              <div className="mt-5 space-y-3">
                {industryPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="group flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-content-primary shadow-sm transition-all hover:shadow-card"
                  >
                    <span>{page.title}</span>
                    <ArrowRight size={15} className="text-content-muted group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
