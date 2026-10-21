export type LearningTrack = "casual" | "hardcore";

export type CourseId =
  | "software-engineering-fundamentals"
  | "effective-ai-coding-practices"
  | "soft-and-product-skills";

export type CourseLevel = "introductory" | "intermediate";

export interface CourseUnit {
  id: string;
  title: string;
  summary: string;
  learningObjectives: string[];
  activityType: "lesson" | "simulation" | "reflection" | "arena";
  estimatedMinutes: number;
  arenaLevelId?: string;
}

export interface AcceptanceCriterion {
  id: string;
  description: string;
  verificationMethod: string;
}

export interface MiniCourse {
  id: CourseId;
  title: string;
  theme: string;
  summary: string;
  level: CourseLevel;
  estimatedMinutes: number;
  trackDescriptions: Record<LearningTrack, string>;
  learningObjectives: string[];
  units: CourseUnit[];
  acceptanceCriteria: AcceptanceCriterion[];
  tags: string[];
}

export interface CourseConfiguration {
  courseId: CourseId | "custom";
  title: string;
  prompt: string;
  rules: string[];
  verificationCriteria: AcceptanceCriterion[];
  status: "draft" | "preview";
  track?: LearningTrack;
  units?: CourseUnit[];
}
