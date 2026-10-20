"use client";

import { useState, type ReactNode } from "react";
import {
  BookOpen,
  Check,
  GraduationCap,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

type Portal = "learner" | "instructor";

interface AppShellProps {
  children: ReactNode;
}

const portalOptions = [
  { id: "learner", label: "Learner", detail: "学习者", icon: BookOpen },
  { id: "instructor", label: "Instructor", detail: "教师", icon: GraduationCap },
] as const;

export function AppShell({ children }: AppShellProps) {
  const [portal, setPortal] = useState<Portal>("learner");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex w-fit items-center gap-3 rounded-md focus-visible:outline-none"
            aria-label="CodeCraft Studio home"
          >
            <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-raised text-amber-400">
              <Layers3 size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">
                CODECRAFT
              </span>
              <span className="block text-xs text-muted">EDUCATION STUDIO</span>
            </span>
          </Link>

          <nav
            aria-label="Portal selection"
            className="grid grid-cols-2 gap-2 sm:flex sm:items-center"
          >
            {portalOptions.map(({ id, label, detail, icon: Icon }) => {
              const isActive = portal === id;

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setPortal(id)}
                  className={`flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? "border-amber-500/60 bg-amber-400 text-accent-foreground"
                      : "border-border bg-surface-raised text-zinc-300 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{label}</span>
                  <span className={isActive ? "text-zinc-800" : "text-muted"}>
                    {detail}
                  </span>
                  {isActive && <Check size={15} aria-hidden="true" />}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {portal === "learner" ? (
          children
        ) : (
          <section className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-6 sm:p-8">
            <div className="mb-5 flex size-12 items-center justify-center rounded-lg border border-border bg-surface-raised text-amber-400">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Instructor portal
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Course Studio workspace
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              The instructor portal is selected. Course authoring and class
              analytics will be added in a later implementation phase.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
