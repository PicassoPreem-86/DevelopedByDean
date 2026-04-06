import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { end: 15, prefix: "", suffix: "+", label: "Projects Delivered", decimal: false },
  { end: 500, prefix: "", suffix: "+", label: "Hours Saved for Clients", decimal: false },
  { end: 0, prefix: "", suffix: "", label: "Refund Requests", decimal: false },
  { end: 1, prefix: "<", suffix: " Week", label: "to First Prototype", decimal: false },
];

function CountUp({
  end,
  prefix,
  suffix,
  decimal,
}: {
  end: number;
  prefix: string;
  suffix: string;
  decimal?: boolean;
}) {
  const [count, setCount] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (count === null) return;
    if (count >= end) return;
    let current = count;
    const steps = 40;
    const increment = end / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [count, end]);

  const display = count === null
    ? (decimal ? (end / 10).toFixed(1) : end)
    : (decimal ? (count / 10).toFixed(1) : count);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-hero py-16 px-6">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-white lg:text-4xl">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                />
              </p>
              <p className="mt-2 text-xs sm:text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
