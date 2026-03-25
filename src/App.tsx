import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { TrustStrip } from "./sections/TrustStrip";
import { StatsBar } from "./sections/StatsBar";
import { PainSolution } from "./sections/PainSolution";
import { Results } from "./sections/Results";
import { ROICalculator } from "./sections/ROICalculator";
import { Process } from "./sections/Process";
import { TechStack } from "./sections/TechStack";
import { FAQ } from "./sections/FAQ";
import { ScarcityBanner } from "./sections/ScarcityBanner";
import { FinalCTA } from "./sections/FinalCTA";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <StatsBar />
        <PainSolution />
        <Results />
        <ROICalculator />
        <Process />
        <TechStack />
        <FAQ />
        <ScarcityBanner />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
