import { SectionHeading } from "../components/SectionHeading";
import { ProcessStep } from "../components/ProcessStep";
import { processSteps } from "../data/process";

export function Process() {
  return (
    <section id="process" className="relative py-32 px-6 bg-bg-secondary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="How We Get There" />
        <div className="grid gap-0 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <ProcessStep key={step.id} step={step} index={i} isLast={i === processSteps.length - 1} />
          ))}
        </div>
        <p className="mt-16 text-center text-lg text-text-secondary">
          From first call to live product, most projects launch in 2-4 weeks.
        </p>
      </div>
    </section>
  );
}
