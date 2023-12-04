import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  let statusCode = 500;
  let message = "Cast error";

  const error = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources: error,
  };
};
