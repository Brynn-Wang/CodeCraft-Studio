"use client";

import { Activity, ShieldAlert, Users, Waypoints } from "lucide-react";

const students = Array.from({ length: 48 }, (_, index) => ({
  id: `SYN-${String(index + 1).padStart(3, "0")}`,
  name: `合成学习者 ${String(index + 1).padStart(2, "0")}`,
  major: index % 2 ? "非CS" : "CS",
  track: index % 3 ? "Casual" : "Hardcore",
  completed: (index * 7 + 3) % 12,
}));

const pitfalls = [
  { label: "未配置 Supabase RLS", count: 31, note: "访问策略与数据所有权" },
  { label: "前端明文暴露 API Key", count: 27, note: "客户端与服务端信任边界" },
  { label: "缺失速率限制", count: 22, note: "滥用防护与资源边界" },
  { label: "未处理异步错误", count: 18, note: "失败状态与可恢复反馈" },
];

const logs = [
  { event: "完成代码风险审查模拟", time: "10:42" },
  { event: "重试：访问控制情境练习", time: "10:18" },
  { event: "提交 AI Fluency 4D 复盘", time: "09:56" },
];

export function ClassAnalytics() {
  const metrics = [
    { label: "合成班级人数", value: "48", suffix: "人", icon: Users },
    { label: "平均通过率", value: "78", suffix: "%", icon: Waypoints },
    { label: "审查准确率", value: "81", suffix: "%", icon: ShieldAlert },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 border border-amber-500/50 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
        <Activity size={18} className="mt-1 shrink-0" aria-hidden="true" />
        <p><strong>合成样本，仅用于界面演示。</strong>名册姓名为虚构标签，不包含真实学生隐私；不采集互动数据，也不连接学生系统。</p>
      </div>

      <section aria-label="班级概览" className="grid gap-3 sm:grid-cols-3">
        {metrics.map(({ label, value, suffix, icon: Icon }) => <article key={label} className="rounded-md border border-border bg-surface p-4"><div className="flex items-center justify-between text-sm text-muted"><span>{label}</span><Icon size={17} className="text-amber-400" aria-hidden="true" /></div><p className="mt-3 font-mono text-3xl font-semibold">{value}<span className="ml-1 text-base text-muted">{suffix}</span></p></article>)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <div className="min-w-0">
          <div className="mb-3 flex items-end justify-between gap-3"><div><h2 className="text-lg font-semibold">学生名册</h2><p className="mt-1 text-xs text-muted">48 条生成式样本 · 完成单元数为模拟值</p></div><span className="font-mono text-xs text-amber-400">48 / 48</span></div>
          <div className="max-h-[440px] overflow-auto rounded-md border border-border">
            <table className="w-full min-w-[610px] border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-surface-raised text-xs uppercase tracking-wide text-muted"><tr><th className="px-3 py-3 font-medium">学生标签</th><th className="px-3 py-3 font-medium">专业</th><th className="px-3 py-3 font-medium">轨道</th><th className="px-3 py-3 text-right font-medium">通关单元</th></tr></thead>
              <tbody>{students.map((student) => <tr key={student.id} className="border-t border-border/70 odd:bg-surface/70"><th scope="row" className="px-3 py-2.5 font-medium">{student.name}</th><td className="px-3 py-2.5 text-zinc-300">{student.major}</td><td className="px-3 py-2.5 text-zinc-300">{student.track}</td><td className="px-3 py-2.5 text-right font-mono">{student.completed} / 11</td></tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><ShieldAlert size={18} className="text-amber-400" aria-hidden="true" />高频 AI 代码漏洞盲区榜</h2>
            <ol className="divide-y divide-border border-y border-border">
              {pitfalls.map((pitfall, index) => <li key={pitfall.label} className="flex items-center gap-3 py-3"><span className="w-7 font-mono text-xs text-amber-400">0{index + 1}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{pitfall.label}</p><p className="mt-1 text-xs text-muted">{pitfall.note}</p></div><span className="font-mono text-sm">{pitfall.count}<span className="ml-1 text-xs text-muted">次</span></span></li>)}
            </ol>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">近期互动日志</h2>
            <ul className="space-y-3">{logs.map((log) => <li key={log.event} className="flex gap-3 border-l border-zinc-600 pl-3"><span className="font-mono text-xs text-amber-400">{log.time}</span><span className="text-sm text-zinc-300">{log.event}</span></li>)}</ul>
            <p className="mt-3 text-xs text-muted">示例事件与时间均为合成内容。</p>
          </section>
        </div>
      </section>
    </div>
  );
}