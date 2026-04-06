import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAssessment } from "../hooks/useAssessment";
import { ProgressBar } from "../components/assessment/ProgressBar";
import { QuestionCard } from "../components/assessment/QuestionCard";

export function AssessmentPage() {
  const navigate = useNavigate();
  const [direction, setDirection] = useState(1);

  const currentStep = useAssessment((s) => s.currentStep);
  const answers = useAssessment((s) => s.answers);
  const totalQuestions = useAssessment((s) => s.totalQuestions());
  const currentQuestion = useAssessment((s) => s.currentQuestion());
  const progress = useAssessment((s) => s.progress());
  const isComplete = useAssessment((s) => s.isComplete());
  const setAnswer = useAssessment((s) => s.setAnswer);
  const goNext = useAssessment((s) => s.goNext);
  const goBack = useAssessment((s) => s.goBack);
  const calculateResults = useAssessment((s) => s.calculateResults);

  const currentAnswer = currentQuestion ? answers.get(currentQuestion.id) : undefined;
  const hasAnswer = currentAnswer !== undefined;

  const handleSelect = useCallback(
    (value: string | string[], points: number) => {
      if (!currentQuestion) return;
      setAnswer(currentQuestion.id, value, points);
    },
    [currentQuestion, setAnswer]
  );

  const handleNext = useCallback(() => {
    if (!hasAnswer) return;
    setDirection(1);
    if (currentStep === totalQuestions - 1) {
      calculateResults();
      navigate("/assessment/capture");
    } else {
      goNext();
    }
  }, [hasAnswer, currentStep, totalQuestions, calculateResults, navigate, goNext]);

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      navigate("/");
    } else {
      setDirection(-1);
      goBack();
    }
  }, [currentStep, navigate, goBack]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && hasAnswer) handleNext();
    },
    [hasAnswer, handleNext]
  );

  if (isComplete || !currentQuestion) return null;

  return (
    <div className="min-h-screen bg-hero" onKeyDown={handleKeyDown} tabIndex={0}>
      <ProgressBar current={currentStep + 1} total={totalQuestions} percentage={progress} />

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait" initial={false}>
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={currentAnswer?.value}
            onSelect={handleSelect}
            direction={direction}
          />
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleBack}
            className="text-white/40 hover:text-white/70 font-medium transition-colors px-4 py-3"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-150 ${
              hasAnswer
                ? "bg-accent text-white hover:bg-accent-hover hover:shadow-glow"
                : "bg-white/[0.06] text-white/30 cursor-not-allowed"
            }`}
          >
            {currentStep === totalQuestions - 1 ? "See My Results" : "Next"}
          </button>
        </div>

        {!hasAnswer && (
          <p className="text-center text-sm text-white/40 mt-4">Pick one to continue</p>
        )}
      </div>
    </div>
  );
}
