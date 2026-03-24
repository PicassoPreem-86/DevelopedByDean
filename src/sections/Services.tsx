import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/ServiceCard";
import { Button } from "../components/Button";
import { services } from "../data/services";

export function Services() {
  const websiteServices = services.filter((s) => s.track === "websites");
  const aiServices = services.filter((s) => s.track === "ai");

  return (
    <section id="services" className="relative py-32 px-6 bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="What I Build" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {websiteServices.map((service, i) => (
            <div key={service.id} className={i === 0 ? "lg:col-span-2" : ""}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
          {aiServices.map((service, i) => (
            <div key={service.id}>
              <ServiceCard service={service} index={i + websiteServices.length} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-text-secondary">Not sure what you need? Let's figure it out together.</p>
          <Button href="#contact" variant="secondary">Let's Chat</Button>
        </div>
      </div>
    </section>
  );
}
