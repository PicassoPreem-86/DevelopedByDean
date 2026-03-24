import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

export function MagneticButton({ children, href, onClick, variant = "primary", className = "", type }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles = "inline-flex items-center gap-3 font-display text-sm font-medium tracking-[0.05em] uppercase transition-colors duration-300";

  const variantStyles = {
    primary: "border border-accent bg-accent text-bg-primary hover:bg-accent-hover px-8 py-4",
    outline: "border border-divider text-text-primary hover:border-accent hover:text-accent px-8 py-4",
    ghost: "text-text-secondary hover:text-accent",
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Tag
        href={href || undefined}
        onClick={onClick}
        type={!href ? type || "button" : undefined}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
