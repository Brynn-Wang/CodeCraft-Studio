import type { CourseId } from "./course";

export interface MockStudent {
  id: string;
  displayName: string;
  courseId: CourseId;
  completionPercent: number;
  lastActiveAt: string;
}

export interface InteractionLogEntry {
  id: string;
  studentId: string;
  courseId: CourseId;
  activity: string;
  occurredAt: string;
  isMock: true;
}

export interface LearnerPitfall {
  id: string;
  courseId: CourseId;
  concept: string;
  occurrenceCount: number;
  suggestedIntervention: string;
}

export interface CourseAnalytics {
  courseId: CourseId;
  enrolledCount: number;
  completionRate: number;
  averageScore: number;
  isMock: true;
}
