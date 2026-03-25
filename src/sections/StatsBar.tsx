import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { end: 50, prefix: "", suffix: "+", label: "Projects Delivered", decimal: false },
  { end: 12, prefix: "", suffix: "K+", label: "Hours Saved for Clients", decimal: false },
  { end: 2, prefix: "$", suffix: "M+", label: "Revenue Generated", decimal: false },
  { end: 49, prefix: "", suffix: "", label: "Avg Client Rating", decimal: true },
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
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
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
  }, [started, end]);

  const display = decimal ? (count / 10).toFixed(1) : count;

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
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="text-3xl font-extrabold text-white lg:text-4xl">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                />
              </p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
