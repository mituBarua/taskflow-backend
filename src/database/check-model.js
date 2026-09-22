import assert from "node:assert/strict";

import {
  db,
  migrateDatabase,
} from "./connection.js";

import { TaskModel } from "../models/task.model.js";

// Ensure the table exists.
migrateDatabase();

// Roll back all test changes when finished.
db.exec("BEGIN");

try {
  // 1. Create
  const created = TaskModel.create({
    title: "Test the task model",
    description: "Check database operations.",
    priority: "High",
    status: "Pending",
  });

  assert.ok(created.id);
  assert.equal(created.title, "Test the task model");
  assert.equal(created.status, "Pending");

  console.log("PASS: Create task");

  // 2. Retrieve one
  const found = TaskModel.findById(created.id);

  assert.equal(found.id, created.id);

  console.log("PASS: Retrieve task");

  // 3. Retrieve all
  const tasks = TaskModel.findAll();

  assert.ok(tasks.some((task) => task.id === created.id));

  console.log("PASS: List tasks");

  // 4. Update
  const updated = TaskModel.update(created.id, {
    title: "Task model checked",
    description: created.description,
    priority: "Medium",
    status: "Completed",
  });

  assert.equal(updated.title, "Task model checked");
  assert.equal(updated.priority, "Medium");
  assert.equal(updated.status, "Completed");
  assert.equal(updated.created_at, created.created_at);

  console.log("PASS: Update task");

  // 5. Delete
  const removed = TaskModel.remove(created.id);

  assert.equal(removed, true);
  assert.equal(TaskModel.findById(created.id), undefined);

  console.log("PASS: Delete task");
} finally {
  
  db.exec("ROLLBACK");
  db.close();
}
