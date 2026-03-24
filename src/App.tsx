import { GrainOverlay } from "./components/GrainOverlay";
import { GridOverlay } from "./components/GridOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <GridOverlay />
      <Navbar />
      <main>
        <Hero />
        {/* Spacer for scroll testing */}
        <div className="h-screen bg-bg-surface" />
      </main>
    </>
  );
}
