import { Hero } from "../sections/Hero";
import { TrustStrip } from "../sections/TrustStrip";
import { StatsBar } from "../sections/StatsBar";
import { PainSolution } from "../sections/PainSolution";
import { Certifications } from "../sections/Certifications";
import { TechStack } from "../sections/TechStack";
import { ScarcityBanner } from "../sections/ScarcityBanner";
import { FinalCTA } from "../sections/FinalCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StatsBar />
      <PainSolution />
      <Certifications />
      <TechStack />
      <ScarcityBanner />
      <FinalCTA />
    </>
  );
}
