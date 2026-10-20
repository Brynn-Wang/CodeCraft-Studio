import type {
  ArenaAnswer,
  ArenaEvaluation,
  ArenaLevel,
  DefectFeedback,
} from "@/types";

const FALSE_POSITIVE_PENALTY = 10;

export function scoreArenaSubmission(
  level: ArenaLevel,
  answer: ArenaAnswer,
  evaluatedAt = new Date().toISOString(),
): ArenaEvaluation {
  const selectedLines = new Set(answer.selectedLines);
  const selectedStrategies = new Set(answer.strategyIds);
  const defectLines = new Set(level.defects.map(({ line }) => line));
  const feedback: DefectFeedback[] = [];
  let earned = 0;

  for (const defect of level.defects) {
    if (!selectedLines.has(defect.line)) {
      feedback.push({
        defectId: defect.id,
        line: defect.line,
        status: "missed",
        pointsAwarded: 0,
        message: `Missed: ${defect.title}. ${defect.explanation}`,
      });
      continue;
    }

    const strategyMatches = defect.acceptedStrategyIds.some((id) =>
      selectedStrategies.has(id),
    );
    const pointsAwarded = strategyMatches
      ? defect.points
      : Math.floor(defect.points / 2);
    earned += pointsAwarded;

    feedback.push({
      defectId: defect.id,
      line: defect.line,
      status: "identified",
      pointsAwarded,
      message: strategyMatches
        ? `Correct: ${defect.title}. ${defect.explanation}`
        : `Line identified, but choose the matching remediation strategy for full credit. ${defect.explanation}`,
    });
  }

  const falsePositiveLines = [...selectedLines]
    .filter((line) => !defectLines.has(line))
    .sort((a, b) => a - b);
  const penalty = falsePositiveLines.length * FALSE_POSITIVE_PENALTY;

  for (const line of falsePositiveLines) {
    feedback.push({
      defectId: `false-positive-${line}`,
      line,
      status: "false-positive",
      pointsAwarded: -FALSE_POSITIVE_PENALTY,
      message: `False positive: line ${line} does not match a defined defect. Re-check the acceptance criteria.`,
    });
  }

  const score = Math.max(0, Math.min(level.maxScore, earned - penalty));
  const missedCount = feedback.filter(({ status }) => status === "missed").length;
  const summary =
    missedCount === 0 && falsePositiveLines.length === 0
      ? "All defective lines were identified without false positives."
      : `${missedCount} defect${missedCount === 1 ? "" : "s"} missed; ${falsePositiveLines.length} false positive${falsePositiveLines.length === 1 ? "" : "s"}.`;

  return {
    arenaId: level.id,
    score,
    maxScore: level.maxScore,
    passed: score >= Math.ceil(level.maxScore * 0.7),
    feedback,
    summary,
    postMortem: level.postMortem,
    evaluatedAt,
  };
}
