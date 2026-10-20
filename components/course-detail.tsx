"use client";

import { ArrowLeft, Check, Circle, Crosshair } from "lucide-react";
import type {
  CourseId,
  CourseUnit,
  LearningTrack,
  MiniCourse,
} from "@/types";

interface CourseDetailProps {
  course: MiniCourse;
  track: LearningTrack;
  completedUnitIds: string[];
  onBack: () => void;
  onCompleteUnit: (courseId: CourseId, unitId: string) => void;
  onEnterArena: () => void;
}

export function CourseDetail({
  course,
  track,
  completedUnitIds,
  onBack,
  onCompleteUnit,
  onEnterArena,
}: CourseDetailProps) {
  const isArenaUnit = (unit: CourseUnit) => unit.activityType === "arena";

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-10 items-center gap-2 rounded-md text-sm text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to learning lobby
      </button>
      <header className="rounded-xl border border-border bg-surface p-5 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
          {course.theme}
        </p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
          {course.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          {course.trackDescriptions[track]}
        </p>
        <h2 className="mt-6 text-sm font-semibold">Learning objectives</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {course.learningObjectives.map((objective) => (
            <li key={objective} className="flex gap-2 text-sm text-zinc-300">
              <Check
                className="mt-0.5 shrink-0 text-amber-400"
                size={16}
                aria-hidden="true"
              />
              {objective}
            </li>
          ))}
        </ul>
      </header>
      <section aria-labelledby="course-units-heading">
        <h2 id="course-units-heading" className="text-lg font-semibold">
          Course units
        </h2>
        <ol className="mt-3 space-y-3">
          {course.units.map((unit, index) => {
            const complete = completedUnitIds.includes(unit.id);
            return (
              <li
                key={unit.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="flex gap-3">
                  {complete ? (
                    <Check
                      className="mt-0.5 shrink-0 text-emerald-400"
                      size={18}
                      aria-label="Completed"
                    />
                  ) : (
                    <Circle
                      className="mt-0.5 shrink-0 text-zinc-500"
                      size={18}
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <p className="text-xs text-muted">
                      UNIT {String(index + 1).padStart(2, "0")} ·{" "}
                      {unit.estimatedMinutes} MIN
                    </p>
                    <h3 className="mt-1 font-semibold">{unit.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {unit.summary}
                    </p>
                  </div>
                </div>
                {isArenaUnit(unit) ? (
                  <button
                    type="button"
                    onClick={onEnterArena}
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <Crosshair size={16} aria-hidden="true" />
                    Enter the Arena
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={complete}
                    onClick={() => onCompleteUnit(course.id, unit.id)}
                    className="min-h-10 shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 disabled:cursor-default disabled:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {complete ? "Completed" : "Mark complete"}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
