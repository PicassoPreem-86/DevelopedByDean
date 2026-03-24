import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { TrustStrip } from "./sections/TrustStrip";
import { PainSolution } from "./sections/PainSolution";
import { Results } from "./sections/Results";
import { Process } from "./sections/Process";
import { FinalCTA } from "./sections/FinalCTA";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <PainSolution />
        <Results />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
