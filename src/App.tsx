import { GrainOverlay } from "./components/GrainOverlay";
import { Navbar } from "./sections/Navbar";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main className="relative">
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="font-display text-5xl font-bold gradient-text">DevelopedByDean</h1>
        </div>
      </main>
    </>
  );
}
