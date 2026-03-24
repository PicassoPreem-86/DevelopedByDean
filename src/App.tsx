import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { TrustStrip } from "./sections/TrustStrip";
import { PainSolution } from "./sections/PainSolution";
import { Results } from "./sections/Results";
import { WhyHireMe } from "./sections/WhyHireMe";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <PainSolution />
        <Results />
        <WhyHireMe />
        <div className="h-96" />
      </main>
    </>
  );
}
