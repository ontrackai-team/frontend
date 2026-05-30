import { Assessment } from "../types/assessment";

export const mockAssessments: Assessment[] = [
  {
    id: "1",
    title: "Math Assignment",
    course: "Mathematics",
    due_date: "2025-06-15T23:59:00",
    weight: 20,
    description: "Chapter 5 problems",
    status: "pending",
  },
  {
    id: "2",
    title: "Database Project",
    course: "Database Systems",
    due_date: "2025-06-10T23:59:00",
    weight: 30,
    description: "ERD and normalization",
    status: "pending",
  },
];