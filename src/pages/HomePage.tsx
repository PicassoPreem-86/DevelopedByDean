import { SEO } from "../components/SEO";
import { Hero } from "../sections/Hero";
import { TrustStrip } from "../sections/TrustStrip";
import { StatsBar } from "../sections/StatsBar";
import { SeoClusters } from "../sections/SeoClusters";
import { TechStack } from "../sections/TechStack";
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
      <TrustStrip />
      <StatsBar />
<SeoClusters />
      <TechStack />
<ScarcityBanner />
      <FinalCTA />
    </>
  );
}
