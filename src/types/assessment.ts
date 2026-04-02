export type Industry =
  | 'legal'
  | 'accounting'
  | 'healthcare'
  | 'construction'
  | 'professional-services'
  | 'retail'
  | 'marketing-agency'
  | 'other'

export type ScoreCategory =
  | 'operations'
  | 'data'
  | 'team'
  | 'tools'
  | 'strategy'

export type ScoreBand = 'beginner' | 'curious' | 'ready' | 'advanced'

export type QuestionType = 'single-select' | 'multi-select' | 'scale'

export interface QuestionOption {
  label: string
  value: string
  points: number
}

export interface Question {
  id: string
  category: ScoreCategory
  type: QuestionType
  text: string
  subtitle?: string
  options: QuestionOption[]
  industries?: Industry[]
}

export interface Answer {
  questionId: string
  value: string | string[]
  points: number
}

export interface CategoryScore {
  category: ScoreCategory
  score: number
  label: string
  weight: number
}

export interface Recommendation {
  id: string
  title: string
  description: string
  estimatedTimeSaved: string
  estimatedCost: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: ScoreCategory
  industries: Industry[]
  minScoreToShow?: number
}

export interface AssessmentResult {
  overallScore: number
  band: ScoreBand
  bandLabel: string
  categoryScores: CategoryScore[]
  recommendations: Recommendation[]
  quickWins: Recommendation[]
  industryBenchmark: number
}

export interface LeadData {
  firstName: string
  email: string
  companyName?: string
  phone?: string
  industry: Industry
  companySize: string
  overallScore: number
  categoryScores: CategoryScore[]
  answers: Answer[]
  completedAt: string
}

export const SCORE_BANDS: Record<ScoreBand, { label: string; range: [number, number]; description: string }> = {
  beginner: {
    label: 'AI Beginner',
    range: [0, 25],
    description: 'Your business has significant untapped AI potential. Small changes could deliver big results.',
  },
  curious: {
    label: 'AI Curious',
    range: [26, 50],
    description: 'You have some foundation in place. Targeted AI implementations could accelerate your growth.',
  },
  ready: {
    label: 'AI Ready',
    range: [51, 75],
    description: 'Your business is well-positioned for AI. Strategic implementation will give you a competitive edge.',
  },
  advanced: {
    label: 'AI Advanced',
    range: [76, 100],
    description: 'You are ahead of most businesses. Time to optimize, scale, and explore advanced AI capabilities.',
  },
}

export const CATEGORY_CONFIG: Record<ScoreCategory, { label: string; weight: number; description: string }> = {
  operations: {
    label: 'Operations & Workflows',
    weight: 0.25,
    description: 'How automated and efficient your daily processes are',
  },
  data: {
    label: 'Data Readiness',
    weight: 0.20,
    description: 'How organized and accessible your business data is',
  },
  team: {
    label: 'Team & Skills',
    weight: 0.20,
    description: 'Your team\'s AI literacy and adoption readiness',
  },
  tools: {
    label: 'Tools & Infrastructure',
    weight: 0.15,
    description: 'Your current software stack and integration potential',
  },
  strategy: {
    label: 'Strategy & Goals',
    weight: 0.20,
    description: 'Clarity on business problems AI could solve',
  },
}
