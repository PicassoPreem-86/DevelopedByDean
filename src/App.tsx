import { GrainOverlay } from "./components/GrainOverlay";
import { GridOverlay } from "./components/GridOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Portfolio } from "./sections/Portfolio";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <GridOverlay />
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Portfolio />
        {/* Spacer for scroll testing */}
        <div className="h-screen bg-bg-primary" />
      </main>
    </>
  );
}
