import {
  db,
  migrateDatabase,
} from "./connection.js";

try {
  migrateDatabase();

  console.log("Database migration completed successfully.");
} catch (error) {
  console.error("Database migration failed:", error.message);

  process.exitCode = 1;
} finally {
  db.close();
}