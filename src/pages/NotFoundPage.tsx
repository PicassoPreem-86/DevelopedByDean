import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { ArrowLeft, Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" description="The page you're looking for doesn't exist." />
      <section className="bg-hero px-6 py-32 lg:py-44">
        <div className="mx-auto max-w-container text-center">
          <p className="text-8xl font-extrabold text-accent/30">404</p>
          <h1 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-white">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover transition-all hover:shadow-glow"
            >
              <Home size={16} /> Back to Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-[15px] font-semibold text-white/70 hover:text-white hover:border-white/20 transition-all"
            >
              <ArrowLeft size={16} /> View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
