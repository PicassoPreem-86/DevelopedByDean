import { SEO } from "../components/SEO";
import { UseCases } from "../sections/UseCases";
import { ScarcityBanner } from "../sections/ScarcityBanner";
import { FinalCTA } from "../sections/FinalCTA";

export function UseCasesPage() {
  return (
    <>
      <SEO
        title="AI Use Cases"
        path="/use-cases"
        description="Explore 20+ AI solutions I build for businesses — voice agents, chatbots, lead generation, workflow automation, custom websites, and customer experience tools."
      />
      <UseCases />
      <ScarcityBanner />
      <FinalCTA />
    </>
  );
}
