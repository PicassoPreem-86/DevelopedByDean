import { SEO } from "../components/SEO";
import { Process } from "../sections/Process";
import { ScarcityBanner } from "../sections/ScarcityBanner";
import { FinalCTA } from "../sections/FinalCTA";

export function ProcessPage() {
  return (
    <>
      <SEO
        title="How It Works"
        path="/process"
        description="My simple 4-step process: free strategy call, custom plan, build and launch, then optimize and scale. Fast, personal, and done-for-you."
      />
      <Process />
      <ScarcityBanner />
      <FinalCTA />
    </>
  );
}
