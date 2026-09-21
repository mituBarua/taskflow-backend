import { AppError } from "../utils/AppError.js";

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = {};

      for (const issue of result.error.issues) {
        const field = issue.path.join(".") || "body";

        // Keep the first error for each field.
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }

      return next(
        new AppError(
          400,
          "Please check the submitted details.",
          errors
        )
      );
    }

    // Save validated data, including defaults and trimmed text.
    req.validatedBody = result.data;

    next();
  };
}