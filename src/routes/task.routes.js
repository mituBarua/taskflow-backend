import { Router } from "express";

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator.js";

import {
  validateBody,
} from "../middleware/validate.middleware.js";

const router = Router();

// Retrieve all tasks.
router.get("/", getTasks);

// Retrieve one task.
router.get("/:id", getTask);

// Validate the request before creating a task.
router.post(
  "/",
  validateBody(createTaskSchema),
  createTask
);

// Validate the request before updating a task.
router.patch(
  "/:id",
  validateBody(updateTaskSchema),
  updateTask
);

// Delete an existing task.
router.delete("/:id", deleteTask);

export default router;