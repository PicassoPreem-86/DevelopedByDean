import { SEO } from "../components/SEO";
import { Hero } from "../sections/Hero";
import { CertificationBar } from "../sections/CertificationBar";
import { TrustStrip } from "../sections/TrustStrip";
import { StatsBar } from "../sections/StatsBar";
import { PainSolution } from "../sections/PainSolution";
import { Testimonials } from "../sections/Testimonials";
import { ProcessSteps } from "../sections/ProcessSteps";
import { ScarcityBanner } from "../sections/ScarcityBanner";
import { FinalCTA } from "../sections/FinalCTA";

export function HomePage() {
  return (
    <>
      <SEO
        path="/"
        description="I build AI voice agents, smart websites, and workflow automations that help businesses capture more leads, close more sales, and save hours every week."
      />
      <Hero />
      <CertificationBar />
      <TrustStrip />
      <StatsBar />
      <PainSolution />
      <Testimonials />
      <ProcessSteps />
      <ScarcityBanner />
      <FinalCTA />
    </>
  );
}
