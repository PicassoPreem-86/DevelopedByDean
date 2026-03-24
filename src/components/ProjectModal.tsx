import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-bg-secondary p-6 sm:p-10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
          >
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-text-secondary hover:bg-bg-card hover:text-text-primary transition-colors" aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-violet/10 px-3 py-1 text-xs font-semibold text-accent-violet">{tag}</span>
              ))}
            </div>
            <h2 className="mb-2 font-display text-3xl font-bold text-text-primary sm:text-4xl">{project.title}</h2>
            <p className="mb-8 text-lg text-text-secondary">{project.description}</p>
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">The Challenge</h3>
                <p className="text-text-secondary leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">The Solution</h3>
                <p className="text-text-secondary leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">Results</h3>
                <p className="text-text-secondary leading-relaxed">{project.results}</p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">Tech Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techUsed.map((tech) => (
                    <span key={tech} className="rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary">{tech}</span>
                  ))}
                </div>
              </div>
              {project.screenshots.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent-violet">Gallery</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.screenshots.map((src, i) => (
                      <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} className="rounded-lg border border-border" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
