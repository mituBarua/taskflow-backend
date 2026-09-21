import { z } from "zod";

import {
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../constants/task.constants.js";

// Rules shared by create and update requests.
const taskFields = {
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(120, "Title must not exceed 120 characters."),

  description: z
    .string()
    .max(2000, "Description must not exceed 2000 characters.")
    .trim(),

  priority: z.enum(TASK_PRIORITIES, {
    error: "Priority must be Low, Medium, or High.",
  }),

  status: z.enum(TASK_STATUSES, {
    error: "Status must be Pending, In Progress, or Completed.",
  }),
};

// Creating a task requires a title.
// Other fields receive defaults if omitted.
export const createTaskSchema = z
  .object({
    ...taskFields,

    description: taskFields.description.default(""),
    priority: taskFields.priority.default("Medium"),
    status: taskFields.status.default("Pending"),
  })
  .strict();

// Updating a task allows individual fields to change.
// However, an empty update is rejected.
export const updateTaskSchema = z
  .object(taskFields)
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update.",
  });