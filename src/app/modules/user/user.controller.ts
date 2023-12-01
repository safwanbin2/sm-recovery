import { RequestHandler } from "express";
import { UserService } from "./user.services";
import { sendReponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  const result = await UserService.createStudentIntoDB(password, student);

  sendReponse(res, {
    status: 200,
    success: true,
    message: "created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
