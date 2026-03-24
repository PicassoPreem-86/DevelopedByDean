import { GrainOverlay } from "./components/GrainOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Portfolio } from "./sections/Portfolio";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
      </main>
    </>
  );
}
