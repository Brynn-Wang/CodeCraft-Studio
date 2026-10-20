export type ArenaId = "spot-the-ai-slop";

export interface RefactoringStrategy {
  id: string;
  label: string;
  description: string;
}

export interface ArenaDefect {
  id: string;
  line: number;
  title: string;
  explanation: string;
  acceptedStrategyIds: string[];
  points: number;
}

export interface ArenaLevel {
  id: ArenaId;
  title: string;
  scenario: string;
  businessGoal: string;
  acceptanceCriteria: string[];
  codeLanguage: string;
  code: string;
  defects: ArenaDefect[];
  strategies: RefactoringStrategy[];
  maxScore: number;
  postMortem: string;
}

export interface ArenaAnswer {
  selectedLines: number[];
  strategyIds: string[];
  explanation?: string;
}

export interface DefectFeedback {
  defectId: string;
  line: number;
  status: "identified" | "missed" | "false-positive";
  pointsAwarded: number;
  message: string;
}

export interface ArenaEvaluation {
  arenaId: ArenaId;
  score: number;
  maxScore: number;
  passed: boolean;
  feedback: DefectFeedback[];
  summary: string;
  postMortem: string;
  evaluatedAt: string;
}

export interface ArenaAttemptSummary {
  arenaId: ArenaId;
  score: number;
  maxScore: number;
  completedAt: string;
}
