"use client";

import { useState } from "react";
import { Activity, BookOpenCheck, ChartNoAxesCombined } from "lucide-react";
import { ClassAnalytics } from "@/components/class-analytics";
import { InstructorCourseStudio } from "@/components/instructor-course-studio";

type InstructorView = "studio" | "analytics";

const views = [
  { id: "studio", label: "Course Studio", icon: BookOpenCheck },
  { id: "analytics", label: "Class analytics", icon: ChartNoAxesCombined },
] as const;

export function InstructorPortal() {
  const [view, setView] = useState<InstructorView>("studio");

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
            <Activity size={15} aria-hidden="true" /> Instructor workspace
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">教学工作台</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            管理课程草稿，查看明确标注的合成班级样本。
          </p>
        </div>
        <nav aria-label="教师工作台视图" className="flex gap-2">
          {views.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => setView(id)}
              className={`flex min-h-11 items-center gap-2 rounded-md border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${view === id ? "border-amber-500 bg-amber-400 text-accent-foreground" : "border-border bg-surface-raised text-zinc-300 hover:border-zinc-500"}`}
            >
              <Icon size={17} aria-hidden="true" />{label}
            </button>
          ))}
        </nav>
      </div>
      {view === "studio" ? <InstructorCourseStudio /> : <ClassAnalytics />}
    </section>
  );
}