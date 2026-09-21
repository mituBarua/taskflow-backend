import { AppError } from "../utils/AppError.js";

// Handle requests to endpoints that do not exist.
export function notFound(req, res, next) {
  next(new AppError(404, "Route not found."));
}

// Express identifies error middleware by its four parameters.
export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  // Invalid JSON, such as a missing closing bracket.
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Request body contains invalid JSON.",
    });
  }

  // Request exceeds the configured body size limit.
  if (error.type === "entity.too.large") {
    return res.status(413).json({
      message: "Request body is too large.",
    });
  }

  // Expected errors created by our application.
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    });
  }

  // Unexpected errors are logged for the developer.
  console.error(error);

  res.status(500).json({
    message: "Something went wrong. Please try again.",
  });
}