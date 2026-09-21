import { TaskModel } from "../models/task.model.js";
import { AppError } from "../utils/AppError.js";

// Validate the URL ID and retrieve the task.
// Used by get, update, and delete operations.
function getExistingTask(id) {
  if (
    !/^[1-9]\d*$/.test(id) ||
    !Number.isSafeInteger(Number(id))
  ) {
    throw new AppError(400, "Invalid task ID.");
  }

  const task = TaskModel.findById(Number(id));

  if (!task) {
    throw new AppError(404, "Task not found.");
  }

  return task;
}

// GET /api/tasks
export function getTasks(req, res) {
  const tasks = TaskModel.findAll();

  res.status(200).json({
    data: tasks,
  });
}

// GET /api/tasks/:id
export function getTask(req, res) {
  const task = getExistingTask(req.params.id);

  res.status(200).json({
    data: task,
  });
}

// POST /api/tasks
export function createTask(req, res) {
  const task = TaskModel.create(req.validatedBody);

  res
    .status(201)
    .location(`/api/tasks/${task.id}`)
    .json({
      message: "Task created successfully.",
      data: task,
    });
}

// PATCH /api/tasks/:id
export function updateTask(req, res) {
  const existingTask = getExistingTask(req.params.id);

  // Preserve existing fields when only some fields are submitted.
  const values = {
    ...existingTask,
    ...req.validatedBody,
  };

  const updatedTask = TaskModel.update(
    existingTask.id,
    values
  );

  if (!updatedTask) {
    throw new AppError(404, "Task not found.");
  }

  res.status(200).json({
    message: "Task updated successfully.",
    data: updatedTask,
  });
}

// DELETE /api/tasks/:id
export function deleteTask(req, res) {
  const task = getExistingTask(req.params.id);

  const removed = TaskModel.remove(task.id);

  if (!removed) {
    throw new AppError(404, "Task not found.");
  }

  res.status(204).end();
}