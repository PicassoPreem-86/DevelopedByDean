import { motion } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";
import { MagneticButton } from "../components/MagneticButton";

export function Portfolio() {
  return (
    <section id="work" className="relative bg-bg-primary px-6 py-32">
      <div className="mx-auto max-w-container">
        {/* Section header */}
        <div className="mb-20 flex items-end justify-between">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-8 bg-accent" />
              <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Selected Work
              </span>
            </div>
            <h2
              className="font-display font-light tracking-[-0.01em] text-text-primary"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Projects that demonstrate
              <br />
              precision and capability.
            </h2>
          </div>
          <MagneticButton
            href="#contact"
            variant="ghost"
            className="hidden lg:inline-flex"
          >
            Discuss a Project
          </MagneticButton>
        </div>

        {/* Editorial mosaic — 7/5 asymmetric split */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Hero project — large, left side */}
          <div className="lg:col-span-7">
            <ProjectCard project={projects[0]} size="large" index={0} />
          </div>

          {/* Supporting projects — right side, offset down */}
          <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-16">
            <ProjectCard project={projects[1]} size="medium" index={1} />
            <ProjectCard project={projects[2]} size="medium" index={2} />
          </div>
        </div>

        {/* Bottom attribution note */}
        <motion.p
          className="mt-12 text-center font-display text-sm tracking-[0.05em] text-text-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Additional work available upon request — including private client
          projects and internal builds.
        </motion.p>
      </div>
    </section>
  );
}
