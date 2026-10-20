import { ArrowDownRight, Blocks, ShieldCheck, Target } from "lucide-react";
import { LearningTrackSwitcher } from "@/components/learning-track-switcher";

const foundations = [
  {
    icon: Blocks,
    title: "Systems thinking",
    description: "Connect product goals to the engineering decisions behind them.",
  },
  {
    icon: ShieldCheck,
    title: "Critical review",
    description: "Inspect AI-generated work for correctness, safety, and risk.",
  },
  {
    icon: Target,
    title: "Learning by doing",
    description: "Practice with short scenarios, decisions, and clear feedback.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-9">
        <div
          aria-hidden="true"
          className="absolute -right-14 -top-20 size-64 rounded-full border border-zinc-700/60"
        />
        <div
          aria-hidden="true"
          className="absolute -right-2 -top-8 size-40 rounded-full border border-zinc-700/50"
        />
        <div className="relative max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <ArrowDownRight size={15} aria-hidden="true" />
            Engineering, made tangible
          </p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Build judgment.
            <br />
            <span className="text-zinc-400">Not just code.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Explore software engineering through practical scenarios, human
            decisions, and deliberate AI collaboration.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="learning-track-heading"
        className="rounded-xl border border-border bg-surface p-5 sm:p-7"
      >
        <LearningTrackSwitcher />
      </section>

      <section aria-labelledby="foundations-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              The studio approach
            </p>
            <h2
              id="foundations-heading"
              className="mt-2 text-xl font-semibold tracking-tight"
            >
              Learn through engineering practice
            </h2>
          </div>
          <span className="hidden rounded-md border border-border px-3 py-1.5 text-xs text-muted sm:inline-flex">
            MILESTONE 01
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {foundations.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-raised text-amber-400">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
