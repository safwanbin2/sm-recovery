import mongoose from "mongoose";

export const handleMongooseError = (err: mongoose.Error.ValidationError) => {
  let statusCode = 500;
  let message = "validation failed";
  const error = Object.values(err).map(
    (value: mongoose.Error.ValidatorError) => {
      return {
        path: value.path,
        message: value.message,
      };
    }
  );

  return {
    statusCode,
    message,
    errorSources: error,
  };
};
