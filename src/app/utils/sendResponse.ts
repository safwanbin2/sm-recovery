import { Response } from "express";

export const sendResponse = (
  res: Response,
  data: {
    status: number;
    success: boolean;
    message: string;
    data: object;
  }
) => {
  res.status(data.status).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
