import { create } from "zustand";
import { persist, createJSONStorage, type StorageValue } from "zustand/middleware";
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

type PersistedState = Pick<
  AssessmentState,
  "currentStep" | "answers" | "industry" | "companySize" | "leadData" | "result"
>;

// Map needs custom serialization — JSON.stringify drops it to {}.
const mapAwareStorage = createJSONStorage<PersistedState>(() => sessionStorage, {
  reviver: (key, value) => {
    if (key === "answers" && Array.isArray(value)) {
      return new Map(value as Array<[string, Answer]>);
    }
    return value;
  },
  replacer: (key, value) => {
    if (key === "answers" && value instanceof Map) {
      return Array.from(value.entries());
    }
    return value;
  },
}) as ReturnType<typeof createJSONStorage<PersistedState>> & {
  // type helper — actual return is the storage adapter
  __brand?: never;
};

export const useAssessment = create<AssessmentState>()(
  persist(
    (set, get) => ({
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
      reset: () =>
        set({
          currentStep: 0,
          answers: new Map(),
          industry: null,
          companySize: "",
          leadData: {},
          result: null,
        }),
    }),
    {
      name: "assessment-state",
      storage: {
        getItem: (name) => {
          const raw = sessionStorage.getItem(name);
          if (!raw) return null;
          try {
            const parsed = JSON.parse(raw) as StorageValue<PersistedState>;
            if (parsed?.state && Array.isArray((parsed.state as PersistedState & { answers: unknown }).answers)) {
              parsed.state.answers = new Map(
                (parsed.state.answers as unknown) as Array<[string, Answer]>
              );
            }
            return parsed;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const cloned: StorageValue<PersistedState> = {
            ...value,
            state: {
              ...value.state,
              answers: Array.from(value.state.answers.entries()) as unknown as Map<string, Answer>,
            },
          };
          sessionStorage.setItem(name, JSON.stringify(cloned));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
      partialize: (state): PersistedState => ({
        currentStep: state.currentStep,
        answers: state.answers,
        industry: state.industry,
        companySize: state.companySize,
        leadData: state.leadData,
        result: state.result,
      }),
    }
  )
);

// Suppress unused warning — kept for future migration if we move to default JSON storage.
void mapAwareStorage;
