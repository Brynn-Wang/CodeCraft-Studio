"use client";

import { useState, type FormEvent } from "react";
import { Check, Eye, Plus, Save, Sparkles, X } from "lucide-react";
import { mockCourses } from "@/data/mock-courses";
import { mockCourseStudio } from "@/lib/mock-course-studio";
import type { CourseConfiguration, LearningTrack } from "@/types";
import { createCourseConfiguration } from "@/lib/mock-course-studio";

export function InstructorCourseStudio() {
  const [configuration, setConfiguration] = useState<CourseConfiguration>(() =>
    createCourseConfiguration(mockCourses[0]),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [track, setTrack] = useState<LearningTrack>("casual");
  const [concepts, setConcepts] = useState("");
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");

  async function selectCourse(courseId: string) {
    if (courseId === "custom") return;
    setIsLoadingCourse(true);
    setNotice("");
    try {
      const next = await mockCourseStudio.getCourseConfiguration(courseId as (typeof mockCourses)[number]["id"]);
      setConfiguration(next);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "无法载入课程配置。");
    } finally {
      setIsLoadingCourse(false);
    }
  }

  async function generateDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!topic.trim() || !concepts.trim()) {
      setFormError("请填写课程主题和至少一个核心知识点。");
      return;
    }
    setFormError("");
    setIsGenerating(true);
    try {
      const draft = await mockCourseStudio.generateCourseDraft(topic, {
        track,
        keyConcepts: concepts.split(/[\n,，]/).map((item) => item.trim()).filter(Boolean),
      });
      setConfiguration(draft);
      setNotice("Mock AI 草稿已生成，可继续编辑；当前仅保存在页面状态中。");
      setIsModalOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "草稿生成失败，请重试。");
    } finally {
      setIsGenerating(false);
    }
  }

  async function saveConfiguration() {
    try {
      const saved = await mockCourseStudio.saveCourseConfiguration(configuration);
      setConfiguration(saved);
      setNotice("配置已保存在当前页面状态；刷新后不会保留，也不会发布给学生。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "保存模拟配置失败。");
    }
  }

  const selectedCourse = mockCourses.find((course) => course.id === configuration.courseId);

  return (
    <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">课程目录</h2>
          <button type="button" onClick={() => { setIsModalOpen(true); setFormError(""); }} aria-label="生成新微课程" title="生成新微课程" className="flex size-10 items-center justify-center rounded-md border border-amber-500/60 bg-amber-400 text-accent-foreground hover:bg-amber-300">
            <Plus size={18} aria-hidden="true" />
          </button>
        </div>
        {mockCourses.map((course) => (
          <button key={course.id} type="button" onClick={() => void selectCourse(course.id)} aria-pressed={configuration.courseId === course.id} className={`w-full rounded-md border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${configuration.courseId === course.id ? "border-amber-500/70 bg-amber-400/10" : "border-border bg-surface hover:border-zinc-500"}`}>
            <span className="block text-sm font-semibold">{course.title}</span>
            <span className="mt-1 block text-xs leading-5 text-muted">{course.theme} · {course.units.length} 个单元</span>
          </button>
        ))}
        {configuration.courseId === "custom" && <p className="rounded-md border border-amber-500/50 bg-amber-400/10 p-3 text-sm text-amber-200">当前草稿：{configuration.title}</p>}
        <p className="border-l-2 border-amber-500 pl-3 text-xs leading-5 text-muted">课程编辑和预览均为本地模拟，不会发布或写入服务器。</p>
      </aside>

      <section className="min-w-0 space-y-5">
        {notice && <p role="status" className="border-l-2 border-amber-400 bg-surface-raised px-4 py-3 text-sm text-zinc-200">{notice}</p>}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">{configuration.status === "draft" ? "未发布草稿" : "课程配置预览"} · {isLoadingCourse ? "载入中" : "本地状态"}</p>
            <h2 className="mt-2 text-xl font-semibold">{configuration.title}</h2>
            <p className="mt-1 text-sm text-muted">{selectedCourse?.summary ?? "Mock AI 生成的三单元微课程草稿"}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setConfiguration({ ...configuration, status: configuration.status === "draft" ? "preview" : "draft" })} className="flex min-h-10 items-center gap-2 rounded-md border border-border px-3 text-sm hover:border-zinc-500"><Eye size={16} aria-hidden="true" />{configuration.status === "draft" ? "预览草稿" : "返回编辑"}</button>
            <button type="button" onClick={() => void saveConfiguration()} className="flex min-h-10 items-center gap-2 rounded-md bg-amber-400 px-3 text-sm font-semibold text-accent-foreground hover:bg-amber-300"><Save size={16} aria-hidden="true" />保存</button>
          </div>
        </div>

        <label className="block text-sm font-medium">课程提示词
          <textarea value={configuration.prompt} onChange={(event) => setConfiguration({ ...configuration, prompt: event.target.value })} rows={3} className="mt-2 w-full rounded-md border border-border bg-surface-raised p-3 text-sm leading-6 text-foreground" />
        </label>
        <label className="block text-sm font-medium">Prompt Rules（每行一条）
          <textarea value={configuration.rules.join("\n")} onChange={(event) => setConfiguration({ ...configuration, rules: event.target.value.split("\n") })} rows={4} className="mt-2 w-full rounded-md border border-border bg-surface-raised p-3 text-sm leading-6 text-foreground" />
        </label>

        <div className="grid gap-5 xl:grid-cols-2">
          <section>
            <h3 className="mb-3 text-sm font-semibold">学习单元 · {configuration.units?.length ?? 0}</h3>
            <ol className="space-y-2">
              {configuration.units?.map((unit, index) => <li key={unit.id} className="border-l border-zinc-600 pl-3 py-1"><p className="text-sm font-medium"><span className="mr-2 font-mono text-xs text-amber-400">{String(index + 1).padStart(2, "0")}</span>{unit.title}</p><p className="mt-1 text-xs leading-5 text-muted">{unit.summary}</p><p className="mt-1 text-xs text-zinc-300">验收目标：{unit.learningObjectives.join("；")}</p></li>)}
            </ol>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-semibold">验收标准</h3>
            <div className="space-y-3">
              {configuration.verificationCriteria.map((criterion, index) => <label key={criterion.id} className="block text-xs text-muted">标准 {index + 1}<textarea value={criterion.description} onChange={(event) => setConfiguration({ ...configuration, verificationCriteria: configuration.verificationCriteria.map((item) => item.id === criterion.id ? { ...item, description: event.target.value } : item) })} rows={2} className="mt-1 w-full rounded-md border border-border bg-surface-raised p-2 text-sm text-foreground" /></label>)}
            </div>
          </section>
        </div>
      </section>

      {isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isGenerating) setIsModalOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="draft-title" className="my-auto w-full max-w-xl rounded-lg border border-border bg-surface p-5 shadow-2xl sm:p-7">
          <div className="mb-5 flex items-start justify-between"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400"><Sparkles size={14} aria-hidden="true" />Mock AI · 模拟生成</p><h2 id="draft-title" className="mt-2 text-xl font-semibold">生成新微课程</h2></div><button type="button" aria-label="关闭" onClick={() => setIsModalOpen(false)} className="flex size-9 items-center justify-center rounded-md border border-border" disabled={isGenerating}><X size={17} aria-hidden="true" /></button></div>
          <form onSubmit={(event) => void generateDraft(event)} className="space-y-4">
            <label className="block text-sm font-medium">课程主题<input value={topic} onChange={(event) => setTopic(event.target.value)} required maxLength={90} placeholder="例如：安全设计的 API" className="mt-2 min-h-11 w-full rounded-md border border-border bg-surface-raised px-3 text-sm" /></label>
            <fieldset><legend className="mb-2 text-sm font-medium">目标轨道</legend><div className="grid grid-cols-2 gap-2">{([{ id: "casual", title: "Casual", detail: "Non-CS" }, { id: "hardcore", title: "Hardcore", detail: "CS Engineer" }] as const).map((option) => <button key={option.id} type="button" aria-pressed={track === option.id} onClick={() => setTrack(option.id)} className={`min-h-12 rounded-md border px-3 text-left ${track === option.id ? "border-amber-500 bg-amber-400/10" : "border-border bg-surface-raised"}`}><span className="block text-sm font-medium">{option.title}</span><span className="text-xs text-muted">{option.detail}</span></button>)}</div></fieldset>
            <label className="block text-sm font-medium">核心知识点<textarea value={concepts} onChange={(event) => setConcepts(event.target.value)} required rows={3} placeholder="每行或逗号分隔，例如：身份验证、速率限制、错误处理" className="mt-2 w-full rounded-md border border-border bg-surface-raised p-3 text-sm" /></label>
            {formError && <p role="alert" className="text-sm text-amber-200">{formError}</p>}
            <p className="text-xs leading-5 text-muted">生成结果为确定性 mock 草稿，不调用 AI 服务。草稿仅保存在当前页面状态，刷新后清除。</p>
            <button type="submit" disabled={isGenerating} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-amber-400 px-4 text-sm font-semibold text-accent-foreground disabled:cursor-wait disabled:opacity-70">{isGenerating ? <><Sparkles size={16} className="animate-pulse" aria-hidden="true" />正在生成草稿…</> : <><Check size={16} aria-hidden="true" />生成草稿</>}</button>
          </form>
        </section>
      </div>}
    </div>
  );
}