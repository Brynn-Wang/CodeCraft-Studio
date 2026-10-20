"use client";

import { useState } from "react";
import { Check, Code2, Compass } from "lucide-react";
import type { LearningTrack } from "@/types";

const tracks: {
  id: LearningTrack;
  title: string;
  subtitle: string;
  icon: typeof Compass;
}[] = [
  {
    id: "casual",
    title: "Casual / Non-CS",
    subtitle: "探索轨 · 从生活情境理解概念",
    icon: Compass,
  },
  {
    id: "hardcore",
    title: "Hardcore / CS Engineer",
    subtitle: "实战轨 · 深入工程实践与审查",
    icon: Code2,
  },
];

export function LearningTrackSwitcher() {
  const [track, setTrack] = useState<LearningTrack>("casual");

  return (
    <fieldset className="min-w-0">
      <legend
        id="learning-track-heading"
        className="mb-3 text-sm font-medium text-zinc-300"
      >
        Choose your learning track
        <span className="ml-2 text-xs font-normal text-muted">选择学习轨道</span>
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {tracks.map(({ id, title, subtitle, icon: Icon }) => {
          const selected = track === id;

          return (
            <label
              key={id}
              className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber-400 ${
                selected
                  ? "border-amber-500/70 bg-amber-400/10"
                  : "border-border bg-surface hover:border-zinc-500"
              }`}
            >
              <input
                className="peer sr-only"
                type="radio"
                name="learning-track"
                value={id}
                checked={selected}
                onChange={() => setTrack(id)}
              />
              <span
                aria-hidden="true"
                className={`flex size-10 shrink-0 items-center justify-center rounded-md border ${
                  selected
                    ? "border-amber-500/50 bg-amber-400/15 text-amber-300"
                    : "border-border bg-surface-raised text-zinc-400"
                }`}
              >
                <Icon size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-zinc-100">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-muted">
                  {subtitle}
                </span>
              </span>
              {selected && (
                <Check
                  className="ml-auto shrink-0 text-amber-300"
                  size={17}
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">{selected ? "Selected" : ""}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
