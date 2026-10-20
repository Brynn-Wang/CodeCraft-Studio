"use client";

import { AlertTriangle, Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { ArenaEvaluation } from "@/types";

interface ArenaFeedbackProps {
  evaluation: ArenaEvaluation;
  onRetry: () => void;
}

export function ArenaFeedback({ evaluation, onRetry }: ArenaFeedbackProps) {
  const [showPostMortem, setShowPostMortem] = useState(true);

  return (
    <section
      aria-labelledby="review-results-heading"
      aria-live="polite"
      className="rounded-xl border border-border bg-surface p-5 sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
            Audit results
          </p>
          <h2 id="review-results-heading" className="mt-2 text-xl font-semibold">
            {evaluation.score} / {evaluation.maxScore} points
          </h2>
          <p className="mt-2 text-sm text-muted">{evaluation.summary}</p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:border-amber-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Try again
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {evaluation.feedback.map((item) => {
          const isFalsePositive = item.status === "false-positive";
          const Icon = isFalsePositive ? AlertTriangle : Check;
          return (
            <li
              key={item.defectId}
              className="flex gap-3 rounded-lg border border-border bg-surface-raised p-3"
            >
              <Icon
                className={`mt-0.5 shrink-0 ${
                  isFalsePositive
                    ? "text-amber-300"
                    : item.status === "missed"
                      ? "text-red-300"
                      : "text-emerald-300"
                }`}
                size={17}
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-300">
                  Line {item.line} · {item.status.replace("-", " ")} ·{" "}
                  {item.pointsAwarded} pts
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {item.message}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 border-t border-border pt-4">
        <button
          type="button"
          aria-expanded={showPostMortem}
          onClick={() => setShowPostMortem((visible) => !visible)}
          className="min-h-10 rounded-md text-sm font-semibold text-amber-300 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {showPostMortem ? "Hide" : "View"} post-mortem
        </button>
        {showPostMortem && (
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {evaluation.postMortem}
          </p>
        )}
      </div>
    </section>
  );
}
