import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View project: ${project.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
        {project.isPlaceholder ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-2 font-display text-lg font-semibold text-text-secondary">{project.title}</div>
              <div className="text-sm text-text-secondary/60">Case Study Coming Soon</div>
            </div>
          </div>
        ) : (
          <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-accent-violet/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-bg-primary/80 px-4 py-2 font-display text-sm font-semibold text-text-primary backdrop-blur-sm">
            View Project <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-display text-lg font-bold text-text-primary">{project.title}</h3>
        <p className="mb-4 text-sm text-text-secondary">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary">{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
