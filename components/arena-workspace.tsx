"use client";

import { useState } from "react";
import { ArrowLeft, Check, Circle, FileCode2 } from "lucide-react";
import type { ArenaAnswer, ArenaEvaluation, ArenaLevel } from "@/types";
import { scoreArenaSubmission } from "@/lib/scoring";
import { ArenaFeedback } from "@/components/arena-feedback";
import { ArenaStrategyChoices } from "@/components/arena-strategy-choices";

interface ArenaWorkspaceProps {
  level: ArenaLevel;
  onBack: () => void;
  onEvaluation: (evaluation: ArenaEvaluation) => void;
}

export function ArenaWorkspace({
  level,
  onBack,
  onEvaluation,
}: ArenaWorkspaceProps) {
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [strategies, setStrategies] = useState<Record<string, string>>({});
  const [explanation, setExplanation] = useState("");
  const [evaluation, setEvaluation] = useState<ArenaEvaluation | null>(null);
  const [validationError, setValidationError] = useState("");
  const lines = level.code.split("\n");

  function toggleLine(line: number) {
    setSelectedLines((current) =>
      current.includes(line)
        ? current.filter((selected) => selected !== line)
        : [...current, line].sort((a, b) => a - b),
    );
    setValidationError("");
  }

  function submitReview() {
    if (selectedLines.length === 0) {
      setValidationError("Select at least one line to submit your review.");
      return;
    }
    const answer: ArenaAnswer = {
      selectedLines,
      strategyIds: Object.values(strategies).filter(Boolean),
      explanation: explanation.trim() || undefined,
    };
    const result = scoreArenaSubmission(level, answer);
    setEvaluation(result);
    setValidationError("");
    onEvaluation(result);
  }

  function retry() {
    setSelectedLines([]);
    setStrategies({});
    setExplanation("");
    setEvaluation(null);
    setValidationError("");
  }

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

      <header className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-amber-400">
          <FileCode2 size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
            Code review arena
          </p>
          <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
            {level.title}
          </h1>
        </div>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <section
          aria-labelledby="scenario-heading"
          className="rounded-xl border border-border bg-surface p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Business scenario
          </p>
          <h2 id="scenario-heading" className="mt-2 text-lg font-semibold">
            Authentication & notes
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {level.scenario}
          </p>
          <div className="mt-5 rounded-lg border border-border bg-surface-raised p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-300">
              Business goal
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-200">
              {level.businessGoal}
            </p>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-semibold">Acceptance criteria</h3>
            <ul className="mt-3 space-y-3">
              {level.acceptanceCriteria.map((criterion) => (
                <li key={criterion} className="flex gap-2 text-sm leading-6 text-muted">
                  <Check
                    className="mt-1 shrink-0 text-amber-400"
                    size={15}
                    aria-hidden="true"
                  />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="code-heading"
          className="min-w-0 rounded-xl border border-border bg-surface p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                AI-generated draft
              </p>
              <h2 id="code-heading" className="mt-1 font-semibold">
                Select lines to flag
              </h2>
            </div>
            <span className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted">
              {level.codeLanguage}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">
            Select defective lines. This is static training text and will not be
            executed.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-[#0b0e11] p-2">
            <pre className="min-w-max font-mono text-xs leading-7">
              {lines.map((lineText, index) => {
                const line = index + 1;
                const selected = selectedLines.includes(line);
                return (
                  <button
                    key={line}
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Line ${line}${selected ? ", flagged" : ", not flagged"}`}
                    onClick={() => toggleLine(line)}
                    className={`flex min-h-7 w-full items-start gap-3 rounded px-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      selected
                        ? "bg-amber-400/15 text-amber-100"
                        : "text-zinc-300 hover:bg-zinc-800/70"
                    }`}
                  >
                    <span className="flex w-8 shrink-0 items-center justify-end gap-1 text-zinc-600">
                      {selected ? (
                        <Check size={12} className="text-amber-300" aria-hidden="true" />
                      ) : (
                        <Circle size={10} aria-hidden="true" />
                      )}
                      {line}
                    </span>
                    <span className="whitespace-pre">{lineText || " "}</span>
                  </button>
                );
              })}
            </pre>
          </div>
          <ArenaStrategyChoices
            level={level}
            strategies={strategies}
            onChange={(defectId, strategyId) =>
              setStrategies((current) => ({ ...current, [defectId]: strategyId }))
            }
          />
        </section>
      </div>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <label
          htmlFor="review-explanation"
          className="text-sm font-semibold text-zinc-200"
        >
          Explain your review (optional)
        </label>
        <textarea
          id="review-explanation"
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
          rows={3}
          maxLength={500}
          placeholder="What risk could this create, and how would you verify the fix?"
          className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        />
        {validationError && (
          <p role="alert" className="mt-2 text-sm text-red-300">
            {validationError}
          </p>
        )}
        {!evaluation && (
          <button
            type="button"
            onClick={submitReview}
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Check size={17} aria-hidden="true" />
            Audit & Submit
          </button>
        )}
      </section>

      {evaluation && (
        <ArenaFeedback evaluation={evaluation} onRetry={retry} />
      )}
    </div>
  );
}
