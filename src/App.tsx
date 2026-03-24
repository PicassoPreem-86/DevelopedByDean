import { GrainOverlay } from "./components/GrainOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
