import { GrainOverlay } from "./components/GrainOverlay";
import { GridOverlay } from "./components/GridOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Portfolio } from "./sections/Portfolio";
import { Process } from "./sections/Process";
import { InteractiveDemo } from "./sections/InteractiveDemo";
import { About } from "./sections/About";

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
        <Process />
        <InteractiveDemo />
        <About />
        <div className="h-screen bg-bg-primary" />
      </main>
    </>
  );
}
