"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { ArenaWorkspace } from "@/components/arena-workspace";
import { CourseDetail } from "@/components/course-detail";
import { CourseLobby } from "@/components/course-lobby";
import { LearningTrackSwitcher } from "@/components/learning-track-switcher";
import { spotTheAiSlopLevel } from "@/data/mock-arena";
import { mockCourses } from "@/data/mock-courses";
import { loadLearnerProgress, saveLearnerProgress } from "@/lib/local-progress";
import type {
  ArenaEvaluation,
  CourseId,
  CourseProgress,
  LearnerProgress,
  MiniCourse,
} from "@/types";

const emptyProgress: LearnerProgress = {
  version: 1,
  track: "casual",
  courses: [],
  arenaAttempts: [],
  updatedAt: new Date(0).toISOString(),
};

type LearnerView = "lobby" | "course" | "arena";

export function LearnerPortal() {
  const [progress, setProgress] = useState(emptyProgress);
  const progressRef = useRef(emptyProgress);
  const [view, setView] = useState<LearnerView>("lobby");
  const [selectedCourse, setSelectedCourse] = useState<MiniCourse | null>(null);
  const [storageError, setStorageError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    loadLearnerProgress()
      .then((saved) => {
        if (active && saved) {
          progressRef.current = saved;
          setProgress(saved);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setStorageError(
            error instanceof Error
              ? `Progress could not be loaded: ${error.message}`
              : "Progress could not be loaded from this browser.",
          );
        }
      })
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  async function updateProgress(
    update: (current: LearnerProgress) => LearnerProgress,
  ) {
    const next = {
      ...update(progressRef.current),
      updatedAt: new Date().toISOString(),
    };
    progressRef.current = next;
    setProgress(next);
    try {
      await saveLearnerProgress(next);
      setStorageError("");
    } catch (error) {
      setStorageError(
        error instanceof Error
          ? `Progress changed for this session but could not be saved: ${error.message}`
          : "Progress changed for this session but could not be saved.",
      );
    }
  }

  function handleTrackChange(track: LearnerProgress["track"]) {
    void updateProgress((current) => ({ ...current, track }));
  }

  function handleCompleteUnit(courseId: CourseId, unitId: string) {
    void updateProgress((current) => {
      const existing = current.courses.find((item) => item.courseId === courseId);
      const courses: CourseProgress[] = existing
        ? current.courses.map((item) =>
            item.courseId === courseId
              ? {
                  ...item,
                  completedUnitIds: [...new Set([...item.completedUnitIds, unitId])],
                  updatedAt: new Date().toISOString(),
                }
              : item,
          )
        : [
            ...current.courses,
            {
              courseId,
              completedUnitIds: [unitId],
              updatedAt: new Date().toISOString(),
            },
          ];
      return { ...current, courses };
    });
  }

  function handleEvaluation(evaluation: ArenaEvaluation) {
    void updateProgress((current) => ({
      ...current,
      arenaAttempts: [
        ...current.arenaAttempts,
        {
          arenaId: evaluation.arenaId,
          score: evaluation.score,
          maxScore: evaluation.maxScore,
          completedAt: evaluation.evaluatedAt,
        },
      ],
    }));
  }

  function openCourse(course: MiniCourse) {
    setSelectedCourse(course);
    setView("course");
  }

  function openArena() {
    setView("arena");
  }

  return (
    <div className="space-y-7">
      {storageError && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-amber-700/60 bg-amber-950/30 p-3 text-sm text-amber-100"
        >
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-amber-300"
            aria-hidden="true"
          />
          <p>{storageError}</p>
        </div>
      )}
      {!loaded ? (
        <p role="status" className="text-xs text-muted">
          Restoring locally saved learner progress…
        </p>
      ) : (
        <>
          <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                Learner workspace
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your engineering learning lobby
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Choose a learning style, explore a course, and practice
                reviewing AI output in a safe simulation.
              </p>
            </div>
            <div className="w-full sm:max-w-[32rem]">
              <LearningTrackSwitcher
                track={progress.track}
                onChange={handleTrackChange}
              />
            </div>
          </header>
          {view === "lobby" && (
            <CourseLobby
              courses={mockCourses}
              track={progress.track}
              progress={progress.courses}
              onOpenCourse={openCourse}
              onOpenArena={openArena}
            />
          )}
          {view === "course" && selectedCourse && (
            <CourseDetail
              course={selectedCourse}
              track={progress.track}
              completedUnitIds={
                progress.courses.find(
                  ({ courseId }) => courseId === selectedCourse.id,
                )?.completedUnitIds ?? []
              }
              onBack={() => setView("lobby")}
              onCompleteUnit={handleCompleteUnit}
              onEnterArena={openArena}
            />
          )}
          {view === "arena" && (
            <ArenaWorkspace
              level={spotTheAiSlopLevel}
              onBack={() => setView(selectedCourse ? "course" : "lobby")}
              onEvaluation={handleEvaluation}
            />
          )}
        </>
      )}
    </div>
  );
}
