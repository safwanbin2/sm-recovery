import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { handleZodError } from "../error/handleZodError";
import { TErrorSource } from "../interface/error";
import { handleMongooseError } from "../error/handleMongooseError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err.name.message === "ValidationError") {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};

// let statusCode = err.status || 500;
// let message = err.message || "Something went wrong";

// type TErrorSource = {
//   path: string | number;
//   message: string;
// }[];

// let errorSources: TErrorSource = [
//   {
//     path: "",
//     message: "Something went right",
//   },
// ];

// if (err instanceof ZodError) {
//   const handledError = handleZodError(err);
//   (statusCode = handledError?.statusCode),
//     (message = handledError?.message),
//     (errorSources = handledError?.errorSources);
// }
