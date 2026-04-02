import { motion } from "framer-motion";
import type { Question } from "../../types/assessment";

interface QuestionCardProps {
  question: Question;
  selectedValue: string | string[] | undefined;
  onSelect: (value: string | string[], points: number) => void;
  direction: number;
}

export function QuestionCard({ question, selectedValue, onSelect, direction }: QuestionCardProps) {
  const isMultiSelect = question.type === "multi-select";
  const selectedValues = isMultiSelect ? (Array.isArray(selectedValue) ? selectedValue : []) : null;

  function handleOptionClick(optionValue: string, optionPoints: number) {
    if (isMultiSelect) {
      const current = selectedValues ?? [];
      let next: string[];
      let totalPoints: number;
      if (optionValue === "none") {
        next = current.includes("none") ? [] : ["none"];
        totalPoints = 0;
      } else {
        const withoutNone = current.filter((v) => v !== "none");
        next = withoutNone.includes(optionValue)
          ? withoutNone.filter((v) => v !== optionValue)
          : [...withoutNone, optionValue];
        totalPoints = next.reduce((sum, val) => {
          const opt = question.options.find((o) => o.value === val);
          return sum + (opt?.points ?? 0);
        }, 0);
      }
      onSelect(next, totalPoints);
    } else {
      onSelect(optionValue, optionPoints);
    }
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-white leading-tight mb-2">
          {question.text}
        </h2>
        {question.subtitle && (
          <p className="text-white/50 text-base sm:text-lg">{question.subtitle}</p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = isMultiSelect
            ? (selectedValues ?? []).includes(option.value)
            : selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value, option.points)}
              className={`w-full text-left px-5 sm:px-6 py-4 rounded-xl border-2 transition-all duration-150 ${
                isSelected
                  ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-5 h-5 ${isMultiSelect ? "rounded-md" : "rounded-full"} border-2 flex items-center justify-center transition-all duration-150 ${
                    isSelected ? "border-accent bg-accent" : "border-white/30"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-[15px] sm:text-base ${isSelected ? "text-white font-medium" : "text-white/70"}`}>
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {isMultiSelect && (
        <p className="text-sm text-white/30 text-center mt-4">Select all that apply</p>
      )}
    </motion.div>
  );
}
