import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

import { env } from "../config/env.js";

// Create the directory containing the database if necessary.
mkdirSync(dirname(env.databasePath), {
  recursive: true,
});

// Open the database, creating the file if it doesn't exist.
export const db = new DatabaseSync(env.databasePath);

// Configure SQLite.
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;
`);

// Create the initial database structure.
export function migrateDatabase() {
  const migrationPath = new URL(
    "./migrations/001_create_tasks.sql",
    import.meta.url
  );

  const sql = readFileSync(migrationPath, "utf8");

  db.exec(sql);
}