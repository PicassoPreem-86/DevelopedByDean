import { create } from "zustand";
import type { Answer, AssessmentResult, Industry, LeadData } from "../types/assessment";
import { getQuestionsForIndustry } from "../data/assessmentQuestions";
import { calculateResult } from "../utils/assessmentScoring";

interface AssessmentState {
  currentStep: number;
  answers: Map<string, Answer>;
  industry: Industry | null;
  companySize: string;
  leadData: Partial<LeadData>;
  result: AssessmentResult | null;

  totalQuestions: () => number;
  currentQuestion: () => ReturnType<typeof getQuestionsForIndustry>[number] | undefined;
  progress: () => number;
  isComplete: () => boolean;

  setAnswer: (questionId: string, value: string | string[], points: number) => void;
  goNext: () => void;
  goBack: () => void;
  setLeadData: (data: Partial<LeadData>) => void;
  calculateResults: () => void;
  reset: () => void;
}

export const useAssessment = create<AssessmentState>((set, get) => ({
  currentStep: 0,
  answers: new Map(),
  industry: null,
  companySize: "",
  leadData: {},
  result: null,

  totalQuestions: () => getQuestionsForIndustry(get().industry).length,
  currentQuestion: () => {
    const qs = getQuestionsForIndustry(get().industry);
    return qs[get().currentStep];
  },
  progress: () => {
    const total = get().totalQuestions();
    if (total === 0) return 0;
    return Math.round((get().currentStep / total) * 100);
  },
  isComplete: () => get().currentStep >= get().totalQuestions(),

  setAnswer: (questionId, value, points) => {
    set((state) => {
      const newAnswers = new Map(state.answers);
      newAnswers.set(questionId, { questionId, value, points });
      let industry = state.industry;
      let companySize = state.companySize;
      if (questionId === "industry") industry = value as Industry;
      if (questionId === "company-size") companySize = value as string;
      return { answers: newAnswers, industry, companySize };
    });
  },

  goNext: () => {
    const { currentStep, totalQuestions } = get();
    if (currentStep < totalQuestions()) set({ currentStep: currentStep + 1 });
  },
  goBack: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },
  setLeadData: (data) => set((state) => ({ leadData: { ...state.leadData, ...data } })),
  calculateResults: () => {
    const { answers, industry } = get();
    if (!industry) return;
    set({ result: calculateResult(answers, industry) });
  },
  reset: () => set({ currentStep: 0, answers: new Map(), industry: null, companySize: "", leadData: {}, result: null }),
}));
