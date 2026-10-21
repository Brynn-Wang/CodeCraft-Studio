import type {
  CourseConfiguration,
  CourseId,
  LearningTrack,
  MiniCourse,
} from "@/types";
import type { CourseStudioService } from "@/types";
import { mockCourses } from "@/data/mock-courses";

const baselineRules = [
  "Use clear, learner-friendly language for the selected track.",
  "Keep activities safe, deterministic, and independent of real credentials.",
  "Assess observable learning outcomes rather than tool familiarity.",
];

export function createCourseConfiguration(course: MiniCourse): CourseConfiguration {
  return {
    courseId: course.id,
    title: course.title,
    prompt: `Teach ${course.theme} through practical, reviewable activities.`,
    rules: [...baselineRules],
    verificationCriteria: course.acceptanceCriteria.map((criterion) => ({ ...criterion })),
    status: "preview",
    track: "casual",
    units: course.units.map((unit) => ({ ...unit, learningObjectives: [...unit.learningObjectives] })),
  };
}

async function generateCourseDraft(
  topic: string,
  options: { track: LearningTrack; keyConcepts: string[] } = {
    track: "casual",
    keyConcepts: [],
  },
): Promise<CourseConfiguration> {
  const normalizedTopic = topic.trim();
  if (!normalizedTopic) throw new Error("请输入课程主题。");
  await new Promise((resolve) => setTimeout(resolve, 650));

  const concepts = options.keyConcepts.map((item) => item.trim()).filter(Boolean);
  const focus = concepts.length ? concepts : [normalizedTopic, "应用场景", "复核与验证"];
  const units = [0, 1, 2].map((index) => ({
    id: `draft-unit-${index + 1}`,
    title: focus[index] ?? `${normalizedTopic}：实践与复盘`,
    summary: `围绕「${focus[index] ?? normalizedTopic}」完成一个可检查的学习活动。`,
    learningObjectives: [`解释并应用${focus[index] ?? normalizedTopic}的核心概念。`],
    activityType: index === 2 ? ("reflection" as const) : ("simulation" as const),
    estimatedMinutes: 8 + index * 2,
  }));

  return {
    courseId: "custom",
    title: `${normalizedTopic} 微课程`,
    prompt: `为 ${options.track === "hardcore" ? "Hardcore / CS" : "Casual / Non-CS"} 学习者设计课程：${normalizedTopic}。核心知识点：${focus.join("、")}。`,
    rules: [...baselineRules],
    verificationCriteria: units.map((unit, index) => ({
      id: `draft-check-${index + 1}`,
      description: `学习者能够说明并应用「${unit.title}」中的关键知识。`,
      verificationMethod: index === 2 ? "结构化复盘" : "情境练习",
    })),
    status: "draft",
    track: options.track,
    units,
  };
}

export const mockCourseStudio: CourseStudioService = {
  async saveCourseConfiguration(configuration) {
    return { ...configuration, rules: [...configuration.rules] };
  },
  generateCourseDraft,
  async getCourseConfiguration(courseId: CourseId) {
    const course = mockCourses.find((item) => item.id === courseId);
    if (!course) throw new Error("找不到这门模拟课程。");
    return createCourseConfiguration(course);
  },
};