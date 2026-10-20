import type { ArenaLevel } from "@/types";

export const spotTheAiSlopLevel: ArenaLevel = {
  id: "spot-the-ai-slop",
  title: "Spot the AI Slop",
  scenario:
    "A team is preparing a demo authentication and note service. An AI assistant drafted the following illustrative, non-executable code for review.",
  businessGoal: "Allow signed-in learners to save and retrieve only their own notes.",
  acceptanceCriteria: [
    "No credential is embedded in client-facing source.",
    "The data layer enforces per-user access with server-side row-level security.",
    "Database errors are checked and handled before a result is returned.",
  ],
  codeLanguage: "typescript",
  code: `// Demo-only snippet: illustrative text, never execute.
const SUPABASE_KEY = "EXAMPLE_ONLY_NOT_A_SECRET";
const db = createClient("https://demo.invalid", SUPABASE_KEY);
export async function saveNote(userId: string, body: string) {
  const result = await db.from("notes").insert({ user_id: userId, body });
  // No server-side row ownership/RLS policy is configured for this table.
  return result.data[0];
}`,
  defects: [
    {
      id: "embedded-credential",
      line: 2,
      title: "Credential embedded in source",
      explanation:
        "Even a placeholder illustrates the wrong boundary: privileged credentials belong in a protected server-side configuration, never client-facing code.",
      acceptedStrategyIds: ["move-secret-server-side"],
      points: 30,
    },
    {
      id: "missing-row-security",
      line: 6,
      title: "No server-side row-level security",
      explanation:
        "Client-side user identifiers are not an authorization boundary. Enforce ownership with server-side policy and verify it with tests.",
      acceptedStrategyIds: ["enforce-row-level-security"],
      points: 40,
    },
    {
      id: "unchecked-result",
      line: 7,
      title: "Database result is not checked",
      explanation:
        "The result may contain an error or no row. Handle the error explicitly and validate the returned data before using it.",
      acceptedStrategyIds: ["handle-database-errors"],
      points: 30,
    },
  ],
  strategies: [
    {
      id: "move-secret-server-side",
      label: "Move credentials to protected server-side configuration",
      description: "Keep privileged secrets out of client bundles and source control.",
    },
    {
      id: "enforce-row-level-security",
      label: "Enforce per-user access with server-side RLS",
      description: "Add and test ownership policies at the data boundary.",
    },
    {
      id: "handle-database-errors",
      label: "Check errors and validate returned data",
      description: "Return a controlled failure when persistence does not succeed.",
    },
  ],
  maxScore: 100,
  postMortem:
    "Review the trust boundary, data ownership policy, and failure path before approving AI-generated code. The snippet is static training material and does not connect to a service.",
};
