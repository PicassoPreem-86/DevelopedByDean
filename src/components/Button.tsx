import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variants = {
  primary: "bg-gradient-accent text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-[1.02]",
  secondary: "border border-border hover:border-accent-violet text-text-primary hover:text-white",
  ghost: "text-text-secondary hover:text-text-primary",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  className = "",
  onClick,
  type,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={classes} whileTap={{ scale: 0.97 }}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} whileTap={{ scale: 0.97 }} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </motion.button>
  );
}
