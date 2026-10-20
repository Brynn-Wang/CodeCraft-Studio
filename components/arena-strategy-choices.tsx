"use client";

import type { ArenaLevel } from "@/types";

interface ArenaStrategyChoicesProps {
  level: ArenaLevel;
  strategies: Record<string, string>;
  onChange: (defectId: string, strategyId: string) => void;
}

export function ArenaStrategyChoices({
  level,
  strategies,
  onChange,
}: ArenaStrategyChoicesProps) {
  return (
    <div className="mt-5 space-y-4">
      <h3 className="text-sm font-semibold">Choose a remediation strategy</h3>
      {level.defects.map((defect, index) => (
        <fieldset
          key={defect.id}
          className="rounded-lg border border-border bg-surface-raised p-3"
        >
          <legend className="px-1 text-xs font-medium text-zinc-300">
            Strategy {index + 1}
          </legend>
          <div className="mt-1 grid gap-2 sm:grid-cols-2">
            {level.strategies.map((strategy) => (
              <label
                key={strategy.id}
                className="flex cursor-pointer items-start gap-2 rounded-md p-2 text-xs leading-5 text-zinc-300 hover:bg-zinc-800 focus-within:ring-2 focus-within:ring-amber-400"
              >
                <input
                  type="radio"
                  name={`strategy-${defect.id}`}
                  value={strategy.id}
                  checked={strategies[defect.id] === strategy.id}
                  onChange={() => onChange(defect.id, strategy.id)}
                  className="mt-1 accent-amber-400"
                />
                <span>{strategy.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
