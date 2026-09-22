import express from "express";
import cors from "cors";

import { db } from "./database/connection.js";
import taskRoutes from "./routes/task.routes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
  })
);

app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (req, res) => {
  db.prepare("SELECT 1").get();

  res.json({
    status: "ok",
    message: "Task API is running.",
  });
});

app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;