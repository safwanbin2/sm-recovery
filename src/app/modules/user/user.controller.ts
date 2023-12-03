import { RequestHandler } from "express";
import { UserService } from "./user.services";
import { sendReponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  const result = await UserService.createStudentIntoDB(password, student);

  sendReponse(res, {
    status: 200,
    success: true,
    message: "created successfully",
    data: result as object,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const result = await UserService.getSingleStudentFromDB(userId);

  sendReponse(res, {
    status: 200,
    success: true,
    message: "Retrieved successfully",
    data: result as object,
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty } = req.body;
  const result = await UserService.createFacultyIntoDB(password, faculty);

  sendReponse(res, {
    status: httpStatus.ACCEPTED,
    success: true,
    message: "User and Faculty created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  getSingleUser,
  createFaculty,
};
