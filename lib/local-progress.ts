import type { LearnerProgress } from "@/types";

const STORAGE_KEY = "codecraft-studio:learner-progress:v1";
const COURSE_IDS = new Set([
  "software-engineering-fundamentals",
  "effective-ai-coding-practices",
  "soft-and-product-skills",
]);
const ARENA_IDS = new Set(["spot-the-ai-slop"]);

function getStorage(): Storage {
  if (typeof window === "undefined") {
    throw new Error("Learner progress is only available in a browser.");
  }
  return window.localStorage;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCourseProgress(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.courseId === "string" &&
    COURSE_IDS.has(value.courseId) &&
    Array.isArray(value.completedUnitIds) &&
    value.completedUnitIds.every((id) => typeof id === "string") &&
    typeof value.updatedAt === "string"
  );
}

function isArenaAttempt(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.arenaId === "string" &&
    ARENA_IDS.has(value.arenaId) &&
    typeof value.score === "number" &&
    Number.isFinite(value.score) &&
    typeof value.maxScore === "number" &&
    Number.isFinite(value.maxScore) &&
    typeof value.completedAt === "string"
  );
}

function isLearnerProgress(value: unknown): value is LearnerProgress {
  return (
    isRecord(value) &&
    value.version === 1 &&
    (value.track === "casual" || value.track === "hardcore") &&
    Array.isArray(value.courses) &&
    value.courses.every(isCourseProgress) &&
    Array.isArray(value.arenaAttempts) &&
    value.arenaAttempts.every(isArenaAttempt) &&
    typeof value.updatedAt === "string"
  );
}

export async function loadLearnerProgress(): Promise<LearnerProgress | null> {
  const raw = getStorage().getItem(STORAGE_KEY);
  if (!raw) return null;

  const parsed: unknown = JSON.parse(raw);
  if (!isLearnerProgress(parsed)) {
    throw new Error("Saved learner progress has an unsupported format.");
  }

  return parsed;
}

export async function saveLearnerProgress(
  progress: LearnerProgress,
): Promise<void> {
  getStorage().setItem(STORAGE_KEY, JSON.stringify(progress));
}
