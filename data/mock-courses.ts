import type { MiniCourse } from "@/types";

export { spotTheAiSlopLevel } from "./mock-arena";

export const mockCourses: MiniCourse[] = [
  {
    id: "software-engineering-fundamentals",
    title: "Software Engineering Fundamentals",
    theme: "Build reliable systems",
    summary:
      "Explore the lifecycle and quality practices behind dependable software.",
    level: "introductory",
    estimatedMinutes: 35,
    trackDescriptions: {
      casual:
        "Plan a neighborhood delivery service and learn how teams make it dependable.",
      hardcore:
        "Model an SDLC workflow and evaluate system quality using concrete engineering criteria.",
    },
    learningObjectives: [
      "Describe the purpose of SDLC stages.",
      "Distinguish verification from validation.",
      "Explain scalability and availability as non-functional requirements.",
      "Choose appropriate checks across the Test Pyramid.",
    ],
    units: [
      {
        id: "sdlc-stages",
        title: "From idea to operation",
        summary: "Arrange discovery, design, implementation, testing, and operation.",
        learningObjectives: ["Explain the purpose and feedback loops of SDLC stages."],
        activityType: "simulation",
        estimatedMinutes: 8,
      },
      {
        id: "verification-validation",
        title: "Right build, right problem",
        summary: "Compare checking a specification with validating a user need.",
        learningObjectives: [
          "Classify verification and validation evidence in a product scenario.",
        ],
        activityType: "simulation",
        estimatedMinutes: 7,
      },
      {
        id: "quality-attributes",
        title: "Scale and stay available",
        summary: "Translate growth and uptime goals into measurable requirements.",
        learningObjectives: [
          "Write measurable scalability and availability requirements.",
        ],
        activityType: "lesson",
        estimatedMinutes: 10,
      },
      {
        id: "test-pyramid",
        title: "Choose the right test",
        summary: "Balance fast unit checks, integration checks, and end-to-end confidence.",
        learningObjectives: [
          "Select a suitable test layer and explain its cost and coverage trade-offs.",
        ],
        activityType: "simulation",
        estimatedMinutes: 10,
      },
    ],
    acceptanceCriteria: [
      {
        id: "sdlc-order",
        description: "Learner can explain the purpose of each SDLC stage.",
        verificationMethod: "Scenario ordering activity",
      },
      {
        id: "quality-tradeoffs",
        description: "Learner differentiates verification from validation and identifies NFRs.",
        verificationMethod: "Short scenario classification",
      },
      {
        id: "test-selection",
        description: "Learner selects a test-pyramid layer for a given check.",
        verificationMethod: "Test selection simulation",
      },
    ],
    tags: ["SDLC", "quality", "testing", "NFR"],
  },
  {
    id: "effective-ai-coding-practices",
    title: "Effective AI Coding Practices",
    theme: "Engineer with AI, not on autopilot",
    summary:
      "Replace fragile vibe coding with specifications, agentic workflows, and deliberate review.",
    level: "intermediate",
    estimatedMinutes: 45,
    trackDescriptions: {
      casual:
        "Treat an AI coding assistant like a fast teammate: agree on the brief, then check its work.",
      hardcore:
        "Use specification-driven agent workflows and review generated changes for security and correctness.",
    },
    learningObjectives: [
      "Contrast vibe coding with Agentic Engineering.",
      "Use spec.md and constitution.md to constrain implementation.",
      "Identify common risks in AI-generated code.",
      "Apply the Anthropic AI Fluency 4D framework.",
    ],
    units: [
      {
        id: "agentic-engineering",
        title: "From vibe coding to engineering",
        summary: "Plan, delegate, inspect, and verify work completed with AI assistance.",
        learningObjectives: [
          "Describe an agentic workflow with explicit human review checkpoints.",
        ],
        activityType: "simulation",
        estimatedMinutes: 8,
      },
      {
        id: "specification-driven-development",
        title: "Write the contract first",
        summary: "Separate product requirements in spec.md from durable project rules in constitution.md.",
        learningObjectives: [
          "Select which requirements and guardrails belong in each specification artifact.",
        ],
        activityType: "lesson",
        estimatedMinutes: 9,
      },
      {
        id: "audit-ai-output",
        title: "Review the AI's work",
        summary: "Inspect demo code for exposed placeholders, missing access controls, and ignored errors.",
        learningObjectives: [
          "Identify security and reliability concerns without executing untrusted code.",
          "Propose a defense-in-depth remediation and verification step.",
        ],
        activityType: "arena",
        estimatedMinutes: 12,
        arenaLevelId: "spot-the-ai-slop",
      },
      {
        id: "ai-fluency-4d",
        title: "Practice AI Fluency 4D",
        summary: "Apply Delegation, Description, Discernment, and Diligence to a coding task.",
        learningObjectives: [
          "Delegate suitable work while retaining human accountability.",
          "Describe goals, constraints, and evidence clearly.",
          "Discern unsupported claims, risks, and missing context.",
          "Exercise diligence through review, testing, and verification.",
        ],
        activityType: "reflection",
        estimatedMinutes: 10,
      },
    ],
    acceptanceCriteria: [
      {
        id: "sdd-artifacts",
        description: "Learner distinguishes product specification from project constitution.",
        verificationMethod: "Artifact sorting activity",
      },
      {
        id: "ai-risk-review",
        description: "Learner flags exposed-secret patterns, missing RLS, and absent rate limiting.",
        verificationMethod: "Static code review scenario",
      },
      {
        id: "fluency-4d",
        description: "Learner maps actions to Delegation, Description, Discernment, and Diligence.",
        verificationMethod: "Four-part workflow reflection",
      },
    ],
    tags: ["Agentic Engineering", "SDD", "AI Fluency 4D", "code review"],
  },
  {
    id: "soft-and-product-skills",
    title: "Soft & Product Skills",
    theme: "Understand people before building",
    summary:
      "Turn stakeholder conversations and user context into thoughtful product decisions.",
    level: "introductory",
    estimatedMinutes: 30,
    trackDescriptions: {
      casual:
        "Plan a useful community app by asking better questions and listening to people.",
      hardcore:
        "Elicit requirements, model stakeholder trade-offs, and connect user evidence to product choices.",
    },
    learningObjectives: [
      "Use 5 Whys and open-ended questions to clarify needs.",
      "Make and communicate stakeholder trade-offs.",
      "Apply user empathy without treating assumptions as evidence.",
    ],
    units: [
      {
        id: "requirement-elicitation",
        title: "Ask beyond the first answer",
        summary: "Use open-ended prompts and 5 Whys to explore the underlying need.",
        learningObjectives: [
          "Ask a non-leading question and trace a request to its underlying need.",
        ],
        activityType: "simulation",
        estimatedMinutes: 10,
      },
      {
        id: "stakeholder-tradeoffs",
        title: "Make the trade-off visible",
        summary: "Balance competing goals such as speed, cost, access, and reliability.",
        learningObjectives: [
          "Explain who benefits, who bears a cost, and what evidence informs a trade-off.",
        ],
        activityType: "simulation",
        estimatedMinutes: 10,
      },
      {
        id: "user-empathy",
        title: "See the experience",
        summary: "Use user context to challenge assumptions and improve a product decision.",
        learningObjectives: [
          "Distinguish observed user evidence from team assumptions.",
        ],
        activityType: "reflection",
        estimatedMinutes: 10,
      },
    ],
    acceptanceCriteria: [
      {
        id: "elicitation",
        description: "Learner uses an open-ended question and at least one Why follow-up.",
        verificationMethod: "Conversation simulation",
      },
      {
        id: "tradeoff",
        description: "Learner states a trade-off and identifies affected stakeholders.",
        verificationMethod: "Decision rationale",
      },
      {
        id: "empathy",
        description: "Learner supports a product choice with user context rather than assumption.",
        verificationMethod: "Reflection prompt",
      },
    ],
    tags: ["requirements", "stakeholders", "empathy", "product"],
  },
];
