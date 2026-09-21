import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

// Locate the backend folder.
const backendRoot = fileURLToPath(
  new URL("../../", import.meta.url)
);

const port = Number(process.env.PORT || 3001);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

export const env = {
  port,

  databasePath: resolve(
    backendRoot,
    process.env.DATABASE_PATH || "./data/tasks.sqlite"
  ),
};