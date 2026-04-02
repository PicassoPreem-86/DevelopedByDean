import type { Answer, AssessmentResult, CategoryScore, Industry, Recommendation, ScoreBand, ScoreCategory } from "../types/assessment";
import { CATEGORY_CONFIG, SCORE_BANDS } from "../types/assessment";
import { questions } from "../data/assessmentQuestions";
import { recommendations, industryBenchmarks } from "../data/assessmentRecommendations";

function calculateCategoryScore(category: ScoreCategory, answers: Map<string, Answer>, industry: Industry | null): number {
  const categoryQuestions = questions.filter((q) => {
    if (q.category !== category) return false;
    if (q.industries && industry && !q.industries.includes(industry)) return false;
    if (q.industries && !industry) return false;
    return true;
  });

  if (categoryQuestions.length === 0) return 50;

  let earned = 0;
  let maxPossible = 0;

  for (const q of categoryQuestions) {
    const maxPoints = Math.max(...q.options.map((o) => o.points));
    maxPossible += maxPoints;
    const answer = answers.get(q.id);
    if (answer) earned += answer.points;
  }

  if (maxPossible === 0) return 50;
  return Math.round((earned / maxPossible) * 100);
}

function getScoreBand(score: number): ScoreBand {
  if (score <= 25) return "beginner";
  if (score <= 50) return "curious";
  if (score <= 75) return "ready";
  return "advanced";
}

function selectRecommendations(industry: Industry, categoryScores: CategoryScore[]): Recommendation[] {
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);
  const matched = recommendations.filter((rec) => {
    if (!rec.industries.includes(industry)) return false;
    const catScore = categoryScores.find((cs) => cs.category === rec.category);
    if (!catScore) return false;
    if (rec.minScoreToShow && catScore.score >= rec.minScoreToShow) return false;
    return true;
  });
  matched.sort((a, b) => {
    const aIdx = sorted.findIndex((cs) => cs.category === a.category);
    const bIdx = sorted.findIndex((cs) => cs.category === b.category);
    return aIdx - bIdx;
  });
  return matched.slice(0, 3);
}

function selectQuickWins(industry: Industry, categoryScores: CategoryScore[]): Recommendation[] {
  const matched = recommendations.filter((rec) => {
    if (rec.difficulty !== "easy") return false;
    if (!rec.industries.includes(industry)) return false;
    const catScore = categoryScores.find((cs) => cs.category === rec.category);
    if (!catScore) return false;
    if (rec.minScoreToShow && catScore.score >= rec.minScoreToShow) return false;
    return true;
  });
  matched.sort((a, b) => {
    const aCost = parseInt(a.estimatedCost.replace(/[^0-9]/g, "")) || 0;
    const bCost = parseInt(b.estimatedCost.replace(/[^0-9]/g, "")) || 0;
    return aCost - bCost;
  });
  return matched.slice(0, 2);
}

export function calculateResult(answers: Map<string, Answer>, industry: Industry): AssessmentResult {
  const categories: ScoreCategory[] = ["operations", "data", "team", "tools", "strategy"];

  const categoryScores: CategoryScore[] = categories.map((category) => {
    const config = CATEGORY_CONFIG[category];
    const score = calculateCategoryScore(category, answers, industry);
    return { category, score, label: config.label, weight: config.weight };
  });

  const overallScore = Math.round(categoryScores.reduce((sum, cs) => sum + cs.score * cs.weight, 0));
  const band = getScoreBand(overallScore);
  const bandLabel = SCORE_BANDS[band].label;
  const topRecommendations = selectRecommendations(industry, categoryScores);
  const quickWins = selectQuickWins(industry, categoryScores);
  const quickWinIds = new Set(quickWins.map((qw) => qw.id));
  const filteredRecommendations = topRecommendations.filter((rec) => !quickWinIds.has(rec.id));
  const industryBenchmark = industryBenchmarks[industry] ?? 38;

  return { overallScore, band, bandLabel, categoryScores, recommendations: filteredRecommendations, quickWins, industryBenchmark };
}
