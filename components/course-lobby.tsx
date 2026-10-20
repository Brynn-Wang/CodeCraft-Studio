"use client";

import { ArrowRight, Clock3, Crosshair, GraduationCap } from "lucide-react";
import type { CourseProgress, LearningTrack, MiniCourse } from "@/types";
import { SelfDirectedLearning } from "@/components/self-directed-learning";

interface CourseLobbyProps {
  courses: MiniCourse[];
  track: LearningTrack;
  progress: CourseProgress[];
  onOpenCourse: (course: MiniCourse) => void;
  onOpenArena: () => void;
}

export function CourseLobby({
  courses,
  track,
  progress,
  onOpenCourse,
  onOpenArena,
}: CourseLobbyProps) {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
            Featured challenge
          </p>
          <h2 className="mt-2 text-xl font-semibold">Spot the AI Slop</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Review an AI-generated service draft, flag risky lines, and choose
            the right engineering fixes.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenArena}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <Crosshair size={17} aria-hidden="true" />
          Enter the Arena
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </section>

      <SelfDirectedLearning />

      <section aria-labelledby="course-lobby-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Learning lobby
            </p>
            <h2 id="course-lobby-heading" className="mt-2 text-xl font-semibold">
              Choose a mini-course
            </h2>
          </div>
          <span className="hidden items-center gap-2 text-xs text-muted sm:inline-flex">
            <GraduationCap size={15} aria-hidden="true" />
            {courses.length} guided courses
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {courses.map((course) => {
            const completed = new Set(
              progress.find(({ courseId }) => courseId === course.id)
                ?.completedUnitIds ?? [],
            );

            return (
              <article
                key={course.id}
                className="flex flex-col rounded-xl border border-border bg-surface p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                  {course.theme}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {course.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <Clock3 size={14} aria-hidden="true" />
                  <span>{course.estimatedMinutes} min</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.level}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-300">
                  {course.trackDescriptions[track]}
                </p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-zinc-300">
                    Learning goals
                  </p>
                  <ul className="mt-2 space-y-2">
                    {course.learningObjectives.slice(0, 3).map((objective) => (
                      <li
                        key={objective}
                        className="flex gap-2 text-xs leading-5 text-muted"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-400" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-5">
                  <p className="mb-3 text-xs text-muted">
                    {completed.size} / {course.units.length} units complete
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenCourse(course)}
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm font-medium transition-colors hover:border-amber-500/60 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    View course
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
