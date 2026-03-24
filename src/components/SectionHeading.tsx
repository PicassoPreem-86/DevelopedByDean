interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="font-display text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-text-secondary md:text-xl ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
