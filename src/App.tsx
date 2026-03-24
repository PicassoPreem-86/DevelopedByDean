import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { TrustStrip } from "./sections/TrustStrip";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <div className="h-screen" />
      </main>
    </>
  );
}
