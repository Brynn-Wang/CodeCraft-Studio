import type { ArenaAttemptSummary } from "./arena";
import type { CourseId, LearningTrack } from "./course";

export interface LearningPathUnit {
  id: string;
  title: string;
  rationale: string;
  learningOutcome: string;
}

export interface LearningPath {
  id: string;
  topic: string;
  generatedAt: string;
  isMock: true;
  units: LearningPathUnit[];
}

export interface CourseProgress {
  courseId: CourseId;
  completedUnitIds: string[];
  updatedAt: string;
}

export interface LearnerProgress {
  version: 1;
  track: LearningTrack;
  courses: CourseProgress[];
  arenaAttempts: ArenaAttemptSummary[];
  updatedAt: string;
}

export interface LearnerProfile {
  id: string;
  displayName: string;
  track: LearningTrack;
}
