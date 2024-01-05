import { RequestHandler } from "express";
import { UserService } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const imgFile = req.file;
  const { password, student } = req.body;
  console.log(imgFile);
  const result = await UserService.createStudentIntoDB(password, student);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "created successfully",
    data: result as object,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  const token = req.user;
  const result = await UserService.getMeFromDB(token);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Retrieved successfully",
    data: result as object,
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty } = req.body;
  const result = await UserService.createFacultyIntoDB(password, faculty);

  sendResponse(res, {
    status: httpStatus.ACCEPTED,
    success: true,
    message: "User and Faculty created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  getMe,
  createFaculty,
};
