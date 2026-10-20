import type { ArenaAnswer, ArenaEvaluation, ArenaLevel } from "./arena";
import type { CourseConfiguration, CourseId } from "./course";
import type { LearningPath, LearnerProgress } from "./learning";

export interface LearningPathService {
  generateLearningPath(topic: string): Promise<LearningPath>;
}

export interface ArenaService {
  getArenaLevel(id: string): Promise<ArenaLevel>;
  evaluateSubmission(
    arenaId: string,
    answer: ArenaAnswer,
  ): Promise<ArenaEvaluation>;
}

export interface CourseStudioService {
  saveCourseConfiguration(
    configuration: CourseConfiguration,
  ): Promise<CourseConfiguration>;
  generateCourseDraft(topic: string): Promise<CourseConfiguration>;
  getCourseConfiguration(courseId: CourseId): Promise<CourseConfiguration>;
}

export interface ProgressService {
  loadProgress(): Promise<LearnerProgress | null>;
  saveProgress(progress: LearnerProgress): Promise<void>;
}

export interface PlatformServices {
  learningPaths: LearningPathService;
  arena: ArenaService;
  courseStudio: CourseStudioService;
  progress: ProgressService;
}
