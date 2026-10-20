import type { LearningPath } from "@/types";

export async function generateMockLearningPath(
  topic: string,
): Promise<LearningPath> {
  const normalizedTopic = topic.trim();
  if (!normalizedTopic) {
    throw new Error("Enter a topic before generating a learning path.");
  }

  const focus = normalizedTopic.slice(0, 80);
  return {
    id: `mock-path-${Date.now()}`,
    topic: focus,
    generatedAt: new Date().toISOString(),
    isMock: true,
    units: [
      {
        id: "foundations",
        title: `${focus}: map the fundamentals`,
        rationale: `Start by identifying the core ideas, vocabulary, and users involved in ${focus}.`,
        learningOutcome: `Explain the foundational concepts behind ${focus}.`,
      },
      {
        id: "applied-scenario",
        title: `Apply ${focus} in a scenario`,
        rationale: "Practice connecting concepts to a realistic product decision.",
        learningOutcome: `Use ${focus} concepts to propose a reasoned solution.`,
      },
      {
        id: "review-and-verify",
        title: `Review and verify your ${focus} solution`,
        rationale: "Check assumptions, risks, and evidence before accepting a solution.",
        learningOutcome: `Evaluate a ${focus} solution against explicit criteria.`,
      },
    ],
  };
}
