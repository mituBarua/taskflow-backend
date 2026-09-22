import app from "./app.js";
import { env } from "./config/env.js";

import {
  db,
  migrateDatabase,
} from "./database/connection.js";

// Ensure the table exists before accepting requests.
migrateDatabase();

const server = app.listen(
  env.port,
  "0.0.0.0",
  () => {
    console.log(`Server running on port ${env.port}`);
  }
);

// Stop accepting requests, then close the database.
function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);