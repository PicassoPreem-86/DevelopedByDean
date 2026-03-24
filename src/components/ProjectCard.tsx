import { motion } from "framer-motion";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  size: "large" | "medium";
  index: number;
}

export function ProjectCard({ project, size, index }: ProjectCardProps) {
  const isLarge = size === "large";

  return (
    <motion.article
      className={`group relative cursor-pointer overflow-hidden border border-divider bg-bg-surface transition-colors duration-500 hover:border-accent/30 ${
        isLarge ? "aspect-[4/3]" : "aspect-[3/4]"
      }`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Faint project word mark in background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className="select-none font-display font-bold text-white"
          style={{
            fontSize: "clamp(4rem, 8vw, 8rem)",
            opacity: 0.03,
          }}
          aria-hidden="true"
        >
          {project.title.split(" ")[1]}
        </span>
      </div>

      {/* Hover bottom line trace */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-accent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "left" }}
        aria-hidden="true"
      />

      {/* Hover surface tint */}
      <div
        className="pointer-events-none absolute inset-0 bg-bg-elevated/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xs uppercase tracking-[0.15em] text-accent">
            {project.status}
          </span>
          <span className="font-display text-xs tracking-[0.1em] text-text-secondary">
            {project.year}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <span className="mb-2 block font-display text-xs uppercase tracking-[0.1em] text-text-secondary">
            {project.category}
          </span>
          <h3
            className={`mb-3 font-display font-light text-text-primary ${
              isLarge ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {project.title}
          </h3>
          <p className="max-w-sm translate-y-2 font-body text-sm leading-relaxed text-text-secondary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
