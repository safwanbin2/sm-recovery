import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.status || 500;
  let message = err.message || "Something went wrong";

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went right",
    },
  ];

  const handleZodError = (err: ZodError) => {
    const statusCode = 500;
    const error = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      statusCode,
      message: "Validation Error",
      errorSources: error,
    };
  };

  if (err instanceof ZodError) {
    const handledError = handleZodError(err);
    (statusCode = handledError?.statusCode),
      (message = handledError?.message),
      (errorSources = handledError?.errorSources);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};
