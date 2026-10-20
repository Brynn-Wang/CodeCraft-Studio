import assert from "node:assert/strict";
import test from "node:test";
import { spotTheAiSlopLevel } from "../data/mock-arena.ts";
import { scoreArenaSubmission } from "./scoring.ts";

test("awards full score when every defect and remediation is correct", () => {
  // Arrange
  const answer = {
    selectedLines: [2, 6, 7],
    strategyIds: [
      "move-secret-server-side",
      "enforce-row-level-security",
      "handle-database-errors",
    ],
  };

  // Act
  const result = scoreArenaSubmission(spotTheAiSlopLevel, answer);

  // Assert
  assert.equal(result.score, 100);
  assert.equal(result.passed, true);
  assert.ok(result.feedback.every((item) => item.status === "identified"));
});

test("reports omitted defects as missed", () => {
  // Arrange
  const answer = {
    selectedLines: [2, 6],
    strategyIds: ["move-secret-server-side", "enforce-row-level-security"],
  };

  // Act
  const result = scoreArenaSubmission(spotTheAiSlopLevel, answer);

  // Assert
  assert.equal(result.score, 70);
  assert.equal(
    result.feedback.find((item) => item.line === 7)?.status,
    "missed",
  );
});

test("penalizes selected lines that are not defects", () => {
  // Arrange
  const answer = {
    selectedLines: [2, 3],
    strategyIds: ["move-secret-server-side"],
  };

  // Act
  const result = scoreArenaSubmission(spotTheAiSlopLevel, answer);

  // Assert
  assert.equal(result.score, 20);
  assert.equal(
    result.feedback.find((item) => item.line === 3)?.status,
    "false-positive",
  );
});

test("deduplicates repeated selections and rejects unmatched line numbers", () => {
  // Arrange
  const answer = {
    selectedLines: [2, 2, 999],
    strategyIds: ["move-secret-server-side"],
  };

  // Act
  const result = scoreArenaSubmission(spotTheAiSlopLevel, answer);

  // Assert
  assert.equal(result.score, 20);
  assert.equal(
    result.feedback.filter((item) => item.line === 2).length,
    1,
  );
  assert.equal(
    result.feedback.find((item) => item.line === 999)?.status,
    "false-positive",
  );
});

test("gives partial credit when a flagged defect has a mismatched strategy", () => {
  // Arrange
  const answer = {
    selectedLines: [2],
    strategyIds: ["handle-database-errors"],
  };

  // Act
  const result = scoreArenaSubmission(spotTheAiSlopLevel, answer);

  // Assert
  assert.equal(result.score, 15);
  assert.match(result.feedback[0].message, /matching remediation strategy/);
});
