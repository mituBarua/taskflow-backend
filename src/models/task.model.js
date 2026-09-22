import { db } from "../database/connection.js";

// Retrieve all tasks, with the newest first.
function findAll() {
  return db
    .prepare("SELECT * FROM tasks ORDER BY id DESC")
    .all();
}

// Retrieve one task by its ID.
function findById(id) {
  return db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(id);
}

// Insert a new task and return the saved record.
function create({
  title,
  description = "",
  priority = "Medium",
  status = "Pending",
}) {
  const result = db
    .prepare(`
      INSERT INTO tasks (
        title,
        description,
        priority,
        status
      )
      VALUES (?, ?, ?, ?)
    `)
    .run(title, description, priority, status);

  return findById(Number(result.lastInsertRowid));
}

// Update an existing task and return the updated record.

function update(id, { title, description, priority, status }) {
  const result = db
    .prepare(`
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        priority = ?,
        status = ?
      WHERE id = ?
    `)
    .run(title, description, priority, status, id);

  if (result.changes === 0) {
    return null;
  }

  return findById(id);
}

// Delete a task and indicate whether a record was removed.
function remove(id) {
  const result = db
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(id);

  return result.changes > 0;
}

export const TaskModel = {
  findAll,
  findById,
  create,
  update,
  remove,
};