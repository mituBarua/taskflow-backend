import express from "express";

import { db } from "./database/connection.js";
import taskRoutes from "./routes/task.routes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware.js";

const app = express();

// Remove the Express identification response header.
app.disable("x-powered-by");

// Parse incoming JSON bodies.
app.use(express.json({ limit: "32kb" }));

// Check that the server and database are responding.
app.get("/api/health", (req, res) => {
  db.prepare("SELECT 1").get();

  res.status(200).json({
    status: "ok",
    message: "Task API is running.",
  });
});

// Add /api/tasks before every task route.
app.use("/api/tasks", taskRoutes);

// Handle requests that did not match a route.
app.use(notFound);

// Handle errors from earlier middleware and routes.
app.use(errorHandler);

export default app;