import { useGsapReveal } from "../hooks/useGsapReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  const ref = useGsapReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 data-reveal className="font-display text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className={`mt-4 max-w-2xl text-lg text-text-secondary md:text-xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
