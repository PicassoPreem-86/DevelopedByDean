import { SEO } from "../components/SEO";
import { Results } from "../sections/Results";
import { ScarcityBanner } from "../sections/ScarcityBanner";
import { FinalCTA } from "../sections/FinalCTA";

export function ResultsPage() {
  return (
    <>
      <SEO
        title="Results"
        path="/results"
        description="See the real results my AI systems deliver — 40-60% more booked calls, 2-5x increase in sales, 20-40 hours saved weekly, and 3-10x ROI in month one."
      />
      <Results />
      <ScarcityBanner />
      <FinalCTA />
    </>
  );
}
