"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { generateMockLearningPath } from "@/lib/mock-learning-path";
import type { LearningPath } from "@/types";

export function SelfDirectedLearning() {
  const [topic, setTopic] = useState("");
  const [path, setPath] = useState<LearningPath | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function submitTopic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requestedTopic = topic.trim();
    if (!requestedTopic) {
      setError("Enter a topic or domain to create your learning path.");
      setPath(null);
      return;
    }

    setIsGenerating(true);
    setError("");
    try {
      const generated = await generateMockLearningPath(requestedTopic);
      setPath(generated);
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "The learning path could not be generated.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <section
      aria-labelledby="self-directed-heading"
      className="rounded-xl border border-border bg-surface p-5 sm:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised text-amber-400">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Self-directed learning
          </p>
          <h2 id="self-directed-heading" className="mt-1 text-lg font-semibold">
            Explore your own topic
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Enter a domain or question to get a short, personalized practice path.
          </p>
        </div>
      </div>

      <form
        onSubmit={submitTopic}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="custom-learning-topic" className="sr-only">
          Topic or domain
        </label>
        <input
          id="custom-learning-topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          maxLength={80}
          placeholder="e.g. accessibility in mobile apps"
          className="min-h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          {isGenerating ? (
            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
          {isGenerating ? "Preparing path" : "Create learning path"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-red-300">
          <AlertCircle size={16} aria-hidden="true" />
          {error}
        </p>
      )}

      {path && (
        <div className="mt-5 rounded-lg border border-border bg-surface-raised p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Path for “{path.topic}”</h3>
            <span className="rounded-md border border-amber-500/40 px-2 py-1 text-xs font-medium text-amber-300">
              Mock-generated · sample only
            </span>
          </div>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {path.units.map((unit, index) => (
              <li
                key={unit.id}
                className="rounded-lg border border-border bg-background p-3"
              >
                <p className="font-mono text-xs text-amber-400">
                  STEP 0{index + 1}
                </p>
                <h4 className="mt-2 text-sm font-semibold">{unit.title}</h4>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {unit.rationale}
                </p>
                <p className="mt-2 text-xs leading-5 text-zinc-300">
                  Outcome: {unit.learningOutcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
