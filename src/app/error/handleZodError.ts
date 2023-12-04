import { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError) => {
  let statusCode = 500;
  let message = "validation failed";
  const error = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources: error,
  };
};
