import { useState, useCallback } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Button } from "../components/Button";
import { projects } from "../data/projects";
import type { Project } from "../types";

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="portfolio" className="relative py-32 px-6 bg-bg-secondary">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Selected Work" />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.id} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <ProjectCard project={project} index={i} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-text-secondary">More projects in the pipeline. Let's make yours next.</p>
          <Button href="#contact" variant="secondary">Start a Project</Button>
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </section>
  );
}
