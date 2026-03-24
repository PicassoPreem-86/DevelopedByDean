import { motion } from "framer-motion";
import type { ProcessStep as ProcessStepType } from "../types";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  return (
    <motion.div
      className="relative flex gap-6 pb-12 last:pb-0 lg:flex-col lg:text-center lg:gap-4 lg:pb-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {!isLast && (
        <>
          <div className="absolute left-5 top-12 h-full w-px bg-gradient-to-b from-accent-violet/50 to-transparent lg:hidden" aria-hidden="true" />
          <div className="absolute left-[calc(50%+24px)] top-5 hidden h-px w-full bg-gradient-to-r from-accent-violet/50 to-transparent lg:block" aria-hidden="true" />
        </>
      )}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-violet/30 bg-bg-card font-display text-sm font-bold text-accent-violet lg:mx-auto">
        {step.id}
      </div>
      <div>
        <h3 className="mb-2 font-display text-xl font-bold text-text-primary">{step.title}</h3>
        <p className="text-text-secondary font-body leading-relaxed max-w-xs lg:mx-auto">{step.description}</p>
      </div>
    </motion.div>
  );
}
