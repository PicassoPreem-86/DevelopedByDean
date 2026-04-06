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
        description="See how AI systems improve lead response, conversion rates, operational efficiency, and revenue visibility for service businesses."
      />
      <Results />
      <ScarcityBanner />
      <FinalCTA />
    </>
  );
}
